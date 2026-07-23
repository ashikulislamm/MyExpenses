/** ProfileInfoRow component */
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { createStyles } from '@/theme';

export interface ProfileInfoRowProps {
  readonly title: string;
  readonly value: string;
  readonly iconName: React.ComponentProps<typeof SymbolView>['name'];
  readonly isLast?: boolean;
  readonly onPress?: () => void;
}

export function ProfileInfoRow({
  title,
  value,
  iconName,
  isLast = false,
  onPress,
}: ProfileInfoRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !isLast && styles.borderBottom,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${title}, currently ${value}`}
    >
      <View style={styles.leftGroup}>
        <View style={styles.iconWrapper}>
          <SymbolView
            name={iconName}
            size={16}
            tintColor="#475569"
          />
        </View>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <View style={styles.rightGroup}>
        <Text style={styles.valueText} numberOfLines={1}>{value}</Text>
        <SymbolView
          name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' } as const}
          size={14}
          tintColor="#94A3B8"
        />
      </View>
    </Pressable>
  );
}

const styles = createStyles((t) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: t.spacing.md,
    paddingHorizontal: t.spacing.md,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: t.colors.divider,
  },
  pressed: {
    backgroundColor: t.colors.surface,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.sm,
    flex: 1,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: t.radius.sm,
    backgroundColor: t.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    ...t.typography.body,
    color: t.colors.text.primary,
    fontWeight: '500',
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.xs,
    maxWidth: '55%',
  },
  valueText: {
    ...t.typography.bodySmall,
    color: t.colors.text.secondary,
    fontWeight: '600',
  },
}));
