'use client';

import React, { useState } from 'react';
import { Shield, Loader2, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';
import { PAYMENT_CONFIG } from '@/config/payment';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayCheckoutProps {
  amount: number;
  serviceName: string;
  patientName: string;
  patientPhone: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
}

export default function RazorpayCheckout({
  amount,
  serviceName,
  patientName,
  patientPhone,
  onSuccess,
  onError,
}: RazorpayCheckoutProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    // If Razorpay key not configured, show pay-at-center message
    if (!PAYMENT_CONFIG.razorpayKeyId) {
      setStatus('success');
      setMessage('Online payment coming soon. Please pay at the center during your visit.');
      return;
    }

    setStatus('loading');

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error('Failed to load payment gateway');

      // Create order
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          serviceSlug: serviceName.toLowerCase().replace(/\s+/g, '-'),
          patientName,
          patientPhone,
        }),
      });

      const orderData = await orderRes.json();

      if (orderData.mock) {
        setStatus('success');
        setMessage('Payment gateway in test mode. Booking confirmed!');
        onSuccess?.(`mock_${Date.now()}`);
        return;
      }

      // Open Razorpay checkout
      const options = {
        key: PAYMENT_CONFIG.razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: PAYMENT_CONFIG.companyName,
        description: `${serviceName} — ${PAYMENT_CONFIG.description}`,
        order_id: orderData.orderId,
        image: PAYMENT_CONFIG.companyLogo,
        prefill: {
          name: patientName,
          contact: patientPhone,
        },
        theme: PAYMENT_CONFIG.theme,
        handler: async function (response: any) {
          // Verify payment
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.verified) {
            setStatus('success');
            setMessage('Payment successful! Your booking is confirmed.');
            onSuccess?.(response.razorpay_payment_id);
          } else {
            setStatus('error');
            setMessage('Payment verification failed. Please contact support.');
            onError?.('Verification failed');
          }
        },
        modal: {
          ondismiss: function () {
            setStatus('idle');
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        setStatus('error');
        setMessage(response.error.description || 'Payment failed');
        onError?.(response.error.description);
      });
      rzp.open();
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Something went wrong');
      onError?.(err.message);
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
        <CheckCircle className="text-emerald-600 shrink-0" size={20} />
        <p className="text-sm font-semibold text-emerald-800">{message}</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
          <AlertCircle className="text-red-600 shrink-0" size={20} />
          <p className="text-sm font-semibold text-red-800">{message}</p>
        </div>
        <button
          onClick={() => { setStatus('idle'); setMessage(''); }}
          className="text-sm font-bold text-blue-600 hover:text-blue-800"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handlePayment}
      disabled={status === 'loading'}
      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {status === 'loading' ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <>
          <CreditCard size={18} />
          Pay ₹{amount.toLocaleString('en-IN')}
          <Shield size={14} className="ml-1 opacity-70" />
        </>
      )}
    </button>
  );
}
