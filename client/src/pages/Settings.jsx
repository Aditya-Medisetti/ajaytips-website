import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Lock, Shield, Moon, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [liveReminders, setLiveReminders] = useState(true);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="container py-8 space-y-6 max-w-3xl">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-blue-600" /> Account & App Settings
          </h1>
          <p className="text-xs text-slate-500">Configure notification preferences, security, and learning mode</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Notification Preferences */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2 uppercase tracking-wider text-blue-700">
            Notification Preferences
          </h3>

          <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
            <div>
              <span>Live Class Reminders</span>
              <p className="text-[11px] text-slate-500 font-normal">Receive WhatsApp / Push alerts 15 mins before live streams start</p>
            </div>
            <input type="checkbox" checked={liveReminders} onChange={(e) => setLiveReminders(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
            <div>
              <span>Email Test & Results Summary</span>
              <p className="text-[11px] text-slate-500 font-normal">Receive score reports directly to registered email</p>
            </div>
            <input type="checkbox" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
          </div>
        </div>

        {/* Change Password */}
        <div className="space-y-4 pt-4 border-t border-slate-100 text-xs">
          <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2 uppercase tracking-wider text-blue-700">
            Change Password
          </h3>

          <div className="space-y-3 max-w-md">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full border border-slate-200 p-2.5 rounded-lg" />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full border border-slate-200 p-2.5 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button type="submit" className="btn btn-primary text-xs py-2.5 px-6 flex items-center gap-1.5 shadow-md">
            <Save className="w-4 h-4" /> Save Preferences
          </button>
          {savedMsg && <span className="text-xs font-bold text-emerald-600">Settings saved successfully!</span>}
        </div>

      </form>
    </div>
  );
}
