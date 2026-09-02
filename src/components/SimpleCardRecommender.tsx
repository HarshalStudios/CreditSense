import React, { useState, useMemo } from 'react';
import { 
  CreditCard, 
  Calculator, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  Plane, 
  Gift, 
  ShieldCheck, 
  Smartphone, 
  Zap, 
  Tag, 
  ChevronRight,
  HelpCircle,
  TrendingUp,
  Info
} from 'lucide-react';
import { INDIAN_CREDIT_CARDS } from '../data/cardsData';
import { CreditCardItem } from '../types';

interface SimpleCardRecommenderProps {
  onSelectCardForCalculator?: (cardName: string, rewardRate: number, annualFee: number, waiverSpend: number) => void;
}

// 1-Click Spending Profile Templates
interface ProfileTemplate {
  id: string;
  name: string;
  emoji: string;
  description: string;
  income: number;
  food: number;
  shopping: number;
  travel: number;
  bills: number;
  badge: string;
}

const SPENDING_TEMPLATES: ProfileTemplate[] = [
  {
    id: 'student',
    name: 'Student / Starter',
    emoji: '🎓',
    description: 'Lifetime Free / Easy approval with ₹0 annual fee',
    income: 20000,
    food: 3000,
    shopping: 4000,
    travel: 1000,
    bills: 1000,
    badge: '₹0 Fee Focus'
  },
  {
    id: 'online_shopper',
    name: 'Online Shopping Pro',
    emoji: '🛍️',
    description: 'Heavy Amazon, Flipkart & Myntra shopper',
    income: 50000,
    food: 6000,
    shopping: 18000,
    travel: 3000,
    bills: 3000,
    badge: '5% Cashback'
  },
  {
    id: 'foodie',
    name: 'Foodie & Swiggy Addict',
    emoji: '🍕',
    description: 'Swiggy, Zomato & grocery delivery lover',
    income: 40000,
    food: 12000,
    shopping: 5000,
    travel: 2000,
    bills: 2500,
    badge: '10% Dining'
  },
  {
    id: 'traveler',
    name: 'Frequent Flyer & Lounge',
    emoji: '✈️',
    description: 'Flight tickets, hotels & 0% forex markup',
    income: 100000,
    food: 8000,
    shopping: 12000,
    travel: 25000,
    bills: 5000,
    badge: 'Airport Lounge'
  },
  {
    id: 'upi_bills',
    name: 'RuPay UPI & Bills',
    emoji: '⚡',
    description: 'QR code UPI scanner & utility bill payer',
    income: 45000,
    food: 6000,
    shopping: 8000,
    travel: 2000,
    bills: 8000,
    badge: 'UPI Rewards'
  },
  {
    id: 'commute_fuel',
    name: 'Daily Commute & Fuel',
    emoji: '⛽',
    description: 'Petrol pumps, vehicle refuels & highway tolls',
    income: 35000,
    food: 4000,
    shopping: 4000,
    travel: 12000,
    bills: 2000,
    badge: '7.25% Fuel'
  },
  {
    id: 'salaried',
    name: 'Balanced Professional',
    emoji: '💼',
    description: 'Balanced day-to-day household spends',
    income: 65000,
    food: 8000,
    shopping: 10000,
    travel: 5000,
    bills: 4000,
    badge: 'All-Rounder'
  }
];

type FilterTab = 'matched' | 'cashback' | 'ltf' | 'travel' | 'upi' | 'all';

export function SimpleCardRecommender({ onSelectCardForCalculator }: SimpleCardRecommenderProps) {
  // Selected Profile Template (null if custom sliders adjusted)
  const [activeTemplateId, setActiveTemplateId] = useState<string>('online_shopper');

  // Input States
  const [monthlyIncome, setMonthlyIncome] = useState<number>(50000);
  const [foodSpend, setFoodSpend] = useState<number>(6000);
  const [shoppingSpend, setShoppingSpend] = useState<number>(18000);
  const [travelSpend, setTravelSpend] = useState<number>(3000);
  const [billsSpend, setBillsSpend] = useState<number>(3000);

  // Active Catalog Filter
  const [activeTab, setActiveTab] = useState<FilterTab>('matched');
  const [showAllCards, setShowAllCards] = useState<boolean>(false);

  // Handle 1-Click Template Click
  const handleApplyTemplate = (tpl: ProfileTemplate) => {
    setActiveTemplateId(tpl.id);
    setMonthlyIncome(tpl.income);
    setFoodSpend(tpl.food);
    setShoppingSpend(tpl.shopping);
    setTravelSpend(tpl.travel);
    setBillsSpend(tpl.bills);
    setActiveTab('matched');
  };

  const totalMonthlySpend = foodSpend + shoppingSpend + travelSpend + billsSpend;
  const totalAnnualSpend = totalMonthlySpend * 12;

  // Calculate personalized savings and ranking for every card
  const calculatedCards = useMemo(() => {
    return INDIAN_CREDIT_CARDS.map((card) => {
      // Monthly Cashback estimation based on user's exact category spends
      const foodCashback = (foodSpend * (card.cashbackBreakdown.food || 1.0)) / 100;
      const shoppingCashback = (shoppingSpend * (card.cashbackBreakdown.shopping || 1.0)) / 100;
      const travelCashback = (travelSpend * (card.cashbackBreakdown.travel || 1.0)) / 100;
      const billsCashback = (billsSpend * (card.cashbackBreakdown.utilities || 1.0)) / 100;

      let estMonthly = Math.round(foodCashback + shoppingCashback + travelCashback + billsCashback);

      // Card specific caps
      if (card.id === 'axis-airtel') {
        estMonthly = Math.min(1250, estMonthly);
      } else if (card.id === 'hdfc-swiggy') {
        estMonthly = Math.min(1800, estMonthly);
      } else if (card.id === 'sbi-cashback') {
        estMonthly = Math.min(5000, estMonthly);
      }

      const estYearly = estMonthly * 12;
      const isFeeWaived = card.annualFee === 0 || (card.feeWaiverSpend > 0 && totalAnnualSpend >= card.feeWaiverSpend);
      const effectiveAnnualFee = isFeeWaived ? 0 : card.annualFee;
      const netAnnualSavings = estYearly - effectiveAnnualFee;

      // Match Score calculation
      let score = 70;
      if (monthlyIncome >= card.minIncomeRequired) score += 10;
      if (isFeeWaived) score += 10;
      if (shoppingSpend > 10000 && (card.id === 'sbi-cashback' || card.id === 'icici-amazon-pay' || card.id === 'hdfc-millennia')) score += 10;
      if (foodSpend > 8000 && (card.id === 'hdfc-swiggy' || card.id === 'axis-airtel')) score += 15;
      if (travelSpend > 15000 && (card.id === 'scapia-federal' || card.id === 'hdfc-regalia-gold')) score += 15;
      if (monthlyIncome < 25000 && (card.id === 'idfc-first-wow' || card.id === 'icici-amazon-pay')) score += 15;

      return {
        card,
        estimatedMonthly: estMonthly,
        estimatedYearly: estYearly,
        isFeeWaived,
        netAnnualSavings,
        matchScore: Math.min(99, Math.max(65, score)),
      };
    }).sort((a, b) => b.netAnnualSavings - a.netAnnualSavings);
  }, [monthlyIncome, foodSpend, shoppingSpend, travelSpend, billsSpend, totalAnnualSpend]);

  // Filter cards based on selected filter tab
  const displayedCards = useMemo(() => {
    if (activeTab === 'matched') {
      return showAllCards ? calculatedCards : calculatedCards.slice(0, 3);
    }
    if (activeTab === 'cashback') {
      return calculatedCards.filter(c => c.card.cardType === 'Cashback' || c.card.id === 'sbi-cashback' || c.card.id === 'hdfc-swiggy' || c.card.id === 'icici-amazon-pay');
    }
    if (activeTab === 'ltf') {
      return calculatedCards.filter(c => c.card.annualFee === 0 || c.card.cardType === 'Lifetime Free');
    }
    if (activeTab === 'travel') {
      return calculatedCards.filter(c => c.card.cardType === 'Travel' || c.card.id === 'scapia-federal' || c.card.id === 'hdfc-regalia-gold');
    }
    if (activeTab === 'upi') {
      return calculatedCards.filter(c => c.card.rupayUpi || c.card.id === 'axis-airtel' || c.card.id === 'axis-ace');
    }
    return calculatedCards; // 'all'
  }, [activeTab, calculatedCards, showAllCards]);

  const handleSendToCalculator = (card: CreditCardItem, estRewardPercent: number) => {
    if (onSelectCardForCalculator) {
      onSelectCardForCalculator(card.name, estRewardPercent, card.annualFee, card.feeWaiverSpend);
    }
    const calcEl = document.getElementById('savings-calculator');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendToInterestWarning = (card: CreditCardItem) => {
    const interestEl = document.getElementById('interest-warning');
    if (interestEl) {
      interestEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="recommender" className="py-12 sm:py-16 bg-[#050816] relative border-t border-blue-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Feature 1 • 1-Click Card Advisor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Find Your Highest-Saving Credit Card
          </h2>
          <p className="text-sm text-slate-300">
            Pick a 1-click lifestyle template below or adjust your monthly spends to immediately see net annual cashback, fee waivers, and top card matches.
          </p>
        </div>

        {/* 1-CLICK TEMPLATES ROW */}
        <div className="mb-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>1-Click Spender Templates (Select to instant-fill):</span>
            </span>
            <span className="text-[11px] text-blue-400">⚡ 1-Click Ready</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
            {SPENDING_TEMPLATES.map((tpl) => {
              const isSelected = activeTemplateId === tpl.id;
              return (
                <button
                  key={tpl.id}
                  id={`template-btn-${tpl.id}`}
                  onClick={() => handleApplyTemplate(tpl)}
                  className={`p-3 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-400 ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/20 scale-[1.02]'
                      : 'bg-[#0a192f] border-blue-900/40 hover:border-blue-700/60 hover:bg-[#0e213d]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{tpl.emoji}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-blue-400 text-blue-950' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {tpl.badge}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white leading-tight">
                      {tpl.name}
                    </h4>
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-2 leading-tight">
                    {tpl.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-COLUMN LAYOUT: SPENDING SLIDERS + RICH CARD RECOMMENDATIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Spending Customizer (4 Cols) */}
          <div className="lg:col-span-4 bg-[#0a192f] border border-blue-900/40 rounded-2xl p-5 space-y-5 shadow-xl shadow-black/40 sticky top-20">
            <div className="flex items-center justify-between border-b border-blue-900/40 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-400" />
                <span>Custom Spends Profile</span>
              </h3>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">
                ₹{totalMonthlySpend.toLocaleString('en-IN')}/mo
              </span>
            </div>

            {/* Monthly Income Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Monthly Salary / Income:</span>
                <span className="font-mono font-bold text-blue-300">
                  ₹{monthlyIncome.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="15000"
                max="150000"
                step="5000"
                value={monthlyIncome}
                onChange={(e) => {
                  setActiveTemplateId('');
                  setMonthlyIncome(Number(e.target.value));
                }}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* 4 Category Sliders */}
            <div className="space-y-3.5 pt-2 border-t border-blue-900/30">
              <span className="text-xs font-bold text-slate-200 block">
                Category Spends:
              </span>

              {/* 1. Shopping */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">🛍️ Online Shopping</span>
                  <span className="font-mono font-semibold text-white">₹{shoppingSpend.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40000"
                  step="1000"
                  value={shoppingSpend}
                  onChange={(e) => {
                    setActiveTemplateId('');
                    setShoppingSpend(Number(e.target.value));
                  }}
                  className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* 2. Food & Dining */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">🍕 Food & Swiggy/Zomato</span>
                  <span className="font-mono font-semibold text-white">₹{foodSpend.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30000"
                  step="1000"
                  value={foodSpend}
                  onChange={(e) => {
                    setActiveTemplateId('');
                    setFoodSpend(Number(e.target.value));
                  }}
                  className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* 3. Travel */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">✈️ Travel, Flights & Commute</span>
                  <span className="font-mono font-semibold text-white">₹{travelSpend.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40000"
                  step="1000"
                  value={travelSpend}
                  onChange={(e) => {
                    setActiveTemplateId('');
                    setTravelSpend(Number(e.target.value));
                  }}
                  className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* 4. Utility Bills & Recharges */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">⚡ Bills, UPI & Electricity</span>
                  <span className="font-mono font-semibold text-white">₹{billsSpend.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25000"
                  step="500"
                  value={billsSpend}
                  onChange={(e) => {
                    setActiveTemplateId('');
                    setBillsSpend(Number(e.target.value));
                  }}
                  className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
            </div>

            {/* Total Annual Spend Summary */}
            <div className="p-3 rounded-xl bg-[#050816] border border-blue-900/40 text-xs space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Annual Card Spends:</span>
                <span className="font-mono font-bold text-white">₹{totalAnnualSpend.toLocaleString('en-IN')}/yr</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                Used to determine if annual fees (₹500–₹2,500) will be waived automatically by banks.
              </p>
            </div>

          </div>

          {/* Right Column: Dynamic Recommendations + Filter Tabs (8 Cols) */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Filter Tabs & Quick Categorization */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-900/40 pb-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'matched', label: '🎯 Top Matches', count: calculatedCards.length },
                  { id: 'cashback', label: '🔥 Cashback', count: 4 },
                  { id: 'ltf', label: '🆓 Zero Fee (LTF)', count: 3 },
                  { id: 'travel', label: '✈️ Travel & Lounge', count: 2 },
                  { id: 'upi', label: '📱 RuPay UPI / Bills', count: 3 },
                  { id: 'all', label: '💳 All 11 Cards', count: INDIAN_CREDIT_CARDS.length },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    id={`filter-tab-${tab.id}`}
                    onClick={() => {
                      setActiveTab(tab.id as FilterTab);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'bg-[#0a192f] text-slate-400 border border-blue-900/40 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === 'matched' && (
                <button
                  onClick={() => setShowAllCards(!showAllCards)}
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold underline cursor-pointer"
                >
                  {showAllCards ? 'Show Top 3 Matches' : `View All (${calculatedCards.length})`}
                </button>
              )}
            </div>

            {/* Recommendation Cards List */}
            <div className="space-y-4">
              {displayedCards.map((item, index) => {
                const card = item.card;
                const isTopMatch = index === 0 && activeTab === 'matched';
                const isSecondMatch = index === 1 && activeTab === 'matched';

                // Approximate reward percentage for calculator
                const calcRewardRate = 
                  card.id === 'sbi-cashback' ? 5 : 
                  card.id === 'hdfc-swiggy' ? 6 : 
                  card.id === 'scapia-federal' ? 5 :
                  card.id === 'sbi-bpcl-octane' ? 6 :
                  card.id === 'icici-amazon-pay' ? 4 :
                  card.id === 'axis-airtel' ? 7 :
                  card.id === 'axis-ace' ? 4 : 4;

                return (
                  <div
                    key={card.id}
                    id={`card-recommendation-${card.id}`}
                    className={`rounded-2xl p-5 transition-all border ${
                      isTopMatch
                        ? 'bg-[#0a192f] border-blue-400/80 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/40'
                        : 'bg-[#0a192f]/90 border-blue-900/40 hover:border-blue-700/60'
                    }`}
                  >
                    {/* Top Row: Header, Badge & Bank */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-blue-900/40">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          {isTopMatch && (
                            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-500 text-white shadow-sm">
                              🥇 #1 Top Match ({item.matchScore}%)
                            </span>
                          )}
                          {isSecondMatch && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                              🥈 #2 Strong Match ({item.matchScore}%)
                            </span>
                          )}
                          {card.badge && (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-amber-500/30">
                              {card.badge}
                            </span>
                          )}
                          {card.rupayUpi && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              ⚡ RuPay UPI Ready
                            </span>
                          )}
                          <span className="text-xs text-slate-400 font-medium">
                            {card.bank} • {card.network}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-white">
                          {card.name}
                        </h4>
                      </div>

                      {/* Net Annual Estimated Profit Badge */}
                      <div className="bg-[#050816] border border-blue-900/50 rounded-xl p-2.5 text-right sm:min-w-[170px]">
                        <span className="text-[10px] text-slate-400 block">Est. Net Annual Savings</span>
                        <div className="text-base font-extrabold text-emerald-400 font-mono">
                          +₹{item.netAnnualSavings.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-400">/yr</span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          (≈ ₹{item.estimatedMonthly.toLocaleString('en-IN')}/mo cashback)
                        </span>
                      </div>
                    </div>

                    {/* Middle Body: Why suitable & 4-rate Chips */}
                    <div className="py-3.5 space-y-3 text-xs">
                      <p className="text-slate-200 leading-relaxed">
                        <strong className="text-blue-300">Best For: </strong>
                        {card.whySuitable}
                      </p>

                      {/* 4 Cashback Category Chips */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="p-2 rounded-lg bg-[#050816] border border-blue-900/40">
                          <span className="text-[10px] text-slate-400 block">🛍️ Shopping:</span>
                          <span className="font-bold text-blue-300">{card.cashbackBreakdown.shopping}% Cashback</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#050816] border border-blue-900/40">
                          <span className="text-[10px] text-slate-400 block">🍕 Dining/Food:</span>
                          <span className="font-bold text-blue-300">{card.cashbackBreakdown.food}% Cashback</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#050816] border border-blue-900/40">
                          <span className="text-[10px] text-slate-400 block">⚡ Bills & Utilities:</span>
                          <span className="font-bold text-blue-300">{card.cashbackBreakdown.utilities}% Cashback</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#050816] border border-blue-900/40">
                          <span className="text-[10px] text-slate-400 block">🏷️ Offline Spends:</span>
                          <span className="font-bold text-blue-300">{card.cashbackBreakdown.other}% Flat</span>
                        </div>
                      </div>

                      {/* Fee & Waiver Status Pill */}
                      <div className="p-2.5 rounded-xl bg-blue-950/30 border border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Tag className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span>
                            <strong>Annual Fee:</strong> {card.annualFee === 0 ? '₹0 (100% Lifetime Free)' : `₹${card.annualFee}/year`}
                          </span>
                        </div>
                        <div>
                          {card.annualFee === 0 ? (
                            <span className="text-emerald-400 font-bold">✓ Zero annual charges forever</span>
                          ) : item.isFeeWaived ? (
                            <span className="text-emerald-400 font-bold">
                              ✓ 100% Fee Waived on your ₹{(totalAnnualSpend/100000).toFixed(1)}L annual spend!
                            </span>
                          ) : (
                            <span className="text-amber-300">
                              Spend ₹{(card.feeWaiverSpend / 100000).toFixed(1)}L/yr to waive fee (You: ₹{(totalAnnualSpend/100000).toFixed(1)}L)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Key Perk & Hidden Fee Warning */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                        <div className="flex items-start gap-1.5 text-slate-300 bg-[#050816] p-2 rounded-lg border border-blue-900/30">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span><strong>Perk:</strong> {card.keyPerks[0]}</span>
                        </div>
                        <div className="flex items-start gap-1.5 text-slate-300 bg-[#050816] p-2 rounded-lg border border-rose-900/30">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                          <span><strong>Watch out:</strong> {card.hiddenCostWarnings[0]}</span>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Action Buttons: 1-Click to Calculator or Interest Simulator */}
                    <div className="pt-3 border-t border-blue-900/40 flex flex-wrap items-center justify-between gap-2">
                      <button
                        onClick={() => handleSendToInterestWarning(card)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-rose-300 hover:bg-rose-950/30 border border-transparent hover:border-rose-900/40 transition-all cursor-pointer"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        <span>Check {card.apr}% APR Interest Impact</span>
                      </button>

                      <button
                        id={`btn-calc-${card.id}`}
                        onClick={() => handleSendToCalculator(card, calcRewardRate)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all cursor-pointer shadow-md shadow-blue-500/20"
                      >
                        <Calculator className="w-3.5 h-3.5" />
                        <span>Calculate Yearly Savings for {card.name.split(' ')[0]}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
