'use client';

import { Check, CircleAlert, X } from 'lucide-react';
import type { HealthPackage } from '@/config/health-checkup';
import { LAB_PHONE_DISPLAY, LAB_PHONE_TEL, formatINR } from '@/config/health-checkup';
import { useModalA11y } from './useModalA11y';

interface PackageDrawerProps {
  pkg: HealthPackage | null;
  onClose: () => void;
  onBook: (pkg: HealthPackage) => void;
}

/** Slide-over drawer listing every test in a package, grouped by profile. */
export default function PackageDrawer({ pkg, onClose, onBook }: PackageDrawerProps) {
  const ref = useModalA11y<HTMLDivElement>(Boolean(pkg), onClose);
  if (!pkg) return null;

  const titleId = `drawer-title-${pkg.code.toLowerCase()}`;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end" onClick={onClose}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col hc-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`p-5 sm:p-6 ${pkg.archTheme.archBg} border-b border-gray-200 relative`}>
          <button
            type="button"
            onClick={onClose}
            data-autofocus
            className="absolute top-5 right-5 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-sm transition-all"
            aria-label="Close test details"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-black text-white">{pkg.code}</span>
            <span className="text-xs font-semibold text-gray-600">Total {pkg.totalTests} Tests Included</span>
          </div>
          <h2 id={titleId} className="text-2xl font-black text-gray-900 uppercase pr-10">{pkg.title}</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">{pkg.subtitle}</p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-white/60">
            <div>
              <span className="text-[11px] text-gray-500 font-semibold block">Exclusive Offer</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-gray-900">₹{formatINR(pkg.offerPrice)}</span>
                <span className="text-xs text-gray-400 line-through">MRP ₹{formatINR(pkg.mrp)}</span>
                {pkg.discount && <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{pkg.discount}</span>}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBook(pkg);
              }}
              className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-sm transition"
            >
              Book This Package
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl">
            <h3 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1">
              <CircleAlert className="w-4 h-4 text-amber-700" aria-hidden="true" />
              Pre-Test Guidelines
            </h3>
            <ul className="text-xs text-amber-800 space-y-1 pl-5 list-disc">
              {pkg.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black tracking-wider uppercase text-gray-500 mb-3">
              Comprehensive Test Breakdown ({pkg.categories.length} Profiles)
            </h3>
            <div className="space-y-3">
              {pkg.categories.map((cat) => (
                <div key={cat.name} className="border border-gray-100 rounded-2xl p-4 bg-gray-50/70 hover:bg-white transition-all">
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-600" aria-hidden="true" />
                      {cat.name}
                    </h4>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100 whitespace-nowrap">
                      {cat.count} {cat.count === 1 ? 'Test' : 'Tests'}
                    </span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                    {cat.tests.map((testItem) => (
                      <li key={testItem} className="flex items-start gap-1.5 text-xs text-gray-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>{testItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-between gap-3">
          <a href={LAB_PHONE_TEL} className="flex-1 py-3 px-4 rounded-xl border border-gray-300 font-bold text-xs text-gray-800 text-center hover:bg-gray-50 transition">
            📞 Call {LAB_PHONE_DISPLAY}
          </a>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBook(pkg);
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
