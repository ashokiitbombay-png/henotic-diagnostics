"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, CalendarCheck, ChevronDown, Calendar, MessageCircle } from "lucide-react";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  
  // 🌟 NEW: Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '', test: '', center: '', date: '', time: '' });

  // Handle header scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🌟 NEW: Prevent background scrolling when modal is open
  useEffect(() => {
    if (isBookingOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; }
  }, [isBookingOpen]);

  // 🌟 NEW: Form Handlers
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
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out bg-header-footer-gradient ${scrolled ? "shadow-lg py-2" : "py-4"}`}>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl w-full flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 relative z-50 group shrink-0">
            <div className="bg-white rounded-full p-1 shadow-md group-hover:scale-105 transition-transform duration-300">
              <img src="https://storage.googleapis.com/wp-media-henoticbucket/Site-Icon-SVG%20files/henotic-diagnostics-logo-site-icon.svg" alt="Henotic Diagnostics Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
            </div>
            <div className="flex flex-col justify-center leading-none">
              <span className="text-white font-extrabold text-lg md:text-xl tracking-tight m-0 p-0 drop-shadow-sm">HENOTIC</span>
              <span className="text-white/90 font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase m-0 p-0">DIAGNOSTICS</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center justify-center gap-8 text-white font-bold text-sm flex-grow">
            <Link href="/" className="hover:text-white/80 transition-colors duration-200 py-2 drop-shadow-sm">Home</Link>
            <Link href="/about-us" className="hover:text-white/80 transition-colors duration-200 py-2 drop-shadow-sm">About Us</Link>
            
            <div className="relative group py-2" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
              <button className="flex items-center gap-1 hover:text-white/80 transition-colors duration-200 drop-shadow-sm">
                Services <ChevronDown size={16} className={`transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute top-[120%] left-1/2 -translate-x-1/2 w-[450px] bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 grid grid-cols-2 gap-6 border border-gray-100 ${isServicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-4 pointer-events-none"}`}>
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-2 border-b border-gray-100 pb-2 w-full text-left">Advanced Imaging</h4>
                  <Link href="/services/mri-scan" className="hover:text-blue-600 font-medium transition-colors block text-gray-600 text-sm text-left">MRI Scan (3T)</Link>
                  <Link href="/services/ct-scan" className="hover:text-blue-600 font-medium transition-colors block text-gray-600 text-sm text-left">CT Scan (128 Slice)</Link>
                  <Link href="/services/pet-scan" className="hover:text-blue-600 font-medium transition-colors block text-gray-600 text-sm text-left">PET-CT Scan</Link>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-pink-600 uppercase tracking-widest mb-2 border-b border-gray-100 pb-2 w-full text-left">Pathology & More</h4>
                  <Link href="/services/blood-test" className="hover:text-pink-600 font-medium transition-colors block text-gray-600 text-sm text-left">Blood Tests</Link>
                  <Link href="/services/full-body-check-up" className="hover:text-pink-600 font-medium transition-colors block text-gray-600 text-sm text-left">Full Body Checkup</Link>
                  <Link href="/services/ultrasound" className="hover:text-pink-600 font-medium transition-colors block text-gray-600 text-sm text-left">Ultrasound / USG</Link>
                </div>
              </div>
            </div>
            <Link href="/contact" className="hover:text-white/80 transition-colors duration-200 py-2 drop-shadow-sm">Contact</Link>
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a href="tel:08879327184" className="flex items-center justify-center gap-2 text-white border border-white/40 hover:bg-white/20 px-5 py-2.5 rounded-full font-bold text-sm transition-colors duration-200 shadow-sm">
              <Phone size={16} /> 08879327184
            </a>
            {/* 🌟 APPLIED .btn-grad & onClick HERE */}
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); setIsBookingOpen(true); }}
              className="btn-grad flex items-center justify-center gap-2 text-sm font-bold shadow-lg cursor-pointer"
            >
              <CalendarCheck size={16} /> Book Appointment
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button className="lg:hidden text-white z-50 p-2 shrink-0 flex items-center justify-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE DRAWER */}
        <div className={`lg:hidden fixed inset-0 top-[70px] bg-white transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} overflow-y-auto pb-20 w-full`}>
           <div className="flex flex-col p-6 text-gray-800 font-semibold text-lg w-full max-w-md mx-auto">
              <Link href="/" className="py-4 border-b border-gray-100" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="/about-us" className="py-4 border-b border-gray-100" onClick={() => setIsOpen(false)}>About Us</Link>
              <Link href="/contact" className="py-4 border-b border-gray-100" onClick={() => setIsOpen(false)}>Contact</Link>
              <div className="mt-8 flex flex-col gap-4 w-full">
                <a href="tel:08879327184" className="w-full flex justify-center items-center gap-2 py-4 rounded-full border-2 border-blue-200 text-blue-600 font-bold transition-colors hover:bg-blue-50">
                  <Phone size={20} /> Call 08879327184
                </a>
                {/* 🌟 APPLIED .btn-grad & onClick HERE */}
                <button 
                  type="button"
                  onClick={(e) => { e.preventDefault(); setIsBookingOpen(true); setIsOpen(false); }} 
                  className="btn-grad w-full flex justify-center items-center gap-2 shadow-lg cursor-pointer"
                >
                  <CalendarCheck size={20} /> Book Appointment
                </button>
              </div>
           </div>
        </div>
      </header>

      {/* 🌟 BULLETPROOF INLINE BOOKING MODAL (MAXIMUM Z-INDEX) 🌟 */}
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