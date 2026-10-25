'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Calendar, CircleCheck, X } from 'lucide-react';
import type { HealthPackage } from '@/config/health-checkup';
import { LAB_PHONE_DISPLAY, LAB_PHONE_TEL, LAB_WHATSAPP_NUMBER, formatINR } from '@/config/health-checkup';
import { useModalA11y } from './useModalA11y';

interface BookingModalProps {
  open: boolean;
  packages: HealthPackage[];
  initialPackage: HealthPackage | null;
  pageKeyword: string;
  onClose: () => void;
}

const EMPTY_FORM = { name: '', phone: '', email: '', date: '', address: '', homeVisit: true };

/**
 * Appointment request modal. Builds a structured WhatsApp message to the
 * lab helpline — no personal data is stored or sent to our servers.
 */
export default function BookingModal({ open, packages, initialPackage, pageKeyword, onClose }: BookingModalProps) {
  const ref = useModalA11y<HTMLDivElement>(open, onClose);
  const [selected, setSelected] = useState<HealthPackage | null>(initialPackage);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [success, setSuccess] = useState(false);
  const [waUrl, setWaUrl] = useState('');
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    if (open) {
      setSelected(initialPackage ?? packages[0] ?? null);
      setSuccess(false);
      setWaUrl('');
      // Local date (YYYY-MM-DD) computed on the client to avoid hydration drift.
      const now = new Date();
      setMinDate(new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10));
    }
  }, [open, initialPackage, packages]);

  if (!open) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !selected) return;

    const message = [
      `*NEW HEALTH CHECKUP BOOKING REQUEST*`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `🔎 *Enquiry Page:* ${pageKeyword}`,
      `📦 *Package:* ${selected.title} (${selected.totalTests} Tests)`,
      `💰 *Special Package Price:* ₹${formatINR(selected.offerPrice)} (MRP: ₹${formatINR(selected.mrp)})`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Patient Name:* ${formData.name}`,
      `📞 *Phone Number:* ${formData.phone}`,
      formData.email ? `📧 *Email:* ${formData.email}` : null,
      `🗓️ *Preferred Date:* ${formData.date || 'Earliest available'}`,
      `🏠 *Sample Collection:* ${formData.homeVisit ? '24/7 Home Sample Pickup' : 'Visit Center'}`,
      formData.address ? `📍 *Address:* ${formData.address}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `Sent via Henotic Diagnostics Portal`,
    ]
      .filter(Boolean)
      .join('\n');

    const link = `https://wa.me/${LAB_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setWaUrl(link);
    setSuccess(true);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const closeAndReset = () => {
    setFormData(EMPTY_FORM);
    setSuccess(false);
    onClose();
  };

  const inputCls = 'w-full text-sm rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-600';

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeAndReset}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="hc-booking-title"
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden hc-fade-zoom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative">
          <button
            type="button"
            onClick={closeAndReset}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Close booking form"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full mb-2">
            <Calendar className="w-3 h-3" aria-hidden="true" />
            <span>Instant Slot Confirmation</span>
          </div>
          <h2 id="hc-booking-title" className="text-xl font-black">Book {pageKeyword}</h2>
          {selected && (
            <p className="text-xs text-gray-300 mt-1">
              Selected: <span className="font-bold text-white uppercase">{selected.title}</span> (₹{formatINR(selected.offerPrice)})
            </p>
          )}
        </div>

        {success ? (
          <div className="p-8 text-center space-y-4" role="status">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CircleCheck className="w-9 h-9" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-black text-gray-900">Appointment Request Prepared!</h3>
            <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
              Your request has been structured for our WhatsApp helpline <span className="font-bold text-gray-900">{LAB_PHONE_DISPLAY}</span>. Tap send in WhatsApp to confirm.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={waUrl || `https://wa.me/${LAB_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all"
              >
                💬 Open &amp; Send on WhatsApp
              </a>
              <button type="button" onClick={closeAndReset} className="py-2.5 px-4 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition">
                Close Window
              </button>
            </div>
            <p className="pt-2 text-xs font-semibold text-purple-700">
              Priority Helpline: <a href={LAB_PHONE_TEL} className="underline font-bold">{LAB_PHONE_DISPLAY}</a>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            <div>
              <label htmlFor="hc-package" className="block text-xs font-bold text-gray-700 uppercase mb-1">Select / Switch Package</label>
              <select
                id="hc-package"
                value={selected?.id ?? ''}
                onChange={(e) => setSelected(packages.find((p) => p.id === e.target.value) ?? null)}
                className="w-full text-sm font-semibold rounded-xl border border-gray-300 px-3 py-2.5 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                {packages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.totalTests} Tests) – ₹{formatINR(p.offerPrice)} (MRP ₹{formatINR(p.mrp)})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="hc-name" className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name *</label>
                <input id="hc-name" type="text" required autoComplete="name" placeholder="e.g. Rahul Sharma" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label htmlFor="hc-phone" className="block text-xs font-bold text-gray-700 uppercase mb-1">Contact Number *</label>
                <input id="hc-phone" type="tel" required autoComplete="tel" inputMode="tel" pattern="[0-9+\s\-]{10,15}" placeholder="e.g. 9876543210" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="hc-date" className="block text-xs font-bold text-gray-700 uppercase mb-1">Preferred Date</label>
                <input id="hc-date" type="date" min={minDate || undefined} value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label htmlFor="hc-email" className="block text-xs font-bold text-gray-700 uppercase mb-1">Email (Optional)</label>
                <input id="hc-email" type="email" autoComplete="email" placeholder="For digital reports" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputCls} />
              </div>
            </div>

            <div>
              <label htmlFor="hc-address" className="block text-xs font-bold text-gray-700 uppercase mb-1">Sample Collection Address</label>
              <textarea id="hc-address" rows={2} autoComplete="street-address" placeholder="Enter full address for 24/7 home collection..." value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className={`${inputCls} resize-none`} />
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-50 text-xs font-semibold text-purple-900 border border-purple-100">
              <input type="checkbox" id="hc-homeVisit" checked={formData.homeVisit} onChange={(e) => setFormData({ ...formData, homeVisit: e.target.checked })} className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer" />
              <label htmlFor="hc-homeVisit" className="cursor-pointer">Confirm Free 24/7 Home Sample Pickup</label>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button type="button" onClick={closeAndReset} className="py-2.5 px-4 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition">
                Cancel
              </button>
              <button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-all">
                Book &amp; Send to WhatsApp {selected ? `(₹${formatINR(selected.offerPrice)})` : ''}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
