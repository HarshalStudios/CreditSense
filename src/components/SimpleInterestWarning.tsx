import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle, Info, Flame } from 'lucide-react';

export function SimpleInterestWarning() {
  const [billAmount, setBillAmount] = useState<number>(25000);
  const [unpaidMonths, setUnpaidMonths] = useState<number>(2);
  const [paymentOption, setPaymentOption] = useState<'minimum' | 'unpaid'>('minimum');

  // Simple, standard Indian Credit Card Interest Math (3.5% per month / 42% APR + 18% GST)
  const monthlyRate = 0.035; // 3.5% per month
  const totalInterest = Math.round(billAmount * monthlyRate * unpaidMonths);
  const gstOnInterest = Math.round(totalInterest * 0.18); // 18% GST on bank fees
  const lateFee = paymentOption === 'unpaid' ? (billAmount > 10000 ? 750 * unpaidMonths : 500 * unpaidMonths) : 0;
  const totalLoss = totalInterest + gstOnInterest + lateFee;

  return (
    <section id="interest-warning" className="py-12 sm:py-16 bg-[#050816] relative border-t border-blue-900/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Feature 3</span>
            <span>•</span>
            <span>Interest Trap Warning</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            3. Credit Card Interest & Debt Warning
          </h2>
          <p className="text-sm text-slate-300">
            Learn why paying only the "Minimum Due" or delaying payment leads to heavy financial losses.
          </p>
        </div>

        {/* 2-Column Warning Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Simple Inputs (6 Cols) */}
          <div className="lg:col-span-6 bg-[#0a192f] border border-blue-900/40 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl shadow-black/40">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-blue-900/40 pb-3">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Input Unpaid Bill Scenario</span>
            </h3>

            {/* Bill Amount Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Total Credit Card Bill Amount</span>
                <span className="text-base font-mono font-bold text-rose-400">
                  ₹{billAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="5000"
                value={billAmount}
                onChange={(e) => setBillAmount(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex gap-2 pt-1">
                {[10000, 25000, 50000, 100000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setBillAmount(amt)}
                    className={`px-2.5 py-1 text-[11px] rounded-lg border transition-all cursor-pointer ${
                      billAmount === amt
                        ? 'bg-rose-600 text-white border-rose-500 font-semibold'
                        : 'bg-[#050816] text-slate-400 border-blue-900/40 hover:text-white'
                    }`}
                  >
                    ₹{(amt / 1000)}k
                  </button>
                ))}
              </div>
            </div>

            {/* Unpaid Duration */}
            <div className="space-y-2 pt-2 border-t border-blue-900/30">
              <label className="text-xs font-bold text-slate-200 block">
                Number of Months Delayed / Unpaid:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 6].map((m) => (
                  <button
                    key={m}
                    onClick={() => setUnpaidMonths(m)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      unpaidMonths === m
                        ? 'bg-rose-600 text-white border-rose-500 shadow-md'
                        : 'bg-[#050816] border-blue-900/40 text-slate-400 hover:text-white'
                    }`}
                  >
                    {m} {m === 1 ? 'Month' : 'Months'}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Scenario */}
            <div className="space-y-2 pt-2 border-t border-blue-900/30">
              <label className="text-xs font-bold text-slate-200 block">
                User Payment Action:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setPaymentOption('minimum')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentOption === 'minimum'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-semibold'
                      : 'bg-[#050816] border-blue-900/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="block font-bold">Paid 5% Minimum Due</span>
                  <span className="text-[10px] text-slate-400">Triggers 3.5%/mo interest</span>
                </button>

                <button
                  onClick={() => setPaymentOption('unpaid')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentOption === 'unpaid'
                      ? 'bg-rose-500/20 border-rose-400 text-rose-200 font-semibold'
                      : 'bg-[#050816] border-blue-900/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="block font-bold">Zero Payment Made</span>
                  <span className="text-[10px] text-slate-400">Adds Late Payment Penalty</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right: Warning Output (6 Cols) */}
          <div className="lg:col-span-6 bg-[#0a192f] border border-blue-900/40 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl shadow-black/40">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-blue-900/40 pb-3">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Calculated Financial Penalty</span>
            </h3>

            {/* Giant Red Warning Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/80 via-[#050816] to-[#0a192f] border border-rose-500/60 text-center space-y-1.5 shadow-lg">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block flex items-center justify-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Extra Financial Loss
              </span>
              <div className="text-3xl sm:text-4xl font-black text-rose-400 font-mono">
                +₹{totalLoss.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-slate-300">
                You lose <strong className="text-rose-300">₹{totalLoss.toLocaleString('en-IN')}</strong> in pure bank interest & taxes if unpaid for {unpaidMonths} {unpaidMonths === 1 ? 'month' : 'months'}!
              </p>
            </div>

            {/* Simple Penalty Breakdown */}
            <div className="space-y-2.5 text-xs">
              <span className="font-bold text-slate-300 block">Where this money goes:</span>
              
              <div className="p-3 rounded-xl bg-[#050816] border border-blue-900/40 space-y-2 font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>1. Bank Interest (3.5%/month × {unpaidMonths} mos):</span>
                  <span className="font-bold text-rose-300">₹{totalInterest.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="flex justify-between text-slate-300">
                  <span>2. 18% GST on Interest:</span>
                  <span className="font-bold text-rose-300">₹{gstOnInterest.toLocaleString('en-IN')}</span>
                </div>

                {lateFee > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>3. Late Payment Penalty Charges:</span>
                    <span className="font-bold text-rose-300">₹{lateFee.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-blue-900/50">
                  <span className="font-sans text-rose-400">Total Unnecessary Loss:</span>
                  <span className="text-rose-400">₹{totalLoss.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Golden Rule */}
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>The Golden Rule of Credit Cards:</span>
              </div>
              <p className="text-[11px] text-slate-300 pl-5">
                Always pay <strong>100% Total Amount Due</strong> before the billing due date. You will enjoy <strong>45–50 days of interest-free credit</strong> and pay exactly <strong>₹0</strong> in interest!
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
