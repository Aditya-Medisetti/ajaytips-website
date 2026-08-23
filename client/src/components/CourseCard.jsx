import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Video, FileCheck, ShieldCheck, PlayCircle, Clock } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function CourseCard({ course, onBuyNow }) {
  const { enrolledCourseIds } = useData();
  const isEnrolled = enrolledCourseIds.includes(course._id);
  const navigate = useNavigate();

  const handleAction = (e) => {
    e.stopPropagation();
    if (isEnrolled) {
      navigate(`/video-learning/${course._id}`);
    } else if (onBuyNow) {
      onBuyNow(course);
    } else {
      navigate(`/course/${course._id}`);
    }
  };

  return (
    <div 
      onClick={() => navigate(`/course/${course._id}`)}
      className="card group cursor-pointer flex flex-col justify-between h-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div>
        {/* Course Thumbnail & Badges */}
        <div className="relative aspect-video overflow-hidden bg-slate-900">
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="badge bg-[#101936] text-white shadow-md font-bold text-[11px]">
              {course.category}
            </span>
            {course.isLive && (
              <span className="badge bg-red-600 text-white font-bold text-[11px]">
                🔴 LIVE
              </span>
            )}
            {course.isFree && (
              <span className="badge bg-emerald-600 text-white font-bold text-[11px]">
                FREE
              </span>
            )}
          </div>

          <div className="absolute bottom-2.5 right-3 text-white text-[11px] font-semibold flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-[#FFB800]" />
            {course.validity}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-700 flex items-center gap-1.5">
              <img src={course.teacherAvatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150'} alt={course.teacher} className="w-5 h-5 rounded-full object-cover" />
              {course.teacher}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
              {course.rating}
            </div>
          </div>

          <h3 className="font-bold text-slate-900 text-base line-clamp-2 leading-snug group-hover:text-[#101936] transition-colors">
            {course.title}
          </h3>

          <div className="flex items-center gap-4 text-xs text-slate-600 pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <Video className="w-3.5 h-3.5 text-[#101936]" />
              {course.videosCount} Videos
            </span>
            <span className="flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
              {course.testsCount} Tests
            </span>
          </div>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="p-4 pt-0">
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            {course.isFree ? (
              <span className="text-xl font-extrabold text-emerald-600">FREE</span>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-slate-900">₹{course.price}</span>
                <span className="text-xs text-slate-400 line-through">₹{course.originalPrice}</span>
              </div>
            )}
          </div>

          <button 
            onClick={handleAction}
            className={`btn text-xs py-2 px-3.5 ${
              isEnrolled 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'btn-primary'
            }`}
          >
            {isEnrolled ? (
              <>
                <PlayCircle className="w-4 h-4" /> Continue Learning
              </>
            ) : (
              <>Buy Now</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
