"use client";

import React from 'react';

/**
 * 📱 Floating Contact Widgets — WhatsApp + Call Now
 * Clean, non-overlapping design.
 * Mobile: sits above the StickyMobileCTA bar (bottom-[76px]).
 * Desktop: sits at bottom-right corner (bottom-6).
 */
export default function WhatsAppWidget() {
  const phoneNumber = "918879327184";
  const message = encodeURIComponent("Hi! I'd like to book a diagnostic test at Henotic Diagnostics.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  const callUrl = `tel:+${phoneNumber}`;

  return (
    <div className="fixed bottom-[76px] md:bottom-6 right-3 md:right-6 z-[90] flex flex-col gap-2.5 items-center">

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative block"
      >
        <div className="w-[52px] h-[52px] md:w-[58px] md:h-[58px] bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://storage.googleapis.com/wp-media-henoticbucket/SVG%20files%20/whatsapp.svg"
            alt="WhatsApp"
            width={28}
            height={28}
            className="w-[26px] h-[26px] md:w-[28px] md:h-[28px]"
          />
        </div>
        <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg hidden md:block">
          WhatsApp
        </span>
      </a>

      {/* Call Now */}
      <a
        href={callUrl}
        aria-label="Call Now"
        className="group relative block"
      >
        <div className="w-[52px] h-[52px] md:w-[58px] md:h-[58px] bg-[#2563eb] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(37,99,235,0.45)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.6)] transition-all duration-300 hover:scale-110">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://storage.googleapis.com/wp-media-henoticbucket/SVG%20files%20/call.svg"
            alt="Call Now"
            width={26}
            height={26}
            className="w-[24px] h-[24px] md:w-[26px] md:h-[26px]"
          />
        </div>
        <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg hidden md:block">
          Call Us
        </span>
      </a>

    </div>
  );
}
