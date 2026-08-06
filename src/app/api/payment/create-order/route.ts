import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { rateLimit, getClientIP } from '@/lib/rate-limit';


const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 order creations per minute per IP
    const ip = getClientIP(request);
    const limiter = rateLimit(`payment-create:${ip}`, 10, 60_000);
    if (!limiter.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((limiter.resetTime - Date.now()) / 1000)) } }
      );
    }

    const { amount, serviceSlug, patientName, patientPhone } = await request.json();

    if (!amount || amount < 100) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // If Razorpay is not configured, return mock order
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return NextResponse.json({
        orderId: `mock_order_${Date.now()}`,
        amount: amount * 100, // paise
        currency: 'INR',
        mock: true,
        message: 'Razorpay not configured. Using mock order.',
      });
    }

    // Create Razorpay order via API
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        receipt: `hd_${serviceSlug}_${Date.now()}`,
        notes: {
          service: serviceSlug,
          patient_name: patientName,
          patient_phone: patientPhone,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Razorpay order creation failed:', errorData);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    const order = await response.json();

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Payment order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
