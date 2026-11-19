import { Activity, Calendar, CheckCircle2, ChevronRight, Clock, Home, Phone, Sparkles } from 'lucide-react';
import type { NiptPanel } from '@/config/nipt-test';
import { NIPT_PHONE_HREF, formatNiptINR } from '@/config/nipt-test';
import CurvedMedicalLines from './CurvedMedicalLines';

interface NiptPanelCardProps {
  panel: NiptPanel;
  locationName?: string;
  onOpenDrawer: (panel: NiptPanel) => void;
  onOpenBooking: (panel: NiptPanel) => void;
}

/**
 * Normalizes every NIPT panel card to exactly 4 concise single-line highlights
 * so all rate cards maintain uniform heights and mobile proportions matching
 * Health Checkup PackageCard while full parameters remain in the drawer & comparison table.
 */
function getCardHighlights(panel: NiptPanel): string[] {
  const formatted = panel.parameters.map((row) =>
    row.detail ? `${row.param} — ${row.detail}` : row.param,
  );
  if (formatted.length <= 3) {
    return [...formatted, `${panel.sampleType} • ${panel.gestation}`].slice(0, 4);
  }
  if (formatted.length === 4) {
    return formatted;
  }
  const remaining = formatted.length - 3;
  return [
    ...formatted.slice(0, 3),
    `+ ${remaining} more markers (${panel.totalTestsCount})`,
  ];
}

/** Premium 3D Pop-Out / Color-Arch NIPT Panel Rate Card matched to Health Checkup & Home Page proportions. */
export default function NiptPanelCard({
  panel,
  locationName,
  onOpenDrawer,
  onOpenBooking,
}: NiptPanelCardProps) {
  const highlights = getCardHighlights(panel);
  const viewAllLabel =
    panel.id === 'nipt-basic'
      ? 'View All 3 Tests'
      : panel.id === 'nipt-comprehensive'
      ? 'View All 9 Categories'
      : 'View All 8+ Syndromes';

  return (
    <article
      id={`panel-${panel.id}`}
      aria-labelledby={`panel-title-${panel.id}`}
      className={`silver-shiny-card group relative flex flex-col rounded-[2rem] bg-white ${
        panel.archTheme.cardRing ?? ''
      } transition-all duration-300 hover:-translate-y-1.5 overflow-hidden scroll-mt-28 w-full`}
    >
      {/* Top-Left Obsidian Badge */}
      <div className="absolute top-3 left-4 z-20">
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900 text-white shadow-sm tracking-wider uppercase">
          <Sparkles className="w-3 h-3 text-amber-400" aria-hidden="true" />
          <span>{panel.topPillLabel}</span>
        </span>
      </div>

      {/* Top-Right Discount Pill */}
      <div className="absolute top-3 right-4 z-20">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-black tracking-wide bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md">
          {panel.discountBadge}
        </span>
      </div>

      {/* TOP SECTION: Pastel Arched Backdrop with Curved Medical Wave Lines & 3D Pop-Out Cutout */}
      <div
        className={`relative pt-4 pb-0 px-4 flex justify-center items-end min-h-[230px] sm:min-h-[265px] overflow-visible ${panel.archTheme.cardHeaderTint}`}
      >
        {/* 3D Pastel Colored Arch */}
        <div
          className={`absolute bottom-0 w-[88%] sm:w-[84%] h-[185px] sm:h-[215px] rounded-t-[90px] sm:rounded-t-[115px] ${panel.archTheme.archBg} border-t-2 border-x ${panel.archTheme.accentBorder} shadow-inner transition-transform duration-300 group-hover:scale-[1.02] overflow-hidden`}
        >
          <CurvedMedicalLines strokeColor={panel.archTheme.lineColor} />
        </div>

        {/* Ambient Radial Glow behind the Arch */}
        <div
          className={`absolute bottom-6 w-44 h-44 rounded-full ${panel.archTheme.glow} blur-2xl opacity-60 pointer-events-none`}
          aria-hidden="true"
        />

        {/* 3D "Pop-Out" Photographic Cutout Image */}
        <div className="relative z-10 w-full flex justify-center items-end -mt-10 group-hover:-translate-y-2 transition-transform duration-300 ease-out">
          <img
            src={panel.imageUrl}
            alt={panel.imageAlt}
            width={panel.imageWidth}
            height={panel.imageHeight}
            loading="eager"
            decoding="async"
            className="h-[215px] sm:h-[250px] max-h-[215px] sm:max-h-[250px] w-auto object-contain object-bottom drop-shadow-[0_18px_20px_rgba(0,0,0,0.22)] select-none pointer-events-none"
          />
        </div>

        {/* Floating Price Pill (Home Page Style) */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl shadow-lg border border-slate-200/90 text-right">
          <div className="text-[10px] sm:text-xs text-slate-400 line-through font-bold">
            MRP ₹{formatNiptINR(panel.mrp)}
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            ₹{formatNiptINR(panel.offerPrice)}
          </div>
        </div>

        {/* Bottom smooth gradient transition */}
        <div
          className={`absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t ${panel.archTheme.gradientBelowImage} pointer-events-none z-10`}
          aria-hidden="true"
        />
      </div>

      {/* BOTTOM SECTION: White Card Body (Exact PackageCard Proportions) */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 bg-white rounded-b-[2rem] border-t border-slate-100">
        {/* Tinted Tags & Single-Line Count Pill */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex flex-wrap gap-1">
            {panel.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${
                  panel.archTheme.tagStyle ?? 'bg-slate-100 text-slate-700'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-white font-extrabold text-xs shadow-sm shrink-0">
            <Activity className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span>
              {panel.testsCountNumber} {panel.testsCountUnit}
            </span>
          </div>
        </div>

        {/* Headline & 1-Line Clamped Subtitle */}
        <h3
          id={`panel-title-${panel.id}`}
          className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight group-hover:text-purple-900 transition-colors duration-200 leading-snug"
        >
          {panel.badgeNumber}. {panel.title}
        </h3>
        <p className="text-xs sm:text-[13px] text-slate-500 font-medium line-clamp-1 mt-0.5 mb-3">
          {panel.subtitle}
        </p>

        {/* Uniform 4-Item Clinical Highlights */}
        <ul className="space-y-1.5 mb-4">
          {highlights.map((item, hIdx) => (
            <li key={hIdx} className="flex items-center gap-2 text-xs text-slate-700 min-w-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
              <span className="font-medium truncate">{item}</span>
            </li>
          ))}
        </ul>

        {/* Fast Notes Pill Row */}
        <div className="grid grid-cols-2 gap-1.5 py-2 px-2.5 sm:py-2.5 sm:px-3 bg-slate-50 rounded-xl text-[11px] font-semibold text-slate-600 mb-4 border border-slate-100">
          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{panel.tat}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Home className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{locationName ? `${locationName} Pickup` : '24/7 Home Pickup'}</span>
          </div>
        </div>

        {/* Pricing Block + Drawer Link + Side-by-Side 2-Col CTAs */}
        <div className="pt-2 border-t border-slate-100 mt-auto">
          <div className="flex items-baseline justify-between mb-3 gap-2">
            <div>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium block">
                Special Package Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-slate-950">
                  ₹{formatNiptINR(panel.offerPrice)}
                </span>
                <span className="text-xs line-through text-slate-400 font-semibold">
                  <span className="sr-only">Original price </span>MRP ₹{formatNiptINR(panel.mrp)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenDrawer(panel)}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 inline-flex items-center gap-0.5 underline-offset-2 hover:underline transition-colors text-right shrink-0"
            >
              <span>{viewAllLabel}</span>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={NIPT_PHONE_HREF}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-800 text-xs font-bold transition-all shadow-sm min-h-[44px]"
            >
              <Phone className="w-3.5 h-3.5 text-purple-600 shrink-0" aria-hidden="true" />
              <span>Call Lab</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenBooking(panel)}
              className={`nipt-btn-gloss inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r ${panel.archTheme.ctaGradient} active:scale-[0.98] text-white text-xs font-bold transition-all shadow-md min-h-[44px]`}
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300 shrink-0" aria-hidden="true" />
              <span>Book Slot</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
