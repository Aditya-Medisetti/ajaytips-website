import React from 'react';
import { Sparkles, Download, Eye, BookOpen, CheckCircle, FileText } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function FreeMaterials() {
  const { materials } = useData();
  const freeItems = materials.filter((m) => m.isFree);

  return (
    <div className="container py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-3">
        <span className="badge bg-emerald-400 text-slate-950 font-extrabold text-xs">
          🎁 100% FREE STUDY RESOURCES
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold">Free Exam Preparation Materials</h1>
        <p className="text-sm text-slate-200 max-w-2xl">
          Access free hand-written formula sheets, daily current affairs digests, and past year question papers (PYQs) without paying anything.
        </p>
      </div>

      {/* Free Content List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freeItems.map((item) => (
          <div key={item._id} className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="badge bg-emerald-100 text-emerald-800 font-bold text-xs">
                {item.examCategory}
              </span>
              <span className="badge bg-blue-100 text-blue-800 font-bold text-[10px]">
                {item.fileType}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
            <p className="text-xs text-slate-500">Subject: {item.subject} • Size: {item.fileSize}</p>

            <a
              href={item.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="btn bg-emerald-600 text-white hover:bg-emerald-700 w-full text-xs py-2 flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Download className="w-4 h-4" /> Download Free PDF
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}
