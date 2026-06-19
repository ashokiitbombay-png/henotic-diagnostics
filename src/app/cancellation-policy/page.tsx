import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation Policy | Henotic Diagnostics",
  description: "Learn about the booking cancellation guidelines for Henotic Diagnostics services, including flexible rules and exceptions.",
  alternates: {
    canonical: "https://www.henoticdiagnostics.com/cancellation-policy"
  }
};

export default function CancellationPolicy() {
  return (
    <main className="min-h-screen bg-slate-50 mt-[80px] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 rounded-[2rem] p-8 md:p-12 text-white mb-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <h1 className="text-3xl md:text-5xl font-black relative z-10 tracking-tight">Cancellation Policy</h1>
          <p className="text-blue-200 mt-2 relative z-10 font-bold text-sm">Effective Date: June 19, 2026</p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-200 text-slate-700 text-base md:text-lg leading-relaxed font-medium space-y-8">
          
          <section>
            <p>
              At Henotic Diagnostics, patient convenience and health are our top priorities. We understand that medical schedules, health conditions, or personal plans can change suddenly. That is why we maintain a highly flexible and patient-centric cancellation policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">1. Standard Diagnostic & Pathology Tests</h2>
            <p>
              For all standard pathology tests, blood tests, urine collection, ECGs, normal sonography, and general doctor bookings, we offer a <strong>cancel-at-any-time policy with zero fees</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>No cancellation fees will ever be charged for these bookings.</li>
              <li>You may reschedule or cancel your appointment at any time before the service is completed.</li>
              <li>If you have prepaid online, a full refund will be processed back to your original payment method.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">2. Nuclear Medicine Exception (24-Hour Notice)</h2>
            <p className="bg-amber-50 border-l-4 border-amber-500 p-4 text-amber-900 rounded-r-xl font-bold text-sm">
              Please Note: Nuclear Medicine scans (including PET-CT scans, thyroid scans, bone scans, and cardiac perfusion scans) require custom-ordered radiopharmaceuticals (tracers) manufactured specifically for your scheduled slot. Due to the extremely short radioactive half-life of these tracers, they cannot be stored or reused. 
            </p>
            <p className="mt-4">
              We request that any cancellation or rescheduling of Nuclear Medicine procedures be communicated at least <strong>24 hours prior</strong> to the appointment time to avoid wastage of these highly specialized materials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">3. Home Sample Collection Cancellations</h2>
            <p>
              If you have scheduled a home sample collection and need to cancel or reschedule, please inform us as soon as possible. If our phlebotomist has already reached your location, we will still happily reschedule the appointment for another convenient time without any penalty.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">4. How to Cancel or Reschedule</h2>
            <p>You can cancel or reschedule your booking through any of the following channels:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Calling our primary helpline at <strong>088793 27184</strong> or secondary line at <strong>09372853584</strong>.</li>
              <li>Sending a message to us on WhatsApp.</li>
              <li>Logging into your patient account on our official portal.</li>
            </ul>
          </section>

          <section className="pt-6 border-t border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-4">5. Contact and Administrative Information</h2>
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm text-slate-600 font-bold">
              <p className="text-slate-900 font-black text-base">Henotic Diagnostics Support Center</p>
              <p>Address: Second floor, Millennium Empire, Business Park, Plot No 47, D Mart Rd, Sector 15, Kharghar, Panvel, Maharashtra 410210</p>
              <p>Primary Phone: 088793 27184</p>
              <p>Secondary Phone: 09372853584</p>
              <p>Email: henoticdiagnostics@gmail.com</p>
              <p>Hours: Open 24 hours</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
