import React from "react";
import { Metadata } from "next";
import { notFound } from 'next/navigation';
import LocationTemplate from "@/templates/LocationTemplate";
import { getService } from "@/lib/wordpress/getService";
import { formatSlug } from "@/lib/utils";
import { isValidServiceSlug, isValidLocationForRegion } from '@/lib/seo/slug-validator';
import { isHealthCheckupService } from '@/config/health-packages';
import { getHeroImageForService } from '@/config/services';
import { REGION_NAMES, CITY_MICRO_NEIGHBORHOODS } from '@/config/locations';
import { getPayloadLocation } from '@/lib/payload/locations';
import { isNiptService, type NiptLocationContext } from '@/config/nipt-test';
import { getNiptPageData } from '@/lib/payload/nipt-tests';
import NiptAuthorityPage, { buildNiptMetadata } from '@/components/nipt-test/NiptAuthorityPage';
import CrossLocationLinks from '@/components/seo/CrossLocationLinks';
import ServiceAreaTargeting from '@/components/seo/ServiceAreaTargeting';
import PeopleAlsoSearchFor from '@/components/seo/PeopleAlsoSearchFor';
import RelatedServices from '@/components/seo/RelatedServices';
import LocalSEOMastery from '@/components/seo/LocalSEOMastery';
import { buildRobotsMetadata, getL3IndexingDirective } from '@/lib/seo/indexing-policy';

export const revalidate = 604800; // 7 days cache revalidation

async function resolveNiptLocationContext(region: string, location: string): Promise<NiptLocationContext> {
  const locMeta = await getPayloadLocation(location, region);
  return {
    regionSlug: region,
    regionName: locMeta?.regionName || REGION_NAMES[region] || formatSlug(region),
    locationSlug: location,
    locationName: locMeta?.name || formatSlug(location),
    cityName: locMeta?.city || REGION_NAMES[region] || formatSlug(region),
    pincode: locMeta?.pincode,
    homeCollectionTurnaround: locMeta?.homeCollectionTurnaround,
    nearestPartnerHub: locMeta?.nearestPartnerHub,
    serviceTier: locMeta?.serviceTier,
    latitude: locMeta?.latitude,
    longitude: locMeta?.longitude,
    microNeighborhoods: CITY_MICRO_NEIGHBORHOODS[location.toLowerCase()] || [],
  };
}

// ==========================================
// 1. DYNAMIC SEO METADATA GENERATOR
// ==========================================
export async function generateMetadata({ params }: { params: Promise<{ service: string, region: string, location: string }> }): Promise<Metadata> {
  const resolvedParams = await params;

  if (isNiptService(resolvedParams.service)) {
    const locCtx = await resolveNiptLocationContext(resolvedParams.region, resolvedParams.location);
    const niptData = await getNiptPageData(resolvedParams.service, locCtx);
    if (niptData) return buildNiptMetadata(niptData);
  }

  const directive = getL3IndexingDirective(
    resolvedParams.service,
    resolvedParams.region,
    resolvedParams.location
  );

  const serviceName = formatSlug(resolvedParams.service);
  const locationName = formatSlug(resolvedParams.location);
  const regionName = formatSlug(resolvedParams.region);

  const title = `Best ${serviceName} in ${locationName}, ${regionName} | Henotic Diagnostics`;
  const isHealth = isHealthCheckupService(resolvedParams.service);
  const description = isHealth
    ? `Looking for ${serviceName} in ${locationName}, ${regionName}? Book certified health checkup packages with 24/7 home sample collection in ${locationName}. NABL-accredited pathology & same-day reports.`
    : `Looking for a ${serviceName} in ${locationName}? Henotic Diagnostics offers highly accurate, NABL-accredited imaging and pathology with same-day reports. Book now!`;
  const canonicalUrl = directive.canonicalUrl;
  const heroImage = getHeroImageForService(resolvedParams.service);

  return {
    title,
    description,
    keywords: `${serviceName} in ${locationName}, best ${serviceName} near me, ${serviceName} cost in ${locationName}, diagnostic center in ${locationName} ${regionName}`,
    robots: buildRobotsMetadata(directive.index),
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

  // 🧬 NIPT hyper-local micro-city authority experience across all 361 cities
  if (isNiptService(resolvedParams.service)) {
    const locCtx = await resolveNiptLocationContext(resolvedParams.region, resolvedParams.location);
    const niptData = await getNiptPageData(resolvedParams.service, locCtx);
    if (niptData) {
      return (
        <NiptAuthorityPage
          data={niptData}
          afterSuiteSlot={
            <div className="space-y-4">
              <CrossLocationLinks
                service={resolvedParams.service}
                region={resolvedParams.region}
                currentLocation={resolvedParams.location}
              />
              <ServiceAreaTargeting
                service={resolvedParams.service}
                region={resolvedParams.region}
                location={resolvedParams.location}
              />
              <PeopleAlsoSearchFor currentServiceSlug={resolvedParams.service} />
              <RelatedServices
                currentService={resolvedParams.service}
                region={resolvedParams.region}
                location={resolvedParams.location}
              />
              <LocalSEOMastery
                service={resolvedParams.service}
                region={resolvedParams.region}
                location={resolvedParams.location}
              />
            </div>
          }
        />
      );
    }
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