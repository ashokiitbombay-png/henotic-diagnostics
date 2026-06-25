import React from 'react';
import { Metadata } from 'next';
import LandingPageTemplate from '@/templates/LandingPageTemplate';

export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: {
      index: false,
      follow: false,
    },
  };
}

const formatText = (text: string) => text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

export default async function GoogleAdsLandingPage({ params, searchParams }: { params: Promise<{ service: string }>, searchParams: Promise<{ keyword?: string }> }) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  
  const formattedService = formatText(resolvedParams.service);

  return (
    <LandingPageTemplate 
      service={resolvedParams.service}
      keyword={resolvedSearch.keyword}
      formattedService={formattedService}
    />
  );
}