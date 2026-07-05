import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight, ChevronRight, Building2, Stethoscope } from 'lucide-react';
import { CITIES, SERVICE_ICONS } from '@/config/cities';
import { REGION_LOCATIONS } from '@/config/locations';

export const metadata: Metadata = {
  title: 'Diagnostic Centers by City | Mumbai, Navi Mumbai, Thane, Pune | Henotic Diagnostics',
  description: 'Find Henotic Diagnostics centers near you. Advanced MRI, CT, PET-CT, Ultrasound, Pathology across Mumbai, Navi Mumbai, Thane, Pune & Panvel. NABL accredited.',
  alternates: {
    canonical: 'https://www.henoticdiagnostics.com/city'
  },
  openGraph: {
    title: 'Diagnostic Centers by City | Henotic Diagnostics',
    description: 'Browse diagnostic centers across major cities. NABL accredited, 340+ tests, same-day reports.',
    type: 'website',
  }
};

const formatText = (t: string) => t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

// City-specific gradient themes for visual distinction
const CITY_GRADIENTS: Record<string, string> = {
  'mumbai':      'from-blue-600 via-blue-700 to-indigo-800',
  'navi-mumbai': 'from-cyan-600 via-blue-600 to-blue-800',
  'thane':       'from-violet-600 via-purple-700 to-indigo-800',
  'pune':        'from-emerald-600 via-teal-700 to-cyan-800',
  'panvel':      'from-rose-600 via-pink-700 to-purple-800',
};

export default function CitiesListingPage() {
  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.henoticdiagnostics.com' },
      { '@type': 'ListItem', position: 2, name: 'Cities', item: 'https://www.henoticdiagnostics.com/city' }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px] overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-blue-950 via-[#1e1b4b] to-blue-900 py-20 md:py-28 px-4 md:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#b06ab3] rounded-full mix-blend-screen filter blur-[140px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-15" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-blue-300 mb-8 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} className="text-blue-500" />
            <span className="text-white font-bold">Cities</span>
          </nav>

          <span className="inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-white/10 text-blue-200 border border-white/20 font-extrabold text-xs tracking-widest uppercase mb-6 backdrop-blur-md">
            <Building2 size={14} />
            Service Locations
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 tracking-tight">
            Diagnostic Centers{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              by City
            </span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 font-medium max-w-3xl leading-relaxed">
            Find NABL accredited diagnostic services near you. Advanced MRI, CT, PET-CT, Ultrasound & Pathology across major cities in Maharashtra.
          </p>
        </div>
      </section>

      {/* ── City Cards ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CITIES.map(city => {
              // Count total locations in this city
              const locCount = city.regions.reduce((sum, r) => sum + (REGION_LOCATIONS[r]?.length || 0), 0);
              const gradient = CITY_GRADIENTS[city.slug] || 'from-blue-600 to-blue-800';

              return (
                <Link
                  key={city.slug}
                  href={`/city/${city.slug}`}
                  className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-br ${gradient} p-8 pb-12 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/10 rounded-full filter blur-[60px]" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-3xl font-black text-white">{city.name}</h2>
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-colors">
                          <ArrowRight size={18} className="text-white group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-white/80 text-sm font-bold">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {locCount} Areas
                        </span>
                        <span className="flex items-center gap-1">
                          <Stethoscope size={14} />
                          340+ Tests
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 -mt-4 relative z-10 bg-white rounded-t-2xl">
                    <p className="text-sm text-slate-600 font-medium leading-relaxed mb-5 line-clamp-2">
                      {city.description}
                    </p>

                    {/* Popular Services Pills */}
                    <div className="flex flex-wrap gap-2">
                      {city.popularServices.slice(0, 5).map(slug => (
                        <span
                          key={slug}
                          className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full"
                        >
                          <span>{SERVICE_ICONS[slug] || '🏥'}</span>
                          {formatText(slug)}
                        </span>
                      ))}
                      {city.popularServices.length > 5 && (
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                          +{city.popularServices.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Can&apos;t Find Your City?
          </h2>
          <p className="text-lg text-slate-600 font-medium mb-10">
            We&apos;re rapidly expanding across Maharashtra. Contact us for diagnostic services in your area — home collection available everywhere.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact#booking"
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 px-8 rounded-2xl shadow-lg transition-all text-lg"
            >
              Book Appointment
            </Link>
            <a
              href="tel:08879327184"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold py-4 px-8 rounded-2xl shadow-sm border border-slate-200 transition-all text-lg flex items-center justify-center gap-2"
            >
              Call Support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
