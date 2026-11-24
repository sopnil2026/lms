# Edukon — Modern Online Education & LMS Platform

A pixel-perfect, high-performance, full-featured LMS (Learning Management System) web application inspired by modern educational platforms. Built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Lucide Icons**.

---

## 🌟 Key Features

1. **Pixel-Perfect Hero & Branding**
   - Header & Topbar with contact phone, address, and social links.
   - Hero banner with headline, interactive course search input, popular tags, and cutout student image with 5 floating orbital animated metric badges.
   - Trusted company partners logo strip.
2. **Popular Category Grid**
   - 6 core disciplines with custom pastel icon badges and course counters.
   - Expandable "Browse All Categories" section.
3. **Featured Courses Showcase**
   - Filter tabs (All Courses, Adobe XD, Photoshop, Web Dev, Figma).
   - Rich course cards with floating circular price badges, ratings, lesson counts, instructor profiles, and quick enrollment.
4. **Interactive Video Learning Experience**
   - Built-in video player with play/pause, restart, volume, playback speed (1x, 1.25x, 1.5x, 2x), and fullscreen mode.
   - Real-time curriculum checklist: mark lessons as complete, update progress percentage.
   - Notes tab (save private lesson notes) and Instructor Q&A.
5. **Verified Certificate Generation**
   - Automated certificate of completion with official seal, student name, course title, verification ID, and 1-click printable/PDF layout.
   - Confetti celebration upon finishing all lessons.
6. **Student Portal & Cart**
   - "My Learning" dashboard tracking enrolled courses, learning streak, and earned credentials.
   - Slide-over shopping cart with promo coupon support (`EDUKON50` for 50% discount) and instant checkout.
   - Tabbed Auth modal (Log In / Sign Up) with 1-click instant demo login.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (version 18+ or 20+ recommended)
- npm or yarn / pnpm

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser:
# http://localhost:5173
```

### Production Build
```bash
# Build optimized production bundle to /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Architecture & File Map

Here is where every component and data file is located so you (or another AI assistant) can easily customize your personal info, courses, branding, and images:

```text
├── index.html                     # Website title, favicon, Google Fonts
├── package.json                   # Dependencies and npm scripts
├── vite.config.js                 # Vite + Tailwind CSS v4 setup
└── src/
    ├── App.jsx                    # Core application state, modal handlers, and layout flow
    ├── index.css                  # Tailwind imports, custom animations (float, pulse)
    ├── data/
    │   ├── coursesData.js         # Course catalog, prices, lessons, instructors & videos
    │   ├── categoriesData.js      # Categories list, course counts, colors & icons
    │   └── testimonialsData.js    # Student reviews, avatars, and ratings
    └── components/
        ├── Topbar.jsx             # Top bar: phone (+800 123 4567 6587), address, social links
        ├── Navbar.jsx             # Navigation header, logo, cart counter, auth buttons
        ├── Hero.jsx               # Hero section, headline, search, floating orbital badges
        ├── PartnerLogos.jsx       # Company partner brand logos bar
        ├── CategoriesSection.jsx  # Popular categories grid & expandable drawer
        ├── FeaturedCourses.jsx    # Course grid, filter tabs, price badges, wishlist
        ├── StatsSection.jsx       # 4 platform achievement statistics
        ├── WhyChooseUs.jsx        # Learning benefits and features
        ├── TestimonialsSection.jsx# Student reviews slider
        ├── InstructorBanner.jsx   # "Become an Instructor" CTA banner
        ├── Footer.jsx             # Multi-column footer, newsletter subscribe, contact info
        ├── CourseDetailModal.jsx  # Full course details, curriculum syllabus accordion
        ├── CoursePlayerModal.jsx  # Interactive video player, lesson checklist & notes
        ├── CertificateModal.jsx   # Official certificate of completion with print support
        ├── CartDrawer.jsx         # Slide-over cart, coupon code logic, checkout
        ├── AuthModal.jsx          # Login & registration modal with demo 1-click
        ├── StudentDashboardModal.jsx # Student "My Learning" portal
        └── Toast.jsx              # Toast notification system
```

---

## 🛠️ Personalization Guide (For You or Any AI)

If you are using an AI to customize this project with your own personal info, here are the exact files to edit:

1. **Your Name & User Profile**:
   - In `src/App.jsx` (lines ~29-35): update default `user` state (name, email, avatar).
   - In `src/components/AuthModal.jsx`: update demo login name and defaults.
2. **Contact & Social Information**:
   - In `src/components/Topbar.jsx` & `src/components/Footer.jsx`: change phone number, physical address, email (`support@edukon.edu`), and social media URLs.
3. **Brand Name & Logo**:
   - In `src/components/Navbar.jsx` & `src/components/Footer.jsx`: replace "Edukon" with your desired LMS brand name.
4. **Courses & Instructors**:
   - In `src/data/coursesData.js`: add, edit, or remove courses, change pricing, titles, thumbnails, instructor names, and video lesson URLs.
5. **Hero Section Badges & Text**:
   - In `src/components/Hero.jsx`: edit headline, subtext, search tags, and the 5 floating orbital badges.

---

## 📦 GitHub Upload Instructions

To upload this repository to GitHub:

1. Initialize Git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Edukon LMS website"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Connect and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

---

© 2026 Edukon. Built with care for high-impact online learning.
