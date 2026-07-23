/** ProfileScreen component */
import React, { useState } from 'react';
import { View, ScrollView, Alert, Modal, Text, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';
import { createStyles, colors } from '@/theme';
import { useProfileStore } from '@/features/profile/store/profile.store';
import { CURRENCY_REGISTRY, Currency, getCurrency } from '@/shared/constants/currencies';
import { BudgetCycle } from '@/features/profile/types/profile.types';

import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { FinancialSnapshot } from '@/components/profile/FinancialSnapshot';
import { FinancialPreferences } from '@/components/profile/FinancialPreferences';
import { SecurityAndPrivacyCard } from '@/components/profile/SecurityAndPrivacyCard';
import { DataActions } from '@/components/profile/DataActions';
import { AccountManagementCard } from '@/components/profile/AccountManagementCard';
import { ProfileFooter } from '@/components/profile/ProfileFooter';

export default function ProfileScreen() {
  const { profile, updateName, updateCurrency, updateMonthlyBudget, updateMonthStartDay, updateBudgetCycle } = useProfileStore();

  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [editingName, setEditingName] = useState('');

  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);

  const [dayModalVisible, setDayModalVisible] = useState(false);
  const [editingDay, setEditingDay] = useState('1');

  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [editingBudget, setEditingBudget] = useState('');

  const [cycleModalVisible, setCycleModalVisible] = useState(false);

  const currencyObj = getCurrency(profile?.currencyCode);

  // Handle Edit Name
  const handleOpenEditName = () => {
    setEditingName(profile?.name ?? '');
    setNameModalVisible(true);
  };

  const handleSaveName = async () => {
    if (!editingName.trim()) {
      Alert.alert('Validation Error', 'Name cannot be empty.');
      return;
    }
    try {
      await updateName(editingName.trim());
      setNameModalVisible(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update name';
      Alert.alert('Error', msg);
    }
  };

  // Handle Preference Row Tap
  const handlePreferenceRowPress = (rowKey: string) => {
    if (rowKey === 'currency') {
      setCurrencyModalVisible(true);
    } else if (rowKey === 'monthStartsOn') {
      setEditingDay(String(profile?.monthStartDay ?? 1));
      setDayModalVisible(true);
    } else if (rowKey === 'monthlyBudget') {
      setEditingBudget(profile?.monthlyBudget ? String(profile.monthlyBudget) : '');
      setBudgetModalVisible(true);
    } else if (rowKey === 'budgetCycle') {
      setCycleModalVisible(true);
    }
  };

  // Handle Currency Selection with Warning Confirmation
  const handleSelectCurrency = (newCurrency: Currency) => {
    if (newCurrency.code === profile?.currencyCode) {
      setCurrencyModalVisible(false);
      return;
    }

    setCurrencyModalVisible(false);

    Alert.alert(
      'Change Currency?',
      'Your existing transactions will not be automatically converted. Your new currency will be used for future entries and app-level financial summaries.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Change Currency',
          style: 'default',
          onPress: async () => {
            try {
              await updateCurrency(newCurrency.code);
            } catch (err) {
              const msg = err instanceof Error ? err.message : 'Failed to update currency';
              Alert.alert('Error', msg);
            }
          },
        },
      ]
    );
  };

  // Handle Save Month Start Day
  const handleSaveMonthStartDay = async () => {
    const day = Number(editingDay);
    if (isNaN(day) || day < 1 || day > 31) {
      Alert.alert('Invalid Day', 'Please enter a day between 1 and 31.');
      return;
    }
    try {
      await updateMonthStartDay(day);
      setDayModalVisible(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update month start day';
      Alert.alert('Error', msg);
    }
  };

  // Handle Save Monthly Budget Target
  const handleSaveMonthlyBudget = async () => {
    const numericValue = editingBudget.replace(/[^0-9]/g, '');
    const amount = numericValue ? Number(numericValue) : null;
    try {
      await updateMonthlyBudget(amount);
      setBudgetModalVisible(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update monthly budget';
      Alert.alert('Error', msg);
    }
  };

  // Handle Save Budget Cycle
  const handleSelectBudgetCycle = async (cycle: BudgetCycle) => {
    try {
      await updateBudgetCycle(cycle);
      setCycleModalVisible(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update budget cycle';
      Alert.alert('Error', msg);
    }
  };

  const handleExportData = () => {
    Alert.alert('Export Data', 'Exporting local financial records to JSON file...');
  };

  const handleImportBackup = () => {
    Alert.alert('Import Backup', 'Select a JSON backup file to restore records...');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          <View style={styles.content}>
            {/* 1. Identity Hero Section */}
            <ProfileHeader onEditName={handleOpenEditName} />

            {/* 2. Financial Snapshot Summary */}
            <FinancialSnapshot />

            {/* 3. Grouped Financial Preferences */}
            <FinancialPreferences onRowPress={handlePreferenceRowPress} />

            {/* 4. App Security & Privacy Toggle */}
            <SecurityAndPrivacyCard />

            {/* 5. Grouped Personal Data Actions */}
            <DataActions onExport={handleExportData} onImport={handleImportBackup} />

            {/* 6. Account Management (Data Reset) */}
            <AccountManagementCard />

            {/* 7. Minimal Footer */}
            <ProfileFooter />
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Edit Name Modal */}
      <Modal
        visible={nameModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setNameModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dialogContent}>
            <Text style={styles.modalTitle}>Edit Profile Name</Text>
            <View style={styles.inputCard}>
              <TextInput
                style={styles.textInput}
                value={editingName}
                onChangeText={setEditingName}
                placeholder="Enter full name"
                placeholderTextColor={colors.text.muted}
                autoFocus
              />
            </View>
            <View style={styles.dialogActions}>
              <Pressable
                onPress={() => setNameModalVisible(false)}
                style={({ pressed }) => [styles.cancelBtn, pressed && styles.pressed]}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleSaveName}
                style={({ pressed }) => [styles.saveBtn, pressed && styles.pressed]}
              >
                <Text style={styles.saveBtnText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Currency Selector Modal */}
      <Modal
        visible={currencyModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCurrencyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.sheetContent}>
            <View style={styles.sheetHeader}>
              <Text style={styles.modalTitle}>Select Preferred Currency</Text>
              <Pressable onPress={() => setCurrencyModalVisible(false)}>
                <SymbolView
                  name={{ ios: 'xmark.circle.fill', android: 'cancel', web: 'cancel' }}
                  size={24}
                  tintColor={colors.text.tertiary}
                />
              </Pressable>
            </View>
            <ScrollView style={styles.currencyList}>
              {CURRENCY_REGISTRY.map((curr) => {
                const isSelected = profile?.currencyCode === curr.code;
                return (
                  <Pressable
                    key={curr.code}
                    onPress={() => handleSelectCurrency(curr)}
                    style={({ pressed }) => [
                      styles.currencyRow,
                      isSelected && styles.currencyRowSelected,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.flagText}>{curr.flag}</Text>
                    <View style={styles.currencyInfo}>
                      <Text style={[styles.currencyCode, isSelected && styles.currencyCodeSelected]}>
                        {curr.code} - {curr.name}
                      </Text>
                    </View>
                    <Text style={[styles.currencySymbol, isSelected && styles.currencySymbolSelected]}>
                      {curr.symbol}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Month Start Day Picker Modal */}
      <Modal
        visible={dayModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setDayModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dialogContent}>
            <Text style={styles.modalTitle}>Month Starting Day</Text>
            <Text style={styles.dialogSubtitle}>Set the day of the month when your financial cycle begins (1 - 31).</Text>
            <View style={styles.inputCard}>
              <TextInput
                style={styles.textInput}
                value={editingDay}
                onChangeText={setEditingDay}
                keyboardType="number-pad"
                placeholder="1"
                placeholderTextColor={colors.text.muted}
                maxLength={2}
                autoFocus
              />
            </View>
            <View style={styles.dialogActions}>
              <Pressable
                onPress={() => setDayModalVisible(false)}
                style={({ pressed }) => [styles.cancelBtn, pressed && styles.pressed]}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleSaveMonthStartDay}
                style={({ pressed }) => [styles.saveBtn, pressed && styles.pressed]}
              >
                <Text style={styles.saveBtnText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Monthly Budget Modal */}
      <Modal
        visible={budgetModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setBudgetModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dialogContent}>
            <Text style={styles.modalTitle}>Edit Monthly Budget Target</Text>
            <Text style={styles.dialogSubtitle}>Set your maximum monthly spending goal.</Text>
            <View style={[styles.inputCard, styles.budgetInputRow]}>
              <Text style={styles.budgetCurrencyPrefix}>{currencyObj.symbol}</Text>
              <TextInput
                style={styles.textInput}
                value={editingBudget}
                onChangeText={setEditingBudget}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={colors.text.muted}
                maxLength={10}
                autoFocus
              />
            </View>
            <View style={styles.dialogActions}>
              <Pressable
                onPress={() => setBudgetModalVisible(false)}
                style={({ pressed }) => [styles.cancelBtn, pressed && styles.pressed]}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleSaveMonthlyBudget}
                style={({ pressed }) => [styles.saveBtn, pressed && styles.pressed]}
              >
                <Text style={styles.saveBtnText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Budget Cycle Selector Modal */}
      <Modal
        visible={cycleModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setCycleModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dialogContent}>
            <Text style={styles.modalTitle}>Budget Cycle Frequency</Text>
            <Text style={styles.dialogSubtitle}>Select how frequently your budget resets.</Text>
            <View style={styles.cycleList}>
              {(['weekly', 'monthly', 'yearly'] as const).map((cycle) => {
                const isSelected = profile?.budgetCycle === cycle;
                return (
                  <Pressable
                    key={cycle}
                    onPress={() => handleSelectBudgetCycle(cycle)}
                    style={({ pressed }) => [
                      styles.cycleOptionRow,
                      isSelected && styles.cycleOptionSelected,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={[styles.cycleOptionText, isSelected && styles.cycleOptionTextSelected]}>
                      {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                    </Text>
                    {isSelected && (
                      <SymbolView
                        name={{ ios: 'checkmark', android: 'check', web: 'check' }}
                        size={16}
                        tintColor={colors.primary}
                      />
                    )}
                  </Pressable>
                );
              })}
            </View>
            <View style={styles.dialogActions}>
              <Pressable
                onPress={() => setCycleModalVisible(false)}
                style={({ pressed }) => [styles.cancelBtn, pressed && styles.pressed]}
              >
                <Text style={styles.cancelBtnText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: t.spacing.xxxxl,
  },
  content: {
    width: '100%',
    maxWidth: t.layout.maxContentWidth,
    alignSelf: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: t.opacity.pressed,
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  dialogContent: {
    backgroundColor: t.colors.card,
    borderRadius: t.radius.lg,
    padding: t.spacing.lg,
    margin: t.spacing.lg,
    alignSelf: 'center',
    width: '90%',
    maxWidth: 400,
    ...t.shadows.md,
  },
  sheetContent: {
    backgroundColor: t.colors.card,
    borderTopLeftRadius: t.radius.xl,
    borderTopRightRadius: t.radius.xl,
    padding: t.spacing.lg,
    maxHeight: '80%',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: t.spacing.md,
    paddingBottom: t.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: t.colors.divider,
  },
  modalTitle: {
    ...t.typography.subtitle,
    fontWeight: '700',
    color: t.colors.text.primary,
  },
  dialogSubtitle: {
    ...t.typography.caption,
    color: t.colors.text.tertiary,
    marginTop: 4,
    marginBottom: t.spacing.md,
  },
  inputCard: {
    backgroundColor: t.colors.surface,
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderColor: t.colors.border,
    paddingHorizontal: t.spacing.md,
    height: 48,
    justifyContent: 'center',
    marginBottom: t.spacing.md,
  },
  budgetInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetCurrencyPrefix: {
    ...t.typography.body,
    fontWeight: '700',
    color: t.colors.text.secondary,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    ...t.typography.body,
    color: t.colors.text.primary,
    fontWeight: '500',
  },
  dialogActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: t.spacing.sm,
  },
  cancelBtn: {
    paddingHorizontal: t.spacing.md,
    paddingVertical: t.spacing.sm,
    borderRadius: t.radius.md,
  },
  cancelBtnText: {
    ...t.typography.body,
    color: t.colors.text.tertiary,
    fontWeight: '600',
  },
  saveBtn: {
    paddingHorizontal: t.spacing.lg,
    paddingVertical: t.spacing.sm,
    borderRadius: t.radius.md,
    backgroundColor: t.colors.primary,
  },
  saveBtnText: {
    ...t.typography.body,
    color: t.colors.text.inverse,
    fontWeight: '600',
  },
  currencyList: {
    marginVertical: t.spacing.xs,
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: t.spacing.sm,
    paddingHorizontal: t.spacing.md,
    borderRadius: t.radius.md,
    marginBottom: 4,
  },
  currencyRowSelected: {
    backgroundColor: '#EFF6FF',
  },
  flagText: {
    fontSize: 22,
    marginRight: t.spacing.md,
  },
  currencyInfo: {
    flex: 1,
  },
  currencyCode: {
    ...t.typography.body,
    fontWeight: '600',
    color: t.colors.text.primary,
  },
  currencyCodeSelected: {
    color: t.colors.primary,
  },
  currencySymbol: {
    ...t.typography.subtitle,
    fontWeight: '700',
    color: t.colors.text.secondary,
  },
  currencySymbolSelected: {
    color: t.colors.primary,
  },
  cycleList: {
    marginVertical: t.spacing.xs,
  },
  cycleOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: t.spacing.md,
    paddingHorizontal: t.spacing.md,
    borderRadius: t.radius.md,
    marginBottom: 4,
  },
  cycleOptionSelected: {
    backgroundColor: t.colors.surface,
  },
  cycleOptionText: {
    ...t.typography.body,
    fontWeight: '600',
    color: t.colors.text.primary,
  },
  cycleOptionTextSelected: {
    color: t.colors.primary,
  },
}));
