import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Settings, CheckCircle2, 
  Lock, ChevronRight, ChevronLeft, BookOpen, Download
} from 'lucide-react';
import { useData } from '../context/DataContext';
import RazorpayModal from '../components/RazorpayModal';

export default function VideoLearning() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses, enrolledCourseIds } = useData();

  const course = courses.find((c) => c._id === courseId) || courses[0];
  const isEnrolled = enrolledCourseIds.includes(course._id);

  const [activeVideoIndex, setActiveVideoIndex] = useState(1);
  const [completedVideos, setCompletedVideos] = useState([0]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoQuality, setVideoQuality] = useState('720p');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progressPercent, setProgressPercent] = useState(42);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const playlist = [
    { id: 0, title: 'Introduction & Syllabus Orientation', chapter: 'Chapter 1: Overview', duration: '15 mins', isFreePreview: true },
    { id: 1, title: 'Number System & Remainder Theorem Shortcuts', chapter: 'Chapter 2: Number System', duration: '50 mins', isFreePreview: true },
    { id: 2, title: 'Percentage & Fractional Values Shortcuts', chapter: 'Chapter 3: Percentage', duration: '55 mins', isFreePreview: false },
    { id: 3, title: 'Symmetric Polynomial Identities (a³+b³+c³-3abc)', chapter: 'Chapter 4: Algebra', duration: '60 mins', isFreePreview: false }
  ];

  const currentVideo = playlist[activeVideoIndex];
  const isLocked = !isEnrolled && !currentVideo.isFreePreview;

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    if (activeVideoIndex < playlist.length - 1) setActiveVideoIndex(activeVideoIndex + 1);
  };

  const handlePrev = () => {
    if (activeVideoIndex > 0) setActiveVideoIndex(activeVideoIndex - 1);
  };

  const markCompleted = (id) => {
    if (!completedVideos.includes(id)) {
      setCompletedVideos([...completedVideos, id]);
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      
      {/* Top Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-extrabold text-sm md:text-base text-white line-clamp-1">{course.title}</h1>
            <p className="text-xs text-slate-400">Teacher: {course.teacher}</p>
          </div>
        </div>

        {!isEnrolled && (
          <button onClick={() => setShowPaymentModal(true)} className="btn btn-primary text-xs py-1.5 px-4 shadow-md">
            Unlock Full Course (₹{course.price})
          </button>
        )}
      </div>

      {/* Main Dual Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[calc(100vh-60px)]">
        
        {/* LEFT: Video Player */}
        <div className="lg:col-span-3 p-4 lg:p-6 space-y-4 flex flex-col justify-between">
          
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center group">
            {isLocked ? (
              <div className="p-8 text-center space-y-4 max-w-md bg-slate-900/95 rounded-2xl border border-slate-800">
                <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-lg text-white">Lecture Locked</h3>
                <p className="text-xs text-slate-300">
                  This video is locked. Enrolling in the course unlocks all 120+ lectures and PDF materials.
                </p>
                <button onClick={() => setShowPaymentModal(true)} className="btn btn-primary w-full text-xs py-3">
                  Buy Now (₹{course.price})
                </button>
              </div>
            ) : (
              <div className="w-full h-full relative flex items-center justify-center">
                <img src={course.thumbnail} alt={currentVideo.title} className="w-full h-full object-cover opacity-60" />
                
                {/* Controls Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 flex flex-col justify-between p-4">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="bg-black/60 px-3 py-1 rounded-full">{currentVideo.chapter}</span>
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-600 px-2.5 py-0.5 rounded">{videoQuality}</span>
                      <span className="bg-slate-800 px-2.5 py-0.5 rounded">{playbackSpeed}x</span>
                    </div>
                  </div>

                  <button 
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-2xl transition-transform hover:scale-110"
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1 fill-white" />}
                  </button>

                  <div className="space-y-2">
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden cursor-pointer">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: `${progressPercent}%` }}></div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <div className="flex items-center gap-3">
                        <button onClick={togglePlay}>
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button onClick={() => setIsMuted(!isMuted)}>
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <span className="font-mono text-[11px]">21:05 / {currentVideo.duration}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <select 
                          value={playbackSpeed}
                          onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                          className="bg-black/60 border border-slate-700 rounded px-2 py-0.5 text-[11px] text-white"
                        >
                          <option value={0.75}>0.75x</option>
                          <option value={1}>1.0x</option>
                          <option value={1.25}>1.25x</option>
                          <option value={1.5}>1.5x</option>
                          <option value={2}>2.0x</option>
                        </select>
                        <Maximize className="w-4 h-4 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-blue-400 font-bold uppercase">{currentVideo.chapter}</span>
              <h2 className="text-lg font-extrabold text-white">{currentVideo.title}</h2>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={handlePrev} disabled={activeVideoIndex === 0} className="btn btn-secondary text-xs py-2 px-3 disabled:opacity-40">
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button 
                onClick={() => markCompleted(currentVideo.id)}
                className={`btn text-xs py-2 px-3 ${completedVideos.includes(currentVideo.id) ? 'bg-emerald-600 text-white' : 'btn-outline text-white border-slate-700'}`}
              >
                <CheckCircle2 className="w-4 h-4" /> {completedVideos.includes(currentVideo.id) ? 'Completed' : 'Mark Completed'}
              </button>
              <button onClick={handleNext} disabled={activeVideoIndex === playlist.length - 1} className="btn btn-primary text-xs py-2 px-3 disabled:opacity-40">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT: Course Playlist */}
        <div className="bg-slate-900 border-l border-slate-800 p-4 space-y-4 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-500" /> Course Playlist
              </h3>
              <span className="text-xs font-bold text-slate-400">
                {completedVideos.length}/{playlist.length} Done
              </span>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              {playlist.map((item, idx) => {
                const isActive = idx === activeVideoIndex;
                const isItemLocked = !isEnrolled && !item.isFreePreview;
                const isDone = completedVideos.includes(item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveVideoIndex(idx)}
                    className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      isActive ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isItemLocked ? (
                        <Lock className="w-4 h-4 text-slate-500" />
                      ) : (
                        <Play className={`w-4 h-4 ${isActive ? 'text-blue-400 fill-blue-400' : 'text-slate-400'}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold line-clamp-2 ${isActive ? 'text-blue-300' : 'text-slate-200'}`}>{item.title}</p>
                      <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500">
                        <span>{item.duration}</span>
                        {item.isFreePreview && <span className="text-emerald-400 font-bold">Free Preview</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {showPaymentModal && (
        <RazorpayModal course={course} onClose={() => setShowPaymentModal(false)} />
      )}

    </div>
  );
}
