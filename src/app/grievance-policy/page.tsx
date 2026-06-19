import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grievance Redressal Policy | Henotic Diagnostics",
  description: "Read the Henotic Diagnostics patient grievance resolution policy and contact our patient advocacy team.",
  alternates: {
    canonical: "https://www.henoticdiagnostics.com/grievance-policy"
  }
};

export default function GrievancePolicy() {
  return (
    <main className="min-h-screen bg-slate-50 mt-[80px] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 rounded-[2rem] p-8 md:p-12 text-white mb-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <h1 className="text-3xl md:text-5xl font-black relative z-10 tracking-tight">Grievance Redressal Policy</h1>
          <p className="text-blue-200 mt-2 relative z-10 font-bold text-sm">Effective Date: June 19, 2026</p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-200 text-slate-700 text-base md:text-lg leading-relaxed font-medium space-y-8">
          
          <section>
            <p>
              At Henotic Diagnostics, patient care, comfort, and satisfaction form the core of our operations. We strive to provide seamless diagnostic services, but in case you encounter any inconvenience or have feedback regarding our services, we have a dedicated patient advocacy and grievance system to resolve your concerns promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">1. Patient Advocacy Philosophy</h2>
            <p>
              We believe in non-punitive, supportive, and immediate resolution of issues. If a patient is unsatisfied with a phlebotomist's behavior, delay in report delivery, booking discrepancies, or partner lab experiences:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Every concern is treated with absolute confidentiality and respect.</li>
              <li>We will investigate the matter immediately with our internal team or partner networks.</li>
              <li>A patient-first solution (such as a re-run of a test, free home collection rescheduling, or billing adjustments) will be prioritized.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">2. Grievance Escalation Workflow</h2>
            <p>To report an issue or lodge a grievance, please follow these steps:</p>
            <ol className="list-decimal pl-6 space-y-3 mt-2">
              <li>
                <strong>Step 1: Contact Customer Support</strong><br />
                Call our support lines at <strong>088793 27184</strong> / <strong>09372853584</strong> or email us at <strong>henoticdiagnostics@gmail.com</strong>. Most standard inquiries, delay in reports, or booking updates are resolved immediately at this level.
              </li>
              <li>
                <strong>Step 2: Escalation to Grievance Officer</strong><br />
                If the response from our support desk does not meet your expectations, you may escalate the issue to our designated Grievance Officer.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">3. Designated Grievance Officer Contact Details</h2>
            <p>
              In accordance with local clinical establishment rules and digital portal regulations, our Grievance Officer contact details are as follows:
            </p>
            <div className="mt-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm text-slate-600 font-bold">
              <p className="text-slate-900 font-black text-base">Grievance Redressal Desk — Henotic Diagnostics</p>
              <p>Officer: Head of Patient Care & Compliance</p>
              <p>Address: Second floor, Millennium Empire, Business Park, Plot No 47, D Mart Rd, Sector 15, Kharghar, Panvel, Maharashtra 410210</p>
              <p>Primary Direct Line: 088793 27184</p>
              <p>Secondary Support Line: 09372853584</p>
              <p>Email: henoticdiagnostics@gmail.com (Mark subject line as "ATTN: GRIEVANCE")</p>
              <p>Working Hours: 10:00 AM to 6:00 PM (Monday to Saturday)</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">4. Resolution Timeline</h2>
            <p>
              We commit to acknowledging all formal grievances within <strong>24 to 48 working hours</strong>. Our goal is to complete investigations and provide a final resolution/redressal plan to the patient within <strong>5 business days</strong> of receipt.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
