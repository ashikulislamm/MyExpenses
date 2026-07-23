import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { createStyles, colors } from '@/theme';

export interface PreferenceRowProps {
  readonly title: string;
  readonly value: string;
  readonly iconName: React.ComponentProps<typeof SymbolView>['name'];
  readonly bgColor?: string;
  readonly iconColor?: string;
  readonly isLast?: boolean;
  readonly onPress?: () => void;
}

export function PreferenceRow({
  title,
  value,
  iconName,
  bgColor = colors.surface,
  iconColor = colors.text.secondary,
  isLast = false,
  onPress,
}: PreferenceRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${title}, current value ${value}`}
    >
      <View style={styles.leftGroup}>
        <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
          <SymbolView name={iconName} size={18} tintColor={iconColor} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.rightGroup}>
        <Text style={styles.valueText}>{value}</Text>
        <SymbolView
          name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
          size={14}
          tintColor={colors.text.tertiary}
        />
      </View>

      {!isLast && <View style={styles.divider} />}
    </Pressable>
  );
}

const styles = createStyles((t) => ({
  row: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: t.spacing.md,
    position: 'relative',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.md,
  },
  iconContainer: {
    width: 34,
    height: 34,
    borderRadius: t.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...t.typography.body,
    fontWeight: '600',
    color: t.colors.text.primary,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  valueText: {
    ...t.typography.caption,
    fontWeight: '600',
    color: t.colors.text.secondary,
  },
  divider: {
    position: 'absolute',
    bottom: 0,
    left: t.spacing.md + 34 + t.spacing.md,
    right: t.spacing.md,
    height: 1,
    backgroundColor: t.colors.divider,
  },
  pressed: {
    backgroundColor: t.colors.surface,
  },
}));
