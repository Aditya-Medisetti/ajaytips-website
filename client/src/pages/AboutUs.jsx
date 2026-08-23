import React from 'react';
import { GraduationCap, Award, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="container py-12 space-y-12 max-w-4xl">
      <div className="text-center space-y-3">
        <span className="badge badge-blue font-extrabold text-xs uppercase tracking-wider">About Ajaytips Academy</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900">Empowering Competitive Exam Aspirants Across India</h1>
        <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Ajaytips Pro is India's leading commercial EdTech platform dedicated to delivering affordable, high quality online coaching and CBT test series for SSC CGL, RRB NTPC, Banking, Police recruitment, and State Government Jobs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-3xl font-extrabold text-blue-600">150,000+</div>
          <h3 className="font-bold text-slate-800 text-sm">Enrolled Aspirants</h3>
          <p className="text-xs text-slate-500">Learning across 28 states</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-3xl font-extrabold text-emerald-600">12,500+</div>
          <h3 className="font-bold text-slate-800 text-sm">Selections Achieved</h3>
          <p className="text-xs text-slate-500">In SSC, Railway & State exams</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-3xl font-extrabold text-amber-500">100%</div>
          <h3 className="font-bold text-slate-800 text-sm">Curriculum Coverage</h3>
          <p className="text-xs text-slate-500">Latest TCS/NTA exam pattern</p>
        </div>
      </div>
    </div>
  );
}
