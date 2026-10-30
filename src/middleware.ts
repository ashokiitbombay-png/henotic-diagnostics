import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 🛡️ Henotic Diagnostics Edge Security & Canonical Routing Middleware
 * 
 * Features:
 * 1. Honeypot trap defense (/services/_trap/ returns 403 Forbidden)
 * 2. Scraper protection (blocks python-requests, empty UA, script engines)
 * 3. Whitelists verified search bots (Googlebot, Bingbot, Yandex, Applebot)
 * 4. Canonical 301 www redirect (henoticdiagnostics.com → www.henoticdiagnostics.com)
 * 5. Strict security headers (nosniff, DENY, XSS-protection, strict-origin)
 */

// Legitimate search engine bots and accredited crawlers to always whitelist
const SEARCH_ENGINE_BOTS = /googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|twitterbot|facebookexternalhit|linkedinbot|applebot|gptbot|claudebot|perplexitybot/i;

// Automated scrapers, spiders, and headless HTTP libraries
const BLOCKED_USER_AGENTS = /python-requests|aiohttp|scrapy|httpclient|libwww-perl|pyspider|zgrab|masscan/i;

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host');
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent') || '';

  // 1. Honeypot Trap Detection (Immediate 403 Forbidden)
  if (pathname.includes('/_trap') || pathname.includes('/trap/')) {
    return new NextResponse('Access Denied: Automated scraping prohibited.', {
      status: 403,
      headers: { 
        'Content-Type': 'text/plain',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      },
    });
  }

  // 2. Anti-Scraper Bot Shield
  const isSearchBot = SEARCH_ENGINE_BOTS.test(userAgent);
  if (!isSearchBot) {
    // Block requests with missing or empty User-Agent
    if (!userAgent.trim()) {
      return new NextResponse('Access Denied: Missing User-Agent header.', {
        status: 403,
        headers: { 
          'Content-Type': 'text/plain',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY'
        },
      });
    }

    // Block known automated scraping frameworks
    if (BLOCKED_USER_AGENTS.test(userAgent)) {
      return new NextResponse('Access Denied: Automated bot requests prohibited.', {
        status: 403,
        headers: { 
          'Content-Type': 'text/plain',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY'
        },
      });
    }
  }

  // 3. Canonical WWW Redirect (301)
  if (host === 'henoticdiagnostics.com') {
    url.host = 'www.henoticdiagnostics.com';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // 4. Pass request with Security Headers
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|robots.txt|.*\\.txt|sitemap.xml|sitemap/|sitemaps/).*)',
  ],
};
