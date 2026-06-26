"use client";

import React from 'react';

/**
 * 📱 Unified Floating Contact Widgets
 * Clean WhatsApp + Call Now buttons using SVG icons.
 * Positioned bottom-right, stacked vertically.
 */
export default function WhatsAppWidget() {
  const phoneNumber = "918879327184";
  const message = encodeURIComponent("Hi! I'd like to book a diagnostic test at Henotic Diagnostics.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  const callUrl = `tel:+${phoneNumber}`;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[90] flex flex-col gap-3 items-center">

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative"
      >
        {/* Glow ring */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20"></div>

        {/* Button */}
        <div className="relative w-14 h-14 md:w-[60px] md:h-[60px] bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://storage.googleapis.com/wp-media-henoticbucket/SVG%20files%20/whatsapp.svg"
            alt="WhatsApp"
            width={30}
            height={30}
            className="w-[28px] h-[28px] md:w-[30px] md:h-[30px]"
          />
        </div>

        {/* Tooltip (desktop only) */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg hidden md:block">
          Chat with us
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900"></div>
        </div>
      </a>

      {/* Call Now Button */}
      <a
        href={callUrl}
        aria-label="Call Now"
        className="group relative"
      >
        {/* Button */}
        <div className="relative w-14 h-14 md:w-[60px] md:h-[60px] bg-[#2563eb] rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.6)] transition-all duration-300 hover:scale-110 animate-[pulse_2s_infinite] hover:animate-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://storage.googleapis.com/wp-media-henoticbucket/SVG%20files%20/call.svg"
            alt="Call Now"
            width={28}
            height={28}
            className="w-[26px] h-[26px] md:w-[28px] md:h-[28px]"
          />
        </div>

        {/* Tooltip (desktop only) */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg hidden md:block">
          Call us
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900"></div>
        </div>
      </a>

    </div>
  );
}
