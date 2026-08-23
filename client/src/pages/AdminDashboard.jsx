import React, { useState } from 'react';
import { 
  Shield, Users, BookOpen, Award, DollarSign, Plus, Video, FileText, 
  Radio, Tag, Image, CheckCircle, BarChart2
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function AdminDashboard() {
  const { courses, tests, liveClasses, materials } = useData();

  const [activeTab, setActiveTab] = useState('overview'); // overview, courses, tests, live, sales
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState('SSC');
  const [newCoursePrice, setNewCoursePrice] = useState('499');

  const handleCreateCourse = (e) => {
    e.preventDefault();
    setShowAddCourseModal(false);
    alert(`Course "${newCourseTitle}" created successfully in Admin catalog!`);
    setNewCourseTitle('');
  };

  return (
    <div className="container py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">Admin Control Portal</h1>
            <p className="text-xs text-slate-400">Complete EdTech management suite for courses, tests, users & sales</p>
          </div>
        </div>

        <button 
          onClick={() => setShowAddCourseModal(true)}
          className="btn btn-accent text-xs py-2.5 px-5 flex items-center gap-1.5 shadow-lg"
        >
          <Plus className="w-4 h-4" /> Create New Course Batch
        </button>
      </div>

      {/* Admin Navigation Pills */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto">
        {[
          { id: 'overview', label: 'Platform Statistics' },
          { id: 'courses', label: 'Manage Courses (' + courses.length + ')' },
          { id: 'tests', label: 'Manage CBT Tests (' + tests.length + ')' },
          { id: 'live', label: 'Live Classes (' + liveClasses.length + ')' },
          { id: 'sales', label: 'Sales & Revenue' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Stats */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 font-bold uppercase">Total Students</span>
              <div className="text-3xl font-extrabold text-blue-600">1,54,200</div>
              <p className="text-[10px] text-emerald-600 font-bold">+1,240 this week</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 font-bold uppercase">Active Courses</span>
              <div className="text-3xl font-extrabold text-purple-600">{courses.length} Batches</div>
              <p className="text-[10px] text-slate-400">Recorded & Live</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 font-bold uppercase">Total Tests</span>
              <div className="text-3xl font-extrabold text-emerald-600">{tests.length} CBT Mocks</div>
              <p className="text-[10px] text-slate-400">Auto Scored</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 font-bold uppercase">Gross Revenue</span>
              <div className="text-3xl font-extrabold text-amber-500">₹14,85,400</div>
              <p className="text-[10px] text-emerald-600 font-bold">Razorpay Verified</p>
            </div>
          </div>
        </div>
      )}

      {/* Courses List */}
      {activeTab === 'courses' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">Course Inventory</h3>
          <div className="space-y-3">
            {courses.map((c) => (
              <div key={c._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4 text-xs">
                <div>
                  <span className="badge badge-blue font-bold text-[10px]">{c.category}</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{c.title}</h4>
                  <p className="text-slate-500">Faculty: {c.teacher} • Price: ₹{c.price} • Students: {c.studentsCount}</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-outline text-xs py-1 px-3">Edit</button>
                  <button className="btn bg-red-50 text-red-600 text-xs py-1 px-3">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Course Modal */}
      {showAddCourseModal && (
        <div className="modal-overlay">
          <div className="modal-content p-6 space-y-4 animate-fade-in">
            <h3 className="font-extrabold text-slate-900 text-lg">Create New Course Batch</h3>
            
            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Course Title</label>
                <input 
                  type="text" 
                  required 
                  value={newCourseTitle} 
                  onChange={(e) => setNewCourseTitle(e.target.value)} 
                  placeholder="e.g. SSC CGL 2026 Pure Maths Masterclass"
                  className="w-full border border-slate-200 p-2.5 rounded-xl" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select 
                    value={newCourseCategory} 
                    onChange={(e) => setNewCourseCategory(e.target.value)} 
                    className="w-full border border-slate-200 p-2.5 rounded-xl font-medium"
                  >
                    <option value="SSC">SSC</option>
                    <option value="RRB">RRB</option>
                    <option value="Banking">Banking</option>
                    <option value="Police">Police</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price (₹)</label>
                  <input 
                    type="number" 
                    value={newCoursePrice} 
                    onChange={(e) => setNewCoursePrice(e.target.value)} 
                    className="w-full border border-slate-200 p-2.5 rounded-xl" 
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button type="button" onClick={() => setShowAddCourseModal(false)} className="btn btn-secondary flex-1 text-xs py-2">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1 text-xs py-2">
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
