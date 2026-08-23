import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, Check } from 'lucide-react';
import { useData } from '../context/DataContext';
import CourseCard from '../components/CourseCard';
import RazorpayModal from '../components/RazorpayModal';

export default function Store() {
  const { courses } = useData();
  const [searchParams] = useSearchParams();

  const initialCat = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState('All');
  const [freePaidFilter, setFreePaidFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCourseForPayment, setSelectedCourseForPayment] = useState(null);

  const categories = ['All', 'SSC', 'RRB', 'Banking', 'Police', 'SI/PC', 'FBO', 'apgovt', 'tsgovt', 'Railway', 'other'];

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      if (selectedCategory !== 'All' && c.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      if (selectedType !== 'All' && c.courseType !== selectedType) return false;
      if (freePaidFilter === 'free' && !c.isFree) return false;
      if (freePaidFilter === 'paid' && c.isFree) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchTitle = c.title.toLowerCase().includes(q);
        const matchTeacher = c.teacher.toLowerCase().includes(q);
        const matchDesc = c.description.toLowerCase().includes(q);
        if (!matchTitle && !matchTeacher && !matchDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      return b.studentsCount - a.studentsCount;
    });
  }, [courses, selectedCategory, selectedType, freePaidFilter, searchTerm, sortBy]);

  return (
    <div className="container py-8 space-y-6">
      
      {/* Title & Search Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Explore Courses</h1>
          <p className="text-xs text-slate-500">Comprehensive competitive exam preparation batches</p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search courses, exams, subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-bold text-slate-700">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="popular">Popularity</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Filters Sidebar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 h-fit space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" /> Category Filters
            </h3>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedType('All');
                setFreePaidFilter('all');
                setSearchTerm('');
              }}
              className="text-[11px] font-bold text-blue-600 hover:underline"
            >
              Reset
            </button>
          </div>

          {/* Exam Category Filters */}
          <div className="space-y-2">
            <label className="font-bold text-xs text-slate-800 uppercase tracking-wider">Exam Category</label>
            <div className="space-y-1 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition-all ${
                    selectedCategory === cat ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat === 'apgovt' ? 'AP Govt Jobs' : cat === 'tsgovt' ? 'Telangana Govt' : cat}</span>
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Course Format Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <label className="font-bold text-xs text-slate-800 uppercase tracking-wider">Course Format</label>
            <div className="space-y-1 text-xs">
              {['All', 'Live Courses', 'Recorded Courses', 'Test Series'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition-all ${
                    selectedType === type ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{type}</span>
                  {selectedType === type && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4-Column Course Grid */}
        <div className="lg:col-span-3">
          {filteredCourses.length > 0 ? (
            <div className="grid-courses">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  onBuyNow={(crs) => setSelectedCourseForPayment(crs)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <div className="text-4xl">🔍</div>
              <h3 className="font-bold text-slate-800 text-lg">No Courses Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No courses match your current search filters. Try adjusting or clearing search.
              </p>
            </div>
          )}
        </div>

      </div>

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
