"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { INFRASTRUCTURE_LIST } from '@/config/health-packages';

export default function InfrastructureSlider() {
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

  const maxIndex = Math.max(0, INFRASTRUCTURE_LIST.length - cardsPerView);

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
    }, 3800);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section aria-label="Laboratory Diagnostic Infrastructure" className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/60 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            World-Class Diagnostic Facility
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">
            Laboratory Infrastructure
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Equipped with fully automated biochemistry analyzers, strict temperature controls, and patient comfort bays.
          </p>
        </div>

        {/* Slider Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setIsAutoPlaying(prev => !prev)}
            className="px-2.5 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold hover:bg-gray-50 transition flex items-center gap-1 shadow-sm text-gray-700"
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-purple-600" /> : <Play className="w-3.5 h-3.5 text-purple-600" />}
            <span className="hidden sm:inline">{isAutoPlaying ? 'Auto' : 'Play'}</span>
          </button>
          <button
            type="button"
            onClick={prevSlide}
            className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 transition active:scale-95 shadow-sm"
            aria-label="Previous facility photo"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 transition active:scale-95 shadow-sm"
            aria-label="Next facility photo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Infrastructure Track */}
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
          {INFRASTRUCTURE_LIST.map((item, idx) => (
            <div 
              key={idx}
              style={{ width: `${100 / cardsPerView}%` }}
              className="shrink-0 px-2 sm:px-3"
            >
              <div className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={`${item.title} - Henotic Diagnostics Infrastructure`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/70 text-white backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-center">
                  <h4 className="font-bold text-sm text-gray-900 group-hover:text-purple-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infrastructure Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-5">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            type="button"
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              currentIndex === idx ? "w-6 bg-purple-600" : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Facility slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
