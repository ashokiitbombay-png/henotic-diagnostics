import React from "react";
import dynamic from "next/dynamic";
import WordPressRenderer from "@/components/content/WordPressRenderer";
import LocalSEOMastery from "@/components/seo/LocalSEOMastery";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CrossLocationLinks from "@/components/seo/CrossLocationLinks";
import RelatedServices from "@/components/seo/RelatedServices";
import PeopleAlsoSearchFor from "@/components/seo/PeopleAlsoSearchFor";
import PricingTable from "@/components/blocks/PricingTable";
import ServiceFAQ from "@/components/blocks/ServiceFAQ";
import LocationFAQ from "@/components/seo/LocationFAQ";
import { getFAQsForService } from "@/config/faqs";
import { getPricingForService } from "@/config/pricing";
import { REAL_LOCATION_REVIEWS } from "@/config/locations";
import { Activity, CheckCircle2, Calendar } from "lucide-react";
import ServiceHero from '@/components/blocks/ServiceHero';
import MedicalPseoSchema from "@/components/seo/MedicalPseoSchema";

// 🛡️ Booking Engine Isolation — dynamically loaded client-only component.
// Decoupled from static PSEO content to prevent hydration interference
// and ensure zero JS bundle leakage into crawlbot-visible markup.
const BookingForm = dynamic(() => import("@/components/forms/BookingForm"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-slate-100 rounded-2xl h-[400px] flex items-center justify-center">
      <p className="text-slate-400 font-bold">Loading booking form...</p>
    </div>
  ),
});

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
  const faqs = getFAQsForService(service, formattedService, formattedLocation);
  const pricing = getPricingForService(service);
  const locationReviews = REAL_LOCATION_REVIEWS[location];

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px] pb-24">
      <MedicalPseoSchema
        type="service"
        serviceSlug={service}
        serviceName={formattedService}
        regionSlug={region}
        locationSlug={location}
        wpContent={content}
      />
      <SchemaMarkup service={formattedService} location={formattedLocation} />
      <ServiceSchema
        serviceName={formattedService}
        serviceSlug={service}
        locationName={location}
        regionName={region}
        ratingValue={locationReviews?.ratingValue}
        reviewCount={locationReviews?.reviewCount}
      />
      <FAQSchema faqs={faqs} />

      {/* 1. PREMIUM HERO WITH BREADCRUMBS & ACCREDITATIONS */}
      <ServiceHero 
        service={service} 
        region={region} 
        location={location}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: formattedService, url: `/services/${service}` },
        { name: formattedRegion, url: `/services/${service}/${region}` },
        { name: formattedLocation, url: `/services/${service}/${region}/${location}` },
      ]} />

      {/* 2. DYNAMIC CONTENT & STICKY SIDEBAR SPLIT */}
      <section className="max-w-7xl mx-auto px-0 sm:px-4 md:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 sm:gap-10">
          
          {/* Left Column: WordPress CMS Content */}
          <div className="lg:col-span-2 bg-white sm:rounded-[3rem] px-4 py-8 sm:p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] sm:border-[6px] border-white relative overflow-visible group">
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

      {/* 3. PRICING TABLE */}
      <PricingTable serviceSlug={service} serviceName={formattedService} locationName={formattedLocation} />

      {/* 4. FAQ SECTION WITH RICH SNIPPETS */}
      <ServiceFAQ faqs={faqs} serviceName={formattedService} />

      {/* 4b. LOCATION-SPECIFIC PROGRAMMATIC FAQs */}
      <LocationFAQ
        serviceName={formattedService}
        serviceSlug={service}
        locationName={formattedLocation}
        regionName={formattedRegion}
        price={pricing?.henoticPrice}
      />

      {/* 5. CROSS-LOCATION LINKS */}
      <CrossLocationLinks service={service} region={region} currentLocation={location} />

      {/* 6. RELATED SERVICES — Internal Linking */}
      <PeopleAlsoSearchFor currentServiceSlug={service} />
      <RelatedServices currentService={service} region={region} location={location} />

      {/* 7. LOCAL SEO MASTERY COMPONENT SECTION */}
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

    </main>
  );
}
