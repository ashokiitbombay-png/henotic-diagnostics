import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report Delivery Policy | Henotic Diagnostics",
  description: "Learn about how Henotic Diagnostics delivers pathology and radiology reports to patients digitally and physically.",
  alternates: {
    canonical: "https://www.henoticdiagnostics.com/delivery-policy"
  }
};

export default function DeliveryPolicy() {
  return (
    <main className="min-h-screen bg-slate-50 mt-[80px] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 rounded-[2rem] p-8 md:p-12 text-white mb-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <h1 className="text-3xl md:text-5xl font-black relative z-10 tracking-tight">Report Delivery Policy</h1>
          <p className="text-blue-200 mt-2 relative z-10 font-bold text-sm">Effective Date: June 19, 2026</p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-200 text-slate-700 text-base md:text-lg leading-relaxed font-medium space-y-8">
          
          <section>
            <p>
              At Henotic Diagnostics, we understand that getting your diagnostic reports quickly and accurately is vital to your healthcare journey. We offer multiple delivery options to ensure you receive your reports in the most convenient way possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">1. Digital Delivery Channels (No Extra Charges)</h2>
            <p>
              To ensure speed and environmental sustainability, we deliver clinical reports digitally as standard practice. All digital report files are securely saved on our Google Cloud Storage (GCS) server infrastructure:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Secure WhatsApp Delivery:</strong> Once verified by our clinical pathologists, a secure download link for your PDF report is sent directly to your registered mobile number.</li>
              <li><strong>Email Delivery:</strong> A copy of the PDF report is automatically sent to the email address provided at the time of registration.</li>
              <li><strong>Online Portal Access:</strong> Patients can access and download their lifetime report history by logging into the Henotic Diagnostics portal.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">2. Turnaround Time (TAT)</h2>
            <p>
              We strive to deliver results within the fastest possible timeframe. Typical Turnaround Times are:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Routine Pathology (Blood/Urine Tests):</strong> 6 to 12 hours from sample collection.</li>
              <li><strong>Advanced Pathology / Cultures:</strong> 24 to 48 hours (depending on incubation requirements).</li>
              <li><strong>Radiology & Imaging (X-Ray, Ultrasound, CT, MRI, Mammography):</strong> Reports are usually compiled and signed off within 12 to 24 hours. Emergency / urgent reviews can be completed much faster.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">3. Physical Report Delivery</h2>
            <p>
              For patients who require physical copies of their reports or medical films (such as CT/MRI films, X-Ray sheets, or Mammograms):
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>In-Center Collection:</strong> You can collect printed reports and imaging films directly from our primary center in Kharghar or any partner center where the scan was performed.</li>
              <li><strong>Courier Delivery:</strong> Upon request, we can arrange for physical reports to be delivered to your residence via standard local courier services. A minor delivery fee may be applicable depending on the distance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">4. Critical & Urgent Alerts</h2>
            <p className="bg-rose-50 border-l-4 border-rose-500 p-4 text-rose-800 rounded-r-xl font-bold text-sm">
              If a lab test or scan reveals a critical medical alert value (for example, dangerously low platelet count or acute cardiac findings), our clinical staff or reporting doctors will immediately call the patient and their referring physician directly, prior to the routine delivery of the PDF report.
            </p>
          </section>

          <section className="pt-6 border-t border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-4">5. Contact Information</h2>
            <p>For any queries or assistance regarding your report delivery status, please contact our helpdesk:</p>
            <div className="mt-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm text-slate-600 font-bold">
              <p className="text-slate-900 font-black text-base">Henotic Diagnostics Customer Desk</p>
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
