import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, ArrowLeftRight, ChevronRight } from 'lucide-react';
import { COMPARISONS } from '@/config/comparisons';

export const metadata: Metadata = {
  title: 'Compare Diagnostic Tests — MRI vs CT, PET-CT vs CT & More',
  description:
    'Side-by-side comparison of diagnostic imaging tests. Compare MRI vs CT scan, PET-CT vs CT, ultrasound vs CT, 2D Echo vs ECG & more. Expert-reviewed, medically accurate.',
  alternates: {
    canonical: 'https://www.henoticdiagnostics.com/compare',
  },
  openGraph: {
    title: 'Compare Diagnostic Tests | Henotic Diagnostics',
    description:
      'Expert-reviewed comparisons of popular diagnostic tests. Find the right imaging modality for your needs.',
    url: 'https://www.henoticdiagnostics.com/compare',
    type: 'website',
    siteName: 'Henotic Diagnostics',
  },
};

// Group comparisons by imaging category for better UX
const CATEGORIES = [
  {
    name: 'Cross-Sectional Imaging',
    description: 'MRI, CT Scan & PET-CT comparisons',
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-600',
    slugs: [
      'mri-vs-ct-scan',
      'pet-ct-vs-ct-scan',
      'ct-scan-vs-x-ray',
      'mri-vs-pet-ct',
      'hrct-vs-ct-scan',
      'mri-brain-vs-ct-brain',
    ],
  },
  {
    name: 'Ultrasound & Doppler',
    description: 'Sonography & vascular imaging comparisons',
    color: 'from-purple-500 to-pink-600',
    bgLight: 'bg-purple-50',
    textColor: 'text-purple-600',
    slugs: [
      'ultrasound-vs-ct-scan',
      'color-doppler-vs-ultrasound',
      'mammography-vs-breast-ultrasound',
    ],
  },
  {
    name: 'Cardiac & Specialized',
    description: 'Heart, bone & liver test comparisons',
    color: 'from-pink-500 to-rose-600',
    bgLight: 'bg-pink-50',
    textColor: 'text-pink-600',
    slugs: ['2d-echo-vs-ecg', 'dexa-scan-vs-x-ray', 'fibroscan-vs-liver-biopsy'],
  },
];

export default function ComparisonsListingPage() {
  return (
    <main className="min-h-screen font-sans mt-[80px]">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-[#1e1b4b] py-20 md:py-28 px-4 md:px-8">
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E55D87] rounded-full mix-blend-screen filter blur-[120px] opacity-15" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#4568dc] rounded-full mix-blend-screen filter blur-[140px] opacity-15" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-sm text-blue-200/70 mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="opacity-50" />
            <span className="text-white/90 font-semibold">
              Compare Tests
            </span>
          </nav>

          <span className="inline-block py-1.5 px-5 rounded-full bg-white/10 text-blue-200 border border-white/20 font-extrabold text-xs tracking-widest uppercase mb-6 backdrop-blur-md">
            Diagnostic Test Comparisons
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 tracking-tight">
            Compare{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
              Diagnostic Tests
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 font-medium max-w-2xl mx-auto leading-relaxed">
            Expert-reviewed, side-by-side comparisons of{' '}
            {COMPARISONS.length} popular diagnostic imaging tests. Find the
            right test for your needs.
          </p>
        </div>
      </section>

      {/* ═══════════════ COMPARISONS GRID BY CATEGORY ═══════════════ */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-14">
          {CATEGORIES.map((category) => {
            const categoryComparisons = category.slugs
              .map((slug) =>
                COMPARISONS.find((c) => c.slug === slug)
              )
              .filter(
                (c): c is (typeof COMPARISONS)[number] =>
                  c !== undefined
              );

            if (categoryComparisons.length === 0) return null;

            return (
              <div key={category.name}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`${category.bgLight} p-2.5 rounded-xl ${category.textColor}`}
                  >
                    <ArrowLeftRight size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900">
                      {category.name}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                      {category.description}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full ml-auto">
                    {categoryComparisons.length}
                  </span>
                </div>

                {/* Comparison Cards Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {categoryComparisons.map((comparison) => (
                    <Link
                      key={comparison.slug}
                      href={`/compare/${comparison.slug}`}
                      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100/80 shadow-lg shadow-slate-200/30 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all overflow-hidden"
                    >
                      {/* Card Top Accent */}
                      <div
                        className={`h-1 bg-gradient-to-r ${category.color}`}
                      />

                      <div className="p-6">
                        {/* VS Badge Row */}
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <span className="font-black text-slate-800 text-sm text-right flex-1 group-hover:text-blue-600 transition-colors">
                            {comparison.serviceA.name}
                          </span>
                          <div className="relative shrink-0">
                            <div
                              className={`w-10 h-10 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                            >
                              <span className="text-white text-[10px] font-black tracking-tight">
                                VS
                              </span>
                            </div>
                          </div>
                          <span className="font-black text-slate-800 text-sm text-left flex-1 group-hover:text-blue-600 transition-colors">
                            {comparison.serviceB.name}
                          </span>
                        </div>

                        {/* Meta Description Preview */}
                        <p className="text-slate-500 text-xs font-medium line-clamp-2 mb-4 text-center">
                          {comparison.metaDescription}
                        </p>

                        {/* Quick Stats */}
                        <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-100">
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                            <ArrowLeftRight size={12} />
                            <span>
                              {comparison.criteria.length} criteria
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            Compare now
                            <ArrowRight
                              size={12}
                              className="group-hover:translate-x-0.5 transition-transform"
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════ BOTTOM CTA ═══════════════ */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#4568dc] to-[#b06ab3] rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white rounded-full mix-blend-soft-light filter blur-[100px] opacity-20" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                Need Help Choosing the Right Test?
              </h2>
              <p className="text-white/80 font-medium text-lg mb-8 max-w-2xl mx-auto">
                Our radiologists and doctors can guide you to the most
                appropriate diagnostic test based on your symptoms and medical
                history.
              </p>
              <Link
                href="/contact#booking"
                className="inline-flex items-center gap-3 bg-white text-blue-700 font-black px-10 py-4 rounded-2xl shadow-xl shadow-black/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all text-lg"
              >
                Book a Consultation
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STRUCTURED DATA ═══════════════ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.henoticdiagnostics.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Compare Diagnostic Tests',
                item: 'https://www.henoticdiagnostics.com/compare',
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Compare Diagnostic Tests',
            description:
              'Side-by-side comparison of diagnostic imaging tests including MRI, CT Scan, PET-CT, Ultrasound, and more.',
            url: 'https://www.henoticdiagnostics.com/compare',
            publisher: {
              '@type': 'Organization',
              name: 'Henotic Diagnostics',
              url: 'https://www.henoticdiagnostics.com',
            },
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: COMPARISONS.length,
              itemListElement: COMPARISONS.map((c, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                name: `${c.serviceA.name} vs ${c.serviceB.name}`,
                url: `https://www.henoticdiagnostics.com/compare/${c.slug}`,
              })),
            },
          }),
        }}
      />
    </main>
  );
}
