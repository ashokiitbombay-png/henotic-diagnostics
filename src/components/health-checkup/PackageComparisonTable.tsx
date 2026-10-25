import type { HealthPackage } from '@/config/health-checkup';
import { formatINR } from '@/config/health-checkup';

interface PackageComparisonTableProps {
  packages: HealthPackage[];
  keyword: string;
}

/**
 * Server-rendered price & inclusion comparison of every package.
 * Gives crawlers and AI answer engines a clean, structured, extractable
 * summary regardless of the client-side filter state.
 */
export default function PackageComparisonTable({ packages, keyword }: PackageComparisonTableProps) {
  return (
    <section aria-labelledby="hc-compare-title" className="bg-white/85 backdrop-blur-md rounded-3xl border border-white/60 p-5 sm:p-8 shadow-sm">
      <h2 id="hc-compare-title" className="text-2xl sm:text-3xl font-black text-gray-950">
        {keyword} Price List &amp; Package Comparison
      </h2>
      <p className="text-sm text-gray-600 mt-1 mb-5">
        All prices are special package prices in Indian Rupees, inclusive of free home sample collection in Navi Mumbai.
      </p>
      <div className="overflow-x-auto -mx-5 sm:mx-0">
        <table className="min-w-[760px] w-full text-left text-sm">
          <caption className="sr-only">{keyword} packages at Henotic Diagnostics compared by tests, key inclusions, fasting and price</caption>
          <thead>
            <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
              <th scope="col" className="py-3 px-3 sm:px-2 font-bold">Package</th>
              <th scope="col" className="py-3 px-2 font-bold">Best for</th>
              <th scope="col" className="py-3 px-2 font-bold text-right">Tests</th>
              <th scope="col" className="py-3 px-2 font-bold">Key inclusions</th>
              <th scope="col" className="py-3 px-2 font-bold">Fasting</th>
              <th scope="col" className="py-3 px-2 font-bold text-right">Price</th>
              <th scope="col" className="py-3 px-3 sm:px-2 font-bold text-right">MRP</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((p) => (
              <tr key={p.code} className="border-b border-gray-100 align-top">
                <th scope="row" className="py-3 px-3 sm:px-2 font-bold text-gray-900">
                  <a href={`#package-${p.code.toLowerCase()}`} className="hover:text-purple-700 hover:underline">{p.title}</a>
                  <span className="block text-[11px] font-medium text-gray-500">{p.subtitle}</span>
                </th>
                <td className="py-3 px-2 text-gray-700">{p.target.join(', ')}</td>
                <td className="py-3 px-2 text-right font-semibold text-gray-900">{p.totalTests}</td>
                <td className="py-3 px-2 text-gray-700">{p.highlights.join(' · ')}</td>
                <td className="py-3 px-2 text-gray-700 whitespace-nowrap">{p.fastingRequired ? '8–12 hrs' : 'Not needed'}</td>
                <td className="py-3 px-2 text-right font-extrabold text-gray-950 whitespace-nowrap">₹{formatINR(p.offerPrice)}</td>
                <td className="py-3 px-3 sm:px-2 text-right text-gray-400 line-through whitespace-nowrap">₹{formatINR(p.mrp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
