import { create } from 'zustand';
import { UserProfile, CreateUserProfileInput, UpdateUserProfileInput, BudgetCycle } from '../types/profile.types';
import { ProfileRepository } from '../repositories/profile.repository';

interface ProfileState {
  readonly profile: UserProfile | null;
  readonly isLoading: boolean;
  readonly isInitialized: boolean;
  readonly error: string | null;

  readonly loadProfile: () => Promise<UserProfile | null>;
  readonly createProfile: (input: CreateUserProfileInput) => Promise<UserProfile>;
  readonly updateProfile: (input: UpdateUserProfileInput) => Promise<UserProfile>;
  readonly updateName: (name: string) => Promise<UserProfile>;
  readonly updateAvatar: (avatarUri: string | null) => Promise<UserProfile>;
  readonly updateCurrency: (currencyCode: string) => Promise<UserProfile>;
  readonly updateMonthlyBudget: (monthlyBudget: number | null) => Promise<UserProfile>;
  readonly updateMonthStartDay: (monthStartDay: number) => Promise<UserProfile>;
  readonly updateBudgetCycle: (budgetCycle: BudgetCycle) => Promise<UserProfile>;
  readonly clearProfile: () => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  isLoading: false,
  isInitialized: false,
  error: null,

  loadProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const profile = await ProfileRepository.getProfile();
      set({ profile, isLoading: false, isInitialized: true });
      return profile;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to load profile';
      set({ isLoading: false, isInitialized: true, error });
      return null;
    }
  },

  createProfile: async (input) => {
    set({ isLoading: true, error: null });
    try {
      const profile = await ProfileRepository.createProfile(input);
      set({ profile, isLoading: false, error: null });
      return profile;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to create profile';
      set({ isLoading: false, error });
      throw err;
    }
  },

  updateProfile: async (input) => {
    set({ isLoading: true, error: null });
    try {
      const profile = await ProfileRepository.updateProfile(input);
      set({ profile, isLoading: false, error: null });
      return profile;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to update profile';
      set({ isLoading: false, error });
      throw err;
    }
  },

  updateName: async (name) => {
    return get().updateProfile({ name });
  },

  updateAvatar: async (avatarUri) => {
    return get().updateProfile({ avatarUri });
  },

  updateCurrency: async (currencyCode) => {
    return get().updateProfile({ currencyCode });
  },

  updateMonthlyBudget: async (monthlyBudget) => {
    return get().updateProfile({ monthlyBudget });
  },

  updateMonthStartDay: async (monthStartDay) => {
    return get().updateProfile({ monthStartDay });
  },

  updateBudgetCycle: async (budgetCycle) => {
    return get().updateProfile({ budgetCycle });
  },

  clearProfile: async () => {
    set({ isLoading: true });
    try {
      await ProfileRepository.deleteProfile();
    } catch {}
    set({ profile: null, isLoading: false, error: null });
  },
}));
