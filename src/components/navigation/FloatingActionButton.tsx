import React, { useCallback } from 'react';
import { Pressable, Platform } from 'react-native';
import { SymbolView } from 'expo-symbols';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { createStyles, colors } from '@/theme';

export interface FloatingActionButtonProps {
  readonly onPress: () => void;
}

export function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.88, {
      damping: 15,
      stiffness: 300,
      mass: 0.5,
    });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, {
      damping: 12,
      stiffness: 250,
      mass: 0.5,
    });
  }, [scale]);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityLabel="Add transaction"
      accessibilityRole="button"
      android_ripple={{ color: '#1D4ED8', borderless: true }}
      style={({ pressed }) => [
        styles.button,
        pressed && Platform.OS !== 'android' && styles.buttonPressed,
      ]}
    >
      <Animated.View style={[styles.inner, animatedStyle]}>
        <SymbolView
          name={{ ios: 'plus', android: 'add', web: 'add' }}
          size={24}
          tintColor="#FFFFFF"
          weight="semibold"
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = createStyles(() => ({
  button: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  inner: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
