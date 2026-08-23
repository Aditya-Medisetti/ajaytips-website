import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, User, Phone, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [targetExam, setTargetExam] = useState('SSC CGL');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password, targetExams: [targetExam] })
      });
      const data = await res.json();
      if (data.success) {
        login(data.user, data.token);
        navigate('/');
      }
    } catch (e) {
      const newStudent = {
        _id: `usr_${Date.now()}`,
        name: name || 'Aspirant Student',
        email,
        phone,
        role: 'student',
        targetExams: [targetExam],
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      };
      login(newStudent, 'demo_jwt_token_2026');
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full space-y-6 animate-fade-in">
        
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto flex items-center justify-center">
            <img src="/logo.png" onError={(e) => { e.target.onerror = null; e.target.src = '/logo.svg'; }} alt="AJAY TIPS Logo" className="w-full h-full object-contain block" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Create Student Account</h1>
          <p className="text-xs text-slate-500">Join 150,000+ competitive exam aspirants today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
            <div className="relative">
              <input
                type="text"
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Target Exam Category</label>
            <select
              value={targetExam}
              onChange={(e) => setTargetExam(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            >
              <option value="SSC CGL">SSC CGL / CHSL / GD</option>
              <option value="RRB NTPC">RRB NTPC & Group D</option>
              <option value="Banking IBPS">Banking (IBPS PO / SBI Clerk)</option>
              <option value="Police SI/PC">AP & TS Police SI / Constable</option>
              <option value="FBO">Forest Beat Officer (FBO)</option>
              <option value="AP Govt Jobs">AP Govt Jobs (APPSC)</option>
              <option value="TS Govt Jobs">Telangana Govt Jobs (TSPSC)</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full btn btn-primary py-3 text-sm font-bold shadow-lg">
            {loading ? 'Creating Account...' : 'Register & Start Learning'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Already registered? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log In Here</Link>
        </div>

      </div>
    </div>
  );
}
