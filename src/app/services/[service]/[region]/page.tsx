import ServiceHero from '@/components/blocks/ServiceHero';
import HealthPackagesSection from '@/components/health-packages/HealthPackagesSection';
import HealthPackagesSchema from '@/components/health-packages/HealthPackagesSchema';
import ClinicalHealthOverview from '@/components/health-packages/ClinicalHealthOverview';
import ClinicalServiceOverview from '@/components/clinical/ClinicalServiceOverview';
import WordPressRenderer from '@/components/content/WordPressRenderer';
import { isHealthCheckupService } from '@/config/health-packages';
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from 'next/navigation';
import { ArrowRight, Activity } from "lucide-react";
import GoogleReviews from "@/components/features/reviews/GoogleReviews";
import RelatedServices from "@/components/seo/RelatedServices";
import PricingTable from "@/components/blocks/PricingTable";
import ServiceFAQ from "@/components/blocks/ServiceFAQ";
import { getFAQsForService } from "@/config/faqs";
import { REGION_LOCATIONS, REGION_NAMES } from '@/config/locations';
import { formatSlug } from '@/lib/utils';
import { getService } from '@/lib/wordpress/getService';
import PartnerCenters from '@/components/blocks/PartnerCenters';
import MedicalPseoSchema from "@/components/seo/MedicalPseoSchema";
import { isValidServiceSlug, isValidRegionSlug } from '@/lib/seo/slug-validator';
import { getHeroImageForService } from '@/config/services';
import { isNiptService } from '@/config/nipt-test';
import { getNiptPageData } from '@/lib/payload/nipt-tests';
import NiptAuthorityPage, { buildNiptMetadata } from '@/components/nipt-test/NiptAuthorityPage';

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

  const serviceName = formatSlug(resolvedParams.service);
  const regionName = formatSlug(resolvedParams.region);
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
    alternates: {
      canonical: `https://www.henoticdiagnostics.com/services/${resolvedParams.service}/${resolvedParams.region}`
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://www.henoticdiagnostics.com/services/${resolvedParams.service}/${resolvedParams.region}`,
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

  // Get the list of specific locations for this region to build the SEO grid
  const locations = REGION_LOCATIONS[resolvedParams.region] || [];

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
                      Select your neighbourhood in {regionName} for pincode-level maternal cfDNA pickup turnaround and instant NIPT appointment booking.
                    </p>
                  </div>

                  {locations.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                      {locations.map((loc) => (
                        <Link
                          key={loc}
                          href={`/services/${resolvedParams.service}/${resolvedParams.region}/${loc}`}
                          prefetch={false}
                          className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 bg-slate-50/80 hover:bg-purple-50 hover:border-purple-300 transition-all group"
                        >
                          <span className="font-bold text-slate-800 group-hover:text-purple-800 text-xs sm:text-sm">
                            {formatSlug(loc)}
                          </span>
                          <ArrowRight size={16} className="text-slate-400 group-hover:text-purple-700 transform group-hover:translate-x-1 transition-all shrink-0" />
                        </Link>
                      ))}
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

  let wpContent: any = null;

  try {
    const serviceData = await getService(resolvedParams.service);
    if (serviceData) { wpContent = serviceData.content; }
  } catch (error) {
    console.error("Failed to fetch WordPress content:", error);
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans mt-[80px]">
      <MedicalPseoSchema
        type="service"
        serviceSlug={resolvedParams.service}
        serviceName={serviceName}
        regionSlug={resolvedParams.region}
        wpContent={wpContent}
      />
      {/* 🌟 Premium Service Hero with Breadcrumbs & Accreditations */}
      <ServiceHero 
        service={resolvedParams.service} 
        region={resolvedParams.region} 
      />

      {/* 2. SEO INTERNAL LINKING GRID (The Secret Sauce) */}
      <section className="py-16 bg-white border-b border-slate-200 relative -mt-10 rounded-t-[3rem] z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Find a Center Near You in {regionName}
            </h2>
            <p className="text-slate-500 mt-2 font-medium">Select your specific location to view tailored availability and book your slot.</p>
          </div>

          {locations.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {locations.map((loc) => (
                <Link 
                  key={loc}
                  href={`/services/${resolvedParams.service}/${resolvedParams.region}/${loc}`}
                  prefetch={false}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all group"
                >
                  <span className="font-bold text-slate-700 group-hover:text-blue-700">{formatSlug(loc)}</span>
                  <ArrowRight size={16} className="text-slate-500 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-amber-50 rounded-2xl text-amber-800 border border-amber-100 font-medium">
              We are expanding! Specific location pages for this region are currently being updated.
            </div>
          )}
        </div>
      </section>

      {/* 🌟 Parent Diagnostic Centers Section */}
      <PartnerCenters service={resolvedParams.service} region={resolvedParams.region} />

      {/* 🌟 Health Checkup Packages Suite (When applicable) */}
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

      {/* 3. MEDICAL CONTENT */}
      <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Activity size={24} />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              About {serviceName}
            </h2>
          </div>
          
          {wpContent ? (
            <div className="wp-content-wrapper text-slate-700 font-medium leading-relaxed space-y-6">
              <WordPressRenderer
                content={wpContent}
                context={{ serviceName, regionName }}
              />
            </div>
          ) : isHealthCheckupService(resolvedParams.service) ? (
            <ClinicalHealthOverview
              serviceSlug={resolvedParams.service}
              formattedService={serviceName}
              regionName={regionName}
            />
          ) : (
            <ClinicalServiceOverview
              serviceSlug={resolvedParams.service}
              formattedService={serviceName}
              regionName={regionName}
            />
          )}
        </div>
      </section>

      {/* 4. PRICING TABLE */}
      {!isHealthCheckupService(resolvedParams.service) && (
        <PricingTable serviceSlug={resolvedParams.service} serviceName={serviceName} locationName={regionName} />
      )}

      {/* 5. FAQ SECTION */}
      <ServiceFAQ faqs={getFAQsForService(resolvedParams.service, serviceName)} serviceName={serviceName} />

      {/* 6. RELATED SERVICES */}
      <RelatedServices currentService={resolvedParams.service} region={resolvedParams.region} />

      {/* 7. TRUST SIGNALS */}
      <GoogleReviews />

    </div>
  );
}