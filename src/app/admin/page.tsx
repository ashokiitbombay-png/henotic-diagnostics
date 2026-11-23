'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ShieldCheck,
  Activity,
  Users,
  CreditCard,
  Mail,
  Bell,
  Download,
  RefreshCw,
  LogOut,
  Lock,
  Search,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

type AdminTab = 'health' | 'leads' | 'payments' | 'inquiries' | 'reminders';

interface DeepHealthData {
  status: 'ok' | 'degraded';
  uptime: number;
  timestamp: string;
  nodeVersion: string;
  memoryRssMb: number;
  dataDirWritable: boolean;
  failsafeCacheKeys: number;
  redisConfigured: boolean;
  mongoConfigured: boolean;
  razorpayConfigured: boolean;
  webhookSecretConfigured: boolean;
}

const SESSION_ADMIN_KEY = 'henotic_ops_admin_token';
const SESSION_REM_KEY = 'henotic_ops_reminders_token';

export default function AdminOperationsPage() {
  const [adminToken, setAdminToken] = useState('');
  const [remindersToken, setRemindersToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('health');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const [health, setHealth] = useState<DeepHealthData | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [reminders, setReminders] = useState<any[]>([]);

  useEffect(() => {
    try {
      const savedAdmin = sessionStorage.getItem(SESSION_ADMIN_KEY) || '';
      const savedRem = sessionStorage.getItem(SESSION_REM_KEY) || '';
      if (savedAdmin) {
        setAdminToken(savedAdmin);
        setRemindersToken(savedRem);
        setAuthenticated(true);
      }
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  const loadTabData = useCallback(
    async (tab: AdminTab, token: string, remToken: string) => {
      if (!token) return;
      setLoading(true);
      setError('');

      try {
        if (tab === 'health') {
          const res = await fetch('/api/health?deep=1', {
            headers: { 'x-admin-token': token },
            cache: 'no-store',
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || `Health check failed (${res.status})`);
          setHealth(data);
        } else if (tab === 'leads' || tab === 'payments' || tab === 'inquiries') {
          const res = await fetch(`/api/admin/leads?type=${tab}`, {
            headers: { 'x-admin-token': token },
            cache: 'no-store',
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || `Failed to load ${tab} (${res.status})`);
          if (tab === 'leads') setLeads(data.leads || []);
          if (tab === 'payments') setPayments(data.payments || []);
          if (tab === 'inquiries') setInquiries(data.inquiries || []);
        } else if (tab === 'reminders') {
          const remKey = remToken || token;
          const res = await fetch('/api/reminders', {
            headers: { 'x-api-key': remKey },
            cache: 'no-store',
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || `Failed to load reminders (${res.status})`);
          setReminders(data.reminders || []);
        }
      } catch (err: any) {
        setError(err?.message || 'Request failed');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (authenticated && adminToken) {
      loadTabData(activeTab, adminToken, remindersToken);
    }
  }, [authenticated, activeTab, adminToken, remindersToken, loadTabData]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedAdmin = adminToken.trim();
    const trimmedRem = remindersToken.trim();
    if (!trimmedAdmin) {
      setError('Please enter your operations token (ADMIN_EXPORT_TOKEN).');
      return;
    }
    try {
      sessionStorage.setItem(SESSION_ADMIN_KEY, trimmedAdmin);
      if (trimmedRem) sessionStorage.setItem(SESSION_REM_KEY, trimmedRem);
      else sessionStorage.removeItem(SESSION_REM_KEY);
    } catch {
      // ignore storage errors
    }
    setAdminToken(trimmedAdmin);
    setRemindersToken(trimmedRem);
    setAuthenticated(true);
    setError('');
  };

  const handleSignOut = () => {
    try {
      sessionStorage.removeItem(SESSION_ADMIN_KEY);
      sessionStorage.removeItem(SESSION_REM_KEY);
    } catch {
      // ignore
    }
    setAdminToken('');
    setRemindersToken('');
    setAuthenticated(false);
    setHealth(null);
    setLeads([]);
    setPayments([]);
    setInquiries([]);
    setReminders([]);
    setError('');
  };

  const handleCsvDownload = async (type: 'leads' | 'payments' | 'inquiries') => {
    try {
      const res = await fetch(`/api/admin/leads?type=${type}&format=csv`, {
        headers: { 'x-admin-token': adminToken },
      });
      if (!res.ok) throw new Error(`Export failed (${res.status})`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `henotic_${type}_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err?.message || 'CSV export failed');
    }
  };

  const activeRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list =
      activeTab === 'leads'
        ? leads
        : activeTab === 'payments'
          ? payments
          : activeTab === 'inquiries'
            ? inquiries
            : activeTab === 'reminders'
              ? reminders
              : [];
    if (!q) return list;
    return list.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
  }, [activeTab, leads, payments, inquiries, reminders, search]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans mt-[80px] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-extrabold uppercase tracking-wider mb-2">
              <ShieldCheck size={14} className="text-emerald-400" /> Internal Operations
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Henotic Operations Dashboard
            </h1>
          </div>

          {authenticated && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => loadTabData(activeTab, adminToken, remindersToken)}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition cursor-pointer"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs hover:bg-rose-100 transition cursor-pointer"
              >
                <LogOut size={14} />
                Clear Session
              </button>
            </div>
          )}
        </div>

        {!authenticated ? (
          <form
            onSubmit={handleSignIn}
            className="max-w-lg mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Lock size={20} />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Authenticate Session</h2>
                <p className="text-xs text-slate-500 font-medium">
                  Tokens are kept strictly in browser sessionStorage and sent via request headers only.
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Export Token (`ADMIN_EXPORT_TOKEN`)
              </label>
              <input
                type="password"
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                placeholder="Paste ADMIN_EXPORT_TOKEN"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-mono outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Reminders API Key (Optional `REMINDERS_API_KEY`)
              </label>
              <input
                type="password"
                value={remindersToken}
                onChange={(e) => setRemindersToken(e.target.value)}
                placeholder="Optional if inspecting /api/reminders"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-mono outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md transition cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
              {[
                { id: 'health' as const, label: 'System Health', icon: Activity },
                { id: 'leads' as const, label: 'Leads', icon: Users },
                { id: 'payments' as const, label: 'Payments', icon: CreditCard },
                { id: 'inquiries' as const, label: 'Inquiries', icon: Mail },
                { id: 'reminders' as const, label: 'Reminders', icon: Bell },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSearch('');
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                      active
                        ? 'bg-blue-600 text-white shadow'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={15} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-bold flex items-center gap-2">
                <AlertTriangle size={16} />
                {error}
              </div>
            )}

            {activeTab === 'health' && health && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Runtime Status', val: health.status.toUpperCase(), ok: health.status === 'ok' },
                  { label: 'Lead Data Dir Writable', val: health.dataDirWritable ? 'YES' : 'NO', ok: health.dataDirWritable },
                  { label: 'Failsafe WP Cache Keys', val: String(health.failsafeCacheKeys), ok: health.failsafeCacheKeys > 0 },
                  { label: 'RSS Memory / Node', val: `${health.memoryRssMb} MB (${health.nodeVersion})`, ok: true },
                  { label: 'MongoDB Configured', val: health.mongoConfigured ? 'ACTIVE' : 'UNSET', ok: health.mongoConfigured },
                  { label: 'Upstash Redis', val: health.redisConfigured ? 'ACTIVE' : 'FALLBACK', ok: health.redisConfigured },
                  { label: 'Razorpay Keys', val: health.razorpayConfigured ? 'CONFIGURED' : 'UNSET', ok: health.razorpayConfigured },
                  { label: 'Webhook Secret', val: health.webhookSecretConfigured ? 'CONFIGURED' : 'UNSET', ok: health.webhookSecretConfigured },
                ].map((card) => (
                  <div key={card.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">{card.label}</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className={card.ok ? 'text-emerald-500' : 'text-amber-500'} />
                      <span className="text-lg font-black text-slate-900">{card.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab !== 'health' && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="relative w-full sm:w-80">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={`Filter ${activeTab}...`}
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold outline-none focus:border-blue-500"
                    />
                  </div>

                  {(activeTab === 'leads' || activeTab === 'payments' || activeTab === 'inquiries') && (
                    <button
                      type="button"
                      onClick={() => handleCsvDownload(activeTab)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition cursor-pointer"
                    >
                      <Download size={14} />
                      Export CSV
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto">
                  {activeRows.length === 0 ? (
                    <p className="p-8 text-center text-sm text-slate-500 font-medium">
                      {loading ? 'Loading records...' : `No ${activeTab} records found.`}
                    </p>
                  ) : (
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 uppercase font-extrabold">
                        <tr>
                          {Object.keys(activeRows[0]).slice(0, 7).map((col) => (
                            <th key={col} className="px-4 py-3 whitespace-nowrap">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {activeRows.slice(0, 100).map((row, idx) => (
                          <tr key={row.id || idx} className="hover:bg-slate-50/70">
                            {Object.keys(activeRows[0]).slice(0, 7).map((col) => (
                              <td key={col} className="px-4 py-3 text-slate-700 font-medium whitespace-nowrap">
                                {String(row[col] ?? '-')}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
