"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  Pause, 
  Play, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { 
  TESTIMONIALS, 
  GOOGLE_BUSINESS_PROFILE_URL 
} from '@/config/health-packages';

function CompactAvatarImage({ src, name }: { src: string; name: string }) {
  const [imgError, setImgError] = useState(false);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  if (imgError) {
    return (
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xs shadow-md ring-2 ring-white shrink-0">
        {initials}
      </div>
    );
  }

  return (
    <div className="relative shrink-0">
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-[2px] bg-gradient-to-tr from-purple-500 via-pink-400 to-indigo-400 shadow-md">
        <img
          src={src}
          alt={`${name} - Verified Patient Review`}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full rounded-full object-cover object-center ring-1 ring-white"
        />
      </div>
      <span
        title="Verified Patient"
        className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5 shadow-sm"
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
      </span>
    </div>
  );
}

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateViews = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setCardsPerView(1);
      } else if (w < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    updateViews();
    window.addEventListener("resize", updateViews);
    return () => window.removeEventListener("resize", updateViews);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - cardsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4200);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section 
      aria-label="Verified Patient Reviews"
      className="relative w-full rounded-3xl p-6 sm:p-8 text-gray-900 shadow-[0_16px_40px_rgba(0,0,0,0.04)] overflow-hidden border border-white/80 bg-gradient-to-b from-white/90 via-white/80 to-white/95 backdrop-blur-xl"
    >
      {/* Top Google Business Badge */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-3xl p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <a
                href={GOOGLE_BUSINESS_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2.5 rounded-2xl shadow-sm border border-gray-100 hover:scale-105 transition shrink-0"
              >
                <img
                  src="https://storage.googleapis.com/wp-media-henoticbucket/Google%20Trust%20Symbols/Google-name.webp"
                  alt="Google Reviews Rating"
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </a>
              <div>
                <h4 className="text-base sm:text-lg font-black text-gray-950">Henotic Diagnostics</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-sm font-black text-gray-900">4.9</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gray-600">(1,062 Google reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={GOOGLE_BUSINESS_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs border border-purple-200/80 transition shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                <span>Verified Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-purple-700" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Slider Controls */}
      <div className="flex items-center justify-between gap-4 mb-4 px-2">
        <span className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Verified Patient Experiences
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAutoPlaying(prev => !prev)}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-gray-200/80 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center gap-1 shadow-sm"
          >
            {isAutoPlaying ? <Pause className="w-3 h-3 text-purple-600" /> : <Play className="w-3 h-3 text-purple-600" />}
            <span className="hidden sm:inline">{isAutoPlaying ? 'Auto' : 'Pause'}</span>
          </button>
          <button
            type="button"
            onClick={prevSlide}
            className="p-1.5 rounded-lg bg-white border border-gray-200/80 text-gray-700 hover:bg-gray-50 transition active:scale-95 shadow-sm"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="p-1.5 rounded-lg bg-white border border-gray-200/80 text-gray-700 hover:bg-gray-50 transition active:scale-95 shadow-sm"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards Track */}
      <div 
        ref={sliderRef}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="relative overflow-hidden py-1"
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
          }}
        >
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              style={{ width: `${100 / cardsPerView}%` }}
              className="shrink-0 px-2 sm:px-3"
            >
              <article className="h-full bg-white/95 backdrop-blur-md rounded-3xl border border-gray-200/70 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between text-gray-900">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-100">
                      {item.service}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(item.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-xs sm:text-sm leading-relaxed italic mb-4 font-normal text-gray-700">
                    “{item.quote}”
                  </blockquote>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <CompactAvatarImage src={item.image} name={item.name} />
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">{item.name}</h5>
                      <span className="text-[10px] text-gray-500 font-medium">Google Verified</span>
                    </div>
                  </div>
                  <a
                    href={GOOGLE_BUSINESS_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition"
                    title="Verified review"
                  >
                    <img
                      src="https://storage.googleapis.com/wp-media-henoticbucket/Google%20Trust%20Symbols/google-g-logo.webp"
                      alt="Google G"
                      className="w-4 h-4 object-contain"
                    />
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-5">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            type="button"
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              currentIndex === idx ? "w-6 bg-purple-600" : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
