import { Ratelimit } from '@upstash/ratelimit';
import { getRedis } from '@/lib/cache/redis';

/**
 * Rate limiter for API routes.
 * - `rateLimitDistributed()` uses Upstash Redis (`@upstash/ratelimit`) across PM2 workers when configured,
 *   and falls back seamlessly to the in-memory sliding window limiter when Redis is unavailable.
 * - `rateLimit()` remains available for synchronous callers.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const distributedLimitersByClient = new WeakMap<object, Map<string, Ratelimit>>();

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

/** Clear the in-memory rate limit store (primarily for unit tests). */
export function resetRateLimitMemoryStore(): void {
  rateLimitStore.clear();
}

/**
 * Check if a request should be rate-limited using Upstash Redis across workers,
 * falling back to the process-local in-memory store if Redis is unconfigured or errors.
 */
export async function rateLimitDistributed(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60_000
): Promise<{ success: boolean; remaining: number; resetTime: number }> {
  const redis = getRedis();
  if (redis) {
    let clientLimiters = distributedLimitersByClient.get(redis);
    if (!clientLimiters) {
      clientLimiters = new Map();
      distributedLimitersByClient.set(redis, clientLimiters);
    }

    const cacheKey = `${limit}:${windowMs}`;
    let limiter = clientLimiters.get(cacheKey);
    if (!limiter) {
      const windowSeconds = Math.max(1, Math.ceil(windowMs / 1000));
      limiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
        prefix: 'rl:api',
        analytics: false,
      });
      clientLimiters.set(cacheKey, limiter);
    }

    try {
      const { success, remaining, reset } = await limiter.limit(identifier);
      return {
        success,
        remaining: remaining ?? 0,
        resetTime: reset,
      };
    } catch (err) {
      console.warn(
        '[Rate Limit] Redis limiter failed, falling back to in-memory:',
        err instanceof Error ? err.message : String(err)
      );
    }
  }

  return rateLimit(identifier, limit, windowMs);
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
