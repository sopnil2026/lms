import React, { useState, useEffect, useCallback } from 'react';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PartnerLogos from './components/PartnerLogos';
import CategoriesSection from './components/CategoriesSection';
import FeaturedCourses from './components/FeaturedCourses';
import StatsSection from './components/StatsSection';
import WhyChooseUs from './components/WhyChooseUs';
import TestimonialsSection from './components/TestimonialsSection';
import InstructorBanner from './components/InstructorBanner';
import Footer from './components/Footer';

import CourseDetailModal from './components/CourseDetailModal';
import CoursePlayerModal from './components/CoursePlayerModal';
import CertificateModal from './components/CertificateModal';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import StudentDashboardModal from './components/StudentDashboardModal';
import Toast from './components/Toast';
import Reveal from './components/Reveal';
import ScrollProgress from './components/ScrollProgress';

import { coursesData } from './data/coursesData';

export default function App() {
  // Navigation & State
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // User state (pre-populate with Alex Morgan for instant LMS richness, or can log out)
  const [user, setUser] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@edukon.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'Active Student'
  });

  // Enrolled courses (defaulting first course as enrolled so user can test the Course Player right away!)
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([1, 2]);

  // Shopping Cart
  const [cartItems, setCartItems] = useState([coursesData[2]]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [playingCourse, setPlayingCourse] = useState(null);
  const [certificateCourse, setCertificateCourse] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Feedback Toast
  const [toast, setToast] = useState({
    title: 'Welcome to Edukon!',
    message: 'Browse courses, test the video player, or claim your course certificate.'
  });

  const closeToast = useCallback(() => setToast(null), []);

  // Escape closes the top-most open modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (certificateCourse) setCertificateCourse(null);
      else if (playingCourse) setPlayingCourse(null);
      else if (isAuthOpen) setIsAuthOpen(false);
      else if (isDashboardOpen) setIsDashboardOpen(false);
      else if (isCartOpen) setIsCartOpen(false);
      else if (selectedCourse) setSelectedCourse(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [certificateCourse, playingCourse, isAuthOpen, isDashboardOpen, isCartOpen, selectedCourse]);

  // Lock page scroll while any modal is open
  const anyModalOpen = !!(certificateCourse || playingCourse || isAuthOpen || isDashboardOpen || isCartOpen || selectedCourse);
  useEffect(() => {
    document.body.style.overflow = anyModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [anyModalOpen]);

  // Actions
  const handleSearch = (term) => {
    setSearchQuery(term);
    setActiveFilter('all');
    setToast({
      title: 'Searching Courses',
      message: `Filtering results for "${term}"`
    });
  };

  const handleTagSelect = (tag) => {
    setSearchQuery(tag);
    setActiveFilter('all');
  };

  const handleSelectCategory = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
    setSearchQuery(categoryTitle);
    const coursesElem = document.getElementById('courses');
    if (coursesElem) {
      coursesElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (course) => {
    if (cartItems.some(i => i.id === course.id)) {
      setToast({
        title: 'Already in cart',
        message: `${course.title} is already waiting in your cart.`
      });
      setIsCartOpen(true);
      return;
    }
    setCartItems(prev => [...prev, course]);
    setToast({
      title: 'Added to cart!',
      message: `${course.title} ($${course.price}) has been added.`
    });
  };

  const handleRemoveFromCart = (courseId) => {
    setCartItems(prev => prev.filter(i => i.id !== courseId));
  };

  const handleCheckout = (items, totalAmount) => {
    const newEnrolledIds = [...new Set([...enrolledCourseIds, ...items.map(i => i.id)])];
    setEnrolledCourseIds(newEnrolledIds);
    setCartItems([]);
    setIsCartOpen(false);
    setToast({
      title: '🎉 Enrollment Complete!',
      message: `You successfully enrolled in ${items.length} new course(s). Happy learning!`
    });
  };

  const handleOpenCourse = (course, openPlayerDirectly = false) => {
    if (openPlayerDirectly || enrolledCourseIds.includes(course.id)) {
      setPlayingCourse(course);
      setSelectedCourse(null);
    } else {
      setSelectedCourse(course);
    }
  };

  const handleInstantEnroll = (course) => {
    if (!enrolledCourseIds.includes(course.id)) {
      setEnrolledCourseIds(prev => [...prev, course.id]);
    }
    setSelectedCourse(null);
    setPlayingCourse(course);
    setToast({
      title: 'Course Enrolled!',
      message: `Welcome to "${course.title}". Your lesson player is ready.`
    });
  };

  const handleShareCourse = async (title) => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast({
        title: 'Link Copied!',
        message: `Shareable link for "${title}" copied to your clipboard.`
      });
    } catch {
      setToast({
        title: 'Could not copy link',
        message: 'Your browser blocked clipboard access.'
      });
    }
  };

  const handleSubscribe = (email) => {
    setToast({
      title: 'Subscribed to Newsletter',
      message: `We sent a confirmation welcome pack to ${email}.`
    });
  };

  // Enrolled courses objects
  const enrolledCoursesList = coursesData.filter(c => enrolledCourseIds.includes(c.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-slate-800 font-sans selection:bg-[#f15524] selection:text-white">
      
      <ScrollProgress />

      {/* 1. Top Contact & Social Bar */}
      <Topbar />

      {/* 2. Main Navigation Bar */}
      <Navbar
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={(tab) => {
          setAuthTab(tab);
          setIsAuthOpen(true);
        }}
        user={user}
        onLogout={() => {
          setUser(null);
          setToast({
            title: 'Logged Out',
            message: 'You have been logged out successfully.'
          });
        }}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* 3. Hero Section matching the screenshot */}
      <Hero
        onSearch={handleSearch}
        onTagSelect={handleTagSelect}
      />

      {/* 4. Company Partners Bar */}
      <Reveal>
      <PartnerLogos />
      </Reveal>

      {/* 5. Popular Categories Section */}
      <Reveal>
      <CategoriesSection
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />
      </Reveal>

      {/* 6. Featured Courses Section */}
      <Reveal>
      <FeaturedCourses
        courses={coursesData}
        onSelectCourse={handleOpenCourse}
        onEnrollCourse={handleInstantEnroll}
        onAddToCart={handleAddToCart}
        cartItems={cartItems}
        enrolledCourseIds={enrolledCourseIds}
        activeFilter={activeFilter}
        setActiveFilter={(val) => {
          setActiveFilter(val);
          setSearchQuery('');
        }}
        searchQuery={searchQuery}
      />
      </Reveal>

      {/* 7. Platform Statistics */}
      <Reveal>
      <StatsSection />
      </Reveal>

      {/* 8. Why Choose Us Features */}
      <Reveal>
      <WhyChooseUs />
      </Reveal>

      {/* 9. Student Testimonials */}
      <Reveal>
      <TestimonialsSection />
      </Reveal>

      {/* 10. Become An Instructor CTA */}
      <Reveal>
      <InstructorBanner
        onOpenAuth={(tab) => {
          setAuthTab(tab);
          setIsAuthOpen(true);
        }}
      />
      </Reveal>

      {/* 11. Multi-Column Footer */}
      <Footer
        onSubscribe={handleSubscribe}
        onFilterSelect={(cat) => {
          setActiveFilter(cat);
          const coursesElem = document.getElementById('courses');
          if (coursesElem) {
            coursesElem.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* --- Interactive Modals & Drawers --- */}

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onStartCourse={(c, instantEnroll) => {
            if (instantEnroll) {
              handleInstantEnroll(c);
            } else {
              handleOpenCourse(c, true);
            }
          }}
          onAddToCart={handleAddToCart}
          isInCart={cartItems.some(i => i.id === selectedCourse.id)}
          isEnrolled={enrolledCourseIds.includes(selectedCourse.id)}
          onShare={handleShareCourse}
        />
      )}

      {/* Interactive Course Player Modal */}
      {playingCourse && (
        <CoursePlayerModal
          course={playingCourse}
          onClose={() => setPlayingCourse(null)}
          onShowCertificate={(c) => {
            setCertificateCourse(c);
          }}
        />
      )}

      {/* Certificate Modal */}
      {certificateCourse && (
        <CertificateModal
          course={certificateCourse}
          userName={user ? user.name : 'Alex Morgan'}
          onClose={() => setCertificateCourse(null)}
        />
      )}

      {/* Shopping Cart Slide-over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
        onClearCart={() => setCartItems([])}
      />

      {/* Auth Modal (Log in / Sign up) */}
      {isAuthOpen && <AuthModal
        isOpen={isAuthOpen}
        initialTab={authTab}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          setToast({
            title: `Welcome, ${loggedUser.name}!`,
            message: 'You now have full access to your student dashboard.'
          });
        }}
      />}

      {/* Student Dashboard ("My Learning") */}
      <StudentDashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        user={user}
        enrolledCourses={enrolledCoursesList}
        onOpenCoursePlayer={(c) => {
          setPlayingCourse(c);
        }}
        onOpenCertificate={(c) => {
          setCertificateCourse(c);
        }}
      />

      {/* Toast Notifications */}
      <Toast
        toast={toast}
        onClose={closeToast}
      />

    </div>
  );
}
