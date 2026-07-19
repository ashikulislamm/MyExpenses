import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { SymbolView } from 'expo-symbols';
import { createStyles } from '@/theme';

function AnimatedNumber({ value, style }: { value: number; style?: object }) {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withTiming(value, {
      duration: 800,
      easing: Easing.out(Easing.quad),
    });
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animatedValue.value > 0 ? withTiming(1) : 0,
  }));

  const formatted = `$${value.toLocaleString()}`;

  return (
    <Animated.Text style={[style, animatedStyle]}>
      {formatted}
    </Animated.Text>
  );
}

export function BalanceCard() {
  return (
    <Animated.View entering={FadeIn.duration(500).delay(100)} style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.label}>Current Balance</Text>
        <View style={styles.changeBadge}>
          <SymbolView
            name={{ ios: 'arrow.up', android: 'arrow_upward', web: 'arrow_upward' }}
            size={10}
            tintColor="#16A34A"
            weight="bold"
          />
          <Text style={styles.changeText}>+5.2%</Text>
        </View>
      </View>

      <Text style={styles.balance}>$12,458.50</Text>

      <View style={styles.divider} />

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <View style={styles.statHeader}>
            <View style={[styles.dot, { backgroundColor: '#16A34A' }]} />
            <Text style={styles.statLabel}>Income</Text>
          </View>
          <Text style={styles.statValue}>$5,230</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.stat}>
          <View style={styles.statHeader}>
            <View style={[styles.dot, { backgroundColor: '#DC2626' }]} />
            <Text style={styles.statLabel}>Expenses</Text>
          </View>
          <Text style={styles.statValue}>$3,845</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.stat}>
          <View style={styles.statHeader}>
            <View style={[styles.dot, { backgroundColor: '#2563EB' }]} />
            <Text style={styles.statLabel}>Savings</Text>
          </View>
          <Text style={styles.statValue}>$1,385</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  card: {
    marginHorizontal: t.spacing.xxl,
    borderRadius: t.radius.xl,
    backgroundColor: t.colors.card,
    borderWidth: 1,
    borderColor: t.colors.border,
    padding: t.spacing.xxl,
    ...t.shadows.sm,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18,
    color: t.colors.text.tertiary,
    letterSpacing: 0,
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: t.spacing.sm,
    paddingVertical: t.spacing.xxs,
    borderRadius: t.radius.full,
    gap: 3,
  },
  changeText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    color: '#16A34A',
    letterSpacing: 0,
  },
  balance: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 36,
    lineHeight: 44,
    color: t.colors.text.primary,
    letterSpacing: -1,
    marginTop: t.spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: t.colors.divider,
    marginVertical: t.spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stat: {
    flex: 1,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: t.spacing.xs,
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statLabel: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 14,
    color: t.colors.text.muted,
    letterSpacing: 0,
  },
  statValue: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 20,
    color: t.colors.text.primary,
    letterSpacing: -0.2,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: t.colors.divider,
    marginHorizontal: t.spacing.md,
    alignSelf: 'center',
  },
}));
