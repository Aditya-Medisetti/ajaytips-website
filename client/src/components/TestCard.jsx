import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Clock, HelpCircle, AlertCircle, Play } from 'lucide-react';
import { useTest } from '../context/TestContext';

export default function TestCard({ test }) {
  const navigate = useNavigate();
  const { startTest } = useTest();

  const handleStart = (e) => {
    e.stopPropagation();
    startTest(test);
    navigate(`/test-interface/${test._id}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover:border-blue-300">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="badge badge-blue font-bold text-[11px]">
            {test.examCategory}
          </span>
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-600" /> {test.durationMinutes} mins
          </span>
        </div>

        <h3 className="font-bold text-slate-900 text-base line-clamp-2 leading-snug">
          {test.title}
        </h3>

        <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 rounded-xl text-center border border-slate-100">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Questions</span>
            <span className="text-sm font-extrabold text-slate-800">{test.totalQuestions}</span>
          </div>
          <div className="border-x border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Marks</span>
            <span className="text-sm font-extrabold text-blue-700">{test.totalMarks}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Negative</span>
            <span className="text-sm font-extrabold text-red-600">-{test.negativeMarking}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          {test.isFree ? (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">FREE MOCK</span>
          ) : (
            <span className="text-sm font-bold text-slate-900">₹{test.price}</span>
          )}
        </div>

        <button 
          onClick={handleStart}
          className="btn btn-primary text-xs py-2 px-4 flex items-center gap-1.5 shadow-sm"
        >
          <Play className="w-3.5 h-3.5 fill-white" /> Start Test
        </button>
      </div>
    </div>
  );
}
