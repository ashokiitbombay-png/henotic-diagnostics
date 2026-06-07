import React from "react";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import BookingForm from "@/components/forms/BookingForm";
import { MapPin, ShieldCheck, Activity, Star, CheckCircle2, Calendar } from "lucide-react";

export default function ServiceLocationTemplate({ service, region, location, content }: any) {
  // Format slugs to Title Case
  const formattedService = service.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
  const formattedLocation = location.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
  const formattedRegion = region.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px] pb-24 overflow-hidden">
      <SchemaMarkup service={formattedService} location={formattedLocation} />

      {/* 1. 2026 PREMIUM HERO SECTION FOR LOCAL SEO */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 bg-slate-900">
        {/* Background Image & Overlays */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30" 
          style={{ backgroundImage: "url('https://storage.googleapis.com/wp-media-henoticbucket/Reception%20Area/henotic-diagnostics-mri-scan-panvel.webp')" }}
        ></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-50 via-slate-900/80 to-slate-900/40"></div>
        
        {/* 3D Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[120px] opacity-20 bg-[#b06ab3] animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-blue-50 text-sm font-extrabold uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg">
            <MapPin size={16} className="text-pink-400" /> Available in {formattedLocation}, {formattedRegion}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-2xl">
            Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">{formattedService}</span> in {formattedLocation}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-200 font-medium max-w-3xl mx-auto drop-shadow-md">
            Accurate, fast, and reliable diagnostic services near you. Experience state-of-the-art technology with same-day reporting.
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4 text-sm font-bold text-white/90">
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-lg"><ShieldCheck size={18} className="text-blue-400" /> NABL Certified</span>
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-lg"><Activity size={18} className="text-pink-400" /> Advanced Technology</span>
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-lg"><Star size={18} className="text-yellow-400" /> Top Rated</span>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC CONTENT & STICKY SIDEBAR SPLIT */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: WordPress Content (Deep 3D Glassmorphism) */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-[6px] border-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-110"></div>
            
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 pb-6 border-b border-slate-100 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-2xl text-[#4568dc]"><Activity size={28} /></div>
              About {formattedService}
            </h2>

            {/* Custom Prose Styling for WordPress HTML injected via dangerouslySetInnerHTML */}
            <div className="prose prose-lg max-w-none w-full text-slate-700 font-medium leading-relaxed
                prose-h2:text-3xl prose-h2:font-extrabold prose-h2:text-slate-900 prose-h2:mb-6 prose-h2:mt-10
                prose-h3:text-2xl prose-h3:font-bold prose-h3:text-slate-800 prose-h3:mt-8
                prose-p:mb-6 
                prose-a:text-[#4568dc] prose-a:font-extrabold prose-a:no-underline hover:prose-a:underline
                prose-ul:list-none prose-ul:pl-0 prose-li:relative prose-li:pl-8 prose-li:mb-3
            ">
              <style dangerouslySetInnerHTML={{__html: `
                .prose ul li::before { content: '✓'; position: absolute; left: 0; color: #E55D87; font-weight: 900; }
              `}} />
              
              {content ? (
                 <div dangerouslySetInnerHTML={{ __html: content?.content || '' }} />
              ) : (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <Activity size={48} className="mx-auto text-slate-300 mb-4 animate-pulse" />
                  <p className="text-slate-500 italic font-bold text-lg">Detailed medical information for this service is currently being updated by our experts.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Conversion Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-[100px] bg-gradient-to-br from-[#4568dc] to-[#b06ab3] rounded-[3rem] p-8 md:p-10 shadow-[0_40px_80px_-20px_rgba(176,106,179,0.5)] border-4 border-white text-white transform transition-transform hover:-translate-y-2 duration-500">
              <h3 className="text-2xl font-black mb-6 drop-shadow-md text-slate-900">Why Choose Us in {formattedLocation}?</h3>
              
              <ul className="space-y-5 mb-10">
                <li className="flex items-start gap-4 font-bold text-white/90"><CheckCircle2 className="text-white shrink-0 mt-0.5 drop-shadow" size={22}/> Zero waiting time with prior booking</li>
                <li className="flex items-start gap-4 font-bold text-white/90"><CheckCircle2 className="text-white shrink-0 mt-0.5 drop-shadow" size={22}/> Reports delivered directly via WhatsApp</li>
                <li className="flex items-start gap-4 font-bold text-white/90"><CheckCircle2 className="text-white shrink-0 mt-0.5 drop-shadow" size={22}/> NABL & ISO accredited precision</li>
                <li className="flex items-start gap-4 font-bold text-white/90"><CheckCircle2 className="text-white shrink-0 mt-0.5 drop-shadow" size={22}/> Free consultation on reports</li>
              </ul>

              <a 
                href="#booking" 
                className="block w-full bg-white text-[#4568dc] text-center font-black text-lg py-4 rounded-2xl shadow-[0_15px_30px_-5px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-all"
              >
                Book Your Slot Now
              </a>
              <p className="text-center text-white/70 text-sm mt-4 font-bold">Priority service for {formattedLocation} patients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FULL-WIDTH PREMIUM BOOKING FORM INJECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-24" id="booking">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200 text-[#7a1f5c] text-sm font-extrabold uppercase tracking-widest mb-4">
            <Calendar size={16} /> Instant Confirmation
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Schedule Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4568dc] to-[#b06ab3]">{formattedService}</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium mt-4 max-w-2xl mx-auto">
            Fill out the form below to secure your priority booking at our nearest center.
          </p>
        </div>
        
        {/* The Premium Form Component */}
        <BookingForm />
      </section>

    </main>
  );
}