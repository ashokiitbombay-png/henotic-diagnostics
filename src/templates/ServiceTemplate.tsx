import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import WordPressRenderer from "@/components/content/WordPressRenderer";
import ServiceHero from '@/components/blocks/ServiceHero';
import ServiceSchema from "@/components/seo/ServiceSchema";
import MedicalProcedureSchema from "@/components/seo/MedicalProcedureSchema";
import ProductSchema from "@/components/seo/ProductSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import MedicalPseoSchema from "@/components/seo/MedicalPseoSchema";
import RelatedServices from "@/components/seo/RelatedServices";
import PeopleAlsoSearchFor from "@/components/seo/PeopleAlsoSearchFor";
import PricingTable from "@/components/blocks/PricingTable";
import ServiceFAQ from "@/components/blocks/ServiceFAQ";
import { getFAQsForService } from "@/config/faqs";
import { getPricingForService } from "@/config/pricing";

interface ServiceTemplateProps {
  service: string;
  content?: string;
  formattedService: string;
}

export default function ServiceTemplate({
  service,
  content,
  formattedService
}: ServiceTemplateProps) {
  const context = { serviceName: formattedService };
  const faqs = getFAQsForService(service, formattedService);
  const pricing = getPricingForService(service);

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px]">
      <MedicalPseoSchema
        type="service"
        serviceSlug={service}
        serviceName={formattedService}
        wpContent={content}
      />
      <ServiceHero service={service} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: formattedService, url: `/services/${service}` },
      ]} />
      <div className="max-w-5xl mx-auto px-0 sm:px-4 lg:px-8">
        
        <Link href="/services" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors mb-6 mx-4 sm:mx-0 mt-8">
          <ArrowLeft size={18} /> Back to All Services
        </Link>

        <div className="bg-white sm:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] sm:border border-slate-200 overflow-visible mt-4">

          {/* Render WP Content using our Block/Widget Architecture Bridge */}
          <div className="px-4 py-6 sm:p-8 md:p-12">
            {content ? (
              <div className="wp-content-wrapper text-slate-700 font-medium leading-relaxed space-y-6">
                <WordPressRenderer content={content} context={context} />
              </div>
            ) : (
              <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
                <div className="w-16 h-16 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-600 mb-2">Connecting to Backend...</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  No content found for <strong>{service}</strong>. Please ensure the page is published in WordPress and WPGraphQL is active.
                </p>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="bg-slate-50 p-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-extrabold text-slate-900">Ready to book your {formattedService}?</h4>
              <p className="text-slate-600 font-medium text-sm">Get priority booking through our secure portal.</p>
            </div>
            <Link href="/contact#booking" className="flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white font-extrabold py-4 px-8 rounded-2xl transition-all shadow-md hover:shadow-lg w-full sm:w-auto justify-center hover:-translate-y-1 text-lg">
              <Calendar size={20} /> Book Appointment
            </Link>
          </div>

        </div>
      </div>

      {/* Pricing */}
      <PricingTable serviceSlug={service} serviceName={formattedService} />

      {/* FAQ Section */}
      <ServiceFAQ faqs={faqs} serviceName={formattedService} />
      <FAQSchema faqs={faqs} />

      {/* Enhanced Schema */}
      <ServiceSchema serviceName={formattedService} serviceSlug={service} />
      <MedicalProcedureSchema
        procedureName={formattedService}
        procedureSlug={service}
        bodyLocation={
          service.includes('brain') ? 'Brain / Head' :
          service.includes('spine') ? 'Spine / Back' :
          service.includes('chest') || service.includes('hrct') || service.includes('pulmonary') ? 'Chest / Thorax' :
          service.includes('abdomen') || service.includes('liver') || service.includes('kidney') || service.includes('fibroscan') ? 'Abdomen' :
          service.includes('knee') ? 'Knee' :
          service.includes('shoulder') ? 'Shoulder' :
          service.includes('cardiac') || service.includes('echo') || service.includes('ecg') || service.includes('tmt') || service.includes('coronary') || service.includes('holter') ? 'Heart / Cardiovascular' :
          service.includes('thyroid') ? 'Thyroid / Neck' :
          service.includes('breast') || service.includes('mammography') ? 'Breast' :
          service.includes('pelvic') || service.includes('transvaginal') || service.includes('follicular') ? 'Pelvis' :
          service.includes('carotid') ? 'Carotid Artery / Neck' :
          service.includes('renal') ? 'Kidneys' :
          service.includes('bone') || service.includes('dexa') ? 'Skeletal System' :
          service.includes('fetal') || service.includes('pregnancy') || service.includes('anomaly') || service.includes('nt-scan') || service.includes('growth') || service.includes('nipt') ? 'Uterus / Fetal' :
          undefined
        }
      />
      {pricing && (
        <ProductSchema
          serviceName={formattedService}
          serviceSlug={service}
          price={pricing.henoticPrice}
          marketPrice={pricing.marketPrice}
          category={pricing.category}
        />
      )}

      {/* Internal Linking */}
      <PeopleAlsoSearchFor currentServiceSlug={service} />
      <RelatedServices currentService={service} />

    </main>
  );
}
