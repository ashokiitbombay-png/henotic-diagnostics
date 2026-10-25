import { CircleCheck, ClipboardList, Users, CalendarCheck, FlaskConical, FileText, Stethoscope } from 'lucide-react';
import type { HealthCheckupPageContent } from '@/config/health-checkup';

interface AuthorityContentProps {
  page: HealthCheckupPageContent;
}

const HOW_IT_WORKS = [
  { icon: CalendarCheck, title: 'Book online or on WhatsApp', body: 'Choose a package and a home-collection slot or centre visit — available 24/7.' },
  { icon: FlaskConical, title: 'Sample collection', body: 'A trained phlebotomist collects blood and urine with sterile, barcoded kits.' },
  { icon: Stethoscope, title: 'Automated analysis', body: 'Samples are processed on automated analysers at our Kharghar laboratory.' },
  { icon: FileText, title: 'Verified digital report', body: 'A qualified pathologist reviews results; reports are typically shared in 8–12 hours.' },
];

/**
 * Keyword-specific long-form content: who should book, explanatory
 * sections, preparation and process. Uses semantic headings (H2/H3) so the
 * page has a clear outline for search engines and AI answer engines.
 */
export default function AuthorityContent({ page }: AuthorityContentProps) {
  return (
    <section aria-labelledby="hc-guide-title" className="bg-white/85 backdrop-blur-md rounded-3xl border border-white/60 p-5 sm:p-8 shadow-sm">
      <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
        {page.keyword} Guide
      </span>
      <h2 id="hc-guide-title" className="text-2xl sm:text-3xl font-black text-gray-950 mt-3">
        {page.keyword}: What You Need to Know
      </h2>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {page.sections.map((s) => (
            <article key={s.heading}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900">{s.heading}</h3>
              <p className="mt-2 text-sm sm:text-[15px] text-gray-700 leading-relaxed">{s.body}</p>
            </article>
          ))}

          <div>
            <h3 className="text-lg sm:text-xl font-black text-gray-900">How your {page.keyword.toLowerCase()} works</h3>
            <ol className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HOW_IT_WORKS.map((step, i) => (
                <li key={step.title} className="flex gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white text-sm font-black">{i + 1}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                      <step.icon className="w-4 h-4 text-purple-600" aria-hidden="true" />
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-purple-100 bg-purple-50/60 p-5">
            <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-700" aria-hidden="true" />
              Who should book a {page.keyword.toLowerCase()}?
            </h3>
            <ul className="mt-3 space-y-2">
              {page.whoShouldBook.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <CircleCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="text-base font-black text-amber-950 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-amber-700" aria-hidden="true" />
              How to prepare
            </h3>
            <ul className="mt-3 space-y-2 list-disc pl-5 text-sm text-amber-900">
              {page.preparation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <p className="mt-6 text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
        Medical disclaimer: this information is educational and does not replace advice from a qualified doctor. Screening
        results should always be interpreted by your physician. If you have severe or sudden symptoms such as chest pain,
        breathlessness or fainting, seek emergency care immediately.
      </p>
    </section>
  );
}
