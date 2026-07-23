/** ProfileFooter component */
import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { createStyles } from '@/theme';

export function ProfileFooter() {
  return (
    <Animated.View entering={FadeInDown.duration(400).delay(300)} style={styles.container}>
      <Text style={styles.versionText}>MyExpenses · v1.0.0</Text>
      <Text style={styles.privacyText}>Privacy First · Offline</Text>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: t.spacing.md,
    marginTop: t.spacing.xs,
  },
  versionText: {
    ...t.typography.caption,
    fontSize: 12,
    fontWeight: '600',
    color: t.colors.text.tertiary,
  },
  privacyText: {
    ...t.typography.caption,
    fontSize: 11,
    color: t.colors.text.muted,
    marginTop: 2,
  },
}));
