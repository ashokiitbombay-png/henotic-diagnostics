import React from "react";
import { Metadata } from "next";
import LocationTemplate from "@/templates/LocationTemplate";
import { getService } from "@/lib/wordpress/getService";
import { filterShardParams } from "@/lib/seo/shard-helper";
import { formatSlug } from "@/lib/utils";

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
        url: `https://www.henoticdiagnostics.com/api/og?title=${encodeURIComponent(`${serviceName} in ${locationName}`)}&subtitle=${encodeURIComponent(`Henotic Diagnostics ${regionName}`)}`,
        width: 1200,
        height: 630,
        alt: `${serviceName} in ${locationName}, ${regionName} | Henotic Diagnostics`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://www.henoticdiagnostics.com/api/og?title=${encodeURIComponent(`${serviceName} in ${locationName}`)}&subtitle=${encodeURIComponent(`Henotic Diagnostics ${regionName}`)}`],
    },
  };
}

// ==========================================
// 2. STATIC PARAMETERS GENERATOR (PRE-RENDERING)
// ==========================================
export async function generateStaticParams() {
  const topServices = ["mri-scan", "ct-scan", "pet-scan", "ultrasound", "blood-test", "2d-echo", "full-body-check-up", "mammography", "pregnancy-sonography", "ecg"];
  const topLocations = [
    { city: "kharghar", region: "navi-mumbai" },
    { city: "panvel", region: "navi-mumbai" },
    { city: "vashi", region: "navi-mumbai" },
    { city: "nerul", region: "navi-mumbai" },
    { city: "cbd-belapur", region: "navi-mumbai" },
    { city: "kamothe", region: "navi-mumbai" },
    { city: "kalamboli", region: "navi-mumbai" },
    { city: "taloja", region: "navi-mumbai" },
    { city: "kopar-khairane", region: "navi-mumbai" },
    { city: "airoli", region: "navi-mumbai" },
    { city: "thane-west", region: "thane" },
    { city: "dombivli", region: "thane" },
    { city: "kalyan", region: "thane" },
    { city: "andheri", region: "western-suburbs" },
    { city: "bandra", region: "western-suburbs" },
    { city: "borivali", region: "western-suburbs" },
    { city: "ghatkopar", region: "central-suburbs" },
    { city: "pune-city", region: "pune" },
    { city: "hinjewadi", region: "pune" },
    { city: "hadapsar", region: "pune" },
  ];

  const paths: { service: string; region: string; location: string }[] = [];
  topServices.forEach((service) => {
    topLocations.forEach((loc) => {
      paths.push({
        service,
        region: loc.region,
        location: loc.city
      });
    });
  });
  return filterShardParams(paths);
}

// ==========================================
// 3. MAIN LANDING PAGE COMPONENT
// ==========================================
export default async function ServiceLocationPage({ params }: { params: Promise<{ service: string, region: string, location: string }> }) {
  const resolvedParams = await params;
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