import React, { useCallback } from 'react';
import { Pressable, Platform } from 'react-native';
import { SymbolView } from 'expo-symbols';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { createStyles } from '@/theme';

export interface FloatingActionButtonProps {
  readonly onPress: () => void;
}

export function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.9, {
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
          size={22}
          tintColor="#FFFFFF"
          weight="semibold"
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = createStyles((t) => ({
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: t.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  inner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
