import 'server-only';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { payloadFind, payloadFindBySlug, payloadFindGlobal } from '@/lib/payload/client';
import { CACHE_TAGS } from '@/lib/cache/tags';
import type {
  PayloadMediaUpload,
  PayloadNiptPage,
  PayloadNiptPanel,
  PayloadNiptTrust,
  PayloadTextRow,
} from '@/types/payload';
import {
  STATIC_NIPT_PANELS,
  STATIC_NIPT_TRUST_CONTENT,
  buildNiptTokenResolver,
  getStaticNiptPage,
  localizeNiptPageData,
  orderPanelsForPage,
  resolveNiptPageTokens,
  type NiptLocationContext,
  type NiptPageContent,
  type NiptPageData,
  type NiptPanel,
  type NiptTrustContent,
} from '@/config/nipt-test';

/**
 * NIPT Prenatal Screening Authority Pages — data access layer.
 *
 * Source priority (per field group):
 *   1. Payload CMS  (collections `nipt-panels`, `nipt-pages`, global `nipt-trust`)
 *   2. Static config in `src/config/nipt-test/` (always available)
 *
 * Payload values override static values field-by-field; when PAYLOAD_CMS_URL is
 * unset or unreachable, static clinical content serves transparently.
 */

const REVALIDATE_SECONDS = 86400;

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

function mapPanel(doc: PayloadNiptPanel, base?: NiptPanel): NiptPanel | null {
  const mrp = doc.pricing?.mrp ?? base?.mrp;
  const offerPrice = doc.pricing?.sellingPrice ?? base?.offerPrice;
  if (!doc.code || !doc.title || mrp == null || offerPrice == null) return base ?? null;

  const media = typeof doc.image === 'object' ? doc.image : null;
  const imageUrl = mediaUrl(doc.image, doc.imageUrl) ?? base?.imageUrl ?? '';
  const pct = mrp > 0 ? Math.round(((mrp - offerPrice) / mrp) * 100) : 0;
  const colHeadersRaw = textRows(doc.colHeaders);
  const colHeaders: [string, string] =
    colHeadersRaw && colHeadersRaw.length >= 2
      ? [colHeadersRaw[0], colHeadersRaw[1]]
      : base?.colHeaders ?? ['Parameter', 'Condition'];

  return {
    id: base?.id ?? `panel-${doc.code.toLowerCase()}`,
    code: doc.code,
    badgeNumber: doc.badgeNumber ?? base?.badgeNumber ?? '1',
    topPillLabel: doc.topPillLabel ?? base?.topPillLabel ?? 'ESSENTIAL',
    discountBadge: doc.discountLabel || (pct > 0 ? `${pct}% OFF` : base?.discountBadge ?? ''),
    tags: textRows(doc.tags) ?? base?.tags ?? ['10+ WEEKS', 'MATERNAL cfDNA', 'NO FASTING'],
    testsCountNumber: doc.testsCountNumber ?? base?.testsCountNumber ?? '3',
    testsCountUnit: doc.testsCountUnit ?? base?.testsCountUnit ?? 'Tests',
    shortTag: doc.shortTag ?? base?.shortTag ?? '',
    title: doc.title,
    subtitle: doc.subtitle ?? base?.subtitle ?? '',
    imageUrl,
    imageAlt: doc.imageAlt ?? media?.alt ?? base?.imageAlt ?? doc.title,
    imageWidth: media?.width ?? doc.imageWidth ?? base?.imageWidth ?? 800,
    imageHeight: media?.height ?? doc.imageHeight ?? base?.imageHeight ?? 600,
    totalTestsLabel: doc.totalTestsLabel ?? base?.totalTestsLabel ?? '',
    totalTestsCount: doc.totalTestsCount ?? base?.totalTestsCount ?? '',
    tat: doc.tat ?? base?.tat ?? '7-10 Days Turnaround',
    mrp,
    offerPrice,
    savings: Math.max(0, mrp - offerPrice),
    sampleType: doc.sampleType ?? base?.sampleType ?? 'Maternal Blood (cfDNA)',
    gestation: doc.gestation ?? base?.gestation ?? '10+ Weeks Onwards',
    popular: doc.popular ?? base?.popular ?? false,
    ribbonText: doc.ribbonText ?? base?.ribbonText ?? '',
    colHeaders,
    archTheme: { ...(base?.archTheme ?? STATIC_NIPT_PANELS[0].archTheme), ...(doc.theme ?? {}) },
    parameters:
      nonEmpty(doc.parameters?.filter((p) => p?.param && p?.detail)) ?? base?.parameters ?? [],
  };
}

function mergePage(doc: PayloadNiptPage | null, base: NiptPageContent): NiptPageContent {
  if (!doc) return base;
  const pi = doc.primaryImage;
  const piMedia = pi?.media && typeof pi.media === 'object' ? pi.media : null;
  const piUrl = mediaUrl(pi?.media, pi?.url);

  const featuredFromRel = nonEmpty(doc.featuredPanels)
    ?.map((p) => (typeof p === 'object' ? p.code : undefined))
    .filter((c): c is string => Boolean(c));

  return {
    ...base,
    keyword: doc.keyword || base.keyword,
    secondaryKeywords: textRows(doc.secondaryKeywords) ?? base.secondaryKeywords,
    metaTitle: doc.metaTitle || base.metaTitle,
    metaDescription: doc.metaDescription || base.metaDescription,
    h1: doc.h1 || base.h1,
    heroSubtitle: doc.heroSubtitle || base.heroSubtitle,
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
    featuredPanelCodes: featuredFromRel ?? textRows(doc.featuredPanelCodes) ?? base.featuredPanelCodes,
    whoShouldBook: textRows(doc.whoShouldBook) ?? base.whoShouldBook,
    sections: nonEmpty(doc.sections?.filter((s) => s?.heading && s?.body)) ?? base.sections,
    faqs: nonEmpty(doc.faqs?.filter((f) => f?.question && f?.answer)) ?? base.faqs,
    relatedSlugs: textRows(doc.relatedSlugs) ?? base.relatedSlugs,
    lastReviewed: doc.lastReviewed?.slice(0, 10) || base.lastReviewed,
  };
}

function mergeTrust(doc: PayloadNiptTrust | null): NiptTrustContent {
  const base = STATIC_NIPT_TRUST_CONTENT;
  if (!doc) return base;
  return {
    googleRating: {
      ...base.googleRating,
      ...Object.fromEntries(Object.entries(doc.googleRating ?? {}).filter(([, v]) => v != null && v !== '')),
    },
    infrastructure:
      nonEmpty(doc.infrastructure)
        ?.map((i) => ({
          title: i.title,
          subtitle: i.subtitle ?? '',
          image: mediaUrl(i.image, i.imageUrl) ?? '',
          tag: i.tag ?? '',
        }))
        .filter((i) => i.image) ?? base.infrastructure,
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

const fetchPanels = unstable_cache(
  async (): Promise<{ panels: NiptPanel[]; source: 'payload' | 'static' }> => {
    try {
      const res = await payloadFind(
        'nipt-panels',
        {
          where: { isActive: { not_equals: false } },
          limit: 20,
          sort: 'sortOrder',
          depth: 1,
        },
        REVALIDATE_SECONDS,
      );
      const docs = res?.docs ?? [];
      if (docs.length === 0) return { panels: STATIC_NIPT_PANELS, source: 'static' };

      const staticByCode = new Map(STATIC_NIPT_PANELS.map((p) => [p.code, p]));
      const mapped = docs
        .map((d) => mapPanel(d, staticByCode.get(d.code)))
        .filter((p): p is NiptPanel => Boolean(p && p.imageUrl));
      return mapped.length ? { panels: mapped, source: 'payload' } : { panels: STATIC_NIPT_PANELS, source: 'static' };
    } catch (err) {
      console.warn('[nipt-tests] Payload panels fetch failed, using static fallback:', err);
      return { panels: STATIC_NIPT_PANELS, source: 'static' };
    }
  },
  ['nipt-panels'],
  { tags: [CACHE_TAGS.niptTests], revalidate: REVALIDATE_SECONDS },
);

const fetchTrust = unstable_cache(
  async (): Promise<{ trust: NiptTrustContent; source: 'payload' | 'static' }> => {
    try {
      const doc = await payloadFindGlobal('nipt-trust', 1, REVALIDATE_SECONDS);
      return doc
        ? { trust: mergeTrust(doc), source: 'payload' }
        : { trust: STATIC_NIPT_TRUST_CONTENT, source: 'static' };
    } catch (err) {
      console.warn('[nipt-tests] Payload trust fetch failed, using static fallback:', err);
      return { trust: STATIC_NIPT_TRUST_CONTENT, source: 'static' };
    }
  },
  ['nipt-trust'],
  { tags: [CACHE_TAGS.niptTests], revalidate: REVALIDATE_SECONDS },
);

async function fetchPageDoc(slug: string): Promise<PayloadNiptPage | null> {
  return unstable_cache(
    async () => {
      try {
        const doc = await payloadFindBySlug('nipt-pages', slug, 1, REVALIDATE_SECONDS);
        return doc && doc.isActive !== false ? doc : null;
      } catch (err) {
        console.warn(`[nipt-tests] Payload page fetch failed for "${slug}", using static fallback:`, err);
        return null;
      }
    },
    ['nipt-page', slug],
    { tags: [CACHE_TAGS.service(slug), CACHE_TAGS.niptTests], revalidate: REVALIDATE_SECONDS },
  )();
}

const fetchBaseNiptData = cache(async (slug: string): Promise<NiptPageData | null> => {
  const base = getStaticNiptPage(slug);
  if (!base) return null;

  const [{ panels, source: panelsSource }, { trust, source: trustSource }, pageDoc] = await Promise.all([
    fetchPanels(),
    fetchTrust(),
    fetchPageDoc(base.slug),
  ]);

  const merged = mergePage(pageDoc, base);
  const resolve = buildNiptTokenResolver(panels, merged.featuredPanelCodes);

  return {
    routeSlug: slug,
    page: resolveNiptPageTokens(merged, resolve),
    panels: orderPanelsForPage(panels, merged.featuredPanelCodes),
    trust,
    source: { page: pageDoc ? 'payload' : 'static', panels: panelsSource, trust: trustSource },
  };
});

/**
 * Returns fully-resolved data for an NIPT Test page (Tier 1, Tier 2 region hub, or Tier 3 micro-city),
 * or `null` when the slug is not an NIPT service. Memoized per request with React `cache()`.
 */
export async function getNiptPageData(
  slug: string,
  locationContext?: NiptLocationContext,
): Promise<NiptPageData | null> {
  const baseData = await fetchBaseNiptData(slug);
  if (!baseData) return null;
  return localizeNiptPageData(baseData, locationContext);
}
