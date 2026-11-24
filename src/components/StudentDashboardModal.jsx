import React, { useState } from 'react';
import { X, BookOpen, Award, Clock, Play, CheckCircle2, Flame, Sparkles } from 'lucide-react';

export default function StudentDashboardModal({
  isOpen,
  onClose,
  user,
  enrolledCourses = [],
  onOpenCoursePlayer,
  onOpenCertificate
}) {
  const [activeTab, setActiveTab] = useState('courses'); // courses, certificates

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}>
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-8 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header with Student Stats */}
        <div className="bg-gradient-to-r from-slate-900 to-stone-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-stone-400 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name || 'Student'}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-[#f15524]/40"
            />
            <div className="text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f15524]/20 text-[#f15524] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Edukon Student Portal</span>
              </div>
              <h2 className="text-2xl font-black text-white">
                {user?.name || 'Alex Morgan'}
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm mt-0.5">
                {user?.email || 'alex.morgan@edukon.edu'} • Enrolled in {enrolledCourses.length} Programs
              </p>

              {/* 3 Stats Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Flame className="w-4 h-4 fill-current" />
                  <span>5-Day Streak</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                  <Clock className="w-4 h-4" />
                  <span>34 Hours Learned</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Award className="w-4 h-4" />
                  <span>2 Certificates</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-[#faf8f5] px-6">
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-4 px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'courses'
                ? 'border-[#f15524] text-[#f15524]'
                : 'border-transparent text-stone-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Enrolled Courses ({enrolledCourses.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`py-4 px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'certificates'
                ? 'border-[#f15524] text-[#f15524]'
                : 'border-transparent text-stone-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Earned Certificates (1)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {activeTab === 'courses' ? (
            <div className="space-y-4">
              {enrolledCourses.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                  <p className="text-slate-700 font-bold">No enrolled courses yet</p>
                  <p className="text-xs text-stone-500 mt-1">Pick a course from our featured catalog to start learning!</p>
                </div>
              ) : (
                enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 sm:p-5 rounded-2xl border border-stone-200 hover:border-orange-200 bg-white shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 transition-all"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-20 h-16 object-cover rounded-xl shrink-0"
                      />
                      <div>
                        <span className="text-[11px] font-bold text-[#f15524] uppercase">
                          {course.category}
                        </span>
                        <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                          {course.title}
                        </h4>
                        <p className="text-xs text-stone-500 mt-0.5">
                          Taught by {course.instructor.name} • 18 Lessons
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => {
                          onClose();
                          onOpenCoursePlayer(course);
                        }}
                        className="px-5 py-2.5 bg-[#f15524] hover:bg-[#e04818] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Resume Lesson</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {enrolledCourses.slice(0, 2).map((course) => (
                <div
                  key={course.id}
                  className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-amber-700 uppercase">
                      Verified Credential
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-sm mt-1">
                      {course.title}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1">
                      Completed with Grade A+ • 18 Hours
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenCertificate(course);
                    }}
                    className="mt-4 w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    View Official Certificate
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
