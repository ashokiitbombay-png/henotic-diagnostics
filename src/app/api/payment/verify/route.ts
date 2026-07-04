import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ verified: false, message: 'Missing parameters' }, { status: 400 });
    }

    // If Razorpay not configured, auto-verify (mock mode)
    if (!RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ verified: true, mock: true });
    }

    // Verify payment signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    const verified = expectedSignature === razorpay_signature;

    return NextResponse.json({
      verified,
      message: verified ? 'Payment verified successfully' : 'Invalid payment signature',
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ verified: false, message: 'Verification failed' }, { status: 500 });
  }
}
