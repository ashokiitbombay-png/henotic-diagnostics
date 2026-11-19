import { Baby, Calendar, CheckCircle2, Clock, Home, Microscope, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import type { NiptLocationContext, NiptPageContent, NiptPanel, NiptTrustContent } from '@/config/nipt-test';
import {
  GOOGLE_G_BADGE,
  NIPT_EXACT_SPECTRUM_CSS,
  NIPT_PHONE_DISPLAY,
  NIPT_PHONE_HREF,
  formatNiptINR,
} from '@/config/nipt-test';
import CurvedMedicalLines from './CurvedMedicalLines';

interface NiptHeroCardProps {
  page: NiptPageContent;
  panels: NiptPanel[];
  trust: NiptTrustContent;
  locationContext?: NiptLocationContext;
  onOpenBooking: (panel?: NiptPanel) => void;
}

const CLINICAL_HIGHLIGHTS = [
  {
    label: 'Safe & Non-Invasive',
    sub: 'Maternal Blood Draw',
    icon: ShieldCheck,
    cardClass: 'bg-gradient-to-br from-emerald-50/80 to-white border-emerald-200/75',
    iconClass: 'w-7 h-7 rounded-lg bg-emerald-100/90 text-emerald-700 flex items-center justify-center',
  },
  {
    label: 'Early Screening',
    sub: 'From 10 Weeks Onwards',
    icon: Baby,
    cardClass: 'bg-gradient-to-br from-pink-50/80 to-white border-pink-200/75',
    iconClass: 'w-7 h-7 rounded-lg bg-pink-100/90 text-pink-700 flex items-center justify-center',
  },
  {
    label: 'No Fasting Needed',
    sub: 'Eat & Drink Normally',
    icon: CheckCircle2,
    cardClass: 'bg-gradient-to-br from-purple-50/80 to-white border-purple-200/75',
    iconClass: 'w-7 h-7 rounded-lg bg-purple-100/90 text-purple-700 flex items-center justify-center',
  },
  {
    label: '7–10 Days TAT',
    sub: 'MD Genetics Verified',
    icon: Clock,
    cardClass: 'bg-gradient-to-br from-indigo-50/80 to-white border-indigo-200/75',
    iconClass: 'w-7 h-7 rounded-lg bg-indigo-100/90 text-indigo-700 flex items-center justify-center',
  },
] as const;

/**
 * Conversion & AEO Quick-Answer Card directly below ServiceHero.
 * Note: Uses <h2> for the card heading because ServiceHero already renders the page's single <h1>.
 */
export default function NiptHeroCard({
  page,
  panels,
  trust,
  locationContext,
  onOpenBooking,
}: NiptHeroCardProps) {
  const defaultPanel = panels.find((p) => p.popular) ?? panels[0];
  const startingPanel = panels.reduce<NiptPanel | undefined>(
    (lowest, panel) => (!lowest || panel.offerPrice < lowest.offerPrice ? panel : lowest),
    panels[0],
  );
  const locationLabel = locationContext?.locationName && locationContext?.regionName
    ? `${locationContext.locationName}, ${locationContext.regionName}${locationContext.pincode ? ` (PIN ${locationContext.pincode})` : ''}`
    : locationContext?.regionName
    ? locationContext.regionName
    : 'Navi Mumbai & Mumbai';

  const turnaroundCopy = locationContext?.homeCollectionTurnaround
    ? `Home Pickup in ${locationContext.homeCollectionTurnaround}`
    : '24/7 Home Blood Collection Across Navi Mumbai & Mumbai';

  return (
    <section
      aria-labelledby="nipt-hero-card-heading"
      className="relative rounded-[2rem] sm:rounded-[2.25rem] bg-white/90 backdrop-blur-xl border border-white/95 ring-1 ring-purple-200/70 shadow-[0_26px_70px_-16px_rgba(88,28,135,0.16)] overflow-hidden p-4 sm:p-8 lg:p-11"
    >
      <div
        className="absolute top-0 inset-x-0 h-1.5 pointer-events-none"
        style={{ background: NIPT_EXACT_SPECTRUM_CSS }}
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-violet-300/30 via-fuchsia-300/25 to-pink-200/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-pink-300/25 via-purple-200/20 to-emerald-200/25 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <div className="lg:col-span-7 space-y-5 text-left min-w-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-[11px] font-extrabold uppercase tracking-wider text-purple-900">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" aria-hidden="true" />
            <span>{page.eyebrow}</span>
          </div>

          <h2
            id="nipt-hero-card-heading"
            className="text-[24px] sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-[1.18]"
          >
            {page.keyword}:{' '}
            <span className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-rose-600 bg-clip-text text-transparent">
              Non-Invasive Prenatal Testing
            </span>{' '}
            <span className="block sm:inline text-xl sm:text-3xl lg:text-4xl text-slate-800">
              | Cost &amp; Accuracy in {locationLabel}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
            {page.intro}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {CLINICAL_HIGHLIGHTS.map((badge, idx) => {
              const IconComp = badge.icon;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border shadow-sm flex flex-col gap-1.5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 ${badge.cardClass}`}
                >
                  <div className={badge.iconClass}>
                    <IconComp className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 leading-tight">{badge.label}</span>
                  <span className="text-[11px] text-slate-600 font-medium">{badge.sub}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <a
              href={NIPT_PHONE_HREF}
              className="nipt-btn-gloss inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-800 text-white font-extrabold text-sm sm:text-base shadow-[0_14px_30px_-6px_rgba(109,40,217,0.48),inset_0_1px_1px_rgba(255,255,255,0.32)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
            >
              <Phone className="w-4 h-4 text-emerald-300 animate-pulse" aria-hidden="true" />
              <span>Call Us: {NIPT_PHONE_DISPLAY}</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenBooking(defaultPanel)}
              className="nipt-btn-gloss inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950 hover:from-black hover:to-purple-900 text-white font-extrabold text-sm sm:text-base shadow-[0_14px_30px_-6px_rgba(15,23,42,0.40),inset_0_1px_1px_rgba(255,255,255,0.22)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
            >
              <Calendar className="w-4 h-4 text-pink-400" aria-hidden="true" />
              <span>Book Appointment</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-semibold text-slate-600">
            <div className="inline-flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/70">
              <img src={GOOGLE_G_BADGE} alt="Google Reviews Verified" width={16} height={16} className="w-4 h-4 object-contain" />
              <span className="font-extrabold text-slate-900">{trust.googleRating.rating} / 5</span>
              <span className="text-amber-500" aria-hidden="true">★★★★★</span>
              <span>({trust.googleRating.reviewCount.toLocaleString('en-IN')}+ Reviews)</span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50/80 px-3 py-1.5 rounded-xl border border-emerald-200/70">
              <Home className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              <span>{turnaroundCopy}</span>
            </div>
          </div>
        </div>

        {/* Google SERP Primary 3D Color-Arch Pop-Out Image Card */}
        <div className="lg:col-span-5 min-w-0">
          <figure className="silver-shiny-card group/hero relative mx-auto w-full max-w-md lg:max-w-none rounded-[2rem] bg-white ring-1 ring-pink-200/90 hover:ring-pink-300 shadow-[0_24px_60px_-14px_rgba(219,39,119,0.22),0_10px_24px_-8px_rgba(124,58,237,0.14)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden">
            {/* Top 3D Visual Pop-Out Stage */}
            <div className="relative pt-4 px-4 pb-0 bg-gradient-to-b from-pink-100/75 via-rose-50/45 to-white overflow-visible">
              {/* Top Floating Pills Row */}
              <div className="relative z-30 flex items-center justify-between gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-[0_6px_16px_rgba(15,23,42,0.28)] ring-1 ring-white/15">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>cfDNA NIPT</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wide shadow-[0_6px_16px_-4px_rgba(5,150,105,0.48)] ring-1 ring-white/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-100 shrink-0" aria-hidden="true" />
                  <span>Zero Fetal Risk</span>
                </span>
              </div>

              {/* True 3D Color-Arch Image Pop-Out Stage */}
              <div className="relative pt-5 sm:pt-6 flex justify-center items-end min-h-[250px] sm:min-h-[305px] lg:min-h-[330px] overflow-visible">
                {/* Ambient 3D Color Glow Orb */}
                <div
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 w-56 sm:w-64 h-56 sm:h-64 rounded-full bg-gradient-to-tr from-pink-500/45 via-rose-400/45 to-fuchsia-400/40 blur-3xl opacity-75 group-hover/hero:opacity-100 group-hover/hero:scale-110 transition-all duration-500 pointer-events-none"
                  aria-hidden="true"
                />

                {/* 3D Luminous Rose-Pink Dome Arch */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[88%] sm:w-[86%] h-[195px] sm:h-[235px] lg:h-[255px] rounded-t-[95px] sm:rounded-t-[120px] bg-gradient-to-b from-[#f9a8d4] via-[#fbcfe8] to-[#fdf2f8] border-t-2 border-x-2 border-pink-400/85 shadow-[inset_0_14px_32px_rgba(255,255,255,0.72),0_14px_32px_-8px_rgba(219,39,119,0.20)] overflow-hidden transition-transform duration-500 ease-out group-hover/hero:scale-[1.03]">
                  <CurvedMedicalLines strokeColor="#db2777" />
                </div>

                {/* 3D Breakout Cutout Hero Image */}
                <div className="relative z-10 w-full flex justify-center items-end -mt-6 transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/hero:-translate-y-3 group-hover/hero:scale-[1.05]">
                  <img
                    src={page.primaryImage.url}
                    alt={page.primaryImage.alt}
                    title={`${page.keyword} – Safe Maternal Blood cfDNA Screening`}
                    width={page.primaryImage.width}
                    height={page.primaryImage.height}
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                    className="h-[242px] sm:h-[294px] lg:h-[322px] w-auto object-contain object-bottom drop-shadow-[0_20px_24px_rgba(88,28,135,0.26)] group-hover/hero:drop-shadow-[0_28px_32px_rgba(88,28,135,0.34)] select-none pointer-events-none"
                  />
                </div>

                {/* Bottom Smooth Mist Transition */}
                <div
                  className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-white via-pink-100/75 to-transparent pointer-events-none z-20"
                  aria-hidden="true"
                />

                {/* Floating 3D Glass Starting-Price Pill */}
                {startingPanel && (
                  <div className="absolute bottom-3.5 left-1.5 sm:left-2.5 z-30 bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2 shadow-[0_14px_30px_-4px_rgba(15,23,42,0.20),0_4px_10px_rgba(219,39,119,0.10)] border border-white ring-1 ring-pink-200/80 text-left min-w-[112px] transition-transform duration-300 group-hover/hero:-translate-y-1">
                    <span className="block text-[9px] sm:text-[10px] font-extrabold text-pink-600 uppercase tracking-wider">
                      Starts From
                    </span>
                    <span className="block text-lg sm:text-xl font-black text-slate-950 tracking-tight leading-tight">
                      ₹{formatNiptINR(startingPanel.offerPrice)}
                    </span>
                    <span className="block text-[10px] font-bold text-slate-400 line-through">
                      MRP ₹{formatNiptINR(startingPanel.mrp)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Sleek Lower Card Footer */}
            <div className="relative z-20 bg-white px-4 pt-3.5 pb-4 border-t border-pink-100/80 space-y-2.5">
              <div className="rounded-2xl bg-gradient-to-r from-purple-50/90 via-pink-50/60 to-white border border-purple-200/70 p-3 flex items-center gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white flex items-center justify-center shrink-0 shadow-[0_6px_14px_rgba(124,58,237,0.32)]">
                  <Microscope className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-[13px] font-black text-slate-950 leading-snug">
                    Next-Gen cfDNA Sequencing
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-600 font-semibold leading-snug">
                    High-Sensitivity Trisomy 21, 18 &amp; 13 Screening
                  </p>
                </div>
              </div>

              <figcaption className="text-center text-[11px] font-medium text-slate-500 leading-relaxed px-1">
                {page.primaryImage.caption}
              </figcaption>
            </div>
          </figure>
        </div>
      </div>

      {/* AEO / GEO / LLMO Quick Clinical Summary Box */}
      <div className="relative z-10 mt-8 pt-6 border-t border-purple-100/90">
        <div
          id="quick-answer"
          className="rounded-2xl bg-gradient-to-r from-purple-50/90 via-white to-pink-50/75 border border-purple-200/70 ring-1 ring-white shadow-[0_10px_28px_-10px_rgba(124,58,237,0.14)] p-4 sm:p-5 flex flex-col md:flex-row md:items-center gap-4"
        >
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-700 via-purple-800 to-slate-950 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-amber-300" aria-hidden="true" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-700 block">
                Clinical Quick Summary
              </span>
              <span className="text-sm font-black text-slate-900">At-a-Glance NIPT Facts</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed flex-1">{page.quickAnswer}</p>
        </div>
      </div>
    </section>
  );
}
