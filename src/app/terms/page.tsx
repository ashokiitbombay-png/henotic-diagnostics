import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Henotic Diagnostics",
  description: "Terms and conditions for utilizing Henotic Diagnostics services, including bookings, cancellations, and clinical report delivery.",
  alternates: {
    canonical: "https://www.henoticdiagnostics.com/terms"
  }
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-slate-50 mt-[80px] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 rounded-[2rem] p-8 md:p-12 text-white mb-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <h1 className="text-3xl md:text-5xl font-black relative z-10 tracking-tight">Terms of Service</h1>
          <p className="text-blue-200 mt-2 relative z-10 font-bold text-sm">Effective Date: June 19, 2026</p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-200 text-slate-700 text-base md:text-lg leading-relaxed font-medium space-y-8">
          
          <section>
            <p>
              Welcome to Henotic Diagnostics. We operate as a licensed diagnostic center based in Kharghar, Navi Mumbai, and provide an online platform for booking diagnostic services at our licensed partner networks across Mumbai, Navi Mumbai, Western Suburbs, Eastern Suburbs, Central Mumbai, and South Mumbai.
            </p>
            <p className="mt-4">
              By accessing our website, booking diagnostic services, or scheduling home sample collections, you agree to these Terms of Service. We prioritize patient care and convenience; therefore, our terms are designed to be flexible and patient-friendly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">1. Diagnostic Bookings and Services</h2>
            <p>We facilitate bookings for a comprehensive range of health checkups and diagnostic investigations:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Imaging Services:</strong> Sonography, ultrasound, CT scan, MRI scan, PET scan, and DEXA bone scans.</li>
              <li><strong>Cardiac Diagnostics:</strong> 2D Echo, TMT, Holter monitoring, angiography, and angioplasty.</li>
              <li><strong>Women’s Health:</strong> Pregnancy sonography, obstetric ultrasound, anomaly scan, NT scan, color doppler, mammography, follicular study, and prenatal NIPT/NIPS tests.</li>
              <li><strong>Pathology & Lab Tests:</strong> Blood tests, urine tests, home sample collection, and complete health packages.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">2. Patient-Centric Booking and Cancellations</h2>
            <p>
              We understand that plans can change, especially when dealing with health concerns. We strive to offer the most accommodating policy:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Standard Tests & Scans:</strong> There are no cancellation fees. You may cancel or reschedule your standard blood tests, ultrasound, ECG, or X-ray at any time prior to the test.</li>
              <li><strong>Home Collections:</strong> If you need to cancel a home sample collection, please let us know as soon as possible so we can notify our phlebotomist.</li>
              <li><strong>Nuclear Medicine Exemption:</strong> For specialized scans requiring custom-ordered radiotracers (e.g. PET-CT scans, bone scans, thyroid scans), a minimum of <strong>24-hour notice</strong> is required for cancellation or rescheduling. This is due to the extremely short half-life and high cost of radiotracers, which cannot be stored or reused.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">3. Partner Labs and Service Delivery</h2>
            <p>
              Henotic Diagnostics collaborates with a network of licensed partner laboratories and radiology centers. We verify the credentials of all partner centers to ensure accurate clinical results. Digital reports are delivered directly via secure channels (such as WhatsApp, Email, or patient portal), and physical copies can be requested at our centers. Turnaround times (TAT) are estimates, and we strive to expedite critical results.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">4. Patient Consent & Medical Records</h2>
            <p>
              By booking a test, you consent to our certified technicians or phlebotomists performing the selected procedures (including blood draws or imaging). We upload diagnostic results to our secure Google Cloud Storage (GCS) to ensure you have lifetime access to your medical history, protected by standard security protocols.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">5. Fetal Medicine and Legal Compliance</h2>
            <p className="bg-rose-50 border-l-4 border-rose-500 p-4 text-rose-800 rounded-r-xl font-bold text-sm">
              In absolute compliance with the Pre-Conception and Pre-Natal Diagnostic Techniques (PCPNDT) Act, Henotic Diagnostics and its partner networks strictly prohibit and do not perform pre-natal sex determination. Any attempt to request sex determination is a criminal offense and will be reported to regulatory authorities immediately.
            </p>
          </section>

          <section className="pt-6 border-t border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-4">6. Contact and Inquiries</h2>
            <p>If you have any questions or feedback regarding these terms, please contact our administrative center: </p>
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