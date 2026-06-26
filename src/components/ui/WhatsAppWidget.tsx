"use client";

import React from 'react';
import Image from 'next/image';

/**
 * 💬 WhatsApp Chat Widget
 * Floating WhatsApp button for instant patient communication.
 * Shows on all pages, positioned bottom-right (above sticky CTA on mobile).
 */
export default function WhatsAppWidget() {
  const phoneNumber = "918879327184";
  const message = encodeURIComponent("Hi! I'd like to book a diagnostic test at Henotic Diagnostics.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[90] group"
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20"></div>
        
        {/* Main button */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110">
          <Image
            src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/whatsapp-icon-white.webp"
            alt="WhatsApp"
            width={32}
            height={32}
            className="w-7 h-7 md:w-8 md:h-8 object-contain"
          />
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg hidden md:block">
          Chat with us
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900"></div>
        </div>
      </div>
    </a>
  );
}
