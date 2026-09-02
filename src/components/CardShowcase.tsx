import React, { useState, useMemo } from 'react';
import { 
  CreditCard, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  IndianRupee, 
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Filter
} from 'lucide-react';
import { INDIAN_CREDIT_CARDS } from '../data/cardsData';
import { CreditCardItem } from '../types';

export const CardShowcase: React.FC = () => {
  const [selectedBank, setSelectedBank] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalCard, setActiveModalCard] = useState<CreditCardItem | null>(null);

  const banks = ['All', 'HDFC Bank', 'SBI Card', 'ICICI Bank', 'Axis Bank', 'IDFC FIRST'];
  const types = ['All', 'Cashback', 'Lifetime Free', 'Travel', 'Student Friendly', 'Shopping'];

  const filteredCards = useMemo(() => {
    return INDIAN_CREDIT_CARDS.filter(card => {
      const matchBank = selectedBank === 'All' || card.bank === selectedBank;
      const matchType = selectedType === 'All' || card.cardType === selectedType;
      const matchSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          card.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          card.idealFor.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchBank && matchType && matchSearch;
    });
  }, [selectedBank, selectedType, searchQuery]);

  return (
    <section 
      id="cards-catalog"
      className="py-16 sm:py-24 bg-[#050816] border-t border-blue-900/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <CreditCard className="w-3.5 h-3.5 text-blue-400" />
            <span>Curated Indian Credit Card Directory</span>
          </div>

          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Top Credit Cards in India <span className="text-blue-400">(HDFC, SBI, ICICI & More)</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Audited for transparent rewards, fee-waiver thresholds, and hidden trap charges. Filter by issuing bank, cashback category, or eligibility.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#0a192f] border border-blue-900/40 rounded-2xl p-4 sm:p-5 mb-8 space-y-4 shadow-lg shadow-black/30">
          
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by card name, bank (e.g. HDFC, SBI), or perk (e.g. Swiggy, UPI, Lounge)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#050816] border border-blue-900/40 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Bank Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {banks.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBank(b)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedBank === b
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'bg-[#050816] border border-blue-900/40 text-slate-400 hover:text-slate-200 hover:bg-[#112240]'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Filter className="w-3 h-3 text-blue-400" />
              Category:
            </span>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                  selectedType === t
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 bg-[#050816] border border-blue-900/40 hover:bg-[#112240]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              id={`catalog-card-${card.id}`}
              className="bg-[#0a192f] border border-blue-900/40 hover:border-blue-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-lg shadow-black/30 hover:bg-[#112240]"
            >
              <div className="space-y-3.5">
                
                {/* Visual Card Gradient Header */}
                <div className={`p-4 rounded-xl ${card.cardImageColor} text-white shadow-md relative overflow-hidden`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider uppercase opacity-80">
                      {card.bank}
                    </span>
                    <span className="text-xs font-mono font-bold">
                      {card.network}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold mt-3 tracking-tight">
                    {card.name}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-[10px] opacity-90 font-mono">
                    <span>{card.cardType}</span>
                    <span>{card.rupayUpi ? '⚡ UPI Enabled' : 'Chip & PIN'}</span>
                  </div>
                </div>

                {/* Badge & Quick Perks */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
                    {card.badge || card.cardType}
                  </span>
                  <span className="text-xs font-bold font-mono text-emerald-400">
                    {card.annualFee === 0 ? 'Lifetime Free (₹0)' : `₹${card.annualFee}/year`}
                  </span>
                </div>

                {/* Reward Rate Summary */}
                <p className="text-xs font-semibold text-slate-200 bg-[#050816] p-2.5 rounded-xl border border-blue-900/40">
                  🎁 {card.rewardRate}
                </p>

                {/* Short Suitable Description */}
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {card.whySuitable}
                </p>

                {/* Key Bullet Perks */}
                <ul className="space-y-1.5 text-xs text-slate-300 pt-1">
                  {card.keyPerks.slice(0, 2).map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{perk}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-blue-900/40">
                <button
                  onClick={() => setActiveModalCard(card)}
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-[#050816] hover:bg-blue-600 border border-blue-900/40 hover:border-blue-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View Fee Breakdown & Warnings</span>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Card Detail Modal */}
        {activeModalCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[#0a192f] border border-blue-900/60 rounded-2xl max-w-lg w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/80">
              
              <div className="flex items-center justify-between pb-3 border-b border-blue-900/40">
                <div>
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">
                    {activeModalCard.bank}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {activeModalCard.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalCard(null)}
                  className="w-8 h-8 rounded-lg bg-[#050816] hover:bg-[#112240] text-slate-300 hover:text-white flex items-center justify-center text-sm cursor-pointer border border-blue-900/40"
                >
                  ✕
                </button>
              </div>

              {/* Fee and Rate Matrix */}
              <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-[#050816] border border-blue-900/40 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Joining Fee:</span>
                  <span className="font-bold text-white">₹{activeModalCard.joiningFee} + 18% GST</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Annual Renewal Fee:</span>
                  <span className="font-bold text-emerald-400">
                    {activeModalCard.annualFee === 0 ? '₹0 (Free Forever)' : `₹${activeModalCard.annualFee} + GST`}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Fee Waiver Spend:</span>
                  <span className="font-bold text-blue-300">
                    {activeModalCard.feeWaiverSpend === 0 ? 'Zero spend needed' : `₹${activeModalCard.feeWaiverSpend.toLocaleString('en-IN')}/yr`}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">APR Interest:</span>
                  <span className="font-bold text-rose-400">{activeModalCard.apr}% p.a.</span>
                </div>
              </div>

              {/* Key Perks */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Top Financial Benefits:
                </span>
                <div className="space-y-1.5">
                  {activeModalCard.keyPerks.map((perk, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-[#050816] border border-blue-900/40 text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hidden Warnings */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Things to Watch Out For:
                </span>
                <div className="space-y-1.5">
                  {activeModalCard.hiddenCostWarnings.map((warn, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-amber-950/20 border border-amber-900/30 text-xs text-amber-200/90 flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{warn}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-blue-900/40 flex justify-end">
                <button
                  onClick={() => setActiveModalCard(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 cursor-pointer shadow-md shadow-blue-500/20"
                >
                  Close Window
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
