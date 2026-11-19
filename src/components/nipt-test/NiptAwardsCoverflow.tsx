'use client';

import { useCallback, useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { NiptAwardItem } from '@/config/nipt-test';
import { NIPT_EXACT_SPECTRUM_CSS } from '@/config/nipt-test';
import { useAutoplay, useCardsPerView } from '@/components/health-checkup/useSlider';

interface NiptAwardsCoverflowProps {
  awards: NiptAwardItem[];
  onSelectAward: (award: NiptAwardItem) => void;
  modalOpen: boolean;
}

/** 3D Perspective Coverflow Carousel for National & Industry Awards. */
export default function NiptAwardsCoverflow({ awards, onSelectAward, modalOpen }: NiptAwardsCoverflowProps) {
  const perView = useCardsPerView();
  const [activeIndex, setActiveIndex] = useState(Math.min(2, Math.max(0, awards.length - 1)));
  const [isAutoplay, setIsAutoplay] = useState(true);

  const tick = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % awards.length);
  }, [awards.length]);

  useAutoplay(isAutoplay && !modalOpen && awards.length > 1, 4500, tick);

  const currentAward = awards[activeIndex] ?? awards[0];
  if (!currentAward) return null;

  return (
    <section
      aria-labelledby="nipt-awards-heading"
      className="relative rounded-[2rem] overflow-hidden py-10 px-4 sm:px-6 lg:px-8 border border-white/90 shadow-sm bg-gradient-to-b from-white/95 via-white/85 to-white/95 backdrop-blur-xl text-slate-900"
    >
      <div className="relative z-10 flex flex-col items-center mb-8 text-center max-w-4xl mx-auto">
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-purple-200/80 shadow-sm mb-4">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-purple-800">Spectrum Excellence</span>
          <div className="w-20 sm:w-32 h-2 rounded-full shadow-inner border border-purple-200" style={{ background: NIPT_EXACT_SPECTRUM_CSS }} />
          <span className="text-[10px] font-extrabold text-purple-900 uppercase tracking-widest bg-purple-100/70 px-2 py-0.5 rounded-full">Honored</span>
        </div>

        <h2 id="nipt-awards-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950">
          Awards &amp; National Recognitions
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-medium leading-relaxed">
          Recognized across India for diagnostic precision, clinical quality assurance, and patient-first healthcare delivery.
        </p>
      </div>

      <div
        className="w-full relative flex flex-col items-center"
        onMouseEnter={() => setIsAutoplay(false)}
        onMouseLeave={() => setIsAutoplay(true)}
      >
        <button
          type="button"
          onClick={() => {
            setIsAutoplay(false);
            setActiveIndex((prev) => (prev === 0 ? awards.length - 1 : prev - 1));
          }}
          className="absolute left-1 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-2xl bg-white/95 hover:bg-white text-slate-800 border border-slate-200 shadow-md backdrop-blur-xl transition active:scale-95"
          aria-label="Previous Award"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => {
            setIsAutoplay(false);
            setActiveIndex((prev) => (prev + 1) % awards.length);
          }}
          className="absolute right-1 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-2xl bg-white/95 hover:bg-white text-slate-800 border border-slate-200 shadow-md backdrop-blur-xl transition active:scale-95"
          aria-label="Next Award"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>

        <div
          className="w-full h-[320px] sm:h-[410px] relative flex items-center justify-center overflow-hidden"
          style={{ perspective: '1200px' }}
        >
          {awards.map((award, index) => {
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);
            const isMobile = perView === 1;
            const translateX = offset * (isMobile ? 105 : 195);
            const translateZ = -absOffset * 180;
            const rotateY = offset * -26;
            const opacity = absOffset > 2 ? 0 : 1;
            const scale = absOffset > 2 ? 0.55 : 1 - absOffset * 0.12;
            const zIndex = absOffset > 2 ? 0 : 30 - absOffset * 10;
            const isActive = index === activeIndex;

            return (
              <div
                key={award.id}
                role="button"
                tabIndex={isActive ? 0 : -1}
                onClick={() => (isActive ? onSelectAward(award) : setActiveIndex(index))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (isActive) onSelectAward(award);
                    else setActiveIndex(index);
                  }
                }}
                className="absolute cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
              >
                <div
                  className={`relative w-[190px] sm:w-[275px] rounded-3xl p-3 sm:p-4 transition-all ${
                    isActive
                      ? 'bg-white border-2 border-purple-300 shadow-[0_20px_45px_rgba(108,108,246,0.18)] ring-4 ring-purple-100/60'
                      : 'bg-white/80 border border-slate-200/70 shadow-sm opacity-80'
                  }`}
                >
                  <div className="relative overflow-hidden rounded-2xl p-2 bg-gradient-to-b from-purple-50/60 to-pink-50/40 border border-purple-100/60">
                    <div className="relative w-full h-[185px] sm:h-[250px] flex items-center justify-center">
                      <img
                        src={award.image}
                        alt={`${award.title} - Henotic Diagnostics`}
                        width={240}
                        height={250}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain filter drop-shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700">
                      {award.category} • {award.year}
                    </span>
                    <h3 className="text-sm font-black text-slate-900 truncate mt-0.5">{award.title}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 mt-4 z-20">
          {awards.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setIsAutoplay(false);
                setActiveIndex(i);
              }}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === i ? 'w-8 h-2 bg-gradient-to-r from-purple-600 to-pink-600 shadow-sm' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Award slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="mt-6 max-w-xl w-full mx-auto text-center px-5 py-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-purple-100 shadow-sm">
          <div className="inline-flex items-center gap-1.5 text-xs text-purple-900 font-bold mb-0.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" aria-hidden="true" />
            <span>Verified: {currentAward.organization}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{currentAward.description}</p>
        </div>
      </div>
    </section>
  );
}
