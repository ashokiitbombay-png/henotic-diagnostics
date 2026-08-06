import ServiceHero from '@/components/blocks/ServiceHero';
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from 'next/navigation';
import { ArrowRight, Activity } from "lucide-react";
import GoogleReviews from "@/components/features/reviews/GoogleReviews";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import RelatedServices from "@/components/seo/RelatedServices";
import PricingTable from "@/components/blocks/PricingTable";
import ServiceFAQ from "@/components/blocks/ServiceFAQ";
import { getFAQsForService } from "@/config/faqs";
import { REGION_LOCATIONS } from '@/config/locations';
import { optimizeWordPressHTML, formatSlug } from '@/lib/utils';
import { getService } from '@/lib/wordpress/getService';
import PartnerCenters from '@/components/blocks/PartnerCenters';
import MedicalPseoSchema from "@/components/seo/MedicalPseoSchema";
import { isValidServiceSlug, isValidRegionSlug } from '@/lib/seo/slug-validator';

export const revalidate = 86400; // 24 hours cache revalidation

// ==========================================
// 1. DYNAMIC SEO METADATA GENERATOR
// ==========================================
export async function generateMetadata({ params }: { params: Promise<{ service: string, region: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const serviceName = formatSlug(resolvedParams.service);
  const regionName = formatSlug(resolvedParams.region);

  const title = `Best ${serviceName} in ${regionName} | Book Online | Henotic Diagnostics`;
  const description = `Looking for a reliable ${serviceName} in ${regionName}? Henotic Diagnostics offers highly accurate, NABL-accredited diagnostic services with state-of-the-art technology. Same-day reports available.`;

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
        url: `https://www.henoticdiagnostics.com/api/og?title=${encodeURIComponent(serviceName)}&subtitle=${encodeURIComponent(`Premier Centers in ${regionName}`)}`,
        width: 1200,
        height: 630,
        alt: `${serviceName} in ${regionName} | Henotic Diagnostics`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://www.henoticdiagnostics.com/api/og?title=${encodeURIComponent(serviceName)}&subtitle=${encodeURIComponent(`Premier Centers in ${regionName}`)}`],
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

  let wpContent: any = null;
  
  const serviceName = formatSlug(resolvedParams.service);
  const regionName = formatSlug(resolvedParams.region);
  
  // Get the list of specific locations for this region to build the SEO grid
  const locations = REGION_LOCATIONS[resolvedParams.region] || [];

  try {
    const serviceData = await getService(resolvedParams.service);
    if (serviceData) { wpContent = serviceData.content; }
  } catch (error) {
    console.error("Failed to fetch WordPress content:", error);
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px]">
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
            <div 
              className="wp-content-wrapper text-slate-700 font-medium leading-relaxed"
              dangerouslySetInnerHTML={{ __html: optimizeWordPressHTML(wpContent) }} 
            />
          ) : (
            <p className="text-slate-500 italic text-center py-10">Detailed medical information for this service is being updated.</p>
          )}
        </div>
      </section>

      {/* 4. PRICING TABLE */}
      <PricingTable serviceSlug={resolvedParams.service} serviceName={serviceName} locationName={regionName} />

      {/* 5. FAQ SECTION */}
      <ServiceFAQ faqs={getFAQsForService(resolvedParams.service, serviceName)} serviceName={serviceName} />
      <FAQSchema faqs={getFAQsForService(resolvedParams.service, serviceName)} />

      {/* 6. ENHANCED SCHEMA */}
      <ServiceSchema serviceName={serviceName} serviceSlug={resolvedParams.service} regionName={resolvedParams.region} />

      {/* 7. RELATED SERVICES */}
      <RelatedServices currentService={resolvedParams.service} region={resolvedParams.region} />

      {/* 8. TRUST SIGNALS */}
      <GoogleReviews />

    </main>
  );
}