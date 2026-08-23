import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, Bell, User, Menu, X, Shield, ChevronDown, LogOut, Award, CreditCard, CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function Header() {
  const { user, logout, switchRole } = useAuth();
  const { searchQuery, setSearchQuery } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isCurrentPath = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="header-sticky bg-white border-b border-slate-200 sticky top-0 z-50 shadow-2xs">
      
      {/* 1. TOP ANNOUNCEMENT BAR (Matching Reference Screenshot) */}
      <div className="announcement-bar bg-[#080F2D] text-white py-1.5 text-xs font-medium border-b border-slate-800">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-slate-100">
              ⚡ India's Competitive Exam EdTech Platform
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-200 font-medium">Helpline: +91 98765 43210</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-[#FFB800] font-bold">
                  {user.role === 'admin' ? 'Admin Mode' : user.role === 'teacher' ? 'Faculty Mode' : 'Student Mode'}
                </span>
                <span className="text-slate-500">|</span>
                {user.role === 'student' ? (
                  <button onClick={() => switchRole('admin')} className="hover:underline text-white font-bold">
                    Switch to Admin
                  </button>
                ) : (
                  <button onClick={() => switchRole('student')} className="hover:underline text-white font-bold">
                    Switch to Student
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="hover:underline text-white font-semibold">Student Login</Link>
                <span className="text-slate-500">|</span>
                <Link to="/admin" className="hover:underline text-[#FFB800] font-bold">Admin Portal</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION (Matching Reference Screenshot) */}
      <div className="container py-2 md:py-2.5 flex items-center justify-between gap-3">
        
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-[50px] h-[50px] sm:w-[58px] sm:h-[58px] md:w-[66px] md:h-[66px] shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
            <img 
              src="/logo.png" 
              onError={(e) => { e.target.onerror = null; e.target.src = '/logo.svg'; }}
              alt="AJAY TIPS Logo" 
              className="w-full h-full object-contain block"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="font-extrabold text-base xs:text-lg sm:text-xl md:text-2xl tracking-tight text-[#0F172A] leading-none flex items-center gap-1.5 whitespace-nowrap">
              AJAYTIPS <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-[#FFB800] text-[#080F2D] font-extrabold shadow-2xs">PRO</span>
            </div>
            <div className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-[10.5px] font-extrabold tracking-[0.14em] text-[#080F2D] uppercase mt-1 sm:mt-1.5 whitespace-nowrap flex items-center gap-1 sm:gap-1.5">
              <span>LEARN</span>
              <span className="text-[#FFB800] font-black text-[9px] sm:text-[10px]">•</span>
              <span>PRACTICE</span>
              <span className="text-[#FFB800] font-black text-[9px] sm:text-[10px]">•</span>
              <span>SUCCESS</span>
            </div>
          </div>
        </Link>

        {/* Center Desktop Navigation (Exact Layout & Visual Emphasis as Reference Screenshot) */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3 text-xs">
          
          {/* 1. Home (Soft Yellow Pill Active State) */}
          <Link 
            to="/" 
            className={`px-4 py-2 rounded-xl transition-all font-bold text-xs flex items-center justify-center ${
              isCurrentPath('/') && location.pathname === '/'
                ? 'bg-[#FFF2B2] text-[#0F172A] shadow-2xs font-extrabold' 
                : 'text-[#0F172A] hover:bg-slate-100 font-semibold'
            }`}
          >
            Home
          </Link>

          {/* 2. Courses */}
          <Link 
            to="/courses" 
            className={`px-3 py-1.5 rounded-xl transition-all font-semibold text-xs flex items-center justify-center ${
              isCurrentPath('/courses') 
                ? 'bg-[#FFF2B2] text-[#0F172A] font-extrabold' 
                : 'text-[#0F172A] hover:bg-slate-100 font-semibold'
            }`}
          >
            Courses
          </Link>

          {/* 3. Test Series (Stacked Two-Line Text) */}
          <Link 
            to="/test-series" 
            className={`px-3 py-1 rounded-xl transition-all text-xs text-center leading-tight flex flex-col items-center justify-center ${
              isCurrentPath('/test-series') 
                ? 'bg-[#FFF2B2] text-[#0F172A] font-extrabold' 
                : 'text-[#0F172A] hover:bg-slate-100 font-semibold'
            }`}
          >
            <span>Test</span>
            <span>Series</span>
          </Link>

          {/* 4. Live Classes (Red Dot + Stacked Two-Line Text) */}
          <Link 
            to="/live-classes" 
            className={`px-3 py-1 rounded-xl transition-all text-xs text-center leading-tight flex items-center gap-1.5 justify-center ${
              isCurrentPath('/live-classes') 
                ? 'bg-[#FFF2B2] text-[#0F172A] font-extrabold' 
                : 'text-[#0F172A] hover:bg-slate-100 font-semibold'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 inline-block animate-pulse"></span>
            <div className="flex flex-col items-start leading-tight">
              <span>Live</span>
              <span>Classes</span>
            </div>
          </Link>

          {/* 5. Study Materials (Stacked Two-Line Text) */}
          <Link 
            to="/study-materials" 
            className={`px-3 py-1 rounded-xl transition-all text-xs text-center leading-tight flex flex-col items-center justify-center ${
              isCurrentPath('/study-materials') 
                ? 'bg-[#FFF2B2] text-[#0F172A] font-extrabold' 
                : 'text-[#0F172A] hover:bg-slate-100 font-semibold'
            }`}
          >
            <span>Study</span>
            <span>Materials</span>
          </Link>

          {/* 6. Free Content (Stacked Two-Line Text) */}
          <Link 
            to="/free-materials" 
            className={`px-3 py-1 rounded-xl transition-all text-xs text-center leading-tight flex flex-col items-center justify-center ${
              isCurrentPath('/free-materials') 
                ? 'bg-[#FFF2B2] text-[#0F172A] font-extrabold' 
                : 'text-[#0F172A] hover:bg-slate-100 font-semibold'
            }`}
          >
            <span>Free</span>
            <span>Content</span>
          </Link>
        </nav>

        {/* Right Search Bar, Notifications & Auth Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Search Box (Pill Input matching reference) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative w-40 lg:w-52 xl:w-56 shrink-0">
            <input
              type="text"
              placeholder="Search courses, exams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all font-medium text-slate-800"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          </form>

          {/* Notifications Icon */}
          <div className="relative shrink-0">
            <button 
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-700 relative transition-all"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-[#0F172A]" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-sm text-[#0F172A]">Notifications</h4>
                  <Link to="/notifications" onClick={() => setNotifDropdownOpen(false)} className="text-xs text-[#0F172A] font-bold hover:text-[#FFB800]">
                    View All
                  </Link>
                </div>
                <div className="py-2 space-y-2 max-h-64 overflow-y-auto text-xs">
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                    <p className="font-bold text-amber-900">🎓 New course available</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">SSC CGL 2026 Pure Maths Masterclass is live.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="font-bold text-slate-800">🔴 Live class starts in 30 minutes</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">Prof. S. R. Sharma Doubt Clearing Session.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                    <p className="font-bold text-emerald-900">💳 Payment successful</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">Your payment of ₹349 was verified.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Auth Buttons: LOGIN & REGISTER */}
          {user ? (
            <div className="relative shrink-0">
              <button 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-slate-100 transition-all border border-slate-200"
              >
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-[#0F172A]" />
                <span className="hidden sm:inline text-xs font-bold text-slate-800 max-w-[100px] truncate">{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in text-xs">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                    <p className="text-slate-500 text-[11px] truncate">{user.email}</p>
                    <span className="inline-block mt-1 text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                      {user.role}
                    </span>
                  </div>

                  <Link to="/profile" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">
                    <User className="w-4 h-4 text-[#0F172A]" /> Profile Dashboard
                  </Link>
                  <Link to="/performance" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">
                    <Award className="w-4 h-4 text-emerald-600" /> My Performance
                  </Link>
                  <Link to="/payments" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">
                    <CreditCard className="w-4 h-4 text-purple-600" /> Payment Receipts
                  </Link>
                  <Link to="/assignments" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" /> My Assignments
                  </Link>

                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 font-bold text-indigo-600 hover:bg-indigo-50">
                      <Shield className="w-4 h-4 text-indigo-600" /> Admin Control Portal
                    </Link>
                  )}

                  <div className="border-t border-slate-100 my-1"></div>
                  <button 
                    onClick={() => { logout(); setUserDropdownOpen(false); navigate('/'); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 font-bold text-red-600 hover:bg-red-50 text-left"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <Link 
                to="/login" 
                className="btn btn-secondary text-xs py-2 px-3.5 whitespace-nowrap shrink-0 border border-slate-200 font-bold"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="btn btn-primary text-xs py-2 px-4 whitespace-nowrap shrink-0 bg-[#FFB800] text-[#080F2D] font-extrabold hover:bg-[#E6A600] shadow-2xs"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#0F172A] hover:bg-slate-100 shrink-0"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. MOBILE SIDE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative w-72 max-w-full bg-white h-full shadow-2xl p-5 flex flex-col justify-between overflow-y-auto z-10 animate-fade-in">
            <div className="space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                    <img 
                      src="/logo.png" 
                      onError={(e) => { e.target.onerror = null; e.target.src = '/logo.svg'; }}
                      alt="AJAYTIPS Logo" 
                      className="w-full h-full object-contain block"
                    />
                  </div>
                  <div>
                    <div className="font-extrabold text-[#0F172A] text-sm sm:text-base flex items-center gap-1 leading-none">
                      AJAYTIPS <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#FFB800] text-[#080F2D] font-extrabold">PRO</span>
                    </div>
                    <div className="text-[7.5px] font-extrabold tracking-wider text-[#080F2D] uppercase mt-1 flex items-center gap-1">
                      <span>LEARN</span>
                      <span className="text-[#FFB800] font-black">•</span>
                      <span>PRACTICE</span>
                      <span className="text-[#FFB800] font-black">•</span>
                      <span>SUCCESS</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Auth Buttons */}
              {!user && (
                <div className="grid grid-cols-2 gap-2 pt-1 pb-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary text-xs py-2 text-center font-bold">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary text-xs py-2 text-center bg-[#FFB800] text-[#080F2D] font-extrabold">
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search courses, exams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#FFB800] focus:border-transparent font-medium"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </form>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col gap-1 text-xs font-semibold">
                <Link 
                  to="/" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={`py-2.5 px-3 rounded-xl flex items-center justify-between ${
                    location.pathname === '/' ? 'bg-[#FFF2B2] text-[#0F172A] font-extrabold' : 'hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  Home
                </Link>

                <Link 
                  to="/courses" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={`py-2.5 px-3 rounded-xl flex items-center justify-between ${
                    isCurrentPath('/courses') ? 'bg-[#FFF2B2] text-[#0F172A] font-extrabold' : 'hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  Courses
                </Link>

                <Link 
                  to="/test-series" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={`py-2.5 px-3 rounded-xl flex items-center justify-between ${
                    isCurrentPath('/test-series') ? 'bg-[#FFF2B2] text-[#0F172A] font-extrabold' : 'hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  Test Series
                </Link>

                <Link 
                  to="/live-classes" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={`py-2.5 px-3 rounded-xl flex items-center justify-between ${
                    isCurrentPath('/live-classes') ? 'bg-[#FFF2B2] text-[#0F172A] font-extrabold' : 'hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span>Live Classes</span>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                </Link>

                <Link 
                  to="/study-materials" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={`py-2.5 px-3 rounded-xl flex items-center justify-between ${
                    isCurrentPath('/study-materials') ? 'bg-[#FFF2B2] text-[#0F172A] font-extrabold' : 'hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  Study Materials
                </Link>

                <Link 
                  to="/free-materials" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={`py-2.5 px-3 rounded-xl flex items-center justify-between ${
                    isCurrentPath('/free-materials') ? 'bg-[#FFF2B2] text-[#0F172A] font-extrabold' : 'hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  Free Content
                </Link>
                
                <div className="border-t border-slate-100 my-2 pt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Student Portals
                </div>

                <Link to="/profile?tab=courses" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-xl hover:bg-slate-100 text-slate-700">My Enrolled Courses</Link>
                <Link to="/performance" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-xl hover:bg-slate-100 text-slate-700">My Performance</Link>
                <Link to="/payments" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-xl hover:bg-slate-100 text-slate-700">Payment History</Link>
                <Link to="/assignments" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-xl hover:bg-slate-100 text-slate-700">Assignments</Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-xl hover:bg-slate-100 text-slate-700">Student Profile</Link>
                <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-xl hover:bg-slate-100 text-slate-700">Settings</Link>
              </nav>

            </div>

            {/* Logout button */}
            {user && (
              <button 
                onClick={() => { logout(); setMobileMenuOpen(false); navigate('/'); }}
                className="w-full btn bg-red-50 text-red-600 hover:bg-red-100 text-xs py-2.5 font-bold flex items-center justify-center gap-2 mt-4"
              >
                <LogOut className="w-4 h-4" /> Logout Account
              </button>
            )}
          </div>
        </div>
      )}

    </header>
  );
}
