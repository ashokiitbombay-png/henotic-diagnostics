import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ── In-Memory Stores (per Vercel Edge isolate) ────────────────────────────
// Each edge isolate has its own memory; this provides per-worker protection.
// For distributed rate limiting, upgrade to Upstash Redis (@upstash/ratelimit).

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const BLOCK_MAP = new Set<string>();

// Memory safety: cap the block list to prevent unbounded growth
const MAX_BLOCK_LIST_SIZE = 10_000;
const MAX_RATE_MAP_SIZE = 50_000;
let lastCleanup = Date.now();
const CLEANUP_INTERVAL_MS = 120_000; // 2 minutes

const WINDOW_SIZE_MS = 60_000;
const LIMIT_NORMAL = 60;
const LIMIT_SUSPICIOUS = 10;

// ── Bot Classification ────────────────────────────────────────────────────
const GOOD_BOT_UAS = [
  'googlebot', 'bingbot', 'yandex', 'baiduspider', 'duckduckbot',
  'google-extended', 'google-inspectiontool', 'google-safety',
  'gptbot', 'chatgpt-user', 'claudebot', 'perplexitybot', 'applebot-extended',
  'anthropic-ai', 'bytespider', 'cohere-ai', 'ccbot',
  'slurp', 'facebookexternalhit', 'twitterbot', 'linkedinbot',
  'whatsapp', 'telegrambot', 'discordbot', 'slack',
  'pinterest', 'semrushbot', 'ahrefsbot',
  'pagespeed', 'lighthouse', 'gtmetrix',
];

const BAD_UAS = [
  'python-requests', 'python-urllib', 'scrapy', 'curl/', 'wget/', 'httpclient',
  'java/', 'libwww', 'go-http-client', 'node-fetch', 'axios/', 'undici',
  'puppeteer', 'playwright', 'headlesschrome', 'phantomjs', 'selenium',
  'mechanize', 'httpie', 'rest-client', 'winhttp', 'cfnetwork',
];

// ── Memory Cleanup ────────────────────────────────────────────────────────
function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  // Evict expired rate limit entries
  for (const [key, entry] of rateLimitMap) {
    if (now - entry.timestamp > WINDOW_SIZE_MS) {
      rateLimitMap.delete(key);
    }
  }

  // If rate map is still too large, evict oldest entries
  if (rateLimitMap.size > MAX_RATE_MAP_SIZE) {
    const entries = [...rateLimitMap.entries()]
      .sort((a, b) => a[1].timestamp - b[1].timestamp);
    const toRemove = entries.slice(0, entries.length - MAX_RATE_MAP_SIZE);
    for (const [key] of toRemove) {
      rateLimitMap.delete(key);
    }
  }

  // Cap block list
  if (BLOCK_MAP.size > MAX_BLOCK_LIST_SIZE) {
    // Clear oldest half — Set doesn't track insertion order reliably, so full clear
    BLOCK_MAP.clear();
  }
}

// ── Middleware Entry ──────────────────────────────────────────────────────
export function middleware(request: NextRequest) {
  cleanup();

  const url = request.nextUrl.clone();

  // 1. Canonical WWW redirect (301)
  const host = request.headers.get('host');
  if (host === 'henoticdiagnostics.com') {
    url.host = 'www.henoticdiagnostics.com';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
  const ua = request.headers.get('user-agent')?.toLowerCase() || '';

  // 2. PSEO Honeypot — instantly block IPs that hit hidden trap URLs
  if (url.pathname.startsWith('/services/_trap/')) {
    BLOCK_MAP.add(ip);
    return blockedResponse();
  }

  // 3. Check persistent block list
  if (BLOCK_MAP.has(ip)) {
    return blockedResponse();
  }

  // 4. Verified Search Engine Whitelist — never rate limit these
  if (ua && GOOD_BOT_UAS.some(bot => ua.includes(bot))) {
    return addSecurityHeaders(NextResponse.next());
  }

  // 5. Scraper Detection — block empty UA and known bad signatures
  if (!ua) {
    BLOCK_MAP.add(ip);
    return blockedResponse();
  }

  if (BAD_UAS.some(bad => ua.includes(bad))) {
    BLOCK_MAP.add(ip);
    return blockedResponse();
  }

  // 6. Suspicious request heuristics (missing standard browser headers)
  const accept = request.headers.get('accept');
  const acceptLang = request.headers.get('accept-language');
  const isSuspicious = !accept || !acceptLang;

  // 7. Sliding Window Rate Limiting
  if (ip !== 'unknown') {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now - record.timestamp > WINDOW_SIZE_MS) {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    } else {
      record.count++;

      const limit = isSuspicious ? LIMIT_SUSPICIOUS : LIMIT_NORMAL;
      if (record.count > limit) {
        return rateLimitedResponse();
      }
    }
  }

  return addSecurityHeaders(NextResponse.next());
}

// ── Response Factories ────────────────────────────────────────────────────
function blockedResponse() {
  const response = new NextResponse(
    JSON.stringify({ error: 'Forbidden', status: 403 }),
    {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    }
  );
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return addSecurityHeaders(response);
}

function rateLimitedResponse() {
  const response = new NextResponse(
    JSON.stringify({ error: 'Too Many Requests', retryAfter: 60 }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': '60'
      }
    }
  );
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return addSecurityHeaders(response);
}

function addSecurityHeaders(response: NextResponse) {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  return response;
}

// ── Route Matcher ─────────────────────────────────────────────────────────
// Exclude static assets, API routes, sitemaps, and Next.js internals
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml|sitemap/).*)',
  ],
};
