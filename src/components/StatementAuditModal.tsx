import React, { useState } from 'react';
import { 
  FileSearch, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  IndianRupee, 
  Sparkles, 
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Zap,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StatementAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StatementAuditModal: React.FC<StatementAuditModalProps> = ({ isOpen, onClose }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [sampleSelected, setSampleSelected] = useState<'hdfc' | 'sbi' | 'icici'>('hdfc');

  if (!isOpen) return null;

  const handleSimulateAudit = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleReset = () => {
    setAnalyzed(false);
    setAnalyzing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0a192f] border border-blue-900/60 rounded-2xl max-w-xl w-full p-6 space-y-5 max-h-[92vh] overflow-y-auto shadow-2xl shadow-black/80">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-blue-900/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <FileSearch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-['Space_Grotesk']">
                Free Statement Leak Audit
              </h3>
              <p className="text-[11px] text-slate-400">
                Identify un-optimized swipes, lost cashback & surcharge fees
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#050816] hover:bg-[#112240] text-slate-300 hover:text-white flex items-center justify-center text-sm cursor-pointer border border-blue-900/40"
          >
            ✕
          </button>
        </div>

        {!analyzed ? (
          <div className="space-y-4">
            
            <p className="text-xs text-slate-300">
              Select a sample bank statement or paste a recent monthly summary to scan for missed rewards, fuel surcharges, and annual fee risks.
            </p>

            {/* Quick Sample Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Choose a Sample Statement to Audit:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'hdfc', name: 'HDFC Statement', spends: '₹34,800' },
                  { id: 'sbi', name: 'SBI Card Bill', spends: '₹28,500' },
                  { id: 'icici', name: 'ICICI Bank Bill', spends: '₹42,100' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSampleSelected(s.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      sampleSelected === s.id
                        ? 'bg-blue-600 text-white border-blue-500 font-semibold shadow-md'
                        : 'bg-[#050816] border-blue-900/40 text-slate-400 hover:text-slate-200 hover:bg-[#112240]'
                    }`}
                  >
                    <span className="text-xs font-bold block">{s.name}</span>
                    <span className="text-[10px] opacity-80 font-mono">{s.spends}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mock Drag Drop Box */}
            <div className="border-2 border-dashed border-blue-900/60 hover:border-blue-500/60 rounded-2xl p-6 text-center space-y-2 bg-[#050816]">
              <UploadCloud className="w-8 h-8 text-blue-400 mx-auto" />
              <div className="text-xs text-slate-300 font-medium">
                Drag & Drop PDF Statement or e-Bill
              </div>
              <p className="text-[10px] text-slate-500">
                Protected by 256-bit encryption. Zero account numbers or passwords stored.
              </p>
            </div>

            {/* Audit Trigger Button */}
            <button
              onClick={handleSimulateAudit}
              disabled={analyzing}
              className="w-full py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Scanning 40+ Merchant Codes & Fee Traps...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run AI Financial Health Audit (Free)</span>
                </>
              )}
            </button>

          </div>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            
            {/* Audit Score & Leak Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/40 via-[#050816] to-amber-950/30 border border-rose-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Statement Leak Detected
                </span>
                <span className="text-xs font-mono font-bold text-slate-300">
                  Efficiency: 62 / 100
                </span>
              </div>
              <h4 className="text-lg font-extrabold text-white font-['Space_Grotesk']">
                You Lost ₹1,240 in Missed Rewards & Fees this Month!
              </h4>
              <p className="text-xs text-slate-300">
                Annualized financial leak: <strong className="text-rose-400 font-mono">₹14,880/year</strong>
              </p>
            </div>

            {/* Detected Leaks Breakdown */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-300 block">Identified Inefficiencies:</span>
              
              <div className="p-2.5 rounded-lg bg-[#050816] border border-blue-900/40 space-y-0.5">
                <div className="flex justify-between font-semibold text-rose-300">
                  <span>1. Swiggy & Zomato Swipes (₹4,200 spend)</span>
                  <span>-₹378 Missed</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Used a standard 1% card instead of Airtel Axis / SBI Cashback. Lost 9% extra cashback.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#050816] border border-blue-900/40 space-y-0.5">
                <div className="flex justify-between font-semibold text-rose-300">
                  <span>2. Petrol Pump Fuel Surcharges</span>
                  <span>-₹59 Lost</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  1% surcharge + 18% GST was levied without waiver trigger on transaction below ₹500.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#050816] border border-blue-900/40 space-y-0.5">
                <div className="flex justify-between font-semibold text-amber-300">
                  <span>3. Annual Fee Waiver Progress</span>
                  <span>Warning</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  You are ₹22,000 away from your ₹1,00,000 annual fee waiver. Shift routine bills to save ₹1,000 renewal fee.
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs space-y-1">
              <span className="font-bold text-emerald-300 block flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                CreditSense Prescription:
              </span>
              <p className="text-slate-300">
                Switching your top 2 dining and shopping cards will instantly recover this ₹14,880 leak with zero additional spend.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleReset}
                className="flex-1 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-[#050816] hover:bg-[#112240] border border-blue-900/40 transition-all cursor-pointer"
              >
                Scan Another Statement
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all cursor-pointer shadow-md shadow-blue-500/20"
              >
                Apply Recommendations
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
