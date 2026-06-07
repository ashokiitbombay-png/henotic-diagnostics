"use client";
import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const packages = [
  {
    title: "Comprehensive Full Body",
    price: "₹2,999",
    oldPrice: "₹6,500",
    img: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/88133686-henotic-diagnostics-top-pathology-lab-navi-mumbai-blood-test-near-me-health-checkup-nabl-accredited-lab-mri-scan-ct-scan-genetic-testing.webp",
    gradient: "from-blue-600 to-cyan-400",
    includes: ["Lipid Profile (Heart)", "Liver Function Test (LFT)", "Kidney Function Test (KFT)", "Thyroid Profile (T3, T4, TSH)", "Complete Hemogram (CBC)", "Diabetes Screening (HbA1c)"]
  },
  {
    title: "Advanced Cardiac Care",
    price: "₹4,499",
    oldPrice: "₹8,000",
    img: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/7f8eb649-tmt-test-stress-echo-test-stress-test-2d-echo-test-kharghar-henotic-diagnostics-navi-mumbai.webp",
    gradient: "from-rose-500 to-pink-400",
    includes: ["2D Echocardiography", "Treadmill Test (TMT)", "Electrocardiogram (ECG)", "Advanced Lipid Profile", "Cardiac Risk Markers", "Physician Consultation"]
  },
  {
    title: "Women's Wellness Profile",
    price: "₹3,499",
    oldPrice: "₹7,200",
    img: "https://storage.googleapis.com/wp-media-henoticbucket/Ultrasound/henotic-diagnostics-sonography-ultrasound-pregnancy-scan-anomaly%20scan-nt-scan-kharghar-taloja%2C%20roadpali-navi%20mumbai.webp",
    gradient: "from-purple-600 to-indigo-400",
    includes: ["Pelvic Ultrasound (USG)", "Thyroid Profile", "Vitamin D & B12 Levels", "Iron Deficiency Panel", "Hormonal Imbalance Check", "Breast Cancer Screening"]
  }
];

export default function PremiumRateCards() {
  return (
    <section id="packages" className="py-24 relative overflow-hidden bg-slate-50">
      {/* Dynamic Background Gradient Below Image Request */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#fbc2eb]/40 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#E55D87] font-extrabold uppercase tracking-widest text-sm mb-2 block">Exclusive Offers</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-950 mb-6 drop-shadow-sm">Premium Health Packages</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">Transparent pricing, comprehensive testing, and instant digital reports.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <div key={idx} className="group relative bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_60px_-15px_rgba(0,0,0,0.2)] transition-all duration-700">
              
              {/* Image Pop-up Effect Request */}
              <div className="relative h-64 overflow-hidden bg-slate-200">
                <div className={`absolute inset-0 bg-gradient-to-t ${pkg.gradient} opacity-40 group-hover:opacity-20 transition-opacity z-10`}></div>
                <img width="800" height="800" src={pkg.img} alt={pkg.title} className="w-full h-full object-cover transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-700 ease-out" fetchPriority="high" decoding="sync" />
                
                {/* Price Tag Overlay */}
                <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white">
                  <div className="text-xs text-slate-400 line-through font-bold">{pkg.oldPrice}</div>
                  <div className="text-2xl font-black text-slate-900">{pkg.price}</div>
                </div>
              </div>

              {/* Smooth Transition Text Request */}
              <div className="p-8 relative bg-white/50">
                <h3 className="text-2xl font-extrabold text-blue-950 mb-6 transform group-hover:-translate-y-1 transition-transform duration-500">{pkg.title}</h3>
                <ul className="space-y-3 mb-8">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium transform translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500" style={{ transitionDelay: `${i * 50}ms` }}>
                      <CheckCircle size={18} className="text-[#E55D87] shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="w-full block text-center py-4 rounded-2xl bg-blue-50 text-blue-700 font-extrabold uppercase tracking-widest border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md">
                  Book Package
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}