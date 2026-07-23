import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useProfileStore } from '@/features/profile/store/profile.store';
import { formatCurrencyAmount } from '@/shared/constants/currencies';
import { createStyles, colors } from '@/theme';

export function FinancialSnapshot() {
  const { profile } = useProfileStore();

  const monthlyBudget = profile?.monthlyBudget ?? 50000;
  // Demo current spending figure calculated proportionally
  const currentSpending = Math.round(monthlyBudget * 0.74);
  const percentage = monthlyBudget > 0 ? Math.min(Math.round((currentSpending / monthlyBudget) * 100), 100) : 0;

  // Semantic color for progress indicator
  let progressColor: string = colors.primary; // Healthy
  if (percentage > 80 && percentage <= 100) {
    progressColor = '#D97706'; // Warning Amber
  } else if (percentage > 100) {
    progressColor = '#EF4444'; // Exceeded Red
  }

  const formattedSpending = formatCurrencyAmount(currentSpending, profile?.currencyCode);
  const formattedBudget = formatCurrencyAmount(monthlyBudget, profile?.currencyCode);

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(100)} style={styles.container}>
      <View style={styles.snapshotCard}>
        {/* Header Tag */}
        <Text style={styles.sectionTag}>THIS MONTH</Text>

        {/* Visually Dominant Main Number */}
        <Text style={styles.mainNumber}>{formattedSpending}</Text>
        <Text style={styles.mainLabel}>Current Spending</Text>

        {/* Subtle Divider */}
        <View style={styles.divider} />

        {/* Metrics Row */}
        <View style={styles.metricsRow}>
          <View>
            <Text style={styles.metricValue}>{formattedBudget}</Text>
            <Text style={styles.metricLabel}>Monthly Budget</Text>
          </View>
          <View style={styles.rightMetric}>
            <Text style={styles.metricValue}>{percentage}%</Text>
            <Text style={styles.metricLabel}>Used</Text>
          </View>
        </View>

        {/* Semantic Progress Bar */}
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressBar,
              { width: `${percentage}%`, backgroundColor: progressColor },
            ]}
          />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  container: {
    width: '100%',
    paddingHorizontal: t.spacing.md,
    marginBottom: t.spacing.lg,
  },
  snapshotCard: {
    width: '100%',
    backgroundColor: t.colors.card,
    borderRadius: t.radius.xl,
    borderWidth: 1,
    borderColor: t.colors.border,
    padding: t.spacing.lg,
    ...t.shadows.xs,
  },
  sectionTag: {
    ...t.typography.overline,
    color: t.colors.text.tertiary,
    letterSpacing: 1.2,
    marginBottom: t.spacing.xs,
  },
  mainNumber: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 38,
    color: t.colors.text.primary,
    letterSpacing: -0.8,
  },
  mainLabel: {
    ...t.typography.caption,
    color: t.colors.text.tertiary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: t.colors.divider,
    marginVertical: t.spacing.md,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: t.spacing.md,
  },
  metricValue: {
    ...t.typography.body,
    fontWeight: '700',
    color: t.colors.text.primary,
  },
  metricLabel: {
    ...t.typography.caption,
    fontSize: 12,
    color: t.colors.text.tertiary,
    marginTop: 1,
  },
  rightMetric: {
    alignItems: 'flex-end',
  },
  progressTrack: {
    height: 6,
    width: '100%',
    backgroundColor: t.colors.surface,
    borderRadius: t.radius.full,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: t.radius.full,
  },
}));
