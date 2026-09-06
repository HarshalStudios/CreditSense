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
  Info,
  Search,
  SlidersHorizontal,
  Building2,
  Check,
  ChevronDown,
  ChevronUp
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
    id: 'luxury_metal',
    name: 'Luxury & Premium Metal',
    emoji: '👑',
    description: 'SmartBuy 33% travel, concierge & global lounges',
    income: 250000,
    food: 20000,
    shopping: 35000,
    travel: 40000,
    bills: 15000,
    badge: 'Super Premium'
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

type FilterTab = 'matched' | 'cashback' | 'ltf' | 'travel' | 'upi' | 'fuel' | 'dining' | 'premium' | 'all';
type SortOption = 'savings' | 'score' | 'fee_low' | 'income_low' | 'forex';

export function SimpleCardRecommender({ onSelectCardForCalculator }: SimpleCardRecommenderProps) {
  // Selected Profile Template (null if custom sliders adjusted)
  const [activeTemplateId, setActiveTemplateId] = useState<string>('online_shopper');

  // Input States
  const [monthlyIncome, setMonthlyIncome] = useState<number>(50000);
  const [foodSpend, setFoodSpend] = useState<number>(6000);
  const [shoppingSpend, setShoppingSpend] = useState<number>(18000);
  const [travelSpend, setTravelSpend] = useState<number>(3000);
  const [billsSpend, setBillsSpend] = useState<number>(3000);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('savings');
  const [activeTab, setActiveTab] = useState<FilterTab>('matched');
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isSlidersExpandedOnMobile, setIsSlidersExpandedOnMobile] = useState<boolean>(true);

  // Unique list of banks
  const availableBanks = useMemo(() => {
    const banks = Array.from(new Set(INDIAN_CREDIT_CARDS.map(c => c.bank))).sort();
    return ['all', ...banks];
  }, []);

  // Handle 1-Click Template Click
  const handleApplyTemplate = (tpl: ProfileTemplate) => {
    setActiveTemplateId(tpl.id);
    setMonthlyIncome(tpl.income);
    setFoodSpend(tpl.food);
    setShoppingSpend(tpl.shopping);
    setTravelSpend(tpl.travel);
    setBillsSpend(tpl.bills);
    setActiveTab('matched');
    setVisibleCount(6);
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
      } else if (card.id === 'hsbc-cashback') {
        estMonthly = Math.min(1500, estMonthly);
      }

      const estYearly = estMonthly * 12;
      const isFeeWaived = card.annualFee === 0 || (card.feeWaiverSpend > 0 && totalAnnualSpend >= card.feeWaiverSpend);
      const effectiveAnnualFee = isFeeWaived ? 0 : card.annualFee;
      const netAnnualSavings = estYearly - effectiveAnnualFee;

      // Match Score calculation
      let score = 70;
      if (monthlyIncome >= card.minIncomeRequired) score += 10;
      if (isFeeWaived) score += 10;
      if (shoppingSpend > 10000 && (card.id === 'sbi-cashback' || card.id === 'icici-amazon-pay' || card.id === 'hdfc-millennia' || card.id === 'axis-flipkart')) score += 10;
      if (foodSpend > 8000 && (card.id === 'hdfc-swiggy' || card.id === 'axis-airtel' || card.id === 'hsbc-cashback' || card.id === 'indusind-eazydiner')) score += 15;
      if (travelSpend > 15000 && (card.id === 'scapia-federal' || card.id === 'hdfc-regalia-gold' || card.id === 'axis-atlas' || card.id === 'hdfc-infinia')) score += 15;
      if (monthlyIncome < 25000 && (card.id === 'idfc-first-wow' || card.id === 'icici-amazon-pay' || card.id === 'kotak-811-dream')) score += 15;
      if (card.rupayUpi && billsSpend > 5000) score += 8;

      return {
        card,
        estimatedMonthly: estMonthly,
        estimatedYearly: estYearly,
        isFeeWaived,
        netAnnualSavings,
        matchScore: Math.min(99, Math.max(65, score)),
      };
    });
  }, [monthlyIncome, foodSpend, shoppingSpend, travelSpend, billsSpend, totalAnnualSpend]);

  // Filter & Search & Sort cards
  const filteredAndSortedCards = useMemo(() => {
    let result = [...calculatedCards];

    // Bank Filter
    if (selectedBank !== 'all') {
      result = result.filter(item => item.card.bank.toLowerCase() === selectedBank.toLowerCase());
    }

    // Search Query (Name, Bank, Badge, Perks)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.card.name.toLowerCase().includes(q) ||
        item.card.bank.toLowerCase().includes(q) ||
        item.card.network.toLowerCase().includes(q) ||
        item.card.badge?.toLowerCase().includes(q) ||
        item.card.whySuitable.toLowerCase().includes(q) ||
        item.card.keyPerks.some(p => p.toLowerCase().includes(q))
      );
    }

    // Tab Filter
    if (activeTab === 'cashback') {
      result = result.filter(c => c.card.cardType === 'Cashback' || c.card.cardType === 'Shopping');
    } else if (activeTab === 'ltf') {
      result = result.filter(c => c.card.annualFee === 0 || c.card.cardType === 'Lifetime Free');
    } else if (activeTab === 'travel') {
      result = result.filter(c => c.card.cardType === 'Travel' || c.card.forexMarkup <= 2.0);
    } else if (activeTab === 'upi') {
      result = result.filter(c => c.card.rupayUpi || c.card.cardType === 'UPI');
    } else if (activeTab === 'fuel') {
      result = result.filter(c => c.card.cardType === 'Fuel' || (c.card.cashbackBreakdown.fuel && c.card.cashbackBreakdown.fuel >= 4.0));
    } else if (activeTab === 'dining') {
      result = result.filter(c => c.card.cardType === 'Dining' || (c.card.cashbackBreakdown.food && c.card.cashbackBreakdown.food >= 5.0));
    } else if (activeTab === 'premium') {
      result = result.filter(c => c.card.cardType === 'Premium' || c.card.annualFee >= 3000);
    }

    // Sort result
    if (sortBy === 'savings') {
      result.sort((a, b) => b.netAnnualSavings - a.netAnnualSavings);
    } else if (sortBy === 'score') {
      result.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === 'fee_low') {
      result.sort((a, b) => a.card.annualFee - b.card.annualFee);
    } else if (sortBy === 'income_low') {
      result.sort((a, b) => a.card.minIncomeRequired - b.card.minIncomeRequired);
    } else if (sortBy === 'forex') {
      result.sort((a, b) => a.card.forexMarkup - b.card.forexMarkup);
    }

    return result;
  }, [calculatedCards, selectedBank, searchQuery, activeTab, sortBy]);

  // Sliced for display
  const displayedCards = useMemo(() => {
    return filteredAndSortedCards.slice(0, visibleCount);
  }, [filteredAndSortedCards, visibleCount]);

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
    <section id="recommender" className="py-6 sm:py-8 bg-[#050816] relative border-t border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-blue-900/40">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[11px] font-semibold mb-1">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>Feature 1 • {INDIAN_CREDIT_CARDS.length}+ Verified Indian Credit Cards</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Find Your Highest-Saving Credit Card
            </h2>
          </div>
          <p className="text-xs text-slate-300 max-w-sm sm:text-right">
            Compare <strong>{INDIAN_CREDIT_CARDS.length}+ cards</strong> across HDFC, SBI, ICICI, Axis, Amex & more with real fee waiver intelligence.
          </p>
        </div>

        {/* CUSTOM SPENDS PROFILE (UP AT TOP) */}
        <div className="mb-4 bg-[#0a192f] border border-blue-900/40 rounded-xl p-3.5 sm:p-4 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-blue-900/40">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">Custom Spends Profile</h3>
                  {activeTemplateId && (
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold">
                      Preset Active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  Adjust salary and category monthly spends to auto-calculate matching cards and fee waivers.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2">
              <div className="flex items-center gap-2">
                <div className="bg-[#050816] border border-blue-900/50 rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400">Monthly:</span>
                  <span className="text-xs font-mono text-emerald-400 font-extrabold">
                    ₹{totalMonthlySpend.toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <div className="bg-[#050816] border border-blue-900/50 rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400">Annual:</span>
                  <span className="text-xs font-mono text-white font-extrabold">
                    ₹{(totalAnnualSpend / 100000).toFixed(2)}L/yr
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSlidersExpandedOnMobile(!isSlidersExpandedOnMobile)}
                className="sm:hidden flex items-center gap-1 text-[10px] text-blue-300 hover:text-white bg-blue-900/40 border border-blue-800/60 px-2 py-1 rounded transition-colors cursor-pointer"
                title="Toggle spending sliders visibility on mobile"
              >
                <span>{isSlidersExpandedOnMobile ? 'Hide' : 'Edit'}</span>
                {isSlidersExpandedOnMobile ? (
                  <ChevronUp className="w-3 h-3 text-blue-400" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-blue-400" />
                )}
              </button>
            </div>
          </div>

          {/* 5 Interactive Sliders in responsive grid */}
          <div className={`${isSlidersExpandedOnMobile ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3' : 'hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-3'}`}>
            {/* 1. Monthly Salary */}
            <div className="bg-[#050816]/70 border border-blue-900/40 rounded-lg p-2.5 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-300 text-[11px] font-medium">💼 Monthly Salary</span>
                <span className="font-mono font-bold text-blue-300 text-xs">₹{monthlyIncome.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="15000"
                max="250000"
                step="5000"
                value={monthlyIncome}
                onChange={(e) => {
                  setActiveTemplateId('');
                  setMonthlyIncome(Number(e.target.value));
                }}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[9px] text-slate-500 mt-1 font-mono">
                <span>₹15k</span>
                <span>₹2.5L+</span>
              </div>
            </div>

            {/* 2. Online Shopping */}
            <div className="bg-[#050816]/70 border border-blue-900/40 rounded-lg p-2.5 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-300 text-[11px] font-medium">🛍️ Online Shopping</span>
                <span className="font-mono font-bold text-white text-xs">₹{shoppingSpend.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="60000"
                step="1000"
                value={shoppingSpend}
                onChange={(e) => {
                  setActiveTemplateId('');
                  setShoppingSpend(Number(e.target.value));
                }}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[9px] text-slate-500 mt-1 font-mono">
                <span>₹0</span>
                <span>₹60k</span>
              </div>
            </div>

            {/* 3. Food & Delivery */}
            <div className="bg-[#050816]/70 border border-blue-900/40 rounded-lg p-2.5 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-300 text-[11px] font-medium">🍕 Food & Delivery</span>
                <span className="font-mono font-bold text-white text-xs">₹{foodSpend.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="40000"
                step="1000"
                value={foodSpend}
                onChange={(e) => {
                  setActiveTemplateId('');
                  setFoodSpend(Number(e.target.value));
                }}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[9px] text-slate-500 mt-1 font-mono">
                <span>₹0</span>
                <span>₹40k</span>
              </div>
            </div>

            {/* 4. Travel & Commute */}
            <div className="bg-[#050816]/70 border border-blue-900/40 rounded-lg p-2.5 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-300 text-[11px] font-medium">✈️ Travel & Commute</span>
                <span className="font-mono font-bold text-white text-xs">₹{travelSpend.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="60000"
                step="1000"
                value={travelSpend}
                onChange={(e) => {
                  setActiveTemplateId('');
                  setTravelSpend(Number(e.target.value));
                }}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[9px] text-slate-500 mt-1 font-mono">
                <span>₹0</span>
                <span>₹60k</span>
              </div>
            </div>

            {/* 5. Utility Bills & UPI */}
            <div className="bg-[#050816]/70 border border-blue-900/40 rounded-lg p-2.5 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-300 text-[11px] font-medium">⚡ Bills, UPI & Utilities</span>
                <span className="font-mono font-bold text-white text-xs">₹{billsSpend.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="35000"
                step="500"
                value={billsSpend}
                onChange={(e) => {
                  setActiveTemplateId('');
                  setBillsSpend(Number(e.target.value));
                }}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[9px] text-slate-500 mt-1 font-mono">
                <span>₹0</span>
                <span>₹35k</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH, BANK SELECTOR, SORT & CATEGORY TABS */}
        <div className="bg-[#0a192f] border border-blue-900/40 rounded-xl p-3 space-y-2.5 shadow-sm mb-4">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search card name, bank, perk..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(6);
                }}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#050816] border border-blue-900/40 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Bank Filter Dropdown */}
            <div className="w-full sm:w-auto">
              <select
                value={selectedBank}
                onChange={(e) => {
                  setSelectedBank(e.target.value);
                  setVisibleCount(6);
                }}
                className="w-full sm:w-36 px-2.5 py-1.5 text-xs bg-[#050816] border border-blue-900/40 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="all">🏦 All Banks ({INDIAN_CREDIT_CARDS.length})</option>
                {availableBanks.filter(b => b !== 'all').map(bank => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
            </div>

            {/* Sort By Dropdown */}
            <div className="w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full sm:w-44 px-2.5 py-1.5 text-xs bg-[#050816] border border-blue-900/40 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="savings">💰 Net Annual Savings</option>
                <option value="score">🎯 Best Match Score</option>
                <option value="fee_low">🏷️ Lowest Annual Fee</option>
                <option value="income_low">💼 Lowest Min Income</option>
                <option value="forex">✈️ Lowest Forex Markup</option>
              </select>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-blue-900/30">
            {[
              { id: 'matched', label: '🎯 Top Matches' },
              { id: 'cashback', label: '🔥 Cashback' },
              { id: 'ltf', label: '🆓 Zero Fee' },
              { id: 'travel', label: '✈️ Lounge' },
              { id: 'upi', label: '📱 UPI' },
              { id: 'fuel', label: '⛽ Fuel' },
              { id: 'dining', label: '🍕 Dining' },
              { id: 'premium', label: '👑 Luxury' },
              { id: 'all', label: `💳 All (${INDIAN_CREDIT_CARDS.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`filter-tab-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id as FilterTab);
                  setVisibleCount(6);
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-[#050816] text-slate-400 border border-blue-900/40 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1-CLICK SPENDER TEMPLATES (DOWN ABOVE "FOUND CARDS") */}
        <div className="mb-4 bg-[#0a192f] border border-blue-900/40 rounded-xl p-3 shadow-md">
          <div className="flex items-center justify-between mb-2 px-0.5">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>1-Click Spender Templates (Select to auto-calculate & match cards):</span>
            </span>
            <span className="text-[11px] text-blue-400 font-mono hidden sm:inline">
              ⚡ Instant Spender Presets
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-2">
            {SPENDING_TEMPLATES.map((tpl) => {
              const isSelected = activeTemplateId === tpl.id;
              const tplMonthly = tpl.food + tpl.shopping + tpl.travel + tpl.bills;
              return (
                <button
                  key={tpl.id}
                  id={`template-btn-${tpl.id}`}
                  onClick={() => handleApplyTemplate(tpl)}
                  className={`p-2 rounded-lg text-left transition-all cursor-pointer flex flex-col justify-between border text-xs ${
                    isSelected
                      ? 'bg-blue-600/25 text-white border-blue-400 shadow-md shadow-blue-500/20 ring-2 ring-blue-400/50'
                      : 'bg-[#050816] border-blue-900/40 text-slate-300 hover:border-blue-700/60 hover:bg-[#0e213d] hover:text-white'
                  }`}
                  title={tpl.description}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-base">{tpl.emoji}</span>
                    <span className={`text-[9px] font-bold px-1 py-0.2 rounded ${
                      isSelected ? 'bg-blue-400 text-blue-950 font-extrabold' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {tpl.badge}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold leading-tight block text-white text-[11px]">
                      {tpl.name}
                    </span>
                    <span className={`text-[10px] leading-none mt-0.5 block ${isSelected ? 'text-blue-200 font-medium' : 'text-slate-400'}`}>
                      ₹{(tplMonthly / 1000).toFixed(0)}k/mo
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 mb-3">
          <span>
            Found <strong className="text-white">{filteredAndSortedCards.length}</strong> cards
            {searchQuery && ` for "${searchQuery}"`}
            {selectedBank !== 'all' && ` • ${selectedBank}`}
          </span>
          <span className="text-emerald-400 font-medium">
            Showing top {Math.min(visibleCount, filteredAndSortedCards.length)} of {filteredAndSortedCards.length}
          </span>
        </div>

            {/* Empty State */}
            {filteredAndSortedCards.length === 0 && (
              <div className="p-6 text-center bg-[#0a192f] border border-blue-900/40 rounded-xl space-y-2">
                <Search className="w-6 h-6 text-slate-500 mx-auto" />
                <h4 className="text-sm font-bold text-white">No credit cards matched your filters</h4>
                <p className="text-xs text-slate-400">Try searching with a different bank name or reset the category filter.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedBank('all');
                    setActiveTab('matched');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Recommendation Cards: 2-Column Side-by-Side Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedCards.map((item, index) => {
                const card = item.card;
                const isTopMatch = index === 0 && activeTab === 'matched' && !searchQuery;
                const isSecondMatch = index === 1 && activeTab === 'matched' && !searchQuery;

                // Approximate reward percentage for calculator
                const calcRewardRate = 
                  card.id === 'sbi-cashback' ? 5 : 
                  card.id === 'hdfc-swiggy' ? 6 : 
                  card.id === 'scapia-federal' ? 5 :
                  card.id === 'sbi-bpcl-octane' ? 6 :
                  card.id === 'icici-amazon-pay' ? 4 :
                  card.id === 'axis-airtel' ? 7 :
                  card.id === 'axis-ace' ? 4 :
                  card.id === 'hdfc-infinia' ? 10 :
                  card.id === 'hdfc-dcb-metal' ? 10 :
                  card.id === 'indusind-eazydiner' ? 8 :
                  card.id === 'hsbc-cashback' ? 6 : 4;

                return (
                  <div
                    key={card.id}
                    id={`card-recommendation-${card.id}`}
                    className={`rounded-xl p-4 transition-all border flex flex-col justify-between ${
                      isTopMatch
                        ? 'bg-[#0a192f] border-blue-400/80 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/40'
                        : isSecondMatch
                        ? 'bg-[#0a192f] border-blue-600/60 shadow-lg'
                        : 'bg-[#0a192f]/90 border-blue-900/40 hover:border-blue-700/60'
                    }`}
                  >
                    <div>
                      {/* Top Row: Rank Tag & Bank details */}
                      <div className="flex items-center justify-between gap-1.5 mb-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {isTopMatch && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-500 text-white shadow-sm">
                              🥇 #1 Best Match ({item.matchScore}%)
                            </span>
                          )}
                          {isSecondMatch && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                              🥈 #2 Match ({item.matchScore}%)
                            </span>
                          )}
                          {!isTopMatch && !isSecondMatch && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/40">
                              {item.matchScore}% Match
                            </span>
                          )}
                          {card.rupayUpi && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              ⚡ UPI
                            </span>
                          )}
                          {card.forexMarkup === 0 && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                              0% Forex
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium shrink-0">
                          {card.bank}
                        </span>
                      </div>

                      {/* Card Title */}
                      <h4 className="text-base font-bold text-white leading-tight mb-1">
                        {card.name}
                      </h4>

                      <p className="text-[11px] text-slate-400 mb-3">
                        Network: <span className="text-slate-300">{card.network}</span> • Min Income: <span className="text-slate-300">₹{card.minIncomeRequired.toLocaleString('en-IN')}/mo</span>
                      </p>

                      {/* Net Annual Estimated Savings Callout */}
                      <div className="bg-[#050816] border border-blue-900/50 rounded-lg p-2.5 mb-3 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
                            Est. Net Savings
                          </span>
                          <span className={`text-lg font-black font-mono ${item.netAnnualSavings >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {item.netAnnualSavings >= 0 ? `+₹${item.netAnnualSavings.toLocaleString('en-IN')}` : `-₹${Math.abs(item.netAnnualSavings).toLocaleString('en-IN')}`}
                            <span className="text-xs font-normal text-slate-400">/yr</span>
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">Monthly Value</span>
                          <span className="text-xs font-mono font-bold text-blue-300">
                            ≈ ₹{item.estimatedMonthly.toLocaleString('en-IN')}/mo
                          </span>
                        </div>
                      </div>

                      {/* Best For Note */}
                      <div className="text-xs text-slate-300 mb-2.5 bg-blue-950/30 p-2 rounded-lg border border-blue-900/30">
                        <strong className="text-blue-300">Best for: </strong>{card.whySuitable}
                      </div>

                      {/* 4 Category Cashback Breakdown Chips */}
                      <div className="grid grid-cols-2 gap-1.5 mb-3 text-xs">
                        <div className="p-1.5 rounded bg-[#050816] border border-blue-900/40 flex items-center justify-between">
                          <span className="text-[11px] text-slate-400">🛍️ Shopping</span>
                          <strong className="text-blue-200 font-mono text-xs">{card.cashbackBreakdown.shopping}%</strong>
                        </div>
                        <div className="p-1.5 rounded bg-[#050816] border border-blue-900/40 flex items-center justify-between">
                          <span className="text-[11px] text-slate-400">🍕 Food/Delivery</span>
                          <strong className="text-blue-200 font-mono text-xs">{card.cashbackBreakdown.food}%</strong>
                        </div>
                        <div className="p-1.5 rounded bg-[#050816] border border-blue-900/40 flex items-center justify-between">
                          <span className="text-[11px] text-slate-400">⚡ Bills/Utilities</span>
                          <strong className="text-blue-200 font-mono text-xs">{card.cashbackBreakdown.utilities}%</strong>
                        </div>
                        <div className="p-1.5 rounded bg-[#050816] border border-blue-900/40 flex items-center justify-between">
                          <span className="text-[11px] text-slate-400">🏷️ Other Spends</span>
                          <strong className="text-slate-300 font-mono text-xs">{card.cashbackBreakdown.other}%</strong>
                        </div>
                      </div>

                      {/* Annual Fee & Waiver Status */}
                      <div className="mb-3 text-xs">
                        {card.annualFee === 0 ? (
                          <div className="text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1.5 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>Lifetime Free (₹0 Annual Fee)</span>
                          </div>
                        ) : item.isFeeWaived ? (
                          <div className="text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1.5 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>₹{card.annualFee} Fee Waived on your annual spend!</span>
                          </div>
                        ) : (
                          <div className="text-slate-300 bg-[#050816] px-2.5 py-1.5 rounded-lg border border-blue-900/40 flex items-center justify-between text-[11px]">
                            <span>Annual Fee: <strong>₹{card.annualFee}</strong></span>
                            <span className="text-slate-400">Spend ₹{(card.feeWaiverSpend / 100000).toFixed(1)}L to waive</span>
                          </div>
                        )}
                      </div>

                      {/* Perks & Warnings (Always Visible & User-Friendly) */}
                      <div className="space-y-1.5 mb-3 text-[11px]">
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

                    {/* Bottom Actions Row */}
                    <div className="pt-2.5 border-t border-blue-900/30 flex items-center justify-between gap-2 mt-auto">
                      <button
                        onClick={() => handleSendToInterestWarning(card)}
                        className="text-[11px] text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
                        title="Check interest if balance revolves"
                      >
                        Check {card.apr}% APR
                      </button>

                      <button
                        id={`btn-calc-${card.id}`}
                        onClick={() => handleSendToCalculator(card, calcRewardRate)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all cursor-pointer shadow-sm shadow-blue-500/20"
                      >
                        <Calculator className="w-3.5 h-3.5" />
                        <span>Calculate Savings</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredAndSortedCards.length && (
              <div className="text-center pt-2">
                <button
                  onClick={() => setVisibleCount(prev => Math.min(prev + 6, filteredAndSortedCards.length))}
                  className="px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 border border-blue-500/40 text-blue-300 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  Load More Cards ({filteredAndSortedCards.length - visibleCount} Remaining)
                </button>
              </div>
            )}

      </div>
    </section>
  );
}
