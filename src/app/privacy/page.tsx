import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Henotic Diagnostics",
  description: "Privacy policy and patient data protection guidelines for Henotic Diagnostics.",
  alternates: {
    canonical: "https://www.henoticdiagnostics.com/privacy"
  }
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-slate-50 mt-[80px] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 rounded-[2rem] p-8 md:p-12 text-white mb-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <h1 className="text-3xl md:text-5xl font-black relative z-10 tracking-tight">Privacy Policy</h1>
          <p className="text-blue-200 mt-2 relative z-10 font-bold text-sm">Effective Date: June 19, 2026</p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-200 text-slate-700 text-base md:text-lg leading-relaxed font-medium space-y-8">
          
          <section>
            <p>
              Welcome to Henotic Diagnostics. We function as a licensed diagnostic center in Kharghar, Navi Mumbai, and as an online booking platform for licensed partner centers across Mumbai and Navi Mumbai. Protecting your medical and personal data is our primary commitment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">1. Information Collection and Consent</h2>
            <p>We collect personal and medical details required to schedule, perform, and deliver your diagnostic testing:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Patient Identity:</strong> Name, age, gender, contact number, email, and address.</li>
              <li><strong>Clinical Parameters:</strong> Doctor prescriptions, clinical history, and symptom descriptions.</li>
              <li><strong>Payment Information:</strong> Transaction tokens processed through encrypted gateway partners.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">2. Patient-Centric Data Usage</h2>
            <p>Your personal data is used solely to facilitate your care:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Configuring diagnostics appointments at our center or partner laboratories.</li>
              <li>Delivering pathology and radiology results directly to you via secure WhatsApp or Email.</li>
              <li>Dispatched phlebotomists for home collections.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">3. Data Protection and GCS Security</h2>
            <p>
              All digital records, medical imaging files (MRI, CT, PET, Ultrasound), and diagnostic lab reports are stored on secure, encrypted Google Cloud Storage (GCS) instances. These servers employ 256-bit encryption during transit and at rest, protecting patient files against unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">4. Sharing and Disclosure Policy</h2>
            <p>We believe in absolute transparency and never sell or monetize your healthcare data:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Partner Laboratories:</strong> Shared only when necessary to process tests booked at certified diagnostic networks.</li>
              <li><strong>Ref Practitioner:</strong> Shared with your referring doctor only at your request.</li>
              <li><strong>Regulatory Mandate:</strong> Shared where legally required (e.g. reporting mandatory infectious diseases or complying with PCPNDT pregnancy scan regulations).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">5. Fetal Medicine & Legal Compliance</h2>
            <p className="bg-rose-50 border-l-4 border-rose-500 p-4 text-rose-800 rounded-r-xl font-bold text-sm">
              All prenatal ultrasound procedures, anomaly scans, and genetic screenings are strictly subject to local medical guidelines and the PCPNDT Act. Sex determination is illegal, prohibited, and never performed under any circumstance.
            </p>
          </section>

          <section className="pt-6 border-t border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-4">6. Contact and Grievances</h2>
            <p>For questions or requests regarding your data rights, please contact our administrative center: </p>
            <div className="mt-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm text-slate-600 font-bold">
              <p className="text-slate-900 font-black text-base">Henotic Diagnostics</p>
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