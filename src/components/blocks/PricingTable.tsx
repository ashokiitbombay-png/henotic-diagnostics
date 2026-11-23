import React from 'react';
import { getPricingForService } from '@/config/pricing';

function formatINR(num: number): string {
  const str = Math.abs(num).toString();
  if (str.length <= 3) return str;
  const lastThree = str.slice(-3);
  const remaining = str.slice(0, -3);
  const formatted = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  return num < 0 ? '-' + formatted : formatted;
}

interface PricingTableProps {
  serviceSlug: string;
  serviceName: string;
  locationName?: string;
}

export default function PricingTable({ serviceSlug, serviceName, locationName }: PricingTableProps) {
  const pricing = getPricingForService(serviceSlug);
  if (!pricing) return null;

  return (
    <section className="py-10 sm:py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="silver-shiny-card bg-white rounded-[2rem] overflow-hidden">
          <div className="bg-gradient-to-r from-[#4568dc] to-[#b06ab3] p-5 sm:p-6 md:p-8 text-white">
            <h3 className="text-lg sm:text-xl font-black mb-1">
              ₹ Pricing for {serviceName}
            </h3>
            {locationName && (
              <p className="text-white/85 text-xs sm:text-sm font-bold">Available in {locationName}</p>
            )}
          </div>

          <div className="p-5 sm:p-6 md:p-8">
            <div className="grid grid-cols-3 gap-2 sm:gap-5 mb-5">
              <div className="pt-cell bg-emerald-50 border-emerald-100">
                <p className="text-emerald-600 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1">Our Price</p>
                <p className="text-lg sm:text-3xl font-black text-emerald-700">₹{formatINR(pricing.henoticPrice)}</p>
              </div>

              <div className="pt-cell bg-slate-50 border-slate-100">
                <p className="text-slate-500 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1">Market Avg</p>
                <p className="text-lg sm:text-3xl font-black text-slate-400 line-through">₹{formatINR(pricing.marketPrice)}</p>
              </div>

              <div className="pt-cell bg-amber-50 border-amber-100">
                <p className="text-amber-600 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1">You Save</p>
                <p className="text-lg sm:text-3xl font-black text-amber-700">{pricing.savings}%</p>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="text-emerald-700 text-xs sm:text-sm font-bold leading-snug">
                Save ₹{formatINR(pricing.marketPrice - pricing.henoticPrice)} compared to market average. NABL certified quality at transparent pricing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
