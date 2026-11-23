import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { GET as getHealth } from '@/app/api/health/route';
import { GET as getAdminLeads } from '@/app/api/admin/leads/route';
import { POST as subscribeNewsletter } from '@/app/api/newsletter/route';
import { POST as createPaymentOrder } from '@/app/api/payment/create-order/route';
import { POST as verifyPayment } from '@/app/api/payment/verify/route';
import { POST as verifyOtp } from '@/app/api/reports/verify-otp/route';
import { resetRateLimitMemoryStore } from '@/lib/rate-limit';
import {
  getStoredInquiries,
  getStoredPayments,
  recordLead,
} from '@/lib/leads/lead-service';
import {
  buildCategoryFAQs,
  buildCityFAQs,
  buildConditionFAQs,
  truncateMeta,
} from '@/lib/seo/aeo-helpers';
import { generateConditionSchema } from '@/lib/seo/medical-schema-generator';

describe('P2 API Integration Tests & AEO Helpers', () => {
  const originalEnv = { ...process.env };
  let tempDataDir = '';

  beforeEach(() => {
    resetRateLimitMemoryStore();
    tempDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'henotic-p2-test-'));
    process.env.LEAD_DATA_DIR = tempDataDir;
    delete process.env.MONGODB_URI;
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    delete process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    delete process.env.RAZORPAY_KEY_SECRET;
    delete process.env.ADMIN_EXPORT_TOKEN;
    delete process.env.REMINDERS_API_KEY;
    delete process.env.OTP_PROVIDER;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    process.env = { ...originalEnv };
    resetRateLimitMemoryStore();
    if (tempDataDir && fs.existsSync(tempDataDir)) {
      fs.rmSync(tempDataDir, { recursive: true, force: true });
    }
  });

  it('GET /api/health returns shallow ok publicly and protects ?deep=1 with auth headers', async () => {
    const shallowRes = await getHealth(new NextRequest('http://localhost:3000/api/health'));
    expect(shallowRes.status).toBe(200);
    const shallowJson = await shallowRes.json();
    expect(shallowJson.status).toBe('ok');
    expect(shallowJson.dataDirWritable).toBeUndefined();

    process.env.ADMIN_EXPORT_TOKEN = 'secret-ops-token';
    const unauthRes = await getHealth(new NextRequest('http://localhost:3000/api/health?deep=1'));
    expect(unauthRes.status).toBe(401);

    const deepRes = await getHealth(
      new NextRequest('http://localhost:3000/api/health?deep=1', {
        headers: { 'x-admin-token': 'secret-ops-token' },
      })
    );
    expect(deepRes.status).toBe(200);
    const deepJson = await deepRes.json();
    expect(deepJson.status).toBe('ok');
    expect(deepJson.dataDirWritable).toBe(true);
    expect(deepJson.failsafeCacheKeys).toBeGreaterThan(0);
  });

  it('GET /api/admin/leads enforces auth and exports JSON + CSV across leads, payments & inquiries', async () => {
    process.env.ADMIN_EXPORT_TOKEN = 'admin-export-secret';
    await recordLead({
      name: 'Rohan Joshi',
      phone: '9820099988',
      service: '3T MRI Brain',
      location: 'Kharghar',
      status: 'new',
    });

    const denied = await getAdminLeads(new NextRequest('http://localhost:3000/api/admin/leads'));
    expect(denied.status).toBe(401);

    const jsonRes = await getAdminLeads(
      new NextRequest('http://localhost:3000/api/admin/leads?type=leads', {
        headers: { 'x-admin-token': 'admin-export-secret' },
      })
    );
    expect(jsonRes.status).toBe(200);
    const json = await jsonRes.json();
    expect(json.total).toBe(1);
    expect(json.leads[0].phone).toBe('9820099988');

    const csvLeads = await getAdminLeads(
      new NextRequest('http://localhost:3000/api/admin/leads?type=leads&format=csv', {
        headers: { authorization: 'Bearer admin-export-secret' },
      })
    );
    expect(csvLeads.status).toBe(200);
    expect(csvLeads.headers.get('content-type')).toContain('text/csv');
    expect(await csvLeads.text()).toContain('9820099988');

    const csvPayments = await getAdminLeads(
      new NextRequest('http://localhost:3000/api/admin/leads?type=payments&format=csv', {
        headers: { 'x-admin-token': 'admin-export-secret' },
      })
    );
    expect(csvPayments.status).toBe(200);
    expect(await csvPayments.text()).toContain('PaymentID');

    const csvInq = await getAdminLeads(
      new NextRequest('http://localhost:3000/api/admin/leads?type=inquiries&format=csv', {
        headers: { 'x-admin-token': 'admin-export-secret' },
      })
    );
    expect(csvInq.status).toBe(200);
    expect(await csvInq.text()).toContain('Email');
  });

  it('POST /api/newsletter rejects malformed emails (400) and stores valid emails', async () => {
    const badRes = await subscribeNewsletter(
      new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.1.0.1' },
        body: JSON.stringify({ email: 'not-an-email' }),
      })
    );
    expect(badRes.status).toBe(400);

    const okRes = await subscribeNewsletter(
      new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.1.0.2' },
        body: JSON.stringify({ email: 'Patient@Example.com' }),
      })
    );
    expect(okRes.status).toBe(200);
    const stored = getStoredInquiries();
    expect(stored).toHaveLength(1);
    expect(stored[0].email).toBe('patient@example.com');
  });

  it('POST /api/payment/create-order rejects tampered prices and returns dev mock paise amount', async () => {
    vi.stubEnv('NODE_ENV', 'development');

    const badAmt = await createPaymentOrder(
      new NextRequest('http://localhost:3000/api/payment/create-order', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.2.0.1' },
        body: JSON.stringify({ amount: 10, serviceSlug: 'mri-scan' }),
      })
    );
    expect(badAmt.status).toBe(400);

    const tampered = await createPaymentOrder(
      new NextRequest('http://localhost:3000/api/payment/create-order', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.2.0.2' },
        body: JSON.stringify({ amount: 500, serviceSlug: 'mri-scan' }),
      })
    );
    expect(tampered.status).toBe(400);

    const mockOk = await createPaymentOrder(
      new NextRequest('http://localhost:3000/api/payment/create-order', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.2.0.3' },
        body: JSON.stringify({ amount: '4500', serviceSlug: 'mri-scan' }),
      })
    );
    expect(mockOk.status).toBe(200);
    const json = await mockOk.json();
    expect(json.mock).toBe(true);
    expect(json.amount).toBe(450000);
  });

  it('POST /api/payment/verify rejects missing params and persists HMAC-verified payments', async () => {
    const missing = await verifyPayment(
      new NextRequest('http://localhost:3000/api/payment/verify', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.3.0.1' },
        body: JSON.stringify({ razorpay_order_id: 'ord_1' }),
      })
    );
    expect(missing.status).toBe(400);

    process.env.RAZORPAY_KEY_SECRET = 'rzp-test-secret';
    const orderId = 'order_live_99';
    const paymentId = 'pay_live_99';
    const sig = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    const okRes = await verifyPayment(
      new NextRequest('http://localhost:3000/api/payment/verify', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.3.0.2' },
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: sig,
          amount: 4500,
          serviceSlug: 'mri-scan',
          patientName: 'Ananya Deshmukh',
          patientPhone: '9820012345',
        }),
      })
    );
    expect(okRes.status).toBe(200);
    const okJson = await okRes.json();
    expect(okJson.verified).toBe(true);

    const payments = getStoredPayments();
    expect(payments).toHaveLength(1);
    expect(payments[0].paymentId).toBe(paymentId);
    expect(payments[0].status).toBe('verified');
  });

  it('POST /api/reports/verify-otp validates inputs and returns 503 fallback in unconfigured production', async () => {
    const badPhone = await verifyOtp(
      new NextRequest('http://localhost:3000/api/reports/verify-otp', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.4.0.1' },
        body: JSON.stringify({ phone: '12345', otp: '123456' }),
      })
    );
    expect(badPhone.status).toBe(400);

    const badOtp = await verifyOtp(
      new NextRequest('http://localhost:3000/api/reports/verify-otp', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.4.0.2' },
        body: JSON.stringify({ phone: '9820012345', otp: 'abc' }),
      })
    );
    expect(badOtp.status).toBe(400);

    vi.stubEnv('NODE_ENV', 'production');
    const prodFallback = await verifyOtp(
      new NextRequest('http://localhost:3000/api/reports/verify-otp', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.4.0.3' },
        body: JSON.stringify({ phone: '9820012345', otp: '123456' }),
      })
    );
    expect(prodFallback.status).toBe(503);
  });

  it('AEO helpers truncate metadata on word boundaries and generate condition, city & category FAQs', () => {
    const trimmed = truncateMeta(
      'Dr. Rajesh Sharma — Chief Consultant Radiologist & Head of Diagnostic Imaging Services at Henotic Diagnostics Kharghar',
      60
    );
    expect(trimmed.length).toBeLessThanOrEqual(60);
    expect(trimmed.endsWith('...')).toBe(true);

    const condFaqs = buildConditionFAQs({
      title: 'Back Pain',
      bodySystem: 'Spine',
      symptoms: ['Lumbar ache', 'Sciatica', 'Stiffness'],
      recommendedServices: ['mri-spine', 'ct-spine'],
      urgencyLevel: 'moderate',
    });
    expect(condFaqs).toHaveLength(4);

    const cityFaqs = buildCityFAQs({ name: 'Mumbai', slug: 'mumbai' }, 399, 124);
    expect(cityFaqs).toHaveLength(4);

    const catFaqs = buildCategoryFAQs({
      id: 'pathology',
      title: 'Blood Tests & Pathology',
      services: ['cbc-test', 'lipid-profile', 'thyroid-test'],
    });
    expect(catFaqs).toHaveLength(3);

    const condSchemas = generateConditionSchema('back-pain');
    expect(condSchemas?.faqSchema?.['@type']).toBe('FAQPage');
    expect(condSchemas?.faqSchema?.mainEntity).toHaveLength(4);
    expect((condSchemas?.medicalWebPageSchema as any)?.speakable?.cssSelector).toEqual([
      'h1',
      '#quick-answer',
    ]);
  });
});
