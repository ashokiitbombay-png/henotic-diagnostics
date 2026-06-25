import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return Policy | Henotic Diagnostics",
  description: "Read about returning diagnostic monitoring equipment and self-collection pathology kits to Henotic Diagnostics.",
  alternates: {
    canonical: "https://www.henoticdiagnostics.com/return-policy"
  }
};

export default function ReturnPolicy() {
  return (
    <main className="min-h-screen bg-slate-50 mt-[80px] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 rounded-[2rem] p-8 md:p-12 text-white mb-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <h1 className="text-3xl md:text-5xl font-black relative z-10 tracking-tight">Return Policy</h1>
          <p className="text-blue-200 mt-2 relative z-10 font-bold text-sm">Effective Date: June 19, 2026</p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-200 text-slate-700 text-base md:text-lg leading-relaxed font-medium space-y-8">
          
          <section>
            <p>
              This policy explains the guidelines for returning diagnostic equipment (rented or assigned for cardiac/vital monitoring) and unused pathological collection containers to Henotic Diagnostics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">1. Rental / Ambulatory Diagnostic Devices</h2>
            <p>
              For advanced diagnostics, patients are fitted with portable clinical devices to monitor vital signs over a designated duration (e.g. 24 hours to 7 days):
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Devices:</strong> Holter monitors, Ambulatory Blood Pressure Monitoring (ABPM) systems, and portable sleep study units.</li>
              <li><strong>Detachment & Return:</strong> Once the prescribed test period finishes, a technician or collection coordinator will visit your home to safely detach the sensors and collect the device. Alternatively, you can drop off the device at our Kharghar center.</li>
              <li><strong>Damage:</strong> Patients are requested to handle monitoring devices with care. Standard wear-and-tear or minor adhesive peeling is fully expected and is not penalized.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">2. Unused Pathology Sample Kits</h2>
            <p>
              If you purchase a pathology sample collection kit (such as saliva collection, stool containers, or special preservation tube kits) and choose not to perform the test:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>You may return the unused and completely sealed kit within <strong>14 days of purchase</strong>.</li>
              <li>Returns must be accompanied by the original receipt or proof of billing.</li>
              <li>Unsealed or opened sample kits cannot be returned due to sterile safety and contamination risk regulations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">3. Sanitization and Device Testing</h2>
            <p>
              Every monitoring device undergoes rigorous medical-grade sanitization using specialized anti-pathogen solutions upon return. A technical team then verifies calibration before redeploying the device to ensure patient safety and data accuracy.
            </p>
          </section>

          <section className="pt-6 border-t border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-4">4. Support & Logistics Helpdesk</h2>
            <p>To schedule a device pick-up or inquire about returned equipment, please contact us:</p>
            <div className="mt-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm text-slate-600 font-bold">
              <p className="text-slate-900 font-black text-base">Henotic Diagnostics Logistics Desk</p>
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
