import { getRedis } from './redis';

// ── Cache Configuration ──────────────────────────────────────────────────

/** Default TTL: 24 hours — matches ISR revalidation period */
const DEFAULT_TTL = 86400;

// ── Key Builder ──────────────────────────────────────────────────────────

/**
 * Cache key convention: `wp:{type}:{identifier}`
 * Examples: `wp:service:mri-scan`, `wp:post:understanding-mri`, `wp:posts:12:start`
 */
function buildKey(type: string, id: string): string {
  return `wp:${type}:${id}`;
}

// ── Cache-Through ────────────────────────────────────────────────────────

/**
 * Generic cache-through pattern for WordPress content.
 *
 * Flow:
 * 1. Check Redis → return immediately if cache hit
 * 2. Cache miss → execute the fetcher (GraphQL call)
 * 3. Store result in Redis with TTL (non-blocking write-behind)
 * 4. Return result
 *
 * If Redis is unavailable (no credentials or connection error),
 * the fetcher executes directly — zero disruption.
 *
 * @param type   Content type key (e.g., 'service', 'post', 'page')
 * @param id     Unique identifier (e.g., slug, URI, composite key)
 * @param fetcher Async function that fetches from WordPress
 * @param ttl    Cache TTL in seconds (default: 24h)
 */
export async function wpCacheThrough<T>(
  type: string,
  id: string,
  fetcher: () => Promise<T>,
  ttl: number = DEFAULT_TTL
): Promise<T> {
  const redis = getRedis();

  // Graceful degradation: no Redis → direct fetch
  if (!redis) return fetcher();

  const key = buildKey(type, id);

  // 1. Try cache hit
  try {
    const cached = await redis.get<T>(key);
    if (cached !== null && cached !== undefined) {
      return cached;
    }
  } catch (err) {
    console.warn(`[WP Cache] Redis GET failed for ${key}:`, err);
    // Fall through to fetcher on Redis error
  }

  // 2. Cache miss → execute fetcher
  const result = await fetcher();

  // 3. Write-behind: store in Redis without blocking the response
  if (result !== null && result !== undefined) {
    redis.set(key, result, { ex: ttl }).catch((err) => {
      console.warn(`[WP Cache] Redis SET failed for ${key}:`, err);
    });
  }

  return result;
}

// ── Cache Invalidation ───────────────────────────────────────────────────

/**
 * Invalidate a single WordPress content cache key.
 *
 * @param type Content type (e.g., 'service', 'post', 'page')
 * @param id   Unique identifier (slug, URI)
 * @returns true if key was deleted, false if Redis is unavailable
 */
export async function wpCacheInvalidate(type: string, id: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  const key = buildKey(type, id);
  try {
    await redis.del(key);
    console.log(`[WP Cache] Invalidated: ${key}`);
    return true;
  } catch (err) {
    console.warn(`[WP Cache] Redis DEL failed for ${key}:`, err);
    return false;
  }
}

/**
 * Invalidate all cache keys matching a content type prefix.
 * Uses SCAN to avoid blocking Redis (safe for production).
 *
 * @param prefix Content type prefix (e.g., 'service', 'post', 'page')
 * @returns Number of keys deleted
 */
export async function wpCachePurgeByPrefix(prefix: string): Promise<number> {
  const redis = getRedis();
  if (!redis) return 0;

  let cursor = 0;
  let deleted = 0;

  try {
    do {
      const result = await redis.scan(cursor, {
        match: `wp:${prefix}:*`,
        count: 100,
      });
      cursor = Number(result[0]);
      const keys = result[1] as string[];
      if (keys.length > 0) {
        await redis.del(...keys);
        deleted += keys.length;
      }
    } while (cursor !== 0);

    if (deleted > 0) {
      console.log(`[WP Cache] Purged ${deleted} keys with prefix "wp:${prefix}:*"`);
    }
  } catch (err) {
    console.warn(`[WP Cache] Purge by prefix "${prefix}" failed:`, err);
  }

  return deleted;
}
