import React, { useState } from 'react';
import { Award, Clock, HelpCircle, CheckCircle, Search } from 'lucide-react';
import { useData } from '../context/DataContext';
import TestCard from '../components/TestCard';

export default function TestSeries() {
  const { tests } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'SSC', 'RRB', 'Banking', 'Police', 'Other'];

  const filteredTests = tests.filter((t) => {
    if (selectedCategory !== 'All' && t.examCategory !== selectedCategory) return false;
    if (searchTerm.trim()) {
      return t.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <div className="container py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-4">
        <span className="badge bg-amber-400 text-slate-950 font-extrabold text-xs">
          🎯 NTA & TCS EXAM PATTERN CBT ENGINE
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold">All India CBT Mock Test Series</h1>
        <p className="text-sm text-slate-300 max-w-2xl">
          Attempt real Computer-Based Online Tests with live countdown timers, sectional cutoffs, All India Ranks, percentiles, and video solution explanations.
        </p>

        {/* Category Pills & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-800 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <TestCard key={test._id} test={test} />
        ))}
      </div>

    </div>
  );
}
