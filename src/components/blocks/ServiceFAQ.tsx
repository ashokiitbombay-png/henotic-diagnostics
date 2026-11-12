import React from 'react';
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
 * 🎯 Premium FAQ Component for Service Pages
 * Server Component using native <details>/<summary> for zero JS runtime overhead.
 */
export default function ServiceFAQ({ faqs, serviceName }: ServiceFAQProps) {
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
          {faqs.map((faq, index) => (
            <details
              key={index}
              open={index === 0}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-slate-200 open:border-blue-200 open:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-200 overflow-hidden cursor-pointer"
            >
              <summary className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left list-none outline-none select-none">
                <span className="font-bold text-base md:text-lg text-slate-800 group-open:text-blue-700 transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className="shrink-0 mt-1 text-slate-400 group-open:rotate-180 group-open:text-blue-500 transition-transform duration-200"
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
