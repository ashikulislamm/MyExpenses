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
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { createStyles } from '@/theme';

export interface PrimaryButtonProps {
  readonly title: string;
  readonly onPress: () => void;
  readonly isLoading?: boolean;
  readonly disabled?: boolean;
  readonly delay?: number;
}

export function PrimaryButton({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  delay = 0,
}: PrimaryButtonProps) {
  const scale = useSharedValue(1);

  const animatedScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInUp.duration(400).delay(delay).springify().damping(20)}
      style={styles.container}
    >
      <Pressable
        disabled={disabled || isLoading}
        onPressIn={() => { scale.value = withTiming(0.97, { duration: 80 }); }}
        onPressOut={() => { scale.value = withTiming(1, { duration: 120 }); }}
        onPress={onPress}
        android_ripple={{ color: '#1D4ED8', borderless: false }}
        style={({ pressed }) => [
          styles.button,
          pressed && Platform.OS !== 'android' && styles.buttonPressed,
          disabled && styles.buttonDisabled,
        ]}
      >
        <Animated.View style={[styles.innerContent, animatedScaleStyle]}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <View style={styles.labelContainer}>
              <Text style={styles.text}>{title}</Text>
              <SymbolView
                name={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }}
                size={15}
                tintColor="#FFFFFF"
                style={styles.icon}
                weight="semibold"
              />
            </View>
          )}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  container: {
    width: '100%',
    paddingHorizontal: t.spacing.xxl,
  },
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
    backgroundColor: t.colors.text.disabled,
    opacity: t.opacity.disabled,
  },
  innerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: t.colors.text.inverse,
    letterSpacing: 0.2,
  },
  icon: {
    marginLeft: t.spacing.sm,
  },
}));
