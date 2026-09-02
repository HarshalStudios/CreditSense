import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  IndianRupee, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does CreditSense AI calculate my estimated cashback & savings?',
      a: 'We parse the exact, verified reward rules and merchant categorization codes (MCC) for over 50 Indian credit cards. We then simulate your specific monthly categorical spending (Swiggy, Amazon, fuel pumps, mobile bills, flights), factor in monthly category cashback caps, deduct annual renewal fees (unless fee-waiver spend tiers are satisfied), and deliver the true net profit in ₹.'
    },
    {
      q: 'Will checking card recommendations impact my CIBIL score?',
      a: 'Not at all! CreditSense AI is an analytical optimization simulator. We do not perform "hard inquiries" on your credit report. Only when you formally apply on a bank website does the issuing bank pull your report.'
    },
    {
      q: 'I am a college student with zero salary slips. Can I get a credit card?',
      a: 'Yes! You can get 100% guaranteed approval on Fixed Deposit (FD) backed credit cards like the IDFC FIRST WOW or Kotak 811 Dream Different card with an FD as low as ₹2,000. These cards have 0 annual fees, 0% forex markup, and start building your CIBIL score immediately.'
    },
    {
      q: 'Why should I never pay only the "Minimum Amount Due" (5%) on my bill?',
      a: 'Paying only the Minimum Due is the most expensive financial mistake in India. It triggers revolving interest rates of 3.5% per month (42% per year) calculated from the date of each purchase. Additionally, you lose the 50-day interest-free grace period on every new transaction until the full balance is cleared.'
    },
    {
      q: 'How do RuPay credit cards work on UPI apps like Google Pay / Paytm?',
      a: 'RuPay credit cards can be linked directly into your UPI app (Google Pay, PhonePe, Paytm, BHIM). When you scan any merchant QR code at a grocery store, cafe, or petrol pump, you can pay using your credit card limit instead of your bank account, earning rewards (e.g. 1.5% with Tata Neu Infinity) on offline spends.'
    },
    {
      q: 'Can I get my annual renewal fee waived if I did not hit the milestone spend?',
      a: 'Yes! If you are a consistent cardholder who pays bills on time, call your bank customer care 30 days before your anniversary date. Many banks (HDFC, ICICI, SBI) will willingly offer a fee waiver or reverse the fee in exchange for reward points or a nominal 90-day spend challenge.'
    }
  ];

  return (
    <section 
      id="faq"
      className="py-16 sm:py-24 bg-[#050816] relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Financial Clarity</span>
          </div>

          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="text-blue-400">Questions</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Expert answers on Indian credit cards, CIBIL score optimization, and fee reduction strategies.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3.5">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0a192f] border border-blue-900/40 rounded-2xl overflow-hidden transition-all duration-200 shadow-md shadow-black/30 hover:border-blue-500/50"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#112240]/60 transition-colors"
              >
                <span className="font-bold text-sm sm:text-base text-white">
                  {item.q}
                </span>
                <span className="p-1 rounded-lg bg-[#050816] text-blue-400 border border-blue-900/40 shrink-0">
                  {openIdx === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {openIdx === idx && (
                <div className="px-5 pb-6 pt-1 sm:px-6 text-xs sm:text-sm text-slate-300 border-t border-blue-900/40 leading-relaxed animate-fadeIn">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
