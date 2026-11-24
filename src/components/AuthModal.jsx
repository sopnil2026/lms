import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

export default function AuthModal({
  isOpen,
  initialTab = 'login',
  onClose,
  onLoginSuccess
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const demoUser = {
      name: name || (activeTab === 'login' ? 'Alex Morgan' : 'Jordan Lee'),
      email: email || 'student@edukon.edu',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Student'
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  const handleQuickDemoLogin = () => {
    const demoUser = {
      name: 'Alex Morgan',
      email: 'alex.morgan@edukon.edu',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Pro Student'
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}>
      <div 
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-stone-200 relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-slate-900 rounded-full hover:bg-stone-100 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Headers */}
        <div className="flex border-b border-stone-200 bg-[#faf8f5]">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-4 text-sm font-bold text-center transition-colors ${
              activeTab === 'login'
                ? 'text-[#f15524] border-b-2 border-[#f15524] bg-white'
                : 'text-stone-500 hover:text-slate-900'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-4 text-sm font-bold text-center transition-colors ${
              activeTab === 'signup'
                ? 'text-[#f15524] border-b-2 border-[#f15524] bg-white'
                : 'text-stone-500 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          
          <div className="text-center mb-6">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {activeTab === 'login' ? 'Welcome Back!' : 'Start Learning Free'}
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              {activeTab === 'login'
                ? 'Access your enrolled courses and certifications.'
                : 'Join over 18 million learners mastering digital skills.'}
            </p>
          </div>

          {/* Quick 1-Click Demo Login Button */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 px-4 mb-4 bg-orange-50 border border-orange-200 text-[#f15524] hover:bg-orange-100 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#f15524]" />
            <span>1-Click Instant Demo Login (Alex Morgan)</span>
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#f15524]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#f15524]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                {activeTab === 'login' && (
                  <a href="#reset" className="text-[11px] text-[#f15524] font-semibold hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#f15524]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#f15524] hover:bg-[#e04818] text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{activeTab === 'login' ? 'Log In to Edukon' : 'Create Free Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-6 pt-5 border-t border-stone-200 text-center">
            <span className="text-xs text-stone-400 block mb-3">Or continue with</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="py-2.5 px-4 border border-stone-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-stone-50 flex items-center justify-center gap-2 transition-colors"
              >
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="py-2.5 px-4 border border-stone-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-stone-50 flex items-center justify-center gap-2 transition-colors"
              >
                <span>GitHub</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
