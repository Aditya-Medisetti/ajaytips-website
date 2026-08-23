import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container py-10 space-y-6 max-w-4xl bg-white p-8 rounded-3xl border border-slate-200 shadow-sm my-8 text-xs text-slate-700 leading-relaxed">
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 border-b border-slate-200 pb-3">
        Privacy Policy
      </h1>
      <p className="text-slate-500">Last updated: August 22, 2026</p>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">1. Information We Collect</h3>
        <p>
          We collect personal information that you voluntarily provide to us when registering for an account, purchasing a course or test series, or contacting support. This includes name, email, phone number, and payment verification IDs.
        </p>

        <h3 className="font-bold text-slate-900 text-sm">2. Use of Data</h3>
        <p>
          Your information is used strictly to grant access to course lectures, CBT test engine, generate All India Performance Ranks, process secure payment checkouts, and deliver essential live class notifications.
        </p>

        <h3 className="font-bold text-slate-900 text-sm">3. Payment & Security</h3>
        <p>
          Payment transactions are processed securely through bank-grade payment gateways (Razorpay). We do not store credit card or UPI credentials on our servers.
        </p>
      </div>
    </div>
  );
}
