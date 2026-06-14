import React from "react";
import { Clock, Building2, ChevronRight, Sparkles, Award } from "lucide-react";

const TEAM_DATA = [
  { name: "Dr. Esha Batra", qualifications: "MD, DNB, Radiology", experience: "14+ years experience", current: "Apollo & MGM", imageUrl: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/b01f282f-henotic-diagnostics-experienced-radiology-doctors-team-for-ct-scan-mri-ultrasound-dexa-and-advanced-diagnostic-imaging.webp.webp", bgColor: "bg-[#FFF9F5]", primaryCircle: "bg-[#FDF2F0]", accent: "text-[#E67E6B]", btnColor: "bg-[#E67E6B]" },
  { name: "Dr. Naresh Reddy", qualifications: "MD, DNB, Ortho", experience: "12+ years experience", current: "Apollo Hospitals", imageUrl: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/3b2e00c2-henotic-diagnostics-leading-radiologists-and-medical-imaging-doctors-team-delivering-precision-diagnostic-healthcare-solutions.webp.webp", bgColor: "bg-[#F8F9FF]", primaryCircle: "bg-[#F0F4FF]", accent: "text-[#5C7CFA]", btnColor: "bg-[#5C7CFA]" },
  { name: "Dr. Vimala Choudhary", qualifications: "MD, Fetal Med", experience: "14+ years experience", current: "Apollo Hospitals", imageUrl: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/ea38942d-henotic-diagnostics-best-diagnostic-center-navi-mumbai-pathology-lab-near-me-blood-test-full-body-checkup-medical-lab-navi-mumbai-health-packages-mri-ct-scan-ultrasound-lab-test-1.webp", bgColor: "bg-[#F7FDF9]", primaryCircle: "bg-[#F0FDF4]", accent: "text-[#0D9488]", btnColor: "bg-[#0D9488]" }
];

export default function DoctorsTrustSignals() {
  return (
    <section className="bg-white py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-extrabold uppercase tracking-[0.2em] mb-6 shadow-sm"><Sparkles size={14} className="text-[#E55D87]" /> Benchmarks of Excellence</div>
           <h2 className="text-4xl md:text-6xl font-extrabold text-blue-950 tracking-tight">Precision Imaging. <br /> <span className="text-slate-400">Trusted Expertise.</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_DATA.map((doctor, i) => (
            <div key={i} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_60px_-15px_rgba(0,0,0,0.15)] flex flex-col">
              <div className={`relative h-[300px] w-full ${doctor.bgColor} overflow-hidden flex items-center justify-center`}>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className={`absolute w-[200px] h-[200px] rounded-full ${doctor.primaryCircle} border border-white shadow-inner flex items-center justify-center`}></div>
                <img width="40" height="40" loading="lazy" decoding="async" src={doctor.imageUrl} alt={doctor.name} className="relative z-10 h-[90%] w-auto object-contain mt-auto transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-6 left-6 z-20 flex items-center gap-1 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm border border-white"><Award size={12} className={doctor.accent} /><span className="text-[9px] font-black uppercase tracking-widest text-slate-700">Verified</span></div>
              </div>
              <div className="p-8 flex flex-col flex-grow bg-slate-50/50">
                <h3 className="text-2xl font-black text-slate-900 mb-1">{doctor.name}</h3>
                <p className={`${doctor.accent} font-bold text-xs tracking-widest uppercase mb-6`}>{doctor.qualifications}</p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-slate-600 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm"><Clock size={16} className={doctor.accent} /><span className="text-sm font-bold">{doctor.experience}</span></div>
                  <div className="flex items-center gap-3 text-slate-600 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm"><Building2 size={16} className={doctor.accent} /><span className="text-sm font-bold">{doctor.current}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}