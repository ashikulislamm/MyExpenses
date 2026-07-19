import React from 'react';
import { View, Text } from 'react-native';
import { SymbolView } from 'expo-symbols';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { createStyles } from '@/theme';

export function SecurityBenefitsCard() {
  return (
    <Animated.View entering={FadeInUp.duration(400).delay(350)} style={styles.card}>
      <View style={styles.divider} />
      <BenefitRow
        icon="touchid"
        iconAndroid="fingerprint"
        iconWeb="fingerprint"
        label="Unlock with Fingerprint or Face ID"
      />
      <View style={styles.rowDivider} />
      <BenefitRow
        icon="lock.shield"
        iconAndroid="security"
        iconWeb="security"
        label="Your data never leaves your device"
      />
      <View style={styles.rowDivider} />
      <BenefitRow
        icon="gearshape"
        iconAndroid="settings"
        iconWeb="settings"
        label="You can change this anytime in Settings"
      />
      <View style={styles.divider} />
    </Animated.View>
  );
}

function BenefitRow({
  icon,
  iconAndroid,
  iconWeb,
  label,
}: {
  readonly icon: string;
  readonly iconAndroid: string;
  readonly iconWeb: string;
  readonly label: string;
}) {
  return (
    <View style={styles.benefitRow}>
      <SymbolView
        name={{ ios: icon as any, android: iconAndroid as any, web: iconWeb as any }}
        size={20}
        tintColor="#2563EB"
        style={styles.benefitIcon}
        weight="medium"
      />
      <Text style={styles.benefitLabel}>{label}</Text>
    </View>
  );
}

const styles = createStyles((t) => ({
  card: {
    width: '100%',
    marginHorizontal: t.spacing.xxl,
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.card,
    borderWidth: 1,
    borderColor: t.colors.border,
    paddingVertical: t.spacing.lg,
    paddingHorizontal: t.spacing.lg,
    ...t.shadows.xs,
  },
  divider: {
    height: 1,
    backgroundColor: t.colors.divider,
  },
  rowDivider: {
    height: 1,
    backgroundColor: t.colors.divider,
    marginLeft: t.spacing.xxxl,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: t.spacing.md,
  },
  benefitIcon: {
    marginRight: t.spacing.md,
  },
  benefitLabel: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: t.colors.text.secondary,
    flex: 1,
    letterSpacing: -0.1,
  },
}));
