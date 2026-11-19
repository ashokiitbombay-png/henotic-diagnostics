'use client';

import { Download, ExternalLink, FileText, X } from 'lucide-react';
import type { NiptAwardItem, NiptCertificateItem } from '@/config/nipt-test';
import { NIPT_SAMPLE_REPORT_PDF_URL } from '@/config/nipt-test';
import { useModalA11y } from '@/components/health-checkup/useModalA11y';

export function NiptCertificateModal({
  cert,
  onClose,
}: {
  cert: NiptCertificateItem | null;
  onClose: () => void;
}) {
  const ref = useModalA11y<HTMLDivElement>(Boolean(cert), onClose);
  if (!cert) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="nipt-cert-modal-title"
        className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 hc-fade-zoom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 bg-slate-950 text-white flex items-center justify-between">
          <div>
            <h3 id="nipt-cert-modal-title" className="text-base font-black">{cert.name}</h3>
            <p className="text-xs text-slate-300">{cert.authority}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-autofocus
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Close certificate preview"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <div className="p-4 sm:p-6 bg-slate-50 max-h-[75vh] overflow-auto flex justify-center">
          <img
            src={cert.certImage}
            alt={`${cert.name} Official Accreditation Certificate - Henotic Diagnostics`}
            className="max-w-full h-auto rounded-xl border border-slate-200 shadow-sm bg-white"
          />
        </div>
      </div>
    </div>
  );
}

export function NiptAwardModal({
  award,
  onClose,
}: {
  award: NiptAwardItem | null;
  onClose: () => void;
}) {
  const ref = useModalA11y<HTMLDivElement>(Boolean(award), onClose);
  if (!award) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="nipt-award-modal-title"
        className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-purple-100 hc-fade-zoom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 bg-gradient-to-r from-slate-950 to-purple-950 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-300">
              {award.category} • {award.year}
            </span>
            <h3 id="nipt-award-modal-title" className="text-base font-black">{award.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-autofocus
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Close award details"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <div className="p-5 sm:p-6 space-y-4">
          <div className="rounded-2xl bg-purple-50/70 border border-purple-100 p-4 flex justify-center">
            <img
              src={award.image}
              alt={`${award.title} - Henotic Diagnostics`}
              className="max-h-72 w-auto object-contain"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-purple-800">{award.organization}</p>
            <p className="text-sm text-slate-700 mt-1.5 leading-relaxed">{award.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NiptSampleReportModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useModalA11y<HTMLDivElement>(open, onClose);
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="nipt-pdf-modal-title"
        className="w-full max-w-5xl h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-purple-200 hc-fade-zoom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 sm:px-6 py-3.5 bg-slate-950 text-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-emerald-400" aria-hidden="true" />
            <h3 id="nipt-pdf-modal-title" className="text-sm sm:text-base font-black">
              Official Sample NIPT Medical Report (PDF)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={NIPT_SAMPLE_REPORT_PDF_URL}
              download="Henotic-Diagnostics-Sample-NIPT-Report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold transition"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Download</span>
            </a>
            <a
              href={NIPT_SAMPLE_REPORT_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 text-xs font-extrabold transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-purple-700" aria-hidden="true" />
              <span>New Tab</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              data-autofocus
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
              aria-label="Close sample report viewer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-slate-100">
          <iframe
            src={`${NIPT_SAMPLE_REPORT_PDF_URL}#toolbar=1&navpanes=0&view=FitH`}
            title="Full Screen Sample NIPT Medical Report PDF"
            className="w-full h-full border-0 bg-white"
          />
        </div>
      </div>
    </div>
  );
}
