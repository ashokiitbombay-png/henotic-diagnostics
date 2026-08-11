import React from 'react';
import Image from 'next/image';
import { MapPin, ShieldCheck, Activity, Star, Calendar, Shield, Award } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { siteConfig } from '@/config/site';
import AccreditationLogos from '@/components/blocks/AccreditationLogos';
import HomeSearchBar from '@/components/features/HomeSearchBar';

interface HeroBlockProps {
  title?: string;
  description?: string;
  locationName?: string;
  regionName?: string;
  variant?: 'home' | 'location';
}

const ACCREDITATIONS = [
  { 
    title: "PCPNDT", 
    img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/pcpndt-certified-henotic-diagnsotics-kharghar.webp" 
  },
  { 
    title: "NABL", 
    img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/NABL-henotic-diagnsotics-kharghar.webp" 
  },
  { 
    title: "ISO", 
    img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/iso-certification-for-henotic-diagnsotics-kharghar.webp" 
  },
  { 
    title: "AERB", 
    img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/Atomic_Energy_Regulatory_Board_Henotic-Diagnostics-LOGO.svg%20(1).webp" 
  }
];

export default function HeroBlock({ title, description, locationName, regionName, variant = 'location' }: HeroBlockProps) {

  if (variant === 'home') {
    return (
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden bg-slate-50">
        {/* Aesthetic Background Glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full mix-blend-multiply filter blur-[150px] opacity-40 bg-gradient-to-br from-[#b06ab3] to-pink-300"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[120px] opacity-40 bg-gradient-to-tr from-[#4568dc] to-blue-300"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: Premium Copy & CTAs */}
            <div className="max-w-2xl relative z-20">
              <Badge variant="slate" className="px-4 py-2 bg-white border-slate-200 text-slate-800 text-sm font-extrabold mb-8">
                <Shield size={16} className="text-[#E55D87]" /> Premium Diagnostic Center
              </Badge>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight drop-shadow-sm">
                Precision You Can <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4568dc] to-[#b06ab3]">Trust.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 font-medium mb-8 leading-relaxed max-w-xl">
                Experience world-class diagnostics with our state-of-the-art 3T MRI & 128-Slice CT scanners. Get accurate, same-day reports without the waiting room hassle.
              </p>

              {/* 🌟 DUAL-SEGMENT HOME SEARCH BAR 🌟 */}
              <div className="mb-10 relative z-30">
                <HomeSearchBar />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a 
                  href="#booking" 
                  className="flex items-center justify-center gap-2 text-white font-extrabold px-8 py-4 rounded-2xl transition-all duration-300 shadow-[0_15px_30px_-5px_rgba(176,106,179,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(176,106,179,0.6)] hover:-translate-y-1 text-lg"
                  style={{ background: "linear-gradient(90deg, #4568dc 0%, #b06ab3 100%)" }}
                >
                  <Calendar size={20} /> Book Scan Now
                </a>
                <a 
                  href={siteConfig.contact.phonePrimaryRaw} 
                  className="flex items-center justify-center gap-2 bg-white text-slate-800 border-2 border-slate-200 hover:border-[#4568dc] hover:text-[#4568dc] font-extrabold px-8 py-4 rounded-2xl transition-all duration-300 text-lg shadow-sm hover:shadow-md"
                >
                  Call {siteConfig.contact.phonePrimary}
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                <div className="flex flex-col gap-2">
                  <Activity size={24} className="text-[#E55D87]" />
                  <span className="font-bold text-slate-800">Advanced<br/>Imaging</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Award size={24} className="text-[#4568dc]" />
                  <span className="font-bold text-slate-800">Expert<br/>Radiologists</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Shield size={24} className="text-[#6d2870]" />
                  <span className="font-bold text-slate-800">100% Accurate<br/>Reports</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 3D Image & Accreditations */}
            <div className="relative w-full z-10 lg:ml-8 mt-12 lg:mt-0 flex justify-center lg:block">
              <div className="relative w-full max-w-md lg:max-w-none mx-auto">
                
                {/* ACCREDITATION LOGOS — Interactive with Certificate Viewer */}
                <div className="absolute -top-10 -left-6 sm:-top-16 sm:-left-12 z-30">
                  <AccreditationLogos badges={ACCREDITATIONS} variant="light" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-tr from-[#4568dc] to-[#b06ab3] rounded-[3rem] transform rotate-3 scale-105 opacity-30 blur-2xl transition-transform duration-700 hover:rotate-6"></div>
                
                <div className="relative bg-white p-2 sm:p-3 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transform -rotate-2 hover:rotate-0 transition-transform duration-700 overflow-hidden border border-white/60">
                  <Image 
                    src="https://storage.googleapis.com/wp-media-henoticbucket/Reception%20Area/henotic-diagnostics-mri-scan-panvel.webp" 
                    alt="Premium 3T MRI Scan at Henotic Diagnostics" 
                    width={500}
                    height={500}
                    className="rounded-[2.5rem] w-full h-auto object-cover aspect-[4/3] lg:aspect-square"
                    priority
                    quality={85}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md p-3 sm:p-5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] border border-slate-100/50 flex items-center gap-3 sm:gap-4 z-20">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 p-2 sm:p-3 rounded-full text-green-700 shadow-inner shrink-0">
                    <Activity size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-widest leading-tight">Turnaround Time</div>
                    <div className="text-base sm:text-xl font-black text-slate-900 drop-shadow-sm leading-tight">Same Day Reports</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  // DEFAULT / LOCATION MODE
  return (
    <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 bg-slate-900 overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30" 
        style={{ backgroundImage: "url('https://storage.googleapis.com/wp-media-henoticbucket/Reception%20Area/henotic-diagnostics-mri-scan-panvel.webp')" }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/40"></div>
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[120px] opacity-20 bg-[#b06ab3]"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
        {locationName && (
          <Badge variant="transparent" className="px-5 py-2 text-blue-50 sm:text-sm text-xs mb-6">
            <MapPin size={16} className="text-pink-400" /> Available in {locationName}{regionName ? `, ${regionName}` : ''}
          </Badge>
        )}
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-2xl">
          {title || "State-of-the-Art Diagnostics"}
        </h1>
        
        <p className="text-lg md:text-xl text-slate-200 font-medium max-w-3xl mx-auto drop-shadow-md leading-relaxed">
          {description || "Accurate, fast, and reliable diagnostic services near you. Experience premium technology with same-day reporting."}
        </p>
        
        <div className="mt-10 flex flex-wrap justify-center items-center gap-4 text-xs md:text-sm font-bold text-white/90">
          <Badge variant="transparent" className="px-4 py-2.5 rounded-xl"><ShieldCheck size={18} className="text-blue-400" /> NABL Certified</Badge>
          <Badge variant="transparent" className="px-4 py-2.5 rounded-xl"><Activity size={18} className="text-pink-400" /> Advanced 3T Technology</Badge>
          <Badge variant="transparent" className="px-4 py-2.5 rounded-xl"><Star size={18} className="text-yellow-400" /> Top Rated</Badge>
        </div>
      </div>
    </section>
  );
}
