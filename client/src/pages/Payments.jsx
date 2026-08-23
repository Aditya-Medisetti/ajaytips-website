import React from 'react';
import { FileText, Download, CheckCircle } from 'lucide-react';

export default function Payments() {
  const transactions = [
    { id: 'pym_101', title: 'Pure Maths for SSC CGL & RRB NTPC Masterclass', amount: 349, date: '15 Aug 2026', txnId: 'pay_RZP981240192', status: 'Success', method: 'UPI (GPay)' },
    { id: 'pym_102', title: 'RRB NTPC & Group D Complete CBT-1 & CBT-2 Test Series Pack', amount: 199, date: '10 Aug 2026', txnId: 'pay_RZP882319041', status: 'Success', method: 'Debit Card' }
  ];

  return (
    <div className="container py-8 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-purple-600" /> Payment & Billing Receipts
        </h1>
        <p className="text-xs text-slate-500 mt-1">Download GST tax invoices and view payment transaction history</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="space-y-3">
          {transactions.map((t) => (
            <div key={t.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
              <div>
                <span className="badge bg-emerald-100 text-emerald-800 font-bold text-[10px]">{t.status}</span>
                <h3 className="font-bold text-slate-900 text-sm mt-1">{t.title}</h3>
                <p className="text-slate-500">Method: {t.method} • Txn ID: {t.txnId} • Date: {t.date}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-lg font-extrabold text-slate-900">₹{t.amount}</span>
                <button className="btn btn-outline text-xs py-1.5 px-3 flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> Download Tax Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
