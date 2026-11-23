import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { timingSafeCompare } from '@/lib/webhook/security';
import { rateLimitDistributed, getClientIP } from '@/lib/rate-limit';
import { recordPayment } from '@/lib/leads/lead-service';

export async function POST(request: NextRequest) {
  try {
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || '';
    // Rate limit: 10 payment verifications per minute per IP
    const ip = getClientIP(request);
    const limiter = await rateLimitDistributed(`payment-verify:${ip}`, 10, 60_000);
    if (!limiter.success) {
      return NextResponse.json(
        { verified: false, message: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((limiter.resetTime - Date.now()) / 1000)) } }
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, patientName, patientPhone, serviceSlug } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ verified: false, message: 'Missing parameters' }, { status: 400 });
    }

    const isProd = process.env.NODE_ENV === 'production';

    // If Razorpay not configured, fail closed in production; allow mock in dev only
    if (!razorpayKeySecret) {
      if (isProd) {
        console.error('[payment/verify] RAZORPAY_KEY_SECRET is unset in production. Rejecting verification.');
        return NextResponse.json({ verified: false, message: 'Payment gateway configuration error' }, { status: 500 });
      }

      await recordPayment({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount: amount || 0,
        currency: 'INR',
        serviceSlug,
        patientName,
        patientPhone,
        status: 'mock_verified',
      }).catch(() => {});

      return NextResponse.json({ verified: true, mock: true });
    }

    // Verify payment signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', razorpayKeySecret)
      .update(body)
      .digest('hex');

    const verified = timingSafeCompare(expectedSignature, razorpay_signature);

    if (verified) {
      await recordPayment({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount: amount || 0,
        currency: 'INR',
        serviceSlug,
        patientName,
        patientPhone,
        status: 'verified',
      }).catch(err => console.warn('[payment/verify] Record payment error:', err.message));
    }

    return NextResponse.json({
      verified,
      message: verified ? 'Payment verified successfully' : 'Invalid payment signature',
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ verified: false, message: 'Verification failed' }, { status: 500 });
  }
}
