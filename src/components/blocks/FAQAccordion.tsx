import React from 'react';
import { HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs?: FAQItem[];
  title?: string;
}

export default function FAQAccordion({ faqs, title }: FAQAccordionProps) {
  const defaultFaqs = faqs || [
    { question: "How do I book an appointment?", answer: "You can book easily using our online portal form, via WhatsApp chat, or by calling our customer desk direct lines." },
    { question: "When will I receive my diagnostic reports?", answer: "Most routine pathology and blood test reports are delivered within 6 to 12 hours. Imaging and radiology reports (MRI, CT, Ultrasound) are verified and sent within 12 to 24 hours." },
    { question: "Is fasting required for blood tests?", answer: "Fasting requirements vary by test. For general health checkups or lipid profiles, 10 to 12 hours of overnight fasting is usually recommended." },
  ];

  return (
    <div className="w-full">
      <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <HelpCircle className="text-blue-600" /> {title || "Frequently Asked Questions"}
      </h3>
      <div className="space-y-4">
        {defaultFaqs.map((faq, i) => (
          <details key={i} className="group bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-sm p-5 cursor-pointer open:bg-white/90 transition-all">
            <summary className="font-bold text-slate-800 outline-none list-none flex justify-between items-center">
              {faq.question}
              <span className="text-blue-600 group-open:rotate-45 transition-transform duration-300 font-bold text-lg">+</span>
            </summary>
            <p className="mt-4 text-slate-600 text-sm leading-relaxed font-medium">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
