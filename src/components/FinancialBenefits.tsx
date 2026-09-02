import React from 'react';
import { 
  TrendingUp, 
  IndianRupee, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Award,
  Zap,
  Target,
  ArrowRight
} from 'lucide-react';

interface FinancialBenefitsProps {
  onGetStarted: () => void;
}

export const FinancialBenefits: React.FC<FinancialBenefitsProps> = ({ onGetStarted }) => {
  const benefitCards = [
    {
      title: 'Save ₹2,000–₹25,000+ Every Year',
      tag: 'Direct Cash Back',
      icon: IndianRupee,
      color: 'from-emerald-500 to-teal-500',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      description: 'Stop earning pathetic 0.5% points that expire unredeemed. Convert your everyday grocery, dining, utility, and shopping expenses into hard cash credited directly to your billing statement.',
      stat: '₹18,400',
      statLabel: 'Avg. Annual Cash Recovered'
    },
    {
      title: 'Eliminate 42% Interest & Late Fees',
      tag: 'Zero Debt Traps',
      icon: ShieldCheck,
      color: 'from-cyan-500 to-blue-500',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      description: 'Never fall into the bank minimum due trap. Our automated risk alerts and credit utilization monitoring ensure you enjoy up to 50 days of interest-free money without paying 1 rupee in interest.',
      stat: '₹0 Interest',
      statLabel: '100% Grace Period Optimization'
    },
    {
      title: 'Build an 800+ CIBIL Credit Score',
      tag: 'Financial Planning',
      icon: Target,
      color: 'from-blue-500 to-indigo-500',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      description: 'A stellar CIBIL score unlocks 0.5%–1.0% cheaper interest rates on home and car loans in India, saving you lakhs over your lifetime. We keep your credit utilization strictly within the golden 30% ratio.',
      stat: '800+ CIBIL',
      statLabel: 'Cheaper Future Loan Rates'
    },
    {
      title: 'Unlock Airport Lounges & Milestones',
      tag: 'Lifestyle Dividend',
      icon: Award,
      color: 'from-amber-500 to-orange-500',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      description: 'Enjoy complimentary airport lounge buffets (valued at ₹1,200–₹1,800 per visit), 100% fuel surcharge waivers, and milestone vouchers that completely offset card renewal fees.',
      stat: '₹7,500+',
      statLabel: 'Complimentary Lifestyle Perks'
    }
  ];

  const comparisonRows = [
    {
      category: 'Annual Net Cashback on ₹30,000/mo spend',
      unoptimized: '₹3,600 (1% low value pts)',
      creditSense: '₹19,800 (5.5% blended return)',
      benefit: '+₹16,200 pure profit'
    },
    {
      category: 'Food Delivery (Swiggy / Zomato)',
      unoptimized: '1% random points (~₹10)',
      creditSense: '10% instant discount (~₹100)',
      benefit: '10X higher return'
    },
    {
      category: 'Annual Renewal Fees',
      unoptimized: 'Paid annually with 18% GST',
      creditSense: '100% waived via spend milestones',
      benefit: 'Saves ₹500–₹2,500/yr'
    },
    {
      category: 'Handling Unpaid Balance & Minimum Due',
      unoptimized: 'Pay min due → 42% APR interest explodes',
      creditSense: 'Smart auto-pay rule → 0% interest',
      benefit: 'Saves ₹8,000+ in penalty charges'
    },
    {
      category: 'UPI QR Code Payments at Shops',
      unoptimized: '₹0 rewards on standard bank UPI',
      creditSense: '1.5% NeuCoins / Cashback on RuPay UPI',
      benefit: 'Earns on offline chai/kirana'
    }
  ];

  return (
    <section 
      id="benefits"
      className="py-16 sm:py-24 bg-[#050816] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Section 5: Tangible Financial Benefits</span>
          </div>

          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Financial Return of <span className="text-emerald-400">Card Optimization</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Every swipe without an optimization strategy is money handed directly to bank shareholders. Here is the exact financial return of switching to CreditSense AI.
          </p>
        </div>

        {/* 4 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefitCards.map((b, idx) => (
            <div
              key={idx}
              className="bg-[#0a192f] border border-blue-900/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:border-blue-500/50 hover:bg-[#112240] space-y-4 shadow-lg shadow-black/30"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${b.iconBg}`}>
                    <b.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#050816] text-blue-300 border border-blue-900/40">
                    {b.tag}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white">
                  {b.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {b.description}
                </p>
              </div>

              <div className="pt-4 border-t border-blue-900/40">
                <span className="text-xl sm:text-2xl font-extrabold font-['Space_Grotesk'] text-emerald-400 block">
                  {b.stat}
                </span>
                <span className="text-[11px] text-slate-400 font-medium block">
                  {b.statLabel}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table: Unoptimized vs CreditSense Strategy */}
        <div className="bg-[#0a192f] border border-blue-900/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 shadow-black/40">
          
          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">
              The Real Cost of Being Uninformed
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Side-by-side comparison of standard Indian card habits vs CreditSense AI execution.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-blue-900/40 text-slate-400">
                  <th className="py-3 px-4 font-semibold">Spending Category / Scenario</th>
                  <th className="py-3 px-4 font-semibold text-rose-400">Unoptimized Card User</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">CreditSense AI Strategy</th>
                  <th className="py-3 px-4 font-semibold text-blue-300 text-right">Net Financial Gain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/30">
                {comparisonRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#112240] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {row.category}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{row.unoptimized}</span>
                    </td>
                    <td className="py-3.5 px-4 text-emerald-300 font-medium">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{row.creditSense}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-blue-300 font-mono">
                      {row.benefit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400 text-center sm:text-left">
              *Calculated based on actual fee schedules of top Indian commercial banks.
            </span>
            <button
              onClick={onGetStarted}
              className="px-5 py-2.5 rounded-xl font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
            >
              <span>Switch to CreditSense AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
