import React, { useState, useMemo } from 'react';
import { 
  Info, 
  IndianRupee, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  ShieldAlert, 
  Search, 
  Sliders, 
  ArrowRight,
  HelpCircle,
  Percent,
  Layers,
  Scale
} from 'lucide-react';
import { INDIAN_CREDIT_CARDS } from '../data/cardsData';
import { CreditCardItem } from '../types';

export const HiddenCostAnalyzer: React.FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<string>('hdfc-millennia');
  const [userAnnualSpend, setUserAnnualSpend] = useState<number>(240000);
  const [internationalSpend, setInternationalSpend] = useState<number>(20000);

  const selectedCard = useMemo(() => {
    return INDIAN_CREDIT_CARDS.find(c => c.id === selectedCardId) || INDIAN_CREDIT_CARDS[0];
  }, [selectedCardId]);

  // Compute Real Benefit vs Cost Balance Sheet
  const balanceSheet = useMemo(() => {
    // 1. Benefits
    const estimatedCashback = Math.round(userAnnualSpend * 0.045); // ~4.5% blended return
    const loungeAccessValue = selectedCard.cardType === 'Travel' ? 4800 : (selectedCard.cardType === 'Lifetime Free' ? 0 : 2400);
    const fuelSurchargeWaiver = 1200;
    const milestoneVouchers = userAnnualSpend >= 200000 ? 1500 : 0;
    const totalGrossBenefit = estimatedCashback + loungeAccessValue + fuelSurchargeWaiver + milestoneVouchers;

    // 2. Costs
    const isFeeWaived = selectedCard.annualFee === 0 || userAnnualSpend >= selectedCard.feeWaiverSpend;
    const annualFee = isFeeWaived ? 0 : selectedCard.annualFee;
    const gstOnAnnualFee = Math.round(annualFee * 0.18);
    const effectiveAnnualFee = annualFee + gstOnAnnualFee;

    const forexCost = Math.round(internationalSpend * (selectedCard.forexMarkup / 100) * 1.18);
    const redemptionFeeCost = selectedCard.redemptionFee > 0 ? (selectedCard.redemptionFee * 2 * 1.18) : 0; // assuming 2 redemptions a year + 18% GST

    const totalHiddenAndDirectCosts = effectiveAnnualFee + forexCost + Math.round(redemptionFeeCost);

    // 3. Real Net Profit
    const netTrueBenefit = totalGrossBenefit - totalHiddenAndDirectCosts;
    const returnOnSpendPercent = ((netTrueBenefit / userAnnualSpend) * 100).toFixed(2);

    return {
      estimatedCashback,
      loungeAccessValue,
      fuelSurchargeWaiver,
      milestoneVouchers,
      totalGrossBenefit,
      isFeeWaived,
      annualFee,
      gstOnAnnualFee,
      effectiveAnnualFee,
      forexCost,
      redemptionFeeCost: Math.round(redemptionFeeCost),
      totalHiddenAndDirectCosts,
      netTrueBenefit,
      returnOnSpendPercent,
    };
  }, [selectedCard, userAnnualSpend, internationalSpend]);

  return (
    <section 
      id="hidden-costs"
      className="py-16 sm:py-24 bg-[#050816] border-t border-blue-900/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5 text-blue-400" />
            <span>Core Feature 5: Hidden Cost & True ROI Analyzer</span>
          </div>

          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Real Benefit vs Cost <span className="text-blue-400">Balance Sheet</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Don't get fooled by flashy marketing banners. We audit every hidden fee—from 18% GST on renewal fees to ₹99 redemption charges and 3.5% forex markups.
          </p>
        </div>

        {/* Card Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {INDIAN_CREDIT_CARDS.map((card) => (
            <button
              key={card.id}
              id={`hidden-cost-select-${card.id}`}
              onClick={() => setSelectedCardId(card.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-2 ${
                selectedCardId === card.id
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                  : 'bg-[#0a192f] border-blue-900/40 text-slate-400 hover:text-slate-200 hover:bg-[#112240]'
              }`}
            >
              <span>{card.name}</span>
              {card.annualFee === 0 ? (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                  LTF ₹0
                </span>
              ) : (
                <span className="text-[10px] text-slate-400">₹{card.annualFee}/yr</span>
              )}
            </button>
          ))}
        </div>

        {/* 2-Column Balance Sheet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cost Auditing Parameters & Fine Print (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0a192f] border border-blue-900/40 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl shadow-black/40">
            
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/40">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Card Fee & Rate Card
              </span>
              <span className="text-xs font-mono font-bold text-blue-400">
                {selectedCard.bank}
              </span>
            </div>

            {/* Selected Card Specs Card */}
            <div className="p-4 rounded-xl bg-[#050816] border border-blue-900/40 space-y-3">
              <h4 className="text-base font-bold text-white">
                {selectedCard.name}
              </h4>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Annual Joining/Renewal</span>
                  <span className="font-bold text-slate-200">
                    {selectedCard.annualFee === 0 ? '₹0 (Lifetime Free)' : `₹${selectedCard.annualFee} + 18% GST`}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block">Annual Spend for Fee Waiver</span>
                  <span className="font-bold text-blue-300">
                    {selectedCard.feeWaiverSpend === 0 ? 'N/A (Free Forever)' : `₹${selectedCard.feeWaiverSpend.toLocaleString('en-IN')}/yr`}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block">Interest Rate (APR)</span>
                  <span className="font-bold text-rose-400">
                    {selectedCard.apr}% p.a. ({(selectedCard.apr / 12).toFixed(1)}%/mo)
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block">Forex Markup Fee</span>
                  <span className="font-bold text-amber-300">
                    {selectedCard.forexMarkup === 0 ? '0% (Zero Forex)' : `${selectedCard.forexMarkup}% + 18% GST`}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block">Reward Redemption Fee</span>
                  <span className="font-bold text-slate-300">
                    {selectedCard.redemptionFee === 0 ? '₹0 (Zero Fee)' : `₹${selectedCard.redemptionFee} + 18% GST`}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block">Reward Auto-Credit?</span>
                  <span className="font-bold text-emerald-400">
                    {selectedCard.redemptionFee === 0 ? 'Yes (Auto-Credited)' : 'Manual Portal Claim'}
                  </span>
                </div>
              </div>
            </div>

            {/* User Annual Spend Adjustment Slider */}
            <div className="space-y-2 p-3.5 bg-[#050816] border border-blue-900/40 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Your Total Annual Spend:
                </label>
                <span className="text-sm font-bold font-mono text-blue-300">
                  ₹{userAnnualSpend.toLocaleString('en-IN')} / yr
                </span>
              </div>

              <input
                type="range"
                min="50000"
                max="600000"
                step="25000"
                value={userAnnualSpend}
                onChange={(e) => setUserAnnualSpend(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />

              <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                <span>Fee Waiver Status:</span>
                {balanceSheet.isFeeWaived ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Fee 100% Waived
                  </span>
                ) : (
                  <span className="text-amber-400 font-medium">
                    Spend ₹{(selectedCard.feeWaiverSpend - userAnnualSpend).toLocaleString('en-IN')} more to waive
                  </span>
                )}
              </div>
            </div>

            {/* International / Forex Spend Slider */}
            <div className="space-y-2 p-3.5 bg-[#050816] border border-blue-900/40 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Annual International / SaaS / Foreign Spend:
                </label>
                <span className="text-sm font-bold font-mono text-amber-300">
                  ₹{internationalSpend.toLocaleString('en-IN')}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={internationalSpend}
                onChange={(e) => setInternationalSpend(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

          </div>

          {/* Right Column: The Real Benefit vs Cost Balance Sheet (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* The True Net Profit Box */}
            <div className="bg-[#0a192f] border border-blue-500/40 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blue-900/40">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    True Net Annual ROI
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
                    +₹{balanceSheet.netTrueBenefit.toLocaleString('en-IN')} Clean Profit
                  </h3>
                </div>

                <div className="text-left sm:text-right bg-blue-500/10 p-2 sm:p-0 rounded-xl">
                  <span className="text-xs text-slate-400 block font-medium">Net Return on Spend</span>
                  <span className="text-xl font-bold font-mono text-blue-300">
                    +{balanceSheet.returnOnSpendPercent}% Net
                  </span>
                </div>
              </div>

              {/* Two Column Accounting: Total Benefits vs Total Hidden Costs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Benefits Column (Green) */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Gross Benefits (+)
                    </span>
                    <span className="text-sm font-extrabold font-mono text-emerald-300">
                      ₹{balanceSheet.totalGrossBenefit.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span>• Direct Cashback & Pts:</span>
                      <span className="font-mono text-white">₹{balanceSheet.estimatedCashback.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Lounge Food/Beverage:</span>
                      <span className="font-mono text-white">₹{balanceSheet.loungeAccessValue.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Fuel Surcharge Waiver:</span>
                      <span className="font-mono text-white">₹{balanceSheet.fuelSurchargeWaiver.toLocaleString('en-IN')}</span>
                    </div>
                    {balanceSheet.milestoneVouchers > 0 && (
                      <div className="flex justify-between">
                        <span>• Milestone Bonus:</span>
                        <span className="font-mono text-white">₹{balanceSheet.milestoneVouchers.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Costs Column (Red/Amber) */}
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                    <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                      Fees & Hidden Costs (-)
                    </span>
                    <span className="text-sm font-extrabold font-mono text-rose-300">
                      ₹{balanceSheet.totalHiddenAndDirectCosts.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span>• Annual Fee (+18% GST):</span>
                      <span className="font-mono text-white">
                        {balanceSheet.isFeeWaived ? '₹0 (Waived)' : `₹${balanceSheet.effectiveAnnualFee.toLocaleString('en-IN')}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Forex Markup + GST:</span>
                      <span className="font-mono text-white">₹{balanceSheet.forexCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Reward Claim Charges:</span>
                      <span className="font-mono text-white">₹{balanceSheet.redemptionFeeCost.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Mathematical Equation Explanation */}
              <div className="p-3.5 rounded-xl bg-[#050816] border border-blue-900/40 text-xs text-slate-300 flex items-center justify-between font-mono">
                <span>₹{balanceSheet.totalGrossBenefit.toLocaleString('en-IN')} (Benefits)</span>
                <span className="text-rose-400">- ₹{balanceSheet.totalHiddenAndDirectCosts.toLocaleString('en-IN')} (Costs)</span>
                <span className="text-emerald-400 font-bold">= +₹{balanceSheet.netTrueBenefit.toLocaleString('en-IN')} Net</span>
              </div>

              {/* Bottom Card Verdict */}
              <div className="p-3.5 rounded-xl bg-[#050816] border border-blue-900/40 flex items-start gap-2.5 text-xs">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-slate-300 leading-relaxed">
                  <strong>CreditSense Verdict on {selectedCard.name}:</strong> {balanceSheet.netTrueBenefit > 5000 ? 'Highly profitable card for your spend tier with positive net ROI.' : 'Modest return. Ensure you hit annual spend waivers to avoid fee decay.'}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
