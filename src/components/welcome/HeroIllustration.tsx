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
  offset = 6,
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

export function HeroIllustration() {
  return (
    <Animated.View entering={FadeIn.duration(600).delay(100)} style={styles.container}>
      <View style={styles.canvas}>
        {/* Decorative circle - top left */}
        <View style={styles.decoCircle1}>
          <View style={styles.decoCircle1Inner} />
        </View>

        {/* Decorative circle - bottom right */}
        <View style={styles.decoCircle2} />

        {/* Decorative ring - mid right */}
        <View style={styles.decoRing} />

        {/* Background balance card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceAccent} />
          <View style={styles.balanceRow}>
            <View style={styles.balanceLabel} />
            <View style={styles.balanceChip} />
          </View>
          <View style={styles.balanceValue} />
          <View style={styles.balanceTrend} />
        </View>

        {/* Small graph card */}
        <View style={styles.graphCard}>
          <View style={styles.graphRow}>
            <View style={[styles.graphBar, { height: 18 }]} />
            <View style={[styles.graphBar, { height: 24 }]} />
            <View style={[styles.graphBar, { height: 14 }]} />
            <View style={[styles.graphBar, { height: 28 }]} />
            <View style={[styles.graphBar, { height: 20 }]} />
          </View>
          <View style={styles.graphLabel} />
        </View>

        {/* Floating expense card */}
        <FloatingLayer offset={5} duration={2800} style={styles.expenseCard}>
          <View style={styles.cardDotExpense} />
          <View style={styles.cardTitleLine} />
          <View style={styles.cardValueLine} />
        </FloatingLayer>

        {/* Floating income card */}
        <FloatingLayer offset={4} duration={3200} style={styles.incomeCard}>
          <View style={styles.cardDotIncome} />
          <View style={styles.cardTitleLine} />
          <View style={styles.cardValueLineIncome} />
        </FloatingLayer>

        {/* Wallet shape outline */}
        <View style={styles.walletShape} />
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
    width: 300,
    height: 200,
    position: 'relative',
  },
  decoCircle1: {
    position: 'absolute',
    top: 0,
    left: 20,
    width: 36,
    height: 36,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  decoCircle1Inner: {
    width: 14,
    height: 14,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.primary,
    opacity: 0.9,
  },
  decoCircle2: {
    position: 'absolute',
    bottom: 4,
    right: 18,
    width: 20,
    height: 20,
    borderRadius: t.radius.full,
    borderWidth: 2,
    borderColor: t.colors.primary,
    opacity: 0.3,
  },
  decoRing: {
    position: 'absolute',
    top: 60,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: t.radius.full,
    borderWidth: 1.5,
    borderColor: t.colors.border,
  },
  balanceCard: {
    position: 'absolute',
    top: 30,
    left: 30,
    width: 200,
    height: 100,
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.card,
    borderWidth: 1,
    borderColor: t.colors.border,
    padding: t.spacing.lg,
    ...t.shadows.sm,
  },
  balanceAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderTopLeftRadius: t.radius.lg,
    borderTopRightRadius: t.radius.lg,
    backgroundColor: t.colors.primary,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: t.spacing.sm,
  },
  balanceLabel: {
    width: 60,
    height: 8,
    borderRadius: t.radius.xs,
    backgroundColor: t.colors.border,
  },
  balanceChip: {
    width: 36,
    height: 18,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.primaryLight,
  },
  balanceValue: {
    width: 120,
    height: 12,
    borderRadius: t.radius.xs,
    backgroundColor: t.colors.text.primary,
    marginBottom: t.spacing.sm,
    opacity: 0.08,
  },
  balanceTrend: {
    width: 80,
    height: 8,
    borderRadius: t.radius.xs,
    backgroundColor: t.colors.border,
    opacity: 0.6,
  },
  graphCard: {
    position: 'absolute',
    top: 108,
    left: 140,
    width: 100,
    height: 48,
    borderRadius: t.radius.md,
    backgroundColor: t.colors.card,
    borderWidth: 1,
    borderColor: t.colors.border,
    padding: t.spacing.sm,
    justifyContent: 'center',
    ...t.shadows.xs,
  },
  graphRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: 30,
  },
  graphBar: {
    flex: 1,
    borderRadius: 3,
    backgroundColor: t.colors.primaryLight,
  },
  graphLabel: {
    width: 40,
    height: 4,
    borderRadius: t.radius.xs,
    backgroundColor: t.colors.border,
    marginTop: 4,
    alignSelf: 'center',
  },
  expenseCard: {
    position: 'absolute',
    bottom: 20,
    left: 12,
    width: 96,
    height: 60,
    borderRadius: t.radius.md,
    backgroundColor: t.colors.card,
    borderWidth: 1,
    borderColor: t.colors.border,
    padding: t.spacing.sm,
    ...t.shadows.sm,
  },
  cardDotExpense: {
    width: 8,
    height: 8,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.danger,
    marginBottom: t.spacing.xs,
    opacity: 0.7,
  },
  cardDotIncome: {
    width: 8,
    height: 8,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.success,
    marginBottom: t.spacing.xs,
    opacity: 0.7,
  },
  cardTitleLine: {
    width: 40,
    height: 6,
    borderRadius: t.radius.xs,
    backgroundColor: t.colors.border,
    marginBottom: 4,
  },
  cardValueLine: {
    width: 52,
    height: 8,
    borderRadius: t.radius.xs,
    backgroundColor: t.colors.danger,
    opacity: 0.3,
  },
  cardValueLineIncome: {
    width: 52,
    height: 8,
    borderRadius: t.radius.xs,
    backgroundColor: t.colors.success,
    opacity: 0.3,
  },
  incomeCard: {
    position: 'absolute',
    bottom: 30,
    right: 14,
    width: 96,
    height: 60,
    borderRadius: t.radius.md,
    backgroundColor: t.colors.card,
    borderWidth: 1,
    borderColor: t.colors.border,
    padding: t.spacing.sm,
    ...t.shadows.sm,
  },
  walletShape: {
    position: 'absolute',
    bottom: 2,
    left: 110,
    width: 28,
    height: 22,
    borderRadius: t.radius.xs,
    borderWidth: 1.5,
    borderColor: t.colors.border,
    opacity: 0.5,
  },
}));
