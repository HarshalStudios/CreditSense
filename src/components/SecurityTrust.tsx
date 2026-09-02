import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Cpu, 
  EyeOff, 
  FileCheck, 
  CheckCircle2, 
  Sparkles,
  Server
} from 'lucide-react';

export const SecurityTrust: React.FC = () => {
  const securityPillars = [
    {
      title: '256-Bit Bank-Grade Encryption',
      subtitle: 'Data In-Transit & At-Rest',
      icon: Lock,
      color: 'from-cyan-500 to-blue-500',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      description: 'All financial spend calculations and user simulation data are protected with TLS 1.3 and military-grade AES-256 encryption.'
    },
    {
      title: 'Zero Card Credentials Stored',
      subtitle: 'RBI Tokenization Compliant',
      icon: EyeOff,
      color: 'from-emerald-500 to-teal-500',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      description: 'We never ask for or store your 16-digit credit card number, CVV, or NetBanking passwords. Calculations use anonymous category aggregates only.'
    },
    {
      title: 'OTP Authentication & Privacy',
      subtitle: 'Ephemeral Session Security',
      icon: KeyRound,
      color: 'from-blue-500 to-indigo-500',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      description: 'Instant secure login via temporary one-time passcodes. Zero tracking cookies, zero sale of user data to third-party telemarketers.'
    },
    {
      title: 'AI Anomaly & Fraud Guard',
      subtitle: 'Real-Time Transaction Defense',
      icon: Cpu,
      color: 'from-amber-500 to-orange-500',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      description: 'Our heuristic models flag suspicious surcharge hikes, sudden merchant code changes, and unauthorized currency conversions.'
    }
  ];

  return (
    <section 
      id="security"
      className="py-16 sm:py-24 bg-[#050816] border-t border-blue-900/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Bank-Grade Standards</span>
          </div>

          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Security, Privacy & <span className="text-blue-400">Zero-Trust Architecture</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Your financial sovereignty and privacy come first. Built under strict RBI consumer protection principles.
          </p>
        </div>

        {/* 4 Security Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {securityPillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0a192f] border border-blue-900/40 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-lg shadow-black/30 hover:bg-[#112240]"
            >
              <div className="space-y-3">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${item.iconBg}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 block">
                  {item.subtitle}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-blue-900/40 flex items-center gap-1.5 text-[11px] text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Compliance</span>
              </div>
            </div>
          ))}
        </div>

        {/* Independence & Bias-Free Trust Banner */}
        <div className="bg-[#0a192f] border border-blue-900/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-black/40">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-center md:justify-start gap-1.5">
              <FileCheck className="w-4 h-4" />
              100% Unbiased Algorithmic Integrity
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">
              We Don't Take Hidden Bank Kickbacks
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Traditional comparison portals push cards that pay them the highest affiliate commission. CreditSense AI ranks cards purely on mathematical ROI calculated for your exact spend habits.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#050816] px-5 py-3.5 rounded-xl border border-blue-900/40 text-xs text-slate-300 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">Zero Sponsored Bias</span>
            <span className="text-slate-400">• Pure Math</span>
          </div>
        </div>

      </div>
    </section>
  );
};
