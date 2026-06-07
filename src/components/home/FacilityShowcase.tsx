"use client";
import React from "react";
import { CheckCircle2, ArrowRight, Activity } from "lucide-react";
import Link from "next/link";

const FACILITIES = [
  {
    title: "128 Slice Advanced CT Scan",
    slug: "ct-scan",
    image: "https://storage.googleapis.com/wp-media-henoticbucket/CT%20SCAN/henotic-diagnostics-ct-scan-kharghar.webp",
    description: "Experience high-speed, high-precision imaging with our advanced 128 Slice CT Scanner. Designed to deliver exceptional diagnostic accuracy, providing detailed cross-sectional images within seconds.",
    highlights: ["Ultra-fast scan acquisition", "High-resolution imaging", "Advanced cardiac & vascular", "Low-radiation protocols"]
  },
  {
    title: "3 Tesla Advanced MRI",
    slug: "mri-scan",
    image: "https://storage.googleapis.com/wp-media-henoticbucket/MRI%20SCAN/henotic-diagnostics-mri-scan-belapur.webp",
    description: "Our state-of-the-art 3 Tesla MRI system delivers exceptional image clarity and diagnostic confidence for neurological, musculoskeletal, spinal, cardiac, and abdominal imaging.",
    highlights: ["Superior image resolution", "Advanced neurological imaging", "Detailed spine evaluation", "Comfort-focused experience"]
  },
  {
    title: "Latest PET CT Technology",
    slug: "pet-scan",
    image: "https://storage.googleapis.com/wp-media-henoticbucket/PET%20SCAN/pet-ct-scan-mri-scan-ct-scan-henotic-diagnostics-kharghar.webp",
    description: "Our latest-generation PET CT scanner combines metabolic and anatomical imaging to provide comprehensive insights into complex medical conditions including cancer and cardiac disorders.",
    highlights: ["Advanced cancer detection", "Accurate tumor staging", "Treatment monitoring", "Whole-body functional imaging"]
  },
  {
    title: "Advanced Cardiac Care",
    slug: "2d-echo",
    image: "https://storage.googleapis.com/wp-media-henoticbucket/TMT%20Stress%20Test/tmt-stress-echo-test-henotic-diagnostics.webp",
    description: "Comprehensive cardiac diagnostics designed to support early detection and prevention of heart disease through advanced non-invasive cardiovascular testing.",
    highlights: ["TMT (Stress Test)", "Stress Echo & 2D Echo", "ECG & Holter Monitoring", "Preventive heart screening"]
  },
  {
    title: "Digital Mammography",
    slug: "mammography",
    image: "https://storage.googleapis.com/wp-media-henoticbucket/Mammography/mammography-kharghar-panvel-belapur-vashi-henotic-diagnostics.webp",
    description: "Advanced digital mammography technology supporting early breast cancer detection through high-quality, low-dose imaging and expert radiological evaluation.",
    highlights: ["Early breast cancer detection", "High-definition imaging", "Low-dose digital technology", "Fast and comfortable procedure"]
  },
  {
    title: "Automated Pathology Lab",
    slug: "blood-test",
    image: "https://storage.googleapis.com/wp-media-henoticbucket/Laboratory/pathology-lab-near-me-henotic-diagnostics-kharghar.webp",
    description: "Our fully automated pathology laboratory is equipped with advanced analyzers and stringent quality control systems to deliver precise, reliable, and timely diagnostic results.",
    highlights: ["Fully automated systems", "Rapid report turnaround", "Strict quality assurance", "Advanced diagnostic analyzers"]
  }
];

export default function FacilityShowcase() {
  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full mix-blend-multiply filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-100/40 rounded-full mix-blend-multiply filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#4568dc] text-sm font-extrabold uppercase tracking-widest mb-6">
            <Activity size={16} /> World-Class Infrastructure
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Advanced Diagnostic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4568dc] to-[#b06ab3]">Facilities</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Powered by cutting-edge medical technology and expert specialists, Henotic Diagnostics delivers accurate, reliable, and timely diagnostic services across radiology, pathology, and advanced imaging under one roof.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {FACILITIES.map((facility, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-[2.5rem] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden transition-all duration-500 hover:-translate-y-1 flex flex-col md:flex-row"
            >
              {/* Image Container */}
              <div className="md:w-2/5 relative overflow-hidden h-64 md:h-auto">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                <img width="800" height="800" decoding="async" 
                  src={facility.image} 
                  alt={facility.title} 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                fetchPriority="high" />
              </div>

              {/* Content Container */}
              <div className="md:w-3/5 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-[#4568dc] transition-colors">
                  {facility.title}
                </h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
                  {facility.description}
                </p>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-2 mb-8">
                  {facility.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm font-bold text-slate-700">
                      <CheckCircle2 size={16} className="text-[#E55D87] shrink-0 mt-0.5" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link 
                    href={`/services/${facility.slug}`}
                    className="text-[#4568dc] font-extrabold text-sm flex items-center gap-1 hover:gap-2 transition-all hover:text-[#6d2870]"
                  >
                    Explore Service <ArrowRight size={16} />
                  </Link>
                  <Link 
                    href="/contact#booking"
                    className="bg-slate-50 hover:bg-[#4568dc] hover:text-white text-slate-700 font-bold px-4 py-2 rounded-xl transition-colors text-sm"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}