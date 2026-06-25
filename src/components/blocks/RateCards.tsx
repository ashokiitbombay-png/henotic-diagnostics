import React from 'react';
import { DollarSign, ShieldAlert, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface RateCardItem {
  name: string;
  price: string;
  time: string;
  requirements: string;
}

interface RateCardsProps {
  items?: RateCardItem[];
  title?: string;
}

export default function RateCards({ items, title }: RateCardsProps) {
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
          <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-md hover:border-blue-100">
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
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs font-bold text-slate-400 flex items-center gap-1.5 justify-center md:justify-start">
        <ShieldAlert size={14} /> Prices are indicative and subject to regional center variations.
      </p>
    </div>
  );
}
