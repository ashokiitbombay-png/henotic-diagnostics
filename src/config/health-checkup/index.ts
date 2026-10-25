import type { HealthCheckupPageContent, HealthPackage } from './types';
import { HEALTH_CHECKUP_PAGES_A } from './pages-a';
import { HEALTH_CHECKUP_PAGES_B } from './pages-b';

export * from './types';
export { STATIC_HEALTH_PACKAGES, MIN_PACKAGE_PRICE } from './packages';
export { STATIC_TRUST_CONTENT, EXACT_SPECTRUM_CSS, LAB_PHONE_DISPLAY, LAB_PHONE_TEL, LAB_WHATSAPP_NUMBER } from './trust';
export { HC_IMAGES } from './pages-a';

/** Static fallback content for all 26 health checkup authority pages. */
export const STATIC_HEALTH_CHECKUP_PAGES: HealthCheckupPageContent[] = [
  ...HEALTH_CHECKUP_PAGES_A,
  ...HEALTH_CHECKUP_PAGES_B,
];

const PAGE_MAP = new Map(STATIC_HEALTH_CHECKUP_PAGES.map((p) => [p.slug, p]));

/** Ordered list of the 26 authority slugs (keyword order supplied by SEO brief). */
export const HEALTH_CHECKUP_SLUGS: string[] = STATIC_HEALTH_CHECKUP_PAGES.map((p) => p.slug);

/** O(1) check used by the `/services/[service]` route to branch rendering. */
export function isHealthCheckupAuthoritySlug(slug: string): boolean {
  return PAGE_MAP.has(slug);
}

export function getStaticHealthCheckupPage(slug: string): HealthCheckupPageContent | undefined {
  return PAGE_MAP.get(slug);
}

export function getHealthCheckupKeyword(slug: string): string | undefined {
  return PAGE_MAP.get(slug)?.keyword;
}

/** Format a rupee amount with Indian digit grouping (e.g. 12500 → "12,500"). */
export function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value);
}

/**
 * Order packages so the page's featured codes come first (in the given order)
 * followed by the remaining packages in their original order.
 */
export function orderPackagesForPage(packages: HealthPackage[], featuredCodes: string[]): HealthPackage[] {
  const rank = new Map(featuredCodes.map((code, i) => [code, i]));
  return [...packages].sort((a, b) => {
    const ra = rank.has(a.code) ? (rank.get(a.code) as number) : Number.MAX_SAFE_INTEGER;
    const rb = rank.has(b.code) ? (rank.get(b.code) as number) : Number.MAX_SAFE_INTEGER;
    if (ra !== rb) return ra - rb;
    return packages.indexOf(a) - packages.indexOf(b);
  });
}

/**
 * Resolve `{minPrice}`, `{packageCount}` and `{maxDiscount}` tokens in copy
 * from live package data so prices in titles/descriptions never go stale
 * when packages are edited in Payload CMS.
 */
export function buildTokenResolver(packages: HealthPackage[], featuredCodes: string[]) {
  const featured = packages.filter((p) => featuredCodes.includes(p.code));
  const pool = featured.length > 0 ? featured : packages;
  const minPrice = pool.length ? Math.min(...pool.map((p) => p.offerPrice)) : 0;
  const maxDiscountPct = pool.reduce((max, p) => {
    const pct = p.mrp > 0 ? Math.round(((p.mrp - p.offerPrice) / p.mrp) * 100) : 0;
    return Math.max(max, pct);
  }, 0);
  const tokens: Record<string, string> = {
    minPrice: formatINR(minPrice),
    packageCount: String(packages.length),
    maxDiscount: `${maxDiscountPct}%`,
  };
  return (text: string): string => text.replace(/\{(minPrice|packageCount|maxDiscount)\}/g, (_, key: string) => tokens[key] ?? '');
}

/** Apply the token resolver to every user-facing string field of a page. */
export function resolvePageTokens(
  page: HealthCheckupPageContent,
  resolve: (text: string) => string,
): HealthCheckupPageContent {
  return {
    ...page,
    metaTitle: resolve(page.metaTitle),
    metaDescription: resolve(page.metaDescription),
    h1: resolve(page.h1),
    eyebrow: resolve(page.eyebrow),
    intro: resolve(page.intro),
    quickAnswer: resolve(page.quickAnswer),
    whoShouldBook: page.whoShouldBook.map(resolve),
    sections: page.sections.map((s) => ({ heading: resolve(s.heading), body: resolve(s.body) })),
    preparation: page.preparation.map(resolve),
    faqs: page.faqs.map((f) => ({ question: resolve(f.question), answer: resolve(f.answer) })),
  };
}
