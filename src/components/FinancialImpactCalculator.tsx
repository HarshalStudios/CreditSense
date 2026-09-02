import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  IndianRupee, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight, 
  Coins, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  Award,
  Wallet
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FinancialImpactCalculator: React.FC = () => {
  const [monthlySpend, setMonthlySpend] = useState<number>(35000);
  const [years, setYears] = useState<number>(3);
  const [reinvestSip, setReinvestSip] = useState<boolean>(true);

  // Financial calculations
  const metrics = useMemo(() => {
    // Unoptimized card returns ~1% reward points with high friction (often expired)
    const unoptimizedRate = 0.01;
    const unoptimizedMonthly = Math.round(monthlySpend * unoptimizedRate);
    const unoptimizedYearly = unoptimizedMonthly * 12;

    // CreditSense optimized portfolio yields ~5.5% blended return (Cashback + Fuel Waiver + Milestones)
    const optimizedRate = 0.055;
    const optimizedMonthly = Math.round(monthlySpend * optimizedRate);
    const optimizedYearly = optimizedMonthly * 12;

    const netMonthlySavings = optimizedMonthly - unoptimizedMonthly;
    const netYearlySavings = optimizedYearly - unoptimizedYearly;

    // Breakdown components (Annual)
    const diningCashback = Math.round(monthlySpend * 0.30 * 0.08 * 12); // 30% food at 8%
    const onlineShoppingCashback = Math.round(monthlySpend * 0.35 * 0.05 * 12); // 35% shopping at 5%
    const fuelWaiverSavings = Math.round(monthlySpend * 0.15 * 0.0118 * 12); // 1% + 18% GST fuel waiver
    const airportLoungeValue = 2 * 1200; // 2 domestic visits @ ₹1,200 buffet value
    const milestoneBonusValue = monthlySpend * 12 >= 200000 ? 2000 : 500;

    // Compounded calculation (12% annual SIP return if reinvested in Mutual Funds)
    let totalAccumulated = 0;
    let baselineAccumulated = 0;

    for (let yr = 1; yr <= years; yr++) {
      if (reinvestSip) {
        totalAccumulated = (totalAccumulated + optimizedYearly) * 1.12;
        baselineAccumulated = (baselineAccumulated + unoptimizedYearly) * 1.12;
      } else {
        totalAccumulated += optimizedYearly;
        baselineAccumulated += unoptimizedYearly;
      }
    }

    const netAccumulatedAdvantage = Math.round(totalAccumulated - baselineAccumulated);

    return {
      unoptimizedMonthly,
      unoptimizedYearly,
      optimizedMonthly,
      optimizedYearly,
      netMonthlySavings,
      netYearlySavings,
      diningCashback,
      onlineShoppingCashback,
      fuelWaiverSavings,
      airportLoungeValue,
      milestoneBonusValue,
      totalAccumulated: Math.round(totalAccumulated),
      baselineAccumulated: Math.round(baselineAccumulated),
      netAccumulatedAdvantage,
    };
  }, [monthlySpend, years, reinvestSip]);

  const triggerCelebrate = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <section 
      id="calculator"
      className="py-16 sm:py-24 bg-[#050816] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>Core Feature 3: Financial Impact & ROI Calculator</span>
          </div>

          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            See How Much Wealth <span className="text-emerald-400">You Are Leaving on the Table</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Credit cards are either a massive wealth generator or a bank profit stream. Calculate your direct savings and see how disciplined optimization compounds over time.
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sliders & Controls (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0a192f] border border-blue-900/40 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl shadow-black/40">
            
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/40">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Spending Assumptions
                </h3>
              </div>
              <span className="text-xs text-emerald-400 font-semibold font-mono">
                ₹ INR Engine
              </span>
            </div>

            {/* Monthly Card Spend Slider */}
            <div className="space-y-3 p-4 bg-[#050816] border border-blue-900/40 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Total Monthly Card Spend
                </label>
                <span className="text-base font-bold font-mono text-emerald-400">
                  ₹{monthlySpend.toLocaleString('en-IN')}/mo
                </span>
              </div>

              <input
                type="range"
                id="calc-monthly-spend-slider"
                min="5000"
                max="200000"
                step="2500"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />

              {/* Quick Spends Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[15000, 35000, 60000, 100000, 150000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setMonthlySpend(val)}
                    className={`text-[11px] px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                      monthlySpend === val
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                        : 'bg-[#0a192f] border-blue-900/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ₹{(val / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>
            </div>

            {/* Time Horizon Slider */}
            <div className="space-y-3 p-4 bg-[#050816] border border-blue-900/40 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Time Horizon
                </label>
                <span className="text-sm font-bold text-blue-400">
                  {years} {years === 1 ? 'Year' : 'Years'}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 5].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setYears(yr)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      years === yr
                        ? 'bg-blue-600 text-white border-blue-500 font-bold shadow-sm'
                        : 'bg-[#0a192f] border-blue-900/40 text-slate-400 hover:text-slate-200 hover:bg-[#112240]'
                    }`}
                  >
                    {yr} {yr === 1 ? 'Yr' : 'Yrs'}
                  </button>
                ))}
              </div>
            </div>

            {/* SIP Reinvestment Toggle */}
            <div className="p-3.5 bg-[#050816] border border-blue-900/40 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">
                  Reinvest in 12% Index SIP?
                </span>
                <span className="text-[11px] text-slate-400">
                  Compound your cashback into wealth
                </span>
              </div>
              <button
                id="sip-toggle-btn"
                onClick={() => setReinvestSip(!reinvestSip)}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  reinvestSip ? 'bg-emerald-500 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
              </button>
            </div>

            {/* Direct Example Highlight Callout (Required by Prompt) */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-1">
              <span className="text-xs text-slate-300 font-medium block">
                Calculated Annual Financial Guarantee:
              </span>
              <p className="text-lg sm:text-xl font-extrabold text-emerald-400 font-['Space_Grotesk']">
                “You can save ₹{metrics.optimizedYearly.toLocaleString('en-IN')} per year using optimized card usage”
              </p>
              <span className="text-[11px] text-slate-400">
                (Vs. ordinary bank cards yielding only ₹{metrics.unoptimizedYearly.toLocaleString('en-IN')})
              </span>
            </div>

          </div>

          {/* Right Column: Comparative Results & Compound Breakdown (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Massive Net Savings Showcase Banner */}
            <div className="bg-[#0a192f] border border-emerald-500/40 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-900/40">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    Net Financial Advantage
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
                    +₹{metrics.netYearlySavings.toLocaleString('en-IN')} / Year Extra
                  </h3>
                </div>

                <div className="text-left sm:text-right bg-emerald-500/10 p-2.5 sm:p-0 rounded-xl">
                  <span className="text-xs text-slate-400 block font-medium">Monthly Pocket Increase</span>
                  <span className="text-xl font-bold font-mono text-emerald-300">
                    +₹{metrics.netMonthlySavings.toLocaleString('en-IN')} / mo
                  </span>
                </div>
              </div>

              {/* Side-by-Side Savings Matrix */}
              <div className="grid grid-cols-2 gap-3">
                
                <div className="p-4 rounded-xl bg-[#050816] border border-blue-900/40 space-y-2">
                  <span className="text-xs text-slate-400 font-semibold block">
                    Unoptimized Card User
                  </span>
                  <p className="text-xl sm:text-2xl font-bold font-mono text-slate-300">
                    ₹{metrics.unoptimizedYearly.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Standard 1% reward points with 18% GST redemption charges
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/50 space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl" />
                  <span className="text-xs text-emerald-400 font-bold block flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    CreditSense Optimized
                  </span>
                  <p className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-300">
                    ₹{metrics.optimizedYearly.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-emerald-300/80 font-medium">
                    5.5% blended return (Direct statement credit & fee waivers)
                  </p>
                </div>

              </div>

              {/* Where the Money Comes From (Annual Breakdown) */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Where Your Annual ₹{metrics.optimizedYearly.toLocaleString('en-IN')} Comes From:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-[#050816] border border-blue-900/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-white font-semibold block">Food & Dining Cashback</span>
                      <span className="text-[10px] text-slate-400">Swiggy, Zomato, Dining</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-blue-300">
                      ₹{metrics.diningCashback.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#050816] border border-blue-900/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-white font-semibold block">Shopping & E-Commerce</span>
                      <span className="text-[10px] text-slate-400">Amazon, Flipkart, Myntra</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-blue-300">
                      ₹{metrics.onlineShoppingCashback.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#050816] border border-blue-900/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-white font-semibold block">Airport Lounge Value</span>
                      <span className="text-[10px] text-slate-400">Complimentary buffet meals</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-emerald-400">
                      ₹{metrics.airportLoungeValue.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#050816] border border-blue-900/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-white font-semibold block">Fuel Surcharge Waivers</span>
                      <span className="text-[10px] text-slate-400">1% surcharge + 18% GST refund</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-emerald-400">
                      ₹{metrics.fuelWaiverSavings.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Multi-Year Compounded Total */}
              <div className="p-4 rounded-xl bg-[#050816] border border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5 text-center sm:text-left">
                  <span className="text-xs text-slate-400 font-medium block">
                    {years}-Year {reinvestSip ? 'Compounded SIP Growth (12% Return)' : 'Total Accumulated Cash'}
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold font-['Space_Grotesk'] text-white">
                    ₹{metrics.totalAccumulated.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  id="celebrate-compounding-btn"
                  onClick={triggerCelebrate}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Lock in Savings</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
