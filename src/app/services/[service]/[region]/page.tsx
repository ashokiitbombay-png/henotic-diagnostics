import ServiceHero from '@/components/blocks/ServiceHero';
import HealthPackagesSection from '@/components/health-packages/HealthPackagesSection';
import HealthPackagesSchema from '@/components/health-packages/HealthPackagesSchema';
import LocalClinicalBrief from '@/components/clinical/LocalClinicalBrief';
import { isHealthCheckupService } from '@/config/health-packages';
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from 'next/navigation';
import RelatedServices from "@/components/seo/RelatedServices";
import PricingTable from "@/components/blocks/PricingTable";
import LocationFAQ from "@/components/seo/LocationFAQ";
import { getPricingForService } from "@/config/pricing";
import { REGION_LOCATIONS, REGION_NAMES } from '@/config/locations';
import { formatSlug } from '@/lib/utils';
import PartnerCenters from '@/components/blocks/PartnerCenters';
import MedicalPseoSchema from "@/components/seo/MedicalPseoSchema";
import { isValidServiceSlug, isValidRegionSlug } from '@/lib/seo/slug-validator';
import { getHeroImageForService } from '@/config/services';
import { isNiptService } from '@/config/nipt-test';
import { getNiptPageData } from '@/lib/payload/nipt-tests';
import NiptAuthorityPage, { buildNiptMetadata } from '@/components/nipt-test/NiptAuthorityPage';
import { buildLocalLogistics } from '@/lib/seo/local-content-builder';
import {
  DUPLICATE_RAIGAD_LOCATIONS,
  buildRobotsMetadata,
  getCanonicalServiceSlug,
  getL2IndexingDirective,
  getL3IndexingDirective,
} from '@/lib/seo/indexing-policy';

export const revalidate = 604800; // 7 days cache revalidation

// ==========================================
// 1. DYNAMIC SEO METADATA GENERATOR
// ==========================================
export async function generateMetadata({ params }: { params: Promise<{ service: string, region: string }> }): Promise<Metadata> {
  const resolvedParams = await params;

  if (isNiptService(resolvedParams.service)) {
    const regionName = REGION_NAMES[resolvedParams.region] || formatSlug(resolvedParams.region);
    const niptData = await getNiptPageData(resolvedParams.service, {
      regionSlug: resolvedParams.region,
      regionName,
    });
    if (niptData) return buildNiptMetadata(niptData);
  }

  const directive = getL2IndexingDirective(resolvedParams.service, resolvedParams.region);
  const serviceName = formatSlug(resolvedParams.service);
  const regionName = REGION_NAMES[resolvedParams.region] || formatSlug(resolvedParams.region);
  const heroImage = getHeroImageForService(resolvedParams.service);

  const title = `Best ${serviceName} in ${regionName} | Book Online | Henotic Diagnostics`;
  const isHealth = isHealthCheckupService(resolvedParams.service);
  const description = isHealth
    ? `Book ${serviceName} in ${regionName} at up to 63% off. NABL-accredited health checkups with 24/7 home sample collection & same-day digital reports.`
    : `Book NABL-accredited ${serviceName} in ${regionName} at Henotic Diagnostics. Advanced imaging & pathology with same-day digital reports.`;

  return {
    title,
    description,
    keywords: `${serviceName} in ${regionName}, best ${serviceName} centers ${regionName}, ${serviceName} cost ${regionName}, diagnostic center in ${regionName}`,
    robots: buildRobotsMetadata(directive.index),
    alternates: {
      canonical: directive.canonicalUrl
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: directive.canonicalUrl,
      images: [{
        url: heroImage,
        width: 1200,
        height: 630,
        alt: `${serviceName} in ${regionName} | Henotic Diagnostics`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [heroImage],
    },
  };
}

import { getRegionPriorities } from '@/lib/seo/build-priorities';

// ==========================================
// 2. STATIC PARAMETERS GENERATOR (PRE-RENDERING)
// ==========================================
// Pre-render top priority service×region combos from the ISR manifest.
// Remaining combos render on-demand via ISR (dynamicParams = true).
export async function generateStaticParams() {
  return getRegionPriorities();
}

// ==========================================
// 3. MAIN REGIONAL HUB COMPONENT
// ==========================================
export default async function ServiceRegionPage({ params }: { params: Promise<{ service: string, region: string }> }) {
  const resolvedParams = await params;

  // Slug validation: prevent CDN cache pollution from invalid URLs
  if (!isValidServiceSlug(resolvedParams.service) || !isValidRegionSlug(resolvedParams.region)) {
    notFound();
  }

  const serviceName = formatSlug(resolvedParams.service);
  const regionName = REGION_NAMES[resolvedParams.region] || formatSlug(resolvedParams.region);

  // Get non-duplicate locations in this region and partition by indexability
  const canonicalService = getCanonicalServiceSlug(resolvedParams.service);
  const rawLocations = REGION_LOCATIONS[resolvedParams.region] || [];
  const cleanLocations = rawLocations.filter(
    (loc) => !(resolvedParams.region === 'raigad' && DUPLICATE_RAIGAD_LOCATIONS.has(loc))
  );
  const indexableLocations = cleanLocations.filter(
    (loc) => getL3IndexingDirective(canonicalService, resolvedParams.region, loc).includeInSitemap
  );
  const coverageOnlyLocations = cleanLocations.filter(
    (loc) => !getL3IndexingDirective(canonicalService, resolvedParams.region, loc).includeInSitemap
  );

  // 🧬 NIPT multi-tier region hub authority experience
  if (isNiptService(resolvedParams.service)) {
    const niptData = await getNiptPageData(resolvedParams.service, {
      regionSlug: resolvedParams.region,
      regionName,
    });
    if (niptData) {
      return (
        <NiptAuthorityPage
          data={niptData}
          afterHeroSlot={
            <>
              <section className="py-12 sm:py-16 bg-white/95 backdrop-blur-md border-b border-slate-200 relative -mt-8 rounded-t-[2.5rem] z-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                  <div className="text-center mb-8 sm:mb-10">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                      Find {niptData.page.keyword} &amp; Home Blood Collection in {regionName}
                    </h2>
                    <p className="text-slate-600 mt-2 font-medium text-sm sm:text-base">
                      {indexableLocations.length > 0
                        ? `Select your neighbourhood in ${regionName} for pincode-level maternal cfDNA pickup turnaround and instant NIPT appointment booking.`
                        : `Doorstep cfDNA blood sample pickup and genetic counselling coverage across ${regionName}.`}
                    </p>
                  </div>

                  {indexableLocations.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {indexableLocations.map((loc) => (
                        <Link
                          key={loc}
                          href={`/services/${canonicalService}/${resolvedParams.region}/${loc}`}
                          prefetch={false}
                          className="l2-loc"
                        >
                          {formatSlug(loc)}
                        </Link>
                      ))}
                    </div>
                  ) : coverageOnlyLocations.length > 0 ? (
                    <div className="space-y-6">
                      <p className="text-xs sm:text-sm text-slate-600 font-semibold text-center leading-relaxed max-w-4xl mx-auto">
                        {coverageOnlyLocations.map(formatSlug).join(' · ')}
                      </p>
                      <div className="text-center">
                        <Link
                          href="/contact#booking"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-md transition"
                        >
                          Schedule Home NIPT Pickup in {regionName} →
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-amber-50 rounded-2xl text-amber-800 border border-amber-100 font-medium">
                      Specific location pages for this region are currently being updated.
                    </div>
                  )}
                </div>
              </section>
              <PartnerCenters service={resolvedParams.service} region={resolvedParams.region} />
            </>
          }
          afterSuiteSlot={<RelatedServices currentService={resolvedParams.service} region={resolvedParams.region} />}
        />
      );
    }
  }

  const pricing = getPricingForService(resolvedParams.service);
  const logistics = buildLocalLogistics({
    serviceSlug: resolvedParams.service,
    serviceName,
    regionSlug: resolvedParams.region,
    regionName,
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans mt-[80px]">
      <MedicalPseoSchema
        type="service"
        serviceSlug={resolvedParams.service}
        serviceName={serviceName}
        regionSlug={resolvedParams.region}
      />
      {/* Service Hero with Breadcrumbs & Accreditations */}
      <ServiceHero
        service={resolvedParams.service}
        region={resolvedParams.region}
        subtitle={logistics.heroSubtitle}
        hideBreadcrumbSchema
      />

      {/* 2. SEO INTERNAL LINKING GRID */}
      <section className="py-12 bg-white border-b border-slate-200 relative -mt-10 rounded-t-[3rem] z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {indexableLocations.length > 0
                ? `Areas Covered Near ${regionName}`
                : `${serviceName} Coverage Across ${regionName}`}
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              {indexableLocations.length > 0
                ? 'Select a neighbourhood below for priority slot availability, PIN-level timings, and hub directions.'
                : `Scans performed at our flagship Sector 15, Kharghar facility or via doorstep sample collection across ${regionName}.`}
            </p>
          </div>

          {indexableLocations.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {indexableLocations.map((loc) => (
                  <Link
                    key={loc}
                    href={`/services/${canonicalService}/${resolvedParams.region}/${loc}`}
                    prefetch={false}
                    className="l2-loc"
                  >
                    {formatSlug(loc)}
                  </Link>
                ))}
              </div>
              {coverageOnlyLocations.length > 0 && (
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2 text-center">
                    Additional Covered Localities &amp; Sectors in {regionName}
                  </p>
                  <p className="text-xs text-slate-600 font-semibold text-center leading-relaxed max-w-5xl mx-auto">
                    {coverageOnlyLocations.map(formatSlug).join(' · ')}
                  </p>
                </div>
              )}
            </>
          ) : coverageOnlyLocations.length > 0 ? (
            <div className="space-y-6">
              <p className="text-xs sm:text-sm text-slate-600 font-semibold text-center leading-relaxed max-w-4xl mx-auto">
                {coverageOnlyLocations.map(formatSlug).join(' · ')}
              </p>
              <div className="text-center">
                <Link
                  href="/contact#booking"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition"
                >
                  Book {serviceName} for {regionName} Patients →
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 bg-amber-50 rounded-2xl text-amber-800 border border-amber-100 font-medium">
              We are expanding! Specific location pages for this region are currently being updated.
            </div>
          )}
        </div>
      </section>

      {/* Compact Diagnostic Centers Section (zero heavy iframes on L2) */}
      <PartnerCenters service={resolvedParams.service} region={resolvedParams.region} compact />

      {/* Health Checkup Packages Suite (When applicable) */}
      {isHealthCheckupService(resolvedParams.service) && (
        <>
          <HealthPackagesSchema
            serviceSlug={resolvedParams.service}
            heading={`${serviceName} Packages`}
            regionName={regionName}
            regionSlug={resolvedParams.region}
          />
          <HealthPackagesSection
            key={resolvedParams.service}
            serviceSlug={resolvedParams.service}
            serviceName={serviceName}
            regionName={regionName}
          />
        </>
      )}

      {/* 3. CONCISE REGIONAL CLINICAL BRIEF & LOGISTICS */}
      <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
          <div className="mb-5 pb-4 border-b border-slate-100">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-500">
              {regionName} Clinical Summary &amp; Service Specifications
            </span>
          </div>

          <LocalClinicalBrief
            mode="region"
            serviceSlug={resolvedParams.service}
            formattedService={serviceName}
            regionSlug={resolvedParams.region}
            regionName={regionName}
          />
        </div>
      </section>

      {/* 4. PRICING TABLE */}
      {!isHealthCheckupService(resolvedParams.service) && (
        <PricingTable serviceSlug={resolvedParams.service} serviceName={serviceName} locationName={regionName} />
      )}

      {/* 5. DYNAMIC SERVICE x REGION FAQs */}
      <LocationFAQ
        serviceName={serviceName}
        serviceSlug={resolvedParams.service}
        locationName={regionName}
        regionName={regionName}
        price={pricing?.henoticPrice}
        locationSlug={resolvedParams.region}
        regionSlug={resolvedParams.region}
        microNeighborhoods={logistics.microNeighborhoods}
      />

      {/* 6. RELATED SERVICES */}
      <RelatedServices currentService={resolvedParams.service} region={resolvedParams.region} />

      {/* 7. COMPACT SERVER-RENDERED TRUST BAR */}
      <section className="py-10 px-4 md:px-8 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl bg-slate-50 border border-slate-200 p-6">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              NABL · ISO 15189 · AERB Accredited Care Across {regionName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Trusted by 1,00,000+ patients · Same-day digital PDF &amp; WhatsApp reports
            </p>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white border border-amber-200 shrink-0 text-sm font-black text-slate-900">
            ★ 4.9 / 5 <span className="text-xs font-semibold text-slate-500">Verified Google Reviews</span>
          </div>
        </div>
      </section>

    </div>
  );
}