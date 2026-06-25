import React from "react";
import { Metadata } from "next";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import LocationTemplate from "@/templates/LocationTemplate";

export const revalidate = 86400; // 24 hours cache revalidation

const GET_SERVICE_CONTENT = gql`
  query GetServiceContent($slug: ID!) {
    service(id: $slug, idType: SLUG) {
      title
      content
    }
  }
`;

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
// 2. MAIN LANDING PAGE COMPONENT
// ==========================================
export default async function ServiceLocationPage({ params }: { params: Promise<{ service: string, region: string, location: string }> }) {
  const resolvedParams = await params;
  const client = getClient();
  let wpContent: any = null;
  
  const serviceName = formatText(resolvedParams.service);
  const locationName = formatText(resolvedParams.location);
  const regionName = formatText(resolvedParams.region);

  try {
    const { data } = await client.query<any>({
      query: GET_SERVICE_CONTENT,
      variables: { slug: resolvedParams.service },
      fetchPolicy: "no-cache", 
    });
    if (data?.service) { wpContent = data.service.content; }
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