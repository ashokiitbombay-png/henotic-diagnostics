'use client';

import { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight, CircleCheck, ExternalLink, Pause, Play, ShieldCheck, Star } from 'lucide-react';
import type { HealthCheckupTrustContent, TestimonialItem } from '@/config/health-checkup';
import { formatINR } from '@/config/health-checkup';
import { useAutoplay, useCardsPerView } from './useSlider';

function Avatar({ src, name }: { src: string; name: string }) {
  const [error, setError] = useState(false);
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2);
  if (error || !src) {
    return (
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xs shadow-md ring-2 ring-white shrink-0" aria-hidden="true">
        {initials}
      </div>
    );
  }
  return (
    <div className="relative shrink-0">
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-[2px] bg-gradient-to-tr from-purple-500 via-pink-400 to-indigo-400 shadow-md">
        <img src={src} alt={`${name}, patient`} width={44} height={44} loading="lazy" decoding="async" onError={() => setError(true)} className="w-full h-full rounded-full object-cover object-center ring-1 ring-white" />
      </div>
      <span title="Verified patient" className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5 shadow-sm">
        <CircleCheck className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" aria-hidden="true" />
      </span>
    </div>
  );
}

interface TestimonialsSliderProps {
  testimonials: TestimonialItem[];
  googleRating: HealthCheckupTrustContent['googleRating'];
}

/** Google rating badge + auto-advancing patient testimonial slider. */
export default function TestimonialsSlider({ testimonials, googleRating }: TestimonialsSliderProps) {
  const perView = useCardsPerView();
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const maxIndex = Math.max(0, testimonials.length - perView);
  const current = Math.min(index, maxIndex);

  const next = useCallback(() => setIndex((p) => (p >= maxIndex ? 0 : p + 1)), [maxIndex]);
  const prev = useCallback(() => setIndex((p) => (p <= 0 ? maxIndex : p - 1)), [maxIndex]);
  useAutoplay(autoPlay, 4200, next);

  return (
    <section
      aria-labelledby="hc-reviews-title"
      className="relative w-full rounded-3xl p-6 sm:p-8 text-gray-900 shadow-[0_16px_40px_rgba(0,0,0,0.04)] overflow-hidden border border-white/80 bg-gradient-to-b from-white/90 via-white/80 to-white/95 backdrop-blur-xl"
    >
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-3xl p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <a href={googleRating.profileUrl} target="_blank" rel="noopener noreferrer" className="bg-white p-2.5 rounded-2xl shadow-sm border border-gray-100 hover:scale-105 transition shrink-0">
                <img src="https://cdn.henoticdiagnostics.com/Google%20Trust%20Symbols/Google-name.webp" alt="Google reviews" width={96} height={32} className="h-7 sm:h-8 w-auto object-contain" loading="lazy" />
              </a>
              <div>
                <h2 id="hc-reviews-title" className="text-base sm:text-lg font-black text-gray-950">Henotic Diagnostics Patient Reviews</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-sm font-black text-gray-900">{googleRating.rating}</span>
                  <span className="flex items-center gap-0.5" aria-label={`${googleRating.rating} out of 5 stars`}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </span>
                  <span className="text-xs font-semibold text-gray-600">({formatINR(googleRating.reviewCount)} Google reviews)</span>
                </div>
              </div>
            </div>
            <a
              href={googleRating.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs border border-purple-200/80 transition shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-700" aria-hidden="true" />
              <span>Verified Profile</span>
              <ExternalLink className="w-3.5 h-3.5 text-purple-700" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mb-4 px-2">
        <span className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          Patient Experiences
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAutoPlay((p) => !p)}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-gray-200/80 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center gap-1 shadow-sm"
            aria-label={autoPlay ? 'Pause reviews slideshow' : 'Play reviews slideshow'}
          >
            {autoPlay ? <Pause className="w-3 h-3 text-purple-600" aria-hidden="true" /> : <Play className="w-3 h-3 text-purple-600" aria-hidden="true" />}
            <span className="hidden sm:inline">{autoPlay ? 'Pause' : 'Play'}</span>
          </button>
          <button type="button" onClick={prev} className="p-1.5 rounded-lg bg-white border border-gray-200/80 text-gray-700 hover:bg-gray-50 transition active:scale-95 shadow-sm" aria-label="Previous review">
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={next} className="p-1.5 rounded-lg bg-white border border-gray-200/80 text-gray-700 hover:bg-gray-50 transition active:scale-95 shadow-sm" aria-label="Next review">
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div onMouseEnter={() => setAutoPlay(false)} onMouseLeave={() => setAutoPlay(true)} className="relative overflow-hidden py-1">
        <ul className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${current * (100 / perView)}%)` }}>
          {testimonials.map((item) => (
            <li key={item.id} style={{ width: `${100 / perView}%` }} className="shrink-0 px-2 sm:px-3">
              <figure className="h-full bg-white/95 backdrop-blur-md rounded-3xl border border-gray-200/70 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between text-gray-900">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-100">{item.service}</span>
                    <span className="flex items-center gap-0.5" aria-label={`${item.rating} out of 5 stars`}>
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                      ))}
                    </span>
                  </div>
                  <blockquote className="text-xs sm:text-sm leading-relaxed italic mb-4 text-gray-700">“{item.quote}”</blockquote>
                </div>
                <figcaption className="pt-3 border-t border-gray-100 flex items-center gap-3">
                  <Avatar src={item.image} name={item.name} />
                  <span>
                    <span className="block text-xs sm:text-sm font-bold text-gray-900 leading-tight">{item.name}</span>
                    <span className="text-[10px] text-gray-500 font-medium">{item.service}</span>
                  </span>
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
            aria-label={`Reviews slide ${i + 1}`}
            aria-current={current === i}
          />
        ))}
      </div>
    </section>
  );
}
