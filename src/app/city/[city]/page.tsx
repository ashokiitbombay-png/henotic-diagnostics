import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight, Clock, Shield, Stethoscope, Phone, Building2, ChevronRight } from 'lucide-react';
import { CITIES, getCityBySlug, SERVICE_ICONS } from '@/config/cities';
import { REGION_LOCATIONS, REGION_NAMES } from '@/config/locations';
import { services } from '@/config/services';
import { notFound } from 'next/navigation';

export const revalidate = 86400;

const formatText = (t: string) => t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

// ─── Static Params ──────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return CITIES.map(city => ({ city: city.slug }));
}

// ─── Metadata ───────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const title = `Diagnostic Services in ${city.name} | MRI, CT, PET-CT, Pathology | Henotic Diagnostics`;
  const description = `Book ${city.name}'s best diagnostic services — MRI, CT Scan, PET-CT, Ultrasound, Blood Tests & Health Checkups. NABL accredited, same-day reports, 340+ tests available.`;

  return {
    title,
    description,
    keywords: `diagnostic center in ${city.name}, MRI scan in ${city.name}, CT scan ${city.name}, pathology lab ${city.name}, health checkup ${city.name}, blood test ${city.name}`,
    alternates: {
      canonical: `https://www.henoticdiagnostics.com/city/${city.slug}`
    },
    openGraph: {
      title: `Diagnostic Services in ${city.name} | Henotic Diagnostics`,
      description,
      type: 'website',
      url: `https://www.henoticdiagnostics.com/city/${city.slug}`,
    }
  };
}

// ─── Page Component ─────────────────────────────────────────────────────────
export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  // Gather all locations from the city's regions
  const cityLocations: { location: string; region: string }[] = [];
  for (const regionSlug of city.regions) {
    const locs = REGION_LOCATIONS[regionSlug] || [];
    for (const loc of locs) {
      cityLocations.push({ location: loc, region: regionSlug });
    }
  }

  const totalLocations = cityLocations.length;
  const totalServices = services.length;

  // Structured Data: BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.henoticdiagnostics.com' },
      { '@type': 'ListItem', position: 2, name: 'Cities', item: 'https://www.henoticdiagnostics.com/city' },
      { '@type': 'ListItem', position: 3, name: city.name, item: `https://www.henoticdiagnostics.com/city/${city.slug}` }
    ]
  };

  // Structured Data: LocalBusiness
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: `Henotic Diagnostics — ${city.name}`,
    description: city.description,
    url: `https://www.henoticdiagnostics.com/city/${city.slug}`,
    telephone: '+918879327184',
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: 'Maharashtra',
      addressCountry: 'IN'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1240',
      bestRating: '5',
      worstRating: '1'
    },
    medicalSpecialty: 'Diagnostic Imaging',
    priceRange: '₹₹'
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px] overflow-hidden">
      {/* ── Schema Markup ──────────────────────────────────────────────── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* ── Hero Section ───────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-blue-950 via-[#1e1b4b] to-blue-900 py-20 md:py-28 px-4 md:px-8 overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#b06ab3] rounded-full mix-blend-screen filter blur-[140px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-400 rounded-full mix-blend-screen filter blur-[120px] opacity-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-blue-300 mb-8 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} className="text-blue-500" />
            <Link href="/city" className="hover:text-white transition-colors">Cities</Link>
            <ChevronRight size={14} className="text-blue-500" />
            <span className="text-white font-bold">{city.name}</span>
          </nav>

          <span className="inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-white/10 text-blue-200 border border-white/20 font-extrabold text-xs tracking-widest uppercase mb-6 backdrop-blur-md">
            <MapPin size={14} />
            Diagnostic Hub — {city.name}
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 tracking-tight leading-tight max-w-4xl">
            Best Diagnostic Services <br className="hidden md:block" />
            in <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">{city.name}</span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 font-medium max-w-3xl mb-8 leading-relaxed">
            {city.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact#booking"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-950 font-extrabold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg"
            >
              Book Appointment
              <ArrowRight size={18} />
            </Link>
            <a
              href="tel:08879327184"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/25 font-extrabold py-4 px-8 rounded-2xl hover:bg-white/20 transition-all text-lg"
            >
              <Phone size={18} />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${totalServices}+`, label: 'Diagnostic Tests', icon: <Stethoscope size={20} className="text-blue-600" /> },
              { value: `${totalLocations}`, label: 'Areas Served', icon: <MapPin size={20} className="text-blue-600" /> },
              { value: '24/7', label: 'Report Access', icon: <Clock size={20} className="text-blue-600" /> },
              { value: 'NABL', label: 'Accredited', icon: <Shield size={20} className="text-blue-600" /> }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-black text-slate-900">{stat.value}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Services Grid ──────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block py-1.5 px-5 rounded-full bg-blue-100 text-blue-700 font-extrabold text-xs tracking-widest uppercase mb-4">
              Most Booked
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Popular Diagnostic Services in {city.name}
            </h2>
            <p className="text-lg text-slate-600 font-medium mt-4 max-w-2xl mx-auto">
              Book any of our {totalServices}+ tests. Here are the most popular services in {city.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {city.popularServices.map(slug => {
              const icon = SERVICE_ICONS[slug] || '🏥';
              const title = formatText(slug);
              return (
                <Link
                  key={slug}
                  href={`/services/${slug}`}
                  className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex flex-col items-start gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {icon}
                  </div>
                  <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors text-sm leading-tight">
                    {title} in {city.name}
                  </h3>
                  <span className="text-xs font-bold text-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Book Now <ArrowRight size={12} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Areas We Serve ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block py-1.5 px-5 rounded-full bg-emerald-100 text-emerald-700 font-extrabold text-xs tracking-widest uppercase mb-4">
              <MapPin size={12} className="inline mr-1" />
              Coverage Map
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Areas We Serve in {city.name}
            </h2>
            <p className="text-lg text-slate-600 font-medium mt-4 max-w-2xl mx-auto">
              Walk-in diagnostic facilities and home collection services across {totalLocations} locations in {city.name}.
            </p>
          </div>

          <div className="space-y-8">
            {city.regions.map(regionSlug => {
              const regionName = REGION_NAMES[regionSlug] || formatText(regionSlug);
              const locs = REGION_LOCATIONS[regionSlug] || [];
              if (locs.length === 0) return null;

              return (
                <div key={regionSlug} className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                      <Building2 size={18} className="text-white" />
                    </div>
                    <h3 className="text-xl font-black text-slate-800">{regionName}</h3>
                    <span className="text-xs font-bold text-slate-400 bg-slate-200 px-3 py-1 rounded-full">
                      {locs.length} locations
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {locs.map(loc => (
                      <Link
                        key={loc}
                        href={`/services/mri-scan/${regionSlug}/${loc}`}
                        className="group flex items-center gap-2 bg-white hover:bg-blue-50 rounded-xl px-4 py-3 border border-slate-100 hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <MapPin size={14} className="text-blue-500 shrink-0" />
                        <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700 truncate transition-colors">
                          {formatText(loc)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-b from-slate-50 to-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Why Choose Henotic Diagnostics in {city.name}?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🏆',
                title: 'NABL Accredited',
                desc: 'All tests follow strict quality protocols under NABL accreditation guidelines for maximum accuracy.'
              },
              {
                icon: '🖥️',
                title: 'Advanced Equipment',
                desc: '3.0T MRI, 128-Slice CT, PET-CT, and state-of-the-art automated pathology analyzers.'
              },
              {
                icon: '⚡',
                title: 'Same-Day Reports',
                desc: 'Get digital reports within hours. Access them 24/7 through our online portal.'
              },
              {
                icon: '👨‍⚕️',
                title: 'Expert Radiologists',
                desc: 'Scans reviewed by senior radiologists with 10+ years of experience in diagnostic imaging.'
              },
              {
                icon: '🏠',
                title: 'Home Collection',
                desc: `Free home sample collection available across ${city.name}. Book online or via WhatsApp.`
              },
              {
                icon: '💰',
                title: 'Transparent Pricing',
                desc: 'Competitive rates with no hidden charges. Corporate packages and insurance support available.'
              }
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center text-3xl mb-5">
                  {card.icon}
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">{card.title}</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 px-4 md:px-8 bg-gradient-to-br from-blue-950 via-[#1e1b4b] to-blue-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400 rounded-full mix-blend-screen filter blur-[150px] opacity-15" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#b06ab3] rounded-full mix-blend-screen filter blur-[120px] opacity-15" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
            Book Your Diagnostic Test in {city.name}
          </h2>
          <p className="text-lg md:text-xl text-blue-200 font-medium mb-10 max-w-2xl mx-auto">
            {totalServices}+ tests available across {totalLocations} locations. Walk-in or book online for same-day appointments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact#booking"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-950 font-extrabold py-4 px-10 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg"
            >
              Book Appointment
              <ArrowRight size={18} />
            </Link>
            <a
              href="tel:08879327184"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/25 font-extrabold py-4 px-10 rounded-2xl hover:bg-white/20 transition-all text-lg"
            >
              <Phone size={18} />
              08879-327-184
            </a>
          </div>
        </div>
      </section>

      {/* ── All Services in City (SEO link grid) ───────────────────────── */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest mb-6">
            All Diagnostic Services in {city.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs font-semibold text-slate-600">
            {services.slice(0, 60).map(slug => (
              <Link
                key={slug}
                href={`/services/${slug}`}
                className="hover:text-blue-600 transition-colors p-2 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-100 truncate block"
                title={`${formatText(slug)} in ${city.name}`}
              >
                {formatText(slug)}
              </Link>
            ))}
          </div>
          {services.length > 60 && (
            <div className="mt-6 text-center">
              <Link href="/services" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                View all {totalServices}+ services →
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
