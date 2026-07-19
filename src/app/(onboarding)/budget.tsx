import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { createStyles } from '@/theme';
import { useOnboardingStore } from '@/stores/onboarding.store';
import { StorageService } from '@/services/storage/storage.service';

export default function BudgetScreen() {
  const { monthlyBudget, setMonthlyBudget } = useOnboardingStore();
  const [value, setValue] = useState(monthlyBudget ? String(monthlyBudget) : '');

  const handleFinish = async () => {
    const budget = value ? Number(value) : null;
    setMonthlyBudget(budget);
    if (budget) {
      await StorageService.setMonthlyBudget(budget);
    }
    await StorageService.setOnboardingCompleted(true);
    router.replace('/(tabs)');
  };

  const handleSkip = async () => {
    await StorageService.setOnboardingCompleted(true);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.step}>Step 3 of 3</Text>
            <Text style={styles.title}>Monthly Budget</Text>
            <Text style={styles.subtitle}>Set a monthly spending goal to help you stay on track.</Text>
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>Monthly Spending Limit</Text>
            <View style={styles.inputRow}>
              <Text style={styles.currencySign}>$</Text>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={setValue}
                placeholder="0"
                placeholderTextColor="#CBD5E1"
                keyboardType="numeric"
                returnKeyType="done"
                maxLength={10}
              />
            </View>
            {value ? (
              <Text style={styles.hint}>
                {Number(value) > 0 ? 'You can change this anytime in Settings.' : ''}
              </Text>
            ) : null}
          </View>

          <View style={styles.buttonSection}>
            <Pressable
              onPress={handleFinish}
              android_ripple={{ color: '#1D4ED8', borderless: false }}
              style={({ pressed }) => [
                styles.button,
                pressed && Platform.OS !== 'android' && { opacity: 0.9 },
              ]}
            >
              <View style={styles.buttonInner}>
                <Text style={styles.buttonText}>Finish Setup</Text>
                <SymbolView
                  name={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }}
                  size={16}
                  tintColor="#FFFFFF"
                  weight="semibold"
                />
              </View>
            </Pressable>

            <Pressable
              onPress={handleSkip}
              android_ripple={{ color: '#E2E8F0', borderless: true }}
              style={({ pressed }) => [
                styles.skipButton,
                pressed && Platform.OS !== 'android' && { opacity: 0.6 },
              ]}
            >
              <Text style={styles.skipText}>Skip</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = createStyles((t) => ({
  container: { flex: 1, backgroundColor: t.colors.background },
  safeArea: { flex: 1, width: '100%', maxWidth: t.layout.maxContentWidth, alignSelf: 'center' },
  content: { flex: 1, paddingHorizontal: t.spacing.xxl, paddingTop: t.spacing.xxxxl },
  header: { marginBottom: t.spacing.xxxl },
  step: { fontFamily: 'Inter', fontWeight: '500', fontSize: 12, lineHeight: 16, color: t.colors.text.muted, letterSpacing: 0.5, marginBottom: t.spacing.sm },
  title: { fontFamily: 'Inter', fontWeight: '700', fontSize: 28, lineHeight: 34, color: t.colors.text.primary, letterSpacing: -0.5 },
  subtitle: { fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 20, color: t.colors.text.tertiary, marginTop: t.spacing.sm, letterSpacing: -0.1 },
  inputCard: {
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.card,
    borderWidth: 1,
    borderColor: t.colors.border,
    padding: t.spacing.xxl,
  },
  inputLabel: { fontFamily: 'Inter', fontWeight: '500', fontSize: 13, lineHeight: 18, color: t.colors.text.tertiary, letterSpacing: 0, marginBottom: t.spacing.md },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  currencySign: { fontFamily: 'Inter', fontWeight: '600', fontSize: 28, lineHeight: 34, color: t.colors.text.primary, marginRight: t.spacing.sm },
  input: { flex: 1, fontFamily: 'Inter', fontWeight: '600', fontSize: 28, lineHeight: 34, color: t.colors.text.primary, letterSpacing: -0.5, padding: 0 },
  hint: { fontFamily: 'Inter', fontWeight: '400', fontSize: 12, lineHeight: 16, color: t.colors.text.muted, marginTop: t.spacing.sm },
  buttonSection: { marginTop: 'auto', paddingTop: t.spacing.xxxl, paddingBottom: t.spacing.xxxxl, gap: t.spacing.md },
  button: { width: '100%', height: 56, borderRadius: t.radius.full, backgroundColor: t.colors.primary, alignItems: 'center', justifyContent: 'center' },
  buttonInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: t.spacing.sm },
  buttonText: { fontFamily: 'Inter', fontWeight: '600', fontSize: 16, lineHeight: 22, color: t.colors.text.inverse, letterSpacing: 0.2 },
  skipButton: { alignItems: 'center', justifyContent: 'center', paddingVertical: t.spacing.md, minHeight: 48 },
  skipText: { fontFamily: 'Inter', fontWeight: '500', fontSize: 14, lineHeight: 20, color: t.colors.text.tertiary, letterSpacing: 0.1 },
}));
