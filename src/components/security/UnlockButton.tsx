import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  Platform,
  View,
} from 'react-native';
import { SymbolView } from 'expo-symbols';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { createStyles } from '@/theme';

export interface UnlockButtonProps {
  readonly onPress: () => void;
  readonly isLoading: boolean;
  readonly disabled?: boolean;
}

export function UnlockButton({ onPress, isLoading, disabled = false }: UnlockButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      disabled={disabled || isLoading}
      onPressIn={() => { scale.value = withTiming(0.97, { duration: 80 }); }}
      onPressOut={() => { scale.value = withTiming(1, { duration: 120 }); }}
      onPress={onPress}
      android_ripple={{ color: '#1D4ED8', borderless: false }}
      style={({ pressed }) => [
        styles.button,
        pressed && Platform.OS !== 'android' && styles.buttonPressed,
        (disabled || isLoading) && styles.buttonDisabled,
      ]}
    >
      <Animated.View style={[styles.inner, animatedStyle]}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <View style={styles.labelRow}>
            <SymbolView
              name={{ ios: 'touchid', android: 'fingerprint', web: 'fingerprint' }}
              size={20}
              tintColor="#FFFFFF"
              weight="medium"
            />
            <Text style={styles.text}>Unlock with Biometrics</Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = createStyles((t) => ({
  button: {
    width: '100%',
    height: 56,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonPressed: {
    backgroundColor: t.colors.primaryDark,
  },
  buttonDisabled: {
    opacity: t.opacity.disabled,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.spacing.sm,
  },
  text: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: t.colors.text.inverse,
    letterSpacing: 0.2,
  },
}));
