import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  IndianRupee, 
  TrendingDown, 
  Percent, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  HelpCircle,
  Zap,
  Info,
  ArrowRight
} from 'lucide-react';

export const DebtAlertSystem: React.FC = () => {
  const [creditLimit, setCreditLimit] = useState<number>(100000);
  const [currentBalance, setCurrentBalance] = useState<number>(42000);
  const [unpaidRollOverMonths, setUnpaidRollOverMonths] = useState<number>(3);
  const [interestApr, setInterestApr] = useState<number>(42.0); // 3.5% per month = 42% per year (Standard HDFC/SBI/Axis rate)

  // Calculations
  const analysis = useMemo(() => {
    const utilizationRate = Math.round((currentBalance / creditLimit) * 100);
    const isOverLimit = currentBalance > creditLimit;
    const isExceedingSafe30 = utilizationRate > 30;

    // Minimum Due is typically 5% of total balance
    const minDue = Math.max(500, Math.round(currentBalance * 0.05));
    const unpaidPrincipal = currentBalance - minDue;

    // Monthly interest rate = APR / 12 (e.g. 42% / 12 = 3.5%)
    const monthlyRate = (interestApr / 100) / 12;

    // Interest incurred in month 1
    const month1Interest = Math.round(unpaidPrincipal * monthlyRate);
    const month1GstOnInterest = Math.round(month1Interest * 0.18); // 18% GST on bank financial charges
    const totalMonth1Loss = month1Interest + month1GstOnInterest;

    // Cumulative interest over selected months if revolving
    let cumulativeInterest = 0;
    let runningBalance = unpaidPrincipal;
    for (let m = 1; m <= unpaidRollOverMonths; m++) {
      const interest = runningBalance * monthlyRate;
      const gst = interest * 0.18;
      cumulativeInterest += (interest + gst);
      runningBalance = (runningBalance + interest + gst) - minDue;
      if (runningBalance < 0) runningBalance = 0;
    }

    // CIBIL Impact Rating
    let cibilStatus = {
      label: 'Optimal (Safe)',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30',
      description: 'Your credit utilization is strictly under 30%. CIBIL algorithm rewards this with a steady 780+ credit score.'
    };

    if (utilizationRate > 75 || isOverLimit) {
      cibilStatus = {
        label: 'Severe Risk (Score Drop Alert)',
        color: 'text-rose-400',
        bgColor: 'bg-rose-500/10 border-rose-500/40',
        description: 'High credit hunger detected! Utilization over 70% can drop your CIBIL score by 35–60 points within 30 days.'
      };
    } else if (utilizationRate > 30) {
      cibilStatus = {
        label: 'Moderate Warning (>30% Threshold)',
        color: 'text-amber-400',
        bgColor: 'bg-amber-500/10 border-amber-500/30',
        description: 'Exceeds the recommended 30% ratio. Indian credit bureaus flag high utilization as elevated default risk.'
      };
    }

    return {
      utilizationRate,
      isOverLimit,
      isExceedingSafe30,
      minDue,
      unpaidPrincipal,
      month1Interest,
      month1GstOnInterest,
      totalMonth1Loss,
      cumulativeInterest: Math.round(cumulativeInterest),
      cibilStatus,
    };
  }, [creditLimit, currentBalance, unpaidRollOverMonths, interestApr]);

  return (
    <section 
      id="debt-alert"
      className="py-16 sm:py-24 bg-[#050816] border-t border-blue-900/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Core Feature 4: Debt Guard & 42% APR Risk Alert System</span>
          </div>

          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Stop Indian Banks From Trapping You in <span className="text-rose-400">42% Interest Traps</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Credit card interest rates in India are between 40% and 43.2% per annum. Simulate your credit utilization and understand the severe financial damage of revolving balances.
          </p>
        </div>

        {/* 2-Column Interactive Simulator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Credit Limit & Balance Inputs (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0a192f] border border-blue-900/40 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl shadow-black/40">
            
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/40">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Credit Health Simulator
              </span>
              <span className="text-xs text-rose-400 font-mono font-bold">
                Live Risk Engine
              </span>
            </div>

            {/* Total Credit Limit Slider */}
            <div className="space-y-2 p-3.5 bg-[#050816] border border-blue-900/40 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Total Approved Credit Limit
                </label>
                <span className="text-sm font-bold font-mono text-blue-300">
                  ₹{creditLimit.toLocaleString('en-IN')}
                </span>
              </div>

              <input
                type="range"
                min="20000"
                max="500000"
                step="10000"
                value={creditLimit}
                onChange={(e) => setCreditLimit(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Current Statement Spends */}
            <div className="space-y-2 p-3.5 bg-[#050816] border border-blue-900/40 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Current Month Spends / Bill Due
                </label>
                <span className={`text-sm font-bold font-mono ${analysis.isExceedingSafe30 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  ₹{currentBalance.toLocaleString('en-IN')} ({analysis.utilizationRate}%)
                </span>
              </div>

              <input
                type="range"
                min="2000"
                max={creditLimit * 1.2}
                step="1000"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(Number(e.target.value))}
                className={`w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer ${
                  analysis.isExceedingSafe30 ? 'accent-rose-500' : 'accent-emerald-400'
                }`}
              />

              {/* Quick Presets */}
              <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                <span>Safe 20%: ₹{(creditLimit * 0.2).toLocaleString('en-IN')}</span>
                <span className="text-amber-400 font-semibold">Max 30%: ₹{(creditLimit * 0.3).toLocaleString('en-IN')}</span>
                <span className="text-rose-400">High: ₹{(creditLimit * 0.7).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Unpaid Months Rollover */}
            <div className="space-y-2 p-3.5 bg-[#050816] border border-blue-900/40 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Months If Bill Carried Forward Unpaid:
                </label>
                <span className="text-xs font-bold font-mono text-amber-300">
                  {unpaidRollOverMonths} Months
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 6].map((m) => (
                  <button
                    key={m}
                    onClick={() => setUnpaidRollOverMonths(m)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      unpaidRollOverMonths === m
                        ? 'bg-rose-500 text-white border-rose-400 font-bold shadow-sm'
                        : 'bg-[#0a192f] border-blue-900/40 text-slate-400 hover:text-slate-200 hover:bg-[#112240]'
                    }`}
                  >
                    {m} {m === 1 ? 'Month' : 'Months'}
                  </button>
                ))}
              </div>
            </div>

            {/* Bank APR Selection */}
            <div className="p-3 bg-[#050816] border border-blue-900/40 rounded-xl text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>Bank APR Rate:</span>
                <span className="font-mono text-slate-300">{interestApr}% p.a. (3.5%/month)</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                *Standard rate across HDFC, SBI Card, ICICI, and Axis Bank.
              </p>
            </div>

          </div>

          {/* Right Column: Live Danger Warning & Rupee Interest Breakdown (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Required Warning Banner */}
            <div className={`rounded-2xl p-6 sm:p-7 border shadow-2xl space-y-4 ${
              analysis.isExceedingSafe30 
                ? 'bg-[#0a192f] border-rose-500/50' 
                : 'bg-[#0a192f] border-emerald-500/40'
            }`}>
              
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl ${analysis.isExceedingSafe30 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {analysis.isExceedingSafe30 ? <AlertTriangle className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    Debt & Interest Alert System
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    {analysis.isExceedingSafe30 ? 'High Interest & Credit Risk Detected' : 'Safe Credit Utilization Level'}
                  </h3>
                </div>
              </div>

              {/* Exact Prompt Required Warning Text Box */}
              <div className="p-4 rounded-xl bg-[#050816] border border-rose-500/40 space-y-1.5">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Financial Loss Warning:
                </span>
                <p className="text-lg sm:text-xl font-bold text-white font-['Space_Grotesk']">
                  “You may incur <span className="text-rose-400 font-mono font-extrabold">₹{analysis.totalMonth1Loss.toLocaleString('en-IN')}</span> interest if bill is unpaid in Month 1”
                </p>
                <p className="text-xs text-slate-300">
                  Compounding to a total loss of <strong className="text-rose-300 font-mono">₹{analysis.cumulativeInterest.toLocaleString('en-IN')}</strong> over {unpaidRollOverMonths} months if you only pay the Minimum Due of ₹{analysis.minDue.toLocaleString('en-IN')}.
                </p>
              </div>

              {/* Rupee Loss Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#050816] border border-blue-900/40 space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-medium">3.5%/mo Bank Interest</span>
                  <p className="text-base font-bold font-mono text-rose-300">
                    ₹{analysis.month1Interest.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-slate-400 block">Pure profit for bank</span>
                </div>

                <div className="p-3 rounded-xl bg-[#050816] border border-blue-900/40 space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-medium">+ 18% GST on Interest</span>
                  <p className="text-base font-bold font-mono text-amber-300">
                    ₹{analysis.month1GstOnInterest.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-slate-400 block">Government tax penalty</span>
                </div>

                <div className="p-3 rounded-xl bg-[#050816] border border-blue-900/40 space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-medium">CIBIL Score Risk</span>
                  <p className={`text-base font-bold ${analysis.cibilStatus.color}`}>
                    {analysis.utilizationRate}% Utilized
                  </p>
                  <span className="text-[10px] text-slate-400 block">{analysis.cibilStatus.label}</span>
                </div>
              </div>

              {/* CIBIL & Credit Bureau Insight */}
              <div className={`p-3.5 rounded-xl border ${analysis.cibilStatus.bgColor} text-xs space-y-1`}>
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Info className="w-3.5 h-3.5 text-blue-400" />
                  <span>Credit Bureau (CIBIL / Experian) Health Insight:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {analysis.cibilStatus.description}
                </p>
              </div>

              {/* Actionable Golden Rule */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs">
                  <span className="font-bold text-emerald-300 block">
                    The CreditSense Zero-Debt Golden Rule:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    Always automate <strong>100% Total Amount Due</strong> auto-debit from your savings account. Never pay only the 5% Minimum Due. This guarantees <strong>0% interest</strong>, 50 days of free credit, and steady credit score growth to 800+.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
