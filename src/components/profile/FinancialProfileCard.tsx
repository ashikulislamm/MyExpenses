/** FinancialProfileCard component */
import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ProfileInfoRow } from './ProfileInfoRow';
import { createStyles } from '@/theme';
import { useProfileStore } from '@/features/profile/store/profile.store';
import { getCurrency, formatCurrencyAmount } from '@/shared/constants/currencies';
import { formatOrdinalDay } from '@/shared/utils/date.utils';

export interface FinancialProfileCardProps {
  readonly onRowPress?: (rowKey: string) => void;
}

export function FinancialProfileCard({ onRowPress }: FinancialProfileCardProps) {
  const { profile } = useProfileStore();

  const currencyObj = getCurrency(profile?.currencyCode);
  const currencyDisplay = `${currencyObj.flag} ${currencyObj.name} (${currencyObj.symbol})`;
  const monthStartDisplay = `${formatOrdinalDay(profile?.monthStartDay ?? 1)} of month`;
  const budgetDisplay = formatCurrencyAmount(profile?.monthlyBudget, profile?.currencyCode);
  const cycleDisplay = profile?.budgetCycle
    ? profile.budgetCycle.charAt(0).toUpperCase() + profile.budgetCycle.slice(1)
    : 'Monthly';

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(200)} style={styles.container}>
      <Text style={styles.sectionTitle}>Financial Profile</Text>

      <View style={styles.card}>
        <ProfileInfoRow
          title="Preferred Currency"
          value={currencyDisplay}
          iconName={{ ios: 'banknote', android: 'attach_money', web: 'attach_money' } as const}
          onPress={() => onRowPress?.('currency')}
        />
        <ProfileInfoRow
          title="Month Starts On"
          value={monthStartDisplay}
          iconName={{ ios: 'calendar', android: 'calendar_today', web: 'calendar_today' } as const}
          onPress={() => onRowPress?.('monthStartsOn')}
        />
        <ProfileInfoRow
          title="Monthly Budget"
          value={budgetDisplay}
          iconName={{ ios: 'dollarsign.circle', android: 'account_balance', web: 'account_balance' } as const}
          onPress={() => onRowPress?.('monthlyBudget')}
        />
        <ProfileInfoRow
          title="Budget Cycle"
          value={cycleDisplay}
          iconName={{ ios: 'arrow.triangle.2.circlepath', android: 'update', web: 'update' } as const}
          isLast
          onPress={() => onRowPress?.('budgetCycle')}
        />
      </View>
    </Animated.View>
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
  card: {
    width: '100%',
    backgroundColor: t.colors.card,
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    overflow: 'hidden',
    ...t.shadows.xs,
  },
}));
