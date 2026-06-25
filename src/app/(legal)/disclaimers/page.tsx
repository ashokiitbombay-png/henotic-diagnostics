import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "General Disclaimers | Henotic Diagnostics",
  description: "General disclaimers and portal terms for services provided by Henotic Diagnostics and partner networks.",
  alternates: {
    canonical: "https://www.henoticdiagnostics.com/disclaimers"
  }
};

export default function Disclaimers() {
  return (
    <main className="min-h-screen bg-slate-50 mt-[80px] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 rounded-[2rem] p-8 md:p-12 text-white mb-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <h1 className="text-3xl md:text-5xl font-black relative z-10 tracking-tight">General Disclaimers</h1>
          <p className="text-blue-200 mt-2 relative z-10 font-bold text-sm">Effective Date: June 19, 2026</p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-200 text-slate-700 text-base md:text-lg leading-relaxed font-medium space-y-8">
          
          <section>
            <p>
              The information and services provided on the Henotic Diagnostics portal and our official channels are designed to help patients access premium diagnostic care. Please read these disclaimers to understand the nature and limits of the services offered.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">1. Web Portal & Booking Platform Service</h2>
            <p>
              Henotic Diagnostics functions as a licensed physical diagnostic center in Kharghar, Navi Mumbai, and as an online booking and information platform. The online booking system links patients to our certified, licensed partner diagnostic laboratories and imaging networks across Mumbai, Navi Mumbai, and surrounding suburbs. While we verify and check the licenses of all partner facilities, each partner laboratory is independently responsible for the maintenance of their equipment and laboratory safety standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">2. Medical Information Disclaimer</h2>
            <p>
              All materials, blog posts, health tips, and educational articles present on this website are for general informational purposes only. They do not constitute professional medical advice, diagnosis, treatment, or clinical recommendations. You should always consult with a qualified physician or healthcare provider regarding any medical condition or symptoms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">3. Accuracy of Content and Availability</h2>
            <p>
              We aim to keep pricing, tests catalogs, preparation instructions, and operational timings up to date on our portal. However, minor variations may occur due to regular updates, regional changes, or partner laboratory adjustments. We reserve the right to modify pricing and service offerings without prior notice, although any active, prepaid booking will always be honored at the booked price.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">4. Third-Party Links & Partner Actions</h2>
            <p>
              Our website may contain links to third-party portals or clinical information resources. Henotic Diagnostics is not responsible for the content, privacy policies, or actions of external websites or third-party diagnostic services. We encourage patients to review the terms of any external links they navigate to.
            </p>
          </section>

          <section className="pt-6 border-t border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-4">5. Contact and Administrative Information</h2>
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
