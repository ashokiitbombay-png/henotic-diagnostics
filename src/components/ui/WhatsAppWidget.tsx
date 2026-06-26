"use client";

import React from 'react';

/**
 * 📱 Floating Contact Widgets — WhatsApp + Call Now
 * 🟢 WhatsApp — green circle with pulse animation + hover tooltip
 * 🔵 Call Now — blue circle with gentle pulse + hover tooltip
 */
export default function WhatsAppWidget() {
  const phoneNumber = "918879327184";
  const message = encodeURIComponent("Hi! I'd like to book a diagnostic test at Henotic Diagnostics.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  const callUrl = `tel:+${phoneNumber}`;

  return (
    <div className="fixed bottom-[76px] md:bottom-6 right-3 md:right-6 z-[90] flex flex-col gap-3 items-center">

      {/* 🟢 WhatsApp — Green Pulse */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative block"
      >
        {/* Outer pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        {/* Secondary glow ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/20 animate-[pulse_2s_ease-in-out_infinite]" />

        {/* Main button */}
        <div className="relative w-[54px] h-[54px] md:w-[60px] md:h-[60px] bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-110 ring-2 ring-white/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://storage.googleapis.com/wp-media-henoticbucket/SVG%20files%20/whatsapp.svg"
            alt="WhatsApp"
            width={28}
            height={28}
            className="w-[26px] h-[26px] md:w-[28px] md:h-[28px] drop-shadow-md"
          />
        </div>

        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#1a1a2e] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl hidden md:block">
          Chat on WhatsApp
          <span className="absolute left-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-l-[#1a1a2e]" />
        </span>
      </a>

      {/* 🔵 Call Now — Blue Gentle Pulse */}
      <a
        href={callUrl}
        aria-label="Call Now"
        className="group relative block"
      >
        {/* Gentle outer pulse */}
        <span className="absolute -inset-1 rounded-full bg-[#2563eb]/25 animate-[pulse_2.5s_ease-in-out_infinite]" />

        {/* Main button */}
        <div className="relative w-[54px] h-[54px] md:w-[60px] md:h-[60px] bg-[#2563eb] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,99,235,0.5)] hover:shadow-[0_6px_30px_rgba(37,99,235,0.7)] transition-all duration-300 hover:scale-110 ring-2 ring-white/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://storage.googleapis.com/wp-media-henoticbucket/SVG%20files%20/call.svg"
            alt="Call Now"
            width={26}
            height={26}
            className="w-[24px] h-[24px] md:w-[26px] md:h-[26px] drop-shadow-md"
          />
        </div>

        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#1a1a2e] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl hidden md:block">
          Call Us Now
          <span className="absolute left-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-l-[#1a1a2e]" />
        </span>
      </a>

    </div>
  );
}
