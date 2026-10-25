import { Stethoscope } from 'lucide-react';
import type { DoctorProfile } from '@/config/health-checkup';

/** Reporting pathologists (E-E-A-T: named, credentialed reviewers). */
export default function PathologistsSection({ doctors }: { doctors: DoctorProfile[] }) {
  return (
    <section aria-labelledby="hc-doctors-title" className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/60 p-6 sm:p-8 shadow-sm">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">Clinical Medical Team</span>
        <h2 id="hc-doctors-title" className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">Senior Reporting Pathologists</h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">Every diagnostic profile is clinically reviewed and verified by certified pathology consultants.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doc) => (
          <article key={doc.name} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-purple-50 border-2 border-purple-100 shrink-0 shadow-sm">
              <img src={doc.image} alt={`${doc.name}, ${doc.degrees} — reporting pathologist at Henotic Diagnostics`} width={224} height={224} className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="inline-flex items-center gap-1.5 text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md mb-1">
                <Stethoscope className="w-3 h-3" aria-hidden="true" />
                <span>{doc.degrees}</span>
              </p>
              <h3 className="text-lg font-black text-gray-950">{doc.name}</h3>
              <p className="text-[11px] font-semibold text-gray-500 mt-0.5">Reg: {doc.registration}</p>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">{doc.bio}</p>
              <ul className="mt-3 flex flex-wrap justify-center sm:justify-start gap-1.5">
                {doc.focus.map((f) => (
                  <li key={f} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">{f}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
