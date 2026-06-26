"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Users, X } from 'lucide-react';

const PROOFS = [
  { count: 12, service: "MRI Scan", location: "Kharghar" },
  { count: 8, service: "CT Scan", location: "Panvel" },
  { count: 15, service: "Blood Test", location: "Vashi" },
  { count: 6, service: "2D Echo", location: "Nerul" },
  { count: 9, service: "PET CT", location: "Thane" },
  { count: 11, service: "Ultrasound", location: "Pune" },
  { count: 7, service: "Full Body Checkup", location: "Kalamboli" },
  { count: 5, service: "Mammography", location: "CBD Belapur" },
  { count: 10, service: "ECG", location: "Dombivli" },
  { count: 4, service: "DEXA Scan", location: "Kamothe" },
];

/**
 * 🔔 Social Proof Notifications
 * Shows rotating "X people booked Y in Z today" popups.
 * Appears every 15 seconds, auto-dismisses after 5 seconds.
 */
export default function SocialProofNotification() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const showNext = useCallback(() => {
    if (dismissed) return;
    setCurrent(prev => (prev + 1) % PROOFS.length);
    setVisible(true);
    setTimeout(() => setVisible(false), 5000);
  }, [dismissed]);

  useEffect(() => {
    // First appearance after 8 seconds
    const initialTimer = setTimeout(showNext, 8000);
    // Then every 20 seconds
    const interval = setInterval(showNext, 20000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [showNext]);

  if (dismissed) return null;

  const proof = PROOFS[current];

  return (
    <div
      className={`fixed bottom-24 md:bottom-6 left-4 md:left-6 z-[80] transition-all duration-500 ${
        visible
          ? 'translate-x-0 opacity-100'
          : '-translate-x-full opacity-0'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-slate-100 p-4 pr-10 max-w-[320px] relative">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-slate-300 hover:text-slate-500 transition-colors"
          aria-label="Dismiss notifications"
        >
          <X size={14} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
            <Users size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 leading-tight">
              {proof.count} people booked <span className="text-blue-600">{proof.service}</span>
            </p>
            <p className="text-[11px] text-slate-400 font-bold mt-0.5">
              in {proof.location} today • Verified
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
