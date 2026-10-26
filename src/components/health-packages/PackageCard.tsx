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
      className="group relative flex flex-col rounded-3xl bg-white/90 backdrop-blur-md border border-white/70 shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_55px_rgba(0,0,0,0.13)] transition-all duration-300 overflow-visible"
    >
      {/* Popular ribbon */}
      {pkg.popular && (
        <div className="absolute top-3 left-4 z-20">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-900 text-white shadow-sm tracking-wider uppercase">
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
      <div className="relative pt-4 pb-0 px-4 flex justify-center items-end min-h-[265px] overflow-visible">
        {/* The Pastel Arch Shape */}
        <div 
          className={`absolute bottom-0 w-[84%] h-[215px] rounded-t-[115px] ${pkg.archTheme.archBg} border-t-2 ${pkg.archTheme.accentBorder} shadow-inner transition-transform duration-300 group-hover:scale-[1.02] overflow-hidden`}
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
            className="max-h-[250px] w-auto object-contain drop-shadow-[0_18px_20px_rgba(0,0,0,0.22)] select-none pointer-events-none"
            loading={idx < 3 ? "eager" : "lazy"}
            decoding="async"
          />
        </div>

        {/* Bottom smooth gradient transition */}
        <div className={`absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t ${pkg.archTheme.gradientBottom} pointer-events-none`} />
      </div>

      {/* BOTTOM SECTION: White Card Body */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 bg-white rounded-b-3xl border-t border-gray-100">
        {/* Target Audience Badges & Total Tests Count */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex flex-wrap gap-1">
            {pkg.target.map((t, tIdx) => (
              <span
                key={tIdx}
                className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-700"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-900 text-white font-extrabold text-xs shadow-sm">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>{pkg.totalTests} Tests</span>
          </div>
        </div>

        {/* Headlines & Subtitles */}
        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight group-hover:text-purple-900 transition-colors duration-200">
          {pkg.title}
        </h3>
        <p className="text-xs sm:text-[13px] text-gray-500 font-medium line-clamp-1 mt-0.5 mb-3">
          {pkg.subtitle}
        </p>

        {/* Quick Highlights */}
        <div className="space-y-1.5 mb-4">
          {pkg.highlights.map((highlight, hIdx) => (
            <div key={hIdx} className="flex items-center gap-2 text-xs text-gray-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span className="font-medium">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Fast Notes Pill Row */}
        <div className="grid grid-cols-2 gap-1.5 py-2.5 px-3 bg-gray-50 rounded-xl text-[11px] font-semibold text-gray-600 mb-4 border border-gray-100">
          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3 h-3 text-purple-600 flex-shrink-0" />
            <span className="truncate">8–12 Hrs Fasting</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Home className="w-3 h-3 text-emerald-600 flex-shrink-0" />
            <span className="truncate">{locationName ? `${locationName} Pickup` : '24/7 Home Pickup'}</span>
          </div>
        </div>

        {/* Pricing Block with Corrected Exchanged Rates */}
        <div className="pt-2 border-t border-gray-100 mt-auto">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs text-gray-400 font-medium block">Special Package Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-950">
                  ₹{pkg.offerPrice}
                </span>
                <span className="text-xs line-through text-gray-400 font-semibold">
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

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:8879327184"
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 active:scale-[0.98] text-gray-800 text-xs font-bold transition-all shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-purple-600" />
              <span>Call Lab</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenBooking(pkg)}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gray-900 hover:bg-black active:scale-[0.98] text-white text-xs font-bold transition-all shadow-md shadow-gray-900/10"
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
