import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSegments, router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { createStyles } from '@/theme';
import { NavigationItem } from './NavigationItem';
import { FloatingActionButton } from './FloatingActionButton';
import { AddTransactionSheet } from './AddTransactionSheet';

const TAB_TO_COL: Record<string, number> = {
  index: 0,
  transactions: 1,
  analytics: 3,
  profile: 4,
};

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
  const [barWidth, setBarWidth] = useState(0);
  const indicatorLeft = useSharedValue(0);
  const initialPosSet = useRef(false);

  const rawTab = segments[segments.length - 1] ?? 'index';
  const activeTab = rawTab === '(tabs)' ? 'index' : rawTab;
  const activeCol = TAB_TO_COL[activeTab] ?? 0;

  useEffect(() => {
    if (barWidth <= 0) return;
    const colWidth = barWidth / 5;
    const center = colWidth * activeCol + colWidth / 2;
    const target = center - 22; // Center 44px pill

    if (!initialPosSet.current) {
      indicatorLeft.value = target;
      initialPosSet.current = true;
    } else {
      indicatorLeft.value = withSpring(target, {
        damping: 18,
        stiffness: 220,
        mass: 0.5,
      });
    }
  }, [activeCol, barWidth, indicatorLeft]);

  const animatedIndicator = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorLeft.value }],
  }));

  const handleBarLayout = useCallback((e: LayoutChangeEvent) => {
    setBarWidth(e.nativeEvent.layout.width);
  }, []);

  const handleTabPress = useCallback((tabName: string) => {
    if (tabName !== activeTab) {
      const path = tabName === 'index' ? '/(tabs)' as any : { pathname: `/(tabs)/${tabName}` as any };
      router.replace(path);
    }
  }, [activeTab]);

  const handleOpenSheet = useCallback(() => {
    setIsSheetOpen(true);
  }, []);

  const handleCloseSheet = useCallback(() => {
    setIsSheetOpen(false);
  }, []);

  return (
    <View style={[styles.wrapper, { bottom: Math.max(insets.bottom + 8, 12) }]}>
      <View style={styles.container}>
        <View style={styles.bar} onLayout={handleBarLayout}>
          <Animated.View style={[styles.indicator, animatedIndicator]} />

          <View style={styles.col}>
            <NavigationItem
              icon={TABS[0].icon}
              isActive={activeTab === TABS[0].name}
              onPress={() => handleTabPress(TABS[0].name)}
              accessibilityLabel={TABS[0].label}
            />
          </View>

          <View style={styles.col}>
            <NavigationItem
              icon={TABS[1].icon}
              isActive={activeTab === TABS[1].name}
              onPress={() => handleTabPress(TABS[1].name)}
              accessibilityLabel={TABS[1].label}
            />
          </View>

          <View style={styles.col}>
            <FloatingActionButton onPress={handleOpenSheet} />
          </View>

          <View style={styles.col}>
            <NavigationItem
              icon={TABS[2].icon}
              isActive={activeTab === TABS[2].name}
              onPress={() => handleTabPress(TABS[2].name)}
              accessibilityLabel={TABS[2].label}
            />
          </View>

          <View style={styles.col}>
            <NavigationItem
              icon={TABS[3].icon}
              isActive={activeTab === TABS[3].name}
              onPress={() => handleTabPress(TABS[3].name)}
              accessibilityLabel={TABS[3].label}
            />
          </View>
        </View>
      </View>

      <AddTransactionSheet
        visible={isSheetOpen}
        onClose={handleCloseSheet}
      />
    </View>
  );
}

const styles = createStyles((t) => ({
  wrapper: {
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 50,
  },
  container: {
    height: 68,
    backgroundColor: t.colors.card,
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10,
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  col: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    left: 0,
    top: 4,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
  },
}));
