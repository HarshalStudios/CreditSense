import React from 'react';
import { CreditCard, Calculator, AlertTriangle } from 'lucide-react';

export function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#050816]/90 backdrop-blur-md border-b border-blue-900/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-['Space_Grotesk'] text-lg font-bold text-white tracking-tight">
                Credit<span className="text-blue-400">Sense</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30">
                Personal Finance Tool
              </span>
            </div>
          </div>

          {/* 3 Core Quick Navigation Links */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-300">
            <button 
              onClick={() => scrollTo('recommender')} 
              className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">1. Card Finder</span>
              <span className="sm:hidden">Card Finder</span>
            </button>
            <button 
              onClick={() => scrollTo('savings-calculator')} 
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">2. Savings Calculator</span>
              <span className="sm:hidden">Calculator</span>
            </button>
            <button 
              onClick={() => scrollTo('interest-warning')} 
              className="hover:text-rose-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">3. Interest Warning</span>
              <span className="sm:hidden">Warning</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
