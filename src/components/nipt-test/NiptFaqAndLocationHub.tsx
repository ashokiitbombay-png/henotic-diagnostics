'use client';

import { useState } from 'react';
import { Building2, Calendar, ChevronDown, Clock, ExternalLink, MapPin, Phone } from 'lucide-react';
import type { NiptFaqItem, NiptLocationContext, NiptPanel } from '@/config/nipt-test';
import { NIPT_GOOGLE_MAPS_URL, NIPT_PHONE_DISPLAY, NIPT_PHONE_HREF } from '@/config/nipt-test';

interface NiptFaqAndLocationHubProps {
  keyword: string;
  faqs: NiptFaqItem[];
  defaultPanel: NiptPanel;
  locationContext?: NiptLocationContext;
  onOpenBooking: (panel?: NiptPanel) => void;
}

/** AEO / GEO / LLMO FAQ Accordion paired with the Local GEO & Clinic Conversion Card. */
export default function NiptFaqAndLocationHub({
  keyword,
  faqs,
  defaultPanel,
  locationContext,
  onOpenBooking,
}: NiptFaqAndLocationHubProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const areaCoverage = locationContext?.locationName && locationContext?.regionName
    ? `${locationContext.locationName}, ${locationContext.regionName}${locationContext.pincode ? ` (PIN ${locationContext.pincode})` : ''}`
    : locationContext?.regionName
    ? `${locationContext.regionName}, Kharghar, Panvel, Navi Mumbai & Mumbai`
    : 'Kharghar, Panvel, Navi Mumbai, Seawoods, Nerul, Vashi, Thane, and Mumbai';

  return (
    <section aria-labelledby="nipt-faq-heading" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* AEO / LLMO FAQ Accordion */}
      <div className="lg:col-span-7 min-w-0 rounded-[2rem] bg-white/90 backdrop-blur-xl border border-white/90 p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Prenatal Genetics Knowledge Base
          </span>
          <h2 id="nipt-faq-heading" className="text-2xl sm:text-3xl font-black text-slate-950 mt-2">
            Frequently Asked Questions About {keyword}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50/80 transition"
                >
                  <span className="text-xs sm:text-sm font-black text-slate-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-purple-700 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Local GEO & Clinic Conversion Card */}
      <div className="lg:col-span-5 min-w-0 rounded-[2rem] bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-emerald-300">
          <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Open 24/7 • Walk-In or Home Collection</span>
        </div>

        <div>
          <h3 className="text-2xl font-black tracking-tight">
            Book Your {keyword} at Henotic Diagnostics
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Serving expectant mothers and obstetric clinics across {areaCoverage} with temperature-monitored cfDNA sample collection.
          </p>
        </div>

        <div className="space-y-3 text-xs sm:text-sm bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-pink-400 shrink-0 mt-1" aria-hidden="true" />
            <div>
              <strong className="text-white block">Diagnostic Center Address:</strong>
              <span className="text-slate-300">
                Second floor, Millennium Empire, Business Park, Plot No 47, D Mart Rd, Sector 15, Kharghar, Panvel, Maharashtra 410210
              </span>
            </div>
          </div>
          {locationContext?.nearestPartnerHub && (
            <div className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-sky-300 shrink-0 mt-1" aria-hidden="true" />
              <div>
                <strong className="text-white block">Local Coordination Hub:</strong>
                <span className="text-slate-300">
                  {locationContext.nearestPartnerHub}
                  {locationContext.homeCollectionTurnaround ? ` • Doorstep pickup in ${locationContext.homeCollectionTurnaround}` : ''}
                </span>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
            <div>
              <strong className="text-white">Direct Helpline: </strong>
              <a href={NIPT_PHONE_HREF} className="text-emerald-300 underline font-bold">
                {NIPT_PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
            <span className="text-slate-300">24 Hours • Monday to Sunday (7–10 Days NIPT TAT)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <a
            href={NIPT_PHONE_HREF}
            className="nipt-btn-gloss inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs sm:text-sm transition-all shadow-[0_10px_24px_-6px_rgba(255,255,255,0.28)] hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <Phone className="w-4 h-4 text-purple-700" aria-hidden="true" />
            <span>Call {NIPT_PHONE_DISPLAY}</span>
          </a>
          <button
            type="button"
            onClick={() => onOpenBooking(defaultPanel)}
            className="nipt-btn-gloss inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-[0_12px_28px_-6px_rgba(16,185,129,0.52),inset_0_1px_1px_rgba(255,255,255,0.35)] hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span>Book Appointment</span>
          </button>
        </div>

        <a
          href={NIPT_GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-slate-200 transition"
        >
          <MapPin className="w-3.5 h-3.5 text-pink-400" aria-hidden="true" />
          <span>Get Directions on Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
