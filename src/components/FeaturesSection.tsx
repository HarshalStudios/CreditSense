import React from 'react';
import { 
  Sparkles, 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Percent,
  IndianRupee,
  Layers,
  Flame
} from 'lucide-react';

interface FeaturesSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onNavigate }) => {
  const features = [
    {
      id: 'smart-recommendation',
      targetId: 'recommender',
      title: 'Smart Credit Card Recommendation',
      tag: 'Personalized AI Matching',
      icon: Sparkles,
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      description: 'Input your monthly income and categorical spends. Our algorithm scans all major Indian bank credit cards to pinpoint the exact cards that yield the highest net financial return.',
      financialBenefit: 'Eliminates unsuitable annual fee cards; captures up to ₹24,000/yr in cashback.',
      keyPoints: [
        'Personalized for Students, Young Pros & High Earners',
        'Transparent net profit calculations after subtracting annual fees',
        'Clear explanations of why each card is mathematically suitable'
      ],
      ctaText: 'Find Your Best Card',
    },
    {
      id: 'real-time-optimizer',
      targetId: 'optimizer',
      title: 'Real-Time Card Optimizer',
      tag: 'Payment Simulator',
      icon: Zap,
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      description: 'Never guess which card to swipe at checkout. Simulate real payment scenarios across Swiggy, Amazon, fuel pumps, flights, and utilities to unlock maximum cashback instantly.',
      financialBenefit: 'Converts average 1% reward points into 5%–10% instant statement savings.',
      keyPoints: [
        'Instant merchant-by-merchant swipe rules',
        'Exact ₹ rupee savings calculated per transaction',
        'Pro tips on gateway selection & SmartBuy multiplier hacks'
      ],
      ctaText: 'Simulate Payment Now',
    },
    {
      id: 'financial-insights',
      targetId: 'calculator',
      title: 'Financial Insights & ROI Calculator',
      tag: 'Compounding Wealth',
      icon: TrendingUp,
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      description: 'Quantify your monthly and annual gains with precision. Discover how smart card selection compounds over 1 to 5 years when reinvested into index funds or high-interest savings.',
      financialBenefit: 'Clear visual proof: Unoptimized cardholders lose ₹12,000+ every year.',
      keyPoints: [
        'Dynamic monthly vs. yearly compounding projections',
        'Fee waiver milestone tracking to save ₹500–₹2,500 renewal fees',
        'Detailed value breakdown (Cashback + Lounge + Surcharges)'
      ],
      ctaText: 'Calculate Your ROI',
    },
    {
      id: 'risk-alerts',
      targetId: 'debt-alert',
      title: 'Debt & 42% APR Risk Alerts',
      tag: 'Financial Protection Guard',
      icon: AlertTriangle,
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      description: 'Indian banks earn millions from the "Minimum Due" trap and 42% APR revolving interest. CreditSense monitors your utilization thresholds to safeguard your CIBIL score and wallet.',
      financialBenefit: 'Prevents spiraling compound interest & protects 750+ CIBIL score.',
      keyPoints: [
        '30% Credit Utilization safety gauge',
        'Revolving interest simulator exposing the true cost of unpaid bills',
        'Grace period visualizer and automated zero-interest reminders'
      ],
      ctaText: 'Test Debt Guard',
    }
  ];

  return (
    <section 
      id="features"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#050816] via-[#0a192f]/40 to-[#050816] border-y border-blue-900/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Engineered for Maximum Financial Yield</span>
          </div>
          
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed to Put Money <span className="text-blue-400">Back in Your Pocket</span>
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg">
            Technology is just the tool. The outcome is <strong>real cash savings, zero hidden bank traps, and disciplined wealth building</strong>.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feat) => (
            <div
              key={feat.id}
              id={`feature-card-${feat.id}`}
              className="group bg-[#0a192f] hover:bg-[#112240] border border-blue-900/40 hover:border-blue-700/60 rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between shadow-lg shadow-black/30 hover:shadow-blue-950/40"
            >
              <div className="space-y-4">
                
                {/* Header row: Icon and Tag */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${feat.iconBg}`}>
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#050816] border border-blue-900/40 text-slate-300">
                    {feat.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {feat.description}
                </p>

                {/* Financial Benefit Callout Pill */}
                <div className="p-3 rounded-xl bg-[#050816] border border-blue-900/40 flex items-start gap-2.5">
                  <div className="p-1 rounded bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                    <IndianRupee className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                      Financial Return
                    </span>
                    <p className="text-xs font-semibold text-emerald-300">
                      {feat.financialBenefit}
                    </p>
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-2 pt-1">
                  {feat.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Bottom Action CTA */}
              <div className="pt-6 mt-6 border-t border-blue-900/40">
                <button
                  id={`feature-btn-${feat.id}`}
                  onClick={() => onNavigate(feat.targetId)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 hover:text-white bg-[#112240] hover:bg-blue-600 border border-blue-800/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{feat.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
