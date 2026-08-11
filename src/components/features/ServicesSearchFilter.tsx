"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, Orbit, Activity, ScanHeart, Baby, Droplets, Heart, Bone, Stethoscope, Microscope, ArrowRight, Filter } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  desc: string;
}

interface ServicesSearchFilterProps {
  initialServices: ServiceItem[];
}

const iconMap: Record<string, any> = {
  "Imaging": Orbit,
  "Pathology": Droplets,
  "Cardiology": Heart,
  "Preventive": Stethoscope
};

const categoryBgMap: Record<string, string> = {
  "Imaging": "bg-blue-100",
  "Pathology": "bg-red-100",
  "Cardiology": "bg-rose-100",
  "Preventive": "bg-teal-100"
};

const categoryColorMap: Record<string, string> = {
  "Imaging": "text-blue-600",
  "Pathology": "text-red-600",
  "Cardiology": "text-rose-600",
  "Preventive": "text-teal-600"
};

const categories = ["All", "Imaging", "Pathology", "Cardiology", "Preventive"];

export default function ServicesSearchFilter({ initialServices }: ServicesSearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = initialServices.filter(service => {
    const matchesSearch = 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      service.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Search & Filter Section */}
      <section className="py-8 bg-white border-b border-slate-200 sticky top-[80px] z-40 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Search Bar */}
            <div className="relative w-full lg:w-1/2">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="text" 
                placeholder="Search for a test, scan, or package (e.g. MRI, Blood Test, Anomaly Scan)..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-700 text-sm md:text-base"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
              <Filter className="text-slate-500 mr-2 shrink-0" size={20} />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all ${
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
      <section className="py-16 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          
          <div className="mb-8 flex justify-between items-center text-sm font-semibold text-slate-500">
            <span>Showing {filteredServices.length} of {initialServices.length} diagnostic services</span>
            {searchTerm || activeCategory !== "All" ? (
              <button 
                onClick={() => { setSearchTerm(""); setActiveCategory("All"); }}
                className="text-blue-600 hover:underline"
              >
                Reset filters
              </button>
            ) : null}
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
              <Microscope size={48} className="mx-auto text-slate-300 mb-4 animate-pulse" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">No services found</h3>
              <p className="text-slate-500 font-medium max-w-md mx-auto">We couldn't find any service matching "{searchTerm}". Try clearing your filters or search keywords.</p>
              <button 
                onClick={() => {setSearchTerm(""); setActiveCategory("All");}} 
                className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, idx) => {
                const Icon = iconMap[service.category] || Orbit;
                const bgClass = categoryBgMap[service.category] || "bg-blue-100";
                const colorClass = categoryColorMap[service.category] || "text-blue-600";
                
                return (
                  <div key={idx} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-14 h-14 ${bgClass} ${colorClass} rounded-2xl flex items-center justify-center shadow-inner transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                        <Icon size={28} strokeWidth={2.5} />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                        {service.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-extrabold text-slate-900 mb-3 tracking-tight group-hover:text-blue-700 transition-colors min-h-[56px] flex items-center">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6 flex-grow">
                      {service.desc}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-slate-100">
                      <Link 
                        href={`/services/${service.id}/navi-mumbai/kharghar`}
                        className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-pink-600 hover:text-pink-700 transition-colors group/link"
                      >
                        Book Appointment <ArrowRight size={14} className="transform group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
