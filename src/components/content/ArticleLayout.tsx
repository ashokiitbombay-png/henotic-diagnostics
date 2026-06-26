import React from "react";
import Link from "next/link";
import { Calendar, Activity, CheckCircle2, Shield } from "lucide-react";

interface ArticleLayoutProps {
  /** The main article content (WordPress rendered blocks, etc.) */
  children: React.ReactNode;
  /** Display name of the service (used in headings & CTA copy) */
  serviceName: string;
  /** URL-safe slug for the service (used in link construction) */
  serviceSlug: string;
  /** Optional location name for geo-targeted pages */
  locationName?: string;
  /** Optional region name for breadcrumb / contextual copy */
  regionName?: string;
  /** Optional custom sidebar — falls back to a "Why Choose Us" card */
  sidebar?: React.ReactNode;
}

/**
 * ArticleLayout
 * ---
 * A premium, reusable wrapper that arranges CMS content with a sticky
 * sidebar, contextual hero stripe, and conversion-focused CTA banner.
 *
 * Used by `ServiceTemplate` and `LocationTemplate` to ensure visual
 * consistency across all content-driven pages.
 *
 * This is a React Server Component — no `"use client"` directive.
 */
export default function ArticleLayout({
  children,
  serviceName,
  serviceSlug,
  locationName,
  regionName,
  sidebar,
}: ArticleLayoutProps) {
  /* ---------- derived values ---------- */
  const contextLabel = locationName
    ? `${serviceName} in ${locationName}`
    : serviceName;

  const subtitleText = regionName
    ? `Premium diagnostic services across ${regionName}`
    : "Trusted by thousands — NABL & ISO accredited diagnostics";

  /* ================================================================== */
  return (
    <article className="relative">
      {/* ──────────────────────────────────────────────────────────────
          1. FULL-WIDTH GRADIENT HERO STRIPE
      ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 py-16 md:py-24">
        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 right-10 h-72 w-72 rounded-full bg-blue-500 opacity-20 mix-blend-screen blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-15%] left-[-5%] h-56 w-56 rounded-full bg-[#b06ab3] opacity-25 mix-blend-screen blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[30%] top-[60%] h-40 w-40 rounded-full bg-[#4568dc] opacity-15 mix-blend-screen blur-2xl"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          {/* Breadcrumb / accent pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-blue-200 backdrop-blur-sm">
            <Activity size={14} className="shrink-0" />
            {locationName ? locationName : "Diagnostic Services"}
          </div>

          <h1 className="max-w-3xl text-4xl font-black capitalize leading-tight tracking-tight text-white drop-shadow-md md:text-5xl lg:text-6xl">
            {contextLabel}
          </h1>

          <p className="mt-4 max-w-2xl text-lg font-medium text-blue-200/80 md:text-xl">
            {subtitleText}
          </p>

          {/* Glassmorphism stat bar */}
          <div className="mt-8 inline-flex flex-wrap items-center gap-6 rounded-2xl border border-white/15 bg-white/10 px-6 py-3 backdrop-blur-md">
            <span className="flex items-center gap-2 text-sm font-bold text-white/90">
              <Shield size={16} className="text-emerald-300" />
              NABL Accredited
            </span>
            <span className="hidden h-5 w-px bg-white/20 sm:block" />
            <span className="flex items-center gap-2 text-sm font-bold text-white/90">
              <CheckCircle2 size={16} className="text-emerald-300" />
              ISO 15189 Certified
            </span>
            <span className="hidden h-5 w-px bg-white/20 sm:block" />
            <span className="flex items-center gap-2 text-sm font-bold text-white/90">
              <Activity size={16} className="text-sky-300" />
              Same-Day Reports
            </span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          2. TWO-COLUMN GRID  (2/3 content + 1/3 sidebar)
      ────────────────────────────────────────────────────────────── */}
      <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* ─── Left: Main content area ─── */}
          <div className="lg:col-span-2">
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] md:p-12">
              {/* Decorative corner accent */}
              <div
                aria-hidden="true"
                className="absolute -right-6 -top-6 h-36 w-36 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 opacity-80 transition-transform duration-700 group-hover:scale-125"
              />

              {/* Content heading */}
              <h2 className="relative z-10 mb-8 flex items-center gap-4 border-b border-slate-100 pb-6 text-3xl font-black text-slate-900 md:text-4xl">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                  <Activity size={24} />
                </span>
                About {serviceName}
              </h2>

              {/* The actual CMS / child content */}
              <div className="relative z-10 wp-content-wrapper space-y-6 text-lg font-medium leading-relaxed text-slate-700">
                {children}
              </div>
            </div>
          </div>

          {/* ─── Right: Sticky sidebar ─── */}
          <div className="lg:col-span-1">
            <div className="sticky top-[100px]">
              {sidebar ?? <DefaultSidebar locationName={locationName} />}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          3. FULL-WIDTH CTA BANNER
      ────────────────────────────────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-7xl px-4 md:px-8">
        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-indigo-900 to-blue-900 p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] md:p-12">
          {/* Background decorative elements */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[#b06ab3] opacity-20 mix-blend-screen blur-3xl transition-transform duration-700 group-hover:translate-x-4 group-hover:translate-y-4"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-[#4568dc] opacity-25 mix-blend-screen blur-3xl transition-transform duration-700 group-hover:-translate-x-4 group-hover:-translate-y-4"
          />

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div className="max-w-xl text-center sm:text-left">
              <h3 className="text-2xl font-black text-white md:text-3xl">
                Ready to book your {serviceName}?
              </h3>
              <p className="mt-2 text-base font-medium text-blue-200/80">
                Get priority booking through our secure portal. Same-day
                appointments available
                {locationName ? ` in ${locationName}` : ""}.
              </p>
            </div>

            <Link
              href="/contact#booking"
              className="group/btn inline-flex shrink-0 items-center gap-3 rounded-2xl bg-white px-8 py-4 text-lg font-black text-blue-700 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.35)]"
            >
              <Calendar
                size={22}
                className="transition-transform duration-300 group-hover/btn:scale-110"
              />
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

/* ====================================================================
   DEFAULT SIDEBAR — rendered when no custom `sidebar` prop is provided.
   Mirrors the "Why Choose Us" card used across location pages.
==================================================================== */
function DefaultSidebar({ locationName }: { locationName?: string }) {
  const locationCopy = locationName ?? "your area";

  return (
    <div className="group/card relative overflow-hidden rounded-3xl border-4 border-white bg-gradient-to-br from-[#4568dc] to-[#b06ab3] p-8 text-white shadow-[0_40px_80px_-20px_rgba(176,106,179,0.45)] transition-transform duration-500 hover:-translate-y-2 md:p-10">
      {/* Glassmorphism sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white opacity-10 blur-2xl"
      />

      <h3 className="mb-6 text-2xl font-black drop-shadow-md">
        Why Choose Us{locationName ? ` in ${locationName}` : ""}?
      </h3>

      <ul className="mb-10 space-y-5">
        {[
          "Zero waiting time with prior booking",
          "Reports delivered directly via WhatsApp",
          "NABL & ISO accredited precision",
          "Free consultation on reports",
        ].map((item) => (
          <li
            key={item}
            className="flex items-start gap-4 font-bold text-white/90"
          >
            <CheckCircle2
              size={22}
              className="mt-0.5 shrink-0 text-white drop-shadow"
            />
            {item}
          </li>
        ))}
      </ul>

      <Link
        href="/contact#booking"
        className="block w-full rounded-2xl bg-white py-4 text-center text-lg font-black text-blue-600 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.2)] transition-all hover:scale-[1.02] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.3)]"
      >
        Book Your Slot Now
      </Link>

      <p className="mt-4 text-center text-sm font-bold text-white/70">
        Priority service for {locationCopy} patients.
      </p>
    </div>
  );
}
