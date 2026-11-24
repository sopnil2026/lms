import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function InstructorBanner({ onOpenAuth }) {
  return (
    <section id="instructors" className="py-16 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-stone-900 to-slate-900 text-white overflow-hidden p-8 sm:p-14 shadow-2xl">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#f15524]/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-300 text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Become An Instructor</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
                Share Your Knowledge With Over <span className="text-[#f15524]">18 Million</span> Students Worldwide
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
                Teach what you love. Edukon provides the creator tools, high-speed video hosting, integrated community forums, and automated revenue payouts so you can focus on building outstanding courses.
              </p>

              <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-stone-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#f15524]" />
                  <span>Earn up to 85% revenue share</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#f15524]" />
                  <span>Dedicated Creator Success Manager</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#f15524]" />
                  <span>Automated grading and certificates</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-center items-center lg:items-end gap-4">
              <button
                onClick={() => onOpenAuth('signup')}
                className="w-full sm:w-auto px-8 py-4 bg-[#f15524] hover:bg-[#e04818] text-white font-extrabold rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>Start Teaching Today</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-stone-400 text-center">
                Free to get started • Instant application review
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
