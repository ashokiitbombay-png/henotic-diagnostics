'use client';

import { useState, useCallback } from 'react';
import { Mail, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const STORAGE_KEY = 'henotic-newsletter-subscribers';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface NewsletterSignupProps {
  variant?: 'compact' | 'full';
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function NewsletterSignup({ variant = 'full' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorMsg('');

      const trimmed = email.trim();
      if (!trimmed) {
        setStatus('error');
        setErrorMsg('Please enter your email address.');
        return;
      }
      if (!isValidEmail(trimmed)) {
        setStatus('error');
        setErrorMsg('Please enter a valid email address.');
        return;
      }

      setStatus('loading');

      // Simulate brief network delay for UX
      await new Promise((r) => setTimeout(r, 800));

      try {
        const existing: string[] = JSON.parse(
          localStorage.getItem(STORAGE_KEY) || '[]'
        );

        if (existing.includes(trimmed)) {
          setStatus('error');
          setErrorMsg('This email is already subscribed!');
          return;
        }

        existing.push(trimmed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
        setStatus('success');
        setEmail('');
      } catch {
        setStatus('error');
        setErrorMsg('Something went wrong. Please try again.');
      }
    },
    [email]
  );

  /* ─── Compact variant (footer) ─── */
  if (variant === 'compact') {
    return (
      <div className="w-full">
        {status === 'success' ? (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 px-4 py-3 text-sm font-semibold text-emerald-200 backdrop-blur-md">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>You&apos;re subscribed! Health tips coming to your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Your email address"
                  aria-label="Email for newsletter"
                  className="w-full rounded-xl bg-white/10 border border-white/20 pl-9 pr-4 py-2.5 text-sm font-medium text-white placeholder-white/40 outline-none backdrop-blur-md transition-all focus:border-white/40 focus:bg-white/15 focus:ring-2 focus:ring-white/10"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="shrink-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:from-blue-400 hover:to-purple-500 hover:shadow-blue-500/25 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {status === 'loading' ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
            {status === 'error' && errorMsg && (
              <p className="flex items-center gap-1.5 text-xs font-semibold text-red-300">
                <AlertCircle size={12} className="shrink-0" />
                {errorMsg}
              </p>
            )}
          </form>
        )}
      </div>
    );
  }

  /* ─── Full variant (sidebar / standalone) ─── */
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
      {/* Decorative gradient orb */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-600/20 blur-2xl" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
            <Mail size={20} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white tracking-tight">
              Stay Updated
            </h3>
            <p className="text-xs font-medium text-white/60">
              Get expert health tips &amp; diagnostic insights
            </p>
          </div>
        </div>

        {status === 'success' ? (
          <div className="flex items-start gap-3 rounded-xl bg-emerald-500/15 border border-emerald-400/25 p-4 backdrop-blur-md">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-emerald-400"
            />
            <div>
              <p className="text-sm font-bold text-emerald-200">
                You&apos;re subscribed!
              </p>
              <p className="mt-0.5 text-xs font-medium text-emerald-300/80">
                Health tips coming to your inbox.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address"
                aria-label="Email for newsletter"
                className="w-full rounded-xl bg-white/10 border border-white/15 pl-10 pr-4 py-3 text-sm font-medium text-white placeholder-white/35 outline-none backdrop-blur-md transition-all focus:border-blue-400/50 focus:bg-white/15 focus:ring-2 focus:ring-blue-400/20"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-400 hover:to-purple-500 hover:shadow-blue-500/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Subscribing…
                </>
              ) : (
                <>
                  <Mail size={16} />
                  Subscribe Now
                </>
              )}
            </button>

            {status === 'error' && errorMsg && (
              <p className="flex items-center gap-1.5 text-xs font-semibold text-red-400">
                <AlertCircle size={12} className="shrink-0" />
                {errorMsg}
              </p>
            )}

            <p className="text-[10px] font-medium text-white/40 text-center">
              No spam, ever. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
