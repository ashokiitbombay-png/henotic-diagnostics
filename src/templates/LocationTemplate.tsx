import React from "react";
import BookingForm from "@/components/forms/BookingForm";
import WordPressRenderer from "@/components/content/WordPressRenderer";
import LocalSEOMastery from "@/components/seo/LocalSEOMastery";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { Activity, CheckCircle2, Calendar } from "lucide-react";
import ServiceHero from '@/components/blocks/ServiceHero';

interface LocationTemplateProps {
  service: string;
  region: string;
  location: string;
  content?: string;
  formattedService: string;
  formattedLocation: string;
  formattedRegion: string;
}

export default function LocationTemplate({
  service,
  region,
  location,
  content,
  formattedService,
  formattedLocation,
  formattedRegion
}: LocationTemplateProps) {
  const context = { locationName: formattedLocation, serviceName: formattedService, regionName: formattedRegion };

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px] pb-24 overflow-hidden">
      <SchemaMarkup service={formattedService} location={formattedLocation} />

      {/* 1. PREMIUM HERO WITH BREADCRUMBS & ACCREDITATIONS */}
      <ServiceHero 
        service={service} 
        region={region} 
        location={location}
      />

      {/* 2. DYNAMIC CONTENT & STICKY SIDEBAR SPLIT */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: WordPress CMS Content */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-[6px] border-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-110"></div>
            
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 pb-6 border-b border-slate-100 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-2xl text-blue-600"><Activity size={28} /></div>
              About {formattedService}
            </h2>

            {/* Render WP Content using our Block/Widget Architecture Bridge */}
            <div className="wp-content-wrapper text-slate-700 font-medium leading-relaxed space-y-6">
              {content ? (
                <WordPressRenderer content={content} context={context} />
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
                className="block w-full bg-white text-blue-600 text-center font-black text-lg py-4 rounded-2xl shadow-[0_15px_30px_-5px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-all"
              >
                Book Your Slot Now
              </a>
              <p className="text-center text-white/70 text-sm mt-4 font-bold">Priority service for {formattedLocation} patients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCAL SEO MASTERY COMPONENT SECTION */}
      <section className="mt-16">
        <LocalSEOMastery service={service} region={region} location={location} />
      </section>

      {/* 4. FULL-WIDTH PREMIUM BOOKING FORM INJECTION */}
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

      {/* Global CSS for WordPress HTML Formatting */}
      <style dangerouslySetInnerHTML={{__html: `
        .wp-content-wrapper h2 { font-size: 2rem; font-weight: 800; color: #0f172a; margin-top: 2.5rem; margin-bottom: 1rem; line-height: 1.2; }
        .wp-content-wrapper h3 { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin-top: 2rem; margin-bottom: 0.75rem; }
        .wp-content-wrapper p { margin-bottom: 1.25rem; font-size: 1.125rem; }
        .wp-content-wrapper ul, .wp-content-wrapper ol { padding-left: 0; margin-bottom: 1.5rem; }
        .wp-content-wrapper ul li, .wp-content-wrapper ol li { position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; font-size: 1.125rem; }
        .wp-content-wrapper ul li::before { content: '✓'; position: absolute; left: 0; color: #2563eb; font-weight: bold; }
        .wp-content-wrapper ol { list-style-type: decimal; padding-left: 1.5rem; }
        .wp-content-wrapper a { color: #2563eb; font-weight: 800; text-decoration: underline; text-underline-offset: 4px; }
        .wp-content-wrapper img { border-radius: 1.5rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); margin: 2rem 0; width: 100%; height: auto; }
        .wp-content-wrapper hr { margin: 3rem 0; border-color: #e2e8f0; }
      `}} />
    </main>
  );
}
