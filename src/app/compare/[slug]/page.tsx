import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Scale,
  Stethoscope,
  ShieldCheck,
  ArrowLeftRight,
  ChevronRight,
  MessageCircleQuestion,
  Sparkles,
} from 'lucide-react';
import {
  COMPARISONS,
  getComparisonBySlug,
  getRelatedComparisons,
} from '@/config/comparisons';

const formatText = (t: string) =>
  t
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

// ─── Static Params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return { title: 'Comparison Not Found' };

  return {
    title: `${comparison.serviceA.name} vs ${comparison.serviceB.name} — Detailed Comparison`,
    description: comparison.metaDescription,
    alternates: {
      canonical: `https://www.henoticdiagnostics.com/compare/${comparison.slug}`,
    },
    openGraph: {
      title: comparison.title,
      description: comparison.metaDescription,
      url: `https://www.henoticdiagnostics.com/compare/${comparison.slug}`,
      type: 'article',
      siteName: 'Henotic Diagnostics',
    },
  };
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);

  if (!comparison) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-[80px]">
        <p className="text-slate-500 text-lg font-semibold">
          Comparison not found.
        </p>
      </div>
    );
  }

  const related = getRelatedComparisons(slug);

  // ─── Structured Data ─────────────────────────────────────────────────────────
  const breadcrumbSchema = {
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
        name: 'Compare Tests',
        item: 'https://www.henoticdiagnostics.com/compare',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${comparison.serviceA.name} vs ${comparison.serviceB.name}`,
        item: `https://www.henoticdiagnostics.com/compare/${comparison.slug}`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: comparison.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen font-sans mt-[80px]">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-[#1e1b4b] py-20 md:py-28 px-4 md:px-8">
        {/* Decorative orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#4568dc] rounded-full mix-blend-screen filter blur-[160px] opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#E55D87] rounded-full mix-blend-screen filter blur-[140px] opacity-15" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-sm text-blue-200/70 mb-8"
          >
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Home
            </Link>
            <ChevronRight size={14} className="opacity-50" />
            <Link
              href="/compare"
              className="hover:text-white transition-colors"
            >
              Compare Tests
            </Link>
            <ChevronRight size={14} className="opacity-50" />
            <span className="text-white/90 font-semibold">
              {comparison.serviceA.name} vs {comparison.serviceB.name}
            </span>
          </nav>

          {/* VS Badge */}
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-8">
            <span className="px-5 py-2.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-white font-black text-lg md:text-xl tracking-tight">
              {comparison.serviceA.name}
            </span>
            <div className="relative">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#E55D87] to-[#5FC3E4] flex items-center justify-center shadow-2xl shadow-pink-500/30">
                <span className="text-white font-black text-lg md:text-xl">
                  VS
                </span>
              </div>
            </div>
            <span className="px-5 py-2.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-white font-black text-lg md:text-xl tracking-tight">
              {comparison.serviceB.name}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            {comparison.serviceA.name}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">
              vs
            </span>{' '}
            {comparison.serviceB.name}
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 font-medium max-w-3xl mx-auto leading-relaxed">
            Which diagnostic test should you choose? A comprehensive, doctor-reviewed comparison.
          </p>
        </div>
      </section>

      {/* ═══════════════ OVERVIEW ═══════════════ */}
      <section className="py-14 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100/80">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                <Scale size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Overview
              </h2>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              {comparison.overview}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ COMPARISON TABLE ═══════════════ */}
      <section className="py-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-purple-50 p-3 rounded-2xl text-purple-600">
              <ArrowLeftRight size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Side-by-Side Comparison
            </h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100/80 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900">
              <div className="p-5 text-sm font-bold text-blue-200/70 uppercase tracking-widest">
                Criteria
              </div>
              <div className="p-5 text-center">
                <span className="text-white font-black text-base">
                  {comparison.serviceA.name}
                </span>
              </div>
              <div className="p-5 text-center">
                <span className="text-white font-black text-base">
                  {comparison.serviceB.name}
                </span>
              </div>
            </div>

            {/* Table Rows */}
            {comparison.criteria.map((criterion, idx) => (
              <div
                key={criterion.label}
                className={`grid grid-cols-3 ${
                  idx % 2 === 0
                    ? 'bg-white'
                    : 'bg-slate-50/80'
                } ${
                  idx < comparison.criteria.length - 1
                    ? 'border-b border-slate-100'
                    : ''
                } hover:bg-blue-50/50 transition-colors`}
              >
                <div className="p-5 flex items-center">
                  <span className="font-bold text-slate-900 text-sm">
                    {criterion.label}
                  </span>
                </div>
                <div className="p-5 text-center border-l border-slate-100">
                  <span className="text-slate-600 text-sm font-medium leading-relaxed">
                    {criterion.serviceA}
                  </span>
                </div>
                <div className="p-5 text-center border-l border-slate-100">
                  <span className="text-slate-600 text-sm font-medium leading-relaxed">
                    {criterion.serviceB}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {comparison.criteria.map((criterion) => (
              <div
                key={criterion.label}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg shadow-slate-200/30 border border-slate-100/80"
              >
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                  {criterion.label}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50/60 rounded-xl p-3">
                    <p className="text-xs font-bold text-blue-600 mb-1">
                      {comparison.serviceA.name}
                    </p>
                    <p className="text-slate-700 text-sm font-medium">
                      {criterion.serviceA}
                    </p>
                  </div>
                  <div className="bg-purple-50/60 rounded-xl p-3">
                    <p className="text-xs font-bold text-purple-600 mb-1">
                      {comparison.serviceB.name}
                    </p>
                    <p className="text-slate-700 text-sm font-medium">
                      {criterion.serviceB}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHEN TO CHOOSE ═══════════════ */}
      <section className="py-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* When to Choose A */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100/80">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <CheckCircle2 size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                When to Choose {comparison.serviceA.name}
              </h3>
            </div>
            <ul className="space-y-4">
              {comparison.whenToChooseA.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <CheckCircle2
                      size={12}
                      className="text-blue-600"
                    />
                  </div>
                  <span className="text-slate-600 font-medium text-[15px] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href={`/services/${comparison.serviceA.slug}`}
              className="inline-flex items-center gap-2 mt-6 text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors group"
            >
              Learn more about {comparison.serviceA.name}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* When to Choose B */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100/80">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <CheckCircle2 size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                When to Choose {comparison.serviceB.name}
              </h3>
            </div>
            <ul className="space-y-4">
              {comparison.whenToChooseB.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <CheckCircle2
                      size={12}
                      className="text-purple-600"
                    />
                  </div>
                  <span className="text-slate-600 font-medium text-[15px] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href={`/services/${comparison.serviceB.slug}`}
              className="inline-flex items-center gap-2 mt-6 text-purple-600 font-bold text-sm hover:text-purple-800 transition-colors group"
            >
              Learn more about {comparison.serviceB.name}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ EXPERT VERDICT ═══════════════ */}
      <section className="py-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-[#1e1b4b] rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#E55D87] rounded-full mix-blend-screen filter blur-[100px] opacity-15" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
                  <ShieldCheck size={24} className="text-blue-300" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Expert Verdict
                </h2>
              </div>
              <p className="text-blue-100 text-lg leading-relaxed font-medium max-w-4xl">
                {comparison.verdict}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQs ═══════════════ */}
      <section className="py-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-amber-50 p-3 rounded-2xl text-amber-600">
              <MessageCircleQuestion size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {comparison.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg shadow-slate-200/30 border border-slate-100/80"
              >
                <h3 className="text-lg font-black text-slate-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ RELATED COMPARISONS ═══════════════ */}
      {related.length > 0 && (
        <section className="py-10 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-green-50 p-3 rounded-2xl text-green-600">
                <Sparkles size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Related Comparisons
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/compare/${rel.slug}`}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-slate-200/30 border border-slate-100/80 hover:shadow-xl hover:border-blue-200 hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-700 group-hover:text-blue-600 transition-colors">
                        {rel.serviceA.name}
                      </span>
                      <span className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-blue-400 flex items-center justify-center">
                        <span className="text-white text-[10px] font-black">
                          VS
                        </span>
                      </span>
                      <span className="font-bold text-sm text-slate-700 group-hover:text-blue-600 transition-colors">
                        {rel.serviceB.name}
                      </span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0"
                    />
                  </div>
                  <p className="text-slate-500 text-xs font-medium line-clamp-2">
                    {rel.metaDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-[#4568dc] to-[#b06ab3] rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white rounded-full mix-blend-soft-light filter blur-[100px] opacity-20" />
            <div className="relative z-10">
              <div className="bg-white/15 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
                <Stethoscope size={28} className="text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                Not Sure Which Test You Need?
              </h2>
              <p className="text-white/80 font-medium text-lg mb-8 max-w-2xl mx-auto">
                Our experienced radiologists and doctors can recommend the right diagnostic test based on your symptoms and clinical history.
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
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </main>
  );
}
