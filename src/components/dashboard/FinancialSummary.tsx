import React from 'react';
import { View, Text } from 'react-native';
import { SymbolView } from 'expo-symbols';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { createStyles } from '@/theme';

interface SummaryItemData {
  readonly icon: string;
  readonly iconAndroid: string;
  readonly iconWeb: string;
  readonly label: string;
  readonly amount: string;
  readonly trend: string;
  readonly trendUp: boolean;
  readonly trendColor: string;
}

const items: SummaryItemData[] = [
  {
    icon: 'arrow.down.left',
    iconAndroid: 'arrow_downward',
    iconWeb: 'arrow_downward',
    label: 'Income',
    amount: '$5,230',
    trend: '+12.3%',
    trendUp: true,
    trendColor: '#16A34A',
  },
  {
    icon: 'arrow.up.right',
    iconAndroid: 'arrow_upward',
    iconWeb: 'arrow_upward',
    label: 'Expenses',
    amount: '$3,845',
    trend: '+8.1%',
    trendUp: false,
    trendColor: '#DC2626',
  },
  {
    icon: 'banknote',
    iconAndroid: 'savings',
    iconWeb: 'savings',
    label: 'Savings',
    amount: '$1,385',
    trend: '+4.2%',
    trendUp: true,
    trendColor: '#2563EB',
  },
];

export function FinancialSummary() {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <Animated.View
          key={item.label}
          entering={FadeInUp.duration(300).delay(400 + index * 80).springify().damping(18)}
          style={styles.card}
        >
          <View style={styles.iconWrap}>
            <SymbolView
              name={{ ios: item.icon as any, android: item.iconAndroid as any, web: item.iconWeb as any }}
              size={16}
              tintColor={item.trendColor}
              weight="medium"
            />
          </View>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.amount}>{item.amount}</Text>
          <View style={styles.trendRow}>
            <SymbolView
              name={item.trendUp ? { ios: 'arrow.up', android: 'arrow_upward', web: 'arrow_upward' } : { ios: 'arrow.down', android: 'arrow_downward', web: 'arrow_downward' }}
              size={10}
              tintColor={item.trendColor}
              weight="bold"
            />
            <Text style={[styles.trend, { color: item.trendColor }]}>{item.trend}</Text>
          </View>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = createStyles((t) => ({
  container: {
    flexDirection: 'row',
    paddingHorizontal: t.spacing.xxl,
    gap: t.spacing.sm,
  },
  card: {
    flex: 1,
    borderRadius: t.radius.md,
    backgroundColor: t.colors.card,
    borderWidth: 1,
    borderColor: t.colors.border,
    padding: t.spacing.md,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: t.radius.sm,
    backgroundColor: t.colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: t.spacing.sm,
  },
  label: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 14,
    color: t.colors.text.muted,
    letterSpacing: 0,
    marginBottom: t.spacing.xxs,
  },
  amount: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: t.colors.text.primary,
    letterSpacing: -0.3,
    marginBottom: t.spacing.xs,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  trend: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0,
  },
}));
