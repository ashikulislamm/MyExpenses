import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const KEYS = {
  ONBOARDING_COMPLETED: '@myexpenses/onboarding_completed',
  SELECTED_CURRENCY: '@myexpenses/selected_currency',
  MONTHLY_BUDGET: '@myexpenses/monthly_budget',
  BIOMETRIC_ENABLED: 'biometric_enabled',
  BUDGET_CYCLE: '@myexpenses/budget_cycle',
} as const;

async function secureGet(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    return AsyncStorage.getItem(key);
  }
  try {
    return await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
}

async function secureSet(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    await AsyncStorage.setItem(key, value);
    return;
  }
  try {
    await SecureStore.setItemAsync(key, value);
  } catch {}
}

async function secureDelete(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    await AsyncStorage.removeItem(key);
    return;
  }
  try {
    await SecureStore.deleteItemAsync(key);
  } catch {}
}

export const StorageService = {
  async getOnboardingCompleted(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(KEYS.ONBOARDING_COMPLETED);
      return value === 'true';
    } catch {
      return false;
    }
  },

  async setOnboardingCompleted(value: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.ONBOARDING_COMPLETED, String(value));
    } catch {}
  },

  async getSelectedCurrency(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(KEYS.SELECTED_CURRENCY);
    } catch {
      return null;
    }
  },

  async setSelectedCurrency(currency: string): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.SELECTED_CURRENCY, currency);
    } catch {}
  },

  async getMonthlyBudget(): Promise<number | null> {
    try {
      const value = await AsyncStorage.getItem(KEYS.MONTHLY_BUDGET);
      return value ? Number(value) : null;
    } catch {
      return null;
    }
  },

  async setMonthlyBudget(amount: number): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.MONTHLY_BUDGET, String(amount));
    } catch {}
  },

  async getBiometricEnabled(): Promise<boolean> {
    const value = await secureGet(KEYS.BIOMETRIC_ENABLED);
    return value === 'true';
  },

  async setBiometricEnabled(value: boolean): Promise<void> {
    await secureSet(KEYS.BIOMETRIC_ENABLED, String(value));
  },

  async getBudgetCycle(): Promise<string> {
    try {
      const value = await AsyncStorage.getItem(KEYS.BUDGET_CYCLE);
      return value ?? 'monthly';
    } catch {
      return 'monthly';
    }
  },

  async setBudgetCycle(cycle: string): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.BUDGET_CYCLE, cycle);
    } catch {}
  },

  async clearAll(): Promise<void> {
    try {
      const keys = Object.values(KEYS);
      await AsyncStorage.multiRemove(keys);
      for (const key of keys) {
        await secureDelete(key);
      }
    } catch {}
  },
};
