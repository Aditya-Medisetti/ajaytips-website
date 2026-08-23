import React from 'react';
import { Bell, Check, Radio, FileText, Award, CreditCard } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Notifications() {
  const { notifications, markNotificationsRead } = useData();

  const allNotifications = notifications.length > 0 ? notifications : [
    { id: 1, title: '🔴 Live Class Alert', message: 'Prof. S. R. Sharma is live now for Pure Mathematics Doubt Session.', type: 'live', time: '10 mins ago', read: false },
    { id: 2, title: '📝 New Test Series Uploaded', message: 'SSC CGL Tier-1 Grand Mock Test 01 is now live.', type: 'test', time: '2 hours ago', read: true },
    { id: 3, title: '🎉 Enrollment Confirmed', message: 'Your payment of ₹349 for Pure Maths Masterclass was verified successfully.', type: 'payment', time: '1 day ago', read: true }
  ];

  return (
    <div className="container py-8 space-y-6 max-w-3xl">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-600" /> Notifications Center
          </h1>
          <p className="text-xs text-slate-500">Live class alerts, new test series, and payment receipts</p>
        </div>

        <button onClick={markNotificationsRead} className="btn btn-outline text-xs py-1.5 px-3 flex items-center gap-1">
          <Check className="w-3.5 h-3.5" /> Mark All as Read
        </button>
      </div>

      <div className="space-y-3">
        {allNotifications.map((n) => (
          <div 
            key={n.id} 
            className={`p-4 rounded-2xl border transition-all flex items-start gap-3 text-xs ${
              !n.read ? 'bg-blue-50/80 border-blue-200' : 'bg-white border-slate-200'
            }`}
          >
            <div className="p-2 rounded-xl bg-white shadow-sm border border-slate-200 mt-0.5">
              {n.type === 'live' && <Radio className="w-4 h-4 text-red-500" />}
              {n.type === 'test' && <Award className="w-4 h-4 text-emerald-600" />}
              {n.type === 'payment' && <CreditCard className="w-4 h-4 text-purple-600" />}
              {(!n.type || n.type === 'system') && <Bell className="w-4 h-4 text-blue-600" />}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 text-sm">{n.title}</h4>
                <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
              </div>
              <p className="text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
