import React, { useCallback } from 'react';
import { Pressable, Text } from 'react-native';
import { SymbolView, SymbolViewProps } from 'expo-symbols';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { createStyles, hexToRgba } from '@/theme';

export interface NavigationItemProps {
  readonly icon: SymbolViewProps['name'];
  readonly label: string;
  readonly isActive: boolean;
  readonly onPress: () => void;
  readonly accessibilityLabel?: string;
}

export function NavigationItem({
  icon,
  label,
  isActive,
  onPress,
  accessibilityLabel,
}: NavigationItemProps) {
  const scale = useSharedValue(1);
  const bgOpacity = useSharedValue(isActive ? 1 : 0);
  const iconScale = useSharedValue(isActive ? 1.05 : 1);

  React.useEffect(() => {
    bgOpacity.value = withTiming(isActive ? 1 : 0, { duration: 200 });
    iconScale.value = withTiming(isActive ? 1.05 : 1, { duration: 200 });
  }, [isActive, bgOpacity, iconScale]);

  const animatedWrapper = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedIcon = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const animatedBg = useAnimatedStyle(() => ({
    opacity: bgOpacity.value,
  }));

  const tintColor = isActive ? '#2563EB' : '#94A3B8';

  const handlePressIn = useCallback(() => {
    scale.value = withTiming(0.94, { duration: 80 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withTiming(1, { duration: 120 });
  }, [scale]);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      style={styles.touchArea}
    >
      <Animated.View style={[styles.item, animatedWrapper]}>
        <Animated.View style={[styles.bgPill, animatedBg]} />
        <Animated.View style={animatedIcon}>
          <SymbolView
            name={icon}
            size={22}
            tintColor={tintColor}
            weight={isActive ? 'semibold' : 'regular'}
          />
        </Animated.View>
        <Text
          style={[
            styles.label,
            { color: isActive ? '#2563EB' : '#94A3B8' },
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = createStyles((t) => ({
  touchArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: t.spacing.xs,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingHorizontal: t.spacing.md,
    paddingVertical: t.spacing.xs,
    borderRadius: t.radius.full,
    overflow: 'hidden',
    minWidth: 56,
  },
  bgPill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: hexToRgba('#2563EB', 0.08),
    borderRadius: t.radius.full,
  },
  label: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
}));
