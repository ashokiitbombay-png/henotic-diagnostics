import {
  AlertCircle,
  Baby,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Dna,
  Droplets,
  FileText,
  HeartHandshake,
  Info,
  Microscope,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import {
  NIPT_PREREQUISITES,
  NIPT_PRE_TEST_INSTRUCTIONS,
  NIPT_PROCESS_STEPS,
  NIPT_SAMPLE_SPECS,
  type NiptPanel,
  type NiptProcessStep,
} from '@/config/nipt-test';

const STEP_ICONS: Record<NiptProcessStep['iconName'], typeof Stethoscope> = {
  Stethoscope,
  Baby,
  Droplets,
  ShieldCheck,
  Dna,
  Microscope,
  FileText,
  HeartHandshake,
};

interface NiptProcessAndPrepProps {
  defaultPanel: NiptPanel;
  onOpenBooking: (panel?: NiptPanel) => void;
}

/** Prerequisites, sample collection protocol, pre-test checklist, and 8-step NIPT workflow. */
export default function NiptProcessAndPrep({ defaultPanel, onOpenBooking }: NiptProcessAndPrepProps) {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
          Complete Patient Preparation Guide
        </span>
        <h2 id="nipt-process-heading" className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
          NIPT Test – Prerequisites &amp; Step-by-Step Testing Process
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Everything expectant parents and referring obstetricians need to know from sample collection to final genetic report interpretation.
        </p>
      </div>

      {/* Prerequisites & Sample Collection Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 min-w-0 rounded-3xl bg-white/90 backdrop-blur-md border border-white/90 p-5 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
              <ClipboardCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-950">1. Test Prerequisites</h3>
              <p className="text-xs text-slate-500">Key clinical requirements before undergoing NIPT screening</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th scope="col" className="py-3 px-4 font-extrabold w-[42%]">Requirement</th>
                  <th scope="col" className="py-3 px-4 font-extrabold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {NIPT_PREREQUISITES.map((item, i) => (
                  <tr key={i} className="odd:bg-white even:bg-slate-50/70">
                    <th scope="row" className="py-2.5 px-4 font-bold text-slate-900">{item.req}</th>
                    <td className="py-2.5 px-4 text-slate-700">{item.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-950">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">
              <strong>Important:</strong> NIPT eligibility and test selection may vary depending on gestational age, pregnancy type, medical history and laboratory testing platform.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 min-w-0 space-y-6">
          <div className="rounded-3xl bg-white/90 backdrop-blur-md border border-white/90 p-5 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-950">Sample Collection Details</h3>
                <p className="text-xs text-slate-500">Validated cfDNA phlebotomy protocol</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-emerald-950 text-white">
                    <th scope="col" className="py-2.5 px-3.5 font-extrabold w-[42%]">Parameter</th>
                    <th scope="col" className="py-2.5 px-3.5 font-extrabold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {NIPT_SAMPLE_SPECS.map((spec, idx) => (
                    <tr key={idx} className="odd:bg-white even:bg-emerald-50/30">
                      <th scope="row" className="py-2.5 px-3.5 font-bold text-slate-900">{spec.param}</th>
                      <td className="py-2.5 px-3.5 text-slate-700">{spec.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-3xl bg-white/90 backdrop-blur-md border border-white/90 p-5 sm:p-7 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-slate-950 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-purple-700" aria-hidden="true" />
              <span>Important Instructions Before Testing</span>
            </h3>
            <ul className="space-y-2.5">
              {NIPT_PRE_TEST_INSTRUCTIONS.map((inst, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 8-Step NIPT Testing Process Timeline */}
      <div className="rounded-[2rem] bg-white/90 backdrop-blur-xl border border-white/90 p-6 sm:p-8 lg:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
              Sample Collection to Final Report
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 mt-0.5">
              2. NIPT Testing Process – Step by Step
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onOpenBooking(defaultPanel)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-extrabold shadow-sm self-start sm:self-auto transition"
          >
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Schedule Step 3 Home Blood Pickup</span>
          </button>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {NIPT_PROCESS_STEPS.map((s, idx) => {
            const IconComp = STEP_ICONS[s.iconName];
            return (
              <li
                key={idx}
                className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-50/90 to-white border border-slate-200/80 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-purple-900 text-white text-[11px] font-extrabold uppercase tracking-wider">
                      {s.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
                      <IconComp className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                  <h4 className="text-sm font-black text-slate-950">{s.title}</h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{s.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
