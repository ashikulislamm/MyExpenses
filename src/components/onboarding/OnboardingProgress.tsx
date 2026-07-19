import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { createStyles } from '@/theme';

export function OnboardingProgress() {
  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <View style={styles.track}>
        <View style={styles.fill} />
      </View>
      <Text style={styles.label}>Step 1 of 3</Text>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: t.spacing.xxl,
  },
  track: {
    width: '100%',
    height: 3,
    borderRadius: 1.5,
    backgroundColor: t.colors.surface,
    overflow: 'hidden',
    marginBottom: t.spacing.sm,
  },
  fill: {
    width: '33%',
    height: '100%',
    borderRadius: 1.5,
    backgroundColor: t.colors.primary,
  },
  label: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    color: t.colors.text.muted,
    letterSpacing: 0.5,
  },
}));
