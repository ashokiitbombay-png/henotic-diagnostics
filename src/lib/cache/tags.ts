/**
 * Master registry of Next.js cache tags for content invalidation.
 * 
 * Architecture: When a CMS webhook fires for a service slug update,
 * calling `revalidateTag(CACHE_TAGS.service('mri-scan'))` invalidates
 * ALL pages that fetched data using that tag — the service detail page,
 * all 9 region pages, and all 80+ location pages — in a single O(1) call.
 * This eliminates the need to enumerate paths manually.
 */
export const CACHE_TAGS = {
  // ── Service Tags ────────────────────────────────────────────────────
  /** Tag for a specific service's content (cascades to all region/location pages) */
  service: (slug: string) => `wp:service:${slug}`,
  /** Tag for the services directory listing */
  servicesList: 'wp:services-list',

  // ── Blog Tags ───────────────────────────────────────────────────────
  /** Tag for a specific blog post */
  post: (slug: string) => `wp:post:${slug}`,
  /** Tag for the blog listing pages */
  postsList: 'wp:posts-list',

  // ── Page Tags ───────────────────────────────────────────────────────
  /** Tag for a specific CMS page (about, privacy, etc.) */
  page: (uri: string) => `wp:page:${uri}`,

  // ── Condition Tags ──────────────────────────────────────────────────
  /** Tag for a specific medical condition page */
  condition: (slug: string) => `wp:condition:${slug}`,
  /** Tag for the conditions directory listing */
  conditionsList: 'wp:conditions-list',

  // ── City Tags ───────────────────────────────────────────────────────
  /** Tag for a specific city landing page */
  city: (slug: string) => `wp:city:${slug}`,

  // ── Global Tags ─────────────────────────────────────────────────────
  /** Tag for site-wide configuration (header, footer, menus) */
  siteConfig: 'wp:site-config',
} as const;
