import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Disclaimer | Henotic Diagnostics",
  description: "Read the medical and clinical service disclaimers for Henotic Diagnostics including PCPNDT Act compliance guidelines.",
  alternates: {
    canonical: "https://www.henoticdiagnostics.com/medical-disclaimer"
  }
};

export default function MedicalDisclaimer() {
  return (
    <main className="min-h-screen bg-slate-50 mt-[80px] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 rounded-[2rem] p-8 md:p-12 text-white mb-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <h1 className="text-3xl md:text-5xl font-black relative z-10 tracking-tight">Medical Disclaimer</h1>
          <p className="text-blue-200 mt-2 relative z-10 font-bold text-sm">Effective Date: June 19, 2026</p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-200 text-slate-700 text-base md:text-lg leading-relaxed font-medium space-y-8">
          
          <section>
            <p className="text-slate-900 font-bold">
              Important: Please review this disclaimer carefully before relying on any report or services provided by Henotic Diagnostics or its partner networks.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">1. Not a Substitute for Professional Medical Advice</h2>
            <p>
              The clinical reports, laboratory values, imaging scans, and interpretation sheets delivered by Henotic Diagnostics and partner facilities are designed to assist certified medical practitioners (such as your doctor or physician) in formulating a clinical diagnosis. 
            </p>
            <p className="mt-4">
              These reports are <strong>not</strong> a substitute for professional medical consultation, diagnosis, or clinical evaluation. A patient should never self-diagnose, self-medicate, or alter any ongoing treatment plans based solely on the raw lab or imaging results.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">2. Clinical Variations and Re-runs</h2>
            <p>
              Biological parameters can fluctuate based on diet, stress, time of day, active medications, or fasting status. In case any laboratory value appears abnormal or inconsistent with your clinical symptoms, your referring doctor may recommend a clinical re-run or alternative test. Henotic Diagnostics facilitates testing under strict quality control standards, but minor variations can occur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">3. Strict Compliance with the PCPNDT Act</h2>
            <p className="bg-rose-50 border-l-4 border-rose-500 p-4 text-rose-800 rounded-r-xl font-bold text-sm">
              Pre-Natal Diagnostic Techniques Compliance: In absolute accordance with Indian federal law (PCPNDT Act), determination or disclosure of the sex of a fetus is strictly illegal and a punishable offense. 
            </p>
            <p className="mt-4">
              Neither Henotic Diagnostics nor any of its partner imaging networks perform sex determination under any circumstances. All obstetric and pregnancy ultrasounds (NT scans, anomaly scans, growth scans, and color doppler studies) are conducted solely to monitor fetal health and development.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">4. Limitation of Medical Liability</h2>
            <p>
              Henotic Diagnostics, its administration, technicians, phlebotomists, and partner networks are not liable for any clinical actions, diagnostics errors made by external clinics, or treatments prescribed by third-party doctors who utilize our reports. The responsibility for final clinical diagnosis and patient treatment rests solely with your consulting medical practitioner.
            </p>
          </section>

          <section className="pt-6 border-t border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-4">5. Contact and Inquiries</h2>
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm text-slate-600 font-bold">
              <p className="text-slate-900 font-black text-base">Henotic Diagnostics Administrative Center</p>
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
