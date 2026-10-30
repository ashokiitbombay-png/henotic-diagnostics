'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Stethoscope,
  Award,
  GraduationCap,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MessageSquare,
  Sparkles,
  Search
} from 'lucide-react';
import { DOCTORS, DoctorProfile } from '@/config/doctors';
import { LAB_WHATSAPP_NUMBER, LAB_PHONE_TEL } from '@/config/health-checkup/trust';

// Department categorization for easy filtering
const DEPARTMENTS = [
  { id: 'all', label: 'All Specialists (12)' },
  { id: 'radiology', label: 'Radiology & Imaging (5)' },
  { id: 'pathology', label: 'Pathology & Lab (3)' },
  { id: 'womens-fetal', label: "Women's & Fetal (2)" },
  { id: 'cardiology-nuclear', label: 'Cardiology & Nuclear (2)' },
];

function getDepartmentForDoctor(doc: DoctorProfile): string {
  const d = doc.designation.toLowerCase();
  const s = doc.specializations.join(' ').toLowerCase();

  if (d.includes('fetal') || d.includes("women's") || s.includes('mammography') || s.includes('prenatal')) {
    return 'womens-fetal';
  }
  if (d.includes('patholog') || d.includes('biochemist') || d.includes('geneticist') || d.includes('preventive')) {
    return 'pathology';
  }
  if (d.includes('cardiolog') || d.includes('nuclear medicine')) {
    return 'cardiology-nuclear';
  }
  return 'radiology';
}

function getDoctorInitials(name: string): string {
  return name.replace(/^Dr\.\s*/i, '').split(' ').map(n => n.charAt(0)).slice(0, 2).join('');
}

// Department badge colors
const DEPT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  radiology: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  pathology: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'womens-fetal': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
  'cardiology-nuclear': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
};

export default function DoctorsPage() {
  const [selectedDept, setSelectedDept] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return DOCTORS.filter(doc => {
      const dept = getDepartmentForDoctor(doc);
      if (selectedDept !== 'all' && dept !== selectedDept) return false;
      if (!q) return true;
      return (
        doc.name.toLowerCase().includes(q) ||
        doc.designation.toLowerCase().includes(q) ||
        doc.credentials.toLowerCase().includes(q) ||
        doc.specializations.some(s => s.toLowerCase().includes(q))
      );
    });
  }, [selectedDept, searchQuery]);

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px] pb-24">
      {/* ── Hero Section ───────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0c1e3e] via-[#1a2d54] to-[#254680] text-white py-16 md:py-20 px-4 md:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-cyan-200 border border-white/20 text-xs font-black uppercase tracking-wider mb-5 backdrop-blur-md">
            <Award size={14} className="text-cyan-300" />
            NABL-Accredited Senior Medical Faculty
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
            Consultant Radiologists &amp;{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-pink-200 bg-clip-text text-transparent">
              Medical Specialists
            </span>
          </h1>

          <p className="text-sm md:text-base text-blue-100/90 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
            Every diagnostic scan and lab investigation at Henotic Diagnostics is reported, cross-verified, and signed by fellowship-trained MD Radiologists and Pathologists.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-blue-200">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
              <ShieldCheck size={14} className="text-emerald-400" /> 100% MD Qualified
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
              <Clock size={14} className="text-cyan-400" /> Same-Day Signed Reports
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
              <CheckCircle2 size={14} className="text-pink-400" /> FRCR &amp; DNB Fellowships
            </span>
          </div>
        </div>
      </section>

      {/* ── Search & Filter Controls ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-4 md:p-6 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search doctor or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs md:text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white transition"
              />
            </div>

            {/* Department Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {DEPARTMENTS.map((dept) => {
                const active = selectedDept === dept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => setSelectedDept(dept.id)}
                    className={`text-xs font-bold px-3.5 py-2 rounded-xl shrink-0 transition cursor-pointer ${
                      active
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                    }`}
                  >
                    {dept.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Doctor Cards Grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredDoctors.map((doc) => {
            const dept = getDepartmentForDoctor(doc);
            const deptBadge = DEPT_COLORS[dept] || DEPT_COLORS.radiology;
            const initials = getDoctorInitials(doc.name);

            const whatsappConsultUrl = `https://wa.me/${LAB_WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `Hello Henotic Diagnostics, I would like to request an appointment / scan review with ${doc.name} (${doc.designation}).`
            )}`;

            return (
              <div
                key={doc.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 group"
              >
                <div>
                  {/* Top Header: Avatar & Experience Badge */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    {/* Stylized Physician Avatar Badge */}
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center text-xl font-black shadow-md shadow-blue-500/20 ring-4 ring-blue-50">
                        {initials}
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] text-white" title="Verified Specialist">
                        ✓
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-black">
                        {doc.experience}
                      </span>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                        Clinical Practice
                      </span>
                    </div>
                  </div>

                  {/* Doctor Title & Credentials */}
                  <h2 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    <Link href={`/doctors/${doc.id}`}>{doc.name}</Link>
                  </h2>

                  <p className="text-xs text-blue-600 font-bold mt-1 leading-snug">
                    {doc.designation}
                  </p>

                  <p className="text-[11px] text-slate-500 font-mono font-medium mt-1 mb-4">
                    {doc.credentials}
                  </p>

                  {/* Specialization Tags */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Key Clinical Modalities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.specializations.slice(0, 4).map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Short Bio Snippet */}
                  <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed mb-4">
                    {doc.bio}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={`/doctors/${doc.id}`}
                      className="text-xs font-bold text-slate-600 hover:text-blue-600 transition flex items-center gap-1"
                    >
                      <span>Full Bio &amp; Credentials</span>
                      <ArrowRight size={13} />
                    </Link>

                    <a
                      href={whatsappConsultUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-extrabold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>Consult</span>
                      <MessageSquare size={12} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
