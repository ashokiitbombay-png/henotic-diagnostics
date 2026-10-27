import { Activity, Calendar, ChevronRight, CircleCheck, Clock, House, Phone, Sparkles } from 'lucide-react';
import type { HealthPackage } from '@/config/health-checkup';
import { LAB_PHONE_TEL, formatINR } from '@/config/health-checkup';
import CurvedMedicalLines from './CurvedMedicalLines';
import { cdnSrcSet } from './image-utils';

interface PackageCardProps {
  pkg: HealthPackage;
  onViewTests: (pkg: HealthPackage) => void;
  onBook: (pkg: HealthPackage) => void;
}

/**
 * Health checkup rate card with 3D pop-out cut-out over a pastel arch.
 * Rendered inside the client `PackageExplorer`, but fully server-rendered
 * on first load so prices, titles and highlights are crawlable.
 */
export default function PackageCard({ pkg, onViewTests, onBook }: PackageCardProps) {
  const fastingLabel = pkg.fastingRequired ? '8–12 Hrs Fasting' : 'No Fasting Needed';

  return (
    <article
      id={`package-${pkg.code.toLowerCase()}`}
      aria-labelledby={`package-title-${pkg.code.toLowerCase()}`}
      className="silver-shiny-card group relative flex flex-col rounded-[2rem] bg-white transition-all duration-300 overflow-hidden scroll-mt-28 w-full"
    >
      {pkg.popular && (
        <div className="absolute top-3 left-4 z-20">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-900 text-white shadow-sm tracking-wider uppercase">
            <Sparkles className="w-3 h-3 text-amber-400" aria-hidden="true" />
            Popular
          </span>
        </div>
      )}

      {pkg.discount && (
        <div className="absolute top-3 right-4 z-20">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-black tracking-wide bg-red-600 text-white shadow-md">{pkg.discount}</span>
        </div>
      )}

      {/* Pastel arch with medical wave lines + 3D pop-out cut-out */}
      <div className="relative pt-4 pb-0 px-4 flex justify-center items-end min-h-[230px] sm:min-h-[265px] overflow-visible">
        <div
          className={`absolute bottom-0 w-[88%] sm:w-[84%] h-[185px] sm:h-[215px] rounded-t-[90px] sm:rounded-t-[115px] ${pkg.archTheme.archBg} border-t-2 ${pkg.archTheme.accentBorder} shadow-inner transition-transform duration-300 group-hover:scale-[1.02] overflow-hidden`}
        >
          <CurvedMedicalLines strokeColor={pkg.archTheme.lineColor} />
        </div>
        <div className={`absolute bottom-6 w-44 h-44 rounded-full ${pkg.archTheme.glow} blur-2xl opacity-60 pointer-events-none`} aria-hidden="true" />
        <div className="relative z-10 w-full flex justify-center items-end -mt-10 group-hover:-translate-y-2 transition-transform duration-300 ease-out">
          <img
            src={pkg.imageUrl}
            srcSet={cdnSrcSet(pkg.imageUrl, pkg.imageWidth)}
            sizes="(min-width: 1024px) 22rem, (min-width: 768px) 45vw, 90vw"
            alt={`${pkg.title} health checkup package (${pkg.totalTests} tests) at Henotic Diagnostics`}
            width={pkg.imageWidth}
            height={pkg.imageHeight}
            className="max-h-[210px] sm:max-h-[250px] w-auto object-contain drop-shadow-[0_18px_20px_rgba(0,0,0,0.22)] select-none pointer-events-none"
            loading="lazy"
            decoding="async"
          />
        </div>
        {/* Floating Price Pill (Home Page Style) */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl shadow-lg border border-slate-200/90 text-right">
          <div className="text-[10px] sm:text-xs text-slate-400 line-through font-bold">MRP ₹{formatINR(pkg.mrp)}</div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">₹{formatINR(pkg.offerPrice)}</div>
        </div>
        <div className={`absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t ${pkg.archTheme.gradientBottom} pointer-events-none`} aria-hidden="true" />
      </div>

      {/* Card body */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 bg-white rounded-b-3xl border-t border-gray-100">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex flex-wrap gap-1">
            {pkg.target.map((t) => (
              <span key={t} className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-900 text-white font-extrabold text-xs shadow-sm">
            <Activity className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span>{pkg.totalTests} Tests</span>
          </div>
        </div>

        <h3
          id={`package-title-${pkg.code.toLowerCase()}`}
          className="text-xl font-black text-gray-900 uppercase tracking-tight group-hover:text-purple-900 transition-colors duration-200"
        >
          {pkg.title}
        </h3>
        <p className="text-xs sm:text-[13px] text-gray-500 font-medium line-clamp-1 mt-0.5 mb-3">{pkg.subtitle}</p>

        <ul className="space-y-1.5 mb-4">
          {pkg.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-2 text-xs text-gray-700">
              <CircleCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
              <span className="font-medium">{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 gap-1.5 py-2.5 px-3 bg-gray-50 rounded-xl text-[11px] font-semibold text-gray-600 mb-4 border border-gray-100">
          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3 h-3 text-purple-600 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{fastingLabel}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <House className="w-3 h-3 text-emerald-600 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">24/7 Home Pickup</span>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100 mt-auto">
          <div className="flex items-baseline justify-between mb-3 gap-2">
            <div>
              <span className="text-xs text-gray-500 font-medium block">Special Package Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-950">₹{formatINR(pkg.offerPrice)}</span>
                <span className="text-xs line-through text-gray-400 font-semibold">
                  <span className="sr-only">Original price </span>MRP ₹{formatINR(pkg.mrp)}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onViewTests(pkg)}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 inline-flex items-center gap-0.5 underline-offset-2 hover:underline transition-colors text-right"
            >
              View All {pkg.totalTests} Tests
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={LAB_PHONE_TEL}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 active:scale-[0.98] text-gray-800 text-xs font-bold transition-all shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-purple-600" aria-hidden="true" />
              <span>Call Lab</span>
            </a>
            <button
              type="button"
              onClick={() => onBook(pkg)}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gray-900 hover:bg-black active:scale-[0.98] text-white text-xs font-bold transition-all shadow-md shadow-gray-900/10"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span>Book Slot</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
