import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { getClientIP } from '@/lib/rate-limit';
import { timingSafeCompare } from '@/lib/webhook/security';
import { revalidateRateLimit } from '@/lib/webhook/rate-limiter';
import { wpCacheInvalidate, wpCachePurgeByPrefix } from '@/lib/cache/wp-cache';
import { CACHE_TAGS } from '@/lib/cache/tags';

/**
 * Enhanced ISR Revalidation API
 * 
 * Supports five modes:
 * 
 * 1. Single path:      POST { secret, path: "/services/mri-scan" }
 * 2. Service cascade:  POST { secret, service: "mri-scan" }
 *    → Invalidates Redis key + revalidateTag for service (covers all PSEO pages)
 * 3. Full purge:       POST { secret, purge: true }
 *    → Purges all Redis service keys + revalidates all content tags
 * 4. Blog revalidate:  POST { secret, post: "understanding-mri" }
 *    → Invalidates single blog post Redis key + tag
 * 5. Tag revalidate:   POST { secret, tag: "wp:service:mri-scan" }
 *    → Directly revalidates a specific cache tag
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limit: Redis-backed distributed limiter (30 req/min)
    const ip = getClientIP(request);
    const rateLimitResult = await revalidateRateLimit(ip);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { message: 'Rate limit exceeded for revalidation requests.' },
        { status: 429, headers: { 'Retry-After': String(rateLimitResult.resetSeconds) } }
      );
    }

    const body = await request.json();
    const { secret, path, service, post, purge, tag } = body;

    // Security: Timing-safe secret verification
    const expectedSecret = process.env.REVALIDATION_SECRET;
    if (!expectedSecret || !secret || !timingSafeCompare(secret, expectedSecret)) {
      return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 });
    }

    // ── Mode 1: Full Purge ─────────────────────────────────────────────
    if (purge === true) {
      const deletedServices = await wpCachePurgeByPrefix('service');
      const deletedPosts = await wpCachePurgeByPrefix('post');
      const deletedPages = await wpCachePurgeByPrefix('page');
      const deletedPostLists = await wpCachePurgeByPrefix('posts');

      // Tag-based purge — covers ALL PSEO pages without enumerating paths
      revalidateTag(CACHE_TAGS.servicesList, 'max');
      revalidateTag(CACHE_TAGS.postsList, 'max');
      revalidateTag(CACHE_TAGS.conditionsList, 'max');
      revalidateTag(CACHE_TAGS.siteConfig, 'max');

      // Also revalidate layout paths for safety
      revalidatePath('/services', 'layout');
      revalidatePath('/blog', 'layout');

      return NextResponse.json({
        revalidated: true,
        mode: 'full-purge',
        redis: {
          services: deletedServices,
          posts: deletedPosts,
          pages: deletedPages,
          postLists: deletedPostLists,
        },
        now: Date.now()
      });
    }

    // ── Mode 2: Service Cascade (Tag-Based) ───────────────────────────
    if (service) {
      await wpCacheInvalidate('service', service);

      // Single tag call invalidates ALL pages using this service data:
      // /services/[slug] + /services/[slug]/[region] + /services/[slug]/[region]/[location]
      revalidateTag(CACHE_TAGS.service(service), 'max');
      revalidateTag(CACHE_TAGS.servicesList, 'max');

      return NextResponse.json({
        revalidated: true,
        mode: 'service-tag-cascade',
        service,
        tag: CACHE_TAGS.service(service),
        message: 'All PSEO pages (service + region + location) invalidated via tag',
        redisPurged: true,
        now: Date.now()
      });
    }

    // ── Mode 3: Blog Post ──────────────────────────────────────────────
    if (post) {
      await wpCacheInvalidate('post', post);
      await wpCachePurgeByPrefix('posts');
      revalidateTag(CACHE_TAGS.post(post), 'max');
      revalidateTag(CACHE_TAGS.postsList, 'max');

      return NextResponse.json({
        revalidated: true,
        mode: 'blog-post-tag',
        post,
        tag: CACHE_TAGS.post(post),
        now: Date.now()
      });
    }

    // ── Mode 4: Direct Tag Revalidation ────────────────────────────────
    if (tag) {
      revalidateTag(tag, 'max');
      return NextResponse.json({
        revalidated: true,
        mode: 'direct-tag',
        tag,
        now: Date.now()
      });
    }

    // ── Mode 5: Single Path (original behavior) ────────────────────────
    if (path) {
      revalidatePath(path, 'page');
      return NextResponse.json({ revalidated: true, mode: 'single-path', path, now: Date.now() });
    }

    // ── Fallback: Revalidate all services ──────────────────────────────
    revalidateTag(CACHE_TAGS.servicesList, 'max');
    revalidatePath('/services', 'layout');
    return NextResponse.json({
      revalidated: true,
      mode: 'fallback',
      message: 'All services layout and tags revalidated',
      now: Date.now()
    });

  } catch (error) {
    console.error('Revalidation Error:', error);
    return NextResponse.json({ message: 'Error processing revalidation request' }, { status: 500 });
  }
}
