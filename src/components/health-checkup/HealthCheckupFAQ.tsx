import type { FaqItem } from '@/config/health-checkup';

/**
 * Native <details>/<summary> FAQ accordion — zero client JS, and every answer
 * is present in the server HTML (matches the FAQPage JSON-LD exactly).
 */
export default function HealthCheckupFAQ({ faqs, keyword }: { faqs: FaqItem[]; keyword: string }) {
  return (
    <section aria-labelledby="hc-faq-title" className="bg-white/85 backdrop-blur-md rounded-3xl border border-white/60 p-5 sm:p-8 shadow-sm">
      <h2 id="hc-faq-title" className="text-2xl sm:text-3xl font-black text-gray-950">{keyword}: Frequently Asked Questions</h2>
      <div className="mt-5 divide-y divide-gray-100 border-y border-gray-100">
        {faqs.map((f, i) => (
          <details key={f.question} className="group py-4" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
              <h3 className="text-sm sm:text-base font-bold text-gray-900">{f.question}</h3>
              <span className="mt-0.5 shrink-0 rounded-full border border-gray-200 w-6 h-6 flex items-center justify-center text-gray-500 text-sm font-bold transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="mt-2 text-sm text-gray-700 leading-relaxed pr-8">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
