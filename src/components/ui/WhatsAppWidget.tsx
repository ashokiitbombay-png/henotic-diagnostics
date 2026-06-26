"use client";

import React from 'react';

/* Inline SVGs — zero network fetches, instant render */
const WhatsAppSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" className="w-[26px] h-[26px] md:w-[28px] md:h-[28px] drop-shadow-md">
    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.13 6.742 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.336 22.594c-.39 1.1-1.932 2.012-3.182 2.278-.856.18-1.974.324-5.738-1.234-4.816-1.994-7.912-6.878-8.152-7.196-.232-.318-1.934-2.578-1.934-4.916s1.224-3.486 1.658-3.964c.434-.478.95-.598 1.266-.598.316 0 .63.004.906.016.29.014.68-.11 1.064.812.39.94 1.328 3.242 1.444 3.478.116.236.194.512.038.83-.156.318-.234.516-.468.796-.234.278-.492.622-.702.834-.234.236-.478.492-.206.964.274.472 1.216 2.006 2.61 3.25 1.792 1.6 3.304 2.096 3.774 2.33.47.234.746.196 1.02-.118.274-.316 1.178-1.374 1.492-1.846.316-.472.63-.39 1.064-.234.434.156 2.748 1.296 3.218 1.532.47.236.784.354.9.55.116.194.116 1.138-.274 2.236z"/>
  </svg>
);

const CallSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-[24px] h-[24px] md:w-[26px] md:h-[26px] drop-shadow-md">
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
  </svg>
);

/**
 * 📱 Floating Contact Widgets — WhatsApp + Call Now
 * 🟢 WhatsApp — green circle with pulse animation + hover tooltip
 * 🔵 Call Now — blue circle with gentle pulse + hover tooltip
 * Uses inline SVGs (zero network requests, instant render)
 */
export default function WhatsAppWidget() {
  const phoneNumber = "918879327184";
  const message = encodeURIComponent("Hi! I'd like to book a diagnostic test at Henotic Diagnostics.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  const callUrl = `tel:+${phoneNumber}`;

  return (
    <div className="fixed bottom-[76px] md:bottom-6 right-3 md:right-6 z-[90] flex flex-col gap-3 items-center">

      {/* 🟢 WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative block"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/20 animate-[pulse_2s_ease-in-out_infinite] pointer-events-none" />
        <div className="relative w-[54px] h-[54px] md:w-[60px] md:h-[60px] bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-110 ring-2 ring-white/30">
          <WhatsAppSVG />
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#1a1a2e] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl hidden md:block">
          Chat on WhatsApp
          <span className="absolute left-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-l-[#1a1a2e]" />
        </span>
      </a>

      {/* 🔵 Call Now */}
      <a
        href={callUrl}
        aria-label="Call Now"
        className="group relative block"
      >
        <span className="absolute -inset-1 rounded-full bg-[#2563eb]/25 animate-[pulse_2.5s_ease-in-out_infinite] pointer-events-none" />
        <div className="relative w-[54px] h-[54px] md:w-[60px] md:h-[60px] bg-[#2563eb] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,99,235,0.5)] hover:shadow-[0_6px_30px_rgba(37,99,235,0.7)] transition-all duration-300 hover:scale-110 ring-2 ring-white/30">
          <CallSVG />
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#1a1a2e] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl hidden md:block">
          Call Us Now
          <span className="absolute left-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-l-[#1a1a2e]" />
        </span>
      </a>

    </div>
  );
}
