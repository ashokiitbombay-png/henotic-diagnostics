"use client";

import dynamic from "next/dynamic";

/**
 * 🛡️ Client Booking Section — Hydration-safe wrapper for BookingForm.
 * Next.js 16 Turbopack disallows `{ ssr: false }` in Server Components,
 * so this Client Component handles the dynamic import with SSR disabled.
 */
const BookingForm = dynamic(() => import("@/components/forms/BookingForm"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-slate-100 rounded-2xl h-[400px] flex items-center justify-center">
      <p className="text-slate-400 font-bold">Loading booking form...</p>
    </div>
  ),
});

export default function ClientBookingForm() {
  return <BookingForm />;
}
