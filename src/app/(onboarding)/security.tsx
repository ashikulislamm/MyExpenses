import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { createStyles } from '@/theme';
import { useBiometric } from '@/hooks/useBiometric';
import { AuthenticationStatus } from '@/types/security.types';
import { useSecurityStore } from '@/stores/security.store';
import { StorageService } from '@/services/storage/storage.service';

import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';
import { SecurityIllustration } from '@/components/onboarding/SecurityIllustration';
import { SecurityContent } from '@/components/onboarding/SecurityContent';
import { SecurityBenefitsCard } from '@/components/onboarding/SecurityBenefitsCard';
import { PrimaryButton } from '@/components/onboarding/PrimaryButton';
import { SecondaryButton } from '@/components/onboarding/SecondaryButton';
import { FooterNote } from '@/components/onboarding/FooterNote';

export default function SecurityScreen() {
  const { isLoading, authenticate } = useBiometric();
  const { setBiometricEnabled } = useSecurityStore();

  const handleEnable = async () => {
    const result = await authenticate();
    if (result.status === AuthenticationStatus.Success) {
      await StorageService.setBiometricEnabled(true);
      setBiometricEnabled(true);
      setTimeout(() => {
        router.replace('/(onboarding)/personal-setup');
      }, 300);
    }
  };

  const handleSkip = () => {
    router.replace('/(onboarding)/personal-setup');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <View style={styles.progressSection}><OnboardingProgress /></View>
          <View style={styles.illustrationSection}><SecurityIllustration /></View>
          <SecurityContent />
          <View style={styles.benefitsSection}><SecurityBenefitsCard /></View>
          <View style={styles.buttonSection}>
            <PrimaryButton title="Enable Protection" onPress={handleEnable} isLoading={isLoading} delay={500} />
            <SecondaryButton title="Skip for Now" onPress={handleSkip} delay={600} />
          </View>
          <FooterNote delay={700} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = createStyles((t) => ({
  container: { flex: 1, backgroundColor: t.colors.background },
  safeArea: { flex: 1, width: '100%', maxWidth: t.layout.maxContentWidth, alignSelf: 'center' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: t.spacing.lg },
  progressSection: { position: 'absolute', top: 0, left: 0, right: 0, paddingTop: t.spacing.lg },
  illustrationSection: { marginBottom: t.spacing.xxl },
  benefitsSection: { width: '100%', marginTop: t.spacing.xxl },
  buttonSection: { marginTop: t.spacing.xxl, width: '100%', alignItems: 'center', gap: t.spacing.sm },
}));
