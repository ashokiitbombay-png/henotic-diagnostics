"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useParams } from 'next/navigation';

// 🧠 Intelligent Slug Formatter for 200+ Medical Services & Locations
const formatSlug = (slug: string) => {
  if (!slug) return '';
  
  // Array of medical acronyms and specific terms that must be fully capitalized
  const acronyms = [
    "mri", "ct", "pet", "nt", "usg", "ecg", "cbc", "lft", "kft", "hba1c", 
    "2d", "3d", "4d", "nipt", "nips", "nippt", "dna", "dexa", "bmd", "tmt", 
    "bpp", "fnac", "dtpa", "mag3", "gfr", "vdrl", "hiv", "hpv", "std", "sti", 
    "tavr", "cbd", "hrct", "mrcp", "pns", "ec"
  ];

  return slug.split('-').map(word => {
    const lowerWord = word.toLowerCase();
    // If the word is an acronym, capitalize the whole thing
    if (acronyms.includes(lowerWord)) {
      // Special case for HbA1c
      if (lowerWord === 'hba1c') return 'HbA1c';
      return word.toUpperCase();
    }
    // Otherwise, standard Title Case
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

export default function DynamicBreadcrumbs() {
  // 🚀 Automatically extracts parameters safely in Next.js 15
  const params = useParams();
  
  // Fail-safe if used outside of a dynamic route
  if (!params) return null;

  const service = params.service as string | undefined;
  const region = params.region as string | undefined;
  const location = params.location as string | undefined;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.henoticdiagnostics.com';

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' }
  ];

  // Dynamically build the hierarchy
  if (service) {
    breadcrumbs.push({ name: formatSlug(service), url: `/services/${service}` });
  }
  if (service && region) {
    breadcrumbs.push({ name: formatSlug(region), url: `/services/${service}/${region}` });
  }
  if (service && region && location) {
    breadcrumbs.push({ name: formatSlug(location), url: `/services/${service}/${region}/${location}` });
  }

  // 🤖 JSON-LD STRUCTURED DATA FOR GOOGLE SEARCH
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
      {/* Invisible Schema Tag for Google Bots */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* Visible Gradient Glassmorphism Navigation Bar */}
      <nav 
        aria-label="Breadcrumb"
        className="w-full sm:w-fit p-3 sm:px-6 sm:py-3.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-white/30 backdrop-blur-xl overflow-x-auto whitespace-nowrap hide-scrollbar"
        style={{ background: "linear-gradient(to right, rgba(236, 110, 173, 0.9), rgba(52, 148, 230, 0.9))" }}
      >
        <ol className="flex items-center space-x-1.5 sm:space-x-2 min-w-max text-xs sm:text-sm font-black text-white drop-shadow-md">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <li key={crumb.url} className="flex items-center">
                {isLast ? (
                  // The last item is not a link, it represents the current page
                  <span className="text-white flex items-center gap-1.5 opacity-90 cursor-default" aria-current="page">
                    {index === 0 && <Home size={14} className="mb-0.5" />}
                    {crumb.name}
                  </span>
                ) : (
                  <Link 
                    href={crumb.url} 
                    className="hover:text-slate-200 hover:underline decoration-2 underline-offset-4 transition-all flex items-center gap-1.5"
                  >
                    {index === 0 && <Home size={14} className="mb-0.5" />}
                    {crumb.name}
                  </Link>
                )}
                
                {!isLast && (
                  <ChevronRight size={16} className="mx-1 sm:mx-2 text-white/70" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}