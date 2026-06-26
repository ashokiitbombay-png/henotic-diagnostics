"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  faqs: FAQ[];
  serviceName: string;
}

/**
 * 🎯 Premium FAQ Accordion for Service Pages
 * Displays dynamic, contextual FAQs with smooth animations.
 */
export default function ServiceFAQ({ faqs, serviceName }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-sm font-extrabold uppercase tracking-widest mb-4">
            <HelpCircle size={16} /> Frequently Asked
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Common Questions About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4568dc] to-[#b06ab3]">
              {serviceName}
            </span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-blue-200 shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
                    : 'border-slate-100 shadow-sm hover:border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`font-bold text-base md:text-lg transition-colors ${isOpen ? 'text-blue-700' : 'text-slate-800'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 mt-1 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-blue-500' : 'text-slate-400'
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-slate-600 font-medium leading-relaxed text-[15px] border-t border-slate-50 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
