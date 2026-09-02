import React, { useState } from 'react';
import { 
  CreditCard, 
  Sparkles, 
  Mail, 
  Send, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  IndianRupee,
  Phone,
  MapPin,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer 
      id="contact-footer"
      className="bg-[#050816] border-t border-blue-900/40 pt-16 pb-12 text-slate-400 text-xs relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Mission (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-[#0a192f] rounded-[10px] flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <span className="font-['Space_Grotesk'] text-xl font-bold text-white">
                Credit<span className="text-blue-400">Sense</span> AI
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              India's premier smart credit card optimizer. Built to help students, young professionals, and savvy cardholders maximize rewards, avoid 42% interest debt traps, and save ₹5,000–₹45,000+ per year.
            </p>

            <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-blue-400" /> 256-Bit SSL
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Free & Unbiased
              </span>
            </div>
          </div>

          {/* Quick Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Core Tools
            </h4>
            <ul className="space-y-2">
              <li><a href="#recommender" className="hover:text-blue-400 transition-colors">Smart Recommender</a></li>
              <li><a href="#optimizer" className="hover:text-blue-400 transition-colors">Real-Time Optimizer</a></li>
              <li><a href="#calculator" className="hover:text-blue-400 transition-colors">Savings ROI Calculator</a></li>
              <li><a href="#debt-alert" className="hover:text-blue-400 transition-colors">Debt & 42% APR Guard</a></li>
              <li><a href="#hidden-costs" className="hover:text-blue-400 transition-colors">Hidden Cost Analyzer</a></li>
            </ul>
          </div>

          {/* Indian Cards Directory (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Popular Indian Cards
            </h4>
            <ul className="space-y-2">
              <li><a href="#cards-catalog" className="hover:text-blue-400 transition-colors">Cashback SBI Card (5% Online)</a></li>
              <li><a href="#cards-catalog" className="hover:text-blue-400 transition-colors">HDFC Millennia (5% Partner Cashback)</a></li>
              <li><a href="#cards-catalog" className="hover:text-blue-400 transition-colors">Amazon Pay ICICI (Lifetime Free)</a></li>
              <li><a href="#cards-catalog" className="hover:text-blue-400 transition-colors">Airtel Axis (25% Utility + 10% Food)</a></li>
              <li><a href="#cards-catalog" className="hover:text-blue-400 transition-colors">IDFC FIRST WOW (FD / Student)</a></li>
            </ul>
          </div>

          {/* Newsletter / Statement Updates (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Monthly FinTech Alerts
            </h4>
            <p className="text-xs text-slate-400">
              Get notified when Indian banks devalue rewards, change lounge rules, or launch high-cashback offers.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#0a192f] border border-blue-900/40 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/20"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Subscribed Successfully!</span>
                  </>
                ) : (
                  <>
                    <span>Get Card Devaluation Alerts</span>
                    <Send className="w-3 h-3" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Legal & Regulatory Disclaimer */}
        <div className="pt-8 border-t border-blue-900/40 space-y-3 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> CreditSense AI is an independent analytical, educational, and computational simulation platform. We are not a bank, non-banking financial company (NBFC), or registered financial advisor. Credit card reward terms, fee structures, interest rates (APR), and airport lounge access rules are subject to change at the sole discretion of the respective issuing banks (HDFC Bank, SBI Cards & Payment Services Ltd, ICICI Bank Ltd, Axis Bank Ltd, IDFC FIRST Bank Ltd, etc.). All computations are provided as estimates based on verified public disclosures and consumer financial simulation heuristics.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-blue-900/30 text-slate-400">
            <span>© {new Date().getFullYear()} CreditSense AI – Smart Credit Card Optimizer. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a href="#about-us" className="hover:text-slate-300">About Us</a>
              <a href="#security" className="hover:text-slate-300">Privacy Policy</a>
              <a href="#faq" className="hover:text-slate-300">Terms of Service</a>
              <a href="#contact-footer" className="hover:text-slate-300">Contact Support</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
