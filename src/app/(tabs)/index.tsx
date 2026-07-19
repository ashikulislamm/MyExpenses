import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyles } from '@/theme';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { FinancialSummary } from '@/components/dashboard/FinancialSummary';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { BudgetCard } from '@/components/dashboard/BudgetCard';
import { InsightCard } from '@/components/dashboard/InsightCard';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <DashboardHeader />

          <View style={styles.sectionBalance}>
            <BalanceCard />
          </View>

          <View style={styles.section}>
            <QuickActions />
          </View>

          <View style={styles.section}>
            <FinancialSummary />
          </View>

          <View style={styles.section}>
            <RecentTransactions />
          </View>

          <View style={styles.section}>
            <BudgetCard />
          </View>

          <View style={styles.sectionLast}>
            <InsightCard />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = createStyles((t) => ({
  container: {
    flex: 1,
    backgroundColor: t.colors.background,
  },
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: t.layout.maxContentWidth,
    alignSelf: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: t.spacing.xxxxl,
  },
  sectionBalance: {
    marginTop: t.spacing.lg,
    marginBottom: t.spacing.xxl,
  },
  section: {
    marginBottom: t.spacing.xxl,
  },
  sectionLast: {
    marginBottom: t.spacing.xxxl,
  },
}));
