export type UserProfileType = 'student' | 'young_pro' | 'salaried' | 'freelancer' | 'business';

export interface SpendingCategories {
  food: number;
  shopping: number;
  travel: number;
  fuel: number;
  utilities: number;
  groceries: number;
}

export interface CreditCardItem {
  id: string;
  name: string;
  bank: string;
  badge?: string;
  cardType: 'Cashback' | 'Rewards' | 'Travel' | 'Shopping' | 'Lifetime Free' | 'Student Friendly' | 'Fuel' | 'Dining';
  joiningFee: number;
  annualFee: number;
  feeWaiverSpend: number;
  rewardRate: string;
  cashbackBreakdown: {
    food: number; // percentage
    shopping: number;
    travel: number;
    fuel: number;
    utilities: number;
    groceries: number;
    other: number;
  };
  apr: number; // Annual Percentage Rate (e.g. 42% = 3.5%/mo)
  forexMarkup: number; // e.g. 2.0% or 3.5%
  redemptionFee: number;
  minIncomeRequired: number; // monthly income in INR
  idealFor: string[];
  whySuitable: string;
  keyPerks: string[];
  hiddenCostWarnings: string[];
  accentColor: string;
  gradient: string;
  cardImageColor: string;
  network: 'Visa' | 'Mastercard' | 'RuPay' | 'Amex';
  rupayUpi: boolean;
}

export interface RecommendationResult {
  card: CreditCardItem;
  matchScore: number;
  estimatedMonthlyCashback: number;
  estimatedYearlyCashback: number;
  isFeeWaived: boolean;
  netAnnualProfit: number;
  reasons: string[];
}

export interface TransactionSimulation {
  category: keyof SpendingCategories | 'entertainment' | 'international';
  merchantName: string;
  amount: number;
  description: string;
}

export interface OptimizationSuggestion {
  bestCard: CreditCardItem;
  cashbackPercent: number;
  rupeesSaved: number;
  rewardPointsEarned: number;
  comparisonVsBasic: number;
  proTip: string;
  alternativeCard?: {
    card: CreditCardItem;
    rupeesSaved: number;
    note: string;
  };
}
