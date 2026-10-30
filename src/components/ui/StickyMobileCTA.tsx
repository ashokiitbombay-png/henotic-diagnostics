"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, CalendarCheck, Percent } from 'lucide-react';

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.25 7.15C9.07 7.15 8.77 7.22 8.52 7.49C8.27 7.76 7.55 8.44 7.55 9.81C7.55 11.18 8.55 12.5 8.69 12.69C8.83 12.87 10.65 15.68 13.44 16.88C15.76 17.89 16.23 17.68 16.73 17.64C17.23 17.59 18.34 16.98 18.57 16.33C18.8 15.68 18.8 15.12 18.73 15.01C18.66 14.89 18.48 14.83 18.21 14.69C17.94 14.56 16.61 13.9 16.36 13.81C16.11 13.72 15.93 13.68 15.75 13.95C15.57 14.22 15.05 14.83 14.89 15.01C14.73 15.2 14.57 15.22 14.3 15.08C14.03 14.95 13.16 14.66 12.13 13.74C11.32 13.02 10.78 12.13 10.62 11.86C10.46 11.59 10.6 11.44 10.74 11.31C10.86 11.19 11.01 11 11.15 10.84C11.29 10.68 11.33 10.57 11.42 10.38C11.51 10.2 11.47 10.04 11.4 9.91C11.33 9.77 10.78 8.44 10.55 7.9C10.33 7.37 10.1 7.45 9.93 7.44C9.77 7.44 9.59 7.44 9.41 7.44L9.25 7.15Z" />
    </svg>
  );
}

/**
 * 📱 High-Converting Mobile Bottom Action Dock
 * Visible exclusively on mobile devices (<768px) when user scrolls down.
 * Features 4 high-value actions:
 * 1. 📞 Call Desk (24/7 Hotline)
 * 2. 💬 WhatsApp (Instant chat)
 * 3. 🏷️ Pricing & Cost Estimator (Save 30-50%)
 * 4. 📅 Book Scan (Opens Multi-Step Interactive Booking Modal with Rx Upload)
 */
export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 160);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const phoneTel = "tel:08879327184";
  const whatsappUrl = "https://wa.me/918879327184?text=Hello%20Henotic%20Diagnostics%2C%20I%20would%20like%20to%20inquire%20about%20a%20diagnostic%20scan%20or%20blood%20test%20appointment.";

  const handleOpenBooking = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: { service: 'mri-scan' } }));
    }
  };

  return (
    <div 
      role="region"
      aria-label="Mobile quick action navigation"
      className="fixed bottom-0 left-0 right-0 z-[100] md:hidden animate-in slide-in-from-bottom duration-300"
    >
      <div className="bg-slate-900/95 backdrop-blur-2xl px-3 py-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(0,0,0,0.35)] border-t border-white/15">
        <div className="flex items-center justify-between gap-1.5 max-w-md mx-auto">
          
          {/* 1. CALL DESK */}
          <a
            href={phoneTel}
            className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 active:scale-95 transition-all text-center"
            aria-label="Call Henotic 24/7 Helpline"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-0.5">
              <Phone size={16} />
            </div>
            <span className="text-[10px] font-extrabold leading-tight">Call 24/7</span>
          </a>

          {/* 2. WHATSAPP */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 active:scale-95 transition-all text-center"
            aria-label="Chat with clinical desk on WhatsApp"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-0.5">
              <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-[10px] font-extrabold leading-tight">WhatsApp</span>
          </a>

          {/* 3. PRICING & COST ESTIMATOR */}
          <Link
            href="/pricing"
            className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 active:scale-95 transition-all text-center relative"
            aria-label="View diagnostic pricing and savings"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center mb-0.5">
              <Percent size={15} />
            </div>
            <span className="text-[10px] font-extrabold leading-tight">Prices</span>
            <span className="absolute -top-1 right-2 text-[8px] font-black px-1 rounded-full bg-emerald-500 text-white leading-tight">
              -50%
            </span>
          </Link>

          {/* 4. INSTANT BOOK SCAN (PRIMARY CTA - OPENS MULTI-STEP MODAL) */}
          <button
            type="button"
            onClick={handleOpenBooking}
            className="flex-[1.4] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 text-white font-black text-xs shadow-lg shadow-blue-500/30 active:scale-95 transition-all cursor-pointer border border-white/20"
            aria-label="Book appointment"
          >
            <CalendarCheck size={16} className="shrink-0" />
            <span className="truncate">Book Scan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
