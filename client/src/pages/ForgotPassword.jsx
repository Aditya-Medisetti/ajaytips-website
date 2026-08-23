import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, Mail, CheckCircle } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full space-y-6 animate-fade-in text-center">
        <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 mx-auto shadow-lg">
          <KeyRound className="w-7 h-7" />
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900">Forgot Password</h1>

        {submitted ? (
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 text-xs text-emerald-950">
            <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-sm">OTP Link Dispatched</h3>
            <p>Password reset instructions and 6-digit OTP sent to <strong>{email}</strong>.</p>
            <Link to="/login" className="btn btn-primary text-xs py-2 px-6 mt-2 inline-block">Return to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs text-left">
            <p className="text-xs text-slate-500 text-center">
              Enter your registered email address to receive password reset OTP.
            </p>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <button type="submit" className="w-full btn btn-primary py-3 text-sm font-bold shadow-lg">
              Send Password Reset OTP
            </button>
          </form>
        )}

        <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
          Remember password? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log In</Link>
        </div>
      </div>
    </div>
  );
}
