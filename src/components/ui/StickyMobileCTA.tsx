"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';

/**
 * 📱 Sticky Mobile CTA Bar
 * Shows a floating "Book Now" bar at the bottom of mobile screens.
 * Auto-hides when user is near the booking form section.
 */
export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (dismissed) return;
      const scrollY = window.scrollY;
      const bookingSection = document.getElementById('booking');
      
      // Show after scrolling 400px, hide near booking section
      if (bookingSection) {
        const bookingTop = bookingSection.getBoundingClientRect().top + scrollY;
        const nearBooking = Math.abs(window.scrollY + window.innerHeight - bookingTop) < 300;
        setVisible(scrollY > 400 && !nearBooking);
      } else {
        setVisible(scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden">
      <div className="bg-gradient-to-r from-[#4568dc] to-[#b06ab3] px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.2)] border-t border-white/20">
        <div className="flex-1">
          <div className="text-white font-black text-sm leading-tight">Book Your Scan Now</div>
          <div className="text-white/70 text-[10px] font-bold">Same-day reports • NABL certified</div>
        </div>
        <a
          href="#booking"
          className="flex items-center gap-1.5 bg-white text-[#4568dc] font-black text-sm px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all shrink-0"
        >
          <Calendar size={14} /> Book Now
        </a>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/60 hover:text-white p-1 shrink-0"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
