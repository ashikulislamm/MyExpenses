import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { createStyles } from '@/theme';

function FloatingLayer({
  style,
  children,
  duration = 3000,
  offset = 5,
}: {
  style?: object;
  children?: React.ReactNode;
  duration?: number;
  offset?: number;
}) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-offset, { duration, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
}

function PulseRing({ size = 200, delay = 0 }: { size?: number; delay?: number }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.25);

  useEffect(() => {
    setTimeout(() => {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.08, { duration: 2500, easing: Easing.inOut(Easing.quad) }),
          withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.quad) }),
        ),
        -1,
        true,
      );
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.1, { duration: 2500, easing: Easing.inOut(Easing.quad) }),
          withTiming(0.25, { duration: 2500, easing: Easing.inOut(Easing.quad) }),
        ),
        -1,
        true,
      );
    }, delay);
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 1.5,
          borderColor: '#2563EB',
          position: 'absolute',
        },
        animStyle,
      ]}
    />
  );
}

export function SecurityIllustration() {
  return (
    <Animated.View entering={FadeIn.duration(500).delay(150)} style={styles.container}>
      <View style={styles.canvas}>
        {/* Outer pulsing ring */}
        <PulseRing size={200} delay={0} />

        {/* Middle ring */}
        <PulseRing size={156} delay={300} />

        {/* Inner decorative ring */}
        <View style={styles.innerRing} />

        {/* Shield shape - center */}
        <View style={styles.shieldBody}>
          <View style={styles.shieldTop} />
          <View style={styles.shieldBottom} />
        </View>

        {/* Checkmark inside shield */}
        <View style={styles.checkLeft} />
        <View style={styles.checkRight} />

        {/* Floating fingerprint card - top right */}
        <FloatingLayer offset={4} duration={3200} style={styles.fingerprintCard}>
          <View style={styles.fpCircle} />
          <View style={styles.fpArc1} />
          <View style={styles.fpArc2} />
          <View style={styles.fpArc3} />
        </FloatingLayer>

        {/* Floating lock card - bottom left */}
        <FloatingLayer offset={3} duration={2800} style={styles.lockCard}>
          <View style={styles.lockShackle} />
          <View style={styles.lockBody} />
        </FloatingLayer>

        {/* Decorative dot - top left */}
        <View style={styles.decoDot1} />

        {/* Decorative dot - bottom right */}
        <View style={styles.decoDot2} />
      </View>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvas: {
    width: 260,
    height: 220,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: t.colors.border,
    position: 'absolute',
  },
  shieldBody: {
    width: 56,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 2,
  },
  shieldTop: {
    width: 0,
    height: 0,
    borderLeftWidth: 28,
    borderRightWidth: 28,
    borderBottomWidth: 24,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: t.colors.primary,
    marginBottom: -2,
  },
  shieldBottom: {
    width: 44,
    height: 28,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    backgroundColor: t.colors.primary,
  },
  checkLeft: {
    position: 'absolute',
    width: 3,
    height: 12,
    borderRadius: 1.5,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
    top: 39,
    left: -4,
    zIndex: 3,
  },
  checkRight: {
    position: 'absolute',
    width: 3,
    height: 20,
    borderRadius: 1.5,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '-45deg' }],
    top: 33,
    left: 2,
    zIndex: 3,
  },
  fingerprintCard: {
    position: 'absolute',
    top: 18,
    right: 20,
    width: 72,
    height: 72,
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.card,
    borderWidth: 1,
    borderColor: t.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...t.shadows.sm,
  },
  fpCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: t.colors.primary,
    opacity: 0.5,
    position: 'absolute',
  },
  fpArc1: {
    position: 'absolute',
    top: 20,
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: t.colors.primary,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    transform: [{ rotate: '-60deg' }],
    left: 18,
    opacity: 0.6,
  },
  fpArc2: {
    position: 'absolute',
    bottom: 16,
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderColor: t.colors.primary,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    transform: [{ rotate: '30deg' }],
    left: 20,
    opacity: 0.4,
  },
  fpArc3: {
    position: 'absolute',
    top: 22,
    right: 18,
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderColor: t.colors.primary,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    transform: [{ rotate: '20deg' }],
    opacity: 0.5,
  },
  lockCard: {
    position: 'absolute',
    bottom: 16,
    left: 24,
    width: 60,
    height: 60,
    borderRadius: t.radius.md,
    backgroundColor: t.colors.card,
    borderWidth: 1,
    borderColor: t.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...t.shadows.xs,
  },
  lockShackle: {
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: t.colors.text.primary,
    borderBottomWidth: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: -1,
    opacity: 0.4,
  },
  lockBody: {
    width: 20,
    height: 14,
    borderRadius: 3,
    backgroundColor: t.colors.text.primary,
    opacity: 0.4,
  },
  decoDot1: {
    position: 'absolute',
    top: 40,
    left: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: t.colors.primaryLight,
    opacity: 0.6,
  },
  decoDot2: {
    position: 'absolute',
    bottom: 40,
    right: 14,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: t.colors.primary,
    opacity: 0.2,
  },
}));
