import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  BookOpen, Award, CheckCircle2, Clock, Play, Bell, Radio, ArrowRight, User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { courses, enrolledCourseIds } = useData();
  const navigate = useNavigate();

  const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c._id));

  return (
    <div className="container py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="badge bg-amber-400 text-slate-950 font-extrabold text-xs">
            STUDENT DASHBOARD
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white">
            Welcome back, {user ? user.name.split(' ')[0] : 'Aditya'} 👋
          </h1>
          <p className="text-xs md:text-sm text-slate-300">
            Track your course progress, upcoming live classes, and CBT mock test scores.
          </p>
        </div>

        <button 
          onClick={() => navigate('/test-series')}
          className="btn btn-accent text-xs py-3 px-6 shadow-lg"
        >
          Attempt New CBT Test <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 7 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center text-xs">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <BookOpen className="w-5 h-5 text-blue-600 mx-auto" />
          <span className="text-[10px] text-slate-400 uppercase font-bold block">My Courses</span>
          <span className="text-xl font-extrabold text-slate-900">{enrolledCourses.length}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <Clock className="w-5 h-5 text-indigo-600 mx-auto" />
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Progress</span>
          <span className="text-xl font-extrabold text-indigo-600">68%</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <Award className="w-5 h-5 text-emerald-600 mx-auto" />
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Tests Attempted</span>
          <span className="text-xl font-extrabold text-emerald-600">12</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <Award className="w-5 h-5 text-amber-500 mx-auto" />
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Avg Score</span>
          <span className="text-xl font-extrabold text-amber-500">84%</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <Radio className="w-5 h-5 text-red-600 mx-auto" />
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Upcoming Live</span>
          <span className="text-xl font-extrabold text-red-600">2</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <CheckCircle2 className="w-5 h-5 text-purple-600 mx-auto" />
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Assignments</span>
          <span className="text-xl font-extrabold text-purple-600">1</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <Bell className="w-5 h-5 text-sky-600 mx-auto" />
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Notifications</span>
          <span className="text-xl font-extrabold text-sky-600">3</span>
        </div>
      </div>

      {/* Continue Learning Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 border-l-4 border-blue-600 pl-3">
          Continue Learning
        </h2>

        <div className="space-y-3">
          {enrolledCourses.map((crs) => (
            <div key={crs._id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <img src={crs.thumbnail} alt={crs.title} className="w-20 h-14 rounded-xl object-cover" />
                <div className="space-y-1 flex-1">
                  <h3 className="font-bold text-slate-900 text-sm">{crs.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>Progress: <strong className="text-blue-700">68%</strong></span>
                    <div className="w-32 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full w-2/3 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/video-learning/${crs._id}`)}
                className="btn btn-primary text-xs py-2 px-5 flex items-center gap-1.5 shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-white" /> Continue Learning
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
