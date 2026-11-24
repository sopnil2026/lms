import React, { useState } from 'react';
import { 
  Monitor, 
  Building2, 
  Briefcase, 
  BarChart3, 
  GraduationCap, 
  Cpu, 
  Palette, 
  Megaphone,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { categoriesData } from '../data/categoriesData';

export default function CategoriesSection({ onSelectCategory, selectedCategory }) {
  const [showAll, setShowAll] = useState(false);

  // Icon mapping
  const iconMap = {
    Monitor: Monitor,
    Building2: Building2,
    Briefcase: Briefcase,
    BarChart3: BarChart3,
    GraduationCap: GraduationCap,
    Cpu: Cpu,
    Palette: Palette,
    Megaphone: Megaphone,
  };

  const displayedCategories = showAll ? categoriesData : categoriesData.slice(0, 6);

  return (
    <section id="categories" className="py-20 bg-white border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#f15524] font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 inline-block">
            POPULAR CATEGORY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Popular Category For Learn
          </h2>
          <p className="mt-3 text-stone-500 text-sm sm:text-base">
            Explore diverse topics taught by verified industry veterans and certified practitioners.
          </p>
        </div>

        {/* Categories Grid (6 Cards exactly matching image) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {displayedCategories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Monitor;
            const isSelected = selectedCategory === cat.title;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.title)}
                className={`group cursor-pointer rounded-2xl p-6 text-center transition-all duration-300 border flex flex-col items-center justify-between ${
                  isSelected
                    ? 'border-[#f15524] bg-orange-50/70 shadow-lg shadow-orange-500/10 scale-105'
                    : 'border-stone-100 bg-[#fdfdfc] hover:border-orange-200 hover:shadow-xl hover:shadow-stone-200/50 hover:-translate-y-1.5'
                }`}
              >
                {/* Circular Icon Container */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${cat.iconBg}`}
                >
                  <IconComponent className="w-8 h-8 stroke-[1.75]" />
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 text-sm sm:text-[15px] leading-snug mb-2 group-hover:text-[#f15524] transition-colors">
                  {cat.title}
                </h3>

                {/* Course Count */}
                <p className="text-xs font-semibold text-stone-600">
                  {cat.count}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button: Browse All Categories */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#f15524] hover:bg-[#e04818] active:scale-95 text-white font-bold text-sm rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200"
          >
            <span>{showAll ? 'Show Fewer Categories' : 'Browse All Categories'}</span>
            <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${showAll ? '-rotate-90' : 'group-hover:translate-x-1'}`} />
          </button>
        </div>

      </div>
    </section>
  );
}
