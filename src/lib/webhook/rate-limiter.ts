import { Ratelimit } from '@upstash/ratelimit';
import { getRedis } from '@/lib/cache/redis';
import { rateLimit as inMemoryRateLimit } from '@/lib/rate-limit';

// ── Distributed Rate Limiter ─────────────────────────────────────────────
// Uses @upstash/ratelimit for cross-worker rate limiting in serverless.
// Falls back to in-memory rate limiter when Redis is unavailable.

let _webhookLimiter: Ratelimit | null | undefined;
let _revalidateLimiter: Ratelimit | null | undefined;

/**
 * Get or create the webhook rate limiter.
 * Sliding window: 100 requests per 10 seconds (handles WP bulk edit bursts).
 */
function getWebhookLimiter(): Ratelimit | null {
  if (_webhookLimiter !== undefined) return _webhookLimiter;

  const redis = getRedis();
  if (!redis) {
    _webhookLimiter = null;
    return null;
  }

  _webhookLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '10 s'),
    prefix: 'rl:webhook',
    analytics: false,
  });

  return _webhookLimiter;
}

/**
 * Get or create the revalidation API rate limiter.
 * Fixed window: 30 requests per minute.
 */
function getRevalidateLimiter(): Ratelimit | null {
  if (_revalidateLimiter !== undefined) return _revalidateLimiter;

  const redis = getRedis();
  if (!redis) {
    _revalidateLimiter = null;
    return null;
  }

  _revalidateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(30, '60 s'),
    prefix: 'rl:revalidate',
    analytics: false,
  });

  return _revalidateLimiter;
}

// ── Public API ───────────────────────────────────────────────────────────

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetSeconds: number;
}

/**
 * Apply webhook rate limiting (distributed via Redis, fallback to in-memory).
 *
 * @param identifier  Unique key (typically client IP)
 * @returns RateLimitResult with success flag and retry metadata
 */
export async function webhookRateLimit(identifier: string): Promise<RateLimitResult> {
  const limiter = getWebhookLimiter();

  if (limiter) {
    try {
      const { success, remaining, reset } = await limiter.limit(identifier);
      return {
        success,
        remaining: remaining ?? 0,
        resetSeconds: Math.max(0, Math.ceil((reset - Date.now()) / 1000)),
      };
    } catch (err) {
      console.warn('[Rate Limit] Redis rate limiter failed, falling back to in-memory:', err);
    }
  }

  // Fallback: in-memory rate limiter (per-worker, still useful)
  const result = inMemoryRateLimit(`webhook:${identifier}`, 100, 10_000);
  return {
    success: result.success,
    remaining: result.remaining,
    resetSeconds: Math.max(0, Math.ceil((result.resetTime - Date.now()) / 1000)),
  };
}

/**
 * Apply revalidation API rate limiting.
 *
 * @param identifier  Unique key (typically client IP)
 * @returns RateLimitResult
 */
export async function revalidateRateLimit(identifier: string): Promise<RateLimitResult> {
  const limiter = getRevalidateLimiter();

  if (limiter) {
    try {
      const { success, remaining, reset } = await limiter.limit(identifier);
      return {
        success,
        remaining: remaining ?? 0,
        resetSeconds: Math.max(0, Math.ceil((reset - Date.now()) / 1000)),
      };
    } catch (err) {
      console.warn('[Rate Limit] Redis rate limiter failed, falling back to in-memory:', err);
    }
  }

  // Fallback: in-memory rate limiter
  const result = inMemoryRateLimit(`revalidate:${identifier}`, 30, 60_000);
  return {
    success: result.success,
    remaining: result.remaining,
    resetSeconds: Math.max(0, Math.ceil((result.resetTime - Date.now()) / 1000)),
  };
}
