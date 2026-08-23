import React, { useState } from 'react';
import { FileCheck, Upload, CheckCircle2, Clock } from 'lucide-react';

export default function Assignments() {
  const [assignmentsList, setAssignmentsList] = useState([
    { id: 1, title: 'Assignment 01: Geometry Circles & Triangles Proofs', course: 'Pure Maths Masterclass', dueDate: '2026-08-30', totalMarks: 50, status: 'Submitted', obtainedMarks: '46/50', feedback: 'Great proof steps!' },
    { id: 2, title: 'Assignment 02: High Level Seating Arrangement Puzzles', course: 'Banking Aptitude', dueDate: '2026-09-05', totalMarks: 40, status: 'Pending', obtainedMarks: '-/40', feedback: 'Awaiting student PDF submission' }
  ]);

  const handleSubmitFile = (id) => {
    setAssignmentsList(assignmentsList.map(a => a.id === id ? { ...a, status: 'Submitted', obtainedMarks: 'Awaiting Grading' } : a));
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <FileCheck className="w-6 h-6 text-blue-600" /> Homework & Homework Assignments
        </h1>
        <p className="text-xs text-slate-500 mt-1">Submit hand-written solutions for faculty evaluation and view marks</p>
      </div>

      <div className="space-y-4">
        {assignmentsList.map((asg) => (
          <div key={asg.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 text-xs">
              <span className={`badge ${asg.status === 'Submitted' ? 'badge-green' : 'badge-amber'} font-bold text-[10px]`}>
                {asg.status}
              </span>
              <h3 className="font-bold text-slate-900 text-sm">{asg.title}</h3>
              <p className="text-slate-500">{asg.course} • Due Date: {asg.dueDate} • Marks: {asg.obtainedMarks}</p>
              {asg.feedback && <p className="text-blue-700 font-semibold pt-1">Faculty Feedback: {asg.feedback}</p>}
            </div>

            <div>
              {asg.status === 'Pending' ? (
                <button 
                  onClick={() => handleSubmitFile(asg.id)}
                  className="btn btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" /> Submit Answer PDF
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Solution Submitted
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
