"use client";
import React from 'react';
import Image from 'next/image';
import { DollarSign, ShieldAlert, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface RateCardItem {
  name: string;
  price: string;
  time: string;
  requirements: string;
}

interface HealthPackage {
  title: string;
  price: string;
  oldPrice: string;
  img: string;
  gradient: string;
  includes: string[];
}

interface RateCardsProps {
  items?: RateCardItem[];
  title?: string;
  variant?: 'premium' | 'list';
  packages?: HealthPackage[];
}

const DEFAULT_PACKAGES: HealthPackage[] = [
  {
    title: "Comprehensive Full Body",
    price: "₹2,999",
    oldPrice: "₹6,500",
    img: "https://storage.googleapis.com/wp-media-henoticbucket/Laboratory/henotic-diagnostics-blood-test-lab.webp",
    gradient: "from-blue-600 to-cyan-400",
    includes: ["Lipid Profile (Heart)", "Liver Function Test (LFT)", "Kidney Function Test (KFT)", "Thyroid Profile (T3, T4, TSH)", "Complete Hemogram (CBC)", "Diabetes Screening (HbA1c)"]
  },
  {
    title: "Advanced Cardiac Care",
    price: "₹4,499",
    oldPrice: "₹8,000",
    img: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/7f8eb649-tmt-test-stress-echo-test-stress-test-2d-echo-test-kharghar-henotic-diagnostics-navi-mumbai.webp",
    gradient: "from-rose-500 to-pink-400",
    includes: ["2D Echocardiography", "Treadmill Test (TMT)", "Electrocardiogram (ECG)", "Advanced Lipid Profile", "Cardiac Risk Markers", "Physician Consultation"]
  },
  {
    title: "Women's Wellness Profile",
    price: "₹3,499",
    oldPrice: "₹7,200",
    img: "https://storage.googleapis.com/wp-media-henoticbucket/Ultrasound/henotic-diagnostics-sonography-ultrasound-pregnancy-scan-anomaly%20scan-nt-scan-kharghar-taloja%2C%20roadpali-navi%20mumbai.webp",
    gradient: "from-purple-600 to-indigo-400",
    includes: ["Pelvic Ultrasound (USG)", "Thyroid Profile", "Vitamin D & B12 Levels", "Iron Deficiency Panel", "Hormonal Imbalance Check", "Breast Cancer Screening"]
  }
];

export default function RateCards({ items, title, variant = 'list', packages = DEFAULT_PACKAGES }: RateCardsProps) {
  
  // 1. PREMIUM VARIANT (Home Page Health Packages)
  if (variant === 'premium') {
    return (
      <section id="packages" className="py-24 relative overflow-hidden bg-slate-50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#fbc2eb]/40 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#E55D87] font-extrabold uppercase tracking-widest text-sm mb-2 block">Exclusive Offers</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-950 mb-6 drop-shadow-sm">Premium Health Packages</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">Transparent pricing, comprehensive testing, and instant digital reports.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <Card key={idx} className="group relative border border-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_60px_-15px_rgba(0,0,0,0.2)] transition-all duration-700 bg-white/70 backdrop-blur-xl !p-0">
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <div className={`absolute inset-0 bg-gradient-to-t ${pkg.gradient} opacity-40 group-hover:opacity-20 transition-opacity z-10`}></div>
                  <Image 
                    src={pkg.img} 
                    alt={pkg.title} 
                    fill
                    className="w-full h-full object-cover transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white">
                    <div className="text-xs text-slate-500 line-through font-bold">{pkg.oldPrice}</div>
                    <div className="text-2xl font-black text-slate-900">{pkg.price}</div>
                  </div>
                </div>

                <div className="p-8 relative bg-white/50">
                  <h3 className="text-2xl font-extrabold text-blue-950 mb-6 transform group-hover:-translate-y-1 transition-transform duration-500">{pkg.title}</h3>
                  <ul className="space-y-3 mb-8">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 font-medium transform translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500" style={{ transitionDelay: `${i * 50}ms` }}>
                        <CheckCircle size={18} className="text-[#E55D87] shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="w-full block">
                    <Button className="w-full text-center py-4 rounded-2xl font-extrabold uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md text-sm">
                      Book Package
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 2. LIST VARIANT (Dynamic Service Accordion scan prices)
  const defaultItems = items || [
    { name: "3T MRI Brain Scan", price: "₹3,999 onwards", time: "15-20 Mins", requirements: "No metal implants, doctor prescription mandatory." },
    { name: "128-Slice CT Chest HRCT", price: "₹2,499 onwards", time: "5 Mins", requirements: "Prior creatinine blood report needed for contrast scans." },
    { name: "Whole Abdomen USG Sonography", price: "₹1,199 onwards", time: "10 Mins", requirements: "Requires 6-8 hours of fasting (water is allowed)." },
    { name: "HbA1c & Fasting Blood Sugar", price: "₹399 onwards", time: "Home collection", requirements: "Requires 10-12 hours overnight fasting." },
  ];

  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] p-6 md:p-8">
      <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-wider">
        <DollarSign size={20} className="text-emerald-500" /> {title || "Diagnostic Pricing & Details"}
      </h4>
      <div className="space-y-4">
        {defaultItems.map((item, idx) => (
          <Card key={idx} className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-md hover:border-blue-100 bg-white border border-slate-100">
            <div className="flex-grow">
              <h5 className="font-extrabold text-slate-900 text-base mb-1">{item.name}</h5>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 text-xs font-semibold">
                <span>Duration: {item.time}</span>
                <span>•</span>
                <span>Requirements: {item.requirements}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end shrink-0 border-t border-slate-50 md:border-none pt-3 md:pt-0">
              <div className="text-right">
                <span className="text-xs text-slate-400 font-bold block">Estimated Price</span>
                <span className="text-lg font-black text-emerald-600">{item.price}</span>
              </div>
              <Link href="#booking" className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-300">
                <ArrowRight size={18} />
              </Link>
            </div>
          </Card>
        ))}
      </div>
      <p className="mt-4 text-xs font-bold text-slate-400 flex items-center gap-1.5 justify-center md:justify-start">
        <ShieldAlert size={14} /> Prices are indicative and subject to regional center variations.
      </p>
    </div>
  );
}
