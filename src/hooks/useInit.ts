import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useAppStore } from '@/stores/app.store';
import { useSecurityStore } from '@/stores/security.store';
import { StorageService } from '@/services/storage/storage.service';
import { initDatabase } from '@/database/migrations';
import { useProfileStore } from '@/features/profile/store/profile.store';

export function useInit() {
  const setStatus = useAppStore((s) => s.setStatus);

  useEffect(() => {
    async function initialize() {
      try {
        // 1. Idempotent SQLite Database Initialization
        initDatabase();

        // 2. Query persistence status
        const [onboardingCompleted, biometricEnabled] = await Promise.all([
          StorageService.getOnboardingCompleted(),
          StorageService.getBiometricEnabled(),
        ]);

        // 3. Load single source of truth User Profile if onboarding complete
        if (onboardingCompleted) {
          await useProfileStore.getState().loadProfile();
        }

        // 4. Set Application Execution Status
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
  }, [setStatus]);
}
