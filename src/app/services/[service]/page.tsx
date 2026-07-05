import { Metadata } from 'next';
import React from "react";
import ServiceTemplate from '@/templates/ServiceTemplate';
import { getService } from '@/lib/wordpress/getService';

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
    },
    openGraph: {
      title: `${serviceName} — Henotic Diagnostics`,
      description: `Book ${serviceName} at Henotic Diagnostics. NABL certified, same-day reports, 24/7 availability.`,
      url: `https://www.henoticdiagnostics.com/services/${resolvedParams.service}`,
      images: [{
        url: `https://www.henoticdiagnostics.com/api/og?title=${encodeURIComponent(serviceName)}&subtitle=${encodeURIComponent('NABL Certified Diagnostic Center')}`,
        width: 1200,
        height: 630,
        alt: `${serviceName} at Henotic Diagnostics`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${serviceName} — Henotic Diagnostics`,
      images: [`https://www.henoticdiagnostics.com/api/og?title=${encodeURIComponent(serviceName)}&subtitle=${encodeURIComponent('Book Online • Same-Day Reports')}`],
    },
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

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  let wpContent: any = null;
  let wpTitle: string = formatText(resolvedParams.service);

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