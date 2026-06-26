import React from 'react';
import { BadgePercent, TrendingDown, IndianRupee } from 'lucide-react';
import { getPricingForService } from '@/config/pricing';

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
                <p className="text-3xl font-black text-emerald-700">₹{pricing.henoticPrice.toLocaleString('en-IN')}</p>
              </div>

              {/* Market Price */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center">
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Market Avg</p>
                <p className="text-3xl font-black text-slate-400 line-through">₹{pricing.marketPrice.toLocaleString('en-IN')}</p>
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
                Save ₹{(pricing.marketPrice - pricing.henoticPrice).toLocaleString('en-IN')} compared to market average. 
                NABL certified quality at transparent pricing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Offer",
        "name": serviceName,
        "price": pricing.henoticPrice,
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "seller": { "@type": "MedicalOrganization", "name": "Henotic Diagnostics" }
      }) }} />
    </section>
  );
}
