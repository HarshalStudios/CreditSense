import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  IndianRupee, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Utensils, 
  ShoppingBag, 
  Fuel, 
  Plane, 
  Receipt, 
  ShoppingBasket, 
  Film, 
  CreditCard,
  Percent,
  Copy,
  Check,
  Flame,
  Info
} from 'lucide-react';
import { POPULAR_MERCHANTS, INDIAN_CREDIT_CARDS } from '../data/cardsData';
import { OptimizationSuggestion, CreditCardItem } from '../types';

export const RealTimeOptimizer: React.FC = () => {
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>('swiggy');
  const [customAmount, setCustomAmount] = useState<number>(1450);
  const [copiedTip, setCopiedTip] = useState(false);
  const [activeTab, setActiveTab] = useState<'merchants' | 'categories'>('merchants');
  const [selectedCategory, setSelectedCategory] = useState<string>('food');

  const selectedMerchant = useMemo(() => {
    return POPULAR_MERCHANTS.find(m => m.id === selectedMerchantId) || POPULAR_MERCHANTS[0];
  }, [selectedMerchantId]);

  // Compute best card and exact savings based on category & amount
  const optimization = useMemo<OptimizationSuggestion>(() => {
    const effectiveCategory = activeTab === 'merchants' ? selectedMerchant.category : selectedCategory;
    const amount = customAmount || 1000;

    let bestCard: CreditCardItem = INDIAN_CREDIT_CARDS[0];
    let maxCashbackPercent = 1;
    let proTip = 'Use this card for highest yield on this merchant.';
    let alternativeCard: { card: CreditCardItem; rupeesSaved: number; note: string } | undefined = undefined;

    if (effectiveCategory === 'food') {
      // Airtel Axis (10% Swiggy/Zomato) or HDFC Millennia (5%) or SBI Cashback (5%)
      bestCard = INDIAN_CREDIT_CARDS.find(c => c.id === 'axis-airtel') || INDIAN_CREDIT_CARDS[0];
      maxCashbackPercent = 10.0;
      proTip = 'Airtel Axis gives 10% direct cashback on Swiggy and Zomato up to ₹500/month. If cap reached, switch to SBI Cashback (5% un-capped).';
      const alt = INDIAN_CREDIT_CARDS.find(c => c.id === 'sbi-cashback');
      if (alt) {
        alternativeCard = {
          card: alt,
          rupeesSaved: Math.round(amount * 0.05),
          note: '5% flat statement credit if you have already hit the monthly Airtel cap.'
        };
      }
    } else if (effectiveCategory === 'shopping') {
      // SBI Cashback (5% any online) or ICICI Amazon Pay (5% Amazon)
      if (selectedMerchantId === 'amazon') {
        bestCard = INDIAN_CREDIT_CARDS.find(c => c.id === 'icici-amazon-pay') || INDIAN_CREDIT_CARDS[0];
        maxCashbackPercent = 5.0;
        proTip = 'Amazon Pay ICICI gives 5% unlimited cashback with 0 annual fee. Automatically deposited into your Amazon Pay wallet monthly.';
        const alt = INDIAN_CREDIT_CARDS.find(c => c.id === 'sbi-cashback');
        if (alt) {
          alternativeCard = {
            card: alt,
            rupeesSaved: Math.round(amount * 0.05),
            note: '5% direct bill credit if you prefer money in your bank rather than Amazon wallet.'
          };
        }
      } else {
        bestCard = INDIAN_CREDIT_CARDS.find(c => c.id === 'sbi-cashback') || INDIAN_CREDIT_CARDS[0];
        maxCashbackPercent = 5.0;
        proTip = 'SBI Cashback gives 5% flat cashback on Myntra, Flipkart, Nykaa, and 99% of online checkouts without brand lock-in.';
      }
    } else if (effectiveCategory === 'utilities') {
      // Airtel Axis (25% on Airtel, 10% on electricity/gas)
      bestCard = INDIAN_CREDIT_CARDS.find(c => c.id === 'axis-airtel') || INDIAN_CREDIT_CARDS[0];
      maxCashbackPercent = selectedMerchantId === 'airtel_bill' ? 25.0 : 10.0;
      proTip = 'Pay directly through the Airtel Thanks App. Earn 25% on Airtel Wi-Fi/SIM (cap ₹250) and 10% on electricity & piped gas (cap ₹250).';
    } else if (effectiveCategory === 'fuel') {
      // Surcharge waiver + rewards
      bestCard = INDIAN_CREDIT_CARDS.find(c => c.id === 'sbi-simplyclick') || INDIAN_CREDIT_CARDS[0];
      maxCashbackPercent = 3.5; // 1% waiver + reward points
      proTip = 'Always transact between ₹500 and ₹4,000 at authorized fuel outlets to trigger 100% fuel surcharge waiver (saves 1% + 18% GST).';
    } else if (effectiveCategory === 'travel') {
      // HDFC Regalia Gold or SBI Cashback
      if (amount > 10000) {
        bestCard = INDIAN_CREDIT_CARDS.find(c => c.id === 'hdfc-regalia-gold') || INDIAN_CREDIT_CARDS[0];
        maxCashbackPercent = 7.0;
        proTip = 'Book via HDFC SmartBuy portal to earn 5X reward points (equivalent to 7% air ticket value) plus complimentary domestic lounge access.';
      } else {
        bestCard = INDIAN_CREDIT_CARDS.find(c => c.id === 'sbi-cashback') || INDIAN_CREDIT_CARDS[0];
        maxCashbackPercent = 5.0;
        proTip = 'SBI Cashback gives 5% on MakeMyTrip, Cleartrip, and Uber app rides.';
      }
    } else if (effectiveCategory === 'groceries') {
      // Tata Neu Infinity (10%) or Axis Airtel (10% BigBasket) or SBI Cashback (5% Blinkit)
      bestCard = INDIAN_CREDIT_CARDS.find(c => c.id === 'hdfc-tata-neu-infinity') || INDIAN_CREDIT_CARDS[0];
      maxCashbackPercent = 10.0;
      proTip = 'Get 10% NeuCoins on BigBasket and BBdaily orders. Also gives 1.5% cashback on everyday offline grocery QR code payments via UPI.';
    }

    const rupeesSaved = Math.round(amount * (maxCashbackPercent / 100));
    const basicSaved = Math.round(amount * 0.01);
    const comparisonVsBasic = rupeesSaved - basicSaved;

    return {
      bestCard,
      cashbackPercent: maxCashbackPercent,
      rupeesSaved,
      rewardPointsEarned: Math.round(amount * (maxCashbackPercent / 2)),
      comparisonVsBasic,
      proTip,
      alternativeCard
    };
  }, [selectedMerchant, selectedMerchantId, customAmount, activeTab, selectedCategory]);

  const handleCopyTip = () => {
    navigator.clipboard.writeText(`CreditSense AI Tip: Use ${optimization.bestCard.name} for ${selectedMerchant.name} — saves ₹${optimization.rupeesSaved} (${optimization.cashbackPercent}% cashback). Pro-tip: ${optimization.proTip}`);
    setCopiedTip(true);
    setTimeout(() => setCopiedTip(false), 2000);
  };

  const getMerchantIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils': return <Utensils className="w-4 h-4" />;
      case 'ShoppingBag': return <ShoppingBag className="w-4 h-4" />;
      case 'Fuel': return <Fuel className="w-4 h-4" />;
      case 'Plane': return <Plane className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'ShoppingBasket': return <ShoppingBasket className="w-4 h-4" />;
      case 'Film': return <Film className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  return (
    <section 
      id="optimizer"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#050816] via-[#0a192f]/40 to-[#050816] border-t border-blue-900/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Core Feature 2 & Demo: Real-Time Payment Optimizer</span>
          </div>

          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Know Which Card to Swipe, <span className="text-amber-400">Every Single Time</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Test any Indian merchant or payment scenario. Discover the exact card that maximizes rewards and avoids surcharge penalties on each transaction.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Merchant & Amount Input (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0a192f] border border-blue-900/40 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl shadow-black/40">
            
            {/* Mode Switcher */}
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/40">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Payment Scenario
              </span>
              <div className="flex gap-1 p-0.5 bg-[#050816] rounded-lg border border-blue-900/40 text-xs">
                <button
                  onClick={() => setActiveTab('merchants')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    activeTab === 'merchants' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  By Merchant
                </button>
                <button
                  onClick={() => setActiveTab('categories')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    activeTab === 'categories' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  By Category
                </button>
              </div>
            </div>

            {/* Merchant Grid Selection */}
            {activeTab === 'merchants' ? (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Select Checkout Merchant:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {POPULAR_MERCHANTS.map((m) => (
                    <button
                      key={m.id}
                      id={`merchant-select-${m.id}`}
                      onClick={() => {
                        setSelectedMerchantId(m.id);
                        setCustomAmount(m.defaultAmount);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                        selectedMerchantId === m.id
                          ? 'bg-amber-500/10 border-amber-500 text-white shadow-sm ring-1 ring-amber-500/30'
                          : 'bg-[#050816] border-blue-900/40 text-slate-400 hover:text-slate-200 hover:bg-[#112240]'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${selectedMerchantId === m.id ? 'bg-amber-500 text-slate-950' : 'bg-[#112240] text-slate-400'}`}>
                        {getMerchantIcon(m.icon)}
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-bold block truncate">{m.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">₹{m.defaultAmount}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Select Spend Category:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'food', label: 'Food & Dining (10%)', icon: Utensils },
                    { id: 'shopping', label: 'Online Shopping (5%)', icon: ShoppingBag },
                    { id: 'travel', label: 'Flights & Hotels (7%)', icon: Plane },
                    { id: 'fuel', label: 'Fuel Pumps (100% Waiver)', icon: Fuel },
                    { id: 'utilities', label: 'Mobile / Broadband (25%)', icon: Zap },
                    { id: 'groceries', label: 'Quick Groceries (10%)', icon: ShoppingBasket },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-amber-500/10 border-amber-500 text-white shadow-sm'
                          : 'bg-[#050816] border-blue-900/40 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <cat.icon className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-xs font-bold truncate">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Transaction Amount Input & Slider */}
            <div className="space-y-3 p-3.5 bg-[#050816] border border-blue-900/40 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Transaction Value
                </label>
                <div className="flex items-center text-sm font-bold font-mono text-amber-300">
                  <span>₹</span>
                  <input
                    type="number"
                    id="transaction-amount-input"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(Math.max(10, Number(e.target.value)))}
                    className="w-24 bg-transparent text-right font-mono font-bold text-amber-300 focus:outline-none focus:border-b border-amber-400 ml-1"
                  />
                </div>
              </div>

              <input
                type="range"
                min="100"
                max="50000"
                step="100"
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              {/* Quick Amount Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[499, 1200, 2500, 5000, 15000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setCustomAmount(amt)}
                    className={`text-[11px] px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                      customAmount === amt
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                        : 'bg-[#0a192f] border-blue-900/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Optimal Card Swipe Decision (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Suggested Card Hero Card */}
            <div className="bg-[#0a192f] border border-amber-500/40 rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden space-y-5">
              
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blue-900/40">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 shadow-md shadow-amber-500/20 flex items-center justify-center shrink-0">
                    <div className="w-full h-full bg-[#050816] rounded-[10px] flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-amber-400" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Optimal Swipe Recommendation
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {optimization.bestCard.name}
                    </h3>
                  </div>
                </div>

                <div className="text-left sm:text-right bg-amber-500/10 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-medium">Cashback Yield</span>
                  <span className="text-2xl sm:text-3xl font-extrabold font-['Space_Grotesk'] text-amber-400">
                    {optimization.cashbackPercent}% OFF
                  </span>
                </div>
              </div>

              {/* Instant Rupee Value Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#050816] border border-blue-900/40 space-y-0.5">
                  <span className="text-[11px] text-slate-400 font-medium">Instant Cash Savings</span>
                  <p className="text-xl font-extrabold font-mono text-emerald-400">
                    ₹{optimization.rupeesSaved.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-emerald-400/80 font-semibold block">
                    Direct on this single swipe
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#050816] border border-blue-900/40 space-y-0.5">
                  <span className="text-[11px] text-slate-400 font-medium">Vs. Basic Bank Card</span>
                  <p className="text-xl font-extrabold font-mono text-blue-400">
                    +₹{optimization.comparisonVsBasic.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-slate-400 block">
                    Extra profit retained
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#050816] border border-blue-900/40 space-y-0.5">
                  <span className="text-[11px] text-slate-400 font-medium">Annualized on this habit</span>
                  <p className="text-xl font-extrabold font-mono text-amber-300">
                    ₹{(optimization.rupeesSaved * 12).toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-slate-400 block">
                    Yearly compounding value
                  </span>
                </div>
              </div>

              {/* Actionable Pro-Tip */}
              <div className="p-4 rounded-xl bg-[#050816] border border-blue-900/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    AI Swipe Strategy & Pro-Tip:
                  </span>
                  <button
                    onClick={handleCopyTip}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedTip ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Advice</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {optimization.proTip}
                </p>
              </div>

              {/* Alternative Backup Card (If monthly cap is hit) */}
              {optimization.alternativeCard && (
                <div className="p-3 rounded-xl bg-[#112240] border border-blue-900/50 flex items-start gap-3">
                  <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-semibold text-blue-300">
                      Backup Strategy (Monthly Cap Spillover):
                    </span>
                    <p className="text-slate-300">
                      Use <strong>{optimization.alternativeCard.card.name}</strong> to earn ₹{optimization.alternativeCard.rupeesSaved} ({optimization.alternativeCard.note})
                    </p>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
