"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Star,
  ShieldCheck,
  MapPin,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CalendarCheck,
  CheckCircle2,
  Sparkles,
  Award,
} from "lucide-react";
import { PATIENT_REVIEWS, GOOGLE_RATING_SUMMARY, type PatientReview } from "@/config/patient-reviews";

const FILTER_TABS = [
  { id: "all", label: "🌟 All Reviews (1,240+)" },
  { id: "video", label: "🎬 Video Stories" },
  { id: "mri-ct", label: "🧲 3.0T MRI & CT" },
  { id: "pet-ct", label: "🧬 PET-CT Oncology" },
  { id: "pathology", label: "🩸 Pathology & Lab" },
  { id: "health-package", label: "🩺 Health Packages" },
];

export default function GoogleReviews() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  const filteredReviews = PATIENT_REVIEWS.filter((r) => {
    if (activeTab === "all") return true;
    return r.category === activeTab;
  });

  const handleOpenBooking = (service?: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-booking-modal", { detail: { service: service || "mri-scan" } })
      );
    }
  };

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-slate-50/70 relative overflow-hidden">
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 py-1 px-4 rounded-full bg-blue-100 text-blue-900 font-extrabold text-xs tracking-widest uppercase mb-4 shadow-sm border border-blue-200">
            <Award size={13} className="text-blue-600" /> Patient Feedback & Social Proof
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 drop-shadow-sm tracking-tight">
            Trusted by 1,00,000+ Patients in Mumbai & Navi Mumbai
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Real experiences from patients who visited our Kharghar, Panvel, and Vashi centers, or
            used our home blood collection service.
          </p>
        </div>

        {/* ── Main Trust Summary Card ─────────────────────────────── */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-100 p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-12 transition-transform duration-500 hover:-translate-y-1">
          {/* Left: Building Image & Google Badge */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-blue-600 rounded-3xl transform rotate-2 opacity-10 transition-transform duration-500 group-hover:rotate-4 blur-md" />
            <Image
              width={600}
              height={320}
              src="https://cdn.henoticdiagnostics.com/Front%20Office/henotic-diagnostics-main-building.webp"
              alt="Henotic Diagnostics Main Building Facility"
              className="relative z-10 w-full h-60 sm:h-72 object-cover rounded-3xl border-4 border-white shadow-xl"
              loading="lazy"
              quality={80}
            />

            {/* Google Verified Float Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 z-20 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
              <Image
                width={40}
                height={40}
                src="https://cdn.henoticdiagnostics.com/ICONS-SYMBOLS/Google.webp"
                alt="Google Rating"
                className="w-10 h-10 object-contain"
                loading="lazy"
              />
              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-black text-slate-900 leading-tight">
                  4.9★ (1,240+ Reviews)
                </p>
              </div>
            </div>
          </div>

          {/* Right: Key Quality Statistics */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-3 mb-3">
              <Image
                width={36}
                height={36}
                src="https://cdn.henoticdiagnostics.com/ICONS-SYMBOLS/Google.webp"
                alt="Google"
                className="w-9 h-9 object-contain"
                loading="lazy"
              />
              <h3 className="text-2xl font-black text-slate-800">
                Henotic Diagnostics Review Score
              </h3>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl font-black text-slate-900 tracking-tight">
                {GOOGLE_RATING_SUMMARY.rating}
              </span>
              <div className="text-left">
                <div className="flex gap-1 mb-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-bold text-slate-500">
                  Based on <strong>{GOOGLE_RATING_SUMMARY.totalReviews}</strong> authentic patient reviews
                </p>
              </div>
            </div>

            {/* Quality Badges Grid */}
            <div className="grid grid-cols-2 gap-3 w-full mb-6 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-700">99.4% On-Time Reports</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2">
                <ShieldCheck size={16} className="text-blue-600 shrink-0" />
                <span className="font-bold text-slate-700">100% NABL Accredited</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2">
                <Sparkles size={16} className="text-purple-600 shrink-0" />
                <span className="font-bold text-slate-700">Zero Claustrophobia Bore</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2">
                <MapPin size={16} className="text-rose-600 shrink-0" />
                <span className="font-bold text-slate-700">Kharghar • Panvel • Vashi</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleOpenBooking()}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
              >
                <CalendarCheck size={14} /> Book Scan / Test Online
              </button>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors inline-flex items-center gap-1.5"
              >
                View on Google Maps <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Category Filter Tabs ─────────────────────────────────── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Reviews Cards Grid ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: User avatar + Verified Pill */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
                      {rev.avatarText || rev.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                        {rev.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                        <MapPin size={11} className="text-slate-400" />
                        {rev.locality}
                      </p>
                    </div>
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                      <CheckCircle2 size={10} /> Verified
                    </span>
                  )}
                </div>

                {/* Video Testimonial Preview (if available) */}
                {rev.videoThumbnail && (
                  <div
                    onClick={() =>
                      setActiveVideo({
                        url: rev.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ",
                        title: `${rev.name}'s Experience with ${rev.service}`,
                      })
                    }
                    className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 group cursor-pointer border border-slate-200 shadow-sm"
                  >
                    <Image
                      src={rev.videoThumbnail}
                      alt={`${rev.name} review`}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/95 text-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play size={20} className="fill-blue-600 ml-0.5" />
                      </div>
                    </div>
                    {rev.videoDuration && (
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-bold">
                        {rev.videoDuration}
                      </span>
                    )}
                  </div>
                )}

                {/* Rating Stars + Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold">{rev.date}</span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                  "{rev.text}"
                </p>
              </div>

              {/* Service Tag & Booking Link */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg truncate max-w-[200px]">
                  {rev.service}
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenBooking(rev.service)}
                  className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors"
                >
                  Book Scan →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Video Player Modal ─────────────────────────────────────── */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-white/10">
              <h4 className="text-sm font-extrabold truncate">{activeVideo.title}</h4>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white"
                aria-label="Close video"
              >
                <X size={16} />
              </button>
            </div>
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`${activeVideo.url}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
