import React from 'react';
import Link from 'next/link';
import { Calendar, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface AppointmentSectionProps {
  locationName?: string;
  ctaText?: string;
}

export default function AppointmentSection({ locationName, ctaText }: AppointmentSectionProps) {
  const displayLocation = locationName ? ` in ${locationName}` : "";

  return (
    <div className="bg-gradient-to-br from-blue-600 to-[#b06ab3] rounded-[3rem] p-8 md:p-10 shadow-[0_40px_80px_-20px_rgba(176,106,179,0.5)] border-4 border-white text-white text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden w-full">
      <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="relative z-10 max-w-xl">
        <h3 className="text-2xl md:text-3xl font-black mb-3 text-white leading-tight">Ready to book your checkup{displayLocation}?</h3>
        <p className="text-white/90 font-medium text-sm md:text-base">
          Get priority scheduling at our nearest center. Skip the queue and receive your NABL-accredited diagnostic reports directly on WhatsApp.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 relative z-10">
        <Link 
          href="#booking" 
          className="flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-black py-4 px-6 rounded-2xl shadow-md transition-all text-sm uppercase tracking-wider text-center"
        >
          <Calendar size={18} /> {ctaText || "Book Online"}
        </Link>
        <a 
          href={siteConfig.contact.phonePrimaryRaw} 
          className="flex items-center justify-center gap-2 bg-black/20 text-white hover:bg-black/30 border border-white/20 font-black py-4 px-6 rounded-2xl transition-all text-sm uppercase tracking-wider text-center"
        >
          <Phone size={18} /> Call {siteConfig.contact.phonePrimary}
        </a>
      </div>
    </div>
  );
}
