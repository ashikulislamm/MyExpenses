import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SymbolView } from 'expo-symbols';
import { useProfileStore } from '@/features/profile/store/profile.store';
import { getCurrency } from '@/shared/constants/currencies';
import { BudgetCycle } from '@/features/profile/types/profile.types';
import { createStyles, colors } from '@/theme';

export function SavingsAndBudgetTargetCard() {
  const { profile, updateMonthlyBudget, updateBudgetCycle } = useProfileStore();

  const currencyObj = getCurrency(profile?.currencyCode);

  const handleBudgetChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const amount = numericValue ? Number(numericValue) : null;
    updateMonthlyBudget(amount);
  };

  const handleCycleChange = (cycle: BudgetCycle) => {
    updateBudgetCycle(cycle);
  };

  const budgetTextValue = profile?.monthlyBudget !== null && profile?.monthlyBudget !== undefined
    ? String(profile.monthlyBudget)
    : '';

  const activeCycle = profile?.budgetCycle ?? 'monthly';

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(150)} style={styles.container}>
      <Text style={styles.sectionTitle}>Saving & Budget Target</Text>

      <View style={styles.card}>
        {/* Budget Target Row */}
        <View style={styles.row}>
          <View style={styles.labelGroup}>
            <View style={[styles.iconBox, { backgroundColor: '#F0F9FF' }]}>
              <SymbolView
                name={{ ios: 'target', android: 'track_changes', web: 'track_changes' }}
                size={16}
                tintColor="#0284C7"
              />
            </View>
            <View>
              <Text style={styles.rowTitle}>Budget Target</Text>
              <Text style={styles.rowSubtitle}>Your spending limit limit</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.currencyPrefix}>{currencyObj.symbol}</Text>
            <TextInput
              style={styles.input}
              value={budgetTextValue}
              onChangeText={handleBudgetChange}
              keyboardType="number-pad"
              placeholder="0"
              placeholderTextColor={colors.text.muted}
              underlineColorAndroid="transparent"
              accessibilityLabel="Budget Target Input"
            />
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Budget Cycle Segmented Selector */}
        <View style={styles.cycleRow}>
          <View style={styles.labelGroup}>
            <View style={[styles.iconBox, { backgroundColor: '#FFFBEB' }]}>
              <SymbolView
                name={{ ios: 'arrow.triangle.2.circlepath', android: 'update', web: 'update' }}
                size={16}
                tintColor="#D97706"
              />
            </View>
            <View>
              <Text style={styles.rowTitle}>Budget Cycle</Text>
              <Text style={styles.rowSubtitle}>Set recurring frequency</Text>
            </View>
          </View>
        </View>

        {/* Cycle Options Horizontal Segmented Bar */}
        <View style={styles.cycleSelectorContainer}>
          {(['weekly', 'monthly', 'yearly'] as const).map((cycle) => {
            const isSelected = activeCycle === cycle;
            return (
              <Pressable
                key={cycle}
                onPress={() => handleCycleChange(cycle)}
                style={[
                  styles.cycleOption,
                  isSelected && styles.cycleOptionSelected,
                ]}
                accessibilityRole="radio"
                accessibilityState={{ checked: isSelected }}
              >
                <Text
                  style={[
                    styles.cycleOptionText,
                    isSelected && styles.cycleOptionTextSelected,
                  ]}
                >
                  {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                </Text>
              </Pressable>
            );
          })}
        </View>
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
    padding: t.spacing.md,
    ...t.shadows.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: t.spacing.xs,
  },
  labelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.sm,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: t.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: {
    ...t.typography.body,
    fontWeight: '600',
    color: t.colors.text.primary,
  },
  rowSubtitle: {
    ...t.typography.caption,
    color: t.colors.text.tertiary,
    marginTop: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: t.colors.border,
    borderRadius: t.radius.sm,
    backgroundColor: t.colors.surface,
    paddingHorizontal: t.spacing.sm,
    width: 120,
    height: 36,
  },
  currencyPrefix: {
    ...t.typography.body,
    fontWeight: '600',
    color: t.colors.text.secondary,
    marginRight: 4,
  },
  input: {
    ...t.typography.body,
    fontWeight: '600',
    color: t.colors.text.primary,
    flex: 1,
    paddingVertical: 0,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: t.colors.divider,
    marginVertical: t.spacing.md,
  },
  cycleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: t.spacing.sm,
  },
  cycleSelectorContainer: {
    flexDirection: 'row',
    backgroundColor: t.colors.surface,
    borderRadius: t.radius.md,
    padding: 3,
    borderWidth: 1,
    borderColor: t.colors.border,
  },
  cycleOption: {
    flex: 1,
    paddingVertical: t.spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: t.radius.sm,
  },
  cycleOptionSelected: {
    backgroundColor: t.colors.card,
    ...t.shadows.xs,
  },
  cycleOptionText: {
    ...t.typography.caption,
    fontWeight: '600',
    color: t.colors.text.secondary,
  },
  cycleOptionTextSelected: {
    color: t.colors.primary,
  },
}));
