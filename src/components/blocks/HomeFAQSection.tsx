"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: "What diagnostic services does Henotic Diagnostics offer?",
    a: "We offer 250+ diagnostic tests including MRI, CT scan, PET-CT, ultrasound, blood tests, 2D Echo, ECG, mammography, DEXA bone scan, and comprehensive health checkup packages."
  },
  {
    q: "Where is Henotic Diagnostics located?",
    a: "Our main center is at Second Floor, Millennium Empire, Business Park, Plot No 47, D Mart Rd, Sector 15, Kharghar, Panvel, Maharashtra 410210."
  },
  {
    q: "What are the operating hours?",
    a: "We are open 24 hours a day, 7 days a week, including Sundays and public holidays."
  },
  {
    q: "Is Henotic Diagnostics NABL accredited?",
    a: "Yes, we are NABL accredited, AERB certified, PCPNDT registered, and ISO certified, ensuring the highest standards of diagnostic accuracy."
  },
  {
    q: "How can I book a diagnostic test?",
    a: "You can book via WhatsApp at +91 88793 27184, by calling us directly, or through our online booking portal on the website."
  },
  {
    q: "How quickly are reports delivered?",
    a: "Most reports are available same-day. Blood test reports are typically ready within 4-6 hours, and imaging reports within 24 hours."
  },
  {
    q: "What advanced imaging equipment do you have?",
    a: "We use a 3.0 Tesla MRI Scanner, 128-Slice CT Scanner, Digital PET-CT, 4D Ultrasound, and fully automated pathology systems."
  },
  {
    q: "Do you offer home sample collection?",
    a: "Yes, we provide home sample collection services for blood tests and pathology within Mumbai and Navi Mumbai areas."
  }
];

export default function HomeFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section className="w-full py-16 bg-gradient-to-b from-blue-50 to-white px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-950 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-blue-100 rounded-lg bg-white overflow-hidden shadow-sm"
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none focus:bg-slate-50 transition-colors"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-semibold text-blue-950 text-lg pr-4">{faq.q}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </section>
  );
}
