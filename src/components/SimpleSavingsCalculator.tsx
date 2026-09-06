import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Sparkles, Check, Info, ShieldCheck, ArrowUpRight, CreditCard } from 'lucide-react';
import { INDIAN_CREDIT_CARDS } from '../data/cardsData';

interface SimpleSavingsCalculatorProps {
  key?: React.Key;
  selectedCardName?: string;
  defaultRewardRate?: number;
  defaultAnnualFee?: number;
  defaultWaiverSpend?: number;
}

export function SimpleSavingsCalculator({
  selectedCardName = 'Cashback SBI Card (5% Online)',
  defaultRewardRate = 5,
  defaultAnnualFee = 999,
  defaultWaiverSpend = 200000,
}: SimpleSavingsCalculatorProps) {
  // Simple state inputs
  const [selectedCardId, setSelectedCardId] = useState<string>('sbi-cashback');
  const [cardName, setCardName] = useState<string>(selectedCardName);
  const [monthlySpend, setMonthlySpend] = useState<number>(20000);
  const [cashbackPercent, setCashbackPercent] = useState<number>(defaultRewardRate);
  const [annualFee, setAnnualFee] = useState<number>(defaultAnnualFee);
  const [feeWaiverSpend, setFeeWaiverSpend] = useState<number>(defaultWaiverSpend);

  // Sync if props update from parent
  useEffect(() => {
    setCardName(selectedCardName);
    setCashbackPercent(defaultRewardRate);
    setAnnualFee(defaultAnnualFee);
    setFeeWaiverSpend(defaultWaiverSpend);
  }, [selectedCardName, defaultRewardRate, defaultAnnualFee, defaultWaiverSpend]);

  // Math Calculations
  const annualTotalSpend = monthlySpend * 12;
  const monthlyCashback = Math.round(monthlySpend * (cashbackPercent / 100));
  const grossAnnualCashback = monthlyCashback * 12;
  
  // Is fee waived?
  const isFeeWaived = annualTotalSpend >= feeWaiverSpend && feeWaiverSpend > 0;
  const effectiveFee = isFeeWaived ? 0 : annualFee;
  const netAnnualSavings = grossAnnualCashback - effectiveFee;

  // Handle 1-Click Card Preset Selection inside calculator
  const handleSelectCardPreset = (cardId: string) => {
    setSelectedCardId(cardId);
    const card = INDIAN_CREDIT_CARDS.find(c => c.id === cardId);
    if (!card) return;
    setCardName(card.name);
    setAnnualFee(card.annualFee);
    setFeeWaiverSpend(card.feeWaiverSpend);
    
    // Set typical top reward rate
    const rate = 
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
      card.id === 'hsbc-cashback' ? 6 :
      card.id === 'hdfc-millennia' ? 5 : 
      card.cashbackBreakdown?.shopping || 3;
    setCashbackPercent(rate);
  };

  return (
    <section id="savings-calculator" className="py-12 sm:py-16 bg-[#050816] relative border-t border-blue-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <span>Feature 2</span>
            <span>•</span>
            <span>Finance Savings Model</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Simple Savings & Fee ROI Calculator
          </h2>
          <p className="text-sm text-slate-300">
            See how much real money you pocket each year after deducting bank annual fees and triggering fee waivers.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Inputs (6 Cols) */}
          <div className="lg:col-span-6 bg-[#0a192f] border border-blue-900/40 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl shadow-black/40">
            
            {/* Card Selector Dropdown from all 50+ Cards */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                  <span>Choose Any Card ({INDIAN_CREDIT_CARDS.length} Available):</span>
                </span>
                <span className="text-[11px] text-blue-400 font-normal">Auto-loads fees & rates</span>
              </label>
              <select
                value={selectedCardId}
                onChange={(e) => handleSelectCardPreset(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#050816] border border-blue-900/40 rounded-xl text-white focus:outline-none focus:border-blue-500 cursor-pointer font-medium"
              >
                {INDIAN_CREDIT_CARDS.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.bank} - {c.name} {c.annualFee === 0 ? '(₹0 Free)' : `(₹${c.annualFee}/yr)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick 1-Click Card Selector Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                Quick 1-Click Popular Picks:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'sbi-cashback', name: 'Cashback SBI (5%)' },
                  { id: 'hdfc-swiggy', name: 'Swiggy HDFC (10%)' },
                  { id: 'icici-amazon-pay', name: 'Amazon Pay (₹0 Fee)' },
                  { id: 'axis-airtel', name: 'Airtel Axis (25%)' },
                  { id: 'scapia-federal', name: 'Scapia (0% Forex)' },
                  { id: 'hdfc-tata-neu-infinity', name: 'Tata Neu UPI (10%)' },
                  { id: 'hdfc-infinia', name: 'Infinia Metal (33%)' },
                  { id: 'axis-ace', name: 'Axis ACE (5% Bills)' },
                  { id: 'idfc-first-wow', name: 'IDFC WOW (0% Forex)' },
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectCardPreset(preset.id)}
                    className={`p-2 rounded-lg text-left text-xs border transition-all cursor-pointer font-medium truncate ${
                      selectedCardId === preset.id
                        ? 'bg-blue-600/30 border-blue-400 text-white shadow-sm'
                        : 'bg-[#050816] hover:bg-blue-950/60 border-blue-900/40 hover:border-blue-500/60 text-slate-300 hover:text-white'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Spend Slider */}
            <div className="space-y-2 pt-2 border-t border-blue-900/30">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Your Monthly Credit Card Spend:</span>
                <span className="text-base font-mono font-bold text-emerald-400">
                  ₹{monthlySpend.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="150000"
                step="2500"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 pt-0.5 font-mono">
                <span>₹5k/mo</span>
                <span>₹75k/mo</span>
                <span>₹1,50,000/mo</span>
              </div>
            </div>

            {/* Reward Rate Percentage Slider / Buttons */}
            <div className="space-y-2 pt-2 border-t border-blue-900/30">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Effective Reward / Cashback Rate:</span>
                <span className="text-sm font-mono font-bold text-blue-300">
                  {cashbackPercent}%
                </span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 4, 5, 7, 10].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setCashbackPercent(rate)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      cashbackPercent === rate
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                        : 'bg-[#050816] text-slate-400 border-blue-900/40 hover:text-white'
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            {/* Card Annual Fee Input & Waiver Threshold */}
            <div className="space-y-2 pt-2 border-t border-blue-900/30">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Annual Card Fee:</span>
                <span className="font-mono font-bold text-slate-200">
                  {annualFee === 0 ? '₹0 (Lifetime Free)' : `₹${annualFee.toLocaleString('en-IN')}/year`}
                </span>
              </div>
              <div className="flex gap-2">
                {[0, 499, 999, 1499, 2500, 5000].map((fee) => (
                  <button
                    key={fee}
                    onClick={() => setAnnualFee(fee)}
                    className={`px-3 py-1.5 rounded-lg text-xs border transition-all cursor-pointer ${
                      annualFee === fee
                        ? 'bg-blue-600 text-white border-blue-500 font-bold'
                        : 'bg-[#050816] text-slate-400 border-blue-900/40 hover:text-white'
                    }`}
                  >
                    {fee === 0 ? '₹0 Free' : `₹${fee}`}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Output Result (6 Cols) */}
          <div className="lg:col-span-6 bg-[#0a192f] border border-blue-900/40 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl shadow-black/40">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-blue-900/40 pb-3">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Calculated Result & ROI</span>
            </h3>

            {/* Big Headline Output */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-[#050816] to-[#0a192f] border border-emerald-500/50 text-center space-y-1.5 shadow-lg">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                💡 Estimated Net Yearly Savings
              </span>
              <div className={`text-3xl sm:text-4xl font-black font-mono ${netAnnualSavings >= 0 ? 'text-white' : 'text-rose-400'}`}>
                {netAnnualSavings >= 0 ? `₹${netAnnualSavings.toLocaleString('en-IN')}` : `-₹${Math.abs(netAnnualSavings).toLocaleString('en-IN')}`}
                <span className="text-sm font-normal text-slate-400 ml-1">/year</span>
              </div>
              <p className="text-xs text-slate-300">
                You pocket <strong className="text-emerald-300">₹{netAnnualSavings.toLocaleString('en-IN')}</strong> in pure net financial value every year!
              </p>
            </div>

            {/* 3-Step Simple Financial Breakdown */}
            <div className="space-y-2.5 text-xs">
              <span className="font-bold text-slate-300 block">Calculation Step-by-Step:</span>
              
              <div className="p-3.5 rounded-xl bg-[#050816] border border-blue-900/40 space-y-2 font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>1. Monthly Cashback ({cashbackPercent}% of ₹{monthlySpend.toLocaleString('en-IN')}):</span>
                  <span className="font-bold text-white">₹{monthlyCashback.toLocaleString('en-IN')}/mo</span>
                </div>
                
                <div className="flex justify-between text-slate-300">
                  <span>2. Gross 12-Month Cashback (₹{monthlyCashback.toLocaleString('en-IN')} × 12):</span>
                  <span className="font-bold text-emerald-400">₹{grossAnnualCashback.toLocaleString('en-IN')}/yr</span>
                </div>

                <div className="flex justify-between text-slate-300 pt-1.5 border-t border-blue-900/30">
                  <span>3. Minus Annual Card Fee:</span>
                  <span className={`font-bold ${isFeeWaived || annualFee === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isFeeWaived 
                      ? `₹0 (Waived on ₹${(annualTotalSpend/100000).toFixed(1)}L annual spend)` 
                      : annualFee === 0 
                        ? '₹0 (Lifetime Free)' 
                        : `-₹${annualFee.toLocaleString('en-IN')}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-blue-900/50">
                  <span className="font-sans">Net Cash Pocketed:</span>
                  <span className="text-emerald-400 font-mono">₹{netAnnualSavings.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Fee Waiver Status Callout */}
            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-blue-300">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Fee Waiver Intelligence:</span>
              </div>
              <p className="text-[11px] text-slate-300 pl-5">
                Your annual spend is <strong>₹{annualTotalSpend.toLocaleString('en-IN')}</strong>. 
                {isFeeWaived ? (
                  <span className="text-emerald-300 font-semibold"> Great job! You automatically exceed the fee waiver threshold of ₹{feeWaiverSpend.toLocaleString('en-IN')} — saving you ₹{annualFee}/yr.</span>
                ) : annualFee > 0 && feeWaiverSpend > 0 ? (
                  <span> Spend ₹{(feeWaiverSpend - annualTotalSpend).toLocaleString('en-IN')} more this year to waive your ₹{annualFee.toLocaleString('en-IN')} annual fee.</span>
                ) : (
                  <span> This card has no annual fee or is 100% Lifetime Free.</span>
                )}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
