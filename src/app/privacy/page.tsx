import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Henotic Diagnostics",
  description: "Privacy policy and data protection guidelines for Henotic Diagnostics.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white mt-[80px] py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-slate-500 font-medium">Last Updated: June 2026</p>
        </div>
        
        <div className="space-y-8 text-slate-700 text-lg leading-relaxed font-medium">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p>At Henotic Diagnostics, protecting your personal and medical information is our highest priority. This Privacy Policy outlines how we collect, use, store, and safeguard your data when you visit our website, use our online booking portal, or visit our diagnostic centers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, age, gender, contact number, email address, and residential address.</li>
              <li><strong>Medical Information:</strong> Prescriptions, medical history relevant to your diagnostic tests, and past reports.</li>
              <li><strong>Digital Information:</strong> IP address, browser type, and cookies when navigating our website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Data</h2>
            <p>Your data is utilized strictly for healthcare purposes, including:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Scheduling and managing your diagnostic appointments.</li>
              <li>Delivering highly accurate medical test reports via secure channels (WhatsApp, Email, or Patient Portal).</li>
              <li>Complying with regulatory frameworks (e.g., NABL, PCPNDT guidelines).</li>
              <li>Processing payments and generating invoices securely.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Security</h2>
            <p>We implement enterprise-grade security protocols to protect your sensitive medical data against unauthorized access, alteration, or disclosure. All digital reports are encrypted, and access to patient records is strictly restricted to authorized medical personnel.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Third-Party Sharing</h2>
            <p>Henotic Diagnostics does not sell, rent, or trade your personal or medical data. Data may only be shared with authorized third parties under the following conditions:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>With your referring doctor or hospital to facilitate medical treatment.</li>
              <li>With certified partner laboratories specifically for the processing of specialized tests.</li>
              <li>When legally mandated by government or regulatory authorities.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Contact Us</h2>
            <p>If you have any questions or concerns regarding this Privacy Policy or your personal data, please contact our Data Protection Officer at:</p>
            <p className="mt-4">
              <strong>Email:</strong> info@henotic.com<br />
              <strong>Phone:</strong> 08879327184<br />
              <strong>Address:</strong> Sector 15, Kharghar, Navi Mumbai, Maharashtra
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}