import { create } from 'zustand';

interface OnboardingState {
  readonly isComplete: boolean;
  readonly currentStep: number;
  readonly selectedCurrency: string;
  readonly monthlyBudget: number | null;
  readonly budgetCycle: 'weekly' | 'bi-weekly' | 'monthly';
  readonly setCurrentStep: (step: number) => void;
  readonly setSelectedCurrency: (currency: string) => void;
  readonly setMonthlyBudget: (amount: number | null) => void;
  readonly setBudgetCycle: (cycle: 'weekly' | 'bi-weekly' | 'monthly') => void;
  readonly complete: () => void;
  readonly reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  isComplete: false,
  currentStep: 0,
  selectedCurrency: 'USD',
  monthlyBudget: null,
  budgetCycle: 'monthly',

  setCurrentStep: (step) => set({ currentStep: step }),

  setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),

  setMonthlyBudget: (amount) => set({ monthlyBudget: amount }),

  setBudgetCycle: (cycle) => set({ budgetCycle: cycle }),

  complete: () => set({ isComplete: true, currentStep: 4 }),

  reset: () =>
    set({
      isComplete: false,
      currentStep: 0,
      selectedCurrency: 'USD',
      monthlyBudget: null,
      budgetCycle: 'monthly',
    }),
}));
