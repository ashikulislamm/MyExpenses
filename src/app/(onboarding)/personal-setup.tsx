import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { createStyles, colors } from '@/theme';
import { CURRENCY_REGISTRY, Currency } from '@/shared/constants/currencies';
import { useProfileStore } from '@/features/profile/store/profile.store';
import { StorageService } from '@/services/storage/storage.service';
import { validateCreateProfileInput } from '@/features/profile/validation/profile.validation';

export default function PersonalSetupScreen() {
  const { createProfile, isLoading } = useProfileStore();

  const [name, setName] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(CURRENCY_REGISTRY[0]); // BDT
  const [monthlyBudget, setMonthlyBudget] = useState('');
  const [monthStartDay, setMonthStartDay] = useState('1');
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);

  const handleFinishSetup = async () => {
    const budgetNum = monthlyBudget ? Number(monthlyBudget) : null;
    const startDayNum = monthStartDay ? Number(monthStartDay) : 1;

    const validation = validateCreateProfileInput({
      name,
      currencyCode: selectedCurrency.code,
      monthlyBudget: budgetNum,
      monthStartDay: startDayNum,
    });

    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      Alert.alert('Validation Error', firstError);
      return;
    }

    try {
      await createProfile({
        name: name.trim(),
        currencyCode: selectedCurrency.code,
        monthlyBudget: budgetNum,
        monthStartDay: startDayNum,
        budgetCycle: 'monthly',
      });

      await StorageService.setOnboardingCompleted(true);
      router.replace('/(tabs)');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to save profile';
      Alert.alert('Error', errorMsg);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.step}>Step 2 of 2</Text>
              <Text style={styles.title}>Personal Setup</Text>
              <Text style={styles.subtitle}>Customize your profile and financial parameters.</Text>
            </View>

            {/* Input Form Cards */}
            <View style={styles.formContainer}>
              {/* Name Field (Required) */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Full Name <Text style={styles.requiredAsterisk}>*</Text>
                </Text>
                <View style={styles.inputCard}>
                  <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name (e.g. Ashikul Islam)"
                    placeholderTextColor={colors.text.muted}
                    autoCapitalize="words"
                    maxLength={50}
                  />
                </View>
              </View>

              {/* Currency Field (Required - Selector) */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Default Currency <Text style={styles.requiredAsterisk}>*</Text>
                </Text>
                <Pressable
                  onPress={() => setCurrencyModalVisible(true)}
                  style={({ pressed }) => [
                    styles.inputCard,
                    styles.selectorRow,
                    pressed && styles.pressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="Select Currency"
                >
                  <View style={styles.currencyDisplayGroup}>
                    <Text style={styles.flagText}>{selectedCurrency.flag}</Text>
                    <Text style={styles.currencyCodeText}>{selectedCurrency.code}</Text>
                    <Text style={styles.currencyNameText}>({selectedCurrency.name})</Text>
                  </View>
                  <Text style={styles.currencySymbolBadge}>{selectedCurrency.symbol}</Text>
                </Pressable>
              </View>

              {/* Monthly Budget Field (Optional) */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Monthly Budget Target <Text style={styles.optionalText}>(Optional)</Text>
                </Text>
                <View style={[styles.inputCard, styles.budgetInputRow]}>
                  <Text style={styles.budgetCurrencyPrefix}>{selectedCurrency.symbol}</Text>
                  <TextInput
                    style={styles.textInput}
                    value={monthlyBudget}
                    onChangeText={setMonthlyBudget}
                    placeholder="0"
                    placeholderTextColor={colors.text.muted}
                    keyboardType="numeric"
                    maxLength={10}
                  />
                </View>
              </View>

              {/* Month Starting Day Field (Optional - Default 1) */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Month Start Day <Text style={styles.optionalText}>(Default: 1st)</Text>
                </Text>
                <View style={styles.inputCard}>
                  <TextInput
                    style={styles.textInput}
                    value={monthStartDay}
                    onChangeText={setMonthStartDay}
                    placeholder="1"
                    placeholderTextColor={colors.text.muted}
                    keyboardType="number-pad"
                    maxLength={2}
                  />
                </View>
                <Text style={styles.fieldHint}>
                  Financial cycle will calculate spending from this day of every month.
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonSection}>
              <Pressable
                onPress={handleFinishSetup}
                disabled={isLoading}
                android_ripple={{ color: '#1D4ED8', borderless: false }}
                style={({ pressed }) => [
                  styles.button,
                  pressed && Platform.OS !== 'android' && { opacity: 0.9 },
                ]}
              >
                <View style={styles.buttonInner}>
                  <Text style={styles.buttonText}>Complete Setup</Text>
                  <SymbolView
                    name={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
                    size={18}
                    tintColor="#FFFFFF"
                  />
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Currency Picker Modal */}
      <Modal
        visible={currencyModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCurrencyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Primary Currency</Text>
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
                const isSelected = selectedCurrency.code === curr.code;
                return (
                  <Pressable
                    key={curr.code}
                    onPress={() => {
                      setSelectedCurrency(curr);
                      setCurrencyModalVisible(false);
                    }}
                    style={({ pressed }) => [
                      styles.currencyOptionRow,
                      isSelected && styles.currencyOptionSelected,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.optionFlag}>{curr.flag}</Text>
                    <View style={styles.optionTextGroup}>
                      <Text style={[styles.optionCode, isSelected && styles.optionCodeSelected]}>
                        {curr.code} - {curr.name}
                      </Text>
                    </View>
                    <Text style={[styles.optionSymbol, isSelected && styles.optionSymbolSelected]}>
                      {curr.symbol}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = createStyles((t) => ({
  container: { flex: 1, backgroundColor: t.colors.background },
  safeArea: { flex: 1, width: '100%', maxWidth: t.layout.maxContentWidth, alignSelf: 'center' },
  keyboardView: { flex: 1 },
  scrollContent: { paddingHorizontal: t.spacing.xl, paddingTop: t.spacing.xl, paddingBottom: t.spacing.xxxxl },
  header: { marginBottom: t.spacing.xl },
  step: { ...t.typography.caption, color: t.colors.text.muted, fontWeight: '600', letterSpacing: 0.5, marginBottom: 4 },
  title: { ...t.typography.h1, color: t.colors.text.primary, fontWeight: '700', letterSpacing: -0.5 },
  subtitle: { ...t.typography.body, color: t.colors.text.tertiary, marginTop: 4 },
  formContainer: { gap: t.spacing.md },
  inputGroup: { gap: 6 },
  label: { ...t.typography.caption, color: t.colors.text.primary, fontWeight: '600' },
  requiredAsterisk: { color: t.colors.danger },
  optionalText: { color: t.colors.text.tertiary, fontWeight: '400' },
  inputCard: {
    backgroundColor: t.colors.card,
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderColor: t.colors.border,
    paddingHorizontal: t.spacing.md,
    paddingVertical: t.spacing.sm,
    height: 48,
    justifyContent: 'center',
  },
  textInput: {
    ...t.typography.body,
    color: t.colors.text.primary,
    fontWeight: '500',
    padding: 0,
  },
  selectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currencyDisplayGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flagText: { fontSize: 20 },
  currencyCodeText: { ...t.typography.body, fontWeight: '700', color: t.colors.text.primary },
  currencyNameText: { ...t.typography.caption, color: t.colors.text.tertiary },
  currencySymbolBadge: {
    ...t.typography.subtitle,
    fontWeight: '700',
    color: t.colors.primary,
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
  fieldHint: {
    ...t.typography.caption,
    fontSize: 11,
    color: t.colors.text.muted,
    marginTop: 2,
  },
  buttonSection: { marginTop: t.spacing.xxl },
  button: { width: '100%', height: 52, borderRadius: t.radius.full, backgroundColor: t.colors.primary, alignItems: 'center', justifyContent: 'center' },
  buttonInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  buttonText: { ...t.typography.button, color: t.colors.text.inverse, fontWeight: '600' },
  pressed: { opacity: t.opacity.pressed },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: t.colors.card,
    borderTopLeftRadius: t.radius.xl,
    borderTopRightRadius: t.radius.xl,
    padding: t.spacing.lg,
    maxHeight: '80%',
  },
  modalHeader: {
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
  currencyList: {
    marginVertical: t.spacing.xs,
  },
  currencyOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: t.spacing.sm,
    paddingHorizontal: t.spacing.md,
    borderRadius: t.radius.md,
    marginBottom: 4,
  },
  currencyOptionSelected: {
    backgroundColor: '#EFF6FF',
  },
  optionFlag: {
    fontSize: 22,
    marginRight: t.spacing.md,
  },
  optionTextGroup: {
    flex: 1,
  },
  optionCode: {
    ...t.typography.body,
    fontWeight: '600',
    color: t.colors.text.primary,
  },
  optionCodeSelected: {
    color: t.colors.primary,
  },
  optionSymbol: {
    ...t.typography.subtitle,
    fontWeight: '700',
    color: t.colors.text.secondary,
  },
  optionSymbolSelected: {
    color: t.colors.primary,
  },
}));
