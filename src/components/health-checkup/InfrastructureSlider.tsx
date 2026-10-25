'use client';

import { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import type { InfrastructureItem } from '@/config/health-checkup';
import { useAutoplay, useCardsPerView } from './useSlider';

/** Auto-advancing slider of laboratory & facility photographs. */
export default function InfrastructureSlider({ items }: { items: InfrastructureItem[] }) {
  const perView = useCardsPerView();
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const maxIndex = Math.max(0, items.length - perView);
  const current = Math.min(index, maxIndex);

  const next = useCallback(() => setIndex((p) => (p >= maxIndex ? 0 : p + 1)), [maxIndex]);
  const prev = useCallback(() => setIndex((p) => (p <= 0 ? maxIndex : p - 1)), [maxIndex]);
  useAutoplay(autoPlay, 3800, next);

  return (
    <section aria-labelledby="hc-infra-title" className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/60 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            World-Class Diagnostic Facility
          </span>
          <h2 id="hc-infra-title" className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">Laboratory Infrastructure</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Equipped with fully automated biochemistry analyzers, strict temperature controls, and patient comfort bays.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setAutoPlay((p) => !p)}
            aria-pressed={!autoPlay}
            className="px-2.5 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold hover:bg-gray-50 transition flex items-center gap-1 shadow-sm text-gray-700"
            aria-label={autoPlay ? 'Pause facility slideshow' : 'Play facility slideshow'}
          >
            {autoPlay ? <Pause className="w-3.5 h-3.5 text-purple-600" aria-hidden="true" /> : <Play className="w-3.5 h-3.5 text-purple-600" aria-hidden="true" />}
            <span className="hidden sm:inline">{autoPlay ? 'Pause' : 'Play'}</span>
          </button>
          <button type="button" onClick={prev} className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 transition active:scale-95 shadow-sm" aria-label="Previous facility photo">
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={next} className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 transition active:scale-95 shadow-sm" aria-label="Next facility photo">
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div onMouseEnter={() => setAutoPlay(false)} onMouseLeave={() => setAutoPlay(true)} className="relative overflow-hidden py-1">
        <ul className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${current * (100 / perView)}%)` }}>
          {items.map((item) => (
            <li key={item.title} style={{ width: `${100 / perView}%` }} className="shrink-0 px-2 sm:px-3">
              <figure className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={`${item.title} — ${item.subtitle}, Henotic Diagnostics Kharghar`}
                    width={640}
                    height={384}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/70 text-white backdrop-blur-sm">{item.tag}</span>
                </div>
                <figcaption className="p-4 flex-1 flex flex-col justify-center">
                  <span className="font-bold text-sm text-gray-900 group-hover:text-purple-700 transition-colors">{item.title}</span>
                  <span className="text-xs text-gray-500 mt-0.5">{item.subtitle}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-5">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${current === i ? 'w-6 bg-purple-600' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
            aria-label={`Facility slide ${i + 1}`}
            aria-current={current === i}
          />
        ))}
      </div>
    </section>
  );
}
