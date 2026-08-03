import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getClientIP } from '@/lib/rate-limit';
import { timingSafeCompare } from '@/lib/webhook/security';
import { revalidateRateLimit } from '@/lib/webhook/rate-limiter';
import { wpCacheInvalidate, wpCachePurgeByPrefix } from '@/lib/cache/wp-cache';
import { REGION_NAMES } from '@/config/locations';

/**
 * Enhanced ISR Revalidation API
 * 
 * Supports three modes:
 * 
 * 1. Single path:     POST { secret, path: "/services/mri-scan" }
 * 2. Service cascade: POST { secret, service: "mri-scan" }
 *    → Invalidates Redis key + ISR tag for service + all region/location pages
 * 3. Full purge:      POST { secret, purge: true }
 *    → Purges all Redis service keys + revalidates entire /services layout
 * 4. Blog revalidate: POST { secret, post: "understanding-mri" }
 *    → Invalidates single blog post Redis key + ISR path
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
    const { secret, path, service, post, purge } = body;

    // Security: Timing-safe secret verification
    const expectedSecret = process.env.REVALIDATION_SECRET;
    if (!expectedSecret || !secret || !timingSafeCompare(secret, expectedSecret)) {
      return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
    }

    // ── Mode 1: Full Purge ─────────────────────────────────────────────
    if (purge === true) {
      const deletedServices = await wpCachePurgeByPrefix('service');
      const deletedPosts = await wpCachePurgeByPrefix('post');
      const deletedPages = await wpCachePurgeByPrefix('page');
      const deletedPostLists = await wpCachePurgeByPrefix('posts');

      revalidatePath("/services", "layout");
      revalidatePath("/blog", "layout");

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

    // ── Mode 2: Service Cascade ────────────────────────────────────────
    if (service) {
      // Invalidate Redis cache for this service
      await wpCacheInvalidate('service', service);

      // Revalidate specific paths (cascade across all regions)
      const revalidatedPaths: string[] = [`/services/${service}`];
      revalidatePath(`/services/${service}`, "page");

      // Revalidate all region hub pages for this service
      for (const region of Object.keys(REGION_NAMES)) {
        const regionPath = `/services/${service}/${region}`;
        revalidatePath(regionPath, "page");
        revalidatedPaths.push(regionPath);
      }

      return NextResponse.json({
        revalidated: true,
        mode: 'service-cascade',
        service,
        pathsInvalidated: revalidatedPaths.length,
        redisPurged: true,
        now: Date.now()
      });
    }

    // ── Mode 3: Blog Post ──────────────────────────────────────────────
    if (post) {
      await wpCacheInvalidate('post', post);
      // Also purge blog list cache since it may contain stale data
      await wpCachePurgeByPrefix('posts');
      revalidatePath(`/blog/${post}`, "page");
      revalidatePath("/blog", "page");

      return NextResponse.json({
        revalidated: true,
        mode: 'blog-post',
        post,
        now: Date.now()
      });
    }

    // ── Mode 4: Single Path (original behavior) ────────────────────────
    if (path) {
      revalidatePath(path, "page");
      return NextResponse.json({ revalidated: true, mode: 'single-path', path, now: Date.now() });
    }

    // ── Fallback: Revalidate all services ──────────────────────────────
    revalidatePath("/services", "layout");
    return NextResponse.json({
      revalidated: true,
      mode: 'fallback',
      message: "All services layout revalidated",
      now: Date.now()
    });

  } catch (error) {
    console.error("Revalidation Error:", error);
    return NextResponse.json({ message: "Error processing revalidation request" }, { status: 500 });
  }
}