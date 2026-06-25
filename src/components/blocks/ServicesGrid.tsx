import React from 'react';
import Link from 'next/link';
import { Orbit, Activity, ScanHeart, Baby, Droplet, Heart, Bone, Stethoscope, ArrowRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import { routesConfig } from '@/config/routes';

export default function ServicesGrid() {
  const serviceCards = [
    { id: "mri-scan", title: "MRI Scan (3T)", icon: Orbit, color: "text-blue-600", bg: "bg-blue-50" },
    { id: "ct-scan", title: "CT Scan (128 Slice)", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50" },
    { id: "pet-scan", title: "PET-CT Scan", icon: ScanHeart, color: "text-purple-600", bg: "bg-purple-50" },
    { id: "ultrasound", title: "Sonography / USG", icon: Baby, color: "text-pink-600", bg: "bg-pink-50" },
    { id: "blood-test", title: "Pathology Tests", icon: Droplet, color: "text-red-600", bg: "bg-red-50" },
    { id: "2d-echo", title: "2D Echo / ECG", icon: Heart, color: "text-rose-600", bg: "bg-rose-50" },
    { id: "dexa-bone-scan", title: "DEXA Bone Scan", icon: Bone, color: "text-orange-600", bg: "bg-orange-50" },
    { id: "full-body-check-up", title: "Health Checkups", icon: Stethoscope, color: "text-teal-600", bg: "bg-teal-50" },
  ];

  return (
    <div className="w-full">
      <h3 className="text-2xl font-black text-slate-800 mb-6 uppercase tracking-wider">Our Main Specialities</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {serviceCards.map((service, idx) => {
          const Icon = service.icon;
          return (
            <Link 
              key={idx} 
              href={routesConfig.getLocationUrl(service.id, "navi-mumbai", "kharghar")}
              className="group block"
            >
              <Card className="p-5 flex flex-col justify-between h-40 transition-all hover:-translate-y-1 hover:shadow-md hover:border-blue-100 bg-white border border-slate-100">
                <div className={`w-12 h-12 rounded-xl ${service.bg} ${service.color} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                  <Icon size={24} />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-extrabold text-slate-800 text-sm md:text-base group-hover:text-blue-700 transition-colors">{service.title}</span>
                  <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
