import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';
import { createStyles } from '@/theme';

export default function AnalyticsScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
        </View>
        <View style={styles.emptyState}>
          <SymbolView
            name={{ ios: 'chart.pie', android: 'bar_chart', web: 'bar_chart' }}
            size={32}
            tintColor="#CBD5E1"
            weight="regular"
          />
          <Text style={styles.emptyText}>Analytics coming soon</Text>
        </View>
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
  header: {
    paddingHorizontal: t.spacing.xxl,
    paddingTop: t.spacing.xxl,
    paddingBottom: t.spacing.lg,
  },
  title: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 34,
    color: t.colors.text.primary,
    letterSpacing: -0.5,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.spacing.md,
  },
  emptyText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: t.colors.text.muted,
    textAlign: 'center',
  },
}));
