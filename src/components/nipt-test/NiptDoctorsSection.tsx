import { Stethoscope } from 'lucide-react';
import type { NiptDoctorProfile } from '@/config/nipt-test';

interface NiptDoctorsSectionProps {
  doctors: NiptDoctorProfile[];
}

/** E-E-A-T Clinical Signatories: Molecular Genetics & Pathology reporting doctors. */
export default function NiptDoctorsSection({ doctors }: NiptDoctorsSectionProps) {
  return (
    <section
      aria-labelledby="nipt-doctors-heading"
      className="bg-white/85 backdrop-blur-xl rounded-[2rem] border border-white/90 p-6 sm:p-8 lg:p-10 shadow-sm"
    >
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-extrabold uppercase tracking-wider text-purple-800 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200">
          Clinical Signatories &amp; E-E-A-T Authority
        </span>
        <h2 id="nipt-doctors-heading" className="text-2xl sm:text-3xl font-black text-slate-950 mt-2">
          Reporting Doctors – Molecular Genetics &amp; Pathology
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Every prenatal screening report undergoes clinical quality assurance by Maharashtra Medical Council registered specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {doctors.map((doc, idx) => (
          <article
            key={idx}
            className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-purple-50 border-2 border-purple-200 shrink-0 shadow-sm">
              <img
                src={doc.image}
                alt={`${doc.name} - ${doc.degrees}`}
                width={128}
                height={128}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100 mb-1.5">
                <Stethoscope className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{doc.degrees}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-950">{doc.name}</h3>
              <p className="text-[11px] font-bold text-emerald-800 mt-0.5">MMC Registration: {doc.registration}</p>
              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{doc.bio}</p>
              <div className="mt-3.5 flex flex-wrap justify-center sm:justify-start gap-1.5">
                {doc.focus.map((f, fIdx) => (
                  <span key={fIdx} className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
