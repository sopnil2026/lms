import React from 'react';
import { Phone, MapPin, Rss } from 'lucide-react';

export default function Topbar() {
  return (
    <div className="bg-[#fcfbfa] border-b border-stone-200/60 text-xs text-stone-600 hidden md:block py-2.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Left Contact Info */}
        <div className="flex items-center space-x-6">
          <a
            href="tel:+80012345676587"
            className="flex items-center gap-2 hover:text-[#f15524] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#f15524]" />
            <span>+800 123 4567 6587</span>
          </a>
          <span className="text-stone-300">|</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#f15524]" />
            <span>Beverley, New York 224 USA</span>
          </div>
        </div>

        {/* Right Socials & Info */}
        <div className="flex items-center space-x-4">
          <span className="text-stone-500 font-medium">Find us on :</span>
          <div className="flex items-center space-x-3 text-stone-500">
            {/* Twitter / X */}
            <a
              href="#social"
              title="Twitter"
              className="hover:text-[#f15524] transition-colors p-1"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Vimeo */}
            <a
              href="#social"
              title="Vimeo"
              className="hover:text-[#f15524] transition-colors p-1 font-bold text-[11px]"
            >
              v
            </a>
            {/* Instagram */}
            <a
              href="#social"
              title="Instagram"
              className="hover:text-[#f15524] transition-colors p-1"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* Behance */}
            <a
              href="#social"
              title="Behance"
              className="hover:text-[#f15524] transition-colors p-1 font-semibold text-[11px]"
            >
              Be
            </a>
            {/* RSS */}
            <a
              href="#social"
              title="RSS"
              className="hover:text-[#f15524] transition-colors p-1"
            >
              <Rss className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
