import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { SymbolView } from 'expo-symbols';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { createStyles } from '@/theme';

interface Transaction {
  readonly icon: string;
  readonly iconAndroid: string;
  readonly iconWeb: string;
  readonly title: string;
  readonly category: string;
  readonly date: string;
  readonly amount: string;
  readonly isExpense: boolean;
}

const transactions: Transaction[] = [
  { icon: 'cart', iconAndroid: 'shopping_cart', iconWeb: 'shopping_cart', title: 'Grocery Store', category: 'Food & Drinks', date: 'Today', amount: '-$84.50', isExpense: true },
  { icon: 'bolt', iconAndroid: 'bolt', iconWeb: 'bolt', title: 'Electric Bill', category: 'Utilities', date: 'Yesterday', amount: '-$145.00', isExpense: true },
  { icon: 'briefcase', iconAndroid: 'work', iconWeb: 'work', title: 'Salary Deposit', category: 'Income', date: 'Jul 17', amount: '+$3,200.00', isExpense: false },
  { icon: 'cup.and.saucer', iconAndroid: 'local_cafe', iconWeb: 'local_cafe', title: 'Coffee Shop', category: 'Food & Drinks', date: 'Jul 17', amount: '-$5.75', isExpense: true },
  { icon: 'car', iconAndroid: 'directions_car', iconWeb: 'directions_car', title: 'Gas Station', category: 'Transport', date: 'Jul 16', amount: '-$48.30', isExpense: true },
];

export function RecentTransactions() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        <Pressable
          onPress={() => {}}
          android_ripple={{ color: '#E2E8F0', borderless: true }}
          style={({ pressed }) => [
            styles.seeAllButton,
            pressed && Platform.OS !== 'android' && { opacity: 0.6 },
          ]}
        >
          <Text style={styles.seeAll}>See All</Text>
        </Pressable>
      </View>

      <View style={styles.list}>
        {transactions.map((tx, index) => (
          <Animated.View
            key={tx.title}
            entering={FadeInUp.duration(300).delay(500 + index * 80).springify().damping(20)}
          >
            <Pressable
              onPress={() => {}}
              android_ripple={{ color: '#E2E8F0', borderless: false }}
              style={({ pressed }) => [
                styles.row,
                pressed && Platform.OS !== 'android' && { opacity: 0.6 },
              ]}
            >
              <View style={styles.rowIcon}>
                <SymbolView
                  name={{ ios: tx.icon as any, android: tx.iconAndroid as any, web: tx.iconWeb as any }}
                  size={18}
                  tintColor="#475569"
                  weight="medium"
                />
              </View>
              <View style={styles.rowCenter}>
                <Text style={styles.rowTitle}>{tx.title}</Text>
                <Text style={styles.rowMeta}>
                  {tx.category} · {tx.date}
                </Text>
              </View>
              <Text
                style={[
                  styles.rowAmount,
                  { color: tx.isExpense ? '#DC2626' : '#16A34A' },
                ]}
              >
                {tx.amount}
              </Text>
            </Pressable>
            {index < transactions.length - 1 && <View style={styles.rowDivider} />}
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const styles = createStyles((t) => ({
  container: {
    paddingHorizontal: t.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: t.spacing.md,
  },
  title: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: t.colors.text.primary,
    letterSpacing: -0.2,
  },
  seeAllButton: {
    paddingVertical: t.spacing.xs,
    paddingHorizontal: t.spacing.sm,
  },
  seeAll: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18,
    color: t.colors.primary,
    letterSpacing: 0,
  },
  list: {
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.card,
    borderWidth: 1,
    borderColor: t.colors.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: t.spacing.md,
    paddingHorizontal: t.spacing.lg,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: t.radius.sm,
    backgroundColor: t.colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: t.spacing.md,
  },
  rowCenter: {
    flex: 1,
  },
  rowTitle: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: t.colors.text.primary,
    letterSpacing: -0.1,
  },
  rowMeta: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: t.colors.text.muted,
    letterSpacing: 0,
    marginTop: 2,
  },
  rowAmount: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.1,
  },
  rowDivider: {
    height: 1,
    backgroundColor: t.colors.divider,
    marginLeft: 72,
  },
}));
