'use client';

import { useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import type { CertificateItem } from '@/config/health-checkup';
import { useModalA11y } from './useModalA11y';

/** Accreditation cards with an accessible certificate lightbox. */
export default function CertificatesSection({ certificates }: { certificates: CertificateItem[] }) {
  const [active, setActive] = useState<CertificateItem | null>(null);
  const ref = useModalA11y<HTMLDivElement>(Boolean(active), () => setActive(null));

  return (
    <section aria-labelledby="hc-certs-title" className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/60 p-6 sm:p-8 shadow-sm">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">Gold Standard Quality Assurance</span>
        <h2 id="hc-certs-title" className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">Certificates &amp; Accreditations</h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">Verified clinical adherence to international ISO, NABL, and CAP laboratory governance frameworks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <article key={cert.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="h-16 flex items-center justify-center mb-4 p-2 bg-gray-50 rounded-xl">
                <img src={cert.logo} alt={`${cert.name} accreditation logo`} width={120} height={48} className="max-h-12 w-auto object-contain" loading="lazy" decoding="async" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 text-center">{cert.name}</h3>
              <p className="text-[11px] font-medium text-gray-500 text-center mt-0.5">{cert.authority}</p>
              <p className="text-xs text-gray-600 mt-3 text-center leading-relaxed">{cert.desc}</p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setActive(cert)}
                className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>View Official Certificate</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={() => setActive(null)}>
          <div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hc-cert-modal-title"
            className="relative max-w-2xl w-full bg-white rounded-3xl p-5 shadow-2xl border border-gray-100 overflow-hidden hc-fade-zoom"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" onClick={() => setActive(null)} className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition" aria-label="Close certificate">
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
            <h3 id="hc-cert-modal-title" className="text-lg font-black text-gray-900 mb-1 pr-10">{active.name}</h3>
            <p className="text-xs text-gray-500 mb-4">{active.authority}</p>
            <div className="rounded-2xl overflow-hidden bg-gray-50 p-2 border border-gray-200 flex items-center justify-center">
              <img src={active.certImage} alt={`${active.name} official certificate issued to Henotic Diagnostics`} className="max-h-[70vh] w-auto object-contain rounded-xl" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
