import React, { useState } from 'react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';
import type { HealthPackage } from '@/config/health-packages';
import { HEALTH_PACKAGES } from '@/config/health-packages';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: HealthPackage;
  onSelectPackage: (pkg: HealthPackage) => void;
  locationName?: string;
  regionName?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedPackage,
  onSelectPackage,
  locationName,
  regionName,
}: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    address: '',
    homeVisit: true
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const locContext = locationName && regionName 
      ? ` (${locationName}, ${regionName})` 
      : regionName 
      ? ` (${regionName})` 
      : '';

    // Structured WhatsApp Payload
    const message = [
      `*NEW HEALTH CHECKUP BOOKING REQUEST*`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `📦 *Package:* ${selectedPackage?.title} (${selectedPackage?.totalTests} Tests)`,
      `💰 *Special Package Price:* ₹${selectedPackage?.offerPrice} (MRP: ₹${selectedPackage?.mrp})`,
      locContext ? `📍 *Area:* ${locContext}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Patient Name:* ${formData.name}`,
      `📞 *Phone Number:* ${formData.phone}`,
      formData.email ? `📧 *Email:* ${formData.email}` : null,
      formData.date ? `🗓️ *Preferred Date:* ${formData.date}` : `🗓️ *Preferred Date:* Earliest available`,
      `🏠 *Sample Collection:* ${formData.homeVisit ? '24/7 Home Sample Pickup' : 'Visit Center'}`,
      formData.address ? `📍 *Address:* ${formData.address}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `Sent via Henotic Diagnostics Portal`
    ].filter(Boolean).join('\n');

    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/918879327184?text=${encodedMessage}`;
    setWhatsAppUrl(waLink);
    setBookingSuccess(true);

    try {
      window.open(waLink, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Could not auto-open WhatsApp link:', err);
    }
  };

  const handleClose = () => {
    onClose();
    setBookingSuccess(false);
    setFormData({ name: '', phone: '', email: '', date: '', address: '', homeVisit: true });
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full mb-2">
            <Calendar className="w-3 h-3" />
            <span>Instant Slot Confirmation</span>
          </div>
          <h3 className="text-xl font-black">Book Health Checkup</h3>
          <p className="text-xs text-gray-300 mt-1">
            Selected: <span className="font-bold text-white uppercase">{selectedPackage?.title}</span> (₹{selectedPackage?.offerPrice})
          </p>
        </div>

        {/* Form */}
        {bookingSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-black text-gray-900">Appointment Request Prepared!</h4>
            <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
              Your appointment request has been structured for WhatsApp helpline <span className="font-bold text-gray-900">08879327184</span>.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={whatsAppUrl || 'https://wa.me/918879327184'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all"
              >
                <span>💬 Open & Send on WhatsApp (8879327184)</span>
              </a>

              <button
                type="button"
                onClick={handleClose}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition"
              >
                Close Window
              </button>
            </div>

            <div className="pt-2 text-xs font-semibold text-purple-700">
              Priority Helpline: <a href="tel:8879327184" className="underline font-bold">8879327184</a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Select / Switch Package
              </label>
              <select
                value={selectedPackage?.id}
                onChange={(e) => {
                  const found = HEALTH_PACKAGES.find(p => p.id === e.target.value);
                  if (found) onSelectPackage(found);
                }}
                className="w-full text-xs font-semibold rounded-xl border border-gray-300 px-3 py-2.5 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                {HEALTH_PACKAGES.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.title} ({pkg.totalTests} Tests) – Special: ₹{pkg.offerPrice} (MRP: ₹{pkg.mrp})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full text-xs rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="For digital reports"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Sample Collection Address
              </label>
              <textarea
                rows={2}
                placeholder="Enter full address for 24/7 home collection..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full text-xs rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
              />
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-50 text-xs font-semibold text-purple-900 border border-purple-100">
              <input
                type="checkbox"
                id="homeVisit"
                checked={formData.homeVisit}
                onChange={(e) => setFormData({ ...formData, homeVisit: e.target.checked })}
                className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="homeVisit" className="cursor-pointer">
                Confirm Free 24/7 Home Sample Pickup
              </label>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-all"
              >
                <span>Book & Send to WhatsApp (₹{selectedPackage?.offerPrice})</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
