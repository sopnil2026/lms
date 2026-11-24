import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsData } from '../data/testimonialsData';

export default function TestimonialsSection() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevTestimonial = () => {
    setCurrentIdx((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIdx((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-20 bg-white border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#f15524] font-bold text-xs sm:text-sm tracking-widest uppercase mb-2 inline-block">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              What Our Students Say
            </h2>
            <p className="mt-2 text-stone-500 text-sm sm:text-base max-w-xl">
              Hear directly from students who landed dream careers at leading global tech organizations.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full border border-stone-200 bg-stone-50 hover:bg-[#f15524] hover:text-white transition-colors"
              title="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full border border-stone-200 bg-stone-50 hover:bg-[#f15524] hover:text-white transition-colors"
              title="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid / Active Slider */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((item, index) => (
            <div
              key={item.id}
              className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                index === currentIdx
                  ? 'bg-orange-50/50 border-[#f15524]/40 shadow-xl shadow-orange-500/5 -translate-y-1'
                  : 'bg-[#faf8f5] border-stone-200/70 hover:border-stone-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Stars */}
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#f15524]/20" />
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 font-medium">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/60 flex items-center gap-3.5">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-stone-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
