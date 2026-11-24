import React from 'react';

export default function PartnerLogos() {
  const brands = [
    {
      name: 'COMPANY',
      icon: (
        <svg className="w-5 h-5 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2a10 10 0 0 0-7.07 2.93l1.41 1.41A8 8 0 0 1 12 4V2zm0 18a8 8 0 0 1-5.66-2.34l-1.41 1.41A10 10 0 0 0 12 22v-2z" />
        </svg>
      ),
      font: 'font-black tracking-widest text-slate-700'
    },
    {
      name: 'COMPANY',
      icon: (
        <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 13.5L4.5 11.75 3.5 12.5 12 18l8.5-5.5-1-0.75L12 15.5z" />
        </svg>
      ),
      font: 'font-extrabold tracking-wider text-slate-700'
    },
    {
      name: 'Company',
      icon: (
        <div className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center font-bold text-[10px] text-amber-600">
          C
        </div>
      ),
      font: 'font-bold tracking-tight text-slate-700 font-serif'
    },
    {
      name: 'company',
      icon: (
        <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      font: 'font-semibold tracking-normal text-slate-700 italic'
    },
    {
      name: 'COMPANY',
      icon: (
        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="4,2 10,12 4,22 14,22 20,12 14,2" />
        </svg>
      ),
      font: 'font-black tracking-wider text-slate-700'
    },
    {
      name: 'BRANDNAME',
      icon: (
        <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="12" r="3" />
          <path d="M9 12h6" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      font: 'font-extrabold tracking-widest text-slate-700 text-xs'
    }
  ];

  return (
    <div className="bg-[#fffdfa] border-b border-stone-200/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-8 sm:gap-6 opacity-75 hover:opacity-100 transition-opacity">
          {brands.map((brand, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-3 py-1.5 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              {brand.icon}
              <span className={`text-base ${brand.font}`}>
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
