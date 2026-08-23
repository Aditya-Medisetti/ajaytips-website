import React from 'react';

export default function TermsConditions() {
  return (
    <div className="container py-10 space-y-6 max-w-4xl bg-white p-8 rounded-3xl border border-slate-200 shadow-sm my-8 text-xs text-slate-700 leading-relaxed">
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 border-b border-slate-200 pb-3">
        Terms & Conditions
      </h1>
      <p className="text-slate-500">Last updated: August 22, 2026</p>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">1. Acceptance of Terms</h3>
        <p>
          By accessing or using the Ajaytips Competitive Exam Platform, you agree to comply with these terms. All course videos, test materials, and hand-written PDF notes are proprietary intellectual property.
        </p>

        <h3 className="font-bold text-slate-900 text-sm">2. Course Validity & Access</h3>
        <p>
          Enrolled courses provide access according to the specified validity period (e.g. 1 Year or Lifetime Validity). Sharing account credentials with multiple users is strictly prohibited.
        </p>

        <h3 className="font-bold text-slate-900 text-sm" id="refund">3. Refund & Cancellation Policy</h3>
        <p>
          Course fees and test series purchases are non-refundable once digital content has been accessed or test attempts have commenced, unless technical error prevents access.
        </p>
      </div>
    </div>
  );
}
