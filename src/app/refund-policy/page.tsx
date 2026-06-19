import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Henotic Diagnostics",
  description: "Read the Henotic Diagnostics refund guidelines for diagnostic bookings and prepaid pathology investigations.",
  alternates: {
    canonical: "https://www.henoticdiagnostics.com/refund-policy"
  }
};

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-slate-50 mt-[80px] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 rounded-[2rem] p-8 md:p-12 text-white mb-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <h1 className="text-3xl md:text-5xl font-black relative z-10 tracking-tight">Refund Policy</h1>
          <p className="text-blue-200 mt-2 relative z-10 font-bold text-sm">Effective Date: June 19, 2026</p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-200 text-slate-700 text-base md:text-lg leading-relaxed font-medium space-y-8">
          
          <section>
            <p>
              At Henotic Diagnostics, we believe that billing and refunds should be as stress-free as possible. If a diagnostic procedure cannot be performed or if you choose to cancel a booking, we provide simple, no-hassle refunds.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">1. Eligibility for Refunds</h2>
            <p>Refunds are initiated under the following conditions:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Pre-test Booking Cancellations:</strong> If you cancel a prepaid booking prior to the test being performed (except for Nuclear Medicine scans cancelled with less than 24-hours notice).</li>
              <li><strong>Failed Collections / Technical Failures:</strong> In the rare event that a home collection cannot be completed successfully or a technical equipment failure at our center prevents the scan from being conducted.</li>
              <li><strong>Overpayments:</strong> Any accidental double payments or billing adjustments will be refunded immediately.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">2. Non-Refundable Scenarios</h2>
            <p>
              Once a diagnostic test is completed and reports are delivered, the service is considered successfully rendered, and the invoice amount is non-refundable. 
            </p>
            <p className="mt-4">
              If you have queries or feel the clinical values require clarification, we will gladly arrange a <strong>free re-run of the sample</strong> at our certified labs to verify the results, but a billing refund cannot be issued.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">3. Refund Processing Timelines</h2>
            <p>
              Once a refund request is approved, our accounts team will initiate the transfer back to your original source of payment:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Net Banking / Debit / Credit Cards:</strong> 5 to 7 business days (varies by banking institution).</li>
              <li><strong>Digital Wallets / UPI:</strong> Usually processed within 24 to 48 hours.</li>
              <li><strong>Cash Payments:</strong> Cash refunds can be collected instantly from our main Kharghar center.</li>
            </ul>
          </section>

          <section className="pt-6 border-t border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-4">4. Reach Our Billing Support</h2>
            <p>For any billing, transaction, or refund status queries, please reach out to our team:</p>
            <div className="mt-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm text-slate-600 font-bold">
              <p className="text-slate-900 font-black text-base">Henotic Diagnostics Accounts Desk</p>
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
