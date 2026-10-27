import React from 'react';
import { 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Home, 
  ChevronRight, 
  Sparkles, 
  Activity 
} from 'lucide-react';
import type { HealthPackage } from '@/config/health-packages';
import CurvedMedicalLines from './CurvedMedicalLines';

interface PackageCardProps {
  pkg: HealthPackage;
  idx: number;
  onOpenDrawer: (pkg: HealthPackage) => void;
  onOpenBooking: (pkg: HealthPackage) => void;
  locationName?: string;
}

export default function PackageCard({
  pkg,
  idx,
  onOpenDrawer,
  onOpenBooking,
  locationName,
}: PackageCardProps) {
  return (
    <article
      className="silver-shiny-card group relative flex flex-col rounded-[2rem] bg-white transition-all duration-300 overflow-hidden w-full"
    >
      {/* Popular ribbon */}
      {pkg.popular && (
        <div className="absolute top-3 left-4 z-20">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900 text-white shadow-sm tracking-wider uppercase">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Popular
          </span>
        </div>
      )}

      {/* Discount Tag */}
      <div className="absolute top-3 right-4 z-20">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-black tracking-wide bg-red-600 text-white shadow-md">
          {pkg.discount}
        </span>
      </div>

      {/* TOP SECTION: Pastel Arched Backdrop with Curved Medical Wave Lines & 3D Pop-Out Cutout */}
      <div className="relative pt-4 pb-0 px-4 flex justify-center items-end min-h-[230px] sm:min-h-[265px] overflow-visible">
        {/* The Pastel Arch Shape */}
        <div 
          className={`absolute bottom-0 w-[88%] sm:w-[84%] h-[185px] sm:h-[215px] rounded-t-[90px] sm:rounded-t-[115px] ${pkg.archTheme.archBg} border-t-2 ${pkg.archTheme.accentBorder} shadow-inner transition-transform duration-300 group-hover:scale-[1.02] overflow-hidden`}
        >
          <CurvedMedicalLines strokeColor={pkg.archTheme.lineColor} />
        </div>

        {/* Ambient Radial Glow behind the Arch */}
        <div className={`absolute bottom-6 w-44 h-44 rounded-full ${pkg.archTheme.glow} blur-2xl opacity-60 pointer-events-none`} />

        {/* 3D "Pop-Out" Photographic Cutout Image */}
        <div className="relative z-10 w-full flex justify-center items-end -mt-10 group-hover:-translate-y-2 transition-transform duration-300 ease-out">
          <img
            src={pkg.imageUrl}
            alt={`${pkg.title} - Health Checkup Package${locationName ? ` in ${locationName}` : ''}`}
            className="max-h-[210px] sm:max-h-[250px] w-auto object-contain drop-shadow-[0_18px_20px_rgba(0,0,0,0.22)] select-none pointer-events-none"
            loading={idx < 3 ? "eager" : "lazy"}
            decoding="async"
          />
        </div>

        {/* Floating Price Pill (Home Page Style as seen in screenshot) */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl shadow-lg border border-slate-200/90 text-right">
          <div className="text-[10px] sm:text-xs text-slate-400 line-through font-bold">MRP ₹{pkg.mrp}</div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">₹{pkg.offerPrice}</div>
        </div>

        {/* Bottom smooth gradient transition */}
        <div className={`absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t ${pkg.archTheme.gradientBottom} pointer-events-none`} />
      </div>

      {/* BOTTOM SECTION: White Card Body */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 bg-white rounded-b-[2rem] border-t border-slate-100">
        {/* Target Audience Badges & Total Tests Count */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex flex-wrap gap-1">
            {pkg.target.map((t, tIdx) => (
              <span
                key={tIdx}
                className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-white font-extrabold text-xs shadow-sm">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>{pkg.totalTests} Tests</span>
          </div>
        </div>

        {/* Headlines & Subtitles */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight group-hover:text-purple-900 transition-colors duration-200">
          {pkg.title}
        </h3>
        <p className="text-xs sm:text-[13px] text-slate-500 font-medium line-clamp-1 mt-0.5 mb-3">
          {pkg.subtitle}
        </p>

        {/* Quick Highlights */}
        <div className="space-y-1.5 mb-4">
          {pkg.highlights.map((highlight, hIdx) => (
            <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span className="font-medium">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Fast Notes Pill Row */}
        <div className="grid grid-cols-2 gap-2 py-2 px-2.5 sm:py-2.5 sm:px-3 bg-slate-50 rounded-xl text-[11px] font-semibold text-slate-600 mb-4 border border-slate-100">
          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
            <span className="truncate">8–12 Hrs Fasting</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Home className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="truncate">{locationName ? `${locationName} Pickup` : '24/7 Home Pickup'}</span>
          </div>
        </div>

        {/* Pricing Block with Corrected Exchanged Rates */}
        <div className="pt-2 border-t border-slate-100 mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider block">Special Offer</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-slate-950">
                  ₹{pkg.offerPrice}
                </span>
                <span className="text-xs line-through text-slate-400 font-semibold">
                  MRP ₹{pkg.mrp}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpenDrawer(pkg)}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 inline-flex items-center gap-0.5 underline-offset-2 hover:underline transition-colors"
            >
              View All {pkg.totalTests} Tests
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action Buttons with better mobile view */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href="tel:8879327184"
              className="inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-800 text-xs font-bold transition-all shadow-sm min-h-[44px]"
            >
              <Phone className="w-3.5 h-3.5 text-purple-600" />
              <span>Call Lab</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenBooking(pkg)}
              className="inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-gradient-to-r from-slate-900 to-purple-950 hover:from-black hover:to-purple-900 active:scale-[0.98] text-white text-xs font-bold transition-all shadow-md shadow-purple-950/20 min-h-[44px]"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Book Slot</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
