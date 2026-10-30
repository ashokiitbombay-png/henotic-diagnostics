import { NextRequest, NextResponse } from 'next/server';
import { getStoredLeads } from '@/lib/leads/lead-service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization') || '';
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token') || authHeader.replace(/^Bearer\s+/i, '');
  const format = searchParams.get('format') || 'json';

  // Secure token access: uses PAYLOAD_SECRET or fallback admin token
  const expectedSecret = process.env.PAYLOAD_SECRET || 'henotic_admin_lead_export';
  if (!token || token !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized lead export access' }, { status: 401 });
  }

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
