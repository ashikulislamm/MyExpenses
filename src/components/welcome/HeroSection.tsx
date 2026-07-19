import React from 'react';
import { Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { createStyles } from '@/theme';

export function HeroSection() {
  return (
    <Animated.View entering={FadeInDown.duration(400).delay(200)} style={styles.container}>
      <Text style={styles.headline}>
        Money,{'\n'}made simple.
      </Text>
      <Text style={styles.subtitle}>
        Private. Offline. Beautifully organized.
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
    fontSize: 34,
    lineHeight: 41,
    color: t.colors.text.primary,
    textAlign: 'center',
    letterSpacing: -0.8,
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
  },
}));
