import React from 'react';
import { Pressable, Text, Platform } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { createStyles } from '@/theme';

export interface SecondaryButtonProps {
  readonly title: string;
  readonly onPress: () => void;
  readonly delay?: number;
}

export function SecondaryButton({ title, onPress, delay = 0 }: SecondaryButtonProps) {
  return (
    <Animated.View
      entering={FadeInUp.duration(400).delay(delay).springify().damping(20)}
      style={styles.container}
    >
      <Pressable
        onPress={onPress}
        android_ripple={{ color: '#E2E8F0', borderless: true }}
        style={({ pressed }) => [
          styles.button,
          pressed && Platform.OS !== 'android' && styles.buttonPressed,
        ]}
        accessibilityLabel={title}
        accessibilityRole="button"
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: t.spacing.sm,
    paddingHorizontal: t.spacing.xxl,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: t.opacity.pressed,
  },
  text: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: t.colors.text.tertiary,
    letterSpacing: 0.1,
  },
}));
