"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, CalendarCheck, ChevronDown } from "lucide-react";
import BookingForm from "@/components/forms/BookingForm"; 
import Modal from "@/components/ui/Modal";
import { siteConfig } from "@/config/site";
import { routesConfig } from "@/config/routes";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  
  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Handle header scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out bg-header-footer-gradient ${scrolled ? "shadow-lg py-2" : "py-4"}`}>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl w-full flex items-center justify-between">
          
          {/* LOGO */}
          <Link href={routesConfig.home} className="flex items-center gap-3 relative z-50 group shrink-0">
            <div className="bg-white rounded-full p-1 shadow-md group-hover:scale-105 transition-transform duration-300">
              <Image 
                src="https://storage.googleapis.com/wp-media-henoticbucket/Site-Icon-SVG%20files/henotic-diagnostics-logo-site-icon.webp" 
                alt="Henotic Diagnostics Logo" 
                width={48} 
                height={48} 
                className="h-10 w-10 md:h-12 md:w-12 object-contain" 
                priority 
              />
            </div>
            <div className="flex flex-col justify-center leading-none">
              <span className="text-white font-extrabold text-lg md:text-xl tracking-tight m-0 p-0 drop-shadow-sm">HENOTIC</span>
              <span className="text-white/90 font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase m-0 p-0">DIAGNOSTICS</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center justify-center gap-8 text-white font-bold text-sm flex-grow">
            <Link href={routesConfig.home} className="hover:text-white/80 transition-colors duration-200 py-2 drop-shadow-sm">Home</Link>
            <Link href={routesConfig.aboutUs} className="hover:text-white/80 transition-colors duration-200 py-2 drop-shadow-sm">About Us</Link>
            
            <div className="relative group py-2" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
              <button className="flex items-center gap-1 hover:text-white/80 transition-colors duration-200 drop-shadow-sm cursor-pointer">
                Services <ChevronDown size={16} className={`transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute top-[120%] left-1/2 -translate-x-1/2 w-[450px] bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 grid grid-cols-2 gap-6 border border-gray-100 ${isServicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-4 pointer-events-none"}`}>
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-2 border-b border-gray-100 pb-2 w-full text-left">Advanced Imaging</h4>
                  <Link href={routesConfig.getServiceUrl("mri-scan")} className="hover:text-blue-600 font-medium transition-colors block text-gray-600 text-sm text-left">MRI Scan (3T)</Link>
                  <Link href={routesConfig.getServiceUrl("ct-scan")} className="hover:text-blue-600 font-medium transition-colors block text-gray-600 text-sm text-left">CT Scan (128 Slice)</Link>
                  <Link href={routesConfig.getServiceUrl("pet-scan")} className="hover:text-blue-600 font-medium transition-colors block text-gray-600 text-sm text-left">PET-CT Scan</Link>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-pink-600 uppercase tracking-widest mb-2 border-b border-gray-100 pb-2 w-full text-left">Pathology & More</h4>
                  <Link href={routesConfig.getServiceUrl("blood-test")} className="hover:text-pink-600 font-medium transition-colors block text-gray-600 text-sm text-left">Blood Tests</Link>
                  <Link href={routesConfig.getServiceUrl("full-body-check-up")} className="hover:text-pink-600 font-medium transition-colors block text-gray-600 text-sm text-left">Full Body Checkup</Link>
                  <Link href={routesConfig.getServiceUrl("ultrasound")} className="hover:text-pink-600 font-medium transition-colors block text-gray-600 text-sm text-left">Ultrasound / USG</Link>
                </div>
              </div>
            </div>
            <Link href={routesConfig.contact} className="hover:text-white/80 transition-colors duration-200 py-2 drop-shadow-sm">Contact</Link>
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a href={siteConfig.contact.phonePrimaryRaw} className="flex items-center justify-center gap-2 text-white border border-white/40 hover:bg-white/20 px-5 py-2.5 rounded-full font-bold text-sm transition-colors duration-200 shadow-sm">
              <Phone size={16} /> {siteConfig.contact.phonePrimary}
            </a>
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); setIsBookingOpen(true); }}
              className="btn-grad flex items-center justify-center gap-2 text-sm font-bold shadow-lg cursor-pointer"
            >
              <CalendarCheck size={16} /> Book Appointment
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button aria-label="Toggle Mobile Menu" className="lg:hidden text-white z-50 p-2 shrink-0 flex items-center justify-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE DRAWER */}
        <div className={`lg:hidden fixed inset-0 top-[70px] bg-white transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} overflow-y-auto pb-20 w-full`}>
           <div className="flex flex-col p-6 text-gray-800 font-semibold text-lg w-full max-w-md mx-auto">
              <Link href={routesConfig.home} className="py-4 border-b border-gray-100" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href={routesConfig.aboutUs} className="py-4 border-b border-gray-100" onClick={() => setIsOpen(false)}>About Us</Link>
              <Link href={routesConfig.contact} className="py-4 border-b border-gray-100" onClick={() => setIsOpen(false)}>Contact</Link>
              <div className="mt-8 flex flex-col gap-4 w-full">
                <a href={siteConfig.contact.phonePrimaryRaw} className="w-full flex justify-center items-center gap-2 py-4 rounded-full border-2 border-blue-200 text-blue-600 font-bold transition-colors hover:bg-blue-50">
                  <Phone size={20} /> Call {siteConfig.contact.phonePrimary}
                </a>
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

      {/* 🌟 BULLETPROOF PREMIUM BOOKING MODAL (MAXIMUM Z-INDEX) 🌟 */}
      <Modal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)}>
        <BookingForm />
      </Modal>
    </>
  );
}