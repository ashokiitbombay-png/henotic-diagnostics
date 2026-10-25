'use client';

import { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight, CircleCheck, ExternalLink, X } from 'lucide-react';
import type { AwardItem } from '@/config/health-checkup';
import { EXACT_SPECTRUM_CSS } from '@/config/health-checkup';
import { useAutoplay } from './useSlider';
import { useModalA11y } from './useModalA11y';

/** 3D coverflow carousel of awards with a detail modal. */
export default function AwardsCoverflow({ awards }: { awards: AwardItem[] }) {
  const [active, setActive] = useState(Math.min(2, Math.max(0, awards.length - 1)));
  const [autoPlay, setAutoPlay] = useState(true);
  const [selected, setSelected] = useState<AwardItem | null>(null);
  const modalRef = useModalA11y<HTMLDivElement>(Boolean(selected), () => setSelected(null));

  const next = useCallback(() => setActive((p) => (p + 1) % awards.length), [awards.length]);
  const prev = useCallback(() => setActive((p) => (p === 0 ? awards.length - 1 : p - 1)), [awards.length]);
  useAutoplay(autoPlay && selected === null && awards.length > 1, 4500, next);

  if (awards.length === 0) return null;
  const current = awards[active];

  return (
    <section
      aria-labelledby="hc-awards-title"
      aria-roledescription="carousel"
      className="relative rounded-3xl overflow-hidden py-10 px-4 sm:px-6 lg:px-8 border border-white/80 shadow-[0_16px_40px_rgba(0,0,0,0.04)] bg-gradient-to-b from-white/90 via-white/80 to-white/95 backdrop-blur-xl text-gray-900"
    >
      <div className="relative z-10 flex flex-col items-center mb-8 text-center max-w-4xl mx-auto">
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-purple-200/80 shadow-sm mb-4">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-purple-800">Spectrum Excellence</span>
          <div className="w-24 sm:w-36 h-2 rounded-full shadow-inner border border-purple-200" style={{ background: EXACT_SPECTRUM_CSS }} aria-hidden="true" />
          <span className="text-[10px] font-bold text-purple-900 uppercase tracking-widest bg-purple-100/70 px-2 py-0.5 rounded-full">Accredited</span>
        </div>
        <h2 id="hc-awards-title" className="text-3xl sm:text-4xl font-black tracking-tight text-gray-950">Awards &amp; National Recognitions</h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-600 max-w-lg mx-auto font-medium leading-relaxed">
          Excellence in diagnostic benchmark standards and healthcare service delivery across Maharashtra.
        </p>
      </div>

      <div className="w-full relative flex flex-col items-center" onMouseEnter={() => setAutoPlay(false)} onMouseLeave={() => setAutoPlay(true)}>
        <button
          type="button"
          onClick={() => { setAutoPlay(false); prev(); }}
          className="absolute left-2 sm:left-6 top-[180px] sm:top-[210px] -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-2xl bg-white/90 hover:bg-white text-gray-800 border border-gray-200/80 shadow-md backdrop-blur-xl transition active:scale-95"
          aria-label="Previous award"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => { setAutoPlay(false); next(); }}
          className="absolute right-2 sm:right-6 top-[180px] sm:top-[210px] -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-2xl bg-white/90 hover:bg-white text-gray-800 border border-gray-200/80 shadow-md backdrop-blur-xl transition active:scale-95"
          aria-label="Next award"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="w-full h-[360px] sm:h-[420px] relative flex items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
          {awards.map((award, index) => {
            const offset = index - active;
            const abs = Math.abs(offset);
            const hidden = abs > 2;
            const isActive = index === active;
            return (
              <button
                key={award.id}
                type="button"
                tabIndex={hidden ? -1 : 0}
                aria-hidden={hidden}
                aria-label={isActive ? `Open details for ${award.title}` : `Show ${award.title}`}
                onClick={() => (isActive ? setSelected(award) : setActive(index))}
                className="absolute cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] text-left"
                style={{
                  transform: `translateX(${offset * 210}px) translateZ(${-abs * 180}px) rotateY(${offset * -28}deg) scale(${hidden ? 0.55 : 1 - abs * 0.12})`,
                  zIndex: hidden ? 0 : 30 - abs * 10,
                  opacity: hidden ? 0 : 1,
                }}
              >
                <div
                  className={`relative w-[230px] sm:w-[280px] rounded-3xl p-3 sm:p-4 transition-all ${
                    isActive
                      ? 'bg-white/95 border-2 border-purple-300 shadow-[0_20px_45px_rgba(108,108,246,0.18)] ring-4 ring-purple-100/60'
                      : 'bg-white/75 border border-gray-200/70 shadow-sm opacity-80'
                  }`}
                >
                  <div className="relative overflow-hidden rounded-2xl p-2 bg-gradient-to-b from-purple-50/60 to-pink-50/40 border border-purple-100/60">
                    <div className="relative w-full h-[220px] sm:h-[260px] flex items-center justify-center">
                      <img src={award.image} alt={`${award.title} (${award.year}) awarded to Henotic Diagnostics`} width={260} height={260} className="w-full h-full object-contain drop-shadow-sm" loading="lazy" decoding="async" />
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">{award.category} • {award.year}</span>
                    <span className="block text-sm font-bold text-gray-900 truncate mt-0.5">{award.title}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 mt-4 z-20">
          {awards.map((a, i) => (
            <button
              key={a.id}
              type="button"
              onClick={() => { setAutoPlay(false); setActive(i); }}
              className={`transition-all duration-300 rounded-full ${active === i ? 'w-8 h-2 bg-gradient-to-r from-purple-600 to-pink-600 shadow-sm' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Award slide ${i + 1}: ${a.title}`}
              aria-current={active === i}
            />
          ))}
        </div>

        <div className="mt-6 max-w-xl w-full mx-auto text-center px-5 py-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-100 shadow-sm" aria-live="polite">
          <p className="inline-flex items-center gap-1.5 text-xs text-purple-800 font-semibold mb-0.5">
            <CircleCheck className="w-3.5 h-3.5 text-purple-600" aria-hidden="true" />
            <span>{current.title} — {current.organization}</span>
          </p>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{current.description}</p>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl" onClick={() => setSelected(null)}>
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hc-award-modal-title"
            className="relative max-w-3xl w-full bg-gradient-to-b from-[#241038]/95 via-[#1b0a2e]/95 to-[#10061e]/95 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-white/25 overflow-hidden hc-fade-zoom"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" onClick={() => setSelected(null)} className="absolute top-5 right-5 p-2 rounded-full bg-black/60 text-pink-200 hover:text-white transition border border-white/20" aria-label="Close award details">
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="relative bg-[#0d061c] p-4 rounded-2xl border border-white/20 flex items-center justify-center shadow-inner">
                <img src={selected.image} alt={`${selected.title} certificate`} className="max-h-[350px] w-auto object-contain rounded-lg" />
              </div>
              <div className="flex flex-col justify-center space-y-3 text-left text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-pink-300">{selected.category} • {selected.year}</span>
                <h3 id="hc-award-modal-title" className="text-2xl font-black">{selected.title}</h3>
                <p className="text-xs text-slate-300 font-semibold">{selected.organization}</p>
                <p className="text-xs text-pink-100/90 leading-relaxed pt-1">{selected.description}</p>
                <div className="pt-3">
                  <a href={selected.image} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-bold text-xs shadow-md border border-white/30" style={{ background: EXACT_SPECTRUM_CSS }}>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Open High-Res Certificate</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
