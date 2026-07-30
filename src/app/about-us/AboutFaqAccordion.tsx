"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqCategory {
  category: string;
  items: { q: string; a: string }[];
}

interface AboutFaqAccordionProps {
  faqs: FaqCategory[];
}

export default function AboutFaqAccordion({ faqs }: AboutFaqAccordionProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const toggleFaq = (index: string) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {faqs.map((faqGroup, groupIndex) => (
        <div key={groupIndex} className="bg-slate-50 rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-4">{faqGroup.category}</h3>
          <div className="space-y-3">
            {faqGroup.items.map((item, itemIndex) => {
              const idx = `${groupIndex}-${itemIndex}`;
              const isActive = activeFaq === idx;
              return (
                <div key={itemIndex} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 text-left focus:outline-none hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-800 pr-4">{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 transition-transform duration-300 flex-shrink-0 ${
                        isActive ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>
                  {isActive && (
                    <div className="p-4 pt-0 text-slate-600 bg-white">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
