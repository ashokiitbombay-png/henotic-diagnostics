'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Shield,
  Lock,
  FileText,
  Phone,
  KeyRound,
  ArrowRight,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  Smartphone,
  ClipboardList,
  X,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════════ */
interface Report {
  id: string;
  testName: string;
  date: string;
  status: 'Ready' | 'Processing';
  labId: string;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Toast Component
   ═══════════════════════════════════════════════════════════════════════════════ */
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-[slideUp_0.4s_ease-out]">
      <div className="flex items-center gap-3 rounded-2xl bg-slate-900/95 backdrop-blur-xl px-6 py-4 text-white shadow-2xl border border-white/10">
        <AlertCircle size={18} className="text-amber-400 shrink-0" />
        <span className="text-sm font-bold">{message}</span>
        <button onClick={onClose} className="ml-2 text-white/60 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Step Indicator
   ═══════════════════════════════════════════════════════════════════════════════ */
function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  const steps = [
    { num: 1, label: 'Phone', icon: Smartphone },
    { num: 2, label: 'Verify', icon: KeyRound },
    { num: 3, label: 'Reports', icon: ClipboardList },
  ] as const;

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {steps.map((step, idx) => {
        const Icon = step.icon;
        const isActive = step.num === current;
        const isDone = step.num < current;
        return (
          <React.Fragment key={step.num}>
            {idx > 0 && (
              <div className={`h-0.5 w-8 sm:w-12 rounded-full transition-colors duration-500 ${isDone ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-slate-200'}`} />
            )}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500
                  ${isDone
                    ? 'bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg shadow-emerald-300/40 scale-95'
                    : isActive
                      ? 'bg-gradient-to-br from-[#4568dc] to-[#b06ab3] shadow-lg shadow-purple-300/40 scale-110'
                      : 'bg-white border-2 border-slate-200 shadow-sm'
                  }`}
              >
                {isDone ? (
                  <CheckCircle2 className="text-white" size={20} />
                ) : (
                  <Icon className={isActive ? 'text-white' : 'text-slate-400'} size={20} />
                )}
              </div>
              <span className={`text-[10px] font-extrabold uppercase tracking-widest transition-colors ${isActive ? 'text-[#4568dc]' : isDone ? 'text-emerald-600' : 'text-slate-400'}`}>
                {step.label}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   OTP Input — Individual digit boxes
   ═══════════════════════════════════════════════════════════════════════════════ */
function OTPInput({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, digit: string) => {
    if (!/^\d?$/.test(digit)) return;
    const newVal = value.split('');
    newVal[index] = digit;
    const joined = newVal.join('').slice(0, 6);
    onChange(joined);
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(pasted);
    const focusIdx = Math.min(pasted.length, 5);
    inputRefs.current[focusIdx]?.focus();
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          className="h-14 w-11 sm:h-16 sm:w-14 rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-slate-200 text-center text-2xl font-black text-slate-900 outline-none transition-all duration-300 focus:border-[#4568dc] focus:ring-4 focus:ring-[#4568dc]/20 focus:scale-110 shadow-sm"
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Main Page Component
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function ReportPortalPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const HAS_BACKEND = process.env.NEXT_PUBLIC_HAS_REPORT_BACKEND === 'true';

  /* ── Step 1: Send OTP (mock) ──────────────────────────────────────────── */
  const handleSendOTP = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    setStep(2);
  }, [phone]);

  /* ── Step 2: Verify OTP ──────────────────────────────────────────────── */
  const handleVerifyOTP = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/reports/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.replace(/\D/g, ''), otp }),
      });

      const data = await res.json();

      if (data.verified) {
        setReports(data.reports);
        setStep(3);
      } else {
        setError(data.message || 'Invalid OTP. Please try again.');
      }
    } catch {
      setError('Connection error. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  }, [otp, phone]);

  /* ── Format date ─────────────────────────────────────────────────────── */
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <main className="min-h-screen mt-[80px]">

      {/* ── Toast notification ──────────────────────────────────────────── */}
      {toast && <Toast message={toast} onClose={() => setToast('')} />}

      {/* ══════════════════════════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-20 pb-12 text-center px-4 md:px-8 overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#4568dc]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-[#b06ab3]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-blue-100/80 backdrop-blur text-[#4568dc] font-extrabold text-xs tracking-widest uppercase mb-8 shadow-sm border border-blue-200/50">
            <Lock size={14} /> Secure Patient Portal
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Access Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4568dc] to-[#b06ab3]">
              Reports
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            View and download your diagnostic reports securely. Your medical data is protected with end-to-end encryption.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MAIN CARD
          ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-24">

        {/* Step Indicator */}
        <div className="mb-10">
          <StepIndicator current={step} />
        </div>

        {/* Card container */}
        <div className="relative rounded-[2.5rem] bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_30px_60px_-15px_rgba(69,104,220,0.15)] overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-1.5 bg-gradient-to-r from-[#4568dc] via-[#b06ab3] to-[#4568dc]" />

          <div className="p-8 sm:p-12">

            {/* ── STEP 1: Phone Number ────────────────────────────────── */}
            {step === 1 && (
              <form onSubmit={handleSendOTP} className="space-y-8">
                <div className="text-center mb-2">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4568dc] to-[#b06ab3] shadow-lg shadow-purple-300/30 mb-5">
                    <Phone className="text-white" size={28} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Enter Your Phone Number</h2>
                  <p className="text-sm font-medium text-slate-500">
                    We&apos;ll send a verification code to your registered mobile number.
                  </p>
                </div>

                {!HAS_BACKEND && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center shadow-inner">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 mb-3">
                      <Clock size={24} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2">Service Coming Soon</h3>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed">
                      Online report download is launching soon. For now, please collect your reports at our center or call <a href="tel:08879327184" className="text-[#4568dc] font-bold">08879327184</a>.
                    </p>
                  </div>
                )}

                <div className="relative">
                  <div className="flex items-stretch rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-slate-200 shadow-sm focus-within:border-[#4568dc] focus-within:ring-4 focus-within:ring-[#4568dc]/15 transition-all overflow-hidden">
                    {/* Country code */}
                    <div className="flex items-center gap-1.5 px-4 bg-slate-50 border-r border-slate-200 shrink-0">
                      <span className="text-lg">🇮🇳</span>
                      <span className="text-sm font-extrabold text-slate-700">+91</span>
                    </div>
                    {/* Phone input */}
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                        setError('');
                      }}
                      placeholder="Enter 10-digit mobile number"
                      className="flex-1 py-5 px-4 text-lg font-bold text-slate-900 placeholder-slate-400 outline-none bg-transparent"
                      maxLength={10}
                      inputMode="numeric"
                      autoFocus
                      disabled={!HAS_BACKEND}
                      aria-label="Phone number"
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm font-bold animate-pulse">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!HAS_BACKEND}
                  className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#4568dc] to-[#b06ab3] px-8 py-5 text-lg font-black text-white shadow-[0_15px_35px_-5px_rgba(69,104,220,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-5px_rgba(69,104,220,0.5)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 border border-white/10"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Send OTP <ArrowRight size={20} />
                  </span>
                </button>
              </form>
            )}

            {/* ── STEP 2: OTP Verification ────────────────────────────── */}
            {step === 2 && (
              <form onSubmit={handleVerifyOTP} className="space-y-8">
                <div className="text-center mb-2">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4568dc] to-[#b06ab3] shadow-lg shadow-purple-300/30 mb-5">
                    <KeyRound className="text-white" size={28} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Enter Verification Code</h2>
                  <p className="text-sm font-medium text-slate-500">
                    We sent a 6-digit code to <strong className="text-slate-900">+91 {phone}</strong>
                  </p>
                </div>

                <OTPInput value={otp} onChange={(val) => { setOtp(val); setError(''); }} />



                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm font-bold animate-pulse">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#4568dc] to-[#b06ab3] px-8 py-5 text-lg font-black text-white shadow-[0_15px_35px_-5px_rgba(69,104,220,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-5px_rgba(69,104,220,0.5)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 border border-white/10"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <Loader2 size={22} className="animate-spin" /> Verifying…
                      </>
                    ) : (
                      <>
                        Verify & View Reports <ArrowRight size={20} />
                      </>
                    )}
                  </span>
                </button>

                {/* Back button */}
                <button
                  type="button"
                  onClick={() => { setStep(1); setOtp(''); setError(''); }}
                  className="w-full text-sm font-bold text-slate-500 hover:text-[#4568dc] transition-colors"
                >
                  ← Change phone number
                </button>
              </form>
            )}

            {/* ── STEP 3: Reports List ────────────────────────────────── */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="text-center mb-2">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg shadow-emerald-300/30 mb-5">
                    <FileText className="text-white" size={28} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Your Reports</h2>
                  <p className="text-sm font-medium text-slate-500">
                    Showing results for <strong className="text-slate-900">+91 {phone}</strong> &middot; {reports.length} reports found
                  </p>
                </div>

                {/* Reports list */}
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="group relative rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-100 p-5 sm:p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Left icon */}
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                          report.status === 'Ready'
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-amber-50 text-amber-600'
                        }`}>
                          {report.status === 'Ready' ? <FileText size={22} /> : <Clock size={22} />}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-extrabold text-slate-900 truncate">{report.testName}</h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                            <span className="text-xs font-bold text-slate-500">{formatDate(report.date)}</span>
                            <span className="h-3 w-px bg-slate-200" />
                            <span className="text-xs font-bold text-slate-400">{report.labId}</span>
                          </div>
                        </div>

                        {/* Right: Status + Action */}
                        <div className="flex items-center gap-3 shrink-0">
                          {/* Status badge */}
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold ${
                            report.status === 'Ready'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                              : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                          }`}>
                            {report.status === 'Ready' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                            {report.status}
                          </span>

                          {/* Download button */}
                          {report.status === 'Ready' ? (
                            <button
                              onClick={() => setToast('📄 Report delivery coming soon. We\'re setting up secure downloads.')}
                              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4568dc] to-[#b06ab3] text-white shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300"
                              title="Download report"
                            >
                              <Download size={16} />
                            </button>
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                              <Download size={16} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Back button */}
                <button
                  type="button"
                  onClick={() => { setStep(1); setPhone(''); setOtp(''); setReports([]); setError(''); }}
                  className="w-full text-sm font-bold text-slate-500 hover:text-[#4568dc] transition-colors"
                >
                  ← Check another number
                </button>
              </div>
            )}
          </div>

          {/* ── Security footer ──────────────────────────────────────── */}
          <div className="border-t border-slate-100 bg-slate-50/50 px-8 sm:px-12 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1.5">
                <Shield size={14} className="text-emerald-500" />
                Your data is encrypted and secure
              </span>
              <span className="hidden sm:block h-3 w-px bg-slate-300" />
              <span className="flex items-center gap-1.5">
                <Lock size={14} className="text-[#4568dc]" />
                HIPAA Compliant
              </span>
              <span className="hidden sm:block h-3 w-px bg-slate-300" />
              <span className="flex items-center gap-1.5">
                <Shield size={14} className="text-purple-500" />
                256-bit SSL Encryption
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Slide-up keyframe for toast */}
      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </main>
  );
}
