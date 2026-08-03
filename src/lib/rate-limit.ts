/**
 * Lightweight in-memory rate limiter for API routes.
 * Uses a sliding window counter per IP address.
 * 
 * NOTE: In serverless environments, each worker has its own memory.
 * This provides per-worker rate limiting which is still effective
 * against individual bad actors. For distributed rate limiting,
 * upgrade to Upstash Redis (@upstash/ratelimit).
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Periodic cleanup to prevent memory growth (every 60s)
const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of rateLimitStore) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Check if a request should be rate-limited.
 * @param identifier Unique key (usually IP + route)
 * @param limit Max requests per window
 * @param windowMs Window duration in milliseconds
 * @returns { success: boolean, remaining: number, resetTime: number }
 */
export function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60_000
): { success: boolean; remaining: number; resetTime: number } {
  cleanup();
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: limit - 1, resetTime: now + windowMs };
  }

  entry.count++;
  if (entry.count > limit) {
    return { success: false, remaining: 0, resetTime: entry.resetTime };
  }

  return { success: true, remaining: limit - entry.count, resetTime: entry.resetTime };
}

/**
 * Helper to extract client IP from request headers.
 */
export function getClientIP(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}
