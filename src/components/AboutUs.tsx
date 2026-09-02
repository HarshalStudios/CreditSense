import React from 'react';
import { 
  Building2, 
  Sparkles, 
  Target, 
  Users, 
  HeartHandshake, 
  GraduationCap, 
  Briefcase, 
  CreditCard,
  ShieldCheck,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

export const AboutUs: React.FC = () => {
  const targetUserGroups = [
    {
      group: 'Students & First-Timers',
      icon: GraduationCap,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      description: 'Zero credit history? We guide you towards FD-backed and starter cards (like IDFC WOW or Amazon Pay) to build an 800+ CIBIL score with ₹0 annual fees.'
    },
    {
      group: 'Young Professionals',
      icon: Briefcase,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      description: 'First paycheck in hand? Maximize cash returns on food delivery, work commutes, gadgets, and weekend outings while maintaining strict 30% credit utilization.'
    },
    {
      group: 'Savvy Indian Cardholders',
      icon: CreditCard,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      description: 'Already managing 2–4 cards? Our real-time swipe optimizer ensures you never swipe the wrong card at checkout and effortlessly hit annual fee waiver spend tiers.'
    }
  ];

  return (
    <section 
      id="about-us"
      className="py-16 sm:py-24 bg-[#050816] border-t border-blue-900/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Our Mission & Philosophy</span>
          </div>

          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About <span className="text-blue-400">CreditSense AI</span>
          </h2>

          <p className="text-lg sm:text-xl font-medium text-blue-200">
            “We aim to improve financial decision-making using AI”
          </p>
        </div>

        {/* Narrative & Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          <div className="lg:col-span-7 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              In India, credit cards have long been marketed as flashy status symbols, while the true terms—42% revolving APR, complicated reward redemption hurdles, and fine print exclusions—remained buried.
            </p>
            <p>
              At <strong>CreditSense AI</strong>, we believe every rupee you spend should generate tangible value for <em>your</em> wallet, not the bank’s quarterly profit report. By merging modern computational heuristics with deep fintech transparency, we empower every Indian consumer to swipe with mathematical precision.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-[#0a192f] border border-blue-900/40 space-y-1">
                <span className="text-xs font-bold text-white block">100% User-Centric</span>
                <p className="text-xs text-slate-400">Every suggestion is computed to maximize your net return after subtracting all annual costs.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0a192f] border border-blue-900/40 space-y-1">
                <span className="text-xs font-bold text-white block">Financial Literacy First</span>
                <p className="text-xs text-slate-400">We prioritize debt prevention, 30% utilization discipline, and 800+ credit score longevity.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0a192f] border border-blue-900/60 rounded-2xl p-6 shadow-2xl shadow-black/40 space-y-4">
            <h3 className="text-base font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-blue-400" />
              Our Core Principles
            </h3>
            
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>No Jargon:</strong> Clear rupee numbers, exact percentages, and honest warnings.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Zero Kickbacks:</strong> Our ranking algorithms do not accept bank sponsorships.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Privacy Sovereign:</strong> No card numbers, no CVVs, no spam calls.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Target Audience Showcase */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">
              Engineered For Every Indian Spender
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Whether you are opening your very first card in college or optimizing multiple premium cards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {targetUserGroups.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#0a192f] border border-blue-900/40 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/50 hover:bg-[#112240] space-y-3 shadow-lg shadow-black/30"
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${t.color}`}>
                  <t.icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">
                  {t.group}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
