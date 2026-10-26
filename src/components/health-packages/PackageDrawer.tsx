import React from 'react';
import { X, AlertCircle, Check } from 'lucide-react';
import type { HealthPackage } from '@/config/health-packages';

interface PackageDrawerProps {
  pkg: HealthPackage | null;
  onClose: () => void;
  onOpenBooking: (pkg: HealthPackage) => void;
}

export default function PackageDrawer({ pkg, onClose, onOpenBooking }: PackageDrawerProps) {
  if (!pkg) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end transition-opacity"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className={`p-5 sm:p-6 ${pkg.archTheme.archBg} border-b border-gray-200 relative`}>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-sm transition-all"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-black text-white">
              {pkg.code}
            </span>
            <span className="text-xs font-semibold text-gray-600">
              Total {pkg.totalTests} Tests Included
            </span>
          </div>

          <h3 className="text-2xl font-black text-gray-900 uppercase">
            {pkg.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            {pkg.subtitle}
          </p>

          {/* Price summary pill */}
          <div className="mt-4 flex items-center justify-between bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-white/60">
            <div>
              <span className="text-[11px] text-gray-500 font-semibold block">Exclusive Offer</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-gray-900">₹{pkg.offerPrice}</span>
                <span className="text-xs text-gray-400 line-through">MRP ₹{pkg.mrp}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {pkg.discount}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBooking(pkg);
              }}
              className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-sm transition"
            >
              Book This Package
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Important Instructions Banner */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl">
            <h5 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              Pre-Test Guidelines
            </h5>
            <ul className="text-xs text-amber-800 space-y-1 pl-5 list-disc">
              {pkg.notes.map((note, nIdx) => (
                <li key={nIdx}>{note}</li>
              ))}
            </ul>
          </div>

          {/* Categorised Test Breakdowns */}
          <div>
            <h4 className="text-xs font-black tracking-wider uppercase text-gray-400 mb-3">
              Comprehensive Test Breakdown ({pkg.categories.length} Profiles)
            </h4>

            <div className="space-y-3">
              {pkg.categories.map((cat, cIdx) => (
                <div 
                  key={cIdx} 
                  className="border border-gray-100 rounded-2xl p-4 bg-gray-50/70 hover:bg-white transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-600" />
                      {cat.name}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                      {cat.count} {cat.count === 1 ? 'Test' : 'Tests'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                    {cat.tests.map((testItem, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-1.5 text-xs text-gray-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="font-normal">{testItem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-between gap-3">
          <a
            href="tel:8879327184"
            className="flex-1 py-3 px-4 rounded-xl border border-gray-300 font-bold text-xs text-gray-800 text-center hover:bg-gray-50 transition"
          >
            📞 Call 8879327184
          </a>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenBooking(pkg);
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs text-center shadow-md transition"
          >
            Schedule Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
