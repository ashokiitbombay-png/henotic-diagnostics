import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home } from 'lucide-react';
import { getHeroImageForService } from '@/config/services';
import AccreditationLogos from '@/components/blocks/AccreditationLogos';

// 🏅 ACCREDITATION LOGOS - National Bodies
const ACCREDITATIONS = [
  { 
    title: "NABL", 
    img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/NABL-henotic-diagnsotics-kharghar.webp" 
  },
  { 
    title: "ISO", 
    img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/iso-certification-for-henotic-diagnsotics-kharghar.webp" 
  },
  { 
    title: "AERB", 
    img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/Atomic_Energy_Regulatory_Board_Henotic-Diagnostics-LOGO.svg%20(1).webp" 
  },
  { 
    title: "PCPNDT", 
    img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/pcpndt-certified-henotic-diagnsotics-kharghar.webp" 
  },
  { 
    title: "NABH", 
    img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/nabh-henotic-diagnsotics-kharghar.webp" 
  },
];

// HERO_IMAGE is now dynamically resolved per-service via getHeroImageForService()

// 🧠 Intelligent Slug Formatter for 200+ Medical Services & Locations
const formatSlug = (slug: string) => {
  if (!slug) return '';
  const acronyms = [
    "mri", "ct", "pet", "nt", "usg", "ecg", "cbc", "lft", "kft", "hba1c", 
    "2d", "3d", "4d", "nipt", "nips", "nippt", "dna", "dexa", "bmd", "tmt", 
    "bpp", "fnac", "dtpa", "mag3", "gfr", "vdrl", "hiv", "hpv", "std", "sti", 
    "tavr", "cbd", "hrct", "mrcp", "pns", "ec"
  ];
  return slug.split('-').map(word => {
    const lowerWord = word.toLowerCase();
    if (acronyms.includes(lowerWord)) {
      if (lowerWord === 'hba1c') return 'HbA1c';
      return word.toUpperCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

interface ServiceHeroProps {
  /** The raw service slug (e.g., "mri-scan") */
  service?: string;
  /** The raw region slug (e.g., "navi-mumbai") */
  region?: string;
  /** The raw location/city slug (e.g., "kharghar") */
  location?: string;
  /** Main headline — overrides auto-generated title */
  title?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Whether this is the /services index page (no dynamic params) */
  isServicesIndex?: boolean;
}

/**
 * 🌟 Premium Service Hero Component
 * Combines: Gradient Breadcrumb Bar + Hero Image + Accreditation Logos
 * Used across: /services, /services/[service]/[region], /services/[service]/[region]/[location]
 */
export default function ServiceHero({ 
  service, 
  region, 
  location, 
  title, 
  subtitle,
  isServicesIndex = false 
}: ServiceHeroProps) {

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.henoticdiagnostics.com';

  // 📍 Build breadcrumb hierarchy
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ];

  if (service) {
    breadcrumbs.push({ name: formatSlug(service), url: `/services/${service}` });
  }
  if (service && region) {
    breadcrumbs.push({ name: formatSlug(region), url: `/services/${service}/${region}` });
  }
  if (service && region && location) {
    breadcrumbs.push({ name: formatSlug(location), url: `/services/${service}/${region}/${location}` });
  }

  // 🤖 JSON-LD Structured Data for Google Search
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

  // Auto-generate title if not provided
  const heroTitle = title || (
    location && region && service
      ? `Best ${formatSlug(service)} in ${formatSlug(location)}`
      : region && service
        ? `Premier ${formatSlug(service)} Centers in ${formatSlug(region)}`
        : service
          ? formatSlug(service)
          : 'Our Diagnostic Services'
  );

  const heroSubtitle = subtitle || (
    location && region
      ? `Accurate, fast, and reliable diagnostic services near you in ${formatSlug(location)}, ${formatSlug(region)}. Experience state-of-the-art technology with same-day reporting.`
      : region
        ? `Access world-class diagnostic technology across our comprehensive network in ${formatSlug(region)}. Select your nearest neighborhood for priority booking.`
        : 'Browse our comprehensive library of diagnostic capabilities. We provide over 200 NABL accredited radiology scans and automated clinical pathology investigations.'
  );

  return (
    <>
      {/* 🤖 Invisible Schema Tag for Google Bots */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* 🖼️ FULL-WIDTH HERO SECTION WITH IMAGE BACKGROUND */}
      <section className="relative min-h-[420px] md:min-h-[520px] overflow-hidden bg-slate-900">
        
        {/* Background Hero Image — Responsive for all devices */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={getHeroImageForService(service || '')}
            alt={`${heroTitle} — Advanced Diagnostics at Henotic Diagnostics`}
            fill
            className="object-cover object-center sm:object-center"
            priority
            quality={80}
            sizes="100vw"
            style={{ objectPosition: '50% 30%' }}
          />
          {/* Multi-layer gradient overlays for text readability on ALL devices */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-slate-900/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/30 to-transparent"></div>
          {/* Extra mobile overlay for better contrast on small screens */}
          <div className="absolute inset-0 bg-slate-900/20 md:bg-transparent transition-colors"></div>
        </div>

        {/* Decorative Gradient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[120px] opacity-20 bg-[#b06ab3]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full mix-blend-screen filter blur-[100px] opacity-15 bg-[#4568dc]"></div>

        {/* 🧭 PREMIUM BREADCRUMB BAR — Top of everything */}
        <div className="relative z-30 pt-4 md:pt-6 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <nav 
              aria-label="Breadcrumb"
              className="w-full sm:w-fit p-3 sm:px-6 sm:py-3.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.25),_0_4px_6px_rgba(0,0,0,0.1)] border border-white/20 backdrop-blur-xl overflow-x-auto whitespace-nowrap hide-scrollbar"
              style={{ background: "linear-gradient(135deg, rgba(69,104,220,0.92) 0%, rgba(176,106,179,0.92) 50%, rgba(229,93,135,0.92) 100%)" }}
            >
              <ol className="flex items-center space-x-1.5 sm:space-x-2 min-w-max text-xs sm:text-sm font-black text-white drop-shadow-md">
                {breadcrumbs.map((crumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return (
                    <li key={crumb.url} className="flex items-center">
                      {isLast ? (
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
        </div>

        {/* 🏅 ACCREDITATION LOGOS — Interactive with Certificate Viewer */}
        <div className="relative z-20 mt-4 md:mt-6 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <AccreditationLogos badges={ACCREDITATIONS} variant="hero" />
          </div>
        </div>

        {/* 📝 HERO CONTENT — Title, Subtitle */}
        <div className="relative z-20 px-4 md:px-8 pt-6 md:pt-10 pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-5 tracking-tight drop-shadow-2xl max-w-4xl">
              {heroTitle.includes(' in ') ? (
                <>
                  {heroTitle.split(' in ')[0]} in{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-[#E55D87]">
                    {heroTitle.split(' in ').slice(1).join(' in ')}
                  </span>
                </>
              ) : (
                <>
                  {isServicesIndex ? (
                    <>Our Diagnostic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">Services</span></>
                  ) : (
                    heroTitle
                  )}
                </>
              )}
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-200 font-medium max-w-3xl drop-shadow-md leading-relaxed">
              {heroSubtitle}
            </p>
          </div>
        </div>

      </section>
    </>
  );
}
