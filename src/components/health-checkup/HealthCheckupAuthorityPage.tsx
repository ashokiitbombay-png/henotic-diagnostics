import type { Metadata } from 'next';
import type { HealthCheckupPageData } from '@/config/health-checkup';
import { formatINR } from '@/config/health-checkup';
import HealthCheckupSchema from './HealthCheckupSchema';
import HealthCheckupHero from './HealthCheckupHero';
import PackageExplorer from './PackageExplorer';
import PackageComparisonTable from './PackageComparisonTable';
import AuthorityContent from './AuthorityContent';
import InfrastructureSlider from './InfrastructureSlider';
import PathologistsSection from './PathologistsSection';
import CertificatesSection from './CertificatesSection';
import AwardsCoverflow from './AwardsCoverflow';
import TestimonialsSlider from './TestimonialsSlider';
import HealthCheckupFAQ from './HealthCheckupFAQ';
import RelatedCheckupLinks from './RelatedCheckupLinks';

const BASE_URL = 'https://www.henoticdiagnostics.com';
const PAGE_BACKGROUND = 'linear-gradient(135deg, #e3f0fc 0%, #edf3fd 25%, #f4effb 60%, #fbe4f3 100%)';

/**
 * Builds Next.js metadata for a health checkup authority page.
 * Uses `title.absolute` to avoid the layout template appending the brand a
 * second time (live pages currently render "… | Henotic Diagnostics | Henotic Diagnostics").
 */
export function buildHealthCheckupMetadata(data: HealthCheckupPageData): Metadata {
  const { page } = data;
  const url = `${BASE_URL}/services/${page.slug}`;
  const ogImage = {
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
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: 'Henotic Diagnostics',
      url,
      title: page.metaTitle,
      description: page.metaDescription,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.metaDescription,
      images: [{ url: page.primaryImage.url, alt: page.primaryImage.alt }],
    },
  };
}

/**
 * Health Checkup Service Authority Page.
 *
 * Section order follows search intent: answer → packages & prices →
 * comparison → expert guidance → proof (lab, doctors, accreditation,
 * awards, reviews) → FAQ → related pages.
 */
export default function HealthCheckupAuthorityPage({ data }: { data: HealthCheckupPageData }) {
  const { page, packages, trust } = data;
  const featured = packages.filter((p) => page.featuredPackageCodes.includes(p.code));
  const minPrice = Math.min(...(featured.length ? featured : packages).map((p) => p.offerPrice));

  return (
    <main
      className="min-h-screen text-gray-900 font-sans antialiased selection:bg-purple-200 mt-[80px]"
      style={{ background: PAGE_BACKGROUND }}
      data-content-source={`page:${data.source.page};packages:${data.source.packages};trust:${data.source.trust}`}
    >
      <HealthCheckupSchema data={data} />
      <HealthCheckupHero page={page} trust={trust} packageCount={packages.length} minPrice={minPrice} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 space-y-14 sm:space-y-16">
        <section id="packages" aria-labelledby="hc-packages-title" className="scroll-mt-28 text-center">
          <h2 id="hc-packages-title" className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
            {page.keyword} Packages &amp; Prices
          </h2>
          <p className="mt-3 text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transparent special package pricing from <span className="font-semibold text-purple-700">₹{formatINR(minPrice)}</span>.
            Complete organ profiles, zero hidden charges, and free 24/7 home blood sample pickup across Navi Mumbai.
          </p>
          <div className="text-left">
            <PackageExplorer packages={packages} defaultFilter={page.defaultFilter} keyword={page.keyword} />
          </div>
        </section>

        <PackageComparisonTable packages={packages} keyword={page.keyword} />
        <AuthorityContent page={page} />
        <InfrastructureSlider items={trust.infrastructure} />
        <PathologistsSection doctors={trust.doctors} />
        <CertificatesSection certificates={trust.certificates} />
        <AwardsCoverflow awards={trust.awards} />
        <TestimonialsSlider testimonials={trust.testimonials} googleRating={trust.googleRating} />
        <HealthCheckupFAQ faqs={page.faqs} keyword={page.keyword} />
        <RelatedCheckupLinks currentSlug={page.slug} relatedSlugs={page.relatedSlugs} />

        <p className="text-center text-xs text-gray-500">
          Content medically reviewed by {trust.doctors[0]?.name ?? 'our pathology team'} · Last reviewed{' '}
          <time dateTime={page.lastReviewed}>
            {new Date(`${page.lastReviewed}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}
          </time>
        </p>
      </div>
    </main>
  );
}
