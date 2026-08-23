import React, { useState } from 'react';
import { 
  BookOpen, Video, FileText, Radio, Plus, CheckCircle2, MessageSquare, Users 
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function TeacherDashboard() {
  const { courses, liveClasses } = useData();

  const [activeTab, setActiveTab] = useState('courses');
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [liveTitle, setLiveTitle] = useState('');

  const handleScheduleLive = (e) => {
    e.preventDefault();
    setShowLiveModal(false);
    alert(`Live stream "${liveTitle}" scheduled successfully!`);
    setLiveTitle('');
  };

  return (
    <div className="container py-8 space-y-8">
      
      {/* Teacher Portal Header */}
      <div className="bg-teal-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-bold shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">Faculty Educator Portal</h1>
            <p className="text-xs text-teal-200">Manage video lectures, schedule live streams, and answer student doubts</p>
          </div>
        </div>

        <button 
          onClick={() => setShowLiveModal(true)}
          className="btn bg-red-600 text-white hover:bg-red-700 text-xs py-2.5 px-5 flex items-center gap-1.5 shadow-lg"
        >
          <Radio className="w-4 h-4" /> Schedule Live Classroom
        </button>
      </div>

      {/* Faculty Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto">
        {[
          { id: 'courses', label: 'My Assigned Courses' },
          { id: 'uploads', label: 'Upload Videos & PDFs' },
          { id: 'doubts', label: 'Student Doubt Queue' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-teal-600 text-teal-700 bg-teal-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Assigned Courses */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">Active Courses Taught by You</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((c) => (
              <div key={c._id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-3">
                  <img src={c.thumbnail} alt={c.title} className="w-20 h-14 rounded-xl object-cover" />
                  <div>
                    <span className="badge badge-blue text-[10px] font-bold">{c.category}</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{c.title}</h4>
                    <p className="text-xs text-slate-500">{c.studentsCount} Students Enrolled</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold">{c.videosCount} Videos Uploaded</span>
                  <button className="btn btn-outline text-xs py-1 px-3">Upload Chapter Video</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Live Modal */}
      {showLiveModal && (
        <div className="modal-overlay">
          <div className="modal-content p-6 space-y-4 animate-fade-in">
            <h3 className="font-extrabold text-slate-900 text-lg">Schedule Live Streaming Session</h3>
            <form onSubmit={handleScheduleLive} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Session Title</label>
                <input 
                  type="text" 
                  required 
                  value={liveTitle} 
                  onChange={(e) => setLiveTitle(e.target.value)}
                  placeholder="e.g. Pure Maths Top 50 Geometry Shortcuts Live"
                  className="w-full border border-slate-200 p-2.5 rounded-xl" 
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button type="button" onClick={() => setShowLiveModal(false)} className="btn btn-secondary flex-1 text-xs py-2">
                  Cancel
                </button>
                <button type="submit" className="btn bg-red-600 text-white flex-1 text-xs py-2 font-bold">
                  Schedule Live Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
