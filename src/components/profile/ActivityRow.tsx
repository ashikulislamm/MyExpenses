/** ActivityRow component */
import React from 'react';
import { View, Text } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { createStyles } from '@/theme';

export interface ActivityRowProps {
  readonly title: string;
  readonly time: string;
  readonly iconName: React.ComponentProps<typeof SymbolView>['name'];
  readonly isLast?: boolean;
}

export function ActivityRow({ title, time, iconName, isLast = false }: ActivityRowProps) {
  return (
    <View style={[styles.row, !isLast && styles.borderBottom]}>
      <View style={styles.leftGroup}>
        <View style={styles.iconBox}>
          <SymbolView
            name={iconName}
            size={14}
            tintColor="#64748B"
          />
        </View>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <Text style={styles.timeText}>{time}</Text>
    </View>
  );
}

const styles = createStyles((t) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: t.spacing.sm,
    paddingHorizontal: t.spacing.md,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: t.colors.divider,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.sm,
    flex: 1,
  },
  iconBox: {
    width: 26,
    height: 26,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    ...t.typography.bodySmall,
    color: t.colors.text.primary,
    fontWeight: '500',
  },
  timeText: {
    ...t.typography.caption,
    color: t.colors.text.muted,
    fontSize: 11,
  },
}));
