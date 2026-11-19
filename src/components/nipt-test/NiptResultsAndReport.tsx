import { Calendar, CheckCircle2, Download, ExternalLink, FileText, Maximize2, ShieldCheck } from 'lucide-react';
import {
  NIPT_REPORT_HIGHLIGHTS,
  NIPT_RESULTS_GUIDE,
  NIPT_SAMPLE_REPORT_PDF_URL,
  type NiptLocationContext,
  type NiptPanel,
} from '@/config/nipt-test';

interface NiptResultsAndReportProps {
  defaultPanel: NiptPanel;
  locationContext?: NiptLocationContext;
  onOpenSampleModal: () => void;
  onOpenBooking: (panel?: NiptPanel) => void;
}

/** Understanding NIPT Results + Official Embedded Sample NIPT Medical Report PDF Viewer + Disclaimer. */
export default function NiptResultsAndReport({
  defaultPanel,
  locationContext,
  onOpenSampleModal,
  onOpenBooking,
}: NiptResultsAndReportProps) {
  const areaCoverage = locationContext?.locationName && locationContext?.regionName
    ? `${locationContext.locationName}, ${locationContext.regionName}`
    : locationContext?.regionName
    ? `${locationContext.regionName} & Navi Mumbai`
    : 'Kharghar, Navi Mumbai — serving Panvel, Thane & Mumbai';

  return (
    <div
      id="understanding-nipt-results"
      aria-labelledby="understanding-nipt-results-heading"
      className="rounded-[2rem] bg-white/90 backdrop-blur-xl border border-white/90 p-5 sm:p-8 lg:p-10 shadow-sm space-y-8"
    >
      <div className="max-w-3xl">
        <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
          Simple Result Guide &amp; Sample PDF
        </span>
        <h3 id="understanding-nipt-results-heading" className="text-xl sm:text-3xl font-black text-slate-950 mt-2">
          Understanding NIPT Results
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
          Your NIPT report checks cell-free DNA in maternal blood and gives a clear risk status for each screened chromosomal condition—see what each result means and preview a sample PDF report below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {NIPT_RESULTS_GUIDE.map((res, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2.5">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold border ${res.badgeClass}`}>
              <span className={`w-2 h-2 rounded-full ${res.dotClass}`} aria-hidden="true" />
              {res.status}
            </span>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{res.meaning}</p>
          </div>
        ))}
      </div>

      {/* Dedicated Sample NIPT PDF Report Viewer */}
      <div
        id="sample-nipt-pdf-report"
        aria-labelledby="sample-nipt-report-heading"
        className="rounded-3xl bg-gradient-to-b from-purple-50/60 via-white to-slate-50/80 border border-purple-200/80 p-4 sm:p-6 shadow-sm space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              <FileText className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
              <span>Official Sample Report</span>
            </span>
            <h4 id="sample-nipt-report-heading" className="text-lg sm:text-2xl font-black text-slate-950 mt-1.5">
              Sample NIPT Report (PDF)
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              See how Fetal Fraction %, Trisomy 21, 18 &amp; 13 screening results, and doctor signatures appear on your report.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {NIPT_REPORT_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-2 sm:gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="min-w-0">
                <h5 className="text-xs font-black text-slate-900 leading-snug">{item.title}</h5>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border-2 border-purple-200/80 overflow-hidden bg-slate-950 shadow-lg">
          <div className="px-4 py-3 bg-slate-950 text-white flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-purple-700/80 text-white flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-xs sm:text-sm font-black tracking-tight">Sample NIPT Medical Report (PDF)</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider">
                Verified Format
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onOpenSampleModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold transition"
              >
                <Maximize2 className="w-3.5 h-3.5 text-purple-300" aria-hidden="true" />
                <span>Full Screen</span>
              </button>

              <a
                href={NIPT_SAMPLE_REPORT_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 text-xs font-extrabold transition"
              >
                <ExternalLink className="w-3.5 h-3.5 text-purple-700" aria-hidden="true" />
                <span>Open PDF</span>
              </a>

              <a
                href={NIPT_SAMPLE_REPORT_PDF_URL}
                download="Henotic-Diagnostics-Sample-NIPT-Report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold transition"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>

          <div className="w-full h-[380px] sm:h-[560px] lg:h-[640px] bg-slate-100">
            <iframe
              src={`${NIPT_SAMPLE_REPORT_PDF_URL}#toolbar=1&navpanes=0&view=FitH`}
              title="Sample NIPT Medical Report PDF - Non-Invasive Prenatal Testing at Henotic Diagnostics Kharghar Navi Mumbai"
              loading="lazy"
              className="w-full h-full border-0 bg-white"
            />
          </div>

          <div className="bg-slate-50 border-t border-slate-200 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-slate-600 leading-relaxed">
              Sample Non-Invasive Prenatal Testing (NIPT) cfDNA report issued by Henotic Diagnostics (NABL, CAP &amp; ISO aligned Molecular Genetics Lab, {areaCoverage}). Patient details are anonymised.
            </p>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href={NIPT_SAMPLE_REPORT_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-900 text-xs font-extrabold transition"
              >
                <ExternalLink className="w-3.5 h-3.5 text-purple-700" aria-hidden="true" />
                <span>View Full PDF</span>
              </a>
              <button
                type="button"
                onClick={() => onOpenBooking(defaultPanel)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-extrabold shadow-sm transition"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                <span>Book NIPT Test</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Important Medical Information */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white space-y-2">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" aria-hidden="true" />
          <span>Important Medical Information</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          NIPT is a non-invasive prenatal screening test, not a diagnostic test. A high-risk result should be followed by genetic counselling and appropriate confirmatory diagnostic testing, such as{' '}
          <strong className="text-white">chorionic villus sampling (CVS)</strong> or{' '}
          <strong className="text-white">amniocentesis</strong>, as advised by the treating specialist.
        </p>
      </div>
    </div>
  );
}
