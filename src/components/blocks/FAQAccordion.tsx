"use client";
import React from 'react';
import { HelpCircle } from 'lucide-react';
import Accordion from '@/components/ui/Accordion';

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

  const accordionItems = defaultFaqs.map(faq => ({
    title: faq.question,
    content: faq.answer
  }));

  return (
    <div className="w-full">
      <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <HelpCircle className="text-blue-600" /> {title || "Frequently Asked Questions"}
      </h3>
      <Accordion items={accordionItems} />
    </div>
  );
}
