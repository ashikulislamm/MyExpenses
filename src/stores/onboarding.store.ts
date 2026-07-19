import { create } from 'zustand';

interface OnboardingState {
  readonly isComplete: boolean;
  readonly currentStep: number;
  readonly selectedCurrency: string;
  readonly monthlyBudget: number | null;
  readonly setCurrentStep: (step: number) => void;
  readonly setSelectedCurrency: (currency: string) => void;
  readonly setMonthlyBudget: (amount: number | null) => void;
  readonly complete: () => void;
  readonly reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  isComplete: false,
  currentStep: 0,
  selectedCurrency: 'USD',
  monthlyBudget: null,

  setCurrentStep: (step) => set({ currentStep: step }),

  setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),

  setMonthlyBudget: (amount) => set({ monthlyBudget: amount }),

  complete: () => set({ isComplete: true, currentStep: 4 }),

  reset: () =>
    set({
      isComplete: false,
      currentStep: 0,
      selectedCurrency: 'USD',
      monthlyBudget: null,
    }),
}));
