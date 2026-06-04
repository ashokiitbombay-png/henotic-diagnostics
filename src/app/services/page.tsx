"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, Activity, Heart, Baby, Bone, Droplet, Microscope, ScanHeart, Orbit, Stethoscope, ArrowRight, Filter } from "lucide-react";

const allServices = [
  { id: "mri-scan", title: "MRI Scan (3 Tesla)", category: "Imaging", icon: Orbit, color: "text-blue-600", bg: "bg-blue-100", desc: "High-resolution magnetic resonance imaging for brain, spine, and joints with silent scan technology." },
  { id: "ct-scan", title: "128-Slice CT Scan", category: "Imaging", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-100", desc: "Ultra-fast, low-dose CT scans ideal for cardiac, neuro, and whole-body imaging." },
  { id: "pet-scan", title: "PET-CT Scan", category: "Imaging", icon: ScanHeart, color: "text-purple-600", bg: "bg-purple-100", desc: "Advanced metabolic imaging for accurate cancer staging and neurological assessments." },
  { id: "ultrasound", title: "Sonography / USG", category: "Imaging", icon: Baby, color: "text-pink-600", bg: "bg-pink-100", desc: "3D/4D ultrasound imaging for pregnancy, abdomen, and pelvic evaluations." },
  { id: "blood-test", title: "Clinical Pathology", category: "Pathology", icon: Droplet, color: "text-red-600", bg: "bg-red-100", desc: "Fully automated NABL-accredited laboratory for blood, urine, and fluid testing." },
  { id: "2d-echo", title: "Cardiac Care (2D Echo)", category: "Cardiology", icon: Heart, color: "text-rose-600", bg: "bg-rose-100", desc: "Comprehensive heart evaluations including 2D Echo, TMT, and Holter monitoring." },
  { id: "dexa-bone-scan", title: "DEXA Bone Scan", category: "Imaging", icon: Bone, color: "text-orange-600", bg: "bg-orange-100", desc: "Precise bone mineral density testing for osteoporosis detection and fracture risk." },
  { id: "full-body-check-up", title: "Preventive Health", category: "Preventive", icon: Stethoscope, color: "text-teal-600", bg: "bg-teal-100", desc: "Customized full-body health checkup packages for every age and lifestyle." },
  { id: "nipt-test", title: "Advanced Genetics", category: "Pathology", icon: Microscope, color: "text-indigo-600", bg: "bg-indigo-100", desc: "Non-Invasive Prenatal Testing (NIPT) and advanced molecular diagnostics." },
];

const categories = ["All", "Imaging", "Pathology", "Cardiology", "Preventive"];

export default function ServicesIndexPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = allServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || service.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px] overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-blue-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 text-center">
          <span className="inline-block py-1.5 px-5 rounded-full bg-white/10 text-blue-200 border border-white/20 font-extrabold text-xs tracking-widest uppercase mb-6 backdrop-blur-md">
            Comprehensive Healthcare
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            Our Diagnostic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E55D87] to-pink-400">Services</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-medium max-w-3xl mx-auto leading-relaxed">
            Find the exact test you need. From routine blood work to advanced molecular imaging, we bring world-class medical technology under one roof.
          </p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-12 bg-white border-b border-slate-200 sticky top-[80px] z-40 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Search Bar */}
            <div className="relative w-full md:w-1/2 lg:w-1/3">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search for a test, scan, or package..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-700"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
              <Filter className="text-slate-400 mr-2 shrink-0" size={20} />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                    activeCategory === cat 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          
          {filteredServices.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-slate-700 mb-4">No services found</h3>
              <p className="text-slate-500 font-medium">Try adjusting your search term or selecting a different category.</p>
              <button onClick={() => {setSearchTerm(""); setActiveCategory("All");}} className="mt-6 px-6 py-3 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition-colors">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div key={idx} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-16 h-16 ${service.bg} ${service.color} rounded-2xl flex items-center justify-center shadow-inner transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                        <Icon size={32} strokeWidth={2.5} />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                        {service.category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight group-hover:text-blue-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 font-medium leading-relaxed mb-8 flex-grow">
                      {service.desc}
                    </p>
                    
                    {/* Programmatic SEO Funnel Link */}
                    <div className="mt-auto pt-6 border-t border-slate-100">
                      <Link 
                        href={`/services/${service.id}/navi-mumbai/kharghar`}
                        className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-[#E55D87] hover:text-pink-700 transition-colors group/link"
                      >
                        Explore Service <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Need a Customized Health Package?</h2>
          <p className="text-lg text-slate-600 font-medium mb-10">Our medical experts can help you select the exact tests required based on your doctor's prescription or health goals.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact#booking" className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 px-8 rounded-2xl shadow-lg transition-all text-lg">
              Book Appointment
            </Link>
            <a href="tel:08879327184" className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold py-4 px-8 rounded-2xl shadow-sm border border-slate-200 transition-all text-lg flex items-center justify-center gap-2">
              Call 08879327184
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}