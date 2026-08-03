import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

const services = [
  { id: "radiology", title: "Advanced Radiology", desc: "3T MRI, 128-Slice CT, and Digital X-Ray with low-radiation protocols.", img: "https://storage.googleapis.com/wp-media-henoticbucket/Miscellaneous%20Section%20Images/934e91ce-ct-scan-kharghar-01-scaled.webp", link: "/services/mri-scan" },
  { id: "nuclear", title: "Nuclear Medicine", desc: "PET-CT for precise cancer staging and metabolic imaging.", img: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/49b5aa8f-henotic-diagnostics-mri-scan-ct-scan-pet-scan-dopa-scan.webp", link: "/services/pet-scan" },
  { id: "cardiac", title: "Cardiac Sciences", desc: "Angiography, 2D Echo, and TMT for comprehensive heart evaluation.", img: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/7f8eb649-tmt-test-stress-echo-test-stress-test-2d-echo-test-kharghar-henotic-diagnostics-navi-mumbai.webp", link: "/services/ultrasound" },
  { id: "pathology", title: "Clinical Pathology", desc: "Automated analyzers for blood, hormone, and infection markers.", img: "https://storage.googleapis.com/wp-media-henoticbucket/Laboratory/laboratory-henotic-diagnostics-ct-scan-dexa-bone-scan-mri-scan-sonography-ultrasound-pet-scan-dopa-scan-kharghar-navi-mumbai.webp", link: "/services/blood-test" }
];

const GALLERY_IMAGES = [
  { src: "https://storage.googleapis.com/wp-media-henoticbucket/Trust%20Signal/henotic-diagnostics-reception-waiting-area_hero.webp", alt: "Premium Reception & Waiting Area" },
  { src: "https://storage.googleapis.com/wp-media-henoticbucket/Trust%20Signal/mri-scan-henotic-diagnostics_hero.webp", alt: "3T MRI Scanner Suite" },
  { src: "https://storage.googleapis.com/wp-media-henoticbucket/Trust%20Signal/reception-desk-henotic-diagnostics_hero.webp", alt: "Patient Service Desk" },
  { src: "https://storage.googleapis.com/wp-media-henoticbucket/Trust%20Signal/henotic-diagnostics-pet-scan_hero.webp", alt: "PET-CT Imaging Center" },
];

const MODALITIES = [
  { name: "Pathology", href: "/services/blood-test" },
  { name: "Ultrasound & Color Doppler", href: "/services/ultrasound" },
  { name: "CT Scan", href: "/services/ct-scan" },
  { name: "MRI", href: "/services/mri-scan" },
  { name: "PET-CT", href: "/services/pet-scan" },
  { name: "Nuclear Medicine", href: "/services/nuclear-medicine" },
  { name: "Digital X-Ray", href: "/services/digital-x-ray" },
  { name: "Mammography", href: "/services/mammography" },
  { name: "DEXA", href: "/services/dexa-bone-scan" },
  { name: "Cardiology", href: "/services/2d-echo" },
  { name: "Preventive Health Checkups", href: "/services/health-checkup" },
  { name: "Genetic Testing", href: "/services/genetic-test" },
];

export default function ServiceLines() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-100 pb-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-extrabold text-blue-950 mb-4">Core Modalities</h2>
            <p className="text-slate-600 text-lg font-medium">Complete spectrum of diagnostic imaging and pathology under one roof.</p>
          </div>
          <Link href="/services" className="hidden md:flex items-center font-bold text-[#E55D87] hover:text-pink-600 transition p-2 bg-pink-50 rounded-xl px-4">
            View All Departments <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <Link key={s.id} href={s.link} className="group relative bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-[350px]">
              <div className="absolute inset-0">
                <Image
                  fill
                  src={s.img}
                  alt={s.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-40"
                  loading="lazy"
                  quality={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xl font-extrabold text-white mb-2">{s.title}</h3>
                <p className="text-blue-100 text-sm font-medium mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{s.desc}</p>
                <div className="flex items-center text-xs font-bold text-[#E55D87] uppercase tracking-widest bg-white/10 w-max px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20">
                  Explore <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 🏥 PREMIUM FACILITY SHOWCASE & TRUST SIGNAL CARD */}
        <div
          className="mt-20 rounded-[2.5rem] p-1 shadow-[0_30px_80px_-15px_rgba(99,102,241,0.35),0_10px_30px_-5px_rgba(219,39,119,0.2)]"
          style={{ background: "linear-gradient(to right, #3b82f6, #6366f1, #db2777)" }}
        >
          <div className="bg-white rounded-[2.3rem] p-6 sm:p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

              {/* LEFT: Image Gallery */}
              <div className="space-y-4">
                {/* Hero Image */}
                <div
                  className="relative group rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)]"
                  style={{
                    border: "4px solid transparent",
                    backgroundImage: "linear-gradient(white, white), linear-gradient(to right, #3b82f6, #6366f1, #db2777)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                  }}
                >
                  <Image
                    src="https://storage.googleapis.com/wp-media-henoticbucket/Trust%20Signal/henotic-diagnostics-main-entrance_hero.webp"
                    alt="Henotic Diagnostics Corporate Building — Main Entrance"
                    width={800}
                    height={450}
                    className="w-full h-[220px] sm:h-[280px] md:h-[340px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                    <span className="text-white font-black text-sm sm:text-base drop-shadow-lg">
                      Henotic Diagnostics — Corporate Center
                    </span>
                  </div>
                </div>

                {/* 4 Facility Thumbnails */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {GALLERY_IMAGES.map((img, i) => (
                    <div
                      key={i}
                      className="relative group rounded-xl overflow-hidden shadow-[0_10px_30px_-8px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_-8px_rgba(99,102,241,0.35)] transition-all duration-500 hover:-translate-y-1"
                      style={{
                        border: "3px solid transparent",
                        backgroundImage: "linear-gradient(white, white), linear-gradient(to right, #3b82f6, #6366f1, #db2777)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={300}
                        height={200}
                        className="w-full h-[100px] sm:h-[120px] object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        quality={80}
                        sizes="25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                        <span className="text-white text-[10px] sm:text-xs font-bold drop-shadow-md">
                          {img.alt}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Text Content & Google Reviews */}
              <div className="flex flex-col justify-center">
                {/* Heading */}
                <div className="mb-6">
                  <span
                    className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4 text-white shadow-md"
                    style={{ background: "linear-gradient(to right, #3b82f6, #6366f1, #db2777)" }}
                  >
                    Multi-Specialty Diagnostics
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black text-blue-950 leading-tight mb-2">
                    Core Modalities
                  </h3>
                  <div
                    className="w-20 h-1.5 rounded-full"
                    style={{ background: "linear-gradient(to right, #3b82f6, #6366f1, #db2777)" }}
                  />
                </div>

                {/* Description */}
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium mb-6 text-justify">
                  Henotic Diagnostics is a trusted multi-specialty diagnostic center offering accurate,
                  affordable, and advanced healthcare services under one roof. Our comprehensive
                  diagnostics include Pathology, Ultrasound &amp; Color Doppler, CT Scan, MRI, PET-CT,
                  Nuclear Medicine, Digital X-Ray, Mammography, DEXA, Cardiology, Preventive Health
                  Checkups, and Genetic Testing. Supported by accredited partner laboratories and
                  imaging centers, we deliver reliable reports, advanced technology, and patient-focused
                  care with the highest quality standards.
                </p>

                {/* Modality Tags — Interlinked to Service Pages */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {MODALITIES.map((mod, i) => (
                    <Link
                      key={i}
                      href={mod.href}
                      className="px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200 text-slate-700 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                    >
                      {mod.name}
                    </Link>
                  ))}
                </div>

                {/* ⭐ Google Reviews Trust Badge */}
                <div className="rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] bg-gradient-to-br from-white to-slate-50">
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    {/* Google Business Profile Image */}
                    <div className="relative shrink-0">
                      <Image
                        width={80}
                        height={80}
                        src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/google-my-business-profile-icon.webp"
                        alt="Google Business Profile"
                        className="w-20 h-20 rounded-2xl object-cover shadow-[0_10px_30px_-8px_rgba(0,0,0,0.3)] border-2 border-white"
                        loading="lazy"
                      />
                      <Image
                        width={32}
                        height={32}
                        src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/Google.webp"
                        alt="Google"
                        className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full p-1 shadow-lg border-2 border-white object-contain"
                        loading="lazy"
                      />
                    </div>

                    {/* Rating */}
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                        <Image
                          width={36}
                          height={36}
                          src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/Google.webp"
                          alt="Google"
                          className="w-9 h-9 object-contain drop-shadow-md"
                          loading="lazy"
                        />
                        <span className="text-slate-800 font-extrabold text-lg">Google Reviews</span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                        <span className="text-4xl font-black text-slate-900 drop-shadow-sm">4.9</span>
                        <div className="flex gap-1 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={24} className="fill-amber-400 text-amber-400 drop-shadow-sm" />
                          ))}
                        </div>
                      </div>
                      <span className="text-slate-500 font-bold text-sm">(1,030) Patient Reviews</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-5 pt-5 border-t border-slate-100">
                    <a
                      href="https://maps.google.com/?cid=11779150789147957572"
                      target="_blank" rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 bg-white border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 text-blue-800 font-bold rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group"
                    >
                      <Image
                        width={28}
                        height={28}
                        src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/Google-maps.webp"
                        alt="Google Maps"
                        className="w-7 h-7 object-contain drop-shadow-sm group-hover:scale-110 transition-transform"
                        loading="lazy"
                      />
                      View on Maps
                    </a>
                    <a
                      href="https://share.google/IcBtvtVjwozCBFMPp"
                      target="_blank" rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                      style={{ background: "linear-gradient(to right, #3b82f6, #6366f1, #db2777)" }}
                    >
                      Write a Review
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}