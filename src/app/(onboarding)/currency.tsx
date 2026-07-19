import React, { useState } from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { createStyles } from '@/theme';
import { useOnboardingStore } from '@/stores/onboarding.store';
import { StorageService } from '@/services/storage/storage.service';

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

export default function CurrencyScreen() {
  const { selectedCurrency, setSelectedCurrency } = useOnboardingStore();
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    await StorageService.setSelectedCurrency(selectedCurrency);
    setLoading(false);
    router.replace('/(onboarding)/budget');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.step}>Step 2 of 3</Text>
            <Text style={styles.title}>Choose Currency</Text>
            <Text style={styles.subtitle}>Select your preferred currency for tracking expenses.</Text>
          </View>

          <View style={styles.list}>
            {CURRENCIES.map((c) => (
              <Pressable
                key={c.code}
                onPress={() => setSelectedCurrency(c.code)}
                android_ripple={{ color: '#E2E8F0', borderless: false }}
                style={({ pressed }) => [
                  styles.option,
                  selectedCurrency === c.code && styles.optionSelected,
                  pressed && Platform.OS !== 'android' && { opacity: 0.7 },
                ]}
              >
                <Text style={[styles.symbol, selectedCurrency === c.code && styles.symbolSelected]}>
                  {c.symbol}
                </Text>
                <View style={styles.optionText}>
                  <Text style={[styles.optionCode, selectedCurrency === c.code && styles.optionCodeSelected]}>
                    {c.code}
                  </Text>
                  <Text style={styles.optionName}>{c.name}</Text>
                </View>
                {selectedCurrency === c.code && (
                  <SymbolView
                    name={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
                    size={22}
                    tintColor="#2563EB"
                    weight="medium"
                  />
                )}
              </Pressable>
            ))}
          </View>

          <View style={styles.buttonSection}>
            <Pressable
              onPress={handleContinue}
              disabled={loading}
              android_ripple={{ color: '#1D4ED8', borderless: false }}
              style={({ pressed }) => [
                styles.button,
                pressed && Platform.OS !== 'android' && { opacity: 0.9 },
              ]}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
          </View>
        </View>
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
  list: { gap: t.spacing.sm },
  option: { flexDirection: 'row', alignItems: 'center', padding: t.spacing.lg, borderRadius: t.radius.lg, backgroundColor: t.colors.card, borderWidth: 1, borderColor: t.colors.border },
  optionSelected: { borderColor: t.colors.primary, backgroundColor: '#EFF6FF' },
  symbol: { fontSize: 24, lineHeight: 32, fontWeight: '600', color: t.colors.text.secondary, width: 40, textAlign: 'center' },
  symbolSelected: { color: t.colors.primary },
  optionText: { flex: 1, marginLeft: t.spacing.md },
  optionCode: { fontFamily: 'Inter', fontWeight: '600', fontSize: 16, lineHeight: 22, color: t.colors.text.primary, letterSpacing: -0.2 },
  optionCodeSelected: { color: t.colors.primary },
  optionName: { fontFamily: 'Inter', fontWeight: '400', fontSize: 13, lineHeight: 18, color: t.colors.text.muted, marginTop: 2 },
  buttonSection: { marginTop: 'auto', paddingTop: t.spacing.xxxl, paddingBottom: t.spacing.xxxxl },
  button: { width: '100%', height: 56, borderRadius: t.radius.full, backgroundColor: t.colors.primary, alignItems: 'center', justifyContent: 'center' },
  buttonText: { fontFamily: 'Inter', fontWeight: '600', fontSize: 16, lineHeight: 22, color: t.colors.text.inverse, letterSpacing: 0.2 },
}));
