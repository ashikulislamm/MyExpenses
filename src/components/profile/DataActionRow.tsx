import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { createStyles, colors } from '@/theme';

export interface DataActionRowProps {
  readonly title: string;
  readonly description: string;
  readonly iconName: React.ComponentProps<typeof SymbolView>['name'];
  readonly bgColor?: string;
  readonly iconColor?: string;
  readonly isLast?: boolean;
  readonly onPress?: () => void;
}

export function DataActionRow({
  title,
  description,
  iconName,
  bgColor = colors.surface,
  iconColor = colors.text.secondary,
  isLast = false,
  onPress,
}: DataActionRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${description}`}
    >
      <View style={styles.leftGroup}>
        <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
          <SymbolView name={iconName} size={18} tintColor={iconColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      <SymbolView
        name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
        size={14}
        tintColor={colors.text.tertiary}
      />

      {!isLast && <View style={styles.divider} />}
    </Pressable>
  );
}

const styles = createStyles((t) => ({
  row: {
    paddingVertical: t.spacing.sm,
    paddingHorizontal: t.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    minHeight: 64,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.md,
    flex: 1,
    paddingRight: t.spacing.sm,
  },
  iconContainer: {
    width: 34,
    height: 34,
    borderRadius: t.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...t.typography.body,
    fontWeight: '600',
    color: t.colors.text.primary,
  },
  description: {
    ...t.typography.caption,
    fontSize: 12,
    color: t.colors.text.tertiary,
    marginTop: 1,
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
