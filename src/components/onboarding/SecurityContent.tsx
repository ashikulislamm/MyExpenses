import React from 'react';
import { Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { createStyles } from '@/theme';

export function SecurityContent() {
  return (
    <Animated.View entering={FadeInDown.duration(400).delay(250)} style={styles.container}>
      <Text style={styles.headline}>Protect{'\n'}Your Data</Text>
      <Text style={styles.subtitle}>
        Secure your financial data using your device&apos;s built-in authentication.
      </Text>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: t.spacing.xxl,
  },
  headline: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 39,
    color: t.colors.text.primary,
    textAlign: 'center',
    letterSpacing: -0.7,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 22,
    color: t.colors.text.tertiary,
    textAlign: 'center',
    marginTop: t.spacing.sm,
    letterSpacing: -0.1,
    maxWidth: 300,
  },
}));
