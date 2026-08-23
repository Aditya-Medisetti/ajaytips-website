import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Bookmark, RotateCcw, Send
} from 'lucide-react';
import { useTest } from '../context/TestContext';

export default function TestInterface() {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  const {
    activeTest,
    currentQuestionIndex,
    userAnswers,
    questionStatus,
    timeLeftSeconds,
    setTimeLeftSeconds,
    selectOption,
    clearResponse,
    markForReview,
    navigateToQuestion,
    submitTest
  } = useTest();

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer Countdown Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!activeTest || !activeTest.questions || activeTest.questions.length === 0) {
    return (
      <div className="container py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">No Active Test Found</h2>
        <button onClick={() => navigate('/test-series')} className="btn btn-primary text-xs">
          Return to Test Series Marketplace
        </button>
      </div>
    );
  }

  const currentQ = activeTest.questions[currentQuestionIndex];

  const formatTime = (totalSec) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleFinalSubmit = () => {
    submitTest();
    navigate(`/test-result/${testId}`);
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col justify-between">
      
      {/* Top Examination Header */}
      <header className="bg-slate-900 text-white px-6 py-3 border-b border-slate-800 flex items-center justify-between sticky top-0 z-40">
        <div>
          <h1 className="font-extrabold text-sm md:text-base text-white">{activeTest.title}</h1>
          <p className="text-[11px] text-slate-400 font-medium">Exam Category: {activeTest.examCategory} CBT</p>
        </div>

        {/* Live Timer Clock */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-800 px-4 py-1.5 rounded-xl border border-slate-700">
            <Clock className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Time Remaining</span>
              <span className="font-mono text-base font-extrabold text-amber-400">
                {formatTime(timeLeftSeconds)}
              </span>
            </div>
          </div>

          <button 
            onClick={() => setShowSubmitModal(true)}
            className="btn bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2 px-4 shadow-md font-bold"
          >
            Submit Test
          </button>
        </div>
      </header>

      {/* Main Examination Workspace */}
      <main className="container py-4 flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Question & Options Card */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-6">
          
          <div className="space-y-6">
            {/* Subject Section Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="badge badge-blue font-bold text-xs">
                Question {currentQuestionIndex + 1} of {activeTest.questions.length}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Subject: <strong className="text-slate-800">{currentQ.subject || 'Quantitative Aptitude'}</strong>
              </span>
              <span className="text-xs text-emerald-600 font-bold">
                +{activeTest.totalMarks / activeTest.totalQuestions} Marks / -{activeTest.negativeMarking} Negative
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <h3 className="text-base md:text-lg font-bold text-slate-900 leading-relaxed">
                Q{currentQuestionIndex + 1}. {currentQ.questionText}
              </h3>
            </div>

            {/* 4 Options Grid */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((optText, optIdx) => {
                const isSelected = userAnswers[currentQ.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => selectOption(currentQ.id, optIdx)}
                    className={`w-full p-4 rounded-xl border text-left text-xs md:text-sm transition-all flex items-center gap-3.5 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 text-blue-950 font-bold shadow-sm'
                        : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border ${
                      isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-100 text-slate-600 border-slate-300'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{optText}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation Control Bar */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => markForReview(currentQ.id)}
                className="btn btn-secondary text-xs py-2 px-3 text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200"
              >
                <Bookmark className="w-3.5 h-3.5" /> Mark for Review
              </button>

              <button
                onClick={() => clearResponse(currentQ.id)}
                className="btn btn-secondary text-xs py-2 px-3 text-slate-600 hover:bg-slate-200"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear Response
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateToQuestion(currentQuestionIndex - 1)}
                disabled={currentQuestionIndex === 0}
                className="btn btn-outline text-xs py-2 px-4 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={() => navigateToQuestion(currentQuestionIndex + 1)}
                disabled={currentQuestionIndex === activeTest.questions.length - 1}
                className="btn btn-primary text-xs py-2 px-5"
              >
                Save & Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Section: Question Status Matrix / Palette */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5 h-fit">
          <h4 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
            Question Palette Matrix
          </h4>

          {/* Status Color Legend */}
          <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded cbt-answered"></span> Answered
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded cbt-unanswered"></span> Not Answered
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded cbt-review"></span> Marked Review
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded cbt-not-visited"></span> Not Visited
            </div>
          </div>

          {/* Matrix Grid Buttons */}
          <div className="grid grid-cols-5 gap-2 pt-2">
            {activeTest.questions.map((q, idx) => {
              const status = questionStatus[q.id] || 'not-visited';
              const isCurrent = idx === currentQuestionIndex;

              let statusClass = 'cbt-not-visited';
              if (status === 'answered') statusClass = 'cbt-answered';
              if (status === 'unanswered') statusClass = 'cbt-unanswered';
              if (status === 'review') statusClass = 'cbt-review';

              return (
                <button
                  key={q.id}
                  onClick={() => navigateToQuestion(idx)}
                  className={`w-9 h-9 font-bold text-xs flex items-center justify-center transition-all shadow-sm ${statusClass} ${
                    isCurrent ? 'ring-2 ring-offset-2 ring-blue-600 font-extrabold scale-110' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full btn bg-emerald-600 text-white hover:bg-emerald-700 py-2.5 text-xs font-bold shadow-md"
            >
              Submit Final Test
            </button>
          </div>
        </div>

      </main>

      {/* Confirmation Submit Modal */}
      {showSubmitModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in p-6 space-y-4 max-w-md">
            <h3 className="font-extrabold text-slate-900 text-lg">Are you sure you want to submit?</h3>
            <p className="text-xs text-slate-500">
              Once submitted, your answers will be scored and detailed All India Rank report will be generated.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs font-semibold text-slate-700">
              <div className="flex justify-between">
                <span>Total Questions:</span> <strong>{activeTest.questions.length}</strong>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Answered:</span> <strong>{Object.keys(userAnswers).length}</strong>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Unattempted:</span> <strong>{activeTest.questions.length - Object.keys(userAnswers).length}</strong>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowSubmitModal(false)} className="btn btn-secondary flex-1 text-xs py-2.5">
                Continue Test
              </button>
              <button onClick={handleFinalSubmit} className="btn bg-emerald-600 text-white flex-1 text-xs py-2.5 font-bold">
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
