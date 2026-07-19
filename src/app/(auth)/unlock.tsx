import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { createStyles } from '@/theme';
import { useBiometric } from '@/hooks/useBiometric';
import { AuthenticationStatus } from '@/types/security.types';
import { useSecurityStore } from '@/stores/security.store';
import { BrandSection } from '@/components/welcome/BrandSection';
import { SecurityIllustration } from '@/components/onboarding/SecurityIllustration';
import { UnlockButton } from '@/components/security/UnlockButton';

export default function UnlockScreen() {
  const { isLoading, authenticate } = useBiometric();
  const setSessionAuthenticated = useSecurityStore((s) => s.setSessionAuthenticated);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUnlock = async () => {
    setErrorMessage(null);
    const result = await authenticate();

    if (result.status === AuthenticationStatus.Success) {
      setSessionAuthenticated(true);
      router.replace('/(tabs)');
      return;
    }

    switch (result.status) {
      case AuthenticationStatus.Failed:
        setErrorMessage('Authentication failed. Please try again.');
        break;
      case AuthenticationStatus.Cancelled:
        setErrorMessage(null);
        break;
      case AuthenticationStatus.Lockout:
        setErrorMessage('Too many attempts. Please try again later.');
        break;
      case AuthenticationStatus.NotEnrolled:
        setErrorMessage('No biometrics enrolled on this device.');
        break;
      case AuthenticationStatus.NoHardware:
        setErrorMessage('This device does not support biometric authentication.');
        break;
      case AuthenticationStatus.Unavailable:
        setErrorMessage('Biometric authentication is currently unavailable.');
        break;
      default:
        setErrorMessage('An unexpected error occurred.');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <View style={styles.brandSection}>
            <BrandSection />
          </View>

          <View style={styles.illustrationSection}>
            <SecurityIllustration />
          </View>

          <Text style={styles.heading}>Welcome Back</Text>
          <Text style={styles.subtitle}>Unlock to continue</Text>

          {errorMessage && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          <View style={styles.buttonSection}>
            <UnlockButton
              onPress={handleUnlock}
              isLoading={isLoading}
            />
          </View>

          <Text style={styles.footer}>Protected with biometrics</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = createStyles((t) => ({
  container: {
    flex: 1,
    backgroundColor: t.colors.background,
  },
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: t.layout.maxContentWidth,
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: t.spacing.lg,
  },
  brandSection: {
    marginBottom: t.spacing.lg,
  },
  illustrationSection: {
    marginBottom: t.spacing.xxl,
    transform: [{ scale: 0.85 }],
  },
  heading: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 34,
    color: t.colors.text.primary,
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: t.spacing.xs,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 22,
    color: t.colors.text.tertiary,
    textAlign: 'center',
    letterSpacing: -0.1,
  },
  errorBox: {
    marginTop: t.spacing.xxl,
    paddingHorizontal: t.spacing.xl,
    paddingVertical: t.spacing.md,
    borderRadius: t.radius.md,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    width: '100%',
  },
  errorText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18,
    color: '#DC2626',
    textAlign: 'center',
    letterSpacing: 0,
  },
  buttonSection: {
    marginTop: t.spacing.xxxl,
    width: '100%',
    paddingHorizontal: t.spacing.md,
  },
  footer: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: t.colors.text.muted,
    textAlign: 'center',
    letterSpacing: 0.3,
    marginTop: t.spacing.xl,
    paddingBottom: t.spacing.sm,
  },
}));
