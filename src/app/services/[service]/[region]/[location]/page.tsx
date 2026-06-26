import React from "react";
import { Metadata } from "next";
import LocationTemplate from "@/templates/LocationTemplate";
import { getService } from "@/lib/wordpress/getService";

export const revalidate = 86400; // 24 hours cache revalidation

// Helper to format URL slugs (e.g., "navi-mumbai" -> "Navi Mumbai")
const formatText = (text: string) => text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

// ==========================================
// 1. DYNAMIC SEO METADATA GENERATOR
// ==========================================
export async function generateMetadata({ params }: { params: Promise<{ service: string, region: string, location: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const serviceName = formatText(resolvedParams.service);
  const locationName = formatText(resolvedParams.location);
  const regionName = formatText(resolvedParams.region);

  return {
    title: `Best ${serviceName} in ${locationName}, ${regionName} | Henotic Diagnostics`,
    description: `Looking for a ${serviceName} in ${locationName}? Henotic Diagnostics offers highly accurate, NABL-accredited imaging and pathology with same-day reports. Book now!`,
    keywords: `${serviceName} in ${locationName}, best ${serviceName} near me, ${serviceName} cost in ${locationName}, diagnostic center in ${locationName} ${regionName}`,
    alternates: {
      canonical: `https://www.henoticdiagnostics.com/services/${resolvedParams.service}/${resolvedParams.region}/${resolvedParams.location}`
    },
    openGraph: {
      title: `${serviceName} in ${locationName} | Henotic Diagnostics`,
      description: `Fast, accurate ${serviceName} available at our advanced facility near ${locationName}.`,
      type: "website",
    }
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
  return paths;
}

// ==========================================
// 3. MAIN LANDING PAGE COMPONENT
// ==========================================
export default async function ServiceLocationPage({ params }: { params: Promise<{ service: string, region: string, location: string }> }) {
  const resolvedParams = await params;
  let wpContent: any = null;
  
  const serviceName = formatText(resolvedParams.service);
  const locationName = formatText(resolvedParams.location);
  const regionName = formatText(resolvedParams.region);

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