import type {
  NiptLocationContext,
  NiptPageContent,
  NiptPageData,
  NiptPanel,
} from './types';
import { STATIC_NIPT_PANELS } from './panels';
import { NIPT_PAGES_A } from './pages-a';
import { NIPT_PAGES_B } from './pages-b';

export * from './types';
export * from './panels';
export { STATIC_NIPT_TRUST_CONTENT } from './trust';

/** Static fallback content for all 20 NIPT Test authority pages. */
export const STATIC_NIPT_PAGES: NiptPageContent[] = [
  ...NIPT_PAGES_A,
  ...NIPT_PAGES_B,
];

const PAGE_MAP = new Map(STATIC_NIPT_PAGES.map((p) => [p.slug, p]));

/** Exact 20 ordered NIPT authority keyword slugs. */
export const NIPT_AUTHORITY_SLUGS: string[] = STATIC_NIPT_PAGES.map((p) => p.slug);

/**
 * Legacy / synonym NIPT slugs in `services` that also render the rich NIPT authority
 * suite across multi-tier routes while keeping the canonical 20 in `NIPT_AUTHORITY_SLUGS`.
 */
export const NIPT_SYNONYM_SLUGS = new Set(['nips-test', 'nippt']);

/** All slugs routed to the NIPT authority suite across Tier 1, Tier 2 & Tier 3. */
export const NIPT_MULTI_TIER_SLUGS = new Set([
  ...NIPT_AUTHORITY_SLUGS,
  ...NIPT_SYNONYM_SLUGS,
]);

/** O(1) check for exact 20 NIPT authority slugs (e.g., for sitemap-nipt-tests.xml). */
export function isNiptAuthoritySlug(slug: string): boolean {
  return PAGE_MAP.has(slug);
}

/** O(1) check used across Tier 1, Tier 2, and Tier 3 service routes. */
export function isNiptService(slug: string): boolean {
  return NIPT_MULTI_TIER_SLUGS.has(slug);
}

/** Look up static NIPT page content (falling back to `nipt-test` for synonym slugs like `nips-test` / `nippt`). */
export function getStaticNiptPage(slug: string): NiptPageContent | undefined {
  return PAGE_MAP.get(slug) ?? (NIPT_SYNONYM_SLUGS.has(slug) ? PAGE_MAP.get('nipt-test') : undefined);
}

/** Format rupee amount with Indian digit grouping (e.g. 10000 -> "10,000"). */
export function formatNiptINR(value: number): string {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value);
}

/**
 * Order panels so the page's featured codes come first (in the given order)
 * followed by any remaining panels in their original order.
 */
export function orderPanelsForPage(panels: NiptPanel[], featuredCodes: string[]): NiptPanel[] {
  const rank = new Map(featuredCodes.map((code, i) => [code, i]));
  return [...panels].sort((a, b) => {
    const ra = rank.has(a.code) ? (rank.get(a.code) as number) : Number.MAX_SAFE_INTEGER;
    const rb = rank.has(b.code) ? (rank.get(b.code) as number) : Number.MAX_SAFE_INTEGER;
    if (ra !== rb) return ra - rb;
    return panels.indexOf(a) - panels.indexOf(b);
  });
}

/**
 * Resolve `{minPrice}`, `{panelCount}` and `{maxDiscount}` tokens in copy
 * from live panel data so prices never drift when updated in Payload CMS.
 */
export function buildNiptTokenResolver(panels: NiptPanel[], featuredCodes: string[]) {
  const featured = panels.filter((p) => featuredCodes.includes(p.code));
  const pool = featured.length > 0 ? featured : panels;
  const minPrice = pool.length ? Math.min(...pool.map((p) => p.offerPrice)) : 0;
  const maxDiscountPct = pool.reduce((max, p) => {
    const pct = p.mrp > 0 ? Math.round(((p.mrp - p.offerPrice) / p.mrp) * 100) : 0;
    return Math.max(max, pct);
  }, 0);
  const tokens: Record<string, string> = {
    minPrice: formatNiptINR(minPrice),
    panelCount: String(panels.length),
    maxDiscount: `${maxDiscountPct}%`,
  };
  return (text: string): string =>
    text.replace(/\{(minPrice|panelCount|maxDiscount)\}/g, (_, key: string) => tokens[key] ?? '');
}

/** Apply token resolver to every user-facing string field of an NIPT page. */
export function resolveNiptPageTokens(
  page: NiptPageContent,
  resolve: (text: string) => string,
): NiptPageContent {
  return {
    ...page,
    metaTitle: resolve(page.metaTitle),
    metaDescription: resolve(page.metaDescription),
    h1: resolve(page.h1),
    heroSubtitle: resolve(page.heroSubtitle),
    eyebrow: resolve(page.eyebrow),
    intro: resolve(page.intro),
    quickAnswer: resolve(page.quickAnswer),
    whoShouldBook: page.whoShouldBook.map(resolve),
    sections: page.sections.map((s) => ({ heading: resolve(s.heading), body: resolve(s.body) })),
    faqs: page.faqs.map((f) => ({ question: resolve(f.question), answer: resolve(f.answer) })),
  };
}

/**
 * Adapt page metadata, H1, quick answer, and local trust copy dynamically
 * for Tier 2 Region Hubs and all 361 Tier 3 micro-city pages.
 */
export function localizeNiptPageData(
  data: NiptPageData,
  locationContext?: NiptLocationContext,
): NiptPageData {
  if (!locationContext?.regionName && !locationContext?.locationName) {
    return data;
  }

  const { page, panels } = data;
  const minPrice = panels.length ? formatNiptINR(Math.min(...panels.map((p) => p.offerPrice))) : '10,000';
  const regionName = locationContext.regionName;
  const locationName = locationContext.locationName;
  const pincode = locationContext.pincode;
  const turnaround = locationContext.homeCollectionTurnaround || '30–60 mins';
  const nearestHub = locationContext.nearestPartnerHub || 'Henotic Diagnostics Kharghar NGS Wing';

  if (locationName && regionName) {
    const pinClause = pincode ? ` (PIN ${pincode})` : '';
    const locTitle = `Best ${page.keyword} in ${locationName}, ${regionName} | From ₹${minPrice}`;
    const locDesc = `Book ${page.keyword} in ${locationName}, ${regionName}${pinClause} from ₹${minPrice}. Home maternal cfDNA pickup in ${turnaround}, no fasting, MD Genetics report in 7–10 days.`;

    return {
      ...data,
      locationContext,
      page: {
        ...page,
        metaTitle: locTitle.length <= 68 ? locTitle : `${page.keyword} in ${locationName} | ₹${minPrice} – Henotic`,
        metaDescription: locDesc,
        h1: `Best ${page.keyword} in ${locationName}, ${regionName}`,
        heroSubtitle: `Safe, non-invasive maternal blood cfDNA screening near you in ${locationName}, ${regionName}${pinClause}. Doorstep phlebotomy arrival within ${turnaround}, zero fetal risk, and 7–10 day MD Genetics verified reports.`,
        intro: `${page.intro} Patients in ${locationName}, ${regionName}${pinClause} receive priority doorstep cfDNA collection via ${nearestHub} with temperature-controlled transport to our Kharghar NGS facility.`,
        quickAnswer: `${page.keyword} in ${locationName}, ${regionName}${pinClause} starts at ₹${minPrice} at Henotic Diagnostics. Expectant mothers from 10 weeks onwards get doorstep blood collection within ${turnaround} (no fasting required), NGS screening for Trisomy 21/18/13 and microdeletions, and MD-verified reports in 7–10 days.`,
        primaryImage: {
          ...page.primaryImage,
          alt: `${page.keyword} in ${locationName}, ${regionName} at Henotic Diagnostics`,
          caption: `${page.keyword} with doorstep maternal cfDNA pickup in ${locationName}, ${regionName}${pinClause}.`,
        },
      },
    };
  }

  if (regionName) {
    const regTitle = `Best ${page.keyword} in ${regionName} | Panels From ₹${minPrice}`;
    const regDesc = `Book ${page.keyword} across ${regionName} from ₹${minPrice}. Safe 10+ week cfDNA Down syndrome & microdeletion screening with 24/7 home pickup & 7–10 day MD reports.`;

    return {
      ...data,
      locationContext,
      page: {
        ...page,
        metaTitle: regTitle.length <= 68 ? regTitle : `${page.keyword} in ${regionName} | From ₹${minPrice}`,
        metaDescription: regDesc,
        h1: `Best ${page.keyword} Centers in ${regionName}`,
        heroSubtitle: `Access NABL & CAP-aligned ${page.keyword} across all neighbourhoods in ${regionName}. Select your area below for doorstep cfDNA blood collection and transparent ₹10,000–₹15,000 packages.`,
        intro: `${page.intro} Serving expectant mothers and obstetric clinics across every hub in ${regionName} with dedicated home maternal cfDNA sample collection.`,
        quickAnswer: `${page.keyword} across ${regionName} starts at ₹${minPrice} at Henotic Diagnostics. From 10 weeks of pregnancy, expectant mothers across ${regionName} can schedule zero-risk, no-fasting home blood collection for Trisomy 21, 18, 13, and microdeletions with MD-signed reports in 7–10 days.`,
        primaryImage: {
          ...page.primaryImage,
          alt: `${page.keyword} Centers across ${regionName} – Henotic Diagnostics`,
          caption: `${page.keyword} across ${regionName} with 24/7 home sample pickup and Kharghar NGS processing.`,
        },
      },
    };
  }

  return data;
}
