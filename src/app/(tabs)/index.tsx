import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { createStyles } from '@/theme';

import { BrandSection } from '@/components/welcome/BrandSection';
import { HeroIllustration } from '@/components/welcome/HeroIllustration';
import { HeroSection } from '@/components/welcome/HeroSection';
import { PrimaryButton } from '@/components/welcome/PrimaryButton';

export default function WelcomeScreen() {
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/onboarding/security');
    }, 600);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <BrandSection />

          <View style={styles.illustrationSpacer}>
            <HeroIllustration />
          </View>

          <HeroSection />

          <View style={styles.buttonSpacer}>
            <PrimaryButton
              title="Continue"
              onPress={handleContinue}
              isLoading={loading}
              delay={600}
            />
          </View>
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
  illustrationSpacer: {
    marginTop: t.spacing.xxxl,
    marginBottom: t.spacing.xl,
  },
  buttonSpacer: {
    marginTop: t.spacing.xxxl,
    width: '100%',
  },
}));
