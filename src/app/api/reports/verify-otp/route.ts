import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIP } from '@/lib/rate-limit';

/**
 * OTP Verification for Patient Report Access
 * 
 * Security Controls:
 * - Rate limited: 5 attempts per phone per 15 minutes
 * - Rate limited: 20 attempts per IP per 15 minutes
 * - Phone format validation (10-digit Indian mobile)
 * - Safe fallback to instant WhatsApp support for live patients
 */

const PHONE_REGEX = /^[6-9]\d{9}$/;

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { verified: false, message: 'Phone and OTP are required' },
        { status: 400 }
      );
    }

    // Validate phone format
    const cleanPhone = String(phone).replace(/[\s\-+]/g, '').replace(/^91/, '');
    if (!PHONE_REGEX.test(cleanPhone)) {
      return NextResponse.json(
        { verified: false, message: 'Invalid phone number format. Please enter a valid 10-digit mobile number.' },
        { status: 400 }
      );
    }

    // Validate OTP format (must be 4-6 digit numeric)
    const cleanOtp = String(otp).trim();
    if (!/^\d{4,6}$/.test(cleanOtp)) {
      return NextResponse.json(
        { verified: false, message: 'Invalid OTP format. Please enter the 4 to 6 digit code received.' },
        { status: 400 }
      );
    }

    // Rate limit per IP: 20 attempts per 15 minutes
    const ip = getClientIP(request);
    const ipLimiter = rateLimit(`otp-ip:${ip}`, 20, 15 * 60_000);
    if (!ipLimiter.success) {
      return NextResponse.json(
        { verified: false, message: 'Too many attempts. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((ipLimiter.resetTime - Date.now()) / 1000)) } }
      );
    }

    // Rate limit per phone: 5 attempts per 15 minutes
    const phoneLimiter = rateLimit(`otp-phone:${cleanPhone}`, 5, 15 * 60_000);
    if (!phoneLimiter.success) {
      return NextResponse.json(
        { verified: false, message: 'Too many OTP attempts for this phone number. Please try again in 15 minutes.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((phoneLimiter.resetTime - Date.now()) / 1000)) } }
      );
    }

    // ── Mode A: Development / Staging Mock OTP (123456 or 999999) ──
    const otpProvider = process.env.OTP_PROVIDER;
    if (process.env.NODE_ENV === 'development' || otpProvider === 'mock' || otpProvider === 'demo') {
      if (cleanOtp === '123456' || cleanOtp === '999999') {
        return NextResponse.json({
          verified: true,
          mock: true,
          message: 'OTP verified successfully.',
        });
      }
    }

    // ── Mode B: Twilio Verify Gateway (if configured) ──
    if (otpProvider === 'twilio' && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_VERIFY_SID) {
      try {
        const auth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');
        const twilioUrl = `https://verify.twilio.com/v2/Services/${process.env.TWILIO_VERIFY_SID}/VerificationCheck`;
        const res = await fetch(twilioUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            To: `+91${cleanPhone}`,
            Code: cleanOtp,
          }),
        });
        const twilioData = await res.json();
        if (twilioData.status === 'approved') {
          return NextResponse.json({ verified: true, message: 'OTP verified successfully' });
        } else {
          return NextResponse.json({ verified: false, message: 'Invalid or expired OTP code' }, { status: 400 });
        }
      } catch (twilioErr: any) {
        console.error('[OTP] Twilio verification error:', twilioErr.message);
      }
    }

    // ── Mode C: MSG91 OTP Gateway (if configured) ──
    if (otpProvider === 'msg91' && process.env.MSG91_AUTH_KEY) {
      try {
        const res = await fetch(`https://control.msg91.com/api/v5/otp/verify?otp=${cleanOtp}&mobile=91${cleanPhone}`, {
          method: 'GET',
          headers: { 'authkey': process.env.MSG91_AUTH_KEY },
        });
        const msg91Data = await res.json();
        if (msg91Data.type === 'success') {
          return NextResponse.json({ verified: true, message: 'OTP verified successfully' });
        } else {
          return NextResponse.json({ verified: false, message: msg91Data.message || 'Invalid OTP' }, { status: 400 });
        }
      } catch (msg91Err: any) {
        console.error('[OTP] MSG91 error:', msg91Err.message);
      }
    }

    // ── Mode D: Fallback Patient Message ──
    return NextResponse.json(
      {
        verified: false,
        message: 'Direct portal download is currently updating. Please contact our 24/7 desk at 088793 27184 or via WhatsApp for immediate PDF report delivery.',
      },
      { status: 503 }
    );
  } catch {
    return NextResponse.json(
      { verified: false, message: 'Verification service error. Please try again shortly.' },
      { status: 500 }
    );
  }
}
