import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund and Returns Policy | Henotic Diagnostics",
  description: "Learn about the refund and return options for bookings, health check packages, and physical device rentals at Henotic Diagnostics.",
  alternates: {
    canonical: "https://www.henoticdiagnostics.com/refund-returns"
  }
};

export default function RefundReturns() {
  return (
    <main className="min-h-screen bg-slate-50 mt-[80px] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 rounded-[2rem] p-8 md:p-12 text-white mb-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <h1 className="text-3xl md:text-5xl font-black relative z-10 tracking-tight">Refund and Returns Policy</h1>
          <p className="text-blue-200 mt-2 relative z-10 font-bold text-sm">Effective Date: June 19, 2026</p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-200 text-slate-700 text-base md:text-lg leading-relaxed font-medium space-y-8">
          
          <section>
            <p>
              Thank you for trusting Henotic Diagnostics. We strive to provide transparent, flexible, and stress-free refund and return options. This policy provides a comprehensive overview of how we handle prepaid test cancellations, adjustments, and returns of temporary monitoring equipment or health kits.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">1. Booking Refunds for Cancelled Tests</h2>
            <p>
              If you cancel a booking or if a diagnostic service cannot be completed, you are fully covered:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Pre-test Cancellation:</strong> 100% full refund is issued back to the patient. We do not charge cancellation fees.</li>
              <li><strong>Failed Home Collection:</strong> In rare cases where a blood sample cannot be successfully drawn, or if a phlebotomist collection attempt fails, we will issue a full refund immediately.</li>
              <li><strong>Processing Window:</strong> Online refunds are initiated automatically and take approximately <strong>5 to 7 business days</strong> to reflect in your original payment source (bank account, credit/debit card, or digital wallet).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">2. Returns of Physical Diagnostic Equipment</h2>
            <p>
              Certain cardiac and diagnostic services involve renting or using portable medical equipment (such as Holter monitors or ambulatory blood pressure monitors):
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Security Deposits:</strong> If a security deposit was collected for the device, the deposit is refunded 100% immediately upon the safe return of the equipment.</li>
              <li><strong>Collection Services:</strong> Our phlebotomists or technical agents will visit your home to safely detach and collect the device once the test period is completed.</li>
              <li><strong>Hygiene and Sanitation:</strong> All returned equipment goes through a strict medical-grade sanitization process before being tested and prepared for the next patient.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">3. Unused Pathology Collection Kits</h2>
            <p>
              If you purchased self-collection kits or specialized container tubes and decide not to perform the test, you can return the unused, unopened kits to any Henotic Diagnostics branch within <strong>14 days of purchase</strong> for a full refund or exchange.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">4. Help and Resolution Desk</h2>
            <p>To request a refund, report a billing issue, or arrange a device return, please contact our helpdesk:</p>
            <div className="mt-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm text-slate-600 font-bold">
              <p className="text-slate-900 font-black text-base">Henotic Diagnostics Accounts & Support Desk</p>
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
