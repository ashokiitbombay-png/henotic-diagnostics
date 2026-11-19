'use client';

import { Calendar, Phone, X } from 'lucide-react';
import type { NiptPanel } from '@/config/nipt-test';
import { NIPT_PHONE_DISPLAY, NIPT_PHONE_HREF, formatNiptINR } from '@/config/nipt-test';
import { useModalA11y } from '@/components/health-checkup/useModalA11y';

interface NiptPanelDrawerProps {
  panel: NiptPanel | null;
  onClose: () => void;
  onBook: (panel: NiptPanel) => void;
}

/** Accessible slide-over drawer displaying complete NIPT panel parameters & eligibility. */
export default function NiptPanelDrawer({ panel, onClose, onBook }: NiptPanelDrawerProps) {
  const ref = useModalA11y<HTMLDivElement>(Boolean(panel), onClose);
  if (!panel) return null;

  const titleId = `nipt-drawer-title-${panel.id}`;

  return (
    <div
      className="fixed inset-0 z-[60] flex justify-end bg-slate-950/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-hidden hc-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 bg-slate-950 text-white flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-300">
              Panel {panel.badgeNumber} • {panel.tat}
            </span>
            <h3 id={titleId} className="text-xl font-black mt-0.5">{panel.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-autofocus
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Close panel details"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          <div className="rounded-2xl bg-gradient-to-r from-purple-50 to-emerald-50 border border-purple-200/80 p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="text-2xl font-black text-slate-950">₹{formatNiptINR(panel.offerPrice)}</span>
              <span className="text-xs sm:text-sm font-bold text-slate-400 line-through">
                MRP ₹{formatNiptINR(panel.mrp)}
              </span>
            </div>
            <span className="bg-emerald-100 text-emerald-900 border border-emerald-200 px-3 py-1 rounded-full text-xs font-extrabold">
              Save ₹{formatNiptINR(panel.savings)}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{panel.subtitle}</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-100">
              <span className="text-[10px] font-bold uppercase text-purple-700 block">Gestational Age</span>
              <span className="text-xs font-black text-slate-900">{panel.gestation}</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <span className="text-[10px] font-bold uppercase text-emerald-700 block">Sample Required</span>
              <span className="text-xs font-black text-slate-900">{panel.sampleType}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-12 bg-slate-900 text-white text-xs font-extrabold px-4 py-3">
              <div className="col-span-6">{panel.colHeaders[0]}</div>
              <div className="col-span-6">{panel.colHeaders[1]}</div>
            </div>
            <div className="divide-y divide-slate-200">
              {panel.parameters.map((p, idx) => (
                <div key={idx} className="grid grid-cols-12 px-4 py-3 text-xs">
                  <div className="col-span-6 font-bold text-slate-900 pr-2">{p.param}</div>
                  <div className="col-span-6 text-slate-600">{p.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 leading-relaxed">
            <strong>Clinical Guidance:</strong> Carry your latest pregnancy ultrasound scan and doctor prescription. Fasting is not required.
          </div>
        </div>

        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={NIPT_PHONE_HREF}
            className="inline-flex items-center justify-center gap-1.5 min-h-[46px] py-3 px-4 rounded-xl border-2 border-slate-900 bg-white text-slate-950 text-xs sm:text-sm font-extrabold"
          >
            <Phone className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>Call Now: {NIPT_PHONE_DISPLAY}</span>
          </a>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBook(panel);
            }}
            className="inline-flex items-center justify-center gap-1.5 min-h-[46px] py-3 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs sm:text-sm font-extrabold shadow-md"
          >
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span>Appointment</span>
          </button>
        </div>
      </div>
    </div>
  );
}
