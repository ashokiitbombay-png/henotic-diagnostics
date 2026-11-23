import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getHeroImageForService } from '@/config/services';
import { formatSlug } from '@/lib/utils';
import AccreditationLogos from '@/components/blocks/AccreditationLogos';

interface ServiceHeroProps {
  /** The raw service slug (e.g., "mri-scan") */
  service?: string;
  /** The raw region slug (e.g., "navi-mumbai") */
  region?: string;
  /** The raw location/city slug (e.g., "kharghar") */
  location?: string;
  /** Main headline — overrides auto-generated title */
  title?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Whether this is the /services index page (no dynamic params) */
  isServicesIndex?: boolean;
  /** Suppress inline BreadcrumbList JSON-LD when a page emits a consolidated @graph */
  hideBreadcrumbSchema?: boolean;
  /** Optional ID for the hero <h1> (e.g. for Schema.org speakable selectors) */
  h1Id?: string;
}

/**
 * Premium Service Hero Component.
 * Combines Gradient Breadcrumb Bar + Hero Image + Interactive Accreditation Logos.
 */
export default function ServiceHero({
  service,
  region,
  location,
  title,
  subtitle,
  isServicesIndex = false,
  hideBreadcrumbSchema = false,
  h1Id = 'service-hero-h1',
}: ServiceHeroProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.henoticdiagnostics.com';

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ];

  if (service) {
    breadcrumbs.push({ name: formatSlug(service), url: `/services/${service}` });
  }
  if (service && region) {
    breadcrumbs.push({ name: formatSlug(region), url: `/services/${service}/${region}` });
  }
  if (service && region && location) {
    breadcrumbs.push({ name: formatSlug(location), url: `/services/${service}/${region}/${location}` });
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${baseUrl}${crumb.url}`,
    })),
  };

  const heroTitle = title || (
    location && region && service
      ? `Best ${formatSlug(service)} in ${formatSlug(location)}`
      : region && service
        ? `Premier ${formatSlug(service)} Centers in ${formatSlug(region)}`
        : service
          ? formatSlug(service)
          : 'Our Diagnostic Services'
  );

  const heroSubtitle = subtitle || (
    location && region
      ? `Accurate, fast, and reliable diagnostic services near you in ${formatSlug(location)}, ${formatSlug(region)}. Experience state-of-the-art technology with same-day reporting.`
      : region
        ? `Access world-class diagnostic technology across our comprehensive network in ${formatSlug(region)}. Select your nearest neighborhood for priority booking.`
        : 'Browse our comprehensive library of diagnostic capabilities. We provide over 200 NABL accredited radiology scans and automated clinical pathology investigations.'
  );

  return (
    <>
      {!hideBreadcrumbSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      )}

      <section className="sh-hero">
        <div className="absolute inset-0 z-0">
          <Image
            src={getHeroImageForService(service || '')}
            alt={`${heroTitle} — Advanced Diagnostics at Henotic Diagnostics`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            style={{ objectPosition: '50% 30%' }}
          />
          <div className="sh-overlay" />
        </div>

        <div className="relative z-30 pt-4 md:pt-6 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <nav aria-label="Breadcrumb" className="sh-crumb hide-scrollbar">
              <ol className="flex items-center space-x-1 min-w-max text-xs sm:text-sm font-black text-white">
                {breadcrumbs.map((crumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return (
                    <li key={crumb.url} className="flex items-center">
                      {isLast ? (
                        <span className="text-white opacity-90 cursor-default" aria-current="page">
                          {crumb.name}
                        </span>
                      ) : (
                        <Link href={crumb.url} className="hover:text-slate-200 hover:underline underline-offset-4">
                          {crumb.name}
                        </Link>
                      )}
                      {!isLast && (
                        <span aria-hidden="true" className="mx-1.5 opacity-70">›</span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </div>

        <div className="relative z-20 mt-4 md:mt-6 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <AccreditationLogos variant="hero" />
          </div>
        </div>

        <div className="relative z-20 px-4 md:px-8 pt-6 md:pt-10 pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto">
            <h1 id={h1Id} className="sh-h1">
              {heroTitle.includes(' in ') ? (
                <>
                  {heroTitle.split(' in ')[0]} in{' '}
                  <span className="sh-acc">
                    {heroTitle.split(' in ').slice(1).join(' in ')}
                  </span>
                </>
              ) : isServicesIndex ? (
                <>Our Diagnostic <span className="sh-acc">Services</span></>
              ) : (
                heroTitle
              )}
            </h1>

            <p className="sh-sub">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
