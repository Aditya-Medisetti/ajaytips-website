import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, Video, FileCheck, FileText, Clock, Users, Play, Lock, 
  ChevronDown, ChevronUp, ShieldCheck, CheckCircle2, Award, Share2
} from 'lucide-react';
import { useData } from '../context/DataContext';
import RazorpayModal from '../components/RazorpayModal';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, enrolledCourseIds } = useData();

  const course = courses.find((c) => c._id === id) || courses[0];
  const isEnrolled = enrolledCourseIds.includes(course._id);

  const [openChapterIndex, setOpenChapterIndex] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const toggleChapter = (idx) => {
    setOpenChapterIndex(openChapterIndex === idx ? null : idx);
  };

  return (
    <div className="pb-16 space-y-8">
      
      {/* Course Hero Banner */}
      <section className="bg-slate-900 text-white py-10 border-b border-slate-800">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge bg-blue-600 text-white font-bold text-xs">
                {course.category}
              </span>
              <span className="badge bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700">
                {course.courseType}
              </span>
              <span className="badge bg-amber-500 text-slate-950 font-bold text-xs">
                {course.validity}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-sm md:text-base text-slate-300">
              {course.subtitle || course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <img src={course.teacherAvatar} alt={course.teacher} className="w-8 h-8 rounded-full object-cover border border-blue-400" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Lead Educator</span>
                  <span className="font-bold text-white text-xs">{course.teacher}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-lg border border-amber-500/30">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-extrabold">{course.rating} Rating</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-300">
                <Users className="w-4 h-4 text-blue-400" />
                <span>{course.studentsCount} Students Enrolled</span>
              </div>
            </div>
          </div>

          {/* Right Pricing Card */}
          <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="aspect-video rounded-xl overflow-hidden relative bg-slate-950">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-blue-600 shadow-xl">
                  <Play className="w-6 h-6 fill-blue-600 ml-1" />
                </div>
              </div>
            </div>

            <div>
              {course.isFree ? (
                <span className="text-3xl font-extrabold text-emerald-600">FREE COURSE</span>
              ) : (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-slate-900">₹{course.price}</span>
                  <span className="text-sm text-slate-400 line-through">₹{course.originalPrice}</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    82% OFF
                  </span>
                </div>
              )}
              <p className="text-xs text-slate-500 mt-1">Lifetime Unlimited Access to Lectures & PDFs</p>
            </div>

            {isEnrolled ? (
              <button 
                onClick={() => navigate(`/video-learning/${course._id}`)}
                className="w-full btn bg-emerald-600 text-white hover:bg-emerald-700 py-3 text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <Play className="w-4 h-4" /> Continue Learning
              </button>
            ) : (
              <div className="space-y-2">
                <button 
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full btn btn-primary py-3 text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  Buy Now & Unlock
                </button>
                <button 
                  onClick={() => navigate(`/video-learning/${course._id}`)}
                  className="w-full btn btn-outline py-2.5 text-xs text-slate-700 border-slate-300"
                >
                  Watch Free Sample Lesson
                </button>
              </div>
            )}

            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{course.videosCount} High-Definition Video Lectures</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{course.testsCount} Topic & Grand Mock Tests</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{course.materialsCount} Hand-written Notes & PDF Materials</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{course.validity} Access on Mobile & Web</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Details Body */}
      <section className="container grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Description & Syllabus */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* About Course */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-extrabold text-lg text-slate-900 border-l-4 border-blue-600 pl-3">
              About This Course
            </h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Detailed Syllabus Accordion */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-slate-900 border-l-4 border-blue-600 pl-3">
                Course Syllabus & Curriculum
              </h3>
              <span className="text-xs text-slate-500 font-semibold">
                {course.syllabus?.length || 3} Modules
              </span>
            </div>

            <div className="space-y-3">
              {course.syllabus?.map((chapter, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleChapter(idx)}
                    className="w-full bg-slate-50 p-4 flex items-center justify-between font-bold text-xs md:text-sm text-slate-800 hover:bg-slate-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span>{chapter.chapterTitle}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-normal text-slate-500">
                      <span>{chapter.duration}</span>
                      {openChapterIndex === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {openChapterIndex === idx && (
                    <div className="p-4 bg-white border-t border-slate-200 space-y-2.5 text-xs">
                      {chapter.items?.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-none">
                          <div className="flex items-center gap-2 text-slate-700">
                            {item.type === 'video' && <Video className="w-4 h-4 text-blue-600" />}
                            {item.type === 'test' && <FileCheck className="w-4 h-4 text-emerald-600" />}
                            {item.type === 'pdf' && <FileText className="w-4 h-4 text-amber-600" />}
                            <span className="font-semibold">{item.title}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            {item.isFreePreview && (
                              <span className="badge bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                Free Preview
                              </span>
                            )}
                            <span className="text-slate-400 font-mono text-[11px]">{item.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Educator & Perks Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              Course Educator
            </h4>
            <div className="flex items-center gap-3">
              <img src={course.teacherAvatar} alt={course.teacher} className="w-12 h-12 rounded-full object-cover border-2 border-blue-600" />
              <div>
                <h5 className="font-extrabold text-sm text-slate-900">{course.teacher}</h5>
                <p className="text-xs text-slate-500">Senior Faculty • 12+ Yrs Teaching</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Specialist in shortcut problem-solving techniques for competitive exams with a track record of training 50,000+ selected candidates.
            </p>
          </div>
        </div>

      </section>

      {/* Payment Checkout Modal */}
      {showPaymentModal && (
        <RazorpayModal
          course={course}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => {
            navigate(`/video-learning/${course._id}`);
          }}
        />
      )}

    </div>
  );
}
