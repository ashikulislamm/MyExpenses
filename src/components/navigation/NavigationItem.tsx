import React, { useCallback, useEffect } from 'react';
import { View, Pressable } from 'react-native';
import { SymbolView, SymbolViewProps } from 'expo-symbols';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { createStyles, colors } from '@/theme';

export interface NavigationItemProps {
  readonly icon: SymbolViewProps['name'];
  readonly isActive: boolean;
  readonly onPress: () => void;
  readonly accessibilityLabel?: string;
}

export function NavigationItem({
  icon,
  isActive,
  onPress,
  accessibilityLabel,
}: NavigationItemProps) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(isActive ? 1.1 : 1, {
      damping: 15,
      stiffness: 220,
    });
  }, [isActive, scale]);

  const animatedScale = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.92, { damping: 15, stiffness: 300 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(isActive ? 1.1 : 1, { damping: 12, stiffness: 220 });
  }, [isActive, scale]);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      style={styles.touchArea}
    >
      <Animated.View
        style={[
          styles.iconPill,
          isActive && styles.activePill,
          animatedScale,
        ]}
      >
        <SymbolView
          name={icon}
          size={22}
          tintColor={isActive ? colors.primary : '#64748B'}
          weight={isActive ? 'bold' : 'regular'}
        />
      </Animated.View>

      {/* Active Dot Indicator */}
      {isActive && <View style={styles.activeDot} />}
    </Pressable>
  );
}

const styles = createStyles((t) => ({
  touchArea: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    position: 'relative',
  },
  iconPill: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  activePill: {
    backgroundColor: '#EFF6FF',
  },
  activeDot: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: t.colors.primary,
  },
}));
