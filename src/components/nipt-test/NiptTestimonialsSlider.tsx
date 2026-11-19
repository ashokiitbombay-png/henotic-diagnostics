'use client';

import { useCallback, useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, ExternalLink, MapPin } from 'lucide-react';
import type { NiptTestimonialItem, NiptTrustContent } from '@/config/nipt-test';
import { GOOGLE_G_BADGE, GOOGLE_WORDMARK_LOGO, NIPT_GOOGLE_MAPS_URL } from '@/config/nipt-test';
import { useAutoplay, useCardsPerView } from '@/components/health-checkup/useSlider';

function CompactAvatarImage({ src, name }: { src: string; name: string }) {
  const [imgError, setImgError] = useState(false);
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  if (imgError) {
    return (
      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0 ring-2 ring-purple-100 shadow-sm">
        {initials}
      </div>
    );
  }

  return (
    <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 shrink-0 shadow-sm">
      <img
        src={src}
        alt={`${name} - Verified Patient at Henotic Diagnostics`}
        width={44}
        height={44}
        loading="lazy"
        decoding="async"
        onError={() => setImgError(true)}
        className="w-full h-full rounded-full object-cover object-center ring-1 ring-white bg-white"
      />
    </div>
  );
}

interface NiptTestimonialsSliderProps {
  testimonials: NiptTestimonialItem[];
  googleRating: NiptTrustContent['googleRating'];
}

/** Verified Google-branded expectant parent testimonials carousel. */
export default function NiptTestimonialsSlider({ testimonials, googleRating }: NiptTestimonialsSliderProps) {
  const perView = useCardsPerView();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const maxIndex = Math.max(0, testimonials.length - perView);
  const clampedIndex = Math.min(currentIndex, maxIndex);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useAutoplay(isAutoPlaying, 4200, next);

  return (
    <section
      aria-labelledby="nipt-testimonials-heading"
      className="bg-white/85 backdrop-blur-xl rounded-[2rem] border border-white/90 p-6 sm:p-8 lg:p-10 shadow-sm space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <img
              src={GOOGLE_WORDMARK_LOGO}
              alt="Google Verified Patient Reviews"
              width={76}
              height={26}
              loading="lazy"
              decoding="async"
              className="h-6 w-auto object-contain"
            />
            <span className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-1 text-amber-500 text-xs font-black">
              <span aria-hidden="true">★★★★★</span>
              <span className="text-slate-900 ml-1">{googleRating.rating} Rating</span>
            </div>
          </div>
          <h2 id="nipt-testimonials-heading" className="text-2xl sm:text-3xl font-black text-slate-950">
            Trusted by Expectant Parents Across Navi Mumbai &amp; Maharashtra
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Real prenatal screening experiences highlighting gentle maternal blood collection, clear panel guidance, and timely NIPT reporting.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={prev}
            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm transition active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm transition active:scale-95"
            aria-label="Next testimonial"
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
          {testimonials.map((t) => (
            <div key={t.id} style={{ width: `${100 / perView}%` }} className="shrink-0 px-2 sm:px-3">
              <article className="h-full p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <CompactAvatarImage src={t.image} name={t.name} />
                      <div>
                        <h3 className="text-sm font-black text-slate-950">{t.name}</h3>
                        <p className="text-[11px] font-semibold text-purple-700">{t.service}</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0">
                      <img src={GOOGLE_G_BADGE} alt="Posted on Google" width={18} height={18} loading="lazy" decoding="async" className="w-4 h-4 object-contain" />
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400 text-xs mb-2.5" aria-label={`${t.rating} out of 5 stars`}>
                    {'★'.repeat(t.rating)}
                  </div>

                  <blockquote className="text-xs sm:text-sm text-slate-600 leading-relaxed">“{t.quote}”</blockquote>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-emerald-700">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    Verified Patient Review
                  </span>
                  <span className="text-slate-400">Henotic Diagnostics</span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 via-white to-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={GOOGLE_G_BADGE} alt="Google Verified Business Profile" width={32} height={32} loading="lazy" decoding="async" className="w-8 h-8 object-contain" />
          <div>
            <p className="text-xs sm:text-sm font-black text-slate-950">Verified Diagnostic Clinic on Google Maps</p>
            <p className="text-xs text-slate-500">
              Rated {googleRating.rating}/5 across {googleRating.reviewCount.toLocaleString('en-IN')}+ verified prenatal NIPT, pathology &amp; molecular diagnostic reviews in Kharghar, Navi Mumbai
            </p>
          </div>
        </div>
        <a
          href={googleRating.mapsUrl || NIPT_GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold transition shrink-0"
        >
          <MapPin className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
          <span>View on Google Maps</span>
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
