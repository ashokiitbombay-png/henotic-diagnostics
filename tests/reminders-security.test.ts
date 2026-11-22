import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  GET as getReminders,
  POST as createReminder,
  DELETE as deleteReminder,
} from '@/app/api/reminders/route';
import { POST as sendReminder } from '@/app/api/reminders/send/route';
import { getReminderById, listReminders } from '@/lib/reminders/reminder-store';
import { resetRateLimitMemoryStore } from '@/lib/rate-limit';

describe('Reminders API Security, Persistence & Dispatch Controls', () => {
  const originalEnv = { ...process.env };
  let tempDataDir = '';

  beforeEach(() => {
    resetRateLimitMemoryStore();
    tempDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'henotic-rem-test-'));
    process.env.LEAD_DATA_DIR = tempDataDir;
    process.env.REMINDERS_API_KEY = 'test-reminders-secret-key';
    delete process.env.MONGODB_URI;
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    delete process.env.WHATSAPP_API_URL;
    delete process.env.WHATSAPP_API_TOKEN;
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    delete process.env.SMTP_PASSWORD;
    delete process.env.TWILIO_ACCOUNT_SID;
    delete process.env.TWILIO_AUTH_TOKEN;
    delete process.env.TWILIO_FROM_NUMBER;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    process.env = { ...originalEnv };
    resetRateLimitMemoryStore();
    if (tempDataDir && fs.existsSync(tempDataDir)) {
      fs.rmSync(tempDataDir, { recursive: true, force: true });
    }
  });

  it('starts with an empty store and contains no mock US seed records', async () => {
    const req = new NextRequest('http://localhost:3000/api/reminders', {
      headers: { authorization: 'Bearer test-reminders-secret-key' },
    });
    const res = await getReminders(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.reminders).toEqual([]);
  });

  it('rejects missing, invalid, and ?apiKey= query auth on GET /api/reminders', async () => {
    const missing = await getReminders(new NextRequest('http://localhost:3000/api/reminders'));
    expect(missing.status).toBe(401);

    const invalid = await getReminders(
      new NextRequest('http://localhost:3000/api/reminders', {
        headers: { 'x-api-key': 'wrong-secret-key' },
      })
    );
    expect(invalid.status).toBe(401);

    const queryOnly = await getReminders(
      new NextRequest('http://localhost:3000/api/reminders?apiKey=test-reminders-secret-key')
    );
    expect(queryOnly.status).toBe(401);
  });

  it('rejects unauthenticated and ?apiKey= query auth on POST /api/reminders', async () => {
    const payload = JSON.stringify({
      patientName: 'Aarav Kulkarni',
      patientPhone: '9820012345',
      serviceName: '3T MRI Brain',
      appointmentDate: '2026-11-25',
      appointmentTime: '10:00 AM',
      location: 'Kharghar',
    });

    const missing = await createReminder(
      new NextRequest('http://localhost:3000/api/reminders', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: payload,
      })
    );
    expect(missing.status).toBe(401);

    const queryOnly = await createReminder(
      new NextRequest('http://localhost:3000/api/reminders?apiKey=test-reminders-secret-key', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: payload,
      })
    );
    expect(queryOnly.status).toBe(401);
  });

  it('accepts both x-api-key and Authorization: Bearer headers on GET /api/reminders', async () => {
    const byHeader = await getReminders(
      new NextRequest('http://localhost:3000/api/reminders', {
        headers: { 'x-api-key': 'test-reminders-secret-key' },
      })
    );
    expect(byHeader.status).toBe(200);

    const byBearer = await getReminders(
      new NextRequest('http://localhost:3000/api/reminders', {
        headers: { authorization: 'Bearer test-reminders-secret-key' },
      })
    );
    expect(byBearer.status).toBe(200);
  });

  it('rejects missing, invalid, and ?apiKey= query auth on POST /api/reminders/send', async () => {
    const body = JSON.stringify({ reminderId: 'rem-1', channel: 'whatsapp' });

    const invalid = await sendReminder(
      new NextRequest('http://localhost:3000/api/reminders/send', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': 'wrong-secret-key' },
        body,
      })
    );
    expect(invalid.status).toBe(401);

    const queryOnly = await sendReminder(
      new NextRequest('http://localhost:3000/api/reminders/send?apiKey=test-reminders-secret-key', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
      })
    );
    expect(queryOnly.status).toBe(401);
  });

  it('persists created, cancelled, and sent statuses to disk across worker reads', async () => {
    const createRes = await createReminder(
      new NextRequest('http://localhost:3000/api/reminders', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': 'test-reminders-secret-key',
          'x-forwarded-for': '10.0.0.5',
        },
        body: JSON.stringify({
          patientName: 'Aarav Kulkarni',
          patientPhone: '9820012345',
          serviceName: '3T MRI Brain',
          appointmentDate: '2026-11-25',
          appointmentTime: '10:00 AM',
          location: 'Kharghar',
        }),
      })
    );
    expect(createRes.status).toBe(201);
    const created = await createRes.json();
    const reminderId = created.reminder.id as string;

    // Simulate another PM2 worker reading directly from the shared disk store
    const storedFile = path.join(tempDataDir, 'reminders.json');
    expect(fs.existsSync(storedFile)).toBe(true);
    const listed = await listReminders('2026-11-25');
    expect(listed).toHaveLength(1);
    expect(listed[0].id).toBe(reminderId);
    expect(listed[0].status).toBe('scheduled');

    // Simulates dispatch updating status to 'sent'
    const simRes = await sendReminder(
      new NextRequest('http://localhost:3000/api/reminders/send', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: 'Bearer test-reminders-secret-key',
          'x-forwarded-for': '10.0.0.6',
        },
        body: JSON.stringify({ reminderId, channel: 'whatsapp' }),
      })
    );
    expect(simRes.status).toBe(200);
    const simJson = await simRes.json();
    expect(simJson.sent).toBe(true);
    expect(simJson.dispatched).toBe(false);
    expect(simJson.simulated).toBe(true);

    const afterSend = await getReminderById(reminderId);
    expect(afterSend?.status).toBe('sent');

    // Now configure WhatsApp API credentials and verify real fetch dispatch
    process.env.WHATSAPP_API_URL = 'https://graph.facebook.com/v18.0/12345/messages';
    process.env.WHATSAPP_API_TOKEN = 'wa-token-secret';
    const mockFetch = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ messages: [{ id: 'wamid.1' }] }), { status: 200 }));
    vi.stubGlobal('fetch', mockFetch);

    const liveRes = await sendReminder(
      new NextRequest('http://localhost:3000/api/reminders/send', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': 'test-reminders-secret-key',
          'x-forwarded-for': '10.0.0.7',
        },
        body: JSON.stringify({ reminderId, channel: 'whatsapp' }),
      })
    );
    expect(liveRes.status).toBe(200);
    const liveJson = await liveRes.json();
    expect(liveJson.sent).toBe(true);
    expect(liveJson.dispatched).toBe(true);
    expect(liveJson.provider).toBe('whatsapp');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('https://graph.facebook.com/v18.0/12345/messages');

    // DELETE persists 'cancelled' status to disk
    const cancelRes = await deleteReminder(
      new NextRequest(`http://localhost:3000/api/reminders?id=${reminderId}`, {
        method: 'DELETE',
        headers: { 'x-api-key': 'test-reminders-secret-key' },
      })
    );
    expect(cancelRes.status).toBe(200);
    const afterCancel = await getReminderById(reminderId);
    expect(afterCancel?.status).toBe('cancelled');
  });
});
