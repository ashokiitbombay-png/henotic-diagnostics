"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useParams } from 'next/navigation';

// 🧠 Intelligent Formatting Engine for Medical & Regional Slugs
const formatSlug = (slug: string) => {
  if (!slug) return '';
  
  const dictionary: Record<string, string> = {
    "mri-scan": "MRI Scan",
    "ct-scan": "CT Scan",
    "pet-scan": "PET Scan",
    "nt-scan": "NT Scan",
    "usg-scan": "USG Scan",
    "ecg": "ECG",
    "cbc-test": "CBC Test",
    "hba1c-test": "HbA1c Test",
    "2d-echo": "2D Echo",
    "tmt-test": "TMT Test",
    "nipt-test": "NIPT Test",
    "dexa-bone-scan": "DEXA Bone Scan",
    "navi-mumbai": "Navi Mumbai",
    "cbd-belapur": "CBD Belapur",
    "south-mumbai": "South Mumbai"
  };

  if (dictionary[slug.toLowerCase()]) {
    return dictionary[slug.toLowerCase()];
  }

  // Fallback: Convert dashes to spaces and Title Case everything
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default function DynamicBreadcrumbs() {
  // 🚀 Automatically extracts parameters from the Next.js App Router
  const params = useParams();
  const service = params?.service as string | undefined;
  const region = params?.region as string | undefined;
  const location = params?.location as string | undefined;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.henoticdiagnostics.com';

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' }
  ];

  if (service) breadcrumbs.push({ name: formatSlug(service), url: `/services/${service}` });
  if (service && region) breadcrumbs.push({ name: formatSlug(region), url: `/services/${service}/${region}` });
  if (service && region && location) breadcrumbs.push({ name: formatSlug(location), url: `/services/${service}/${region}/${location}` });

  // 🤖 JSON-LD STRUCTURED DATA
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${baseUrl}${crumb.url}`
    }))
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 relative z-50 mt-4 md:mt-6 mb-2">
      {/* Invisible Schema Tag for Google */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* Visible Gradient Glassmorphism Navigation Bar */}
      <nav 
        className="w-full sm:w-fit p-3 sm:px-6 sm:py-3.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-white/30 backdrop-blur-xl overflow-x-auto whitespace-nowrap hide-scrollbar"
        style={{ background: "linear-gradient(to right, rgba(236, 110, 173, 0.85), rgba(52, 148, 230, 0.85))" }}
      >
        <ol className="flex items-center space-x-1.5 sm:space-x-2 min-w-max text-xs sm:text-sm font-black text-white drop-shadow-md">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.url} className="flex items-center">
              <Link 
                href={crumb.url} 
                className="hover:text-slate-200 hover:underline decoration-2 underline-offset-4 transition-all flex items-center gap-1.5"
              >
                {index === 0 && <Home size={14} className="mb-0.5" />}
                {crumb.name}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <ChevronRight size={16} className="mx-1 sm:mx-2 text-white/70" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}