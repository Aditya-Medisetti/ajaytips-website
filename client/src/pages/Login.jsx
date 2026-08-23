import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, LogIn, Sparkles, UserCheck, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('student@ajaytips.com');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success) {
        login(data.user, data.token);
        if (data.user.role === 'admin') navigate('/admin');
        else if (data.user.role === 'teacher') navigate('/teacher');
        else navigate('/');
      } else {
        setErrorMsg(data.message || 'Login failed');
      }
    } catch (err) {
      // Demo Fallback
      const demoUser = {
        _id: role === 'admin' ? 'usr_admin_1' : role === 'teacher' ? 'usr_teacher_1' : 'usr_student_1',
        name: role === 'admin' ? 'Admin Controller' : role === 'teacher' ? 'Prof. S. R. Sharma' : 'Ajay Kumar',
        email: email,
        role: role,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      };
      login(demoUser, 'demo_jwt_token_2026');
      if (role === 'admin') navigate('/admin');
      else if (role === 'teacher') navigate('/teacher');
      else navigate('/');
    }
    setLoading(false);
  };

  const handleQuickDemo = (demoRole) => {
    setRole(demoRole);
    if (demoRole === 'student') setEmail('student@ajaytips.com');
    if (demoRole === 'teacher') setEmail('teacher@ajaytips.com');
    if (demoRole === 'admin') setEmail('admin@ajaytips.com');
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full space-y-6 animate-fade-in">
        
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto flex items-center justify-center">
            <img src="/logo.png" onError={(e) => { e.target.onerror = null; e.target.src = '/logo.svg'; }} alt="AJAY TIPS Logo" className="w-full h-full object-contain block" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Welcome Back</h1>
          <p className="text-xs text-slate-500">Log in to your Ajaytips Competitive Exam Account</p>
        </div>

        {/* Quick Demo Selector */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block text-center">
            ⚡ Quick Demo 1-Click Select
          </span>
          <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
            <button
              onClick={() => handleQuickDemo('student')}
              className={`py-1.5 rounded-xl border ${role === 'student' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'}`}
            >
              Student
            </button>
            <button
              onClick={() => handleQuickDemo('teacher')}
              className={`py-1.5 rounded-xl border ${role === 'teacher' ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-700 border-slate-200'}`}
            >
              Teacher
            </button>
            <button
              onClick={() => handleQuickDemo('admin')}
              className={`py-1.5 rounded-xl border ${role === 'admin' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-200'}`}
            >
              Admin
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="font-bold text-slate-700">Password</label>
              <Link to="/forgot-password" className="text-blue-600 font-semibold hover:underline">Forgot Password?</Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full btn btn-primary py-3 text-sm font-bold shadow-lg">
            {loading ? 'Logging In...' : 'Log In to Account'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Register Student Account</Link>
        </div>

      </div>
    </div>
  );
}
