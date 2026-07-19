import React from 'react';
import { Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { createStyles } from '@/theme';

export interface FooterNoteProps {
  readonly delay?: number;
}

export function FooterNote({ delay = 0 }: FooterNoteProps) {
  return (
    <Animated.View
      entering={FadeInUp.duration(400).delay(delay).springify().damping(20)}
      style={styles.container}
    >
      <Text style={styles.text}>
        You can enable app protection later from Settings.
      </Text>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: t.spacing.sm,
  },
  text: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: t.colors.text.muted,
    textAlign: 'center',
    letterSpacing: 0.1,
  },
}));
