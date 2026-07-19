import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { createStyles } from '@/theme';

const SPENT = 1840;
const BUDGET = 2500;
const RATIO = SPENT / BUDGET;

function getBarColor(ratio: number): string {
  if (ratio > 0.9) return '#DC2626';
  if (ratio > 0.7) return '#F59E0B';
  return '#2563EB';
}

function ProgressBar({ ratio }: { ratio: number }) {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(ratio, {
      duration: 1000,
      easing: Easing.out(Easing.quad),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value * 100}%`,
  }));

  return (
    <View style={styles.track}>
      <Animated.View
        style={[styles.fill, { backgroundColor: getBarColor(ratio) }, animatedStyle]}
      />
    </View>
  );
}

export function BudgetCard() {
  return (
    <Animated.View
      entering={FadeInUp.duration(400).delay(700).springify().damping(18)}
      style={styles.card}
    >
      <View style={styles.topRow}>
        <Text style={styles.label}>Monthly Budget</Text>
        <Text style={styles.budgetLabel}>${SPENT.toLocaleString()} / ${BUDGET.toLocaleString()}</Text>
      </View>

      <ProgressBar ratio={RATIO} />

      <View style={styles.bottomRow}>
        <View style={styles.remaining}>
          <Text style={styles.remainingLabel}>Remaining</Text>
          <Text style={styles.remainingAmount}>
            ${(BUDGET - SPENT).toLocaleString()}
          </Text>
        </View>
        <View style={styles.percentage}>
          <Text style={styles.percentValue}>{Math.round(RATIO * 100)}%</Text>
          <Text style={styles.percentLabel}>used</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  card: {
    marginHorizontal: t.spacing.xxl,
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.card,
    borderWidth: 1,
    borderColor: t.colors.border,
    padding: t.spacing.xl,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: t.spacing.md,
  },
  label: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: t.colors.text.primary,
    letterSpacing: -0.1,
  },
  budgetLabel: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18,
    color: t.colors.text.tertiary,
    letterSpacing: 0,
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: t.colors.surface,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: t.spacing.md,
  },
  remaining: {},
  remainingLabel: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: t.colors.text.muted,
    letterSpacing: 0,
  },
  remainingAmount: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    color: t.colors.text.primary,
    letterSpacing: -0.3,
    marginTop: 2,
  },
  percentage: {
    alignItems: 'flex-end',
  },
  percentValue: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    color: getBarColor(RATIO),
    letterSpacing: -0.3,
  },
  percentLabel: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: t.colors.text.muted,
    letterSpacing: 0,
  },
}));
