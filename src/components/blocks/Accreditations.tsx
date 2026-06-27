"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle, ShieldCheck, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import CertificateViewer from "@/components/ui/CertificateViewer";

export default function Accreditations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeCert, setActiveCert] = useState<{ url: string; title: string } | null>(null);

  const accreditationsList = [
    { 
      title: "CAP Accredited", 
      sub: "College of American Pathologists", 
      desc: "Achieving CAP accreditation places us among an exclusive group globally. The 'Gold Standard' in pathology.", 
      img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/cap-accredidation-logo.webp", 
      certificateUrl: "https://storage.googleapis.com/wp-media-henoticbucket/Certificates/Certificates_henotic-diagnostics-cap-certified.webp",
      grad: "from-blue-600 to-cyan-400", 
      tag: "Global Gold Standard" 
    },
    { 
      title: "NABL Accredited", 
      sub: "ISO 15189:2012 Certified", 
      desc: "Verifies strict adherence to ISO standards, ensuring every test result is precise, reproducible, and technically valid.", 
      img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/NABL-henotic-diagnsotics-kharghar.webp", 
      certificateUrl: "https://storage.googleapis.com/wp-media-henoticbucket/Certificates/Certificates_henotic-diagnostics-nabl-certified.webp",
      grad: "from-yellow-500 to-orange-400", 
      tag: "Technical Competence" 
    },
    { 
      title: "ISO Certified", 
      sub: "ISO 9001:2015 Standard", 
      desc: "Demonstrates strict compliance with international quality management systems, ensuring operational safety and diagnostic reliability.", 
      img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/iso-certification-for-henotic-diagnsotics-kharghar.webp",
      certificateUrl: "https://storage.googleapis.com/wp-media-henoticbucket/Certificates/Certificates_henotic-diagnostics-iso-certified.webp",
      grad: "from-purple-600 to-indigo-500", 
      tag: "Quality Management" 
    },
    { 
      title: "AERB Certified", 
      sub: "Radiation Safety Board", 
      desc: "Certifies strict adherence to safety codes and radiation protection standards for advanced X-Ray, CT, and MRI scans.", 
      img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/Atomic_Energy_Regulatory_Board_Henotic-Diagnostics-LOGO.svg%20(1).webp",
      certificateUrl: "https://storage.googleapis.com/wp-media-henoticbucket/Certificates/henotic-diagnostics-aerb-certified.webp",
      grad: "from-amber-600 to-yellow-500", 
      tag: "Radiation Safety Lock" 
    },
    { 
      title: "PCPNDT Compliant", 
      sub: "Pre-Natal Diagnostics Act", 
      desc: "Verifies strict adherence to government healthcare laws and ethical guidelines for all pre-natal sonography scans.", 
      img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/pcpndt-certified-henotic-diagnsotics-kharghar.webp",
      certificateUrl: "https://storage.googleapis.com/wp-media-henoticbucket/Certificates/henotic-diagnostics-pcpndt-certified.webp",
      grad: "from-rose-600 to-pink-500", 
      tag: "Ethical Clinical Scans" 
    },
    { 
      title: "ISUOG Certified", 
      sub: "Int. Society of Ultrasound", 
      desc: "Certifies advanced training and execution of international guidelines in maternal-fetal imaging and ultrasound.", 
      img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/isuog.webp",
      certificateUrl: "https://storage.googleapis.com/wp-media-henoticbucket/Certificates/henotic-diagnostics-isoug-certified.webp",
      grad: "from-teal-600 to-emerald-500", 
      tag: "Obstetrics Excellence" 
    }
  ];

  const totalCards = accreditationsList.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = totalCards - visibleCount;
  const dotsCount = totalCards - visibleCount + 1;

  const nextSlide = () => {
    setActiveIndex((prev) => Math.min(prev + 1, maxIndex));
  };
  
  const prevSlide = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section id="accreditations" className="w-full py-24 px-4 md:px-8 bg-slate-50 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-pink-200/20 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#BE185D] font-extrabold tracking-widest text-sm uppercase mb-3 drop-shadow-sm">Our Credentials</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-blue-950 mb-6 drop-shadow-sm">
            Accredited Quality & Global Standards
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Henotic Diagnostics stands among the elite laboratories globally, holding supreme quality accreditations ensuring 100% accurate results.
          </p>
        </div>

        {/* Card Slider Wrapper */}
        <div className="relative px-0 md:px-12">
          
          {/* Left Arrow Button */}
          <button 
            type="button"
            onClick={prevSlide}
            disabled={activeIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 hidden md:flex items-center justify-center text-slate-800 transition-all ${
              activeIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-slate-50 hover:scale-105 active:scale-95 cursor-pointer"
            }`}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow Button */}
          <button 
            type="button"
            onClick={nextSlide}
            disabled={activeIndex === maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 hidden md:flex items-center justify-center text-slate-800 transition-all ${
              activeIndex === maxIndex ? "opacity-30 cursor-not-allowed" : "hover:bg-slate-50 hover:scale-105 active:scale-95 cursor-pointer"
            }`}
            aria-label="Next Slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slider Viewport */}
          <div className="overflow-hidden py-6">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * (100 / visibleCount)}%)` }}
            >
              {accreditationsList.map((item, i) => (
                <div 
                  key={i} 
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-4"
                >
                  <article 
                    className="group relative bg-white rounded-[2.5rem] p-8 border border-slate-100 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(37,99,235,0.08),0_20px_40px_rgba(223,137,181,0.06)] hover:-translate-y-3 transition-all duration-500 ease-out h-full"
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: '1000px'
                    }}
                  >
                    {/* Colored Accent Top Border */}
                    <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${item.grad} rounded-t-[2.5rem]`}></div>
                    
                    {/* Accreditation Badge Logo — Clickable to open certificate */}
                    <button
                      type="button"
                      onClick={() => setActiveCert({ url: item.certificateUrl, title: `${item.title} — Henotic Diagnostics` })}
                      className="relative w-28 h-28 mb-6 flex items-center justify-center cursor-pointer group/logo focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-full transition-transform hover:scale-110"
                      aria-label={`View ${item.title} certificate`}
                      title={`Click to view ${item.title} Certificate`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-tr ${item.grad} opacity-0 group-hover:opacity-10 blur-2xl rounded-full transition duration-700`}></div>
                      <Image 
                        width={112} 
                        height={112} 
                        src={item.img} 
                        alt={item.title} 
                        className="relative z-10 w-full h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110" 
                      />
                    </button>

                    {/* Titles */}
                    <h4 className="text-2xl font-black text-blue-950 mb-2">{item.title}</h4>
                    <h5 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-4">{item.sub}</h5>
                    
                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed text-sm mb-6 font-medium min-h-[60px]">{item.desc}</p>
                    
                    {/* Clickable Framed Certificate */}
                    <div 
                      onClick={() => setActiveCert({ url: item.certificateUrl, title: `${item.title} — Henotic Diagnostics` })}
                      className="w-full aspect-[1.4/1] relative rounded-2xl overflow-hidden border border-slate-200/50 bg-slate-50 mb-6 shadow-[inset_0_2px_8px_rgba(0,0,0,0.03),0_10px_20px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-slate-350 cursor-pointer group/cert group-hover:translate-z-8 transition-all duration-500"
                      title="Click to view full certificate"
                    >
                      <Image 
                        src={item.certificateUrl} 
                        alt={`${item.title} Certificate`}
                        fill
                        className="object-contain p-3 transition-transform duration-500 group-hover/cert:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Zoom Indicator Icon Overlay */}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/cert:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <div className="p-3 rounded-full bg-white/90 shadow-lg text-blue-600 scale-75 group-hover/cert:scale-100 transition-transform duration-300">
                          <ZoomIn size={20} />
                        </div>
                      </div>
                    </div>

                    {/* Tag Stamp */}
                    <div className="mt-auto pt-6 border-t border-slate-100 w-full">
                      <span className="text-blue-700 font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                        {item.tag} <CheckCircle size={16} className="text-[#E55D87]" />
                      </span>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Dots Indicator Navigation */}
          <div className="flex justify-center items-center gap-1 mt-8">
            {Array.from({ length: dotsCount }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className="w-12 h-12 flex items-center justify-center cursor-pointer transition-all"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span className={`h-3 rounded-full transition-all duration-350 ${
                  activeIndex === idx 
                    ? "w-8 bg-gradient-to-r from-blue-600 to-[#E55D87] shadow-sm" 
                    : "w-3 bg-slate-300 hover:bg-slate-400"
                }`} />
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 🔍 PREMIUM CERTIFICATE VIEWER LIGHTBOX */}
      {activeCert && (
        <CertificateViewer
          src={activeCert.url}
          alt={activeCert.title}
          onClose={() => setActiveCert(null)}
        />
      )}
    </section>
  );
}