import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { PreferenceRow } from './PreferenceRow';
import { useProfileStore } from '@/features/profile/store/profile.store';
import { getCurrency, formatCurrencyAmount } from '@/shared/constants/currencies';
import { formatOrdinalDay } from '@/shared/utils/date.utils';
import { createStyles } from '@/theme';

export interface FinancialPreferencesProps {
  readonly onRowPress?: (rowKey: string) => void;
}

export function FinancialPreferences({ onRowPress }: FinancialPreferencesProps) {
  const { profile } = useProfileStore();

  const currencyObj = getCurrency(profile?.currencyCode);
  const currencyDisplay = `${currencyObj.code} · ${currencyObj.symbol}`;
  const monthStartDisplay = `${formatOrdinalDay(profile?.monthStartDay ?? 1)}`;
  const budgetDisplay = formatCurrencyAmount(profile?.monthlyBudget, profile?.currencyCode);
  const cycleDisplay = profile?.budgetCycle
    ? profile.budgetCycle.charAt(0).toUpperCase() + profile.budgetCycle.slice(1)
    : 'Monthly';

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(200)} style={styles.container}>
      <Text style={styles.sectionTitle}>Financial Preferences</Text>

      <View style={styles.groupedList}>
        <PreferenceRow
          title="Preferred Currency"
          value={currencyDisplay}
          iconName={{ ios: 'banknote', android: 'attach_money', web: 'attach_money' }}
          bgColor="#EFF6FF"
          iconColor="#2563EB"
          onPress={() => onRowPress?.('currency')}
        />
        <PreferenceRow
          title="Month starts"
          value={monthStartDisplay}
          iconName={{ ios: 'calendar', android: 'calendar_today', web: 'calendar_today' }}
          bgColor="#F5F3FF"
          iconColor="#7C3AED"
          onPress={() => onRowPress?.('monthStartsOn')}
        />
        <PreferenceRow
          title="Monthly Budget"
          value={budgetDisplay}
          iconName={{ ios: 'target', android: 'track_changes', web: 'track_changes' }}
          bgColor="#ECFDF5"
          iconColor="#059669"
          onPress={() => onRowPress?.('monthlyBudget')}
        />
        <PreferenceRow
          title="Budget cycle"
          value={cycleDisplay}
          iconName={{ ios: 'arrow.triangle.2.circlepath', android: 'update', web: 'update' }}
          bgColor="#FFFBEB"
          iconColor="#D97706"
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
    marginBottom: t.spacing.lg,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: t.colors.text.primary,
    marginBottom: t.spacing.xs,
    paddingHorizontal: t.spacing.xs,
  },
  groupedList: {
    width: '100%',
    backgroundColor: t.colors.card,
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    overflow: 'hidden',
    ...t.shadows.xs,
  },
}));
