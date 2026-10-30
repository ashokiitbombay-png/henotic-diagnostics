'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Search,
  Check,
  Plus,
  Trash2,
  Sparkles,
  ShieldCheck,
  Clock,
  Truck,
  FileText,
  HelpCircle,
  ChevronDown,
  X,
  ExternalLink,
  Percent,
  CheckCircle2,
  Award
} from 'lucide-react';
import {
  SERVICE_PRICING,
  ServicePricing,
  formatINR,
  getPricingCategories
} from '@/config/pricing';
import { LAB_WHATSAPP_NUMBER, LAB_PHONE_TEL } from '@/config/health-checkup/trust';

// WhatsApp icon SVG component
function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.25 7.15C9.07 7.15 8.77 7.22 8.52 7.49C8.27 7.76 7.55 8.44 7.55 9.81C7.55 11.18 8.55 12.5 8.69 12.69C8.83 12.87 10.65 15.68 13.44 16.88C15.76 17.89 16.23 17.68 16.73 17.64C17.23 17.59 18.34 16.98 18.57 16.33C18.8 15.68 18.8 15.12 18.73 15.01C18.66 14.89 18.48 14.83 18.21 14.69C17.94 14.56 16.61 13.9 16.36 13.81C16.11 13.72 15.93 13.68 15.75 13.95C15.57 14.22 15.05 14.83 14.89 15.01C14.73 15.2 14.57 15.22 14.3 15.08C14.03 14.95 13.16 14.66 12.13 13.74C11.32 13.02 10.78 12.13 10.62 11.86C10.46 11.59 10.6 11.44 10.74 11.31C10.86 11.19 11.01 11 11.15 10.84C11.29 10.68 11.33 10.57 11.42 10.38C11.51 10.2 11.47 10.04 11.4 9.91C11.33 9.77 10.78 8.44 10.55 7.9C10.33 7.37 10.1 7.45 9.93 7.44C9.77 7.44 9.59 7.44 9.41 7.44L9.25 7.15Z" />
    </svg>
  );
}

const PRICING_FAQS = [
  {
    q: 'Why are Henotic Diagnostics prices 30% to 50% lower than private corporate hospitals?',
    a: 'Corporate hospitals bundle high real-estate overheads, room charges, and administrative surcharges into their scan prices. Henotic operates high-throughput dedicated diagnostic centers with state-of-the-art 3.0 Tesla MRI, 128-Slice CT, and automated NABL pathology. By streamlining operations and eliminating middlemen, we pass direct institutional savings to patients.'
  },
  {
    q: 'Are your diagnostic reports accepted by all doctors and hospitals?',
    a: 'Yes, 100%. Henotic Diagnostics is NABL-accredited and ISO-certified. All imaging scans are interpreted and signed by MD Radiologists, and pathology tests are certified by MD Pathologists. Our reports are fully valid for medical treatments, surgical admissions, second opinions, and corporate health claims.'
  },
  {
    q: 'Can I claim Mediclaim / Health Insurance reimbursement with Henotic bills?',
    a: 'Yes. We provide official computer-generated GST tax invoices stamped with our NABL registration details, along with comprehensive radiologist/pathologist signed reports. Most outpatient OPD policies, health insurance riders, and pre-hospitalization claims reimburse diagnostic investigations conducted at NABL centers.'
  },
  {
    q: 'How does the Multi-Test Custom Bundle discount work?',
    a: 'When you combine multiple investigations (e.g. an MRI scan + comprehensive blood work, or multiple scan regions), our system automatically applies an additional 5% package discount on 2 tests, and 10% extra discount on 3 or more tests on top of our already discounted pricing!'
  },
  {
    q: 'Is home sample collection available for pathology blood tests?',
    a: 'Yes, we provide 24/7 doorstep blood sample collection across Navi Mumbai, Mumbai, Thane, and Raigad. Collection is completely FREE for test orders above ₹500. Samples are transported in temperature-controlled cold-chain vacuum containers directly to our central processing lab.'
  },
  {
    q: 'What if my doctor has advised an MRI or CT with Contrast?',
    a: 'For Contrast-Enhanced MRI (CE-MRI) or Contrast-Enhanced CT (CECT), a safe non-ionic contrast media is administered under physician supervision. Contrast media typically incurs a standard consumable charge of ₹1,500 - ₹2,000 depending on body weight. A recent Serum Creatinine test (within 30 days) is mandatory prior to contrast administration for kidney safety.'
  }
];

export default function DiagnosticCostEstimator() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTests, setSelectedTests] = useState<ServicePricing[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [includeHomeCollection, setIncludeHomeCollection] = useState(true);

  // All distinct categories
  const categories = useMemo(() => {
    return ['all', ...getPricingCategories()];
  }, []);

  // Filtered pricing catalog
  const filteredTests = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SERVICE_PRICING.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (!q) return true;
      return (
        item.serviceName.toLowerCase().includes(q) ||
        item.serviceSlug.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  // Test selection helpers
  const isSelected = useCallback(
    (slug: string) => selectedTests.some(t => t.serviceSlug === slug),
    [selectedTests]
  );

  const toggleTest = useCallback((test: ServicePricing) => {
    setSelectedTests(prev => {
      const exists = prev.some(t => t.serviceSlug === test.serviceSlug);
      if (exists) {
        return prev.filter(t => t.serviceSlug !== test.serviceSlug);
      } else {
        return [...prev, test];
      }
    });
  }, []);

  const removeTest = useCallback((slug: string) => {
    setSelectedTests(prev => prev.filter(t => t.serviceSlug !== slug));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedTests([]);
  }, []);

  // Financial calculations
  const totalMarketPrice = useMemo(() => {
    return selectedTests.reduce((sum, t) => sum + t.marketPrice, 0);
  }, [selectedTests]);

  const baseHenoticPrice = useMemo(() => {
    return selectedTests.reduce((sum, t) => sum + t.henoticPrice, 0);
  }, [selectedTests]);

  // Bundle Discount Logic:
  // 1 test: 0% extra
  // 2 tests: 5% extra bundle discount
  // 3+ tests: 10% extra bundle discount
  const bundleDiscountPercent = useMemo(() => {
    if (selectedTests.length >= 3) return 10;
    if (selectedTests.length === 2) return 5;
    return 0;
  }, [selectedTests.length]);

  const bundleDiscountAmount = useMemo(() => {
    if (bundleDiscountPercent === 0) return 0;
    return Math.round((baseHenoticPrice * bundleDiscountPercent) / 100);
  }, [baseHenoticPrice, bundleDiscountPercent]);

  const finalEstimatedPrice = useMemo(() => {
    return Math.max(0, baseHenoticPrice - bundleDiscountAmount);
  }, [baseHenoticPrice, bundleDiscountAmount]);

  const totalPatientSavings = useMemo(() => {
    return totalMarketPrice - finalEstimatedPrice;
  }, [totalMarketPrice, finalEstimatedPrice]);

  const totalSavingsPercentage = useMemo(() => {
    if (totalMarketPrice === 0) return 0;
    return Math.round((totalPatientSavings / totalMarketPrice) * 100);
  }, [totalMarketPrice, totalPatientSavings]);

  // Pre-formatted WhatsApp inquiry message
  const whatsappUrl = useMemo(() => {
    if (selectedTests.length === 0) {
      const msg = encodeURIComponent(
        'Hello Henotic Diagnostics, I would like to inquire about test pricing and appointment availability.'
      );
      return `https://wa.me/${LAB_WHATSAPP_NUMBER}?text=${msg}`;
    }

    const testList = selectedTests
      .map((t, idx) => `${idx + 1}. ${t.serviceName} (${formatINR(t.henoticPrice)})`)
      .join('\n');

    const msg = `*Henotic Diagnostics — Test Booking Request*
────────────────────
Selected Investigations (${selectedTests.length}):
${testList}

*Hospital Market Total:* ${formatINR(totalMarketPrice)}
*Henotic Estimate:* ${formatINR(finalEstimatedPrice)}
*Total Savings:* ${formatINR(totalPatientSavings)} (${totalSavingsPercentage}% OFF)
${bundleDiscountPercent > 0 ? `*Bundle Bonus Applied:* ${bundleDiscountPercent}% Extra OFF\n` : ''}Home Blood Collection: ${includeHomeCollection ? 'Requested (Free within 15km)' : 'Visiting Center'}

Please let me know the earliest available slot.`;

    return `https://wa.me/${LAB_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [
    selectedTests,
    totalMarketPrice,
    finalEstimatedPrice,
    totalPatientSavings,
    totalSavingsPercentage,
    bundleDiscountPercent,
    includeHomeCollection
  ]);

  return (
    <div className="w-full">
      {/* ── Top Hero Card / Calculator Overview ─────────────────────── */}
      <div className="relative bg-gradient-to-br from-[#0c1e3e] via-[#1a2d54] to-[#254680] text-white rounded-3xl p-6 md:p-10 shadow-2xl border border-white/10 overflow-hidden mb-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-cyan-200 border border-white/20 text-xs font-black uppercase tracking-wider mb-4 backdrop-blur-md">
            <Sparkles size={14} className="text-cyan-300" />
            100% Transparent Healthcare Pricing
          </div>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Custom Diagnostic Cost Estimator &amp;{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-pink-200 bg-clip-text text-transparent">
              Bundle Builder
            </span>
          </h2>

          <p className="text-sm md:text-base text-blue-100/90 font-medium leading-relaxed max-w-3xl mb-6">
            Compare Henotic institutional pricing directly against corporate hospital market averages. Add multiple scans or blood profiles to your estimate to unlock automatic package discounts with free doorstep sample pickup.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 text-center">
              <span className="text-xl sm:text-2xl font-black text-cyan-300 block">30–50%</span>
              <span className="text-[11px] font-bold text-blue-100 uppercase tracking-wider">Direct Patient Savings</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 text-center">
              <span className="text-xl sm:text-2xl font-black text-emerald-300 block">NABL</span>
              <span className="text-[11px] font-bold text-blue-100 uppercase tracking-wider">Accredited Quality</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 text-center">
              <span className="text-xl sm:text-2xl font-black text-pink-300 block">6–8 Hrs</span>
              <span className="text-[11px] font-bold text-blue-100 uppercase tracking-wider">Digital Reports</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 text-center">
              <span className="text-xl sm:text-2xl font-black text-amber-300 block">FREE</span>
              <span className="text-[11px] font-bold text-blue-100 uppercase tracking-wider">Home Sample Pickup</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Layout: Catalog & Live Estimate Sidebar ─────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Search & Test Catalog (Spans 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Controls Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 md:p-6">
            
            {/* Search Input */}
            <div className="relative mb-5">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 100+ tests by name (e.g. MRI Brain, CT Abdomen, CBC, Thyroid, 2D Echo)..."
                className="w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm md:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                const count = cat === 'all' 
                  ? SERVICE_PRICING.length 
                  : SERVICE_PRICING.filter(p => p.category === cat).length;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs font-bold px-3.5 py-2 rounded-xl shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                      active
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                    }`}
                  >
                    <span>{cat === 'all' ? 'All Investigations' : cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        active ? 'bg-white/20 text-white' : 'bg-white text-slate-500 border border-slate-200/70'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Summary Ribbon */}
          <div className="flex items-center justify-between px-2 text-xs md:text-sm font-semibold text-slate-500">
            <span>
              Showing <strong className="text-slate-900">{filteredTests.length}</strong> verified investigations
              {selectedCategory !== 'all' && (
                <span> in <span className="text-blue-600">{selectedCategory}</span></span>
              )}
            </span>
            {selectedTests.length > 0 && (
              <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                {selectedTests.length} item{selectedTests.length > 1 ? 's' : ''} added to estimate
              </span>
            )}
          </div>

          {/* Test Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTests.map((test) => {
              const active = isSelected(test.serviceSlug);
              return (
                <div
                  key={test.serviceSlug}
                  className={`bg-white rounded-2xl border p-5 transition-all flex flex-col justify-between group ${
                    active
                      ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md bg-blue-50/20'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Category & Savings Pill */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {test.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                        <Percent size={11} /> Save {test.savings}%
                      </span>
                    </div>

                    {/* Test Title */}
                    <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {test.serviceName}
                    </h3>

                    {/* Price Comparison */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900">
                        {formatINR(test.henoticPrice)}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 line-through">
                        {formatINR(test.marketPrice)}
                      </span>
                      <span className="text-[11px] text-emerald-600 font-bold ml-auto">
                        Save {formatINR(test.marketPrice - test.henoticPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link
                      href={`/services/${test.serviceSlug}`}
                      className="text-xs font-bold text-slate-500 hover:text-blue-600 transition flex items-center gap-1"
                    >
                      <span>Details</span>
                      <ExternalLink size={12} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleTest(test)}
                      className={`text-xs font-black px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                        active
                          ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700'
                          : 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700'
                      }`}
                    >
                      {active ? (
                        <>
                          <Check size={14} /> Added
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Add to Estimate
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTests.length === 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center my-6">
              <Search size={40} className="mx-auto text-slate-300 mb-3" />
              <h4 className="text-lg font-bold text-slate-800 mb-1">No investigations match your search</h4>
              <p className="text-xs text-slate-500 mb-4">
                Try searching for broader medical terms like &ldquo;scan&rdquo;, &ldquo;blood&rdquo;, or reset the category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow cursor-pointer hover:bg-blue-700 transition"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Estimate Cart / Sticky Drawer (Spans 4) */}
        <div className="lg:col-span-4 sticky top-24 flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 md:p-7 relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Custom Estimate</span>
                  {selectedTests.length > 0 && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                      {selectedTests.length}
                    </span>
                  )}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">Real-time package &amp; savings calculator</p>
              </div>

              {selectedTests.length > 0 && (
                <button
                  type="button"
                  onClick={clearSelection}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                  title="Clear all selected tests"
                >
                  <Trash2 size={13} /> Clear
                </button>
              )}
            </div>

            {/* Test Items in Cart */}
            {selectedTests.length === 0 ? (
              <div className="py-8 text-center border-2 border-dashed border-slate-200 rounded-2xl px-4 my-2">
                <Plus size={32} className="mx-auto text-slate-300 mb-2" />
                <p className="text-xs font-bold text-slate-600 mb-1">Your estimate is currently empty</p>
                <p className="text-[11px] text-slate-400">
                  Click &ldquo;Add to Estimate&rdquo; on any MRI, CT, PET scan, or blood test to calculate institutional discounts.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 mb-5 scrollbar-thin">
                {selectedTests.map((t) => (
                  <div
                    key={t.serviceSlug}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <span className="font-bold text-slate-900 block truncate">{t.serviceName}</span>
                      <span className="text-[10px] text-slate-500">{t.category}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-extrabold text-slate-800">{formatINR(t.henoticPrice)}</span>
                      <button
                        type="button"
                        onClick={() => removeTest(t.serviceSlug)}
                        className="text-slate-400 hover:text-rose-600 p-0.5 rounded cursor-pointer"
                        title="Remove"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Multi-Test Bundle Bonus Alert */}
            {selectedTests.length > 0 && (
              <div className="mb-5 p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/70">
                <div className="flex items-center justify-between text-xs font-black text-blue-900 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={14} className="text-blue-600" />
                    Multi-Test Bundle Bonus:
                  </span>
                  <span>
                    {bundleDiscountPercent > 0 ? (
                      <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {bundleDiscountPercent}% Extra OFF
                      </span>
                    ) : (
                      <span className="text-slate-500 font-normal">Add 1 more for 5% OFF</span>
                    )}
                  </span>
                </div>
                <p className="text-[10px] text-slate-600 leading-tight">
                  {selectedTests.length === 1 && 'Add 1 more scan or blood test to unlock an extra 5% package discount.'}
                  {selectedTests.length === 2 && '🎉 5% extra discount applied! Add 1 more to reach maximum 10% bundle discount.'}
                  {selectedTests.length >= 3 && '🔥 Maximum 10% bundle bonus applied to your entire investigation order!'}
                </p>
              </div>
            )}

            {/* Home Collection Toggle */}
            <div className="mb-5 pb-5 border-b border-slate-100">
              <label className="flex items-center justify-between cursor-pointer select-none">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-emerald-600" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Home Blood Sample Collection</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">FREE within 15 km</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeHomeCollection}
                  onChange={(e) => setIncludeHomeCollection(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </label>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 mb-6 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span>Hospital Market Average:</span>
                <span className="line-through">{formatINR(totalMarketPrice)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>Henotic Base Price:</span>
                <span className="font-semibold">{formatINR(baseHenoticPrice)}</span>
              </div>

              {bundleDiscountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-700 font-bold">
                  <span>Bundle Discount ({bundleDiscountPercent}%):</span>
                  <span>-{formatINR(bundleDiscountAmount)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
                <div>
                  <span className="text-sm font-black text-slate-900 block">Estimated Total:</span>
                  <span className="text-[10px] text-slate-400 font-medium">All inclusive • No hidden fees</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-blue-600 block leading-none">
                    {formatINR(finalEstimatedPrice)}
                  </span>
                  {totalPatientSavings > 0 && (
                    <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-1 inline-block">
                      You save {formatINR(totalPatientSavings)} ({totalSavingsPercentage}%)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-col gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs md:text-sm shadow-md shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>Confirm &amp; Book on WhatsApp</span>
              </a>

              <a
                href={LAB_PHONE_TEL}
                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xs text-center transition cursor-pointer"
              >
                Speak to Medical Desk: 88793 27184
              </a>
            </div>

            {/* Micro Trust Indicators */}
            <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                <span>Valid for Mediclaim / Insurance Reimbursement</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-blue-600 shrink-0" />
                <span>Same-Day WhatsApp &amp; PDF Report Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={13} className="text-blue-600 shrink-0" />
                <span>Zero Advance Payment Required for Booking</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Healthcare Pricing FAQ Accordion ────────────────────────── */}
      <div className="mt-16 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-blue-600 mb-2">
            <HelpCircle size={15} />
            Diagnostic Transparency FAQ
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions on Investigation Pricing
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            Everything you need to know about our NABL quality standards, insurance claims, contrast charges, and home sample collection.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl">
          {PRICING_FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.q}
                className={`rounded-2xl border transition-all ${
                  isOpen ? 'border-blue-300 bg-blue-50/20' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-extrabold text-sm md:text-base text-slate-900 leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs md:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
