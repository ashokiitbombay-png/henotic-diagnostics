import { Metadata } from 'next';
import React from "react";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import ServiceTemplate from '@/templates/ServiceTemplate';

export const revalidate = 86400; // 24 hours cache revalidation

const formatText = (text: string) => text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const serviceName = formatText(resolvedParams.service);

  return {
    title: `Best ${serviceName} | Book Online | Henotic Diagnostics`,
    description: `Looking for a reliable ${serviceName}? Henotic Diagnostics offers highly accurate, NABL-accredited diagnostic services with state-of-the-art technology.`,
    keywords: `${serviceName}, best ${serviceName} centers, ${serviceName} cost`,
    alternates: {
      canonical: `https://www.henoticdiagnostics.com/services/${resolvedParams.service}`
    }
  };
} 

// Pre-render the top 20 most popular services at build time for instant loading
export async function generateStaticParams() {
  const topServices = [
    "mri-scan",
    "ct-scan",
    "pet-scan",
    "ultrasound",
    "blood-test",
    "2d-echo",
    "dexa-bone-scan",
    "full-body-check-up",
    "nipt-test",
    "ecg",
    "tmt-test",
    "holter-monitoring",
    "mammography",
    "pregnancy-sonography",
    "anomaly-scan",
    "nt-scan",
    "color-doppler",
    "fibroscan",
    "angiography",
    "angioplasty"
  ];
  return topServices.map(service => ({ service }));
}

// UPGRADED: Using the exact Custom Post Type query verified from your WordPress backend
const GET_SERVICE_CONTENT = gql`
  query GetServiceContent($slug: ID!) {
    service(id: $slug, idType: SLUG) {
      title
      content
    }
  }
`;

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  const client = getClient();
  let wpContent: any = null;
  let wpTitle: string = formatText(resolvedParams.service);

  try {
    const { data } = await client.query<any>({
      query: GET_SERVICE_CONTENT,
      variables: { slug: resolvedParams.service },
      fetchPolicy: "no-cache", 
    });
    
    // Extracting data directly from the "service" object as per your GraphQL schema
    if (data?.service) {
      wpContent = data.service.content;
      wpTitle = data.service.title || wpTitle;
    }
  } catch (error) {
    console.error("Failed to fetch WordPress content:", error);
  }

  return (
    <ServiceTemplate 
      service={resolvedParams.service}
      content={wpContent}
      formattedService={wpTitle}
    />
  );
}