import React from 'react';
import { ChevronDown, MapPin } from 'lucide-react';

interface LocationFAQProps {
  serviceName: string;
  serviceSlug: string;
  locationName: string;
  regionName: string;
  price?: number;
}

/** Slugs where home sample collection is relevant */
const HOME_COLLECTION_SLUGS = [
  'cbc-test', 'lipid-profile', 'thyroid-test', 'liver-function-test',
  'kidney-function-test', 'hba1c-test', 'vitamin-d-test', 'vitamin-b12-test',
];

function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * 🗺️ Location-Specific Programmatic FAQs
 * Server Component using native <details>/<summary> for zero JS runtime overhead.
 */
export default function LocationFAQ({
  serviceName,
  serviceSlug,
  locationName,
  regionName,
  price,
}: LocationFAQProps) {
  const isPathology = HOME_COLLECTION_SLUGS.includes(serviceSlug);
  const priceDisplay = price ? formatPrice(price) : 'competitive rates';

  const faqs: { question: string; answer: string }[] = [
    {
      question: `Is ${serviceName} available in ${locationName}?`,
      answer: `Yes, Henotic Diagnostics offers ${serviceName} services near ${locationName}, ${regionName}. Our NABL-accredited centre provides accurate diagnostics with state-of-the-art equipment and experienced radiologists. Book your appointment today for priority service.`,
    },
    {
      question: `What is the cost of ${serviceName} in ${locationName}?`,
      answer: `The cost of ${serviceName} at Henotic Diagnostics starts from ${priceDisplay}. We offer up to 50% savings compared to market rates in ${locationName}, with no compromise on quality. Contact us at +91 8879327184 for the latest pricing.`,
    },
    {
      question: `How to book ${serviceName} in ${locationName}?`,
      answer: `You can book ${serviceName} near ${locationName} by calling +91 8879327184 or booking online through our website. We offer instant confirmation, zero waiting time with prior booking, and WhatsApp report delivery for your convenience.`,
    },
    {
      question: `Are reports available same day for ${serviceName} in ${locationName}?`,
      answer: `Yes, most ${serviceName} reports at Henotic Diagnostics are available within 24 hours, with many delivered same day. Reports are shared digitally via WhatsApp and email, so patients in ${locationName} can access results quickly without revisiting the centre.`,
    },
  ];

  // Conditionally add home collection FAQ for pathology services
  if (isPathology) {
    faqs.push({
      question: `Is home sample collection available in ${locationName}?`,
      answer: `Yes, Henotic Diagnostics provides home sample collection services in and around ${locationName}, ${regionName}. Our trained phlebotomists visit your doorstep at your preferred time. Call +91 8879327184 to schedule a home collection for ${serviceName}.`,
    });
  }

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-extrabold uppercase tracking-widest mb-4">
            <MapPin size={16} /> Local FAQs
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {serviceName} in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4568dc] to-[#b06ab3]">
              {locationName}
            </span>
          </h2>
          <p className="text-slate-500 font-medium mt-3 max-w-xl mx-auto">
            Answers to the most common questions about {serviceName} services near {locationName}.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={index}
              open={index === 0}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-slate-200 open:border-emerald-200 open:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-200 overflow-hidden cursor-pointer"
            >
              <summary className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left list-none outline-none select-none">
                <span className="font-bold text-base md:text-lg text-slate-800 group-open:text-emerald-700 transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className="shrink-0 mt-1 text-slate-400 group-open:rotate-180 group-open:text-emerald-500 transition-transform duration-200"
                />
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6 text-slate-600 font-medium leading-relaxed text-[15px] border-t border-slate-50 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
