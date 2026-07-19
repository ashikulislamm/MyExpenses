import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useAppStore } from '@/stores/app.store';
import { useOnboardingStore } from '@/stores/onboarding.store';
import { useSecurityStore } from '@/stores/security.store';
import { StorageService } from '@/services/storage/storage.service';

export function useInit() {
  const setStatus = useAppStore((s) => s.setStatus);

  useEffect(() => {
    async function initialize() {
      try {
        const [onboardingCompleted, biometricEnabled, currency, budget] =
          await Promise.all([
            StorageService.getOnboardingCompleted(),
            StorageService.getBiometricEnabled(),
            StorageService.getSelectedCurrency(),
            StorageService.getMonthlyBudget(),
          ]);

        useOnboardingStore.getState().setCurrentStep(onboardingCompleted ? 99 : 0);
        useOnboardingStore.getState().setSelectedCurrency(currency ?? 'USD');
        useOnboardingStore.getState().setMonthlyBudget(budget);

        if (!onboardingCompleted) {
          setStatus('onboarding');
        } else if (biometricEnabled) {
          useSecurityStore.getState().setBiometricEnabled(true);
          setStatus('authenticating');
        } else {
          setStatus('ready');
        }
      } catch {
        setStatus('onboarding');
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    initialize();
  }, []);
}
