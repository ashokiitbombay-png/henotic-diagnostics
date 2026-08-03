import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIP } from '@/lib/rate-limit';
import { wpCacheInvalidate, wpCachePurgeByPrefix } from '@/lib/cache/wp-cache';

/**
 * WordPress Webhook Handler for On-Demand ISR
 * 
 * WordPress sends a POST request when content is created, updated, or deleted.
 * This endpoint auto-detects the content type and triggers surgical cache
 * invalidation across both Redis and Next.js ISR.
 * 
 * Expected WordPress webhook payload:
 * {
 *   "post_type": "service" | "post" | "page",
 *   "post_name": "mri-scan",         // slug
 *   "post_status": "publish",
 *   "action": "publish" | "update" | "delete" | "trash",
 *   "ID": 123
 * }
 * 
 * Authentication: X-Revalidation-Secret header or body.secret
 * 
 * WordPress setup:
 * 1. Install WP Webhooks or WPGraphQL Smart Cache plugin
 * 2. Add webhook URL: https://www.henoticdiagnostics.com/api/revalidate/webhook
 * 3. Set header: X-Revalidation-Secret: <REVALIDATION_SECRET>
 * 4. Events: post.published, post.updated, post.deleted
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limit: 20 webhook calls per minute per IP
    const ip = getClientIP(request);
    const limiter = rateLimit(`webhook:${ip}`, 20, 60_000);
    if (!limiter.success) {
      return NextResponse.json(
        { message: 'Rate limit exceeded' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((limiter.resetTime - Date.now()) / 1000)) } }
      );
    }

    // Authenticate: check header first, then body
    const headerSecret = request.headers.get('X-Revalidation-Secret');
    const body = await request.json().catch(() => ({}));
    const secret = headerSecret || body.secret;

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const postType = body.post_type || body.postType;
    const postSlug = body.post_name || body.postName || body.slug;
    const action = body.action || body.status || 'update';

    if (!postType || !postSlug) {
      return NextResponse.json(
        { message: "Missing post_type or post_name in webhook payload" },
        { status: 400 }
      );
    }

    console.log(`📡 [Webhook] Received: ${action} ${postType}/${postSlug}`);

    const result: {
      contentType: string;
      slug: string;
      action: string;
      redisInvalidated: boolean;
      isrRevalidated: boolean;
      paths: string[];
    } = {
      contentType: postType,
      slug: postSlug,
      action,
      redisInvalidated: false,
      isrRevalidated: false,
      paths: [],
    };

    // ── Service Content Updated ──────────────────────────────────────────
    if (postType === 'service') {
      result.redisInvalidated = await wpCacheInvalidate('service', postSlug);
      
      // Path-based cascade revalidation for service and all its region pages
      revalidatePath(`/services/${postSlug}`, "page");
      result.paths.push(`/services/${postSlug}`);
      result.isrRevalidated = true;
    }

    // ── Blog Post Updated ────────────────────────────────────────────────
    else if (postType === 'post') {
      result.redisInvalidated = await wpCacheInvalidate('post', postSlug);
      
      // Purge blog list caches (post order / content may have changed)
      await wpCachePurgeByPrefix('posts');
      
      revalidatePath(`/blog/${postSlug}`, "page");
      revalidatePath("/blog", "page");
      result.isrRevalidated = true;
      result.paths.push(`/blog/${postSlug}`, '/blog');
    }

    // ── Static Page Updated ──────────────────────────────────────────────
    else if (postType === 'page') {
      result.redisInvalidated = await wpCacheInvalidate('page', `/${postSlug}`);
      revalidatePath(`/${postSlug}`, "page");
      result.isrRevalidated = true;
      result.paths.push(`/${postSlug}`);
    }

    // ── Unknown Content Type ─────────────────────────────────────────────
    else {
      console.warn(`[Webhook] Unknown post type: ${postType}`);
      return NextResponse.json({
        message: `Unknown post type: ${postType}`,
        handled: false,
      }, { status: 200 });
    }

    console.log(`✅ [Webhook] Processed: ${result.contentType}/${result.slug} → ${result.paths.length} paths revalidated`);

    return NextResponse.json({
      revalidated: true,
      ...result,
      now: Date.now()
    });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ message: "Error processing webhook" }, { status: 500 });
  }
}
