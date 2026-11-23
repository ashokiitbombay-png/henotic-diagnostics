import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { timingSafeCompare } from '@/lib/webhook/security';
import { rateLimitDistributed, getClientIP } from '@/lib/rate-limit';
import { getStoredPayments, recordPayment } from '@/lib/leads/lead-service';

const HANDLED_PAYMENT_EVENTS = new Set(['payment.captured', 'order.paid']);

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    const limiter = await rateLimitDistributed(`payment-webhook:${ip}`, 60, 60_000);
    if (!limiter.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((limiter.resetTime - Date.now()) / 1000)) } }
      );
    }

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
    if (!webhookSecret) {
      return NextResponse.json({ error: 'Payment webhook secret not configured' }, { status: 503 });
    }

    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature')?.trim();
    if (!signature) {
      return NextResponse.json({ error: 'Missing Razorpay signature header' }, { status: 401 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    if (!timingSafeCompare(expectedSignature, signature)) {
      return NextResponse.json({ error: 'Invalid Razorpay webhook signature' }, { status: 401 });
    }

    let eventPayload: any;
    try {
      eventPayload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON webhook payload' }, { status: 400 });
    }

    const event = typeof eventPayload?.event === 'string' ? eventPayload.event : '';
    if (!HANDLED_PAYMENT_EVENTS.has(event)) {
      return NextResponse.json({ received: true, ignored: true, event });
    }

    const paymentEntity = eventPayload?.payload?.payment?.entity;
    const orderEntity = eventPayload?.payload?.order?.entity;

    const orderId = String(paymentEntity?.order_id || orderEntity?.id || '').trim();
    const paymentId = String(paymentEntity?.id || '').trim();
    const amountPaise = Number(paymentEntity?.amount ?? orderEntity?.amount ?? 0);
    const amountInr = Number.isFinite(amountPaise) ? Math.round(amountPaise / 100) : 0;
    const currency = String(paymentEntity?.currency || orderEntity?.currency || 'INR').trim() || 'INR';
    const notes = (paymentEntity?.notes || orderEntity?.notes || {}) as Record<string, unknown>;

    if (!paymentId || !orderId) {
      return NextResponse.json({ error: 'Webhook missing payment or order identifier' }, { status: 400 });
    }

    // Idempotent deduplication so Razorpay webhook retries never record duplicate payments
    const existingPayments = getStoredPayments(500);
    const alreadyRecorded = existingPayments.some(
      (p) =>
        p.paymentId === paymentId ||
        (orderId && p.orderId === orderId && p.status === 'verified')
    );

    if (alreadyRecorded) {
      return NextResponse.json({ received: true, duplicate: true, paymentId });
    }

    await recordPayment({
      orderId,
      paymentId,
      amount: amountInr,
      currency,
      serviceSlug: typeof notes.service === 'string' ? notes.service : undefined,
      patientName: typeof notes.patient_name === 'string' ? notes.patient_name : undefined,
      patientPhone: typeof notes.patient_phone === 'string' ? notes.patient_phone : undefined,
      status: 'verified',
    });

    return NextResponse.json({ received: true, recorded: true, paymentId });
  } catch (error: any) {
    console.error('[payment/webhook] Unhandled error:', error?.message || error);
    return NextResponse.json({ error: 'Failed to process Razorpay webhook' }, { status: 500 });
  }
}
