"use client";

import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import Link from 'next/link';

/**
 * 📱 Sticky Mobile CTA Bar
 * Fixed at bottom of mobile screens only.
 * "Book Now" links to /contact#booking appointment form.
 * Height: 68px — floating widgets sit above this.
 */
export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden">
      <div className="bg-gradient-to-r from-[#1e1b4b] to-[#312e81] px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] border-t border-white/10">
        <div className="flex-1 min-w-0">
          <p className="text-white font-black text-[13px] leading-tight truncate">Book Your Scan Now</p>
          <p className="text-indigo-300 text-[10px] font-bold truncate">Same-day reports • NABL certified</p>
        </div>
        <Link
          href="/contact#booking"
          className="flex items-center gap-1.5 bg-gradient-to-r from-[#4568dc] to-[#b06ab3] text-white font-black text-sm px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all shrink-0 border border-white/20"
        >
          <Calendar size={14} /> Book Now
        </Link>
      </div>
    </div>
  );
}
