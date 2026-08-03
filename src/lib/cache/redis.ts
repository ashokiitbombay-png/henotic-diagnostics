import { Redis } from '@upstash/redis';

// ── Singleton Redis Client ───────────────────────────────────────────────
// Gracefully degrades: returns null if Upstash credentials are not configured.
// All consumers MUST handle the null case (cache-through utilities do this).

let _redis: Redis | null | undefined;

/**
 * Returns the singleton Upstash Redis client, or null if credentials
 * are not configured. Safe to call in any environment.
 */
export function getRedis(): Redis | null {
  if (_redis !== undefined) return _redis;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn('[Redis] UPSTASH credentials not configured — Redis cache layer disabled.');
    _redis = null;
    return null;
  }

  _redis = new Redis({ url, token });
  return _redis;
}
