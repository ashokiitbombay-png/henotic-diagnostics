import React from 'react';
import { MapPin, ShieldCheck, Activity, Star } from 'lucide-react';

interface HeroBlockProps {
  title?: string;
  description?: string;
  locationName?: string;
  regionName?: string;
}

export default function HeroBlock({ title, description, locationName, regionName }: HeroBlockProps) {
  return (
    <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 bg-slate-900 overflow-hidden">
      {/* Background Image & Overlays */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30" 
        style={{ backgroundImage: "url('https://storage.googleapis.com/wp-media-henoticbucket/Reception%20Area/henotic-diagnostics-mri-scan-panvel.webp')" }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/40"></div>
      
      {/* 3D Glow Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[120px] opacity-20 bg-[#b06ab3] animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
        {locationName && (
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-blue-50 sm:text-sm text-xs font-extrabold uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg">
            <MapPin size={16} className="text-pink-400" /> Available in {locationName}{regionName ? `, ${regionName}` : ''}
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-2xl">
          {title || "State-of-the-Art Diagnostics"}
        </h1>
        
        <p className="text-lg md:text-xl text-slate-200 font-medium max-w-3xl mx-auto drop-shadow-md leading-relaxed">
          {description || "Accurate, fast, and reliable diagnostic services near you. Experience premium technology with same-day reporting."}
        </p>
        
        <div className="mt-10 flex flex-wrap justify-center items-center gap-4 text-xs md:text-sm font-bold text-white/90">
          <span className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-lg"><ShieldCheck size={18} className="text-blue-400" /> NABL Certified</span>
          <span className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-lg"><Activity size={18} className="text-pink-400" /> Advanced 3T Technology</span>
          <span className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-lg"><Star size={18} className="text-yellow-400" /> Top Rated</span>
        </div>
      </div>
    </section>
  );
}
