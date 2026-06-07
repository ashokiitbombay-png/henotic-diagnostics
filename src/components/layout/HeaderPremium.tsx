"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, CalendarCheck, ChevronDown, X, Menu, Calendar, MessageCircle } from "lucide-react";

export default function HeaderPremium() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Inline Form State to guarantee it works without external files
  const [formData, setFormData] = useState({ name: '', mobile: '', test: '', center: '', date: '', time: '' });

  // Handle scroll effect for shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isBookingOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; }
  }, [isBookingOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = `Hello Henotic Diagnostics, I would like to book an appointment:%0A- Name: *${formData.name}*%0A- Mobile: *${formData.mobile}*%0A- Test: *${formData.test}*%0A- Center: *${formData.center}*%0A- Date: *${formData.date}*%0A- Time: *${formData.time}*`;
    window.open(`https://wa.me/9108879327184?text=${message}`, '_blank');
    setIsBookingOpen(false); // Close modal after booking
  };

  return (
    <>
      {/* --- HEADER NAVBAR --- */}
      <header 
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${isScrolled ? "shadow-lg py-2" : "py-3"}`}
        style={{
          background: "linear-gradient(to right, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe)"
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* LOGO AREA */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center p-1.5 shadow-md group-hover:scale-105 transition-transform">
              <img decoding="async" 
                src="https://storage.googleapis.com/wp-media-henoticbucket/Site-Icon-SVG%20files/henotic-diagnostics-logo-site-icon.svg" 
                alt="Henotic Diagnostics Logo" 
                className="w-full h-full object-contain"
              fetchPriority="high" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-lg md:text-xl tracking-wide leading-tight drop-shadow-sm uppercase">Henotic</span>
              <span className="text-white/90 font-bold text-[9px] md:text-[10px] tracking-[0.2em] uppercase leading-tight">Diagnostics</span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-white font-bold text-sm hover:text-white/70 transition-colors">Home</Link>
            <Link href="/about-us" className="text-white font-bold text-sm hover:text-white/70 transition-colors">About Us</Link>
            <div className="relative group cursor-pointer flex items-center gap-1">
              <Link href="/services" className="text-white font-bold text-sm hover:text-white/70 transition-colors">Services</Link>
              <ChevronDown size={14} className="text-white" />
            </div>
            <Link href="/contact" className="text-white font-bold text-sm hover:text-white/70 transition-colors">Contact</Link>
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:08879327184" 
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/40 text-white font-bold text-sm hover:bg-white/20 transition-all"
            >
              <Phone size={16} /> 08879327184
            </a>
            
            {/* 🌟 ROSE WATER ANIMATED BUTTON (DESKTOP) 🌟 */}
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); setIsBookingOpen(true); }}
              className="btn-grad flex items-center gap-2 font-black text-sm cursor-pointer !py-2 !px-6"
            >
              <CalendarCheck size={16} /> BOOK APPOINTMENT
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button 
            type="button"
            className="lg:hidden text-white p-2 relative z-50 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE NAVIGATION DROPDOWN */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] border-b border-purple-100' : 'max-h-0'}`}>
          <div className="flex flex-col p-6 space-y-4 text-slate-800 font-medium">
            <Link href="/" className="hover:text-[#4568dc] transition" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/about-us" className="hover:text-[#4568dc] transition" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link href="/services" className="hover:text-[#4568dc] transition" onClick={() => setIsMobileMenuOpen(false)}>All Services</Link>
            <Link href="/contact" className="hover:text-[#4568dc] transition" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <a href="tel:08879327184" className="flex items-center justify-center gap-2 text-slate-700 bg-slate-50 py-3 rounded-xl font-bold border border-slate-200">
                <Phone size={18} className="text-[#4568dc]" /> Call 08879327184
              </a>
              
              {/* 🌟 ROSE WATER ANIMATED BUTTON (MOBILE) 🌟 */}
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); setIsBookingOpen(true); setIsMobileMenuOpen(false); }} 
                className="btn-grad flex items-center justify-center gap-2 font-black w-full cursor-pointer !rounded-xl !py-3"
              >
                <CalendarCheck size={18} /> Book Appointment
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- BULLETPROOF INLINE BOOKING MODAL (MAXIMUM Z-INDEX) --- */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 sm:p-6" style={{ isolation: 'isolate' }}>
          
          {/* Dark Glassmorphic Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer" 
            onClick={() => setIsBookingOpen(false)}
          ></div>

          {/* Modal Content Box */}
          <div className="relative bg-white rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] w-full max-w-3xl max-h-[90vh] overflow-y-auto z-10 border-4 border-white/50 animate-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-slate-100 hover:bg-pink-100 hover:text-[#E55D87] text-slate-800 rounded-full transition-colors z-50 shadow-sm cursor-pointer"
              aria-label="Close Booking Form"
            >
              <X size={24} />
            </button>

            <div className="p-6 sm:p-10 relative z-40">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#4568dc] text-xs font-extrabold uppercase tracking-widest mb-4">
                  <Calendar size={16} /> Priority Scheduling
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900">
                  Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4568dc] to-[#b06ab3]">Appointment</span>
                </h2>
                <p className="text-slate-500 mt-2 font-medium">Fast, secure, and instant confirmation via WhatsApp.</p>
              </div>
              
              {/* THE INLINE WHATSAPP FORM */}
              <form className="space-y-4" onSubmit={handleWhatsAppSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Patient Name" required className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#4568dc] focus:ring-4 focus:ring-blue-50 text-slate-800 font-bold transition-all outline-none" />
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" required className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#4568dc] focus:ring-4 focus:ring-blue-50 text-slate-800 font-bold transition-all outline-none" />
                </div>

                <select name="test" value={formData.test} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#4568dc] focus:ring-4 focus:ring-blue-50 text-slate-800 font-bold transition-all outline-none appearance-none">
                  <option value="" disabled>Select Test Name</option>
                  <option value="MRI Scan">MRI Scan</option>
                  <option value="CT Scan">CT Scan</option>
                  <option value="NT Scan / Sonography">NT Scan / Sonography</option>
                  <option value="PET CT Scan">PET CT Scan</option>
                  <option value="Blood Test / Pathology">Blood Test / Pathology</option>
                  <option value="Health Checkup Package">Health Checkup Package</option>
                </select>

                <select name="center" value={formData.center} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#4568dc] focus:ring-4 focus:ring-blue-50 text-slate-800 font-bold transition-all outline-none appearance-none">
                  <option value="" disabled>Select Nearest Center</option>
                  <option value="Kharghar Center">Kharghar Center</option>
                  <option value="Panvel Center">Panvel Center</option>
                  <option value="Navi Mumbai (Main)">Navi Mumbai (Main)</option>
                </select>

                <div className="grid grid-cols-2 gap-4">
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#4568dc] focus:ring-4 focus:ring-blue-50 text-slate-800 font-bold transition-all outline-none" />
                  <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#4568dc] focus:ring-4 focus:ring-blue-50 text-slate-800 font-bold transition-all outline-none" />
                </div>

                <button 
                  type="submit" 
                  className="w-full mt-6 bg-gradient-to-r from-[#25D366] to-[#1DA851] hover:from-[#1DA851] hover:to-[#128C7E] text-white font-black py-5 px-6 rounded-2xl shadow-lg transform transition-all hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
                >
                  <MessageCircle size={24} className="fill-current" /> Confirm via WhatsApp
                </button>
              </form>

            </div>
          </div>
        </div>
      )}
    </>
  );
}