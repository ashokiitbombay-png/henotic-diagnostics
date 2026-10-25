import Link from 'next/link';
import { ChevronRight, House, Phone, MessageCircle, ShieldCheck, Star, Clock, FlaskConical, Sparkles } from 'lucide-react';
import type { HealthCheckupPageContent, HealthCheckupTrustContent } from '@/config/health-checkup';
import { LAB_PHONE_DISPLAY, LAB_PHONE_TEL, LAB_WHATSAPP_NUMBER, formatINR } from '@/config/health-checkup';
import { cdnSrcSet } from './image-utils';

interface HealthCheckupHeroProps {
  page: HealthCheckupPageContent;
  trust: HealthCheckupTrustContent;
  packageCount: number;
  minPrice: number;
}

/**
 * Above-the-fold hero for health checkup authority pages.
 *
 * SEO / thumbnail signals:
 *  - Single visible H1 matching the primary keyword.
 *  - Visible breadcrumb (BreadcrumbList JSON-LD is emitted once by HealthCheckupSchema).
 *  - Primary image rendered as a real, visible <img> near the top with a
 *    descriptive alt + <figcaption>, explicit dimensions (no CLS), eager
 *    loading and fetchpriority=high (LCP), canonical CDN URL in `src`.
 *  - `#quick-answer` block: concise 40–60 word answer for AEO / snippets
 *    (referenced by the speakable selector in the schema).
 */
export default function HealthCheckupHero({ page, trust, packageCount, minPrice }: HealthCheckupHeroProps) {
  const { primaryImage } = page;
  const waText = encodeURIComponent(`Hi Henotic Diagnostics, I would like to book a ${page.keyword}. Please share available slots.`);

  return (
    <section aria-labelledby="hc-h1" className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-10 sm:pb-14">
        {/* Visible breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-xs sm:text-sm font-semibold text-gray-600">
            <li className="flex items-center">
              <Link href="/" className="inline-flex items-center gap-1 hover:text-purple-700">
                <House className="w-3.5 h-3.5" aria-hidden="true" />
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 mx-1 text-gray-400" aria-hidden="true" />
            </li>
            <li className="flex items-center">
              <Link href="/services" className="hover:text-purple-700">Services</Link>
              <ChevronRight className="w-3.5 h-3.5 mx-1 text-gray-400" aria-hidden="true" />
            </li>
            <li className="flex items-center">
              <Link href="/services/health-checkup" className="hover:text-purple-700">Health Checkups</Link>
              {page.slug !== 'health-checkup' && <ChevronRight className="w-3.5 h-3.5 mx-1 text-gray-400" aria-hidden="true" />}
            </li>
            {page.slug !== 'health-checkup' && (
              <li aria-current="page" className="text-gray-900">{page.keyword}</li>
            )}
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Copy column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-200 shadow-sm text-xs font-semibold text-purple-900 mb-4 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" aria-hidden="true" />
              <span>{page.eyebrow}</span>
            </div>

            <h1 id="hc-h1" className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight leading-[1.1]">
              {page.h1}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl">{page.intro}</p>

            {/* AEO quick answer */}
            <div id="quick-answer" className="mt-5 rounded-2xl border border-purple-200 bg-white/85 backdrop-blur-md p-4 sm:p-5 shadow-sm max-w-2xl">
              <p className="text-[11px] font-black uppercase tracking-wider text-purple-700 mb-1.5">Quick answer: {page.keyword}</p>
              <p className="text-sm sm:text-[15px] text-gray-800 leading-relaxed">{page.quickAnswer}</p>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gray-900 hover:bg-black text-white text-sm font-bold shadow-md transition-all active:scale-[0.98]"
              >
                View {packageCount} Packages from ₹{formatINR(minPrice)}
              </a>
              <a
                href={LAB_PHONE_TEL}
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 text-sm font-bold shadow-sm transition-all"
              >
                <Phone className="w-4 h-4 text-purple-600" aria-hidden="true" />
                Call {LAB_PHONE_DISPLAY}
              </a>
              <a
                href={`https://wa.me/${LAB_WHATSAPP_NUMBER}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>

            {/* Trust stats */}
            <ul className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl" aria-label="Key facts">
              <li className="rounded-xl bg-white/80 border border-white/70 p-3 shadow-sm">
                <span className="flex items-center gap-1 text-sm font-black text-gray-900">
                  {trust.googleRating.rating}
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                </span>
                <span className="block text-[11px] font-semibold text-gray-500">{formatINR(trust.googleRating.reviewCount)} Google reviews</span>
              </li>
              <li className="rounded-xl bg-white/80 border border-white/70 p-3 shadow-sm">
                <span className="flex items-center gap-1 text-sm font-black text-gray-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" /> NABL • ISO
                </span>
                <span className="block text-[11px] font-semibold text-gray-500">Quality-assured lab</span>
              </li>
              <li className="rounded-xl bg-white/80 border border-white/70 p-3 shadow-sm">
                <span className="flex items-center gap-1 text-sm font-black text-gray-900">
                  <Clock className="w-3.5 h-3.5 text-purple-600" aria-hidden="true" /> 8–12 hrs
                </span>
                <span className="block text-[11px] font-semibold text-gray-500">Typical report time</span>
              </li>
              <li className="rounded-xl bg-white/80 border border-white/70 p-3 shadow-sm">
                <span className="flex items-center gap-1 text-sm font-black text-gray-900">
                  <FlaskConical className="w-3.5 h-3.5 text-pink-600" aria-hidden="true" /> 24/7
                </span>
                <span className="block text-[11px] font-semibold text-gray-500">Free home collection</span>
              </li>
            </ul>
          </div>

          {/* Primary image column — the page's representative image */}
          <figure className="lg:col-span-5 relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#EDE9FE] via-[#FCE7F3] to-[#E0E7FF] border border-white shadow-[0_24px_55px_rgba(108,108,246,0.18)]">
              <img
                src={primaryImage.url}
                srcSet={cdnSrcSet(primaryImage.url, primaryImage.width)}
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
                alt={primaryImage.alt}
                width={primaryImage.width}
                height={primaryImage.height}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto object-contain"
              />
            </div>
            <figcaption className="mt-3 text-center text-xs sm:text-sm font-medium text-gray-600">{primaryImage.caption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
