import React from "react";
import { Metadata } from "next";
import { notFound } from 'next/navigation';
import LocationTemplate from "@/templates/LocationTemplate";
import { getService } from "@/lib/wordpress/getService";
import { formatSlug } from "@/lib/utils";
import { isValidServiceSlug, isValidLocationForRegion } from '@/lib/seo/slug-validator';
import { getHeroImageForService } from '@/config/services';

export const revalidate = 86400; // 24 hours cache revalidation

// ==========================================
// 1. DYNAMIC SEO METADATA GENERATOR
// ==========================================
export async function generateMetadata({ params }: { params: Promise<{ service: string, region: string, location: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const serviceName = formatSlug(resolvedParams.service);
  const locationName = formatSlug(resolvedParams.location);
  const regionName = formatSlug(resolvedParams.region);

  const title = `Best ${serviceName} in ${locationName}, ${regionName} | Henotic Diagnostics`;
  const description = `Looking for a ${serviceName} in ${locationName}? Henotic Diagnostics offers highly accurate, NABL-accredited imaging and pathology with same-day reports. Book now!`;
  const canonicalUrl = `https://www.henoticdiagnostics.com/services/${resolvedParams.service}/${resolvedParams.region}/${resolvedParams.location}`;
  const heroImage = getHeroImageForService(resolvedParams.service);

  return {
    title,
    description,
    keywords: `${serviceName} in ${locationName}, best ${serviceName} near me, ${serviceName} cost in ${locationName}, diagnostic center in ${locationName} ${regionName}`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      images: [{
        url: heroImage,
        width: 1200,
        height: 630,
        alt: `${serviceName} in ${locationName}, ${regionName} | Henotic Diagnostics`,
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

// ==========================================
// 2. STATIC PARAMETERS GENERATOR (PRE-RENDERING)
// ==========================================
// Pre-render top priority service×location combos from the ISR manifest.
// Remaining combos render on-demand via ISR (dynamicParams = true).
import { getLocationPriorities } from '@/lib/seo/build-priorities';

export async function generateStaticParams() {
  return getLocationPriorities();
}

// ==========================================
// 3. MAIN LANDING PAGE COMPONENT
// ==========================================
export default async function ServiceLocationPage({ params }: { params: Promise<{ service: string, region: string, location: string }> }) {
  const resolvedParams = await params;

  // Slug validation: prevent CDN cache pollution + cross-region injection
  if (!isValidServiceSlug(resolvedParams.service) || !isValidLocationForRegion(resolvedParams.region, resolvedParams.location)) {
    notFound();
  }

  let wpContent: any = null;
  
  const serviceName = formatSlug(resolvedParams.service);
  const locationName = formatSlug(resolvedParams.location);
  const regionName = formatSlug(resolvedParams.region);

  try {
    const serviceData = await getService(resolvedParams.service);
    if (serviceData) { wpContent = serviceData.content; }
  } catch (error) {
    console.error("Failed to fetch WordPress content:", error);
  }

  return (
    <LocationTemplate 
      service={resolvedParams.service}
      region={resolvedParams.region}
      location={resolvedParams.location}
      content={wpContent}
      formattedService={serviceName}
      formattedLocation={locationName}
      formattedRegion={regionName}
    />
  );
}