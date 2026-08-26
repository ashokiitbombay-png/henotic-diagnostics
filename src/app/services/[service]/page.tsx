import { Metadata } from 'next';
import React from "react";
import { notFound } from 'next/navigation';
import ServiceTemplate from '@/templates/ServiceTemplate';
import { getService } from '@/lib/wordpress/getService';
import { formatSlug } from '@/lib/utils';
import { isValidServiceSlug } from '@/lib/seo/slug-validator';
import { getHeroImageForService } from '@/config/services';

export const revalidate = 86400; // 24 hours cache revalidation

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const serviceName = formatSlug(resolvedParams.service);
  const heroImage = getHeroImageForService(resolvedParams.service);

  return {
    title: `Best ${serviceName} | Book Online | Henotic Diagnostics`,
    description: `Looking for a reliable ${serviceName}? Henotic Diagnostics offers highly accurate, NABL-accredited diagnostic services with state-of-the-art technology. Same-day reports available.`,
    alternates: {
      canonical: `https://www.henoticdiagnostics.com/services/${resolvedParams.service}`
    },
    openGraph: {
      title: `${serviceName} — Henotic Diagnostics`,
      description: `Book ${serviceName} at Henotic Diagnostics. NABL certified, same-day reports, 24/7 availability.`,
      url: `https://www.henoticdiagnostics.com/services/${resolvedParams.service}`,
      images: [{
        url: heroImage,
        width: 1200,
        height: 630,
        alt: `${serviceName} at Henotic Diagnostics`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${serviceName} — Henotic Diagnostics`,
      images: [heroImage],
    },
  };
} 

import { getServicePriorities } from '@/lib/seo/build-priorities';

// Pre-render top priority services at build time from the ISR manifest.
// Remaining 490k+ services render on-demand via ISR (dynamicParams = true).
export async function generateStaticParams() {
  return getServicePriorities();
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;

  // Slug validation: prevent CDN cache pollution from invalid URLs
  if (!isValidServiceSlug(resolvedParams.service)) {
    notFound();
  }

  let wpContent: any = null;
  let wpTitle: string = formatSlug(resolvedParams.service);

  try {
    const serviceData = await getService(resolvedParams.service);
    if (serviceData) {
      wpContent = serviceData.content;
      wpTitle = serviceData.title || wpTitle;
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