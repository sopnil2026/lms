import React, { useState } from 'react';
import { 
  X, 
  Star, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Globe2, 
  Award, 
  ChevronDown, 
  Play, 
  ShoppingCart, 
  Sparkles,
  Share2
} from 'lucide-react';

export default function CourseDetailModal({
  course,
  onClose,
  onStartCourse,
  onAddToCart,
  isInCart,
  isEnrolled,
  onShare
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [openModuleIdx, setOpenModuleIdx] = useState(0);

  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}>
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-8 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#faf8f5]">
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${course.badgeColor || 'bg-[#f15524] text-white'}`}>
              {course.category}
            </span>
            <span className="text-xs font-medium text-stone-500">
              {course.level}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onShare && onShare(course.title)}
              className="p-2 text-stone-500 hover:text-[#f15524] hover:bg-white rounded-full transition-colors"
              title="Share Course"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-slate-900 hover:bg-stone-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Hero Row: Title & Action Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 cols: Title & Overview */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                {course.title}
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                {course.description}
              </p>

              {/* Course Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-600 pb-6 border-b border-stone-100">
                <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>5.0</span>
                  <span className="text-stone-400 font-normal">({course.reviewsCount} reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-stone-600">
                  <Clock className="w-4 h-4 text-stone-400" />
                  <span>{course.duration}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-stone-600">
                  <BookOpen className="w-4 h-4 text-stone-400" />
                  <span>{course.lessonsCount} lessons</span>
                </div>
              </div>

              {/* Instructor Bio */}
              <div className="flex items-center gap-4 pt-4">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-200"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Taught by {course.instructor.name}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {course.instructor.role} • {course.instructor.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Video Preview & CTA Box */}
            <div className="lg:col-span-5 bg-[#faf8f5] p-5 rounded-2xl border border-stone-200">
              <div className="relative rounded-xl overflow-hidden aspect-video bg-black/80 mb-4 group cursor-pointer"
                   onClick={() => onStartCourse(course)}>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#f15524] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-1 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[11px] font-bold">
                  Preview Course
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-black text-slate-900">${course.price}</span>
                {course.originalPrice && (
                  <span className="text-sm line-through text-stone-400">
                    ${course.originalPrice}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded ml-auto">
                  65% OFF
                </span>
              </div>

              <div className="space-y-2.5">
                {isEnrolled ? (
                  <button
                    onClick={() => onStartCourse(course)}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Continue Learning</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => onStartCourse(course, true)} // instant enroll & open
                      className="w-full py-3.5 bg-[#f15524] hover:bg-[#e04818] text-white font-extrabold rounded-xl shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Enroll Now — ${course.price}</span>
                    </button>

                    <button
                      onClick={() => onAddToCart(course)}
                      className={`w-full py-3 rounded-xl font-bold text-sm border transition-all flex items-center justify-center gap-2 ${
                        isInCart
                          ? 'bg-amber-50 border-amber-300 text-amber-900'
                          : 'bg-white border-stone-300 text-slate-700 hover:bg-stone-50'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>{isInCart ? 'In Your Cart' : 'Add to Cart'}</span>
                    </button>
                  </>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-stone-200/60 space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Full lifetime access to 18+ video lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Shareable certificate of completion</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Downloadable project starter assets</span>
                </div>
              </div>
            </div>

          </div>

          {/* What You'll Learn Section */}
          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200/80">
            <h3 className="font-extrabold text-slate-900 text-base mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#f15524]" />
              <span>What You'll Master in this Course</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.learningPoints?.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f15524] mt-2 shrink-0"></div>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Breakdown Accordion */}
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg mb-4">
              Curriculum ({course.curriculum?.length || 3} Modules)
            </h3>
            
            <div className="space-y-3">
              {course.curriculum?.map((module, mIdx) => (
                <div
                  key={mIdx}
                  className="border border-stone-200 rounded-xl overflow-hidden bg-white"
                >
                  <button
                    onClick={() => setOpenModuleIdx(openModuleIdx === mIdx ? -1 : mIdx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm">
                      {module.module}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-stone-500 font-semibold">
                        {module.lessons.length} lessons
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                          openModuleIdx === mIdx ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {openModuleIdx === mIdx && (
                    <div className="border-t border-stone-100 divide-y divide-stone-100 bg-stone-50/50">
                      {module.lessons.map((lesson, lIdx) => (
                        <div
                          key={lesson.id}
                          className="px-5 py-3 flex items-center justify-between text-xs sm:text-sm text-stone-700 hover:bg-white"
                        >
                          <div className="flex items-center gap-3">
                            <Play className="w-3.5 h-3.5 text-[#f15524]" />
                            <span className="font-medium text-slate-800">{lesson.title}</span>
                          </div>
                          <span className="text-stone-400 font-mono text-xs">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
