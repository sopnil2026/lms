import React, { useState } from 'react';
import { User, ShoppingBag, BookOpen, Menu, X, ChevronDown, Sparkles } from 'lucide-react';

export default function Navbar({
  cartCount = 0,
  onOpenCart,
  onOpenAuth,
  user,
  onLogout,
  onOpenDashboard,
  activeSection,
  setActiveSection
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdown, setPagesDropdown] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Courses', href: '#courses', id: 'courses' },
    { name: 'Categories', href: '#categories', id: 'categories' },
    { name: 'Blog', href: '#blog', id: 'blog' },
    { name: 'Pages', href: '#pages', id: 'pages', hasDropdown: true },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f15524] to-[#f7941d] flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
              </svg>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-[#f15524] transition-colors">
                Edukon<span className="text-[#f15524]">.</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.id} className="relative group">
                <a
                  href={link.href}
                  onClick={(e) => {
                    if (!link.hasDropdown) {
                      setActiveSection(link.id);
                    }
                  }}
                  className={`text-[15px] font-semibold tracking-tight transition-colors flex items-center gap-1.5 py-2 ${
                    activeSection === link.id
                      ? 'text-[#f15524]'
                      : 'text-slate-700 hover:text-[#f15524]'
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                  )}
                  {activeSection === link.id && !link.hasDropdown && (
                    <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#f15524] rounded-full"></span>
                  )}
                </a>

                {/* Dropdown for Pages */}
                {link.hasDropdown && (
                  <div className="absolute left-0 top-full hidden group-hover:block w-48 pt-2">
                    <div className="bg-white rounded-xl shadow-xl border border-stone-100 p-2 text-sm">
                      <a href="#instructors" className="block px-3 py-2 text-slate-700 hover:bg-orange-50 hover:text-[#f15524] rounded-lg font-medium">
                        Instructors
                      </a>
                      <a href="#stats" className="block px-3 py-2 text-slate-700 hover:bg-orange-50 hover:text-[#f15524] rounded-lg font-medium">
                        Platform Stats
                      </a>
                      <a href="#testimonials" className="block px-3 py-2 text-slate-700 hover:bg-orange-50 hover:text-[#f15524] rounded-lg font-medium">
                        Student Reviews
                      </a>
                      <a href="#faq" className="block px-3 py-2 text-slate-700 hover:bg-orange-50 hover:text-[#f15524] rounded-lg font-medium">
                        Help & FAQ
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-slate-600 hover:text-[#f15524] hover:bg-orange-50/60 rounded-xl transition-all"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#f15524] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Authenticated user vs Guest */}
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenDashboard}
                  className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-slate-800 text-sm font-semibold rounded-xl transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-[#f15524]" />
                  <span>My Learning</span>
                </button>
                <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-[#f15524]/20"
                  />
                  <div className="hidden md:block text-left text-xs">
                    <p className="font-bold text-slate-900 leading-tight">{user.name}</p>
                    <button
                      onClick={onLogout}
                      className="text-stone-500 hover:text-rose-600 text-[11px] underline"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-[14px] font-bold text-slate-700 hover:text-[#f15524] transition-colors"
                >
                  <User className="w-4 h-4 text-[#f15524]" />
                  <span>LOG IN</span>
                </button>

                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-5 sm:px-6 py-2.5 bg-[#f15524] hover:bg-[#e04818] active:scale-95 text-white text-[14px] font-bold rounded-lg shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all tracking-wide"
                >
                  SIGN UP
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#f15524] hover:bg-stone-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-5 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => {
                  setActiveSection(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-base font-semibold ${
                  activeSection === link.id ? 'text-[#f15524]' : 'text-slate-800'
                }`}
              >
                {link.name}
              </a>
            ))}
            {user && (
              <button
                onClick={() => {
                  onOpenDashboard();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 py-2 text-base font-semibold text-[#f15524]"
              >
                <BookOpen className="w-4 h-4" />
                My Learning Dashboard
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
