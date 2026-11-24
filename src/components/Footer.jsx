import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Rss, ArrowRight, Check } from 'lucide-react';

export default function Footer({ onSubscribe, onFilterSelect }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      if (onSubscribe) onSubscribe(email);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer id="contact" className="bg-[#111827] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-stone-800">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f15524] to-[#f7941d] flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Edukon<span className="text-[#f15524]">.</span>
              </span>
            </div>

            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Edukon is the premier global online education platform empowering students and working professionals to learn high-income skills through industry-crafted curriculums.
            </p>

            <div className="space-y-3 text-sm text-stone-400">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#f15524] shrink-0" />
                <span>+800 123 4567 6587</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#f15524] shrink-0" />
                <span>Beverley, New York 224 USA</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#f15524] shrink-0" />
                <span>support@edukon.edu</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-extrabold text-base mb-5 tracking-tight">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="text-stone-400 hover:text-[#f15524] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#courses" className="text-stone-400 hover:text-[#f15524] transition-colors">
                  All Courses
                </a>
              </li>
              <li>
                <a href="#categories" className="text-stone-400 hover:text-[#f15524] transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#stats" className="text-stone-400 hover:text-[#f15524] transition-colors">
                  Our Stats
                </a>
              </li>
              <li>
                <a href="#instructors" className="text-stone-400 hover:text-[#f15524] transition-colors">
                  Become Instructor
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-stone-400 hover:text-[#f15524] transition-colors">
                  Student Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Programs (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-extrabold text-base mb-5 tracking-tight">
              Popular Programs
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onFilterSelect && onFilterSelect('Adobe XD')}
                  className="text-stone-400 hover:text-[#f15524] text-left transition-colors cursor-pointer"
                >
                  Adobe XD UI/UX Theory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterSelect && onFilterSelect('Photoshop')}
                  className="text-stone-400 hover:text-[#f15524] text-left transition-colors cursor-pointer"
                >
                  Certified Photoshop Graphic Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterSelect && onFilterSelect('Figma')}
                  className="text-stone-400 hover:text-[#f15524] text-left transition-colors cursor-pointer"
                >
                  Figma Masterclass & Tokens
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterSelect && onFilterSelect('Web Dev')}
                  className="text-stone-400 hover:text-[#f15524] text-left transition-colors cursor-pointer"
                >
                  Fullstack React & Node.js
                </button>
              </li>
              <li>
                <span className="text-stone-500 text-xs">
                  Civil & Structural Design
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-extrabold text-base mb-3 tracking-tight">
              Stay In The Loop
            </h4>
            <p className="text-stone-400 text-xs leading-relaxed mb-4">
              Get notified when new free courses, scholarships, and career workshops are released.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-900/40 border border-emerald-700/60 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you! You're subscribed to Edukon updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#f15524]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#f15524] hover:bg-[#e04818] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Subscribe Now</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Edukon Online Learning Inc. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="#social" className="hover:text-white transition-colors">Twitter</a>
            <span>•</span>
            <a href="#social" className="hover:text-white transition-colors">LinkedIn</a>
            <span>•</span>
            <a href="#social" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#social" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
