/**
 * Master registry of Next.js cache tags for WordPress content.
 * Enforces standardized tags for On-Demand Incremental Static Regeneration (ISR).
 */
export const CACHE_TAGS = {
  service: (slug: string) => `wordpress:service:${slug}`,
  servicesList: "wordpress:services-list",
  page: (uri: string) => `wordpress:page:${uri}`,
  siteConfig: "wordpress:site-config"
} as const;
