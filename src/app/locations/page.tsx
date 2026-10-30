import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ChevronRight, ShieldCheck, Clock, Award, Building2, PhoneCall } from 'lucide-react';
import { LOCATION_DATABASE, REGION_NAMES } from '@/config/locations';
import LocationsDirectory from '@/components/locations/LocationsDirectory';

export const revalidate = 86400; // 24 hours ISR

export const metadata: Metadata = {
  title: 'Geographical Directory — 350+ Diagnostic Service Locations & PIN Codes | Henotic Diagnostics',
  description: 'Search Henotic Diagnostics network across 350+ locations and PIN codes in Mumbai, Navi Mumbai, Thane, Pune & Raigad. Book NABL accredited MRI, CT Scan, Ultrasound & Home Blood Sample Collection.',
  keywords: 'diagnostic centers near me, blood test pin code, MRI scan locations Mumbai, CT scan Pune, pathology lab Thane, diagnostic center Navi Mumbai',
  alternates: {
    canonical: 'https://www.henoticdiagnostics.com/locations'
  },
  openGraph: {
    title: 'Geographical Directory — 350+ Service Locations & PIN Codes | Henotic Diagnostics',
    description: 'Explore our complete diagnostic network across 350+ micro-neighbourhoods in Maharashtra. NABL certified scans & same-day blood collection.',
    url: 'https://www.henoticdiagnostics.com/locations',
    type: 'website',
    images: [{
      url: 'https://cdn.henoticdiagnostics.com/Hero%20Image/medical-imaging-diagnostics-henotic-diagnostics-hero-image.webp',
      width: 1200,
      height: 630,
      alt: 'Henotic Diagnostics Geographical Directory'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geographical Directory — Henotic Diagnostics',
    description: 'Find diagnostic centers & doorstep blood sample collection across 350+ PIN codes in Mumbai, Navi Mumbai, Thane & Pune.',
    images: ['https://cdn.henoticdiagnostics.com/Hero%20Image/medical-imaging-diagnostics-henotic-diagnostics-hero-image.webp']
  }
};

export default function LocationsPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.henoticdiagnostics.com' },
      { '@type': 'ListItem', position: 2, name: 'Geographical Directory', item: 'https://www.henoticdiagnostics.com/locations' }
    ]
  };

  const directorySchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Henotic Diagnostics Geographical Directory',
    description: 'Index of 350+ diagnostic service areas, PIN codes, and micro-neighbourhoods covered across Mumbai, Navi Mumbai, Thane, Pune and Raigad.',
    url: 'https://www.henoticdiagnostics.com/locations',
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Patients'
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px] pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }}
      />

      {/* ── Hero Section ───────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0c1e3e] via-[#1a2d54] to-[#254680] py-16 md:py-24 px-4 md:px-8 overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs md:text-sm text-blue-200 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={14} className="text-blue-400" />
            <span className="text-white font-bold">Geographical Directory</span>
          </nav>

          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 text-cyan-200 border border-white/20 font-extrabold text-xs tracking-wider uppercase mb-5 backdrop-blur-md">
            <MapPin size={14} />
            350+ Micro-Locations & PIN Codes
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
            Geographical Directory &{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-200 bg-clip-text text-transparent">
              Service Areas
            </span>
          </h1>

          <p className="text-base md:text-lg text-blue-100 font-medium max-w-3xl leading-relaxed mb-8">
            Access certified diagnostic services, 3.0T MRI, 128-Slice CT scans, and 24/7 doorstep blood sample collection across 350+ localities in Mumbai, Navi Mumbai, Thane, Pune, and Raigad.
          </p>

          {/* Key Trust Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl pt-4 border-t border-white/10">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="text-2xl md:text-3xl font-black text-cyan-300">353</div>
              <div className="text-xs text-blue-200 font-medium mt-0.5">Covered Localities</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="text-2xl md:text-3xl font-black text-blue-200">30–60m</div>
              <div className="text-xs text-blue-200 font-medium mt-0.5">Home Collection Arrival</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="text-2xl md:text-3xl font-black text-emerald-300">100%</div>
              <div className="text-xs text-blue-200 font-medium mt-0.5">NABL & AERB Certified</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="text-2xl md:text-3xl font-black text-amber-300">Same-Day</div>
              <div className="text-xs text-blue-200 font-medium mt-0.5">Verified Digital Reports</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Interactive Directory Container ────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-20">
        <LocationsDirectory
          initialLocations={LOCATION_DATABASE}
          regionNames={REGION_NAMES}
        />
      </section>

      {/* ── Local SEO Informational Content ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-20">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
            Comprehensive Diagnostic & Preventive Health Network Across Maharashtra
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 leading-relaxed font-medium">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Doorstep Pathology with Cold-Chain Integrity
              </h3>
              <p className="mb-4">
                Henotic Diagnostics deploys a dedicated fleet of certified phlebotomists servicing every major PIN code across Mumbai, Navi Mumbai, Thane, and Pune. Every sample collected follows strict vacutainer barcoding and temperature-controlled cold-chain protocols to ensure zero pre-analytical errors.
              </p>
              <p>
                From routine CBC, Lipid Profile, and HbA1c to advanced Cancer Screenings and Vitamin panels, reports are generated by automated analyzers and medically verified by Senior MD Pathologists.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                High-Resolution Radiology & Scan Center Network
              </h3>
              <p className="mb-4">
                Patients requiring advanced imaging enjoy seamless access to our flagship Kharghar facility and accredited partner hubs across Dadar, Bandra, Andheri, Thane, Dombivli, Kothrud, and Hinjewadi.
              </p>
              <p>
                Equipped with Siemens 3.0 Tesla Silent MRI, 128-Slice Low-Dose CT (including Cardiac Angio and HRCT Chest), GE Voluson 4D Fetal Ultrasound, and Digital Mammography, we guarantee zero wait times and same-day reporting.
              </p>
            </div>
          </div>

          {/* Quick Contact Ribbon */}
          <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Building2 size={20} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Headquarters Hub</div>
                <div className="text-sm font-black text-slate-800">Sector 15, Hiranandani Crystal Plaza, Kharghar, Navi Mumbai 410210</div>
              </div>
            </div>

            <a
              href="tel:+918879327184"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
            >
              <PhoneCall size={14} />
              Call Toll-Free: 088793 27184
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
