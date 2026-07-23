/** StatisticsOverview component */
import React from 'react';
import { View, Text } from 'react-native';
import { StatisticCard } from './StatisticCard';
import { createStyles } from '@/theme';

export interface StatisticsOverviewProps {
  readonly totalTransactions?: number;
  readonly currentBalance?: string;
  readonly budgetUsedPercent?: number;
  readonly categoriesCount?: number;
}

export function StatisticsOverview({
  totalTransactions = 483,
  currentBalance = '৳ 85,400',
  budgetUsedPercent = 74,
  categoriesCount = 18,
}: StatisticsOverviewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Overview Statistics</Text>

      <View style={styles.grid}>
        <View style={styles.row}>
          <StatisticCard
            label="Transactions"
            value={totalTransactions}
            iconName={{ ios: 'creditcard', android: 'receipt', web: 'receipt' } as const}
            iconColor="#2563EB"
            delay={150}
          />
          <StatisticCard
            label="Current Balance"
            value={currentBalance}
            iconName={{ ios: 'wallet.pass', android: 'account_balance_wallet', web: 'account_balance_wallet' } as const}
            iconColor="#16A34A"
            delay={220}
          />
        </View>

        <View style={styles.row}>
          <StatisticCard
            label="Budget Used"
            value={`${budgetUsedPercent}%`}
            iconName={{ ios: 'chart.pie', android: 'pie_chart', web: 'pie_chart' } as const}
            iconColor="#F59E0B"
            delay={290}
          />
          <StatisticCard
            label="Categories"
            value={categoriesCount}
            iconName={{ ios: 'folder', android: 'category', web: 'category' } as const}
            iconColor="#0EA5E9"
            delay={360}
          />
        </View>
      </View>
    </View>
  );
}

const styles = createStyles((t) => ({
  container: {
    width: '100%',
    paddingHorizontal: t.spacing.md,
    marginBottom: t.spacing.md,
  },
  sectionTitle: {
    ...t.typography.subtitle,
    color: t.colors.text.primary,
    fontWeight: '700',
    marginBottom: t.spacing.xs,
    paddingHorizontal: t.spacing.xs,
  },
  grid: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));
