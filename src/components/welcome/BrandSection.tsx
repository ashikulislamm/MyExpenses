import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { createStyles } from '@/theme';

export function BrandSection() {
  return (
    <Animated.View entering={FadeIn.duration(400)} style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoOuter}>
          <View style={styles.logoInner} />
        </View>
        <View style={styles.logoAccent} />
      </View>
      <Text style={styles.appName}>MyExpenses</Text>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: t.spacing.md,
  },
  logoOuter: {
    width: 32,
    height: 32,
    borderRadius: t.radius.sm,
    borderWidth: 1.5,
    borderColor: t.colors.text.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInner: {
    width: 12,
    height: 12,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: t.colors.text.primary,
  },
  logoAccent: {
    position: 'absolute',
    bottom: 6,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.primary,
    borderWidth: 2,
    borderColor: t.colors.background,
  },
  appName: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 22,
    color: t.colors.text.primary,
    letterSpacing: -0.3,
  },
}));
