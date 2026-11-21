import React from 'react';
import { BadgePercent, TrendingDown, IndianRupee } from 'lucide-react';
import { getPricingForService } from '@/config/pricing';

/**
 * Deterministic Indian number formatter — avoids ICU locale hydration mismatches.
 * Produces consistent output across Node.js and browser environments.
 * Examples: 2500 → "2,500", 14000 → "14,000", 100000 → "1,00,000"
 */
function formatINR(num: number): string {
  const str = Math.abs(num).toString();
  // Indian numbering: first 3 digits from right, then groups of 2
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

/**
 * 💰 Service-Specific Pricing Table
 * Shows Henotic pricing vs market average with savings badge.
 */
export default function PricingTable({ serviceSlug, serviceName, locationName }: PricingTableProps) {
  const pricing = getPricingForService(serviceSlug);
  
  if (!pricing) return null;

  return (
    <section className="py-10 sm:py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="silver-shiny-card bg-white rounded-[2rem] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4568dc] to-[#b06ab3] p-5 sm:p-6 md:p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <IndianRupee size={22} />
              <h3 className="text-lg sm:text-xl font-black">Pricing for {serviceName}</h3>
            </div>
            {locationName && (
              <p className="text-white/80 text-xs sm:text-sm font-bold">Available in {locationName}</p>
            )}
          </div>

          {/* Pricing Comparison */}
          <div className="p-5 sm:p-6 md:p-8">
            <div className="grid grid-cols-3 gap-2 sm:gap-5 mb-5 sm:mb-6">
              {/* Henotic Price */}
              <div className="bg-emerald-50 rounded-2xl p-3 sm:p-5 border border-emerald-100 text-center">
                <p className="text-emerald-600 text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest mb-1 sm:mb-2">Our Price</p>
                <p className="text-lg sm:text-3xl font-black text-emerald-700 leading-tight">₹{formatINR(pricing.henoticPrice)}</p>
              </div>

              {/* Market Price */}
              <div className="bg-slate-50 rounded-2xl p-3 sm:p-5 border border-slate-100 text-center">
                <p className="text-slate-500 text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest mb-1 sm:mb-2">Market Avg</p>
                <p className="text-lg sm:text-3xl font-black text-slate-400 line-through leading-tight">₹{formatINR(pricing.marketPrice)}</p>
              </div>

              {/* Savings */}
              <div className="bg-amber-50 rounded-2xl p-3 sm:p-5 border border-amber-100 text-center">
                <p className="text-amber-600 text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest mb-1 sm:mb-2">You Save</p>
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <TrendingDown size={16} className="text-amber-600 shrink-0 hidden sm:block" />
                  <p className="text-lg sm:text-3xl font-black text-amber-700 leading-tight">{pricing.savings}%</p>
                </div>
              </div>
            </div>

            {/* Savings Badge */}
            <div className="flex items-center gap-2 p-3.5 sm:p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <BadgePercent size={20} className="text-emerald-600 shrink-0" />
              <p className="text-emerald-700 text-xs sm:text-sm font-bold leading-snug">
                Save ₹{formatINR(pricing.marketPrice - pricing.henoticPrice)} compared to market average. 
                NABL certified quality at transparent pricing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Offer schema is already embedded in DiagnosticProcedure and MedicalTest via MedicalPseoSchema */}
    </section>
  );
}
