import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { services } from '@/config/services';
import { REGION_LOCATIONS, REGION_NAMES } from '@/config/locations';
import { SERVICE_CATEGORIES } from '@/config/categories';
import { GMC_PRODUCTS } from '@/config/gmc-products';
import { Map, FileText, Stethoscope, MapPin, ShoppingBag, Scale, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sitemap — All Pages | Henotic Diagnostics',
  description: 'Browse the complete sitemap of Henotic Diagnostics — 37,000+ pages covering diagnostic services across Mumbai, Navi Mumbai, Thane, and Pune.',
  alternates: { canonical: 'https://www.henoticdiagnostics.com/sitemap' },
};

const formatSlug = (slug: string) => {
  const acronyms = ["mri", "ct", "pet", "nt", "usg", "ecg", "cbc", "lft", "kft", "hba1c", "dexa", "bmd", "tmt", "bpp", "fnac", "dtpa", "mag3", "gfr", "hrct", "mrcp", "pns", "nipt", "nips", "nippt", "dna", "ngs", "rna", "fapi", "dota", "dopa", "psma", "als", "bls", "icu", "dvt", "hsg", "ssg", "bpp"];
  return slug.split('-').map(w => {
    const lower = w.toLowerCase();
    if (acronyms.includes(lower)) return lower.toUpperCase();
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
};

// Category emoji icons for visual distinction in the sitemap
const CATEGORY_ICONS: Record<string, string> = {
  "diagnostic-services": "🔍",
  "health-checkups": "❤️",
  "pathology": "🧪",
  "ultrasound": "📡",
  "pregnancy": "🤰",
  "doppler": "🩺",
  "breast-imaging": "🎀",
  "womens-fertility": "👩",
  "mri": "🧲",
  "ct-scan": "🔬",
  "pet-ct": "☢️",
  "bone-health": "🦴",
  "cardiology": "❤️‍🔥",
  "liver": "🫁",
  "genetics": "🧬",
  "genomic-sequencing": "🧬",
  "microbiome": "🦠",
  "urology": "🏥",
  "ambulance": "🚑",
};

// Build grouped map from the authoritative categories config
const SITEMAP_CATEGORIES: Record<string, string[]> = {};
SERVICE_CATEGORIES.forEach(cat => {
  const icon = CATEGORY_ICONS[cat.id] || "📋";
  SITEMAP_CATEGORIES[`${icon} ${cat.title}`] = cat.services;
});

export default function HTMLSitemap() {
  const regions = Object.entries(REGION_LOCATIONS);
  const totalLocations = regions.reduce((sum, [, locs]) => sum + locs.length, 0);
  const totalPages = services.length + (services.length * totalLocations) + (services.length * regions.length);

  return (
    <main className="min-h-screen bg-slate-50 mt-[80px] pb-24">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-black uppercase tracking-widest mb-6">
            <Map size={14} /> Site Navigation
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Sitemap
          </h1>
          <p className="text-blue-200/80 text-lg font-medium max-w-2xl mx-auto">
            Browse all {totalPages.toLocaleString('en-IN')}+ pages across {services.length} diagnostic services, {regions.length} regions, and {totalLocations} locations.
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <a href="/sitemap.xml" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-all">
              <FileText size={16} /> XML Sitemap Index
            </a>
            <a href="/robots.txt" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-all">
              <FileText size={16} /> Robots.txt
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

        {/* Core Pages */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center"><BookOpen size={20} className="text-blue-600" /></div>
            Core Pages
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { name: 'Home', href: '/' },
              { name: 'About Us', href: '/about-us' },
              { name: 'Contact', href: '/contact' },
              { name: 'Services Directory', href: '/services' },
              { name: 'Doctors', href: '/doctors' },
              { name: 'Conditions', href: '/conditions' },
              { name: 'Blog', href: '/blog' },
              { name: 'Privacy Policy', href: '/privacy' },
              { name: 'Terms & Conditions', href: '/terms' },
              { name: 'Cancellation Policy', href: '/cancellation-policy' },
              { name: 'Refund Policy', href: '/refund-policy' },
              { name: 'Medical Disclaimer', href: '/medical-disclaimer' },
            ].map(page => (
              <Link key={page.href} href={page.href} className="px-4 py-3 rounded-xl bg-white border border-slate-100 shadow-sm text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:shadow-md transition-all">
                {page.name}
              </Link>
            ))}
          </div>
        </section>

        {/* GMC Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center"><ShoppingBag size={20} className="text-emerald-600" /></div>
            Diagnostic Products ({GMC_PRODUCTS.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {GMC_PRODUCTS.map(product => (
              <Link key={product.slug} href={`/gmc/${product.slug}`} className="px-4 py-3 rounded-xl bg-white border border-slate-100 shadow-sm text-sm font-semibold text-slate-700 hover:border-emerald-300 hover:text-emerald-600 hover:shadow-md transition-all">
                {product.title}
              </Link>
            ))}
          </div>
        </section>

        {/* Services by Category */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center"><Stethoscope size={20} className="text-purple-600" /></div>
            All Services ({services.length})
          </h2>
          {Object.entries(SITEMAP_CATEGORIES).map(([category, slugs]) => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-bold text-slate-800 mb-3 pb-2 border-b border-slate-200">{category} ({slugs.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {slugs.map(slug => (
                  <Link key={slug} href={`/services/${slug}`} className="px-3 py-2 rounded-lg bg-white border border-slate-100 text-xs font-semibold text-slate-600 hover:border-purple-300 hover:text-purple-600 transition-all truncate" title={formatSlug(slug)}>
                    {formatSlug(slug)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Regions & Locations */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center"><MapPin size={20} className="text-orange-600" /></div>
            Regions & Locations ({totalLocations} cities)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map(([region, locations]) => (
              <div key={region} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100 text-sm uppercase tracking-wider">
                  {REGION_NAMES[region] || formatSlug(region)} ({locations.length})
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {locations.map(loc => (
                    <span key={loc} className="px-2.5 py-1 rounded-md bg-slate-50 text-xs font-medium text-slate-600 border border-slate-100">
                      {formatSlug(loc)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* XML Sitemaps Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center"><FileText size={20} className="text-slate-600" /></div>
            XML Sitemaps (for Search Engines)
          </h2>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <p className="text-sm text-slate-500 font-medium mb-4">
              These machine-readable XML sitemaps are used by Google, Bing, and other search engines to discover all pages on this website.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="px-3 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-all text-center flex flex-col items-center justify-center gap-0.5">
                <span>📋 Master Index</span>
                <span className="text-[10px] text-blue-500 font-normal">5 Sitemaps</span>
              </a>
              {[
                { id: 1, urls: "10,000 URLs" },
                { id: 2, urls: "10,000 URLs" },
                { id: 3, urls: "10,000 URLs" },
                { id: 4, urls: "10,000 URLs" },
                { id: 5, urls: "5,084 URLs" },
              ].map(segment => (
                <a
                  key={segment.id}
                  href={`/sitemaps/sitemap-${segment.id}.xml`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:bg-white hover:shadow-sm transition-all text-center flex flex-col items-center justify-center gap-0.5"
                >
                  <span>Segment {segment.id}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{segment.urls}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
