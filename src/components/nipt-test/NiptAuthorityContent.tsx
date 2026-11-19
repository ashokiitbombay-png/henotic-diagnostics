import { CircleCheck, Users, MapPin } from 'lucide-react';
import type { NiptLocationContext, NiptPageContent } from '@/config/nipt-test';

interface NiptAuthorityContentProps {
  page: NiptPageContent;
  locationContext?: NiptLocationContext;
}

/**
 * Per-keyword clinical education & who-should-book guide.
 * Dynamically adapts local coverage context for Region Hubs and all 361 micro-cities.
 */
export default function NiptAuthorityContent({ page, locationContext }: NiptAuthorityContentProps) {
  const areaLabel = locationContext?.locationName && locationContext?.regionName
    ? `${locationContext.locationName}, ${locationContext.regionName}`
    : locationContext?.regionName
    ? locationContext.regionName
    : 'Kharghar, Navi Mumbai & Mumbai';

  return (
    <section
      aria-labelledby="nipt-guide-title"
      className="bg-white/85 backdrop-blur-xl rounded-[2rem] border border-white/90 p-5 sm:p-8 lg:p-10 shadow-sm"
    >
      <span className="text-xs font-extrabold uppercase tracking-wider text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
        {page.keyword} Clinical Guide
      </span>
      <h2 id="nipt-guide-title" className="text-2xl sm:text-3xl font-black text-slate-950 mt-3">
        {page.keyword}: Clinical Overview in {areaLabel}
      </h2>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {page.sections.map((s) => (
            <article key={s.heading} className="space-y-2">
              <h3 className="text-lg sm:text-xl font-black text-slate-900">{s.heading}</h3>
              <p className="text-xs sm:text-[15px] text-slate-700 leading-relaxed">{s.body}</p>
            </article>
          ))}

          {locationContext?.locationName && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 sm:p-5 space-y-1.5">
              <h3 className="text-sm font-black text-emerald-950 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                Local Maternal cfDNA Service Coverage – {locationContext.locationName}
                {locationContext.pincode ? ` (PIN ${locationContext.pincode})` : ''}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                Doorstep maternal blood collection in {locationContext.locationName} arrives within{' '}
                <strong>{locationContext.homeCollectionTurnaround || '30–60 mins'}</strong>, routed to our Molecular Genetics Wing via{' '}
                <strong>{locationContext.nearestPartnerHub || 'Henotic Diagnostics Kharghar Hub'}</strong>.
              </p>
            </div>
          )}
        </div>

        <aside className="rounded-2xl border border-purple-100 bg-purple-50/60 p-5 h-fit">
          <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-700" aria-hidden="true" />
            Who Should Consider {page.keyword}?
          </h3>
          <ul className="mt-3 space-y-2.5">
            {page.whoShouldBook.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <CircleCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
