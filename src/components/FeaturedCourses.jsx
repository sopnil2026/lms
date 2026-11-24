import React, { useState } from 'react';
import { 
  Star, 
  BookOpen, 
  MonitorPlay, 
  ArrowUpRight, 
  Heart, 
  ShoppingCart, 
  Check, 
  SlidersHorizontal,
  Clock,
  Users
} from 'lucide-react';

export default function FeaturedCourses({
  courses,
  onSelectCourse,
  onEnrollCourse,
  onAddToCart,
  cartItems = [],
  enrolledCourseIds = [],
  activeFilter,
  setActiveFilter,
  searchQuery = ''
}) {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (e, id) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filterTabs = [
    { label: 'All Courses', value: 'all' },
    { label: 'Adobe XD', value: 'Adobe XD' },
    { label: 'Photoshop', value: 'Photoshop' },
    { label: 'Web Dev', value: 'Web Dev' },
    { label: 'Figma', value: 'Figma' },
  ];

  // Filtering
  const filteredCourses = courses.filter(course => {
    const matchesFilter = activeFilter === 'all' || course.category.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="courses" className="py-20 bg-[#faf8f5] border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#f15524] font-bold text-xs sm:text-sm tracking-widest uppercase mb-2 inline-block">
            FEATURED COURSES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Pick A Course To Get Started
          </h2>
          <p className="mt-2 text-stone-500 text-sm sm:text-base">
            Hand-picked comprehensive curriculums designed to take you from novice to high-earning professional.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                activeFilter.toLowerCase() === tab.value.toLowerCase()
                  ? 'bg-[#f15524] text-white shadow-md shadow-orange-500/25 scale-105'
                  : 'bg-white text-stone-600 hover:text-slate-900 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search status indicator if active */}
        {searchQuery && (
          <div className="mb-8 flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-stone-200 text-sm">
            <span className="text-stone-600">
              Showing results for: <span className="font-bold text-slate-900">"{searchQuery}"</span> ({filteredCourses.length} courses found)
            </span>
            <button
              onClick={() => setActiveFilter('all')}
              className="text-xs text-[#f15524] font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Courses Grid (3 Columns x 2 Rows = 6 Cards matching image) */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-stone-300 max-w-lg mx-auto">
            <SlidersHorizontal className="w-12 h-12 text-stone-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No matching courses found</h3>
            <p className="text-stone-500 text-sm mb-6">
              Try searching for "Adobe XD", "Photoshop", or "Figma" to view courses.
            </p>
            <button
              onClick={() => { setActiveFilter('all'); }}
              className="px-6 py-2.5 bg-[#f15524] text-white font-bold rounded-full text-sm hover:bg-[#e04818]"
            >
              Show All Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
              const isWishlisted = wishlist.includes(course.id);
              const isInCart = cartItems.some(item => item.id === course.id);
              const isEnrolled = enrolledCourseIds.includes(course.id);

              return (
                <div
                  key={course.id}
                  onClick={() => onSelectCourse(course)}
                  className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl hover:shadow-stone-200/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
                >
                  {/* Thumbnail & Badges */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Wishlist Heart */}
                    <button
                      onClick={(e) => toggleWishlist(e, course.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                        isWishlisted
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/80 text-stone-600 hover:text-rose-500 hover:bg-white'
                      }`}
                      title="Add to Wishlist"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>

                    {/* Floating Circular Orange Price Badge (Exactly as in screenshot) */}
                    <div className="absolute -bottom-4 right-5 w-12 h-12 rounded-full bg-[#f15524] text-white font-black text-sm flex items-center justify-center shadow-lg shadow-orange-500/30 ring-4 ring-white z-10">
                      ${course.price}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 pt-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Rating Row */}
                      <div className="flex items-center justify-between gap-2 mb-3 pr-10">
                        {/* Course Category Pill */}
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                            course.category.includes('Photoshop')
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-orange-50 text-[#f15524] border border-orange-200'
                          }`}
                        >
                          {course.category}
                        </span>

                        {/* Stars & Review count */}
                        <div className="flex items-center gap-1.5 text-xs text-stone-500">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <span className="font-medium text-stone-400">
                            (0{course.reviewsCount} reviews)
                          </span>
                        </div>
                      </div>

                      {/* Course Title */}
                      <h3 className="font-extrabold text-slate-900 text-lg leading-snug line-clamp-2 group-hover:text-[#f15524] transition-colors mb-4">
                        {course.title}
                      </h3>

                      {/* Meta Lessons & Online Class Info */}
                      <div className="flex items-center gap-4 text-xs font-semibold text-stone-500 mb-5">
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-stone-400" />
                          <span>{course.lessonsCount}x Lesson</span>
                        </div>
                        <span className="text-stone-300">•</span>
                        <div className="flex items-center gap-1.5">
                          <MonitorPlay className="w-4 h-4 text-stone-400" />
                          <span>{course.type}</span>
                        </div>
                      </div>
                    </div>

                    {/* Divider & Card Footer */}
                    <div className="border-t border-stone-100 pt-4 mt-auto">
                      <div className="flex items-center justify-between">
                        
                        {/* Instructor Profile */}
                        <div className="flex items-center gap-2.5">
                          <img
                            src={course.instructor.avatar}
                            alt={course.instructor.name}
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-stone-200"
                          />
                          <span className="text-xs sm:text-sm font-bold text-slate-800">
                            {course.instructor.name}
                          </span>
                        </div>

                        {/* Read More link */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isEnrolled) {
                                onSelectCourse(course, true); // open player
                              } else if (isInCart) {
                                onSelectCourse(course);
                              } else {
                                onAddToCart(course);
                              }
                            }}
                            className={`p-2 rounded-lg text-xs font-bold transition-all ${
                              isEnrolled
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : isInCart
                                ? 'bg-amber-100 text-amber-800'
                                : 'hover:bg-orange-50 text-[#f15524]'
                            }`}
                            title={isEnrolled ? 'Resume Course' : isInCart ? 'In Cart' : 'Quick Add to Cart'}
                          >
                            {isEnrolled ? (
                              'Enrolled'
                            ) : isInCart ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <ShoppingCart className="w-4 h-4" />
                            )}
                          </button>

                          <span className="flex items-center gap-0.5 text-xs font-bold text-stone-600 group-hover:text-[#f15524] transition-colors">
                            <span>Read More</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </span>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
