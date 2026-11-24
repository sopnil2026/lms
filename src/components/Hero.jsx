import React, { useState } from 'react';
import { Search, Sparkles, CheckCircle2, Users, BookOpen, Globe2, Award, ArrowRight } from 'lucide-react';

export default function Hero({ onSearch, onTagSelect }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchInput);
    }
    const coursesElem = document.getElementById('courses');
    if (coursesElem) {
      coursesElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickTag = (tag) => {
    setSearchInput(tag);
    if (onTagSelect) {
      onTagSelect(tag);
    }
    const coursesElem = document.getElementById('courses');
    if (coursesElem) {
      coursesElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-[#faf7f2] overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/50">
      
      {/* Background Decorative Rings */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-orange-200/60"></div>
        <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full border border-rose-200/50"></div>
        <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-blue-200/50"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-100/60 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="hero-stagger lg:col-span-6 xl:col-span-6 text-center lg:text-left pt-2 lg:pt-0">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-[#f15524] text-xs font-extrabold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#f15524]" />
              <span>Online Education</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] mb-6">
              Learn The Skills <br className="hidden sm:inline" />
              You Need <br className="hidden sm:inline" />
              <span className="text-[#f15524] relative">
                To Succeed
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#f15524]/20 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 50 0 100 10" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-stone-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Free online courses from the world’s leading experts. Join <span className="font-bold text-slate-800">18+ million</span> Learners today.
            </p>

            {/* Search Box Form */}
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white rounded-2xl sm:rounded-full p-2 sm:p-2.5 shadow-xl shadow-stone-300/40 border border-stone-200/80 max-w-xl mx-auto lg:mx-0 flex flex-col sm:flex-row items-center gap-2 mb-6 transition-all focus-within:ring-2 focus-within:ring-[#f15524]/30"
            >
              <div className="flex items-center gap-3 flex-1 px-4 w-full">
                <Search className="w-5 h-5 text-stone-400 shrink-0" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Keywords of your course"
                  className="w-full text-slate-800 placeholder-stone-400 text-sm sm:text-base bg-transparent border-none focus:outline-none py-2"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#f15524] hover:bg-[#e04818] active:scale-98 text-white font-bold text-sm sm:text-base rounded-xl sm:rounded-full shadow-md shadow-orange-500/30 transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <span>Search Course</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Most Popular Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-stone-600">
              <span className="font-semibold text-slate-700">Most Popular :</span>
              {['Figma', 'Adobe XD', 'Illustration', 'Photoshop'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleQuickTag(tag)}
                  className="px-3 py-1 bg-stone-100 hover:bg-orange-50 text-stone-600 hover:text-[#f15524] hover:border-orange-200 border border-stone-200 rounded-md font-medium transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>

          </div>

          {/* Right Image & Floating Pills Column */}
          <div className="hero-visual lg:col-span-6 xl:col-span-6 relative flex justify-center items-center">
            
            {/* Concentric Circle Aura Rings */}
            <div className="relative w-full max-w-[480px] lg:max-w-[530px] flex justify-center items-center">
              
              <div className="absolute inset-0 m-auto w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full border-2 border-dashed border-orange-200/80 animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute inset-0 m-auto w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border border-pink-200/70"></div>
              <div className="absolute inset-0 m-auto w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] bg-gradient-to-tr from-amber-200/30 via-orange-100/40 to-rose-200/30 rounded-full blur-xl"></div>

              {/* Main Student Image */}
              <div className="relative z-10 w-72 sm:w-96 lg:w-[400px]">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                  alt="Student learning with notebook"
                  className="w-full h-auto object-cover rounded-3xl shadow-2xl ring-8 ring-white/80"
                />

                {/* Floating Pill 1: 16M Students Happy (Blue) */}
                <div className="absolute -top-4 -left-6 sm:-left-12 z-20 animate-float bg-blue-600 text-white px-3.5 sm:px-4 py-2 rounded-full shadow-lg shadow-blue-500/30 flex items-center gap-2 font-bold text-xs sm:text-sm">
                  <Users className="w-4 h-4 text-blue-200 shrink-0" />
                  <span>16M Students Happy</span>
                </div>

                {/* Floating Pill 2: 130k+ Total Courses (Magenta / Pink) */}
                <div className="absolute top-8 -right-4 sm:-right-10 z-20 animate-float-delayed bg-[#e11d48] text-white px-3.5 sm:px-4 py-2 rounded-full shadow-lg shadow-rose-500/30 flex items-center gap-2 font-bold text-xs sm:text-sm">
                  <BookOpen className="w-4 h-4 text-rose-200 shrink-0" />
                  <span>130k+ Total Courses</span>
                </div>

                {/* Floating Pill 3: 89% Successful Students (Green) */}
                <div className="absolute top-1/2 -right-6 sm:-right-14 z-20 animate-float-slow bg-emerald-600 text-white px-3.5 sm:px-4 py-2 rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-2 font-bold text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
                  <span>89% Successful Students</span>
                </div>

                {/* Floating Pill 4: 25M+ Learners (Pink / Coral) */}
                <div className="absolute bottom-16 -left-4 sm:-left-8 z-20 animate-float bg-[#f43f5e] text-white px-3.5 sm:px-4 py-2 rounded-full shadow-lg shadow-pink-500/30 flex items-center gap-2 font-bold text-xs sm:text-sm">
                  <Award className="w-4 h-4 text-pink-200 shrink-0" />
                  <span>25M+ Learners</span>
                </div>

                {/* Floating Pill 5: 36+ Languages (Cyan) */}
                <div className="absolute -bottom-4 right-6 sm:right-12 z-20 animate-float-delayed bg-cyan-600 text-white px-3.5 sm:px-4 py-2 rounded-full shadow-lg shadow-cyan-500/30 flex items-center gap-2 font-bold text-xs sm:text-sm">
                  <Globe2 className="w-4 h-4 text-cyan-200 shrink-0" />
                  <span>36+ Languages</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
