import React from 'react';
import { CreditCard, Lock } from 'lucide-react';

export function SimpleFooter() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050816] border-t border-blue-900/40 py-10 text-slate-400 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-blue-900/30">
          
          {/* Logo & Tag */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="font-['Space_Grotesk'] text-base font-bold text-white">
                Credit<span className="text-blue-400">Sense</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Personal Finance Tool • Credit Card Selection & Cost-Benefit Analysis
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-300">
            <button onClick={() => scrollTo('recommender')} className="hover:text-blue-400 transition-colors cursor-pointer">
              1. Card Finder
            </button>
            <button onClick={() => scrollTo('savings-calculator')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              2. Savings Calculator
            </button>
            <button onClick={() => scrollTo('interest-warning')} className="hover:text-rose-400 transition-colors cursor-pointer">
              3. Interest Warning
            </button>
          </div>

        </div>

        {/* Academic Note & Legal Disclaimer */}
        <div className="text-[11px] text-slate-500 space-y-2 text-center leading-relaxed">
          <p>
            <strong>Educational Disclaimer:</strong> Calculations are based on standard Indian commercial bank schedules (3.5%/month APR & standard card reward tiers) for financial planning and analysis.
          </p>
          <p className="text-slate-400">
            © {new Date().getFullYear()} CreditSense • Smart Credit Card Decision System
          </p>
        </div>

      </div>
    </footer>
  );
}
