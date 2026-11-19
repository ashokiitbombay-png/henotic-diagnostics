import { Check, Minus } from 'lucide-react';
import { NIPT_COMPARISON_ROWS } from '@/config/nipt-test';

function ComparisonCell({ value }: { value: string }) {
  if (value === 'included') {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-black">
        <Check className="w-4 h-4 stroke-[3]" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === 'excluded') {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-400">
        <Minus className="w-4 h-4" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return (
    <span className="inline-block px-2.5 py-1 rounded-lg bg-purple-50 text-purple-900 border border-purple-200/70 text-[11px] sm:text-xs font-bold">
      {value}
    </span>
  );
}

/** 12-parameter comparison matrix across NIPT Basic, Advanced, and Comprehensive panels. */
export default function NiptComparisonTable() {
  return (
    <section
      id="nipt-comparison"
      aria-labelledby="nipt-comparison-heading"
      className="rounded-[2rem] bg-white/85 backdrop-blur-xl border border-white/90 p-5 sm:p-8 lg:p-10 shadow-[0_16px_45px_rgba(15,23,42,0.05)] space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Side-by-Side Clinical Matrix
          </span>
          <h2 id="nipt-comparison-heading" className="text-2xl sm:text-3xl font-black text-slate-950 mt-2">
            Comparison of NIPT Panels – Screening Parameters
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Compare chromosomal trisomies, sex chromosome aneuploidies, microdeletions, and genome-wide CNV coverage across all 3 tiers.
          </p>
        </div>

        <div className="inline-flex items-center gap-4 text-xs font-bold text-slate-700 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200/80 self-start md:self-auto">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 inline-flex items-center justify-center">
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
            Included
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 inline-flex items-center justify-center">
              <Minus className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
            Not included
          </span>
        </div>
      </div>

      <div className="sm:hidden flex items-center justify-center gap-1.5 text-[11px] font-bold text-purple-800 bg-purple-50/90 border border-purple-200/70 rounded-xl py-1.5 px-3">
        <span>Swipe horizontally to compare panels →</span>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
        <table className="w-full min-w-[640px] text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 text-white text-xs sm:text-sm">
              <th scope="col" className="sticky left-0 z-10 bg-slate-950 py-3.5 px-3.5 sm:px-5 font-extrabold w-[38%] min-w-[150px]">
                Screening Parameter
              </th>
              <th scope="col" className="py-3.5 px-4 font-extrabold text-center bg-purple-950/60">Basic Panel</th>
              <th scope="col" className="py-3.5 px-4 font-extrabold text-center bg-rose-950/60">Advanced Panel</th>
              <th scope="col" className="py-3.5 px-4 font-extrabold text-center bg-emerald-950/70">Comprehensive Panel</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
            {NIPT_COMPARISON_ROWS.map((row, idx) => (
              <tr key={idx} className="group hover:bg-purple-50/30 transition-colors odd:bg-white even:bg-slate-50/60">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-white group-hover:bg-purple-50/40 py-3 px-3.5 sm:px-5 font-bold text-slate-900 border-r border-slate-100"
                >
                  {row.parameter}
                </th>
                <td className="py-3.5 px-4 text-center"><ComparisonCell value={row.basic} /></td>
                <td className="py-3.5 px-4 text-center"><ComparisonCell value={row.advanced} /></td>
                <td className="py-3.5 px-4 text-center bg-emerald-50/20"><ComparisonCell value={row.comprehensive} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80">
          <h3 className="text-sm font-black text-purple-950">NIPT Basic</h3>
          <p className="text-xs text-slate-700 mt-1 leading-relaxed">
            Screening for the three common chromosomal trisomies (21, 18 and 13).
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200/80">
          <h3 className="text-sm font-black text-rose-950">NIPT Advanced</h3>
          <p className="text-xs text-slate-700 mt-1 leading-relaxed">
            Basic screening, sex chromosome aneuploidies and selected additional chromosomal abnormalities.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
          <h3 className="text-sm font-black text-emerald-950">NIPT Comprehensive</h3>
          <p className="text-xs text-slate-700 mt-1 leading-relaxed">
            Expanded screening covering common trisomies, sex chromosome abnormalities, selected microdeletions, rare autosomal trisomies and genome-wide chromosomal changes, depending on the testing platform.
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-500 italic bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 leading-relaxed">
        <strong>Note:</strong> Actual panel coverage depends on the performing laboratory, assay technology and clinical validation. NIPT is a screening test, not a diagnostic test. High-risk results require appropriate genetic counselling and confirmatory diagnostic testing.
      </p>
    </section>
  );
}
