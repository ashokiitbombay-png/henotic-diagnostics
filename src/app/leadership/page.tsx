import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { 
  ShieldCheck, 
  Eye, 
  Activity, 
  Lightbulb, 
  UserCheck, 
  Award, 
  ArrowRight, 
  Sparkles, 
  Heart,
  Stethoscope,
  Building2,
  Users
} from "lucide-react";

export const metadata: Metadata = {
  title: "Leadership Team | Henotic Diagnostics",
  description: "Meet the visionary leadership team at Henotic Diagnostics — experts in healthcare, radiology, technology, operations, and strategy making quality healthcare accessible.",
  alternates: { canonical: "https://www.henoticdiagnostics.com/leadership" },
  openGraph: {
    title: "Leadership Team | Henotic Diagnostics",
    description: "Meet the visionary leadership team at Henotic Diagnostics — experts in healthcare, radiology, technology, operations, and strategy.",
    images: [{ url: "https://storage.googleapis.com/wp-media-henoticbucket/Leadership/Ashok-Majji-Founder-CEO.webp", width: 1200, height: 630, alt: "Leadership Team at Henotic Diagnostics" }],
  },
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trust",
    description: "Building lasting relationships with patients, doctors, and partners through uncompromised diagnostic accuracy."
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear communication, honest turnaround times, and upfront pricing for every medical test."
  },
  {
    icon: Activity,
    title: "Resilience",
    description: "Relentlessly overcoming operational and technical challenges to deliver continuous 24/7 care."
  },
  {
    icon: Lightbulb,
    title: "First Principle Thinking",
    description: "Re-imagining healthcare access from the ground up using technology, data, and patient-first design."
  },
  {
    icon: Award,
    title: "Leading with Character",
    description: "Upholding highest medical ethics, patient privacy, and clinical standards in everything we do."
  }
];

export default function LeadershipPage() {
  return (
    <div className="w-full font-sans overflow-x-hidden mt-[75px] md:mt-[85px] bg-gradient-to-r from-pink-200 via-violet-300 to-cyan-200 text-slate-800">
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Leadership", url: "/leadership" }]} />

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* 🌟 HERO BANNER (Indigo Competitor-Style Theme)                           */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Users size={14} className="text-indigo-400" />
              Leadership & Governance
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight mb-6">
              Leadership at Henotic Diagnostics
            </h1>
            <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed font-normal">
              Henotic Diagnostics is driven by a team of passionate, skilled, and dedicated professionals who believe in making quality healthcare more accessible, reliable, and patient-friendly. Together, our leadership team brings expertise across healthcare, diagnostics, radiology, technology, operations, strategy, and business growth to build a better future for patients and healthcare.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* 🌟 CORE LEADERSHIP VALUES SECTION                                          */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-pink-200 via-violet-300 to-cyan-200 border-b border-purple-300/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Core leadership values at Henotic Diagnostics
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              The fundamental principles guiding our team in building a transparent and patient-centric healthcare ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
            {VALUES.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div 
                  key={idx} 
                  className="flex flex-col items-center text-center p-5 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/70 hover:border-indigo-200 transition-all duration-300 group shadow-xs hover:shadow-md"
                >
                  <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <IconComp size={26} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* 🌟 EXECUTIVE FOUNDERS & BOARD (Alternating Large Cards)                     */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-pink-200 via-violet-300 to-cyan-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
          
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
              Executive Board
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Founders & Executive Leadership
            </h2>
          </div>

          {/* 1. Ashok Majji, PhD */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg hover:shadow-xl transition-shadow duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="lg:col-span-5 relative group">
              <div className="relative h-[380px] sm:h-[450px] w-full rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-100">
                <Image
                  src="https://storage.googleapis.com/wp-media-henoticbucket/Leadership/Ashok-Majji-Founder-CEO.webp"
                  alt="Ashok Majji, PhD — Founder & CEO"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  quality={95}
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
                FOUNDER & CEO
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Ashok Majji, PhD
              </h3>
              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-medium">
                <p>
                  Ashok Majji founded <strong>Henotic Healthcare Services (HHS) in 2019</strong> with a vision to make healthcare and diagnostic services easier for people to access. Based on his personal healthcare experience, he identified gaps in the way patients find, understand, and access diagnostic services.
                </p>
                <p>
                  Under his leadership, <strong>Henotic Diagnostics</strong> provides a wide range of healthcare services, including laboratory tests, radiology, medical imaging, cardiac diagnostics, and specialized healthcare services.
                </p>
                <p>
                  Henotic has a strong focus on <strong>radiology and medical imaging</strong>, offering Sonography, Ultrasound, CT Scan, MRI, PET Scan, DEXA, Mammography, Doppler, and other specialized imaging services.
                </p>
                <p>
                  Ashok continues to build Henotic with a focus on <strong>quality, technology, accessibility, and patient experience</strong>, with the goal of making reliable diagnostic care simple, convenient, and accessible to everyone.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Williams (Reversed Layout) */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg hover:shadow-xl transition-shadow duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
                CO-FOUNDER & BUSINESS OPERATIONS HEAD
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Williams
              </h3>
              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-medium">
                <p>
                  Williams plays a key role in managing <strong>lab operations, business development, and overall business growth at Henotic Diagnostics</strong>. He oversees day-to-day operational activities and works closely with teams to ensure smooth, efficient, and reliable diagnostic services.
                </p>
                <p>
                  His responsibilities include <strong>laboratory operations, business development, revenue growth, customer relationships, partnerships, operational planning, and expansion</strong>. He focuses on improving business performance while maintaining quality and a positive patient experience.
                </p>
                <p>
                  Williams is also actively involved in identifying new business opportunities, developing partnerships with doctors and healthcare providers, expanding services, and building strategies for sustainable growth.
                </p>
                <p>
                  With a strong focus on <strong>operations, business development, revenue, and growth</strong>, Williams works toward strengthening Henotic Diagnostics and expanding access to trusted diagnostic services across the region.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 relative group order-1 lg:order-2">
              <div className="relative h-[380px] sm:h-[450px] w-full rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-100">
                <Image
                  src="https://storage.googleapis.com/wp-media-henoticbucket/Leadership/williams-operational-head.webp"
                  alt="Williams — Co-Founder & Business Operations Head"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  quality={95}
                />
              </div>
            </div>
          </div>

          {/* 3. Krishan Majji */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg hover:shadow-xl transition-shadow duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="lg:col-span-5 relative group">
              <div className="relative h-[380px] sm:h-[450px] w-full rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-100">
                <Image
                  src="https://storage.googleapis.com/wp-media-henoticbucket/Leadership/krishna-majji.webp"
                  alt="Krishan Majji — Co-Founder & Chief Technology & Digital Officer"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  quality={95}
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
                CO-FOUNDER & CHIEF TECHNOLOGY & DIGITAL OFFICER
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Krishan Majji
              </h3>
              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-medium">
                <p>
                  Krishan Majji leads <strong>technology, digital development, and brand initiatives at Henotic Diagnostics</strong>. With a strong IT background and hands-on experience in <strong>web development, application design, digital platforms, and technology solutions</strong>, he plays an important role in building and improving Henotic’s digital presence.
                </p>
                <p>
                  From website development and user-friendly interface design to application planning, system improvements, digital operations, and technology support, Krishan works closely with the team to create simple and effective digital experiences for patients.
                </p>
                <p>
                  He is also actively involved in <strong>brand creation, digital identity, website design, online communication, and technology-driven marketing initiatives</strong>, helping build a consistent and trusted Henotic brand across digital platforms.
                </p>
                <p>
                  With a strong focus on innovation, usability, and continuous improvement, Krishan works to connect <strong>technology, healthcare, and design</strong> to create better digital experiences for patients and healthcare professionals.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* 🌟 MEDICAL & CLINICAL CONSULTANTS SECTION                                  */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-pink-200 via-violet-300 to-cyan-200 border-t border-b border-purple-300/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Clinical Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Full-Time Medical Consultants
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium mt-2">
              Dedicated medical specialists delivering accurate diagnostic reporting and clinical treatment guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            
            {/* Dr. Pratibha Patil */}
            <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="relative h-72 sm:h-80 w-full bg-slate-200">
                <Image
                  src="https://storage.googleapis.com/wp-media-henoticbucket/Leadership/dr-pratibha-patil-radiologist.webp"
                  alt="Dr. Pratibha Patil — Consultant Radiologist"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  quality={90}
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded uppercase tracking-wider">
                    CONSULTANT RADIOLOGIST | FULL-TIME
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">
                    Dr. Pratibha Patil
                  </h3>
                  <p className="text-xs font-semibold text-blue-900 mt-1">
                    MBBS, MD/DNB – Radio Diagnosis/Radiology
                  </p>

                  <div className="mt-3 bg-white/90 rounded-xl p-3 text-xs space-y-1.5 font-semibold text-slate-800 border border-slate-200/90 shadow-2xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Specialization:</span>
                      <span className="text-indigo-700 font-bold">Radiology</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                      <span className="text-slate-500 font-medium">MMC Reg. No:</span>
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-extrabold text-blue-900">2003/04/1800</span>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 space-y-2 font-medium">
                    <p>
                      Dr. Pratibha Patil is a Full-Time Consultant Radiologist at Henotic Diagnostics, with a focus on accurate and reliable medical imaging. She is involved in interpreting a wide range of radiology and imaging studies and supports doctors in reaching clear and informed diagnoses.
                    </p>
                    <p>
                      Her areas of work include <strong>Ultrasound, Sonography, CT Scan, MRI, Doppler studies</strong>, and other specialized imaging examinations. She is committed to accurate reporting and patient care.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dr. Ajinky Patil */}
            <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="relative h-72 sm:h-80 w-full bg-slate-200">
                <Image
                  src="https://storage.googleapis.com/wp-media-henoticbucket/Leadership/dr-ajinky-patil.webp"
                  alt="Dr. Ajinky Patil — Senior Consultant Neuroradiologist"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  quality={90}
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded uppercase tracking-wider">
                    SENIOR CONSULTANT NEURORADIOLOGIST | FULL-TIME
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">
                    Dr. Ajinky Patil
                  </h3>
                  <p className="text-xs font-semibold text-emerald-900 mt-1">
                    MBBS, MD – Radio Diagnosis/Radiology, DNB – Radio Diagnosis, DM – Neuro Radiology
                  </p>

                  <div className="mt-3 bg-white/90 rounded-xl p-3 text-xs space-y-1.5 font-semibold text-slate-800 border border-slate-200/90 shadow-2xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Specialization:</span>
                      <span className="text-emerald-700 font-bold">Neuroradiology</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Experience:</span>
                      <span className="text-slate-800 font-bold">28 Yrs Overall | 20 Yrs Specialist</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                      <span className="text-slate-500 font-medium">MMC Reg. No:</span>
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-extrabold text-emerald-900">076487</span>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 space-y-2 font-medium">
                    <p>
                      Dr. Ajinky Patil is a Senior Consultant Neuroradiologist at Henotic Diagnostics, bringing 28+ years of clinical excellence and 20 years of specialist expertise in brain, spine, neurovascular, and head & neck imaging.
                    </p>
                    <p>
                      His clinical work includes <strong>advanced Neuroradiology, brain MRI, stroke protocol CT/MRI, spine diagnostics, and neurovascular imaging evaluations</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dr. Amulya Patil */}
            <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="relative h-72 sm:h-80 w-full bg-slate-200">
                <Image
                  src="https://storage.googleapis.com/wp-media-henoticbucket/Leadership/dr.amulya-patil.webp"
                  alt="Dr. Amulya Patil — Senior Consultant Cardiologist"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  quality={90}
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded uppercase tracking-wider">
                    SENIOR CONSULTANT CARDIOLOGIST | FULL-TIME
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">
                    Dr. Amulya Patil
                  </h3>
                  <p className="text-xs font-semibold text-rose-900 mt-1">
                    MBBS, MD (General Medicine), DM (Cardiology)
                  </p>

                  <div className="mt-3 bg-white/90 rounded-xl p-3 text-xs space-y-1.5 font-semibold text-slate-800 border border-slate-200/90 shadow-2xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Specialization:</span>
                      <span className="text-rose-700 font-bold">Cardiology</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                      <span className="text-slate-500 font-medium">MMC Reg. No:</span>
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-extrabold text-rose-900">2010020293</span>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 space-y-2 font-medium">
                    <p>
                      Dr. Amulya Patil is a Senior Consultant Cardiologist at Henotic Diagnostics, providing specialized care for patients with heart and cardiovascular conditions. He focuses on evaluation, diagnosis, and preventive heart care.
                    </p>
                    <p>
                      He works closely with diagnostic teams for cardiac investigations such as <strong>2D Echo, TMT, ECG, and Holter Monitoring</strong>, helping patients make informed healthcare decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* 🌟 MANAGEMENT & STRATEGY LEADERSHIP GRID (Matching Screenshot 3)          */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-pink-200 via-violet-300 to-cyan-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              Operational & Brand Management
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Management & Strategy Leadership
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium mt-2">
              Overseeing strategic growth, daily process execution, and people operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Miss Poonam Sharma */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col text-center items-center group">
              <div className="relative h-48 w-48 sm:h-56 sm:w-56 rounded-2xl overflow-hidden shadow-inner bg-slate-100 mb-5 border-2 border-slate-100">
                <Image
                  src="https://storage.googleapis.com/wp-media-henoticbucket/Leadership/miss-poonam-sharma.webp"
                  alt="Miss Poonam Sharma — Global Chief Strategy & Marketing Officer"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  quality={90}
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Miss Poonam Sharma
              </h3>
              <span className="text-xs font-bold text-purple-700 mt-1 uppercase tracking-wider">
                GLOBAL CHIEF STRATEGY & MARKETING OFFICER
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 font-medium">
                Poonam Sharma leads strategy, marketing, brand development, and business growth at Henotic Diagnostics. She focuses on market expansion, digital marketing, customer engagement, partnerships, and building a strong healthcare brand. Her work supports Henotic’s growth and helps connect more patients with trusted diagnostic services.
              </p>
            </div>

            {/* Mr. Rahul Sharma */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col text-center items-center group">
              <div className="relative h-48 w-48 sm:h-56 sm:w-56 rounded-2xl overflow-hidden shadow-inner bg-slate-100 mb-5 border-2 border-slate-100">
                <Image
                  src="https://storage.googleapis.com/wp-media-henoticbucket/Leadership/mr-rahul-sharma.webp"
                  alt="Mr. Rahul Sharma — Chief of Staff & Head of Operations"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  quality={90}
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Mr. Rahul Sharma
              </h3>
              <span className="text-xs font-bold text-indigo-700 mt-1 uppercase tracking-wider">
                CHIEF OF STAFF & HEAD OF OPERATIONS
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 font-medium">
                Rahul Sharma oversees daily operations, team coordination, process management, and operational planning at Henotic Diagnostics. He works closely with leadership and teams to ensure smooth execution of business activities, improve efficiency, and maintain service quality.
              </p>
            </div>

            {/* Miss Pragati Patil */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col text-center items-center group">
              <div className="relative h-48 w-48 sm:h-56 sm:w-56 rounded-2xl overflow-hidden shadow-inner bg-slate-100 mb-5 border-2 border-slate-100">
                <Image
                  src="https://storage.googleapis.com/wp-media-henoticbucket/Leadership/miss-pragati-patil.webp"
                  alt="Miss Pragati Patil — Head Human Resources"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  quality={90}
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Miss Pragati Patil
              </h3>
              <span className="text-xs font-bold text-emerald-700 mt-1 uppercase tracking-wider">
                HEAD – HUMAN RESOURCES
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 font-medium">
                Pragati Patil leads Human Resources and people operations at Henotic Diagnostics. She is responsible for employee recruitment, onboarding, workforce planning, team coordination, employee engagement, and HR processes. She focuses on building a motivated and professional workforce.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* 🌟 JOIN US CTA BANNER                                                    */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-bold uppercase tracking-wider border border-white/15">
            <Sparkles size={14} className="text-amber-300" />
            Careers & Mission
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Excited?
          </h2>
          <p className="text-slate-200 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Come join us in our mission to make healthcare more accessible, affordable, and convenient.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-black text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <span>Join Us</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
