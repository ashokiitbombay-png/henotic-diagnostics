import { NextRequest, NextResponse } from 'next/server';

// Mock reports data — replace with real database/API in production
const MOCK_REPORTS = [
  { id: 'RPT-2026-001', testName: 'Complete Blood Count (CBC)', date: '2026-06-28', status: 'Ready', labId: 'LAB-KHR-001' },
  { id: 'RPT-2026-002', testName: 'MRI Brain Plain', date: '2026-06-25', status: 'Ready', labId: 'LAB-KHR-002' },
  { id: 'RPT-2026-003', testName: 'Lipid Profile', date: '2026-07-01', status: 'Ready', labId: 'LAB-KHR-003' },
  { id: 'RPT-2026-004', testName: 'CT Scan Chest (HRCT)', date: '2026-07-03', status: 'Processing', labId: 'LAB-KHR-004' },
];

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json({ verified: false, message: 'Phone and OTP are required' }, { status: 400 });
    }

    // Mock OTP verification — in production, validate against SMS OTP service
    if (otp === '123456') {
      return NextResponse.json({
        verified: true,
        reports: MOCK_REPORTS,
        message: 'OTP verified successfully',
      });
    }

    return NextResponse.json({
      verified: false,
      message: 'Invalid OTP. Please try again.',
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json({ verified: false, message: 'Verification failed' }, { status: 500 });
  }
}
