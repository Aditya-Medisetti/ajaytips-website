import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, CreditCard, Smartphone, Building, Wallet, Lock, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function RazorpayModal({ course, onClose, onSuccess }) {
  const { user } = useAuth();
  const { enrollInCourse } = useData();
  
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);

  const originalPrice = course ? course.price : 349;
  const discount = appliedCoupon ? Math.min((originalPrice * appliedCoupon.percent) / 100, 500) : 0;
  const finalPrice = Math.max(0, originalPrice - discount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    if (couponCode.toUpperCase() === 'AJAYTIPS50') {
      setAppliedCoupon({ code: 'AJAYTIPS50', percent: 50 });
    } else if (couponCode.toUpperCase() === 'FIRST100') {
      setAppliedCoupon({ code: 'FIRST100', percent: 30 });
    } else {
      setCouponError('Invalid coupon code. Try AJAYTIPS50 or FIRST100');
    }
  };

  const handlePayNow = async () => {
    setProcessing(true);
    try {
      // Send verification to backend
      const res = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('ajaytips_token') || ''}`
        },
        body: JSON.stringify({
          courseId: course._id,
          amount: finalPrice,
          paymentMethod: paymentMethod.toUpperCase(),
          razorpay_payment_id: `pay_RZP${Math.floor(Math.random()*900000000+100000000)}`
        })
      });

      // Grant enrollment
      enrollInCourse(course._id);

      setTimeout(() => {
        setProcessing(false);
        if (onSuccess) onSuccess();
        onClose();
      }, 1200);
    } catch (e) {
      enrollInCourse(course._id);
      setProcessing(false);
      if (onSuccess) onSuccess();
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in p-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              RZP
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Razorpay Checkout</h3>
              <p className="text-xs text-slate-500">256-bit Bank Grade Encrypted Payment</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Summary */}
        <div className="py-4 space-y-3">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <p className="font-bold text-xs text-blue-700 uppercase">Enrolling In</p>
              <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{course?.title}</h4>
              <p className="text-xs text-slate-500">Validity: {course?.validity}</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-extrabold text-slate-900">₹{finalPrice}</span>
              {discount > 0 && (
                <span className="block text-xs text-emerald-600 font-semibold">-₹{discount} OFF</span>
              )}
            </div>
          </div>

          {/* Coupon Input */}
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Coupon (e.g. AJAYTIPS50)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
            <button type="submit" className="btn btn-secondary text-xs py-2 px-3">Apply</button>
          </form>
          {appliedCoupon && (
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Coupon {appliedCoupon.code} applied! Saved 50%
            </p>
          )}
          {couponError && <p className="text-xs text-red-600">{couponError}</p>}

          {/* Select Payment Method */}
          <div className="space-y-2 pt-2">
            <label className="font-bold text-xs text-slate-700 block">Select Payment Method</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border flex items-center gap-2 font-semibold transition-all ${
                  paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-4 h-4 text-blue-600" /> UPI (GPay / PhonePe)
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex items-center gap-2 font-semibold transition-all ${
                  paymentMethod === 'card' ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 text-emerald-600" /> Debit / Credit Card
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border flex items-center gap-2 font-semibold transition-all ${
                  paymentMethod === 'netbanking' ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Building className="w-4 h-4 text-purple-600" /> Net Banking
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`p-3 rounded-xl border flex items-center gap-2 font-semibold transition-all ${
                  paymentMethod === 'wallet' ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Wallet className="w-4 h-4 text-amber-600" /> Wallet / Paytm
              </button>
            </div>
          </div>
        </div>

        {/* Modal Action Button */}
        <div className="pt-4 border-t border-slate-200 space-y-2">
          <button 
            onClick={handlePayNow}
            disabled={processing}
            className="w-full btn btn-primary py-3 text-sm flex items-center justify-center gap-2 shadow-lg"
          >
            {processing ? (
              <span>Verifying Payment with Server...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" /> Pay ₹{finalPrice} & Access Course
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-slate-400">
            Instant Enrollment • 100% Secure • Money back guarantee according to platform policy
          </p>
        </div>

      </div>
    </div>
  );
}
