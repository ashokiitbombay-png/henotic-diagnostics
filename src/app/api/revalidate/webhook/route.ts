import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { getClientIP } from '@/lib/rate-limit';
import { verifyHMAC, verifyPayloadCMSSignature, timingSafeCompare, verifyTimestamp, checkNonce } from '@/lib/webhook/security';
import { webhookRateLimit } from '@/lib/webhook/rate-limiter';
import { enqueueRevalidation, flushAndProcess, FLUSH_DELAY_MS } from '@/lib/webhook/queue';
import { wpCacheInvalidate, wpCachePurgeByPrefix } from '@/lib/cache/wp-cache';
import { CACHE_TAGS } from '@/lib/cache/tags';
import { getRedis } from '@/lib/cache/redis';

// ── CMS Source Detection ─────────────────────────────────────────────────

type CMSSource = 'wordpress' | 'payload' | 'unknown';

interface NormalizedWebhookPayload {
  source: CMSSource;
  contentType: string | null;  // 'service' | 'post' | 'page' | 'condition' | null
  slug: string | null;
  action: string;
}

/**
 * Detect the CMS source from request headers.
 *
 * WordPress:   X-Webhook-Signature or X-Revalidation-Secret
 * Payload CMS: payload-signature
 */
function detectCMSSource(request: NextRequest): CMSSource {
  if (request.headers.get('payload-signature')) return 'payload';
  if (
    request.headers.get('X-Webhook-Signature') ||
    request.headers.get('X-Revalidation-Secret')
  ) return 'wordpress';
  return 'unknown';
}

/**
 * Normalize a CMS webhook payload into a unified shape.
 *
 * WordPress sends:  { post_type, post_name, action, ID }
 * Payload CMS sends: { collection, operation, doc: { slug, id, ... } }
 */
function normalizePayload(source: CMSSource, body: Record<string, unknown>): NormalizedWebhookPayload {
  if (source === 'payload') {
    const collection = body.collection as string | undefined;
    const operation = (body.operation || 'update') as string;
    const doc = body.doc as Record<string, unknown> | undefined;
    const slug = (doc?.slug || doc?.id || '') as string;

    // Map Payload CMS collections to our content types
    const typeMap: Record<string, string> = {
      services: 'service',
      posts: 'post',
      pages: 'page',
      conditions: 'condition',
      'blog-posts': 'post',
    };

    return {
      source,
      contentType: collection ? (typeMap[collection] || null) : null,
      slug: slug || null,
      action: operation,
    };
  }

  // WordPress (default)
  const postType = (body.post_type || body.postType) as string | undefined;
  const postSlug = (body.post_name || body.postName || body.slug) as string | undefined;
  const action = (body.action || body.status || 'update') as string;

  const typeMap: Record<string, string> = {
    service: 'service',
    post: 'post',
    page: 'page',
    condition: 'condition',
  };

  return {
    source,
    contentType: postType ? (typeMap[postType] || null) : null,
    slug: postSlug || null,
    action,
  };
}

// ── Main Handler ─────────────────────────────────────────────────────────

/**
 * Unified Webhook Handler — WordPress & Payload CMS
 *
 * Security layers:
 *   1. Rate limiting (Redis-backed distributed, 100 req/10s burst)
 *   2. Authentication (HMAC-SHA256 per CMS, or legacy secret fallback)
 *   3. Replay prevention (timestamp ±5 min + Redis nonce dedup)
 *
 * Bulk handling:
 *   - Each webhook enqueues its slug into a Redis Set (natural dedup)
 *   - First webhook in a batch triggers a 5-second flush timer
 *   - After 5s, all queued slugs are batch-processed via revalidateTag
 *   - If ≥50 unique slugs → full tag purge (cheaper)
 *   - If <50 → per-slug tag invalidation (precise, O(1) per slug)
 *
 * POST /api/revalidate/webhook
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

    // ── 3. Detect CMS Source & Authenticate ────────────────────────────
    const cmsSource = detectCMSSource(request);
    let authenticated = false;

    if (cmsSource === 'payload') {
      // Payload CMS: verify payload-signature header
      const payloadSecret = process.env.PAYLOAD_WEBHOOK_SECRET || process.env.WEBHOOK_SIGNING_SECRET;
      const payloadSig = request.headers.get('payload-signature');

      if (payloadSecret && payloadSig) {
        authenticated = verifyPayloadCMSSignature(rawBody, payloadSig, payloadSecret);
        if (!authenticated) {
          console.warn(`[Webhook] Payload CMS HMAC verification failed from IP: ${ip}`);
          return NextResponse.json({ message: 'Invalid Payload CMS signature' }, { status: 401 });
        }
      }
    } else {
      // WordPress: HMAC signature or legacy secret
      const signatureHeader = request.headers.get('X-Webhook-Signature');
      const legacySecret = request.headers.get('X-Revalidation-Secret') || (body.secret as string);
      const signingSecret = process.env.WEBHOOK_SIGNING_SECRET || process.env.REVALIDATION_SECRET;
      const revalidationSecret = process.env.REVALIDATION_SECRET;

      // Try HMAC-SHA256 first (more secure)
      if (signatureHeader && signingSecret) {
        authenticated = verifyHMAC(rawBody, signatureHeader, signingSecret);
        if (!authenticated) {
          console.warn(`[Webhook] WordPress HMAC verification failed from IP: ${ip}`);
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
    }

    if (!authenticated) {
      return NextResponse.json(
        { message: 'Authentication required. Provide X-Webhook-Signature, payload-signature, or X-Revalidation-Secret header.' },
        { status: 401 }
      );
    }

    // ── 4. Replay Prevention ───────────────────────────────────────────
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

    // Nonce deduplication
    const deliveryId = request.headers.get('X-Webhook-Delivery') || request.headers.get('payload-delivery-id');
    if (deliveryId) {
      const redis = getRedis();
      if (redis) {
        const isNew = await checkNonce(redis, deliveryId);
        if (!isNew) {
          console.log(`[Webhook] Duplicate delivery rejected: ${deliveryId}`);
          return NextResponse.json(
            { message: 'Duplicate webhook delivery', deliveryId },
            { status: 200 } // 200 so CMS doesn't retry
          );
        }
      }
    }

    // ── 5. Parse & Normalize Payload ───────────────────────────────────
    const { contentType, slug, action, source } = normalizePayload(cmsSource, body);

    if (!contentType || !slug) {
      return NextResponse.json(
        { message: 'Missing content type or slug in webhook payload' },
        { status: 400 }
      );
    }

    console.log(`📡 [Webhook] Received: ${action} ${contentType}/${slug} from ${source} (IP: ${ip})`);

    // ── 6. Enqueue for Batch Processing ────────────────────────────────
    const { queued, shouldFlush, queueSize } = await enqueueRevalidation(contentType, slug);

    if (queued) {
      if (shouldFlush) {
        scheduleFlush(contentType);
      }

      return NextResponse.json({
        ok: true,
        queued: true,
        source,
        contentType,
        slug,
        queueSize,
        message: `Queued for batch revalidation (window: ${FLUSH_DELAY_MS / 1000}s)`,
      }, { status: 202 });
    }

    // ── 7. Fallback: Immediate Tag-Based Processing (no Redis) ─────────
    console.log(`[Webhook] No Redis — processing ${contentType}/${slug} immediately via tags`);

    if (contentType === 'service') {
      await wpCacheInvalidate('service', slug);
      revalidateTag(CACHE_TAGS.service(slug), 'max');
      revalidateTag(CACHE_TAGS.servicesList, 'max');
    } else if (contentType === 'post') {
      await wpCacheInvalidate('post', slug);
      await wpCachePurgeByPrefix('posts');
      revalidateTag(CACHE_TAGS.post(slug), 'max');
      revalidateTag(CACHE_TAGS.postsList, 'max');
    } else if (contentType === 'page') {
      await wpCacheInvalidate('page', `/${slug}`);
      revalidateTag(CACHE_TAGS.page(`/${slug}`), 'max');
    } else if (contentType === 'condition') {
      revalidateTag(CACHE_TAGS.condition(slug), 'max');
      revalidateTag(CACHE_TAGS.conditionsList, 'max');
    }

    return NextResponse.json({
      ok: true,
      queued: false,
      source,
      contentType,
      slug,
      message: 'Processed immediately via tag-based revalidation (no queue available)',
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
 * In serverless (Vercel), the function has a generous execution timeout
 * (10s default, 60s max on Pro). The 5s debounce window fits within this.
 */
function scheduleFlush(type: string): void {
  setTimeout(async () => {
    try {
      const result = await flushAndProcess(type);
      console.log(`🔄 [Flush] ${type}: ${result.mode} — ${result.processed} slug(s) processed`);
    } catch (err) {
      console.error(`[Flush] Error processing ${type} queue:`, err);
    }
  }, FLUSH_DELAY_MS);
}
