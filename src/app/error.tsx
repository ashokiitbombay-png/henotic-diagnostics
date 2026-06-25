"use client";

import React, { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an analytics or error tracking service
    console.error("Global app error caught by boundary:", error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-slate-50 font-sans px-4 py-20 mt-[80px]">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-full -z-10"></div>
        
        {/* Error Icon */}
        <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-pink-200">
          <AlertCircle size={32} />
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight">
          Something went wrong
        </h1>
        
        <p className="text-slate-600 font-semibold mb-8 text-sm md:text-base leading-relaxed">
          We encountered an unexpected error while loading this page. Our team has been notified.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold px-6 py-4 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <RotateCcw size={16} /> Try Again
          </button>
          <Link
            href="/"
            className="flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold px-6 py-4 rounded-xl transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
