import React, { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSegments, router } from 'expo-router';
import { createStyles } from '@/theme';
import { NavigationItem } from './NavigationItem';
import { FloatingActionButton } from './FloatingActionButton';
import { AddTransactionSheet } from './AddTransactionSheet';

export const NAV_BAR_HEIGHT = 80;

const TABS = [
  { name: 'index', icon: { ios: 'house', android: 'home', web: 'home' } as const, label: 'Home' },
  { name: 'transactions', icon: { ios: 'list.clipboard', android: 'receipt', web: 'receipt' } as const, label: 'Transactions' },
  { name: 'analytics', icon: { ios: 'chart.pie', android: 'bar_chart', web: 'bar_chart' } as const, label: 'Analytics' },
  { name: 'profile', icon: { ios: 'person.circle', android: 'person', web: 'person' } as const, label: 'Profile' },
];

export function BottomNavigation() {
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const activeTab = segments[segments.length - 1] ?? 'index';

  const handleTabPress = (tabName: string) => {
    if (tabName !== activeTab) {
      router.replace({ pathname: `/(tabs)/${tabName}` as any });
    }
  };

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
      <View style={styles.bar}>
        <NavigationItem
          icon={TABS[0].icon}
          label={TABS[0].label}
          isActive={activeTab === TABS[0].name}
          onPress={() => handleTabPress(TABS[0].name)}
        />
        <NavigationItem
          icon={TABS[1].icon}
          label={TABS[1].label}
          isActive={activeTab === TABS[1].name}
          onPress={() => handleTabPress(TABS[1].name)}
        />

        <View style={styles.fabSlot}>
          <View style={styles.fabPosition}>
            <FloatingActionButton onPress={() => setIsSheetOpen(true)} />
          </View>
        </View>

        <NavigationItem
          icon={TABS[2].icon}
          label={TABS[2].label}
          isActive={activeTab === TABS[2].name}
          onPress={() => handleTabPress(TABS[2].name)}
        />
        <NavigationItem
          icon={TABS[3].icon}
          label={TABS[3].label}
          isActive={activeTab === TABS[3].name}
          onPress={() => handleTabPress(TABS[3].name)}
        />
      </View>

      <AddTransactionSheet
        visible={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </View>
  );
}

const styles = createStyles((t) => ({
  wrapper: {
    backgroundColor: t.colors.card,
    borderTopLeftRadius: t.radius.xxl,
    borderTopRightRadius: t.radius.xxl,
    ...t.shadows.sm,
  },
  bar: {
    height: NAV_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: t.spacing.sm,
    paddingTop: t.spacing.xxl,
    paddingVertical: t.spacing.sm,
    maxWidth: t.layout.maxContentWidth,
    alignSelf: 'center',
    width: '100%',
  },
  fabSlot: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabPosition: {
    marginTop: -(NAV_BAR_HEIGHT / 3+15 ),
  },
}));
