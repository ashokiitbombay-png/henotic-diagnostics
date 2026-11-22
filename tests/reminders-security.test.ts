import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET as getReminders } from '@/app/api/reminders/route';
import { POST as sendReminder } from '@/app/api/reminders/send/route';

describe('Reminders API Security Controls', () => {
  const originalKey = process.env.REMINDERS_API_KEY;

  beforeEach(() => {
    process.env.REMINDERS_API_KEY = 'test-reminders-secret-key';
  });

  afterEach(() => {
    if (originalKey === undefined) {
      delete process.env.REMINDERS_API_KEY;
    } else {
      process.env.REMINDERS_API_KEY = originalKey;
    }
  });

  it('GET /api/reminders returns 401 when x-api-key header is missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/reminders');
    const res = await getReminders(req);
    expect(res.status).toBe(401);
  });

  it('GET /api/reminders returns 401 when key is invalid', async () => {
    const req = new NextRequest('http://localhost:3000/api/reminders', {
      headers: { 'x-api-key': 'wrong-secret-key' },
    });
    const res = await getReminders(req);
    expect(res.status).toBe(401);
  });

  it('GET /api/reminders rejects ?apiKey= query parameter and returns 401', async () => {
    const req = new NextRequest('http://localhost:3000/api/reminders?apiKey=test-reminders-secret-key');
    const res = await getReminders(req);
    expect(res.status).toBe(401);
  });

  it('GET /api/reminders returns 200 when valid x-api-key header is provided', async () => {
    const req = new NextRequest('http://localhost:3000/api/reminders', {
      headers: { 'x-api-key': 'test-reminders-secret-key' },
    });
    const res = await getReminders(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(Array.isArray(json.reminders)).toBe(true);
  });

  it('POST /api/reminders/send returns 401 on invalid x-api-key', async () => {
    const req = new NextRequest('http://localhost:3000/api/reminders/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': 'wrong-secret-key',
      },
      body: JSON.stringify({ reminderId: 'rem-101', channel: 'sms' }),
    });
    const res = await sendReminder(req);
    expect(res.status).toBe(401);
  });
});
