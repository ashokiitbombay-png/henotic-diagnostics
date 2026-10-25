import 'server-only';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { payloadFind, payloadFindBySlug, payloadFindGlobal } from '@/lib/payload/client';
import { CACHE_TAGS } from '@/lib/cache/tags';
import type {
  PayloadHealthCheckupPage,
  PayloadHealthCheckupTrust,
  PayloadHealthPackage,
  PayloadMediaUpload,
  PayloadTextRow,
} from '@/types/payload';
import {
  STATIC_HEALTH_PACKAGES,
  STATIC_TRUST_CONTENT,
  buildTokenResolver,
  getStaticHealthCheckupPage,
  orderPackagesForPage,
  resolvePageTokens,
  type HealthCheckupPageContent,
  type HealthCheckupPageData,
  type HealthCheckupTrustContent,
  type HealthPackage,
  type PackageAudience,
  type PackageFilter,
} from '@/config/health-checkup';

/**
 * Health Checkup Authority Pages — data access layer.
 *
 * Source priority (per field group):
 *   1. Payload CMS  (collections `health-packages`, `health-checkup-pages`,
 *                    global `health-checkup-trust`)
 *   2. Static config in `src/config/health-checkup/` (always available)
 *
 * Payload values override static values field-by-field, so editors can
 * change a single FAQ or price without re-entering the whole page. When
 * PAYLOAD_CMS_URL is not configured, or Payload is unreachable, the static
 * config is served transparently — pages never render empty.
 *
 * Cache invalidation: the Payload webhook (`/api/revalidate/webhook`) maps
 * `health-checkup-pages` → CACHE_TAGS.service(slug) and `health-packages`
 * / `health-checkup-trust` → CACHE_TAGS.servicesList, both used below.
 */

const REVALIDATE_SECONDS = 86400;

// ── Small normalisers ────────────────────────────────────────────────────

function payloadBaseUrl(): string {
  return process.env.PAYLOAD_CMS_URL?.replace(/\/+$/, '') || '';
}

function absoluteMediaUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  const base = payloadBaseUrl();
  return base ? `${base}${url.startsWith('/') ? '' : '/'}${url}` : undefined;
}

function mediaUrl(media: PayloadMediaUpload | string | null | undefined, fallback?: string): string | undefined {
  if (media && typeof media === 'object' && media.url) return absoluteMediaUrl(media.url);
  return fallback || undefined;
}

function textRows(rows: PayloadTextRow[] | undefined): string[] | undefined {
  if (!Array.isArray(rows)) return undefined;
  const out = rows
    .map((r) => (typeof r === 'string' ? r : r?.text ?? r?.value ?? ''))
    .map((s) => s.trim())
    .filter(Boolean);
  return out.length ? out : undefined;
}

function nonEmpty<T>(arr: T[] | undefined): T[] | undefined {
  return Array.isArray(arr) && arr.length > 0 ? arr : undefined;
}

const VALID_AUDIENCE = new Set<PackageAudience>(['Men', 'Women', 'Seniors']);
const VALID_FILTER = new Set<PackageFilter>(['ALL', 'Men', 'Women', 'Seniors']);

// ── Mappers ──────────────────────────────────────────────────────────────

function mapPackage(doc: PayloadHealthPackage, base?: HealthPackage): HealthPackage | null {
  const mrp = doc.pricing?.mrp ?? base?.mrp;
  const offerPrice = doc.pricing?.sellingPrice ?? base?.offerPrice;
  if (!doc.code || !doc.title || mrp == null || offerPrice == null) return base ?? null;

  const media = typeof doc.image === 'object' ? doc.image : null;
  const imageUrl = mediaUrl(doc.image, doc.imageUrl) ?? base?.imageUrl ?? '';
  const pct = mrp > 0 ? Math.round(((mrp - offerPrice) / mrp) * 100) : 0;
  const target = (doc.target ?? []).filter((t): t is PackageAudience => VALID_AUDIENCE.has(t as PackageAudience));

  return {
    id: base?.id ?? `pkg-${doc.code.toLowerCase()}`,
    code: doc.code,
    title: doc.title,
    subtitle: doc.subtitle ?? base?.subtitle ?? '',
    target: target.length ? target : base?.target ?? ['Men', 'Women', 'Seniors'],
    totalTests: doc.totalTests ?? base?.totalTests ?? 0,
    mrp,
    offerPrice,
    discount: doc.discountLabel || (pct > 0 ? `${pct}% OFF` : base?.discount ?? ''),
    imageUrl,
    imageWidth: media?.width ?? doc.imageWidth ?? base?.imageWidth ?? 800,
    imageHeight: media?.height ?? doc.imageHeight ?? base?.imageHeight ?? 600,
    archTheme: { ...(base?.archTheme ?? STATIC_HEALTH_PACKAGES[0].archTheme), ...(doc.theme ?? {}) },
    popular: doc.popular ?? base?.popular ?? false,
    highlights: textRows(doc.highlights) ?? base?.highlights ?? [],
    notes: textRows(doc.notes) ?? base?.notes ?? [],
    fastingRequired: doc.fastingRequired ?? base?.fastingRequired ?? true,
    categories:
      nonEmpty(doc.categories)?.map((c) => {
        const tests = textRows(c.tests) ?? [];
        return { name: c.name, count: c.count ?? tests.length, tests };
      }) ?? base?.categories ?? [],
  };
}

function mergePage(doc: PayloadHealthCheckupPage | null, base: HealthCheckupPageContent): HealthCheckupPageContent {
  if (!doc) return base;
  const pi = doc.primaryImage;
  const piMedia = pi?.media && typeof pi.media === 'object' ? pi.media : null;
  const piUrl = mediaUrl(pi?.media, pi?.url);

  const featuredFromRel = nonEmpty(doc.featuredPackages)
    ?.map((p) => (typeof p === 'object' ? p.code : undefined))
    .filter((c): c is string => Boolean(c));

  return {
    ...base,
    keyword: doc.keyword || base.keyword,
    secondaryKeywords: textRows(doc.secondaryKeywords) ?? base.secondaryKeywords,
    metaTitle: doc.metaTitle || base.metaTitle,
    metaDescription: doc.metaDescription || base.metaDescription,
    h1: doc.h1 || base.h1,
    eyebrow: doc.eyebrow || base.eyebrow,
    intro: doc.intro || base.intro,
    quickAnswer: doc.quickAnswer || base.quickAnswer,
    primaryImage: piUrl
      ? {
          url: piUrl,
          alt: pi?.alt || piMedia?.alt || base.primaryImage.alt,
          caption: pi?.caption || base.primaryImage.caption,
          width: piMedia?.width ?? pi?.width ?? base.primaryImage.width,
          height: piMedia?.height ?? pi?.height ?? base.primaryImage.height,
        }
      : {
          ...base.primaryImage,
          alt: pi?.alt || base.primaryImage.alt,
          caption: pi?.caption || base.primaryImage.caption,
        },
    defaultFilter: doc.defaultFilter && VALID_FILTER.has(doc.defaultFilter) ? doc.defaultFilter : base.defaultFilter,
    featuredPackageCodes: featuredFromRel ?? textRows(doc.featuredPackageCodes) ?? base.featuredPackageCodes,
    whoShouldBook: textRows(doc.whoShouldBook) ?? base.whoShouldBook,
    sections: nonEmpty(doc.sections?.filter((s) => s?.heading && s?.body)) ?? base.sections,
    preparation: textRows(doc.preparation) ?? base.preparation,
    faqs: nonEmpty(doc.faqs?.filter((f) => f?.question && f?.answer)) ?? base.faqs,
    relatedSlugs: textRows(doc.relatedSlugs) ?? base.relatedSlugs,
    lastReviewed: doc.lastReviewed?.slice(0, 10) || base.lastReviewed,
  };
}

function mergeTrust(doc: PayloadHealthCheckupTrust | null): HealthCheckupTrustContent {
  const base = STATIC_TRUST_CONTENT;
  if (!doc) return base;
  return {
    googleRating: { ...base.googleRating, ...Object.fromEntries(Object.entries(doc.googleRating ?? {}).filter(([, v]) => v != null && v !== '')) },
    infrastructure:
      nonEmpty(doc.infrastructure)?.map((i) => ({
        title: i.title,
        subtitle: i.subtitle ?? '',
        image: mediaUrl(i.image, i.imageUrl) ?? '',
        tag: i.tag ?? '',
      })).filter((i) => i.image) ?? base.infrastructure,
    doctors:
      nonEmpty(doc.doctors)?.map((d) => ({
        name: d.name,
        degrees: d.degrees ?? '',
        registration: d.registration ?? '',
        bio: d.bio ?? '',
        focus: textRows(d.focus) ?? [],
        image: mediaUrl(d.image, d.imageUrl) ?? '',
      })) ?? base.doctors,
    certificates:
      nonEmpty(doc.certificates)?.map((c, i) => ({
        id: c.certId || `cert-${i}`,
        name: c.name,
        authority: c.authority ?? '',
        logo: mediaUrl(c.logo, c.logoUrl) ?? '',
        certImage: mediaUrl(c.certImage, c.certImageUrl) ?? '',
        desc: c.desc ?? '',
      })) ?? base.certificates,
    awards:
      nonEmpty(doc.awards)?.map((a, i) => ({
        id: a.awardId || `award-${i}`,
        title: a.title,
        category: a.category ?? '',
        year: a.year ?? '',
        organization: a.organization ?? '',
        description: a.description ?? '',
        image: mediaUrl(a.image, a.imageUrl) ?? '',
        badgeLabel: a.badgeLabel ?? '',
        accentGlow: a.accentGlow ?? '#8f64cf',
      })) ?? base.awards,
    testimonials:
      nonEmpty(doc.testimonials)?.map((t, i) => ({
        id: i + 1,
        name: t.name,
        service: t.service ?? '',
        quote: t.quote,
        image: mediaUrl(t.image, t.imageUrl) ?? '',
        rating: Math.min(5, Math.max(1, t.rating ?? 5)),
      })) ?? base.testimonials,
  };
}

// ── Cached fetchers ──────────────────────────────────────────────────────

const fetchPackages = unstable_cache(
  async (): Promise<{ packages: HealthPackage[]; source: 'payload' | 'static' }> => {
    try {
      const res = await payloadFind('health-packages', {
        where: { isActive: { not_equals: false } },
        limit: 100,
        sort: 'sortOrder',
        depth: 1,
      }, REVALIDATE_SECONDS);
      const docs = res?.docs ?? [];
      if (docs.length === 0) return { packages: STATIC_HEALTH_PACKAGES, source: 'static' };

      const staticByCode = new Map(STATIC_HEALTH_PACKAGES.map((p) => [p.code, p]));
      const mapped = docs
        .map((d) => mapPackage(d, staticByCode.get(d.code)))
        .filter((p): p is HealthPackage => Boolean(p && p.imageUrl));
      return mapped.length ? { packages: mapped, source: 'payload' } : { packages: STATIC_HEALTH_PACKAGES, source: 'static' };
    } catch (err) {
      console.warn('[health-checkups] Payload packages fetch failed, using static fallback:', err);
      return { packages: STATIC_HEALTH_PACKAGES, source: 'static' };
    }
  },
  ['health-checkup-packages'],
  { tags: [CACHE_TAGS.servicesList], revalidate: REVALIDATE_SECONDS },
);

const fetchTrust = unstable_cache(
  async (): Promise<{ trust: HealthCheckupTrustContent; source: 'payload' | 'static' }> => {
    try {
      const doc = await payloadFindGlobal('health-checkup-trust', 1, REVALIDATE_SECONDS);
      return doc ? { trust: mergeTrust(doc), source: 'payload' } : { trust: STATIC_TRUST_CONTENT, source: 'static' };
    } catch (err) {
      console.warn('[health-checkups] Payload trust fetch failed, using static fallback:', err);
      return { trust: STATIC_TRUST_CONTENT, source: 'static' };
    }
  },
  ['health-checkup-trust'],
  { tags: [CACHE_TAGS.servicesList], revalidate: REVALIDATE_SECONDS },
);

async function fetchPageDoc(slug: string): Promise<PayloadHealthCheckupPage | null> {
  return unstable_cache(
    async () => {
      try {
        const doc = await payloadFindBySlug('health-checkup-pages', slug, 1, REVALIDATE_SECONDS);
        return doc && doc.isActive !== false ? doc : null;
      } catch (err) {
        console.warn(`[health-checkups] Payload page fetch failed for "${slug}", using static fallback:`, err);
        return null;
      }
    },
    ['health-checkup-page', slug],
    { tags: [CACHE_TAGS.service(slug), CACHE_TAGS.servicesList], revalidate: REVALIDATE_SECONDS },
  )();
}

// ── Public API ───────────────────────────────────────────────────────────

/**
 * Returns fully-resolved data for a health checkup authority page, or `null`
 * when the slug is not one of the 26 authority slugs. Deduplicated per
 * request via React `cache` (shared by `generateMetadata` and the page).
 */
export const getHealthCheckupPageData = cache(async (slug: string): Promise<HealthCheckupPageData | null> => {
  const base = getStaticHealthCheckupPage(slug);
  if (!base) return null;

  const [{ packages, source: packagesSource }, { trust, source: trustSource }, pageDoc] = await Promise.all([
    fetchPackages(),
    fetchTrust(),
    fetchPageDoc(slug),
  ]);

  const merged = mergePage(pageDoc, base);
  const resolve = buildTokenResolver(packages, merged.featuredPackageCodes);

  return {
    page: resolvePageTokens(merged, resolve),
    packages: orderPackagesForPage(packages, merged.featuredPackageCodes),
    trust,
    source: { page: pageDoc ? 'payload' : 'static', packages: packagesSource, trust: trustSource },
  };
});
