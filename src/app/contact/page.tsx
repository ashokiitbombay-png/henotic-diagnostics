import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { MapPin, Phone, Clock, ShieldCheck, CheckCircle2, Navigation } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import GoogleReviews from "@/components/features/reviews/GoogleReviews";

const ContactBookingForm = dynamic(() => import('./ContactBookingForm'), { ssr: true });

export const metadata: Metadata = {
  title: 'Contact Henotic Diagnostics | Book Appointment in Navi Mumbai',
  description: 'Contact Henotic Diagnostics in Kharghar, Navi Mumbai. Book diagnostic tests via WhatsApp or call 08879327184. Open 24 hours, NABL accredited center.',
  alternates: { canonical: 'https://www.henoticdiagnostics.com/contact' },
  openGraph: {
    title: 'Contact Henotic Diagnostics | Book Appointment in Navi Mumbai',
    description: 'Contact Henotic Diagnostics in Kharghar, Navi Mumbai. Book diagnostic tests via WhatsApp or call 08879327184. Open 24 hours, NABL accredited center.',
    images: [{ url: 'https://storage.googleapis.com/wp-media-henoticbucket/Front%20Office/henotic-diagnostics-name-plate.webp', width: 1200, height: 630, alt: 'Contact Henotic Diagnostics | Book Appointment in Navi Mumbai' }],
  },
};

export default function ContactUs() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans overflow-hidden mt-[80px]">
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]} />
      
      {/* Header Section */}
      <div className="pt-20 pb-12 text-center px-4 md:px-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none"></div>
        <h1 className="text-4xl font-black text-slate-900 sm:text-6xl drop-shadow-sm tracking-tight mb-6 relative z-10">
          Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4568dc] to-[#b06ab3]">Henotic Diagnostics</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 font-medium relative z-10">
          At Henotic Diagnostics, we are committed to delivering accurate, accessible, and patient-focused healthcare services.
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-24 px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Section 1: Introduction & Front Office (Deep 3D Image) */}
        <section className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden lg:flex lg:items-stretch border border-slate-100 relative">
          <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-[#E55D87] text-sm font-extrabold uppercase tracking-widest mb-6 w-max border border-pink-100">
              <ShieldCheck size={16} /> Patient-First Approach
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Comprehensive Care</h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
              Whether you need advanced imaging, preventive health checkups, blood tests, women&apos;s health diagnostics, or cardiac evaluations, our experienced team is here to support your healthcare journey with precision and care.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle2 className="text-[#4568dc]" size={20}/> State-of-the-art Infrastructure</li>
              <li className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle2 className="text-[#4568dc]" size={20}/> Highly Trained Medical Staff</li>
              <li className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle2 className="text-[#4568dc]" size={20}/> NABL &amp; ISO Certified Lab</li>
            </ul>
          </div>
          
          <div className="lg:w-1/2 relative p-6 lg:p-10 flex items-center justify-center bg-slate-50/50">
            {/* Deep 3D Frame Effect */}
            <div className="relative w-full h-[350px] lg:h-full min-h-[400px] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] border-[8px] border-white group transform transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_40px_70px_-15px_rgba(0,0,0,0.5)]">
              <Image width={600} height={500} src="https://storage.googleapis.com/wp-media-henoticbucket/Front%20Office/henotic-diagnostics-name-plate.webp" 
                alt="Henotic Diagnostics Front Office" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </section>

        {/* Section 2: Deep 3D Location & Waiting Area */}
        <section className="py-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Visit Our Center</h2>
             <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">Experience a hygienic, patient-centric environment designed for your comfort and peace of mind.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* 3D Waiting Area Image Container */}
            <div className="relative group w-full h-[400px] sm:h-[450px] rounded-[3rem] overflow-hidden bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform hover:-translate-y-4 transition-all duration-700 ease-out border-[8px] border-white">
              <Image width={800} height={800} src="https://storage.googleapis.com/wp-media-henoticbucket/Reception%20Area/henotic-diagnostics-waiting-area.webp" 
                alt="Henotic Diagnostics Reception and Waiting Area" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Floating Info Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="bg-blue-100 p-2 rounded-full text-blue-600"><Clock size={20}/></div>
                   <div>
                     <p className="text-xs font-bold text-slate-500 uppercase">Wait Time</p>
                     <p className="text-slate-900 font-black">Less than 15 Mins</p>
                   </div>
                 </div>
              </div>
            </div>

            {/* 3D Google Maps Container */}
            <div className="relative group w-full h-[320px] sm:h-[360px] rounded-[2.5rem] overflow-hidden bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] transform hover:-translate-y-2 transition-all duration-500 ease-out border-[6px] border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4687576643887!2d73.07795039999999!3d19.043116999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3812919666b%3A0xa377f33beeed1944!2sHenotic%20Diagnostics!5e0!3m2!1sen!2sin!4v1786048629791!5m2!1sen!2sin" 
                className="w-full h-full border-0 transition-all duration-500"
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Henotic Diagnostics Location"
              ></iframe>
              {/* Floating Address Badge */}
              <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl flex items-start justify-between gap-3">
                 <div className="flex items-start gap-3">
                   <div className="bg-pink-100 p-2 rounded-full text-[#E55D87] shrink-0 mt-0.5"><MapPin size={18}/></div>
                   <div>
                     <p className="text-slate-900 font-black text-sm">Navi Mumbai Headquarters</p>
                     <p className="text-xs font-bold text-slate-500 mt-0.5 leading-relaxed">Second Floor, Millennium Empire, Plot No 47, D Mart Rd, Sector 15, Kharghar, 410210</p>
                   </div>
                 </div>
                 <a href="https://maps.app.goo.gl/Ex2RG9afjvuEJp7y5" target="_blank" rel="noreferrer" className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md flex items-center gap-1.5 transition">
                   <Navigation size={14} /> Directions
                 </a>
              </div>
            </div>
            
          </div>
        </section>

        {/* --- PREMIUM BOOKING FORM SECTION --- */}
        <section className="py-8" id="booking">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="px-4">
              <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-blue-100 text-[#4568dc] font-extrabold text-xs tracking-widest uppercase mb-6 shadow-sm border border-blue-200">
                <ShieldCheck size={16} /> Official Booking Portal
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
                Excellence in <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4568dc] to-[#b06ab3]">Diagnostics</span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">
                <strong className="text-slate-900">12+ Years</strong> of precision. NABL Accredited. <br/>
                Trusted by leading specialists across Mumbai.
              </p>
              
              <div className="flex flex-col gap-4 mt-10">
                <a href="tel:08879327184" className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-lg border border-slate-100 hover:border-[#4568dc] transition-colors w-max group">
                  <div className="bg-blue-50 p-3 rounded-full text-[#4568dc] group-hover:scale-110 transition-transform"><Phone size={24}/></div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Emergency &amp; Booking</p>
                    <p className="text-xl font-black text-slate-900">08879327184</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Side: Interactive Form — Client Component */}
            <ContactBookingForm />
          </div>
        </section>

      </div>
      
      {/* 🌟 FINAL SECTION: 3D GOOGLE REVIEWS WIDGET ADDED HERE */}
      <GoogleReviews />

    </main>
  );
}