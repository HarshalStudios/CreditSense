import React from 'react';
import { 
  Sliders, 
  BrainCircuit, 
  CreditCard, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  IndianRupee,
  CheckCircle2
} from 'lucide-react';

interface HowItWorksProps {
  onGetStarted: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onGetStarted }) => {
  const steps = [
    {
      step: '01',
      title: 'Enter Your Financial Details',
      subtitle: 'Income & Spending Profile',
      icon: Sliders,
      color: 'from-cyan-500 to-blue-500',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      description: 'Provide your monthly in-hand income and regular spend breakdown across food, online shopping, commute, fuel, utilities, and groceries.',
      subText: 'Takes less than 30 seconds. No personal banking credentials or card numbers required.'
    },
    {
      step: '02',
      title: 'AI Analyzes Spending',
      subtitle: 'Algorithmic Reward Matrix',
      icon: BrainCircuit,
      color: 'from-blue-500 to-indigo-500',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      description: 'Our proprietary algorithm simulates your spending against 50+ Indian credit cards, calculating exact cash credits, fee waivers, and exclusion rules.',
      subText: 'Factoring in monthly category caps, GST charges, and true net yields.'
    },
    {
      step: '03',
      title: 'Get Optimized Card Suggestions',
      subtitle: 'Ranked Net Profit Portfolio',
      icon: CreditCard,
      color: 'from-amber-500 to-orange-500',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      description: 'Receive a personalized, ranked ranking of credit cards tailored to your financial tier with transparent explanations of why each card is suitable.',
      subText: 'Includes real-time swipe rules for Swiggy, Amazon, fuel pumps, and UPI QR codes.'
    },
    {
      step: '04',
      title: 'Save Money & Avoid Debt',
      subtitle: 'Wealth Retention & CIBIL Growth',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-500',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      description: 'Put ₹5,000–₹45,000 back in your bank account annually, hit fee waiver milestones effortlessly, and maintain a pristine 800+ credit score with 0% interest.',
      subText: 'Eliminate bank late fees and dangerous 42% revolving interest traps forever.'
    }
  ];

  return (
    <section 
      id="how-it-works"
      className="py-16 sm:py-24 bg-[#050816] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Simple 4-Step Process</span>
          </div>

          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How <span className="text-blue-400">CreditSense AI</span> Works
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            From financial confusion to maximized rewards and debt immunity in 4 clear, effortless steps.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              id={`step-card-${item.step}`}
              className="bg-[#0a192f] border border-blue-900/40 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between relative group shadow-lg shadow-black/30 hover:bg-[#112240]"
            >
              <div className="space-y-4">
                
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${item.iconBg}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-700 group-hover:text-blue-400/60 transition-colors">
                    {item.step}
                  </span>
                </div>

                {/* Subtitle tag */}
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block">
                  {item.subtitle}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>

              </div>

              {/* SubText Pill */}
              <div className="pt-4 mt-4 border-t border-blue-900/40 text-[11px] text-slate-400 flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>{item.subText}</span>
              </div>

            </div>
          ))}
        </div>

        {/* Quick Process CTA */}
        <div className="mt-12 text-center">
          <button
            id="how-it-works-start-btn"
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20 text-xs sm:text-sm cursor-pointer transition-all transform hover:-translate-y-0.5"
          >
            <span>Start Step 1: Input Your Spends Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
