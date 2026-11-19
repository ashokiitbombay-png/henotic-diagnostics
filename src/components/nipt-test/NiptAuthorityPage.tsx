import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import type { NiptPageData } from '@/config/nipt-test';
import { NIPT_HERO_BANNER_IMAGE } from '@/config/nipt-test';
import ServiceHero from '@/components/blocks/ServiceHero';
import NiptSchema from './NiptSchema';
import NiptInteractiveSuite from './NiptInteractiveSuite';
import RelatedNiptLinks from './RelatedNiptLinks';

const BASE_URL = 'https://www.henoticdiagnostics.com';
const PAGE_BACKGROUND =
  'radial-gradient(at 10% 18%, rgba(167,139,250,0.22) 0px, transparent 50%), radial-gradient(at 88% 12%, rgba(244,114,182,0.20) 0px, transparent 48%), radial-gradient(at 52% 68%, rgba(110,231,183,0.18) 0px, transparent 52%), linear-gradient(135deg, #eef4ff 0%, #f5f0ff 36%, #fdf2f8 70%, #ecfdf5 100%)';

/**
 * Builds Next.js Metadata for NIPT Test pages across Tier 1, Tier 2, and Tier 3.
 * Uses `title.absolute` so the root layout does not double-append branding.
 */
export function buildNiptMetadata(data: NiptPageData): Metadata {
  const { routeSlug, page, locationContext } = data;
  const pathSegments = [routeSlug, locationContext?.regionSlug, locationContext?.locationSlug].filter(Boolean);
  const url = `${BASE_URL}/services/${pathSegments.join('/')}`;

  const primaryImage = {
    url: page.primaryImage.url,
    width: page.primaryImage.width,
    height: page.primaryImage.height,
    alt: page.primaryImage.alt,
    type: 'image/webp',
  };

  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    keywords: [page.keyword, ...page.secondaryKeywords],
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: 'Henotic Diagnostics',
      url,
      title: page.metaTitle,
      description: page.metaDescription,
      images: [
        primaryImage,
        {
          url: NIPT_HERO_BANNER_IMAGE,
          width: 1200,
          height: 630,
          alt: `${page.keyword} Laboratory at Henotic Diagnostics`,
          type: 'image/webp',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.metaDescription,
      images: [{ url: page.primaryImage.url, alt: page.primaryImage.alt }],
    },
    other: {
      thumbnail: page.primaryImage.url,
    },
  };
}

interface NiptAuthorityPageProps {
  data: NiptPageData;
  /** Optional Tier 2 regional micro-city linking section rendered directly beneath ServiceHero. */
  afterHeroSlot?: ReactNode;
  /** Optional Tier 2 / Tier 3 internal-linking & local SEO blocks rendered below RelatedNiptLinks. */
  afterSuiteSlot?: ReactNode;
  showRegionDirectory?: boolean;
}

/**
 * Full NIPT Prenatal Screening Authority Page.
 * Reuses the exact ServiceHero breadcrumb bar, national accreditation logos, and dark NIPT banner
 * from the live design, paired with the pastel NIPT interactive authority suite.
 */
export default function NiptAuthorityPage({
  data,
  afterHeroSlot,
  afterSuiteSlot,
  showRegionDirectory = false,
}: NiptAuthorityPageProps) {
  const { routeSlug, page, trust, locationContext } = data;

  return (
    <div
      className="min-h-screen text-slate-900 font-sans antialiased selection:bg-purple-200 selection:text-purple-950 mt-[80px] pb-16 overflow-x-hidden w-full"
      style={{ background: PAGE_BACKGROUND }}
      data-content-source={`page:${data.source.page};panels:${data.source.panels};trust:${data.source.trust}`}
    >
      <NiptSchema data={data} />

      <ServiceHero
        service={routeSlug}
        region={locationContext?.regionSlug}
        location={locationContext?.locationSlug}
        title={page.h1}
        subtitle={page.heroSubtitle}
        hideBreadcrumbSchema
        h1Id="nipt-h1"
      />

      {afterHeroSlot}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-10 sm:space-y-16">
        <NiptInteractiveSuite data={data} />

        <RelatedNiptLinks
          currentSlug={routeSlug}
          relatedSlugs={page.relatedSlugs}
          regionSlug={locationContext?.regionSlug}
          locationSlug={locationContext?.locationSlug}
          showRegionDirectory={showRegionDirectory}
        />

        {afterSuiteSlot}

        <p className="text-center text-xs text-slate-500">
          Content medically reviewed by {trust.doctors.map((d) => d.name).join(' & ') || 'our Molecular Genetics team'} · Last reviewed{' '}
          <time dateTime={page.lastReviewed}>
            {new Date(`${page.lastReviewed}T00:00:00Z`).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              timeZone: 'UTC',
            })}
          </time>
        </p>
      </div>
    </div>
  );
}
