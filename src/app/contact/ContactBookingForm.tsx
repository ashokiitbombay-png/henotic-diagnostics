"use client";

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export default function ContactBookingForm() {
  const [formData, setFormData] = useState({ name: '', mobile: '', test: '', center: '', date: '', time: '' });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalFields = 6;
    let filledFields = 0;
    if (formData.name.trim() !== '') filledFields++;
    if (formData.mobile.trim() !== '') filledFields++;
    if (formData.test.trim() !== '') filledFields++;
    if (formData.center.trim() !== '') filledFields++;
    if (formData.date.trim() !== '') filledFields++;
    if (formData.time.trim() !== '') filledFields++;
    setProgress(Math.round((filledFields / totalFields) * 100));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = `Hello Henotic Diagnostics, I would like to confirm my appointment:%0A- Name: *${formData.name}*%0A- Mobile: *${formData.mobile}*%0A- Test: *${formData.test}*%0A- Center: *${formData.center}*%0A- Date: *${formData.date}*%0A- Time: *${formData.time}*`;
    window.open(`https://wa.me/9108879327184?text=${message}`, '_blank');
  };

  return (
    <div 
      className="rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(176,106,179,0.4)] relative overflow-hidden transition-transform duration-500 hover:-translate-y-2 border-4 border-white"
      style={{ backgroundImage: 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)' }}
    >
      <div className="relative z-10">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-3xl font-extrabold text-white drop-shadow-md">Secure Appointment</h3>
          <span className="text-white/90 font-black text-xl">{progress}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-black/10 rounded-full mb-8 overflow-hidden backdrop-blur-sm">
          <div className="h-full bg-white transition-all duration-500 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>

        <form className="space-y-4" onSubmit={handleWhatsAppSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Patient Name" required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-inner font-bold placeholder-slate-400 transition-all outline-none" />
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-inner font-bold placeholder-slate-400 transition-all outline-none" />
          </div>

          <select aria-label="Select Test Category" name="test" value={formData.test} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-inner font-bold transition-all outline-none appearance-none">
            <option value="" disabled>Select Test Name</option>
            <option value="MRI Scan">MRI Scan</option>
            <option value="CT Scan">CT Scan</option>
            <option value="Sonography / Ultrasound">Sonography / Ultrasound</option>
            <option value="Blood Test / Pathology">Blood Test / Pathology</option>
            <option value="Health Checkup Package">Health Checkup Package</option>
          </select>

          <select aria-label="Select Nearest Center" name="center" value={formData.center} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-inner font-bold transition-all outline-none appearance-none">
            <option value="" disabled>Select Nearest Center</option>
            <option value="Kharghar Center">Kharghar Center</option>
            <option value="Panvel Center">Panvel Center</option>
            <option value="Navi Mumbai (Main)">Navi Mumbai (Main)</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input aria-label="Select Date" type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-inner font-bold transition-all outline-none" />
            <input aria-label="Select Time" type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-inner font-bold transition-all outline-none" />
          </div>

          <button 
            type="submit" 
            className="w-full mt-8 bg-gradient-to-r from-[#25D366] to-[#1DA851] hover:from-[#1DA851] hover:to-[#128C7E] text-white font-black py-5 px-6 rounded-2xl shadow-[0_15px_30px_-5px_rgba(37,211,102,0.4)] transform transition-all hover:-translate-y-1 flex items-center justify-center gap-3 text-lg md:text-xl border border-[#25D366]/50"
          >
            <MessageCircle size={24} className="fill-current" /> Confirm via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
