'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'henotic-cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        setVisible(true);
        // Trigger slide-up animation on next frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimateIn(true);
          });
        });
      }
    } catch {
      // localStorage unavailable (SSR / private browsing)
    }
  }, []);

  const acceptAndClose = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {
      // silently fail
    }
    setAnimateIn(false);
    // Wait for exit animation before unmounting
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-[60px] md:bottom-0 left-0 right-0 z-[9999] flex justify-center px-4 pb-4 transition-transform duration-300 ease-out ${
        animateIn ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl p-5 shadow-2xl">
        {/* Close button */}
        <button
          onClick={acceptAndClose}
          aria-label="Close cookie banner"
          className="absolute top-3 right-3 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          {/* Icon + Text */}
          <div className="flex items-start gap-3 pr-6 sm:pr-0">
            <div className="mt-0.5 flex-shrink-0 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-2">
              <Cookie className="h-5 w-5 text-blue-400" />
            </div>
            <p className="text-sm leading-relaxed text-slate-200">
              We use cookies to enhance your experience and analyze site traffic.
              By continuing, you consent to our use of cookies.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-shrink-0 items-center gap-3">
            <Link
              href="/privacy"
              className="rounded-lg border border-slate-500/50 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-400 hover:text-white"
            >
              Manage
            </Link>
            <button
              onClick={acceptAndClose}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/25"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
