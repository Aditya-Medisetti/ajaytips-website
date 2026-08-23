import React, { useState } from 'react';
import { HardDrive, Download, Play, Trash2, CheckCircle, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OfflineDownloads() {
  const navigate = useNavigate();
  const [offlineFiles, setOfflineFiles] = useState([
    { id: 1, title: 'Unit Digit & Remainder Theorem Shortcuts (Video)', size: '240 MB', type: 'Video', course: 'Pure Maths Masterclass', date: '2026-08-18' },
    { id: 2, title: 'SSC CGL Pure Mathematics Formula Sheet (PDF)', size: '3.2 MB', type: 'PDF', course: 'Pure Maths Masterclass', date: '2026-08-15' },
    { id: 3, title: 'AP Police SI Prelims Indian Polity Lecture 01 (Video)', size: '310 MB', type: 'Video', course: 'AP Police SI Target Batch', date: '2026-08-20' }
  ]);

  const deleteFile = (id) => {
    setOfflineFiles(offlineFiles.filter(f => f.id !== id));
  };

  return (
    <div className="container py-8 space-y-8">
      
      {/* Header & Storage Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-blue-600" /> Offline Downloads Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">Watch lectures and read study PDFs without active internet connection</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
          <div className="flex items-center justify-between font-bold text-slate-800 gap-4">
            <span>Local Storage Used:</span>
            <span className="text-blue-700">553.2 MB / 16 GB</span>
          </div>
          <div className="w-48 bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full w-1/12 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Downloaded Items List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
          Saved Content ({offlineFiles.length})
        </h3>

        <div className="space-y-3">
          {offlineFiles.map((file) => (
            <div key={file.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4">
              <div>
                <span className="badge badge-blue text-[10px] font-bold">{file.type}</span>
                <h4 className="font-bold text-slate-900 text-sm mt-1">{file.title}</h4>
                <p className="text-xs text-slate-500">{file.course} • Saved on {file.date} ({file.size})</p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => navigate('/video-learning/crs_1')}
                  className="btn btn-primary text-xs py-1.5 px-3 flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Open Offline
                </button>
                <button 
                  onClick={() => deleteFile(file.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  title="Delete File"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
