import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3800);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-stone-800 flex items-center gap-3 max-w-md">
        <div className="w-8 h-8 rounded-xl bg-[#f15524] text-white flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-bold text-white leading-tight">
            {toast.title}
          </p>
          {toast.message && (
            <p className="text-[11px] text-stone-300 mt-0.5 leading-snug">
              {toast.message}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
