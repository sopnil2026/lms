import React from 'react';
import { Users, GraduationCap, Award, Globe, Sparkles } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      label: 'Learners Worldwide',
      value: '18M+',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-100',
      description: 'Active students learning every single day'
    },
    {
      label: 'Interactive Courses',
      value: '130k+',
      icon: GraduationCap,
      color: 'text-[#f15524]',
      bg: 'bg-orange-50 border-orange-100',
      description: 'Covering design, code, business & data'
    },
    {
      label: 'Success Rate',
      value: '89%',
      icon: Award,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-100',
      description: 'Students who land promotions or new roles'
    },
    {
      label: 'Global Languages',
      value: '36+',
      icon: Globe,
      color: 'text-purple-600',
      bg: 'bg-purple-50 border-purple-100',
      description: 'Multi-lingual captions and support'
    }
  ];

  return (
    <section id="stats" className="py-16 bg-white border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className={`p-6 rounded-2xl border ${stat.bg} flex items-start gap-4 transition-transform hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className={`p-3 rounded-xl bg-white shadow-xs ${stat.color}`}>
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">
                    {stat.label}
                  </div>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
