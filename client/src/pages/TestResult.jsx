import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, CheckCircle, XCircle, HelpCircle, ArrowLeft, RefreshCcw, Award, FileText, Check, X
} from 'lucide-react';
import { useTest } from '../context/TestContext';

export default function TestResult() {
  const navigate = useNavigate();
  const { testResult } = useTest();

  // Fallback demo result if navigated directly
  const result = testResult || {
    testTitle: 'SSC CGL Tier-1 All India Grand Mock Test - 01',
    score: 8.5,
    totalMarks: 10,
    percentage: 85,
    correctCount: 4,
    wrongCount: 1,
    unattemptedCount: 0,
    rank: 3,
    totalParticipants: 1450,
    userAnswers: { 1: 1, 2: 1, 3: 2, 4: 1, 5: 1 },
    test: {
      questions: [
        {
          id: 1,
          questionText: 'If a sum of money doubles itself in 8 years at simple interest, what is the rate of interest per annum?',
          options: ['10%', '12.5%', '15%', '8.33%'],
          correctAnswer: 1,
          explanation: 'Simple Interest SI = P. Formula SI = (P * R * T)/100 => P = (P * R * 8)/100 => R = 100/8 = 12.5%.',
          subject: 'Quantitative Aptitude'
        },
        {
          id: 2,
          questionText: 'Select the missing number in the series: 4, 9, 25, 49, 121, ?',
          options: ['144', '169', '196', '225'],
          correctAnswer: 1,
          explanation: 'The terms are squares of consecutive prime numbers: 2², 3², 5², 7², 11², 13² = 169.',
          subject: 'General Intelligence & Reasoning'
        }
      ]
    }
  };

  return (
    <div className="container py-8 space-y-8">
      
      {/* Top Banner & All India Rank */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Trophy className="w-6 h-6 text-amber-400 fill-amber-400" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Test Performance Report</h1>
          </div>
          <p className="text-sm text-slate-300 font-medium">{result.testTitle}</p>
        </div>

        <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <div className="text-center">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">All India Rank</span>
            <span className="text-2xl font-extrabold text-amber-400">#{result.rank}</span>
            <span className="text-[10px] text-slate-400 block">out of {result.totalParticipants}</span>
          </div>

          <div className="border-l border-white/20 pl-6 text-center">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">Score Percentile</span>
            <span className="text-2xl font-extrabold text-emerald-400">{result.percentage}%</span>
          </div>
        </div>
      </div>

      {/* Score Summary Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-1 shadow-sm">
          <span className="text-xs text-slate-500 font-bold uppercase">Total Score</span>
          <div className="text-2xl font-extrabold text-blue-700">{result.score} / {result.totalMarks}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-1 shadow-sm">
          <span className="text-xs text-emerald-700 font-bold uppercase flex items-center justify-center gap-1">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Correct
          </span>
          <div className="text-2xl font-extrabold text-emerald-600">{result.correctCount}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-1 shadow-sm">
          <span className="text-xs text-red-700 font-bold uppercase flex items-center justify-center gap-1">
            <XCircle className="w-4 h-4 text-red-600" /> Incorrect
          </span>
          <div className="text-2xl font-extrabold text-red-600">{result.wrongCount}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-1 shadow-sm">
          <span className="text-xs text-slate-500 font-bold uppercase flex items-center justify-center gap-1">
            <HelpCircle className="w-4 h-4 text-slate-400" /> Unattempted
          </span>
          <div className="text-2xl font-extrabold text-slate-700">{result.unattemptedCount}</div>
        </div>
      </div>

      {/* Detailed Solutions Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-xl font-extrabold text-slate-900 border-l-4 border-blue-600 pl-3">
            Detailed Step-by-Step Question Solutions
          </h2>
          <button onClick={() => navigate('/test-series')} className="btn btn-outline text-xs py-1.5 px-3">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Test Series
          </button>
        </div>

        <div className="space-y-6">
          {result.test?.questions?.map((q, idx) => {
            const userAns = result.userAnswers ? result.userAnswers[q.id] : undefined;
            const isCorrect = userAns === q.correctAnswer;
            const isUnattempted = userAns === undefined || userAns === null;

            return (
              <div key={q.id} className="p-5 rounded-2xl border border-slate-200 space-y-3 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="badge badge-blue font-bold text-xs">
                    Question {idx + 1} • {q.subject || 'Quantitative Aptitude'}
                  </span>
                  <div>
                    {isCorrect && (
                      <span className="badge bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Correct (+2 Marks)
                      </span>
                    )}
                    {!isCorrect && !isUnattempted && (
                      <span className="badge bg-red-100 text-red-800 font-bold text-xs flex items-center gap-1">
                        <X className="w-3.5 h-3.5" /> Incorrect (-0.5 Marks)
                      </span>
                    )}
                    {isUnattempted && (
                      <span className="badge bg-slate-200 text-slate-700 font-bold text-xs">
                        Unattempted (0 Marks)
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-base">
                  Q{idx + 1}. {q.questionText}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isOptionCorrect = optIdx === q.correctAnswer;
                    const isOptionSelected = userAns === optIdx;

                    let optBg = 'bg-white border-slate-200 text-slate-800';
                    if (isOptionCorrect) optBg = 'bg-emerald-50 border-emerald-500 font-bold text-emerald-950';
                    if (isOptionSelected && !isOptionCorrect) optBg = 'bg-red-50 border-red-500 font-bold text-red-950';

                    return (
                      <div key={optIdx} className={`p-3 rounded-xl border flex items-center justify-between ${optBg}`}>
                        <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                        {isOptionCorrect && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                      </div>
                    );
                  })}
                </div>

                {/* Step-by-Step Formula & Solution Box */}
                <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-1.5 text-xs text-blue-950">
                  <h4 className="font-extrabold text-blue-900 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-blue-700" /> Explanation & Formula:
                  </h4>
                  <p className="leading-relaxed font-mono">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
