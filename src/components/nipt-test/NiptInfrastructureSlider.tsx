'use client';

import { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import type { NiptInfrastructureItem } from '@/config/nipt-test';
import { useAutoplay, useCardsPerView } from '@/components/health-checkup/useSlider';

interface NiptInfrastructureSliderProps {
  items: NiptInfrastructureItem[];
}

/** Responsive moving slider showcasing Henotic Diagnostics' NGS & Molecular Genetics infrastructure. */
export default function NiptInfrastructureSlider({ items }: NiptInfrastructureSliderProps) {
  const perView = useCardsPerView();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const maxIndex = Math.max(0, items.length - perView);
  const clampedIndex = Math.min(currentIndex, maxIndex);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useAutoplay(isAutoPlaying, 3800, next);

  return (
    <section
      aria-labelledby="nipt-infra-heading"
      className="bg-white/85 backdrop-blur-xl rounded-[2rem] border border-white/90 p-6 sm:p-8 lg:p-10 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Next-Generation Sequencing Facility
          </span>
          <h2 id="nipt-infra-heading" className="text-2xl sm:text-3xl font-black text-slate-950 mt-2">
            Molecular &amp; Genetic Laboratory Infrastructure
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Equipped with dedicated Next-Generation Gene Sequencing (NGS) workflows, molecular reception bays, and expectant mother lounges.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setIsAutoPlaying((p) => !p)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold hover:bg-slate-50 transition flex items-center gap-1.5 shadow-sm text-slate-700"
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-purple-600" aria-hidden="true" /> : <Play className="w-3.5 h-3.5 text-purple-600" aria-hidden="true" />}
            <span>{isAutoPlaying ? 'Auto' : 'Paused'}</span>
          </button>
          <button
            type="button"
            onClick={prev}
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition active:scale-95 shadow-sm"
            aria-label="Previous facility photo"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition active:scale-95 shadow-sm"
            aria-label="Next facility photo"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="relative overflow-hidden py-1"
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${clampedIndex * (100 / perView)}%)` }}
        >
          {items.map((item, idx) => (
            <div key={idx} style={{ width: `${100 / perView}%` }} className="shrink-0 px-2 sm:px-3">
              <figure className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={`${item.title} - Henotic Diagnostics`}
                    width={420}
                    height={260}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-slate-950/80 text-white backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>
                <figcaption className="p-4 flex-1 flex flex-col justify-center">
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-purple-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-5">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              clampedIndex === idx ? 'w-7 bg-purple-700' : 'w-2 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Facility slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
