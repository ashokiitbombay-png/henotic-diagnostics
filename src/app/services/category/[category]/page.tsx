import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronDown, HelpCircle } from 'lucide-react';
import { SERVICE_CATEGORIES, getCategoryById } from '@/config/categories';
import { getHeroImageForService } from '@/config/services';
import { buildCategoryFAQs, truncateMeta } from '@/lib/seo/aeo-helpers';
import { getCanonicalServiceSlug, isRedirectedServiceSlug } from '@/lib/seo/indexing-policy';

const formatText = (t: string) => t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryById(category);
  const rawTitle = cat?.title || formatText(category);
  const pageTitle = truncateMeta(`${rawTitle} Services | Henotic Diagnostics`, 60);
  const description = truncateMeta(
    cat?.description || `Browse NABL-accredited ${rawTitle} diagnostic tests and imaging at Henotic Diagnostics with same-day digital reports.`,
    155
  );
  const heroImage = cat?.services?.[0]
    ? getHeroImageForService(cat.services[0])
    : 'https://cdn.henoticdiagnostics.com/Hero%20Image/medical-imaging-diagnostics-henotic-diagnostics-hero-image.webp';

  return {
    title: pageTitle,
    description,
    alternates: { canonical: `https://www.henoticdiagnostics.com/services/category/${category}` },
    openGraph: {
      title: pageTitle,
      description,
      url: `https://www.henoticdiagnostics.com/services/category/${category}`,
      type: 'website',
      images: [{
        url: heroImage,
        width: 1200,
        height: 630,
        alt: `${rawTitle} Services — Henotic Diagnostics`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [heroImage],
    },
  };
}

export async function generateStaticParams() {
  return SERVICE_CATEGORIES.map(cat => ({ category: cat.id }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategoryById(category);
  if (!cat) notFound();

  const heroImage = cat.services?.[0]
    ? getHeroImageForService(cat.services[0])
    : 'https://cdn.henoticdiagnostics.com/Hero%20Image/medical-imaging-diagnostics-henotic-diagnostics-hero-image.webp';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.henoticdiagnostics.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.henoticdiagnostics.com/services' },
      { '@type': 'ListItem', position: 3, name: cat.title, item: `https://www.henoticdiagnostics.com/services/category/${category}` }
    ]
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `https://www.henoticdiagnostics.com/services/category/${category}`,
    name: `${cat.title} Services | Henotic Diagnostics`,
    description: cat.description,
    url: `https://www.henoticdiagnostics.com/services/category/${category}`,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: heroImage,
      contentUrl: heroImage,
      caption: `${cat.title} Services at Henotic Diagnostics`,
      width: 1200,
      height: 630
    },
    image: [heroImage],
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '#quick-answer'],
    },
    publisher: {
      '@id': 'https://www.henoticdiagnostics.com/#organization',
    },
  };

  const categoryFaqs = buildCategoryFAQs(cat);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: categoryFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans mt-[80px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-950 to-[#1e1b4b] py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b06ab3] rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block py-1.5 px-5 rounded-full bg-white/10 text-blue-200 border border-white/20 font-extrabold text-xs tracking-widest uppercase mb-6 backdrop-blur-md">
            Service Category
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            {cat.title}
          </h1>
          <p id="quick-answer" className="text-lg text-blue-100 font-medium max-w-2xl mx-auto">{cat.description}</p>
          <p className="text-sm text-blue-300 font-bold mt-4">{cat.services.length} Services Available</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.services
              .filter((slug) => !isRedirectedServiceSlug(slug))
              .map((slug) => {
                const canonical = getCanonicalServiceSlug(slug);
                return (
                  <Link
                    key={slug}
                    href={`/services/${canonical}`}
                    className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 group flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{formatText(slug)}</h3>
                      <p className="text-sm text-slate-500 mt-1">View test details & pricing →</p>
                    </div>
                    <ArrowRight size={18} className="text-slate-400 group-hover:text-blue-500 shrink-0 transition-colors" />
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* Category FAQs (Synced with FAQPage JSON-LD) */}
      <section className="pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-widest mb-3">
              <HelpCircle size={14} /> Category FAQs
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              Frequently Asked Questions — {cat.title}
            </h2>
          </div>
          <div className="space-y-3">
            {categoryFaqs.map((faq, idx) => (
              <details
                key={idx}
                open={idx === 0}
                className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer font-bold text-slate-800 list-none select-none">
                  <span>{faq.question}</span>
                  <ChevronDown size={18} className="shrink-0 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
