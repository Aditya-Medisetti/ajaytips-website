import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Shield, BookOpen, Award, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#080F2D] text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
        
        {/* Col 1: Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-[58px] h-[58px] shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <img src="/logo.png" onError={(e) => { e.target.onerror = null; e.target.src = '/logo.svg'; }} alt="AJAY TIPS Logo" className="w-full h-full object-contain block" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-xl sm:text-2xl text-white tracking-tight flex items-center gap-1.5 leading-none">
                AJAYTIPS <span className="text-[#FFB800] text-xs font-extrabold px-1.5 py-0.5 rounded bg-[#101936] border border-[#FFB800]/30">PRO</span>
              </span>
              <div className="text-[9px] font-extrabold tracking-widest text-[#FFB800] uppercase mt-1 flex items-center gap-1.5">
                <span>LEARN</span>
                <span className="text-white font-black">•</span>
                <span>PRACTICE</span>
                <span className="text-white font-black">•</span>
                <span>SUCCESS</span>
              </div>
            </div>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            India's premier commercial competitive exam preparation platform. Specialized coaching, live interactive classes, CBT test series, hand-written notes, and shortcut tricks for SSC, RRB NTPC, Banking, Police, and AP/TS State Government Exams.
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#FFB800]" /> +91 98765-43210</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#FFB800]" /> support@ajaytips.com</span>
          </div>
        </div>

        {/* Col 2: Exam Categories */}
        <div>
          <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-[#FFB800] pl-2">
            Exam Categories
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/courses?category=SSC" className="hover:text-[#FFB800] transition-all">SSC CGL / CHSL / GD</Link></li>
            <li><Link to="/courses?category=RRB" className="hover:text-[#FFB800] transition-all">RRB NTPC & Group D</Link></li>
            <li><Link to="/courses?category=Banking" className="hover:text-[#FFB800] transition-all">IBPS PO & SBI Clerk</Link></li>
            <li><Link to="/courses?category=Police" className="hover:text-[#FFB800] transition-all">AP & TS Police SI / PC</Link></li>
            <li><Link to="/courses?category=FBO" className="hover:text-[#FFB800] transition-all">Forest Beat Officer (FBO)</Link></li>
            <li><Link to="/courses?category=apgovt" className="hover:text-[#FFB800] transition-all">APPSC Group 1, 2, 4</Link></li>
            <li><Link to="/courses?category=tsgovt" className="hover:text-[#FFB800] transition-all">TSPSC Recruitment</Link></li>
          </ul>
        </div>

        {/* Col 3: Quick Portals */}
        <div>
          <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-[#FFB800] pl-2">
            Portals & Tools
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/test-series" className="hover:text-[#FFB800] transition-all">CBT Online Test Engine</Link></li>
            <li><Link to="/live-classes" className="hover:text-[#FFB800] transition-all">Live Interactive Classes</Link></li>
            <li><Link to="/study-materials" className="hover:text-[#FFB800] transition-all">Free PDF & PYQ Notes</Link></li>
            <li><Link to="/offline-downloads" className="hover:text-[#FFB800] transition-all">Offline Content Manager</Link></li>
            <li><Link to="/profile" className="hover:text-[#FFB800] transition-all">Student Performance Dashboard</Link></li>
            <li><Link to="/chats" className="hover:text-[#FFB800] transition-all">Faculty Doubt Resolution</Link></li>
            <li><Link to="/admin" className="hover:text-[#FFB800] transition-all font-semibold">Admin / Teacher Dashboard</Link></li>
          </ul>
        </div>

        {/* Col 4: Corporate & Legal */}
        <div>
          <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
            Company & Policy
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/about-us" className="hover:text-white transition-all">About Ajaytips Academy</Link></li>
            <li><Link to="/contact-us" className="hover:text-white transition-all">Contact & Support</Link></li>
            <li><Link to="/settings" className="hover:text-white transition-all">System Preferences</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition-all">Privacy Policy</Link></li>
            <li><Link to="/terms-conditions" className="hover:text-white transition-all">Terms & Conditions</Link></li>
            <li><Link to="/terms-conditions#refund" className="hover:text-white transition-all">Refund & Cancellation Policy</Link></li>
          </ul>
        </div>

      </div>

      <div className="container pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 Ajaytips Competitive Exam Platform. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>Secured by 256-bit SSL</span>
          <span>•</span>
          <span>Razorpay Verified Payment Gateway</span>
        </p>
      </div>
    </footer>
  );
}
