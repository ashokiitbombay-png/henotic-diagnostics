'use client';

import { useCallback, useMemo, useState } from 'react';
import type { HealthPackage, PackageFilter } from '@/config/health-checkup';
import PackageCard from './PackageCard';
import PackageDrawer from './PackageDrawer';
import BookingModal from './BookingModal';

interface PackageExplorerProps {
  packages: HealthPackage[];
  defaultFilter: PackageFilter;
  keyword: string;
}

const FILTERS: { id: PackageFilter; label: (n: number) => string }[] = [
  { id: 'ALL', label: (n) => `All Checkups (${n})` },
  { id: 'Men', label: () => "Men's Health" },
  { id: 'Women', label: () => "Women's Health" },
  { id: 'Seniors', label: () => 'Senior Citizens (55+)' },
];

/**
 * Interactive package grid: audience filter pills, rate cards, test drawer
 * and WhatsApp booking modal. Server-rendered with the page's default filter
 * so the initial HTML already contains the relevant packages.
 */
export default function PackageExplorer({ packages, defaultFilter, keyword }: PackageExplorerProps) {
  const [filter, setFilter] = useState<PackageFilter>(defaultFilter);
  const [drawerPkg, setDrawerPkg] = useState<HealthPackage | null>(null);
  const [bookingPkg, setBookingPkg] = useState<HealthPackage | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const visible = useMemo(
    () => (filter === 'ALL' ? packages : packages.filter((p) => p.target.includes(filter))),
    [filter, packages],
  );

  const openBooking = useCallback((pkg: HealthPackage) => {
    setBookingPkg(pkg);
    setBookingOpen(true);
  }, []);
  const closeDrawer = useCallback(() => setDrawerPkg(null), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  return (
    <>
      <div role="group" aria-label="Filter packages by audience" className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {FILTERS.map((tab) => {
          const active = filter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                active
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md scale-[1.02]'
                  : 'bg-white/80 backdrop-blur-sm text-gray-600 border-white/60 hover:bg-white hover:text-gray-900 shadow-sm'
              }`}
            >
              {tab.label(packages.length)}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {keyword} packages
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9 lg:gap-8 pt-10">
        {visible.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} onViewTests={setDrawerPkg} onBook={openBooking} />
        ))}
      </div>

      <PackageDrawer pkg={drawerPkg} onClose={closeDrawer} onBook={openBooking} />
      <BookingModal open={bookingOpen} packages={packages} initialPackage={bookingPkg} pageKeyword={keyword} onClose={closeBooking} />
    </>
  );
}
