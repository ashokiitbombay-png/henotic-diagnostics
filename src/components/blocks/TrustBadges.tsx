import React from 'react';
import { ShieldCheck, Award, Heart, CheckCircle2 } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    { icon: ShieldCheck, title: "NABL Accredited", desc: "Highest standard of medical laboratory quality and testing precision." },
    { icon: Award, title: "ISO 9001:2015 Certified", desc: "Internationally recognized diagnostic processes and patient safety guidelines." },
    { icon: Heart, title: "Patient Care First", desc: "Compassionate reporting, zero wait times, and comfortable diagnostics." },
    { icon: CheckCircle2, title: "AERB Approved Scan", desc: "Radiation safety compliance and low-dose imaging protocols." },
  ];

  return (
    <div className="py-12 bg-white border-y border-slate-100 relative z-20 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div key={idx} className="flex gap-4 items-start group">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner shrink-0">
                  <Icon size={24} />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-1">{badge.title}</h4>
                  <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
