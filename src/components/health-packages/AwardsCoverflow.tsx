"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, ExternalLink, X } from 'lucide-react';
import { AWARDS_DATA, AwardData, EXACT_SPECTRUM_CSS } from '@/config/health-packages';

export default function AwardsCoverflow() {
  const [activeAwardIndex, setActiveAwardIndex] = useState(2);
  const [isAwardAutoplay, setIsAwardAutoplay] = useState(true);
  const [selectedAward, setSelectedAward] = useState<AwardData | null>(null);
  const awardAutoplayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAwardAutoplay || selectedAward !== null) return;
    awardAutoplayRef.current = setInterval(() => {
      setActiveAwardIndex((prev) => (prev + 1) % AWARDS_DATA.length);
    }, 4500);
    return () => {
      if (awardAutoplayRef.current) clearInterval(awardAutoplayRef.current);
    };
  }, [isAwardAutoplay, selectedAward]);

  return (
    <>
      <section aria-label="Awards and Recognitions" className="relative rounded-3xl overflow-hidden py-10 px-4 sm:px-6 lg:px-8 border border-white/80 shadow-[0_16px_40px_rgba(0,0,0,0.04)] bg-gradient-to-b from-white/90 via-white/80 to-white/95 backdrop-blur-xl text-gray-900">
        <div className="relative z-10 flex flex-col items-center mb-8 text-center max-w-4xl mx-auto">
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-purple-200/80 shadow-sm mb-4">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-purple-800">
              Spectrum Excellence
            </span>
            <div
              className="w-24 sm:w-36 h-2 rounded-full shadow-inner border border-purple-200"
              style={{ background: EXACT_SPECTRUM_CSS }}
            />
            <span className="text-[10px] font-bold text-purple-900 uppercase tracking-widest bg-purple-100/70 px-2 py-0.5 rounded-full">
              Accredited
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-950">
            Awards & National Recognitions
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 max-w-lg mx-auto font-medium leading-relaxed">
            Excellence in diagnostic benchmark standards and healthcare service delivery across Maharashtra.
          </p>
        </div>

        {/* Coverflow Viewport */}
        <div 
          className="w-full relative flex flex-col items-center"
          onMouseEnter={() => setIsAwardAutoplay(false)}
          onMouseLeave={() => setIsAwardAutoplay(true)}
        >
          {/* Nav Arrows */}
          <button
            type="button"
            onClick={() => {
              setIsAwardAutoplay(false);
              setActiveAwardIndex((prev) => (prev === 0 ? AWARDS_DATA.length - 1 : prev - 1));
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-2xl bg-white/90 hover:bg-white text-gray-800 border border-gray-200/80 shadow-md backdrop-blur-xl transition active:scale-95"
            aria-label="Previous Award"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAwardAutoplay(false);
              setActiveAwardIndex((prev) => (prev + 1) % AWARDS_DATA.length);
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-2xl bg-white/90 hover:bg-white text-gray-800 border border-gray-200/80 shadow-md backdrop-blur-xl transition active:scale-95"
            aria-label="Next Award"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* 3D Track */}
          <div 
            className="w-full h-[360px] sm:h-[420px] relative flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {AWARDS_DATA.map((award, index) => {
              const offset = index - activeAwardIndex;
              const absOffset = Math.abs(offset);
              const translateX = offset * 210;
              const translateZ = -absOffset * 180;
              const rotateY = offset * -28;
              let opacity = 1;
              let scale = 1 - absOffset * 0.12;
              let zIndex = 30 - absOffset * 10;

              if (absOffset > 2) {
                opacity = 0;
                scale = 0.55;
                zIndex = 0;
              }
              const isActive = index === activeAwardIndex;

              return (
                <div
                  key={award.id}
                  onClick={() => {
                    if (isActive) setSelectedAward(award);
                    else setActiveAwardIndex(index);
                  }}
                  className="absolute cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity
                  }}
                >
                  <div 
                    className={`relative w-[230px] sm:w-[280px] rounded-3xl p-3 sm:p-4 transition-all ${
                      isActive
                        ? "bg-white/95 border-2 border-purple-300 shadow-[0_20px_45px_rgba(108,108,246,0.18)] ring-4 ring-purple-100/60"
                        : "bg-white/75 border border-gray-200/70 shadow-sm opacity-80"
                    }`}
                  >
                    <div className="relative overflow-hidden rounded-2xl p-2 bg-gradient-to-b from-purple-50/60 to-pink-50/40 border border-purple-100/60">
                      <div className="relative w-full h-[220px] sm:h-[260px] flex items-center justify-center">
                        <img
                          src={award.image}
                          alt={`${award.title} Award Certificate`}
                          className="w-full h-full object-contain filter drop-shadow-sm"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                        {award.category} • {award.year}
                      </span>
                      <h4 className="text-sm font-bold text-gray-900 truncate mt-0.5">
                        {award.title}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2 mt-4 z-20">
            {AWARDS_DATA.map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => {
                  setIsAwardAutoplay(false);
                  setActiveAwardIndex(i);
                }}
                className={`transition-all duration-300 rounded-full ${
                  activeAwardIndex === i
                    ? "w-8 h-2 bg-gradient-to-r from-purple-600 to-pink-600 shadow-sm"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Award slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Podium Citation Box */}
          <div className="mt-6 max-w-xl w-full mx-auto text-center px-5 py-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-100 shadow-sm">
            <div className="inline-flex items-center gap-1.5 text-xs text-purple-800 font-semibold mb-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
              <span>Verified: {AWARDS_DATA[activeAwardIndex].organization}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {AWARDS_DATA[activeAwardIndex].description}
            </p>
          </div>
        </div>
      </section>

      {/* Award Modal */}
      {selectedAward && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
          onClick={() => setSelectedAward(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-gradient-to-b from-[#241038]/95 via-[#1b0a2e]/95 to-[#10061e]/95 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-white/25 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedAward(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-black/60 text-pink-200 hover:text-white transition border border-white/20"
              aria-label="Close award modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="relative bg-[#0d061c] p-4 rounded-2xl border border-white/20 flex items-center justify-center shadow-inner">
                <img
                  src={selectedAward.image}
                  alt={selectedAward.title}
                  className="max-h-[350px] w-auto object-contain rounded-lg"
                />
              </div>

              <div className="flex flex-col justify-center space-y-3 text-left text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-pink-300">
                  {selectedAward.category} • {selectedAward.year}
                </span>
                <h4 className="text-2xl font-black">{selectedAward.title}</h4>
                <p className="text-xs text-slate-300 font-semibold">{selectedAward.organization}</p>
                <p className="text-xs text-pink-100/90 leading-relaxed pt-1">
                  {selectedAward.description}
                </p>
                <div className="pt-3">
                  <a
                    href={selectedAward.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-bold text-xs shadow-md border border-white/30"
                    style={{ background: EXACT_SPECTRUM_CSS }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open High-Res Certificate</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
