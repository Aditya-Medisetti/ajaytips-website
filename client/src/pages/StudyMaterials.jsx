import React, { useState } from 'react';
import { 
  FileText, Download, Eye, Search, Filter, BookOpen, CheckCircle, Sparkles, X
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function StudyMaterials() {
  const { materials } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewMaterial, setPreviewMaterial] = useState(null);

  const types = ['All', 'PDF', 'Notes', 'PYQ', 'Formula Sheet', 'Practice Set'];
  const categories = ['All', 'SSC', 'RRB', 'Banking', 'Police', 'All Exams'];

  const filteredMaterials = materials.filter((m) => {
    if (selectedCategory !== 'All' && m.examCategory !== selectedCategory) return false;
    if (selectedType !== 'All' && m.fileType !== selectedType) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return m.title.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="container py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Study Materials Library</h1>
          <p className="text-xs text-slate-500">Download high quality hand-written class notes, PYQ papers, and formula capsules</p>
        </div>

        {/* Search & Filter Pills */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search PDF notes, formulas, previous papers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedType === type ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Materials Table / Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((item) => (
          <div key={item._id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="badge badge-blue font-bold text-[11px]">{item.examCategory}</span>
                <span className="badge bg-amber-100 text-amber-900 font-bold text-[10px]">{item.fileType}</span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                {item.title}
              </h3>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
                <span>Subject: <strong className="text-slate-800">{item.subject}</strong></span>
                <span>{item.fileSize}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button 
                onClick={() => setPreviewMaterial(item)}
                className="btn btn-outline text-xs py-1.5 px-3 flex-1 flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> View PDF
              </button>

              <a 
                href={item.fileUrl} 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-primary text-xs py-1.5 px-3 flex-1 flex items-center justify-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* PDF View Modal Simulation */}
      {previewMaterial && (
        <div className="modal-overlay">
          <div className="modal-content max-w-3xl animate-fade-in p-6 space-y-4 bg-white rounded-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">{previewMaterial.title}</h3>
                <p className="text-xs text-slate-500">{previewMaterial.subject} • {previewMaterial.fileType}</p>
              </div>
              <button onClick={() => setPreviewMaterial(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-100 rounded-xl p-8 text-center border border-slate-200 space-y-3 min-h-[300px] flex flex-col items-center justify-center">
              <FileText className="w-16 h-16 text-blue-600" />
              <h4 className="font-bold text-slate-800 text-sm">PDF Document Viewer</h4>
              <p className="text-xs text-slate-500 max-w-sm">
                Document "{previewMaterial.title}" is ready for reading. You can view online or save to your local device.
              </p>
              <a href={previewMaterial.fileUrl} target="_blank" rel="noreferrer" className="btn btn-primary text-xs py-2 px-6">
                Open Fullscreen PDF
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
