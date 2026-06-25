"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  slides: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
}

export default function Carousel({ slides, autoPlay = false, interval = 5000 }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const prev = () => {
    setCurrent(curr => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrent(curr => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (autoPlay) {
      resetTimeout();
      timeoutRef.current = setTimeout(next, interval);
    }
    return () => {
      resetTimeout();
    };
  }, [current, autoPlay, interval]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden group rounded-[2rem] border border-white shadow-lg bg-slate-100">
      
      {/* Slider viewport */}
      <div 
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="w-full shrink-0 min-w-full">
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation arrows (hidden on mobile, visible on desktop hover) */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white text-slate-800 rounded-full flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white text-slate-800 rounded-full flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Index indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${current === idx ? 'bg-blue-600 w-6' : 'bg-slate-400/50'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
