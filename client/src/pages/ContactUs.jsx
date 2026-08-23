import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container py-10 space-y-8 max-w-4xl">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Contact & Student Support</h1>
        <p className="text-xs text-slate-500">Have questions about courses or technical support? Reach out to us.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-2">
          <Phone className="w-6 h-6 text-blue-600 mx-auto" />
          <h3 className="font-bold text-slate-800 text-sm">Call Helpline</h3>
          <p className="text-xs text-slate-500">+91 98765-43210</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-2">
          <Mail className="w-6 h-6 text-emerald-600 mx-auto" />
          <h3 className="font-bold text-slate-800 text-sm">Email Support</h3>
          <p className="text-xs text-slate-500">support@ajaytips.com</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-2">
          <MapPin className="w-6 h-6 text-purple-600 mx-auto" />
          <h3 className="font-bold text-slate-800 text-sm">Headquarters</h3>
          <p className="text-xs text-slate-500">Hyderabad, Telangana, India</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-lg">Send Us a Direct Message</h3>

        {submitted ? (
          <div className="p-4 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Thank you! Your message has been received. Our support team will get back within 24 hours.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Your Name</label>
                <input type="text" required placeholder="Enter name" className="w-full border border-slate-200 p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone / Email</label>
                <input type="text" required placeholder="Phone or email" className="w-full border border-slate-200 p-2.5 rounded-xl" />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Message / Inquiry</label>
              <textarea rows={4} required placeholder="How can we help you?" className="w-full border border-slate-200 p-2.5 rounded-xl"></textarea>
            </div>

            <button type="submit" className="btn btn-primary text-xs py-3 px-8 shadow-md">
              Send Message <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
