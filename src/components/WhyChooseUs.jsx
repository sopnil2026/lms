import React from 'react';
import { Clock, ShieldCheck, Video, Headphones, CheckCircle2 } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      title: 'Learn at Your Own Pace',
      description: 'Lifetime access to all lessons. Learn on mobile, tablet, or desktop with offline sync capabilities.',
      icon: Clock,
      tag: 'Flexible Schedule'
    },
    {
      title: 'Verified Industry Certificates',
      description: 'Receive verifiable digital credentials and badges recognized by top Fortune 500 employers.',
      icon: ShieldCheck,
      tag: 'Accredited'
    },
    {
      title: 'Studio-Grade 4K Video Lessons',
      description: 'Crystal-clear screen recordings, curated downloadable source files, and exercise sandbox environments.',
      icon: Video,
      tag: 'Hands-on Projects'
    },
    {
      title: '24/7 Expert Mentor Support',
      description: 'Get code and design reviews, direct answers to questions, and 1-on-1 feedback in dedicated course forums.',
      icon: Headphones,
      tag: 'Active Community'
    }
  ];

  return (
    <section className="py-20 bg-[#faf8f5] border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Value Props */}
          <div className="lg:col-span-6">
            <span className="text-[#f15524] font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 inline-block">
              WHY CHOOSE EDUKON
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              Transform Your Career With Practical Skills That Matter
            </h2>
            <p className="text-stone-600 text-base leading-relaxed mb-8">
              We bridge the gap between academic theory and real-world execution. Every course is packed with production-ready workflows, actionable templates, and direct guidance from industry veterans.
            </p>

            <div className="space-y-4">
              {[
                'Curated step-by-step learning roadmaps for every discipline',
                'Downloadable project source files, UI kits, and boilerplates',
                'Earn certificates shareable on LinkedIn and portfolios'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right 2x2 Feature Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#f15524] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#f15524] bg-orange-50 px-2 py-0.5 rounded-md inline-block mb-2">
                    {feat.tag}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
