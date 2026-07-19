import React from 'react';
import { Pressable, Platform } from 'react-native';
import { SymbolView } from 'expo-symbols';
import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { createStyles, hexToRgba } from '@/theme';

export function FloatingActionButton() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInUp.duration(500).delay(900).springify().damping(15)}
      style={styles.container}
    >
      <Pressable
        onPress={() => {}}
        onPressIn={() => { scale.value = withTiming(0.92, { duration: 80 }); }}
        onPressOut={() => { scale.value = withTiming(1, { duration: 120 }); }}
        android_ripple={{ color: '#1D4ED8', borderless: true }}
        style={({ pressed }) => [
          styles.button,
          pressed && Platform.OS !== 'android' && { opacity: 0.9 },
        ]}
      >
        <Animated.View style={[styles.inner, animatedStyle]}>
          <SymbolView
            name={{ ios: 'plus', android: 'add', web: 'add' }}
            size={26}
            tintColor="#FFFFFF"
            weight="semibold"
          />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  container: {
    position: 'absolute',
    bottom: 100,
    right: t.spacing.xxl,
    zIndex: 100,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: t.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...t.shadows.md,
  },
  inner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
