import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIP } from '@/lib/rate-limit';

/**
 * OTP Verification for Patient Report Access
 * 
 * Security Controls:
 * - Rate limited: 5 attempts per phone per 15 minutes
 * - Rate limited: 20 attempts per IP per 15 minutes
 * - Phone format validation (10-digit Indian mobile)
 * - No hardcoded OTP bypass
 * - Requires real OTP provider configuration for production use
 */

// Phone validation: 10-digit Indian mobile number
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
        { verified: false, message: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Validate OTP format (must be 4-6 digit numeric)
    const cleanOtp = String(otp).trim();
    if (!/^\d{4,6}$/.test(cleanOtp)) {
      return NextResponse.json(
        { verified: false, message: 'Invalid OTP format' },
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

    // ── OTP Verification ──────────────────────────────────────────────
    // In production, this should validate against a real SMS OTP service
    // (e.g., Twilio Verify, MSG91, or Firebase Auth).
    //
    // The OTP service should be configured via environment variables:
    //   OTP_PROVIDER=twilio|msg91|firebase
    //   OTP_SERVICE_SID=... (for Twilio)
    //   OTP_AUTH_TOKEN=... (for Twilio)
    //
    // Until configured, all OTP verification attempts are rejected.
    // ──────────────────────────────────────────────────────────────────

    const otpProvider = process.env.OTP_PROVIDER;

    if (!otpProvider) {
      console.warn('[OTP] No OTP_PROVIDER configured. All verifications will be rejected.');
      return NextResponse.json(
        {
          verified: false,
          message: 'Report access is not yet available. Please contact us directly for your reports.',
        },
        { status: 503 }
      );
    }

    // TODO: Implement real OTP verification based on provider
    // Example for Twilio Verify:
    // const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    // const verification = await twilio.verify.v2
    //   .services(process.env.TWILIO_VERIFY_SID)
    //   .verificationChecks.create({ to: `+91${cleanPhone}`, code: cleanOtp });
    // if (verification.status === 'approved') { ... }

    return NextResponse.json(
      {
        verified: false,
        message: 'OTP verification service is being configured. Please contact us directly for your reports.',
      },
      { status: 503 }
    );
  } catch {
    return NextResponse.json(
      { verified: false, message: 'Verification failed' },
      { status: 500 }
    );
  }
}
