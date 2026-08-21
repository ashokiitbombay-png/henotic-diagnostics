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
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4568dc] to-[#b06ab3] p-6 md:p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <IndianRupee size={22} />
              <h3 className="text-xl font-black">Pricing for {serviceName}</h3>
            </div>
            {locationName && (
              <p className="text-white/70 text-sm font-bold">Available in {locationName}</p>
            )}
          </div>

          {/* Pricing Comparison */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              {/* Henotic Price */}
              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 text-center">
                <p className="text-emerald-600 text-xs font-black uppercase tracking-widest mb-2">Our Price</p>
                <p className="text-3xl font-black text-emerald-700">₹{formatINR(pricing.henoticPrice)}</p>
              </div>

              {/* Market Price */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center">
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Market Avg</p>
                <p className="text-3xl font-black text-slate-400 line-through">₹{formatINR(pricing.marketPrice)}</p>
              </div>

              {/* Savings */}
              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 text-center">
                <p className="text-amber-600 text-xs font-black uppercase tracking-widest mb-2">You Save</p>
                <div className="flex items-center justify-center gap-2">
                  <TrendingDown size={20} className="text-amber-600" />
                  <p className="text-3xl font-black text-amber-700">{pricing.savings}%</p>
                </div>
              </div>
            </div>

            {/* Savings Badge */}
            <div className="flex items-center gap-2 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <BadgePercent size={20} className="text-emerald-600 shrink-0" />
              <p className="text-emerald-700 text-sm font-bold">
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
