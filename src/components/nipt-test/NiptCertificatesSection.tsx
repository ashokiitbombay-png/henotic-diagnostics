import { Maximize2 } from 'lucide-react';
import type { NiptCertificateItem } from '@/config/nipt-test';

interface NiptCertificatesSectionProps {
  certificates: NiptCertificateItem[];
  onSelectCert: (cert: NiptCertificateItem) => void;
}

/** NABL, CAP, and ISO accreditation grid with modal viewer trigger. */
export default function NiptCertificatesSection({ certificates, onSelectCert }: NiptCertificatesSectionProps) {
  return (
    <section
      aria-labelledby="nipt-certs-heading"
      className="bg-white/85 backdrop-blur-xl rounded-[2rem] border border-white/90 p-6 sm:p-8 lg:p-10 shadow-sm"
    >
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-extrabold uppercase tracking-wider text-purple-800 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200">
          Gold Standard Governance
        </span>
        <h2 id="nipt-certs-heading" className="text-2xl sm:text-3xl font-black text-slate-950 mt-2">
          Certificates &amp; Laboratory Accreditations
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Verified clinical adherence to international ISO, NABL, and CAP laboratory quality frameworks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="h-20 flex items-center justify-center mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <img
                  src={cert.logo}
                  alt={`${cert.name} - Henotic Diagnostics`}
                  width={120}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="max-h-14 w-auto object-contain"
                />
              </div>
              <h3 className="font-black text-base text-slate-950 text-center">{cert.name}</h3>
              <p className="text-[11px] font-semibold text-slate-400 text-center mt-0.5">{cert.authority}</p>
              <p className="text-xs text-slate-600 mt-3 text-center leading-relaxed">{cert.desc}</p>
            </div>

            <div className="pt-4 mt-5 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onSelectCert(cert)}
                className="w-full py-2.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-extrabold transition flex items-center justify-center gap-1.5"
              >
                <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>View Official Certificate</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
