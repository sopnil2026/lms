import React from 'react';
import { X, Award, Printer, Share2, CheckCircle, ShieldCheck } from 'lucide-react';

export default function CertificateModal({ course, userName = 'Alex Morgan', onClose }) {
  if (!course) return null;

  const handlePrint = () => {
    window.print();
  };

  const certificateId = `EDUKON-${course.id}847-${Math.floor(1000 + Math.random() * 9000)}`;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}>
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-amber-200 relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls */}
        <div className="flex items-center justify-between p-4 bg-stone-100 border-b border-stone-200">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Official Certificate of Completion</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-slate-900 rounded-lg hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-8 sm:p-12 bg-[#fffdfa] border-8 border-double border-amber-300/80 m-4 sm:m-6 rounded-2xl relative text-center">
          
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <Award className="w-96 h-96 text-amber-600" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#f15524] text-white flex items-center justify-center font-black text-sm">
              ED
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              Edukon Academy
            </span>
          </div>

          <h2 className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-amber-600 uppercase mb-4">
            Certificate of Achievement
          </h2>

          <p className="text-stone-500 text-xs sm:text-sm italic mb-4">
            This is proudly presented to
          </p>

          {/* Student Name */}
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight underline decoration-amber-400 decoration-wavy underline-offset-8 mb-6 font-serif">
            {userName}
          </h1>

          <p className="text-stone-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mb-6">
            for successfully completing all practical curriculums, graded quizzes, and hands-on portfolio requirements for:
          </p>

          {/* Course Name */}
          <h3 className="text-lg sm:text-xl font-extrabold text-[#f15524] mb-8 max-w-md mx-auto">
            {course.title}
          </h3>

          {/* Signatures & Seal */}
          <div className="grid grid-cols-3 items-end pt-6 border-t border-stone-200/80 mt-6 gap-4">
            
            {/* Instructor Signature */}
            <div className="text-center">
              <div className="font-serif italic text-base text-slate-800 font-bold mb-1">
                {course.instructor.name}
              </div>
              <div className="border-t border-stone-300 pt-1 text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                Lead Instructor
              </div>
            </div>

            {/* Official Gold Seal */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 border-4 border-amber-500 flex items-center justify-center text-amber-900 shadow-md">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-bold text-amber-800 uppercase mt-1 tracking-wider">
                Verified Credential
              </span>
            </div>

            {/* Director Signature */}
            <div className="text-center">
              <div className="font-serif italic text-base text-slate-800 font-bold mb-1">
                Dr. Katherine Vance
              </div>
              <div className="border-t border-stone-300 pt-1 text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                Academic Director
              </div>
            </div>

          </div>

          {/* Certificate Verification ID & Date */}
          <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400">
            <span>Date Issued: {currentDate}</span>
            <span className="font-mono">Verification ID: {certificateId}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
