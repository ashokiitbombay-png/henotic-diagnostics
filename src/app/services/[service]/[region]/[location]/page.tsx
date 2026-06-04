import React from 'react';
import ServiceLocationTemplate from '@/components/templates/ServiceLocationTemplate';
import { Metadata } from 'next';
import { getClient } from '@/lib/apollo-client';
import { GET_SERVICE_CONTENT } from '@/lib/graphql/queries';

export const dynamicParams = true; 

export async function generateStaticParams() {
  return []; 
}

export async function generateMetadata({ params }: { params: Promise<{ service: string, region: string, location: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const title = `${resolvedParams.service.replace(/-/g, ' ')} in ${resolvedParams.location.replace(/-/g, ' ')}`;
  
  return {
    title: `${title} | Henotic Diagnostics`,
    description: `Book your ${title} at the best diagnostic center in ${resolvedParams.region.replace(/-/g, ' ')}. Fast reports, advanced tech.`,
    alternates: {
      canonical: `/services/${resolvedParams.service}/${resolvedParams.region}/${resolvedParams.location}`
    }
  };
}

export default async function LocationServicePage({ params }: { params: Promise<{ service: string, region: string, location: string }> }) {
  const resolvedParams = await params;
  const client = getClient();
  
  // Explicitly typing pageContent to 'any' to satisfy TypeScript
  let pageContent: any = null;
  
  try {
    // Adding <any> to client.query tells TypeScript to accept the dynamic WordPress structure
    const { data } = await client.query<any>({
      query: GET_SERVICE_CONTENT,
      variables: { serviceSlug: resolvedParams.service }
    });
    
    // Now TypeScript knows data can have dynamic properties like 'pageBy'
    pageContent = data?.pageBy || null;
    
  } catch (error) {
    console.error("Failed to fetch WordPress content:", error);
  }
  
  return (
    <ServiceLocationTemplate 
      service={resolvedParams.service} 
      region={resolvedParams.region} 
      location={resolvedParams.location} 
      content={pageContent} 
    />
  );
}