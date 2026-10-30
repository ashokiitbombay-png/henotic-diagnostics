import { NextRequest, NextResponse } from 'next/server';
import { getStoredLeads, getStoredPayments, getStoredInquiries } from '@/lib/leads/lead-service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization') || '';
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token') || authHeader.replace(/^Bearer\s+/i, '');
  const format = searchParams.get('format') || 'json';
  const type = searchParams.get('type') || 'leads';

  // Secure token access: uses PAYLOAD_SECRET or development fallback
  const validSecrets = [
    process.env.PAYLOAD_SECRET,
    process.env.ADMIN_EXPORT_TOKEN,
    process.env.NODE_ENV === 'development' ? 'henotic_admin_lead_export' : null,
  ].filter(Boolean);

  if (!token || !validSecrets.includes(token)) {
    return NextResponse.json({ error: 'Unauthorized lead export access' }, { status: 401 });
  }

  // 1. Payments Export
  if (type === 'payments') {
    const payments = getStoredPayments(500);
    if (format === 'csv') {
      const headers = ['ID', 'Date', 'OrderID', 'PaymentID', 'Amount', 'Currency', 'Service', 'PatientName', 'PatientPhone', 'Status'];
      const rows = payments.map((p) => [
        p.id,
        p.createdAt,
        p.orderId,
        p.paymentId,
        p.amount,
        p.currency,
        `"${(p.serviceSlug || '').replace(/"/g, '""')}"`,
        `"${(p.patientName || '').replace(/"/g, '""')}"`,
        p.patientPhone || '',
        p.status,
      ]);
      const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="henotic_payments_${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }
    return NextResponse.json({ total: payments.length, payments });
  }

  // 2. Newsletter / Inquiries Export
  if (type === 'inquiries') {
    const inquiries = getStoredInquiries(500);
    if (format === 'csv') {
      const headers = ['ID', 'Date', 'Email', 'Source'];
      const rows = inquiries.map((i) => [
        i.id,
        i.createdAt,
        `"${(i.email || '').replace(/"/g, '""')}"`,
        i.source,
      ]);
      const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="henotic_inquiries_${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }
    return NextResponse.json({ total: inquiries.length, inquiries });
  }

  // 3. Leads Export (Default)
  const leads = getStoredLeads(500);

  if (format === 'csv') {
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Service', 'Location', 'Slot', 'Status', 'Channel', 'UTM Source', 'UTM Campaign'];
    const rows = leads.map((l) => [
      l.id,
      l.createdAt,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      l.phone,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${(l.location || '').replace(/"/g, '""')}"`,
      `"${l.date || ''} ${l.time || ''}"`,
      l.status,
      l.channel || '',
      l.utmSource || '',
      l.utmCampaign || '',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="henotic_leads_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  }

  return NextResponse.json({
    total: leads.length,
    leads,
  });
}
