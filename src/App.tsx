import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SimpleCardRecommender } from './components/SimpleCardRecommender';
import { SimpleSavingsCalculator } from './components/SimpleSavingsCalculator';
import { SimpleInterestWarning } from './components/SimpleInterestWarning';
import { SimpleFooter } from './components/SimpleFooter';

export default function App() {
  const [calculatorPreset, setCalculatorPreset] = useState<{
    cardName: string;
    rewardRate: number;
    annualFee: number;
    waiverSpend: number;
  }>({
    cardName: 'Cashback SBI Card (5% Online)',
    rewardRate: 5,
    annualFee: 999,
    waiverSpend: 200000,
  });

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCardForCalculator = (
    cardName: string,
    rewardRate: number,
    annualFee: number,
    waiverSpend: number
  ) => {
    setCalculatorPreset({ cardName, rewardRate, annualFee, waiverSpend });
  };

  return (
    <div className="min-h-screen bg-[#050816] text-[#e6f1ff] selection:bg-blue-500/30 selection:text-blue-200 flex flex-col justify-between font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. Sticky Navigation Header */}
      <Navbar />

      {/* Main Content: 3 Core Features Only */}
      <main id="main-content" className="flex-grow">
        {/* Simple Hero Section */}
        <HeroSection onStart={() => scrollToSection('recommender')} />

        {/* Core Feature 1: Card Recommendation (Top 1-2 Cards) */}
        <SimpleCardRecommender onSelectCardForCalculator={handleSelectCardForCalculator} />

        {/* Core Feature 2: Simple Savings Calculator */}
        <SimpleSavingsCalculator
          key={`${calculatorPreset.cardName}-${calculatorPreset.rewardRate}`}
          selectedCardName={calculatorPreset.cardName}
          defaultRewardRate={calculatorPreset.rewardRate}
          defaultAnnualFee={calculatorPreset.annualFee}
          defaultWaiverSpend={calculatorPreset.waiverSpend}
        />

        {/* Core Feature 3: Simple Interest & Debt Warning */}
        <SimpleInterestWarning />
      </main>

      {/* Clean Academic Footer */}
      <SimpleFooter />
    </div>
  );
}
