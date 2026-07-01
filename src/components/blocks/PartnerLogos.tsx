"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Network, Shield, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const allPartners = [
  { name: "Apollo Hospitals", logo: "/media-cdn/Partners-Logos/apollo-hospitals.webp" },
  { name: "White Lotus International Hospital", logo: "/media-cdn/Partners-Logos/white-lotus-nternational-hospital.webp" },
  { name: "Nuclear Healthcare", logo: "/media-cdn/Partners-Logos/nuclear-healthcare.webp" },
  { name: "MPCT Hospital", logo: "/media-cdn/Partners-Logos/mpct-hospital.webp" },
  { name: "Medicover Hospital", logo: "/media-cdn/Partners-Logos/medicover-hospital.webp" },
  { name: "Agarwal Diagnostics", logo: "/media-cdn/Partners-Logos/agarwal-diagnostics.webp" },
  { name: "WeCare Diagnostics", logo: "/media-cdn/Partners-Logos/wecare-diagnostics.webp" },
  { name: "Polaris Hospitals", logo: "/media-cdn/Partners-Logos/polaris-hopsital.webp" },
  { name: "Neuberg Diagnostics", logo: "/media-cdn/Partners-Logos/neuberg-diagnostics-logo.webp" },
  { name: "NDC Diagnostics", logo: "/media-cdn/Partners-Logos/ndc-diagnostics.webp" },
  { name: "Medcare", logo: "/media-cdn/Partners-Logos/medcare.webp" },
  { name: "Lotus Panvel", logo: "/media-cdn/Partners-Logos/lotus-panvel-ct-mri-scan.webp" },
  { name: "Heart Mate", logo: "/media-cdn/Partners-Logos/heart-mate-logo.webp" },
  { name: "General Diagnostics", logo: "/media-cdn/Partners-Logos/general-diagnostics.webp" },
];

export default function PartnerLogos() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Responsive: items visible per view
  const getVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return 5;
    if (window.innerWidth < 640) return 2;
    if (window.innerWidth < 768) return 3;
    if (window.innerWidth < 1024) return 4;
    return 5;
  }, []);

  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const update = () => setVisibleCount(getVisibleCount());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [getVisibleCount]);

  const totalSlides = Math.ceil(allPartners.length / visibleCount);
  const maxIdx = totalSlides - 1;

  const scrollToIdx = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(idx, maxIdx));
    setActiveIdx(clamped);
    const cardWidth = el.scrollWidth / allPartners.length;
    el.scrollTo({ left: clamped * visibleCount * cardWidth, behavior: "smooth" });
  }, [maxIdx, visibleCount]);

  const next = useCallback(() => {
    setActiveIdx((prev) => {
      const n = prev >= maxIdx ? 0 : prev + 1;
      scrollToIdx(n);
      return n;
    });
  }, [maxIdx, scrollToIdx]);

  const prev = useCallback(() => {
    setActiveIdx((prev) => {
      const n = prev <= 0 ? maxIdx : prev - 1;
      scrollToIdx(n);
      return n;
    });
  }, [maxIdx, scrollToIdx]);

  // Auto-play at fixed speed
  useEffect(() => {
    if (isPaused) return;
    autoPlayRef.current = setInterval(() => {
      next();
    }, 3000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, next]);

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ═══ SINGLE UNIFIED CONTAINER ═══ */}
        <div
          className="rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_-15px_rgba(99,102,241,0.3),0_10px_40px_-10px_rgba(219,39,119,0.15)] relative"
          style={{ background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 40%, #a855f7 70%, #db2777 100%)" }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white/5 filter blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-white/5 filter blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          <div className="relative z-10 p-6 sm:p-10 md:p-14 lg:p-16">

            {/* ── TEXT CONTENT AREA ── */}
            <div className="text-center mb-12 md:mb-14">
              {/* Badge */}
              <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] text-white/90 border border-white/20 bg-white/10 backdrop-blur-md shadow-lg mb-6">
                <Network size={16} className="text-white" /> Licensed Partner Networks
              </span>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white text-center max-w-5xl mx-auto mb-6 tracking-tight leading-[1.1] drop-shadow-lg">
                Trusted Licensed Partner Networks
              </h2>

              {/* Description */}
              <p className="text-white/85 font-medium text-base sm:text-lg md:text-xl text-center max-w-4xl mx-auto leading-relaxed mb-8">
                Beyond our in-house facility in Kharghar, Henotic Diagnostics provides a seamless online
                platform to book advanced medical imaging and specialized tests. Through our curated network
                of licensed and accredited partner centers across Mumbai and Navi Mumbai, you gain convenient
                access to world-class MRI, CT, PET scans, cardiac evaluations, and prenatal diagnostics.
                We ensure every partner facility meets the highest standards of accuracy, safety, and patient care.
              </p>

              {/* Trust Highlights */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
                {[
                  { icon: Shield, text: "Accredited Partners" },
                  { icon: MapPin, text: "Mumbai & Navi Mumbai" },
                  { icon: Network, text: "14+ Partner Centers" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
                    <item.icon size={16} className="text-white/80" />
                    <span className="text-white/90 text-xs sm:text-sm font-bold">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── PARTNER LOGOS CAROUSEL — WHITE BACKGROUND ── */}
            <div
              className="bg-white rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {/* Arrow — Left */}
              <button
                type="button"
                onClick={prev}
                aria-label="Previous partners"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-slate-200 hover:border-indigo-400 shadow-lg hover:shadow-xl flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Arrow — Right */}
              <button
                type="button"
                onClick={next}
                aria-label="Next partners"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-slate-200 hover:border-indigo-400 shadow-lg hover:shadow-xl flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <ChevronRight size={22} />
              </button>

              {/* Carousel Track */}
              <div className="overflow-hidden mx-8 sm:mx-12">
                <div
                  ref={scrollRef}
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${activeIdx * 100}%)`,
                    width: `${totalSlides * 100}%`,
                  }}
                >
                  {/* Render slides */}
                  {Array.from({ length: totalSlides }).map((_, slideIdx) => (
                    <div
                      key={slideIdx}
                      className="flex justify-center gap-4 sm:gap-6 md:gap-8 shrink-0 px-2"
                      style={{ width: `${100 / totalSlides}%` }}
                    >
                      {allPartners
                        .slice(slideIdx * visibleCount, slideIdx * visibleCount + visibleCount)
                        .map((partner, i) => (
                          <div
                            key={i}
                            className="flex-1 max-w-[180px] sm:max-w-[200px] aspect-[3/2] flex items-center justify-center p-4 sm:p-5 rounded-2xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-[0_12px_35px_-8px_rgba(99,102,241,0.25)] hover:scale-105 transition-all duration-300 cursor-pointer group"
                          >
                            <Image
                              src={partner.logo}
                              alt={partner.name}
                              title={partner.name}
                              width={180}
                              height={120}
                              className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:drop-shadow-lg"
                            />
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Navigation */}
              <div className="flex justify-center gap-2.5 mt-6 sm:mt-8">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToIdx(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      i === activeIdx
                        ? "w-8 sm:w-10 h-3 sm:h-3.5 shadow-md"
                        : "w-3 sm:w-3.5 h-3 sm:h-3.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                    style={
                      i === activeIdx
                        ? { background: "linear-gradient(to right, #3b82f6, #6366f1, #db2777)" }
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
