import React from 'react';
import { Award, CheckCircle, TrendingUp, Target, BarChart2, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Performance() {
  const navigate = useNavigate();

  return (
    <div className="container py-8 space-y-8">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-600" /> Student Performance & Accuracy Analytics
          </h1>
          <p className="text-xs text-slate-500">Track test history, subject-wise strengths, and target exam readiness</p>
        </div>
        <button onClick={() => navigate('/test-series')} className="btn btn-primary text-xs py-2 px-4">
          Attempt New CBT Mock Test
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 text-center">
          <span className="text-xs font-bold text-slate-500 uppercase">Average Accuracy</span>
          <div className="text-3xl font-extrabold text-emerald-600">84.5%</div>
          <p className="text-[11px] text-slate-400">Top 5% among 12,000+ aspirants</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 text-center">
          <span className="text-xs font-bold text-slate-500 uppercase">Best All India Rank</span>
          <div className="text-3xl font-extrabold text-amber-500">#3</div>
          <p className="text-[11px] text-slate-400">Achieved in SSC CGL Mock 01</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 text-center">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Tests Solved</span>
          <div className="text-3xl font-extrabold text-blue-600">14 Tests</div>
          <p className="text-[11px] text-slate-400">350+ Questions Practiced</p>
        </div>
      </div>
    </div>
  );
}
