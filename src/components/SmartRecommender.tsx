import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  IndianRupee, 
  Check, 
  AlertCircle, 
  TrendingUp, 
  Award, 
  ShieldAlert, 
  ChevronRight, 
  Sliders, 
  CheckCircle2,
  HelpCircle,
  Building2,
  CreditCard,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { INDIAN_CREDIT_CARDS } from '../data/cardsData';
import { CreditCardItem, RecommendationResult, UserProfileType, SpendingCategories } from '../types';
import confetti from 'canvas-confetti';

export const SmartRecommender: React.FC = () => {
  // User Input State
  const [profileType, setProfileType] = useState<UserProfileType>('young_pro');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(45000);
  
  const [spends, setSpends] = useState<SpendingCategories>({
    food: 4500,
    shopping: 6000,
    travel: 3000,
    fuel: 2500,
    utilities: 2000,
    groceries: 4000,
  });

  const [selectedCardDetail, setSelectedCardDetail] = useState<CreditCardItem | null>(null);

  // Quick Income Preset Helpers
  const incomePresets = [
    { label: 'Student / FD', value: 0 },
    { label: '₹25,000', value: 25000 },
    { label: '₹45,000', value: 45000 },
    { label: '₹80,000', value: 80000 },
    { label: '₹1,50,000+', value: 150000 },
  ];

  // Total monthly spend
  const totalMonthlySpend = useMemo(() => {
    return (Object.values(spends) as number[]).reduce((acc: number, curr: number) => acc + curr, 0);
  }, [spends]);

  const totalAnnualSpend = totalMonthlySpend * 12;

  // Recommendation Engine Calculation
  const recommendations = useMemo<RecommendationResult[]>(() => {
    return INDIAN_CREDIT_CARDS.map((card) => {
      // Check income eligibility (allow with penalty if income is low, except FD card which has 0 requirement)
      const meetsIncome = monthlyIncome >= card.minIncomeRequired || (card.minIncomeRequired === 0);

      // Calculate monthly cashback based on exact category breakdown
      let monthlyCashback = 0;
      monthlyCashback += (spends.food * (card.cashbackBreakdown.food / 100));
      monthlyCashback += (spends.shopping * (card.cashbackBreakdown.shopping / 100));
      monthlyCashback += (spends.travel * (card.cashbackBreakdown.travel / 100));
      monthlyCashback += (spends.fuel * (card.cashbackBreakdown.fuel / 100));
      monthlyCashback += (spends.utilities * (card.cashbackBreakdown.utilities / 100));
      monthlyCashback += (spends.groceries * (card.cashbackBreakdown.groceries / 100));

      // Apply realistic bank monthly caps where applicable
      if (card.id === 'sbi-cashback' && monthlyCashback > 5000) {
        monthlyCashback = 5000; // SBI Cashback ₹5k monthly cap
      }
      if (card.id === 'hdfc-millennia' && monthlyCashback > 1000) {
        monthlyCashback = 1000 + (totalMonthlySpend * 0.01); // 5% partner cap ₹1k + 1% other
      }
      if (card.id === 'axis-airtel') {
        const airtelCashback = Math.min(spends.utilities * 0.25, 250);
        const foodCashback = Math.min(spends.food * 0.10, 500);
        const otherCashback = (totalMonthlySpend - spends.utilities - spends.food) * 0.01;
        monthlyCashback = airtelCashback + foodCashback + otherCashback;
      }

      const yearlyCashback = Math.round(monthlyCashback * 12);
      
      // Determine if annual fee is waived by meeting spend threshold
      const isFeeWaived = card.annualFee === 0 || totalAnnualSpend >= card.feeWaiverSpend;
      const effectiveAnnualFee = isFeeWaived ? 0 : card.annualFee;

      // Net annual profit = Total Rewards Value - Effective Annual Fee
      const netAnnualProfit = yearlyCashback - effectiveAnnualFee;

      // Calculate match score
      let score = 70;
      if (netAnnualProfit > 15000) score += 20;
      else if (netAnnualProfit > 8000) score += 15;
      else if (netAnnualProfit > 3000) score += 10;

      if (meetsIncome) score += 8;
      else score -= 15;

      if (profileType === 'student' && card.id === 'idfc-first-wow') score += 20;
      if (profileType === 'student' && card.annualFee === 0) score += 10;
      if (profileType === 'young_pro' && (card.id === 'sbi-cashback' || card.id === 'hdfc-millennia')) score += 10;

      // Cap score between 40 and 99
      const matchScore = Math.min(99, Math.max(45, Math.round(score)));

      // Generate dynamic reasons
      const reasons: string[] = [];
      if (isFeeWaived && card.annualFee > 0) {
        reasons.push(`Your ₹${(totalAnnualSpend / 100000).toFixed(1)}L annual spend automatically waives the ₹${card.annualFee} renewal fee.`);
      } else if (card.annualFee === 0) {
        reasons.push(`Lifetime Free card: Zero annual fee forever with zero maintenance overhead.`);
      }

      if (spends.food >= 4000 && card.cashbackBreakdown.food >= 5) {
        reasons.push(`High yield on your ₹${spends.food.toLocaleString('en-IN')}/mo dining and food delivery spends (${card.cashbackBreakdown.food}% cashback).`);
      }

      if (spends.shopping >= 5000 && card.cashbackBreakdown.shopping >= 5) {
        reasons.push(`Captures maximum 5% direct reward on your ₹${spends.shopping.toLocaleString('en-IN')}/mo e-commerce purchases.`);
      }

      if (card.rupayUpi) {
        reasons.push(`Linkable to UPI (Google Pay / Paytm) to earn rewards on everyday merchant QR scans.`);
      }

      if (reasons.length === 0) {
        reasons.push(card.whySuitable);
      }

      return {
        card,
        matchScore,
        estimatedMonthlyCashback: Math.round(monthlyCashback),
        estimatedYearlyCashback: yearlyCashback,
        isFeeWaived,
        netAnnualProfit,
        reasons,
      };
    }).sort((a, b) => b.netAnnualProfit - a.netAnnualProfit);
  }, [monthlyIncome, spends, profileType, totalAnnualSpend, totalMonthlySpend]);

  const topCard = recommendations[0];

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSpendChange = (cat: keyof SpendingCategories, value: number) => {
    setSpends(prev => ({
      ...prev,
      [cat]: value,
    }));
  };

  return (
    <section 
      id="recommender"
      className="py-16 sm:py-24 bg-[#050816] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Core Feature 1: Intelligent Match Engine</span>
          </div>

          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Smart Credit Card <span className="text-blue-400">Recommendation</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Adjust your monthly income and category spends. Our AI evaluates exact cashback rules, annual fees, and waiver thresholds to rank the highest net-profit cards for your lifestyle.
          </p>
        </div>

        {/* Main 2-Column Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Inputs Form (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0a192f] border border-blue-900/40 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl shadow-black/40">
            
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/40">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Your Financial Profile
                </h3>
              </div>
              <span className="text-xs text-blue-400 font-semibold">
                Live Recalculation
              </span>
            </div>

            {/* Profile Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Who are you?</span>
                <span className="text-[11px] text-slate-400 font-normal">Shapes approval odds</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#050816] rounded-xl border border-blue-900/40">
                {[
                  { id: 'student', label: 'Student / FD' },
                  { id: 'young_pro', label: 'Young Pro' },
                  { id: 'salaried', label: 'Salaried' },
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`profile-btn-${item.id}`}
                    onClick={() => setProfileType(item.id as UserProfileType)}
                    className={`py-2 px-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      profileType === item.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#112240]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Income Slider & Quick Chips */}
            <div className="space-y-3 p-3.5 bg-[#050816] border border-blue-900/40 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Monthly In-Hand Income
                </label>
                <span className="text-sm font-bold font-mono text-blue-300">
                  {monthlyIncome === 0 ? 'Zero / Student FD' : `₹${monthlyIncome.toLocaleString('en-IN')}`}
                </span>
              </div>

              <input
                type="range"
                id="income-slider"
                min="0"
                max="200000"
                step="5000"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />

              {/* Quick Income Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {incomePresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setMonthlyIncome(preset.value)}
                    className={`text-[11px] px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                      monthlyIncome === preset.value
                        ? 'bg-blue-500/20 border-blue-500 text-blue-300 font-semibold'
                        : 'bg-[#0a192f] border-blue-900/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Spending Categories Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Monthly Category Spends
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Total: ₹{totalMonthlySpend.toLocaleString('en-IN')}/mo
                </span>
              </div>

              {/* Spend Sliders */}
              <div className="space-y-3.5">
                {[
                  { key: 'food' as const, label: '🍔 Food & Dining (Swiggy/Zomato)', max: 25000, step: 500 },
                  { key: 'shopping' as const, label: '🛍️ Online Shopping (Amazon/Flipkart)', max: 35000, step: 500 },
                  { key: 'travel' as const, label: '✈️ Travel & Commute (Flights/Uber)', max: 30000, step: 500 },
                  { key: 'fuel' as const, label: '⛽ Fuel / Petrol Pumps', max: 15000, step: 500 },
                  { key: 'utilities' as const, label: '⚡ Utilities & Mobile Recharges', max: 15000, step: 500 },
                  { key: 'groceries' as const, label: '🛒 Groceries (Blinkit/Zepto/DMart)', max: 25000, step: 500 },
                ].map((item) => (
                  <div key={item.key} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">{item.label}</span>
                      <span className="font-mono text-blue-300 font-semibold">
                        ₹{spends[item.key].toLocaleString('en-IN')}
                      </span>
                    </div>
                    <input
                      type="range"
                      id={`spend-slider-${item.key}`}
                      min="0"
                      max={item.max}
                      step={item.step}
                      value={spends[item.key]}
                      onChange={(e) => handleSpendChange(item.key, Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                ))}
              </div>

            </div>

            {/* Quick Reset / Optimize Button */}
            <div className="pt-2">
              <button
                id="trigger-celebrate-btn"
                onClick={triggerCelebration}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Celebrate Your Annual Yield (₹{topCard.netAnnualProfit.toLocaleString('en-IN')})</span>
              </button>
            </div>

          </div>

          {/* Right Column: AI Recommended Ranked Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Top Match Highlight Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0a192f] border border-blue-500/40 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
                    <Award className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                      #1 Recommended Card for You
                    </span>
                    <h4 className="text-lg font-bold text-white">
                      {topCard.card.name}
                    </h4>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Net Annual Gain</span>
                  <span className="text-xl sm:text-2xl font-extrabold font-['Space_Grotesk'] text-emerald-400">
                    +₹{topCard.netAnnualProfit.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Cards List */}
            <div className="space-y-4">
              {recommendations.slice(0, 4).map((rec, index) => (
                <div
                  key={rec.card.id}
                  id={`recommended-card-${rec.card.id}`}
                  className={`bg-[#0a192f] border rounded-2xl p-5 sm:p-6 transition-all duration-300 space-y-4 ${
                    index === 0 
                      ? 'border-blue-500/60 shadow-lg shadow-blue-950/40 ring-1 ring-blue-500/30' 
                      : 'border-blue-900/40 hover:border-blue-700/60'
                  }`}
                >
                  {/* Top Bar: Bank, Name, Badge, Match Score */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-blue-900/40">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#112240] border border-blue-900/50 flex items-center justify-center shrink-0">
                        <CreditCard className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base sm:text-lg font-bold text-white">
                            {rec.card.name}
                          </h4>
                          {rec.card.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
                              {rec.card.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">{rec.card.bank} • {rec.card.cardType} • {rec.card.network}</p>
                      </div>
                    </div>

                    {/* Match Score */}
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">AI Match</span>
                        <span className="text-sm font-extrabold text-blue-400 font-['Space_Grotesk']">
                          {rec.matchScore}%
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-blue-500/40 flex items-center justify-center text-xs font-bold text-white bg-[#050816]">
                        #{index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Financial Metrics Summary Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-[#050816] border border-blue-900/40">
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">Monthly Cashback</span>
                      <span className="text-sm font-bold font-mono text-blue-300">
                        ₹{rec.estimatedMonthlyCashback.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">Yearly Rewards</span>
                      <span className="text-sm font-bold font-mono text-emerald-400">
                        ₹{rec.estimatedYearlyCashback.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">Annual Fee</span>
                      <span className="text-xs font-bold text-slate-300">
                        {rec.card.annualFee === 0 
                          ? '₹0 (Free)' 
                          : rec.isFeeWaived 
                            ? <span className="text-emerald-400 line-through">₹{rec.card.annualFee} (Waived)</span>
                            : `₹${rec.card.annualFee}`}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">Net Annual Profit</span>
                      <span className="text-sm font-extrabold font-mono text-emerald-400">
                        +₹{rec.netAnnualProfit.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* AI Explanation / Why this card is suitable */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      Why this card is suitable for you:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {rec.reasons.map((reason, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action / Details Accordion Toggle */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      {rec.card.rupayUpi && (
                        <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium">
                          ⚡ RuPay UPI Ready
                        </span>
                      )}
                      <span className="hidden sm:inline">
                        Min Income: {rec.card.minIncomeRequired === 0 ? 'No income proof' : `₹${rec.card.minIncomeRequired.toLocaleString('en-IN')}/mo`}
                      </span>
                    </div>

                    <button
                      id={`view-details-btn-${rec.card.id}`}
                      onClick={() => setSelectedCardDetail(selectedCardDetail?.id === rec.card.id ? null : rec.card)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:text-white bg-[#112240] hover:bg-[#1d3557] border border-blue-900/50 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>{selectedCardDetail?.id === rec.card.id ? 'Hide Details' : 'View Full Breakdown'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${selectedCardDetail?.id === rec.card.id ? 'rotate-90' : ''}`} />
                    </button>
                  </div>

                  {/* Expanded Detail Panel */}
                  {selectedCardDetail?.id === rec.card.id && (
                    <div className="mt-4 pt-4 border-t border-blue-900/40 space-y-4 animate-fadeIn">
                      
                      {/* Key Perks */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                          Key Financial Perks:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {rec.card.keyPerks.map((perk, pIdx) => (
                            <div key={pIdx} className="p-2.5 rounded-lg bg-[#050816] border border-blue-900/40 text-xs text-slate-300 flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{perk}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Hidden Cost Warnings */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Things to Watch Out For (Hidden Costs):
                        </span>
                        <div className="space-y-1.5">
                          {rec.card.hiddenCostWarnings.map((warn, wIdx) => (
                            <div key={wIdx} className="p-2 rounded-lg bg-amber-950/20 border border-amber-900/30 text-xs text-amber-200/90 flex items-start gap-2">
                              <span className="text-amber-400 font-bold">•</span>
                              <span>{warn}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Fee Waiver Condition */}
                      {rec.card.annualFee > 0 && (
                        <div className="p-3 rounded-lg bg-[#112240] border border-blue-900/50 text-xs text-slate-300 flex items-center justify-between">
                          <span>Annual Fee Waiver Rule:</span>
                          <span className="font-semibold text-blue-300">
                            Spend ₹{rec.card.feeWaiverSpend.toLocaleString('en-IN')} per year to get ₹{rec.card.annualFee} fee 100% waived
                          </span>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
