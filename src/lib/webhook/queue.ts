import { revalidateTag } from 'next/cache';
import { getRedis } from '@/lib/cache/redis';
import { wpCacheInvalidate, wpCachePurgeByPrefix } from '@/lib/cache/wp-cache';
import { CACHE_TAGS } from '@/lib/cache/tags';

// ── Constants ────────────────────────────────────────────────────────────

/** Deduplication window: collect slugs for this many seconds before flushing */
const DEBOUNCE_SECONDS = 5;

/** If more than this many unique slugs in a batch, do a full purge instead */
const FULL_PURGE_THRESHOLD = 50;

/** Redis key prefixes for the queue sets */
const QUEUE_KEY = (type: string) => `revalidate:queue:${type}`;
const LOCK_KEY = (type: string) => `revalidate:lock:${type}`;

// ── Enqueue ──────────────────────────────────────────────────────────────

/**
 * Add a slug to the deduplication queue.
 *
 * How it works:
 * 1. SADD the slug to a Redis Set (natural dedup — sets only store unique values)
 * 2. If this is the first slug (set was just created), set a TTL on the key
 *    as a safety net and return `shouldFlush: true` so the caller knows
 *    to schedule a flush.
 *
 * @param type  Content type ('service', 'post', 'page', 'condition')
 * @param slug  The content slug to queue for revalidation
 * @returns { queued: boolean, shouldFlush: boolean, queueSize: number }
 */
export async function enqueueRevalidation(
  type: string,
  slug: string
): Promise<{ queued: boolean; shouldFlush: boolean; queueSize: number }> {
  const redis = getRedis();

  if (!redis) {
    // No Redis → process immediately (no queuing)
    return { queued: false, shouldFlush: false, queueSize: 0 };
  }

  const key = QUEUE_KEY(type);

  try {
    // SADD returns the number of NEW elements added (0 if slug already in set)
    const added = await redis.sadd(key, slug);
    const size = await redis.scard(key);

    // Set a safety TTL on the queue key (auto-expire if flush never happens)
    if (added > 0 && size === 1) {
      // First slug in a new batch — set TTL and signal flush needed
      await redis.expire(key, DEBOUNCE_SECONDS + 10); // 10s safety margin
      return { queued: true, shouldFlush: true, queueSize: 1 };
    }

    return { queued: true, shouldFlush: false, queueSize: size };
  } catch (err) {
    console.warn(`[Queue] Failed to enqueue ${type}/${slug}:`, err);
    return { queued: false, shouldFlush: false, queueSize: 0 };
  }
}

// ── Flush & Process ──────────────────────────────────────────────────────

/**
 * Atomically read and clear the deduplication queue, then batch-process
 * all queued slugs using tag-based revalidation.
 *
 * KEY ARCHITECTURE DECISION:
 * Instead of calling revalidatePath for each path (O(n × regions × locations)),
 * we use revalidateTag which invalidates ALL pages that fetched data with
 * that tag — a single O(1) call per slug, regardless of how many PSEO
 * pages (service/region/location combinations) exist.
 *
 * Uses a Redis lock to prevent concurrent flushes from racing.
 *
 * @param type  Content type ('service', 'post', 'page', 'condition')
 * @returns Summary of what was processed
 */
export async function flushAndProcess(type: string): Promise<{
  processed: number;
  slugs: string[];
  mode: 'tag-invalidate' | 'full-purge' | 'empty' | 'skipped';
}> {
  const redis = getRedis();

  if (!redis) {
    return { processed: 0, slugs: [], mode: 'skipped' };
  }

  const lockKey = LOCK_KEY(type);
  const queueKey = QUEUE_KEY(type);

  // Acquire lock (SET NX EX) — prevents concurrent flushes
  const lockAcquired = await redis.set(lockKey, '1', { nx: true, ex: 30 });
  if (!lockAcquired) {
    console.log(`[Queue] Flush already in progress for ${type} — skipping`);
    return { processed: 0, slugs: [], mode: 'skipped' };
  }

  try {
    // Atomically read all members and delete the set
    const slugs = await redis.smembers(queueKey) as string[];
    await redis.del(queueKey);

    if (slugs.length === 0) {
      return { processed: 0, slugs: [], mode: 'empty' };
    }

    console.log(`🔄 [Queue] Flushing ${slugs.length} ${type} slug(s): [${slugs.slice(0, 10).join(', ')}${slugs.length > 10 ? '...' : ''}]`);

    // ── Smart Threshold Decision ─────────────────────────────────────
    if (type === 'service') {
      if (slugs.length >= FULL_PURGE_THRESHOLD) {
        // Too many — full purge is cheaper than individual tag invalidations
        await wpCachePurgeByPrefix('service');
        revalidateTag(CACHE_TAGS.servicesList, 'max');
        console.log(`✅ [Queue] Full service tag purge (${slugs.length} slugs exceeded threshold)`);
        return { processed: slugs.length, slugs, mode: 'full-purge' };
      }

      // Per-service tag-based invalidation — O(1) per slug
      for (const slug of slugs) {
        await wpCacheInvalidate('service', slug);
        // This single call invalidates /services/[slug], /services/[slug]/[region],
        // AND /services/[slug]/[region]/[location] — all pages that used this tag
        revalidateTag(CACHE_TAGS.service(slug), 'max');
      }
      // Also invalidate the services list page
      revalidateTag(CACHE_TAGS.servicesList, 'max');
      console.log(`✅ [Queue] Tag-invalidated ${slugs.length} service(s) — all PSEO pages included`);
      return { processed: slugs.length, slugs, mode: 'tag-invalidate' };
    }

    if (type === 'post') {
      // Blog posts: purge list cache + invalidate each post tag
      await wpCachePurgeByPrefix('posts');
      for (const slug of slugs) {
        await wpCacheInvalidate('post', slug);
        revalidateTag(CACHE_TAGS.post(slug), 'max');
      }
      revalidateTag(CACHE_TAGS.postsList, 'max');
      console.log(`✅ [Queue] Tag-invalidated ${slugs.length} blog post(s)`);
      return { processed: slugs.length, slugs, mode: 'tag-invalidate' };
    }

    if (type === 'page') {
      for (const slug of slugs) {
        await wpCacheInvalidate('page', `/${slug}`);
        revalidateTag(CACHE_TAGS.page(`/${slug}`), 'max');
      }
      console.log(`✅ [Queue] Tag-invalidated ${slugs.length} page(s)`);
      return { processed: slugs.length, slugs, mode: 'tag-invalidate' };
    }

    if (type === 'condition') {
      for (const slug of slugs) {
        revalidateTag(CACHE_TAGS.condition(slug), 'max');
      }
      revalidateTag(CACHE_TAGS.conditionsList, 'max');
      console.log(`✅ [Queue] Tag-invalidated ${slugs.length} condition(s)`);
      return { processed: slugs.length, slugs, mode: 'tag-invalidate' };
    }

    return { processed: 0, slugs, mode: 'skipped' };
  } finally {
    // Always release lock
    await redis.del(lockKey).catch(() => {});
  }
}

/**
 * Get the debounce delay in milliseconds.
 * Exposed for use by the webhook handler to schedule the flush.
 */
export const FLUSH_DELAY_MS = DEBOUNCE_SECONDS * 1000;
