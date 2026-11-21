'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Calendar, CheckCircle2, MessageCircle, Phone, X } from 'lucide-react';
import type { NiptLocationContext, NiptPanel } from '@/config/nipt-test';
import { NIPT_PHONE_DISPLAY, NIPT_PHONE_HREF, NIPT_WHATSAPP_NUMBER, formatNiptINR } from '@/config/nipt-test';
import { useModalA11y } from '@/components/health-checkup/useModalA11y';

interface NiptBookingModalProps {
  open: boolean;
  panels: NiptPanel[];
  initialPanel: NiptPanel | null;
  pageKeyword: string;
  locationContext?: NiptLocationContext;
  onClose: () => void;
}

const EMPTY_FORM = {
  name: '',
  phone: '',
  gestationWeeks: '',
  pregnancyType: 'Singleton Pregnancy',
  date: '',
  address: '',
  homeVisit: true,
};

/** Prenatal NIPT Appointment Booking Modal with WhatsApp dispatch & location pre-fill. */
export default function NiptBookingModal({
  open,
  panels,
  initialPanel,
  pageKeyword,
  locationContext,
  onClose,
}: NiptBookingModalProps) {
  const ref = useModalA11y<HTMLDivElement>(open, onClose);
  const [selected, setSelected] = useState<NiptPanel | null>(initialPanel);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');
  const [minDate, setMinDate] = useState('');

  const defaultLocationText = locationContext?.locationName && locationContext?.regionName
    ? `${locationContext.locationName}, ${locationContext.regionName}${locationContext.pincode ? ` (${locationContext.pincode})` : ''}`
    : locationContext?.regionName || '';

  useEffect(() => {
    if (open) {
      setSelected(initialPanel ?? panels[0] ?? null);
      setBookingSuccess(false);
      setWhatsAppUrl('');
      setFormData((prev) => ({
        ...prev,
        address: prev.address || defaultLocationText,
      }));
      const now = new Date();
      setMinDate(new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10));
    }
  }, [open, initialPanel, panels, defaultLocationText]);

  if (!open) return null;

  const closeAndReset = () => {
    setFormData(EMPTY_FORM);
    setBookingSuccess(false);
    onClose();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !selected) return;

    const message = [
      `*NEW NIPT PRENATAL SCREENING APPOINTMENT*`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `🔎 *Enquiry Page:* ${pageKeyword}${defaultLocationText ? ` (${defaultLocationText})` : ''}`,
      `🧬 *Selected Panel:* ${selected.title}`,
      `💰 *Offer Price:* ₹${formatNiptINR(selected.offerPrice)} (MRP ₹${formatNiptINR(selected.mrp)})`,
      `🔬 *Coverage:* ${selected.totalTestsCount}`,
      `⏱️ *Turnaround:* ${selected.tat}`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `👩 *Patient Name:* ${formData.name}`,
      `📞 *Phone Number:* ${formData.phone}`,
      formData.gestationWeeks ? `🤰 *Gestational Age:* ${formData.gestationWeeks} Weeks` : null,
      `👶 *Pregnancy Type:* ${formData.pregnancyType}`,
      formData.date ? `🗓️ *Preferred Date:* ${formData.date}` : `🗓️ *Preferred Date:* Earliest Available Slot`,
      `🏠 *Collection Mode:* ${formData.homeVisit ? 'Home Maternal Blood Collection' : 'Visit Kharghar Genetic Lab'}`,
      formData.address ? `📍 *Location / Address:* ${formData.address}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `Sent via Henotic Diagnostics NIPT Portal`,
    ]
      .filter(Boolean)
      .join('\n');

    const waLink = `https://wa.me/${NIPT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setWhatsAppUrl(waLink);
    setBookingSuccess(true);

    try {
      window.open(waLink, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Could not auto-open WhatsApp link:', err);
    }
  };

  const inputCls =
    'w-full text-sm rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-600';

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/65 backdrop-blur-sm"
      onClick={closeAndReset}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="nipt-booking-title"
        className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl border border-purple-100 overflow-hidden max-h-[92vh] flex flex-col hc-fade-zoom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 text-white flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-300">
              Instant Prenatal Slot Confirmation
            </span>
            <h3 id="nipt-booking-title" className="text-lg sm:text-xl font-black mt-0.5">
              Book {pageKeyword} Appointment
            </h3>
          </div>
          <button
            type="button"
            onClick={closeAndReset}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Close appointment form"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto">
          {bookingSuccess ? (
            <div className="text-center py-6 space-y-4" role="status">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>
              <h4 className="text-xl font-black text-slate-950">Appointment Request Ready!</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your prenatal NIPT booking summary for <strong>{selected?.title}</strong> (₹
                {selected ? formatNiptINR(selected.offerPrice) : ''}) has been prepared for our genetic coordination desk.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={whatsAppUrl || `https://wa.me/${NIPT_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold shadow-md"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Confirm via WhatsApp</span>
                </a>
                <a
                  href={NIPT_PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-3 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-extrabold"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>Call Desk: {NIPT_PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {selected && (
                <div className="rounded-2xl bg-purple-50/90 border border-purple-200/80 p-3.5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 block">
                      Selected Package Rate ({selected.tat})
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-lg font-black text-slate-950">₹{formatNiptINR(selected.offerPrice)}</span>
                      <span className="text-xs font-bold text-slate-400 line-through">
                        MRP ₹{formatNiptINR(selected.mrp)}
                      </span>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-full text-[11px] font-extrabold">
                    Save ₹{formatNiptINR(selected.savings)}
                  </span>
                </div>
              )}

              <div>
                <label htmlFor="nipt-panel-select" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Select NIPT Panel
                </label>
                <select
                  id="nipt-panel-select"
                  value={selected?.id ?? ''}
                  onChange={(e) => setSelected(panels.find((p) => p.id === e.target.value) ?? null)}
                  className="w-full text-sm font-semibold rounded-xl border border-slate-300 px-3 py-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  {panels.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} — ₹{formatNiptINR(p.offerPrice)} (MRP ₹{formatNiptINR(p.mrp)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="nipt-patient-name" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Expectant Mother Name *
                  </label>
                  <input
                    id="nipt-patient-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="nipt-patient-phone" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Contact Number *
                  </label>
                  <input
                    id="nipt-patient-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[0-9+\s\-]{10,15}"
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="nipt-gestation" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Gestational Age (Weeks)
                  </label>
                  <input
                    id="nipt-gestation"
                    type="number"
                    min={10}
                    max={40}
                    placeholder="e.g. 11 (10+ weeks)"
                    value={formData.gestationWeeks}
                    onChange={(e) => setFormData({ ...formData, gestationWeeks: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="nipt-pregnancy-type" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Pregnancy Type
                  </label>
                  <select
                    id="nipt-pregnancy-type"
                    value={formData.pregnancyType}
                    onChange={(e) => setFormData({ ...formData, pregnancyType: e.target.value })}
                    className={inputCls}
                  >
                    <option value="Singleton Pregnancy">Singleton Pregnancy</option>
                    <option value="Twin Pregnancy">Twin Pregnancy</option>
                    <option value="IVF Pregnancy">IVF Pregnancy</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="nipt-date" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Preferred Date
                  </label>
                  <input
                    id="nipt-date"
                    type="date"
                    min={minDate || undefined}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-50 text-xs font-semibold text-purple-900 border border-purple-100 w-full cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.homeVisit}
                      onChange={(e) => setFormData({ ...formData, homeVisit: e.target.checked })}
                      className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer"
                    />
                    <span>Home Maternal Blood Collection</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="nipt-address" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Collection Area / Full Address
                </label>
                <textarea
                  id="nipt-address"
                  rows={2}
                  autoComplete="street-address"
                  placeholder="Enter sector, society, or locality for home blood collection..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={closeAndReset}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold shadow-md active:scale-[0.98] transition"
                >
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>Confirm via WhatsApp {selected ? `(₹${formatNiptINR(selected.offerPrice)})` : ''}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
