import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { getClientIP } from '@/lib/rate-limit';
import { verifyHMAC, timingSafeCompare, verifyTimestamp, checkNonce } from '@/lib/webhook/security';
import { webhookRateLimit } from '@/lib/webhook/rate-limiter';
import { enqueueRevalidation, flushAndProcess, FLUSH_DELAY_MS } from '@/lib/webhook/queue';
import { wpCacheInvalidate, wpCachePurgeByPrefix } from '@/lib/cache/wp-cache';
import { getRedis } from '@/lib/cache/redis';

/**
 * WordPress Webhook Handler — Secure, Queued, Batch-Processing
 *
 * Security layers:
 *   1. Rate limiting (Redis-backed distributed, 100 req/10s burst)
 *   2. Authentication (HMAC-SHA256 signature OR legacy secret — backward compatible)
 *   3. Replay prevention (timestamp ±5 min + Redis nonce dedup)
 *
 * Bulk handling:
 *   - Each webhook enqueues its slug into a Redis Set (natural dedup)
 *   - First webhook in a batch triggers a 5-second flush timer
 *   - After 5s, all queued slugs are batch-processed in one pass
 *   - If ≥50 unique slugs → full layout purge (cheaper)
 *   - If <50 → per-service cascade invalidation (precise)
 *
 * POST /api/revalidate/webhook
 *
 * Headers:
 *   X-Webhook-Signature: sha256=<hmac>  (preferred)
 *   X-Revalidation-Secret: <token>       (legacy fallback)
 *   X-Webhook-Timestamp: <unix-seconds>  (replay prevention)
 *   X-Webhook-Delivery: <uuid>           (nonce dedup)
 *
 * Body:
 *   { post_type, post_name, action, ID }
 */
export async function POST(request: NextRequest) {
  try {
    // ── 1. Rate Limiting ───────────────────────────────────────────────
    const ip = getClientIP(request);
    const rateLimitResult = await webhookRateLimit(ip);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { message: 'Rate limit exceeded' },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.resetSeconds),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    // ── 2. Read Raw Body (needed for HMAC verification) ────────────────
    const rawBody = await request.text();
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
    }

    // ── 3. Authentication ──────────────────────────────────────────────
    // Support both HMAC signature (preferred) and legacy secret (backward compat)
    const signatureHeader = request.headers.get('X-Webhook-Signature');
    const legacySecret = request.headers.get('X-Revalidation-Secret') || (body.secret as string);
    const signingSecret = process.env.WEBHOOK_SIGNING_SECRET || process.env.REVALIDATION_SECRET;
    const revalidationSecret = process.env.REVALIDATION_SECRET;

    let authenticated = false;

    // Try HMAC-SHA256 first (more secure)
    if (signatureHeader && signingSecret) {
      authenticated = verifyHMAC(rawBody, signatureHeader, signingSecret);
      if (!authenticated) {
        console.warn(`[Webhook] HMAC verification failed from IP: ${ip}`);
        return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
      }
    }
    // Fallback: legacy secret comparison (timing-safe)
    else if (legacySecret && revalidationSecret) {
      authenticated = timingSafeCompare(legacySecret, revalidationSecret);
      if (!authenticated) {
        console.warn(`[Webhook] Secret verification failed from IP: ${ip}`);
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
      }
    }

    if (!authenticated) {
      return NextResponse.json(
        { message: 'Authentication required. Provide X-Webhook-Signature or X-Revalidation-Secret header.' },
        { status: 401 }
      );
    }

    // ── 4. Replay Prevention ───────────────────────────────────────────
    // Timestamp validation (±5 minutes)
    const timestampHeader = request.headers.get('X-Webhook-Timestamp');
    if (timestampHeader) {
      const { valid, ageSeconds } = verifyTimestamp(timestampHeader);
      if (!valid) {
        console.warn(`[Webhook] Stale timestamp rejected (age: ${ageSeconds}s) from IP: ${ip}`);
        return NextResponse.json(
          { message: 'Webhook timestamp expired. Request is too old or too far in the future.' },
          { status: 403 }
        );
      }
    }

    // Nonce deduplication (prevents replaying the exact same delivery)
    const deliveryId = request.headers.get('X-Webhook-Delivery');
    if (deliveryId) {
      const redis = getRedis();
      if (redis) {
        const isNew = await checkNonce(redis, deliveryId);
        if (!isNew) {
          console.log(`[Webhook] Duplicate delivery rejected: ${deliveryId}`);
          return NextResponse.json(
            { message: 'Duplicate webhook delivery', deliveryId },
            { status: 200 } // 200 so WordPress doesn't retry
          );
        }
      }
    }

    // ── 5. Parse Payload ───────────────────────────────────────────────
    const postType = (body.post_type || body.postType) as string | undefined;
    const postSlug = (body.post_name || body.postName || body.slug) as string | undefined;
    const action = (body.action || body.status || 'update') as string;

    if (!postType || !postSlug) {
      return NextResponse.json(
        { message: 'Missing post_type or post_name in webhook payload' },
        { status: 400 }
      );
    }

    // Normalize type for queue
    const queueType = postType === 'service' ? 'service'
      : postType === 'post' ? 'post'
      : postType === 'page' ? 'page'
      : null;

    if (!queueType) {
      console.warn(`[Webhook] Unknown post type: ${postType}`);
      return NextResponse.json({ ok: true, message: `Unknown post type: ${postType}` });
    }

    console.log(`📡 [Webhook] Received: ${action} ${queueType}/${postSlug} from ${ip}`);

    // ── 6. Enqueue for Batch Processing ────────────────────────────────
    const { queued, shouldFlush, queueSize } = await enqueueRevalidation(queueType, postSlug);

    if (queued) {
      // If this is the first item in a new batch, schedule the flush
      if (shouldFlush) {
        scheduleFlush(queueType);
      }

      return NextResponse.json({
        ok: true,
        queued: true,
        queueSize,
        message: `Queued for batch revalidation (window: ${FLUSH_DELAY_MS / 1000}s)`,
      }, { status: 202 });
    }

    // ── 7. Fallback: Immediate Processing (no Redis) ───────────────────
    // If Redis is unavailable, process immediately (same as before)
    console.log(`[Webhook] No Redis — processing ${queueType}/${postSlug} immediately`);

    if (queueType === 'service') {
      await wpCacheInvalidate('service', postSlug);
      revalidatePath(`/services/${postSlug}`, 'page');
    } else if (queueType === 'post') {
      await wpCacheInvalidate('post', postSlug);
      await wpCachePurgeByPrefix('posts');
      revalidatePath(`/blog/${postSlug}`, 'page');
      revalidatePath('/blog', 'page');
    } else if (queueType === 'page') {
      await wpCacheInvalidate('page', `/${postSlug}`);
      revalidatePath(`/${postSlug}`, 'page');
    }

    return NextResponse.json({
      ok: true,
      queued: false,
      message: 'Processed immediately (no queue available)',
    });

  } catch (error) {
    console.error('[Webhook] Unhandled error:', error);
    return NextResponse.json({ message: 'Internal webhook processing error' }, { status: 500 });
  }
}

// ── Flush Scheduler ──────────────────────────────────────────────────────

/**
 * Schedule a flush of the dedup queue after the debounce window.
 *
 * In serverless (Vercel), we can't use setTimeout reliably because the
 * function may terminate. Instead, we:
 *   1. Wait the debounce period using a setTimeout
 *   2. Call flushAndProcess() directly within the same execution context
 *
 * For Vercel, this works because edge/serverless functions have a generous
 * execution timeout (10s default, 60s max on Pro). The 5s debounce window
 * fits well within this.
 *
 * Alternative: Use Vercel's waitUntil() or QStash for truly async flush.
 */
function scheduleFlush(type: string): void {
  // Fire-and-forget: schedule the flush after debounce window
  // This runs within the serverless function's lifecycle
  setTimeout(async () => {
    try {
      const result = await flushAndProcess(type);
      console.log(`🔄 [Flush] ${type}: ${result.mode} — ${result.processed} slug(s) processed`);
    } catch (err) {
      console.error(`[Flush] Error processing ${type} queue:`, err);
    }
  }, FLUSH_DELAY_MS);
}
