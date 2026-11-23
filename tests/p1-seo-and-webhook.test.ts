import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { POST as razorpayWebhook } from '@/app/api/payment/webhook/route';
import { POST as submitBooking } from '@/app/api/booking/route';
import { getStoredLeads, getStoredPayments } from '@/lib/leads/lead-service';
import { resetRateLimitMemoryStore } from '@/lib/rate-limit';
import {
  extractWpMetadata,
  generateServiceSchemas,
  HENOTIC_MEDICAL_ORGANIZATION,
} from '@/lib/seo/medical-schema-generator';
import { isHomeCollectionService } from '@/lib/seo/location-faqs';

describe('P1 Payment Webhook, Booking Hardening & Schema/FAQ Integrity', () => {
  const originalEnv = { ...process.env };
  let tempDataDir = '';

  beforeEach(() => {
    resetRateLimitMemoryStore();
    tempDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'henotic-p1-test-'));
    process.env.LEAD_DATA_DIR = tempDataDir;
    delete process.env.MONGODB_URI;
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    delete process.env.RAZORPAY_WEBHOOK_SECRET;
    delete process.env.WHATSAPP_API_URL;
    delete process.env.WHATSAPP_API_TOKEN;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    resetRateLimitMemoryStore();
    if (tempDataDir && fs.existsSync(tempDataDir)) {
      fs.rmSync(tempDataDir, { recursive: true, force: true });
    }
  });

  it('Razorpay webhook rejects unconfigured secret (503) and invalid signature (401)', async () => {
    const body = JSON.stringify({ event: 'payment.captured', payload: {} });

    const unconfigured = await razorpayWebhook(
      new NextRequest('http://localhost:3000/api/payment/webhook', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-razorpay-signature': 'abc' },
        body,
      })
    );
    expect(unconfigured.status).toBe(503);

    process.env.RAZORPAY_WEBHOOK_SECRET = 'rzp-webhook-secret-123';
    const badSig = await razorpayWebhook(
      new NextRequest('http://localhost:3000/api/payment/webhook', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-razorpay-signature': 'deadbeef00000000000000000000000000000000000000000000000000000000',
        },
        body,
      })
    );
    expect(badSig.status).toBe(401);
  });

  it('Razorpay webhook records verified payment in INR and deduplicates retries', async () => {
    process.env.RAZORPAY_WEBHOOK_SECRET = 'rzp-webhook-secret-123';
    const rawBody = JSON.stringify({
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: 'pay_test_1',
            order_id: 'order_test_1',
            amount: 350000,
            currency: 'INR',
            notes: {
              service: 'ct-brain',
              patient_name: 'Riya Sharma',
              patient_phone: '9820012345',
            },
          },
        },
      },
    });
    const signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');

    const res = await razorpayWebhook(
      new NextRequest('http://localhost:3000/api/payment/webhook', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-razorpay-signature': signature,
          'x-forwarded-for': '10.0.1.1',
        },
        body: rawBody,
      })
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.received).toBe(true);
    expect(json.recorded).toBe(true);

    const payments = getStoredPayments();
    expect(payments).toHaveLength(1);
    expect(payments[0].amount).toBe(3500);
    expect(payments[0].paymentId).toBe('pay_test_1');
    expect(payments[0].status).toBe('verified');

    // Replay same webhook delivery -> idempotent deduplication
    const replay = await razorpayWebhook(
      new NextRequest('http://localhost:3000/api/payment/webhook', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-razorpay-signature': signature,
          'x-forwarded-for': '10.0.1.2',
        },
        body: rawBody,
      })
    );
    expect(replay.status).toBe(200);
    const replayJson = await replay.json();
    expect(replayJson.duplicate).toBe(true);
    expect(getStoredPayments()).toHaveLength(1);
  });

  it('Booking API rejects invalid phone (400) and normalizes valid Indian mobile into isolated lead storage', async () => {
    const invalidRes = await submitBooking(
      new NextRequest('http://localhost:3000/api/booking', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.0.2.1' },
        body: JSON.stringify({
          name: 'Test Patient',
          phone: '12345',
          service: 'MRI Scan',
          location: 'Kharghar',
        }),
      })
    );
    expect(invalidRes.status).toBe(400);

    const validRes = await submitBooking(
      new NextRequest('http://localhost:3000/api/booking', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.0.2.2' },
        body: JSON.stringify({
          name: 'Riya Sharma',
          phone: '+91 98200 12345',
          service: 'CT Brain',
          location: 'Kharghar',
        }),
      })
    );
    expect(validRes.status).toBe(200);

    const leads = getStoredLeads();
    expect(leads).toHaveLength(1);
    expect(leads[0].phone).toBe('9820012345');
    expect(leads[0].service).toBe('CT Brain');
  });

  it('extractWpMetadata strips stray head tags, scripts, styles, comments, and decodes entities', () => {
    const meta = extractWpMetadata(
      '<title>Stray WP Title</title><!-- WP Comment --><script>alert(1)</script><style>.a{color:red}</style><p>Safe &amp; accurate diagnostic test summary at Henotic&nbsp;Diagnostics.</p>'
    );
    expect(meta.cleanSummary).toBe('Safe & accurate diagnostic test summary at Henotic Diagnostics.');
  });

  it('aligns clinic hours to 24/7 DiagnosticLab, attaches reviewedBy Physician, uses @id refs, and syncs localized L3 FAQs', () => {
    expect(HENOTIC_MEDICAL_ORGANIZATION['@type']).toBe('DiagnosticLab');
    expect(HENOTIC_MEDICAL_ORGANIZATION.openingHoursSpecification[0].opens).toBe('00:00');
    expect(HENOTIC_MEDICAL_ORGANIZATION.openingHoursSpecification[0].closes).toBe('23:59');

    const schemas = generateServiceSchemas({
      serviceSlug: 'mri-scan',
      serviceName: 'MRI Scan',
      regionSlug: 'navi-mumbai',
      locationSlug: 'kharghar',
    });

    expect((schemas.medicalWebPageSchema as any).reviewedBy['@type']).toBe('Physician');
    expect((schemas.diagnosticProcedureSchema as any).provider).toEqual({
      '@id': 'https://www.henoticdiagnostics.com/#clinic',
    });
    expect((schemas.medicalWebPageSchema as any).publisher).toEqual({
      '@id': 'https://www.henoticdiagnostics.com/#organization',
    });

    const faqQuestions: string[] = (schemas.faqSchema as any).mainEntity.map((q: any) => q.name);
    expect(faqQuestions).toHaveLength(6);
    expect(faqQuestions.some((q) => q.includes('MRI Scan') && q.includes('Kharghar'))).toBe(true);
  });

  it('isHomeCollectionService classifies pathology/genetics/checkups accurately and excludes imaging scans', () => {
    expect(isHomeCollectionService('hba1c-test')).toBe(true);
    expect(isHomeCollectionService('nipt-test')).toBe(true);
    expect(isHomeCollectionService('full-body-check-up')).toBe(true);
    expect(isHomeCollectionService('thyroid-profile')).toBe(true);
    expect(isHomeCollectionService('mri-scan')).toBe(false);
    expect(isHomeCollectionService('ct-scan')).toBe(false);
  });
});
