import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GMC_PRODUCTS, getGMCProduct } from '@/config/gmc-products';
import { Calendar, Phone, Shield, CheckCircle2, MapPin, Clock, Award, Star } from 'lucide-react';
import ProductSchema from '@/components/seo/ProductSchema';

interface Props {
  params: Promise<{ product: string }>;
}

export async function generateStaticParams() {
  return GMC_PRODUCTS.map(p => ({ product: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product: slug } = await params;
  const product = getGMCProduct(slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.title} — ₹${product.price.toLocaleString('en-IN')} | Henotic Diagnostics`,
    description: product.description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://www.henoticdiagnostics.com/gmc/${slug}`,
    },
    openGraph: {
      title: `${product.title} — ₹${product.price.toLocaleString('en-IN')}`,
      description: product.description,
      images: [{ url: product.imageUrl, width: 1200, height: 630 }],
      type: 'website',
    },
  };
}

export default async function GMCProductPage({ params }: Props) {
  const { product: slug } = await params;
  const product = getGMCProduct(slug);
  if (!product) notFound();

  const savings = product.mrp - product.price;
  const savingsPercent = Math.round((savings / product.mrp) * 100);

  return (
    <main className="min-h-screen bg-slate-50 mt-[80px]">
      {/* Product Schema for Google */}
      <ProductSchema
        serviceName={product.title}
        serviceSlug={product.serviceSlug}
        price={product.price}
        marketPrice={product.mrp}
        category={product.category}
      />

      {/* ══ HERO SECTION ══ */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-500/15 blur-[80px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — Product Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-black uppercase tracking-widest mb-6">
                <Award size={14} /> {product.category}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-6">
                {product.title}
              </h1>

              <p className="text-white/80 text-lg font-medium leading-relaxed mb-8 max-w-xl">
                {product.description}
              </p>

              {/* Price Block */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/15 p-6 mb-8 inline-block">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-4xl md:text-5xl font-black text-white">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xl text-white/50 line-through font-bold">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Save ₹{savings.toLocaleString('en-IN')} ({savingsPercent}% OFF)
                  </span>
                  <span className="text-white/60 text-sm font-bold">incl. all taxes</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact#booking"
                  className="flex items-center justify-center gap-3 bg-white text-blue-700 font-black text-lg py-4 px-8 rounded-2xl shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
                >
                  <Calendar size={22} /> Book Now
                </Link>
                <a
                  href="tel:08879327184"
                  className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-black text-lg py-4 px-8 rounded-2xl hover:bg-white/20 transition-all duration-300"
                >
                  <Phone size={22} /> Call: 088-7932-7184
                </a>
              </div>
            </div>

            {/* Right — Product Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] border-4 border-white/10">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={800}
                  height={600}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-black text-sm shadow-lg flex items-center gap-2">
                <CheckCircle2 size={18} /> NABL Accredited
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TRUST SIGNALS ══ */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: Shield, label: "NABL & ISO Accredited", sub: "Certified Quality" },
              { icon: Clock, label: "Same-Day Reports", sub: "Digital via WhatsApp" },
              { icon: MapPin, label: "Kharghar, Navi Mumbai", sub: "Easy Access & Parking" },
              { icon: Star, label: "4.9 ★ Google Rating", sub: "500+ Reviews" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <item.icon size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{item.label}</p>
                  <p className="text-slate-500 text-xs font-medium">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT'S INCLUDED ══ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-black text-slate-900 mb-8 text-center">What&apos;s Included</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Expert radiologist / pathologist interpretation",
            "Same-day digital reports via WhatsApp",
            "Free consultation on report findings",
            "Priority appointment scheduling",
            "Modern equipment & sterilized environment",
            "NABL & ISO accredited laboratory",
            "No hidden charges — all-inclusive pricing",
            "Ample free parking at center",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
              <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-slate-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SHIPPING & DELIVERY ══ */}
      <section className="bg-emerald-50/50 border-y border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Clock size={20} className="text-emerald-600" />
            </div>
            Shipping &amp; Report Delivery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Service Type", value: "In-Center Diagnostic Service" },
              { label: "Report Delivery", value: "Same-Day Digital via WhatsApp" },
              { label: "Report Format", value: "PDF + Physical Print Available" },
              { label: "Delivery Cost", value: "Free — Included in Service" },
              { label: "Digital Turnaround", value: "2–6 Hours (Most Scans)" },
              { label: "Physical Report", value: "Available for Pickup Same Day" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-emerald-100 shadow-sm">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-black text-slate-900">{item.label}</p>
                  <p className="text-sm text-slate-600 font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-500 font-medium">
            Full policy: <Link href="/delivery-policy" className="text-blue-600 font-bold hover:underline">Report Delivery Policy →</Link>
          </p>
        </div>
      </section>

      {/* ══ RETURNS & REFUND POLICY ══ */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Shield size={20} className="text-blue-600" />
            </div>
            Returns &amp; Refund Policy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Cancellation Before Visit", value: "Full Refund within 5-7 business days" },
              { label: "Rescheduling", value: "Free — Unlimited rescheduling allowed" },
              { label: "After Service Completion", value: "Non-refundable (service already rendered)" },
              { label: "Report Re-interpretation", value: "Free second opinion available" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                <Shield size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-black text-slate-900">{item.label}</p>
                  <p className="text-sm text-slate-600 font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-500 font-medium">
            Full policy: <Link href="/refund-returns" className="text-blue-600 font-bold hover:underline">Refund & Returns Policy →</Link>
          </p>
        </div>
      </section>

      {/* ══ STORE RATING ══ */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 border-y border-amber-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-2">Trusted by 500+ Patients</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={28} className={i < 5 ? "text-amber-400 fill-amber-400" : "text-slate-300"} />
            ))}
            <span className="text-3xl font-black text-slate-900 ml-2">4.9</span>
          </div>
          <p className="text-slate-600 font-medium mb-6">
            Based on 523 verified Google Reviews
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "NABL Accredited",
              "ISO 15189 Certified",
              "500+ Google Reviews",
              "Same-Day Reports",
              "Expert Radiologists",
            ].map((badge, i) => (
              <span key={i} className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider bg-white border border-amber-200 text-amber-800 shadow-sm">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ══ */}
      <section className="bg-gradient-to-r from-blue-950 via-indigo-900 to-blue-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Book Your {product.title} Today
          </h2>
          <p className="text-blue-200/80 text-lg font-medium mb-8 max-w-2xl mx-auto">
            Get priority booking at ₹{product.price.toLocaleString('en-IN')} — Save ₹{savings.toLocaleString('en-IN')} compared to market price.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact#booking"
              className="flex items-center justify-center gap-3 bg-white text-blue-700 font-black text-lg py-4 px-10 rounded-2xl shadow-lg hover:-translate-y-1 transition-all"
            >
              <Calendar size={22} /> Book Appointment
            </Link>
            <a
              href="tel:08879327184"
              className="flex items-center justify-center gap-3 border-2 border-white/30 text-white font-black text-lg py-4 px-10 rounded-2xl hover:bg-white/10 transition-all"
            >
              <Phone size={22} /> Call Now
            </a>
          </div>
          <p className="mt-6 text-white/50 text-sm font-bold">
            Also view our full <Link href={`/services/${product.serviceSlug}`} className="text-blue-300 underline hover:text-white transition-colors">service page →</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
