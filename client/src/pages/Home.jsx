import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Award, Video, FileText, Play, Sparkles, CheckCircle2, 
  Flame, ChevronRight, Users, Star, ShieldCheck, Zap, Radio, Clock, Gift, BookOpen
} from 'lucide-react';
import { useData } from '../context/DataContext';
import CourseCard from '../components/CourseCard';
import TestCard from '../components/TestCard';
import RazorpayModal from '../components/RazorpayModal';

export default function Home() {
  const { courses, tests, liveClasses, materials } = useData();
  const navigate = useNavigate();

  const [selectedCourseForPayment, setSelectedCourseForPayment] = useState(null);

  const examCategories = [
    { name: 'SSC Exams', code: 'CGL / CHSL / GD', icon: '🏆', category: 'SSC', count: '45+ Courses' },
    { name: 'RRB Railway', code: 'NTPC / Group D', icon: '🚆', category: 'RRB', count: '38+ Courses' },
    { name: 'Banking', code: 'IBPS PO / SBI Clerk', icon: '🏦', category: 'Banking', count: '25+ Courses' },
    { name: 'Police Exams', code: 'SI / Constable', icon: '🛡️', category: 'Police', count: '30+ Courses' },
    { name: 'SI / PC', code: 'Special Squad', icon: '⚡', category: 'SI/PC', count: '20+ Courses' },
    { name: 'FBO Forest', code: 'Forest Officer', icon: '🌲', category: 'FBO', count: '15+ Courses' },
    { name: 'AP Govt Jobs', code: 'APPSC Group 1, 2, 4', icon: '🏛️', category: 'apgovt', count: '40+ Courses' },
    { name: 'Telangana Govt', code: 'TSPSC Group 1, 2, 3', icon: '📍', category: 'tsgovt', count: '35+ Courses' }
  ];

  const testimonials = [
    {
      name: 'Venkatesh Rao',
      exam: 'Selected in SSC CGL 2025 (Income Tax Inspector)',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      quote: 'Prof. Sharma sir pure maths shortcuts changed my score completely. I scored 48/50 in Math section!'
    },
    {
      name: 'Pooja Reddy',
      exam: 'Selected in AP Police SI 2025 (Rank 14)',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      quote: 'The CBT Online Test Series gave me real exam simulation. All India Rank accuracy was spot on.'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION (450–550px Desktop Height, Gradient, Full Width Container) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#080F2D] to-[#101936] text-white min-h-[480px] flex items-center py-12">
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 animate-fade-in">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#FFB800] text-[#080F2D] shadow-md">
              ⚡ #1 PLATFORM FOR SSC, RRB & STATE GOVERNMENT EXAMS
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Crack Your Competitive Exam With Confidence
            </h1>

            <p className="text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
              Prepare for SSC CGL, RRB NTPC, Banking, Police SI/PC, FBO and Government Exams with India's top educators, live classes, video courses, and CBT online test series.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/courses" className="btn btn-primary text-sm py-3.5 px-7 shadow-xl">
                Explore Courses <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/free-materials" className="btn btn-secondary text-sm py-3.5 px-7">
                Start Free Learning
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 150,000+ Enrolled Aspirants
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 1,200+ CBT Mock Tests
              </div>
            </div>
          </div>

          {/* Right Hero Graphics / Live Metrics Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                  <span className="font-extrabold text-xs text-white">LIVE CLASSROOM NOW ACTIVE</span>
                </div>
                <span className="badge bg-amber-400 text-slate-950 font-bold text-[10px]">98.4% SCORE RATE</span>
              </div>

              <div className="aspect-video rounded-2xl overflow-hidden relative bg-slate-900 border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600" 
                  alt="Live Education"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-2xl">
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                <div className="bg-black/30 p-3 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Next Batch</span>
                  <span className="font-extrabold text-amber-300">Starts Today</span>
                </div>
                <div className="bg-black/30 p-3 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Validity</span>
                  <span className="font-extrabold text-emerald-300">Lifetime Access</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. EXAM CATEGORIES ("Prepare For Your Dream Exam" - 4 per row desktop) */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Prepare For Your Dream Exam</h2>
            <p className="text-xs text-slate-500 mt-1">Structured comprehensive coaching tailored to official recruitment patterns</p>
          </div>
          <Link to="/courses" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid-categories">
          {examCategories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/courses?category=${cat.category}`}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all text-center space-y-2 group"
            >
              <div className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600">{cat.name}</h3>
              <p className="text-xs text-slate-500">{cat.code}</p>
              <span className="inline-block text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. COURSE FILTER CARDS (4 LARGE CARDS: Live, Test Series, Recorded, All) */}
      <section className="container">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900">Choose Your Learning Mode</h2>
          <p className="text-xs text-slate-500">Pick the format that best fits your study routine</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div 
            onClick={() => navigate('/live-classes')} 
            className="cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-red-600 to-rose-800 text-white space-y-4 shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-bold text-2xl">🔴</div>
            <div>
              <h3 className="font-extrabold text-lg">Live Courses</h3>
              <p className="text-xs text-red-100 mt-1">Interactive live streaming with instant faculty doubt clearing.</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-white group-hover:underline">
              Join Live Batches <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div 
            onClick={() => navigate('/test-series')} 
            className="cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white space-y-4 shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-bold text-2xl">📝</div>
            <div>
              <h3 className="font-extrabold text-lg">Test Series</h3>
              <p className="text-xs text-blue-100 mt-1">Real NTA/SSC pattern Computer-Based Online Test Engine.</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-white group-hover:underline">
              Attempt Mocks <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div 
            onClick={() => navigate('/courses?type=Recorded Courses')} 
            className="cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white space-y-4 shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-bold text-2xl">📹</div>
            <div>
              <h3 className="font-extrabold text-lg">Recorded Courses</h3>
              <p className="text-xs text-emerald-100 mt-1">Self-paced high-definition video lectures & PDF formula notes.</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-white group-hover:underline">
              Browse Recorded <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div 
            onClick={() => navigate('/courses')} 
            className="cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-700 text-white space-y-4 shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-bold text-2xl">🎓</div>
            <div>
              <h3 className="font-extrabold text-lg">All Courses</h3>
              <p className="text-xs text-amber-100 mt-1">Explore complete course library for all competitive exams.</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-white group-hover:underline">
              Explore All <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>
      </section>

      {/* 4. POPULAR COURSES */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Popular Courses</h2>
            </div>
            <p className="text-xs text-slate-500">Highest rated batches chosen by top rankers</p>
          </div>
          <Link to="/courses" className="btn btn-outline text-xs py-2 px-4">
            View Marketplace
          </Link>
        </div>

        <div className="grid-courses">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onBuyNow={(crs) => setSelectedCourseForPayment(crs)}
            />
          ))}
        </div>
      </section>

      {/* 5. LIVE CLASSES PREVIEW */}
      <section className="container">
        <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              <h2 className="text-xl md:text-2xl font-extrabold text-white">Live Classroom Sessions</h2>
            </div>
            <Link to="/live-classes" className="btn bg-red-600 text-white hover:bg-red-700 text-xs py-2 px-4">
              View All Live Streams
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {liveClasses.map((item) => (
              <div key={item._id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="aspect-video rounded-xl overflow-hidden relative">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover opacity-75" />
                  <span className="absolute top-2 left-2 badge bg-red-600 text-white font-bold text-[10px]">
                    🔴 {item.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm line-clamp-1">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.teacher} • {item.scheduledTime}</p>
                <Link to="/live-classes" className="btn btn-primary w-full text-xs py-2">
                  Join Stream
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TEST SERIES PREVIEW */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">All India CBT Test Series</h2>
            <p className="text-xs text-slate-500">Practice with real online test engine and live countdown timer</p>
          </div>
          <Link to="/test-series" className="btn btn-outline text-xs py-2 px-4">
            Explore All Tests
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((t) => (
            <TestCard key={t._id} test={t} />
          ))}
        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="bg-white py-12 border-y border-slate-200">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto text-xl font-bold">
              🎓
            </div>
            <h3 className="font-extrabold text-base text-slate-900">India's Top Faculty</h3>
            <p className="text-xs text-slate-500">12+ Yrs experienced educators with shortcut problem-solving methods.</p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
              📊
            </div>
            <h3 className="font-extrabold text-base text-slate-900">All India CBT Rank</h3>
            <p className="text-xs text-slate-500">Real-time percentile & rank breakdown after submitting mock tests.</p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto text-xl font-bold">
              📚
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Hand-written PDF Notes</h3>
            <p className="text-xs text-slate-500">Downloadable formula capsules, PYQs, and daily current affairs.</p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-xl font-bold">
              💬
            </div>
            <h3 className="font-extrabold text-base text-slate-900">24/7 Doubt Resolution</h3>
            <p className="text-xs text-slate-500">Direct student-teacher doubt chat and active peer discussion groups.</p>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="container">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Student Success Stories</h2>
          <p className="text-xs text-slate-500">Hear from candidates who cleared their target exams with Ajaytips Pro</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-600" />
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{t.name}</h3>
                  <p className="text-xs text-emerald-600 font-bold">{t.exam}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. CALL TO ACTION BANNER */}
      <section className="container">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-4">
          <h2 className="text-2xl md:text-4xl font-extrabold">Ready to Crack Your Competitive Exam?</h2>
          <p className="text-xs md:text-sm text-slate-200 max-w-xl mx-auto">
            Join thousands of successful aspirants preparing with Ajaytips Pro. Start your free trial batch today!
          </p>
          <div className="pt-2">
            <Link to="/register" className="btn btn-accent text-sm py-3 px-8 shadow-xl">
              Register Student Account Now
            </Link>
          </div>
        </div>
      </section>

      {/* Payment Checkout Modal */}
      {selectedCourseForPayment && (
        <RazorpayModal
          course={selectedCourseForPayment}
          onClose={() => setSelectedCourseForPayment(null)}
          onSuccess={() => {
            navigate(`/video-learning/${selectedCourseForPayment._id}`);
          }}
        />
      )}

    </div>
  );
}
