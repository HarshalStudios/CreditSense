import React from 'react';
import { CreditCard, Calculator, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onStart: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-[#050816] relative overflow-hidden">
      
      {/* Background glow accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center space-y-8">
        
        {/* Project Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>College Finance Project • Personal Finance Decision System</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-3">
          <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Smart Credit Card <span className="text-blue-400">Advisor</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A simple 3-feature financial tool to help Indian users choose the right card based on spending, calculate yearly savings, and avoid costly interest traps.
          </p>
        </div>

        {/* 3 Simple Feature Cards (Clean & Scannable) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
          
          {/* Feature 1 */}
          <div 
            onClick={() => scrollTo('recommender')}
            className="p-4 rounded-2xl bg-[#0a192f] border border-blue-900/40 hover:border-blue-500/50 transition-all cursor-pointer space-y-2 shadow-lg shadow-black/30 group"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <CreditCard className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
              1. 1-Click Card Recommender
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Choose 1-click lifestyle templates or custom spends to compare 11 top Indian credit cards with real savings.
            </p>
          </div>

          {/* Feature 2 */}
          <div 
            onClick={() => scrollTo('savings-calculator')}
            className="p-4 rounded-2xl bg-[#0a192f] border border-blue-900/40 hover:border-emerald-500/50 transition-all cursor-pointer space-y-2 shadow-lg shadow-black/30 group"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Calculator className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
              2. Savings Calculator
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Calculate total yearly savings in rupees after deducting card maintenance fees.
            </p>
          </div>

          {/* Feature 3 */}
          <div 
            onClick={() => scrollTo('interest-warning')}
            className="p-4 rounded-2xl bg-[#0a192f] border border-blue-900/40 hover:border-rose-500/50 transition-all cursor-pointer space-y-2 shadow-lg shadow-black/30 group"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
              3. Interest Warning
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              See the exact financial loss if you pay only the 5% minimum due or delay bills.
            </p>
          </div>

        </div>

        {/* Big Start Button */}
        <div className="pt-2">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all cursor-pointer shadow-lg shadow-blue-500/25 transform hover:-translate-y-0.5"
          >
            <span>Start Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
