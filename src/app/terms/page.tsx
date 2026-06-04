import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Henotic Diagnostics",
  description: "Terms and conditions for utilizing Henotic Diagnostics services.",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white mt-[80px] py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-slate-500 font-medium">Last Updated: June 2026</p>
        </div>
        
        <div className="space-y-8 text-slate-700 text-lg leading-relaxed font-medium">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing the Henotic Diagnostics website, booking an appointment, or utilizing any of our diagnostic services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please refrain from using our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Appointment Booking & Cancellations</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Appointments booked via our official portal, phone, or WhatsApp are subject to availability.</li>
              <li>Please carry a valid government ID and your doctor's prescription (mandatory for specific imaging scans like MRI, CT, and Pregnancy Ultrasound).</li>
              <li>Cancellations or rescheduling should ideally be done at least 12 hours prior to the scheduled slot.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Report Delivery</h2>
            <p>While we strive to deliver reports within the stated turnaround time (e.g., 12-24 hours for standard blood tests), exact delivery times may vary due to technical complexities, necessary re-runs, or unforeseen delays. Henotic Diagnostics is not liable for indirect consequences arising from delayed reports.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Payments and Refunds</h2>
            <p>Payment for diagnostic services is collected prior to or at the time of the test. In the event a test cannot be completed due to technical failures on our end, a full refund will be initiated to the original payment source within 5-7 business days.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. PCPNDT Compliance</h2>
            <p className="bg-rose-50 border-l-4 border-rose-500 p-4 text-rose-800 rounded-r-xl">
              <strong>Strict Warning:</strong> Determination of fetal sex is illegal and strictly prohibited under the PCPNDT Act in India. Henotic Diagnostics does not conduct or entertain any requests for sex determination under any circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Limitation of Liability</h2>
            <p>Diagnostic reports are meant to aid certified medical practitioners in diagnosis and treatment. They are not a substitute for professional medical consultation. Henotic Diagnostics shall not be held liable for any misinterpretation of reports by the patient or self-medication based on the test results.</p>
          </section>
        </div>
      </div>
    </main>
  );
}