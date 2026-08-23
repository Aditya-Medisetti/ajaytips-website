import React, { useState } from 'react';
import { 
  User, BookOpen, Award, FileText, CheckCircle2, ShieldCheck, 
  MapPin, GraduationCap, Phone, Mail, Edit, Download, ExternalLink, Play
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, updateUserProfile } = useAuth();
  const { courses, enrolledCourseIds } = useData();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('info'); // info, courses, performance, payments, assignments
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    phone: user ? user.phone : '',
    address: user ? user.address : '',
    qualification: user ? user.qualification : ''
  });

  const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c._id));

  const samplePayments = [
    { id: 'pym_101', title: 'Pure Maths for SSC CGL & RRB NTPC Masterclass', amount: 349, date: '2026-08-15', txnId: 'pay_RZP981240192', status: 'Success' },
    { id: 'pym_102', title: 'RRB NTPC & Group D Complete Test Series Pack', amount: 199, date: '2026-08-10', txnId: 'pay_RZP882319041', status: 'Success' }
  ];

  const sampleAssignments = [
    { id: 'asg_1', title: 'Assignment 01: Geometry Proofs', course: 'Pure Maths Masterclass', dueDate: '2026-08-30', status: 'Submitted', marks: '46/50', feedback: 'Great job!' },
    { id: 'asg_2', title: 'Assignment 02: Puzzles & DI', course: 'Banking Aptitude', dueDate: '2026-09-05', status: 'Pending', marks: '-/40', feedback: 'Awaiting submission' }
  ];

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setIsEditingInfo(false);
  };

  return (
    <div className="container py-8 space-y-8">
      
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-full object-cover border-4 border-blue-600 shadow-md" />
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-slate-900">{user?.name}</h1>
            <p className="text-xs text-slate-500">{user?.email} • {user?.phone || 'Add Phone Number'}</p>
            <div className="flex items-center gap-2 pt-1">
              <span className="badge badge-blue font-bold text-[10px] uppercase">{user?.role}</span>
              <span className="badge badge-green font-bold text-[10px]">Verified Student</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/settings')} className="btn btn-outline text-xs py-2 px-4">
            Account Settings
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto">
        {[
          { id: 'info', label: 'Basic Info', icon: User },
          { id: 'courses', label: 'My Courses', icon: BookOpen },
          { id: 'performance', label: 'Performance', icon: Award },
          { id: 'payments', label: 'Payments & Receipts', icon: FileText },
          { id: 'assignments', label: 'Assignments', icon: CheckCircle2 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 px-5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Info */}
      {activeTab === 'info' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-base">Personal & Educational Details</h3>
            <button 
              onClick={() => setIsEditingInfo(!isEditingInfo)}
              className="btn btn-outline text-xs py-1.5 px-3 flex items-center gap-1"
            >
              <Edit className="w-3.5 h-3.5" /> {isEditingInfo ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditingInfo ? (
            <form onSubmit={handleProfileSave} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Qualification</label>
                <input
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="md:col-span-2 pt-2">
                <button type="submit" className="btn btn-primary text-xs py-2 px-6">
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
              <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <span className="font-bold text-slate-500 block uppercase">Full Name</span>
                <span className="font-extrabold text-sm text-slate-900">{user?.name}</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <span className="font-bold text-slate-500 block uppercase">Registered Email</span>
                <span className="font-extrabold text-sm text-slate-900">{user?.email}</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <span className="font-bold text-slate-500 block uppercase">Educational Qualification</span>
                <span className="font-extrabold text-sm text-slate-900">{user?.qualification || 'Graduate'}</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <span className="font-bold text-slate-500 block uppercase">Target Examinations</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user?.targetExams?.map((t, idx) => (
                    <span key={idx} className="badge badge-blue font-bold text-[10px]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Purchased Courses */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <h3 className="font-extrabold text-slate-900 text-lg">Enrolled Courses ({enrolledCourses.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((crs) => (
              <div key={crs._id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                <div className="flex items-center gap-4">
                  <img src={crs.thumbnail} alt={crs.title} className="w-24 h-16 rounded-xl object-cover" />
                  <div>
                    <span className="badge badge-blue text-[10px] font-bold">{crs.category}</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{crs.title}</h4>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Validity: {crs.validity}</span>
                  <button 
                    onClick={() => navigate(`/video-learning/${crs._id}`)}
                    className="btn btn-primary text-xs py-1.5 px-4 flex items-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Performance */}
      {activeTab === 'performance' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
            Mock Test Performance Analytics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-bold block uppercase">Tests Attempted</span>
              <span className="text-2xl font-extrabold text-blue-700">12</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-bold block uppercase">Average Accuracy</span>
              <span className="text-2xl font-extrabold text-emerald-600">84.2%</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-bold block uppercase">Highest Rank</span>
              <span className="text-2xl font-extrabold text-amber-500">#3</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-bold block uppercase">Course Progress</span>
              <span className="text-2xl font-extrabold text-purple-600">45%</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Payments & Receipts */}
      {activeTab === 'payments' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
            Billing History & Tax Receipts
          </h3>

          <div className="space-y-3">
            {samplePayments.map((p) => (
              <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="badge bg-emerald-100 text-emerald-800 font-bold text-[10px]">{p.status}</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{p.title}</h4>
                  <p className="text-slate-500">Txn ID: {p.txnId} • Date: {p.date}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-base font-extrabold text-slate-900">₹{p.amount}</span>
                  <button className="btn btn-outline text-xs py-1.5 px-3 flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> Download Tax Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Assignments */}
      {activeTab === 'assignments' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
            Homework & Homework Submissions
          </h3>

          <div className="space-y-3">
            {sampleAssignments.map((a) => (
              <div key={a.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
                <div>
                  <span className={`badge ${a.status === 'Submitted' ? 'badge-green' : 'badge-amber'} font-bold text-[10px]`}>
                    {a.status}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{a.title}</h4>
                  <p className="text-slate-500">{a.course} • Due: {a.dueDate}</p>
                  {a.feedback && <p className="text-blue-700 font-semibold mt-1">Feedback: {a.feedback}</p>}
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-slate-800">{a.marks}</span>
                  <button className="btn btn-primary text-xs py-1.5 px-3">
                    Submit Answer PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
