import React from 'react';
// QuickActionsGrid component
import { View, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { QuickActionCard } from './QuickActionCard';
import { createStyles } from '@/theme';

export interface QuickActionsGridProps {
  readonly onActionPress?: (actionKey: string) => void;
}

export function QuickActionsGrid({ onActionPress }: QuickActionsGridProps) {
  return (
    <Animated.View entering={FadeInDown.duration(400).delay(300)} style={styles.container}>
      <Text style={styles.sectionTitle}>Data & Personal Actions</Text>

      <View style={styles.grid}>
        <View style={styles.row}>
          <QuickActionCard
            title="Export My Data"
            iconName={{ ios: 'square.and.arrow.up', android: 'upload', web: 'upload' } as const}
            iconColor="#2563EB"
            onPress={() => onActionPress?.('export')}
          />
          <QuickActionCard
            title="Import Backup"
            iconName={{ ios: 'square.and.arrow.down', android: 'download', web: 'download' } as const}
            iconColor="#0EA5E9"
            onPress={() => onActionPress?.('import')}
          />
        </View>

        <View style={styles.row}>
          <QuickActionCard
            title="Financial Summary"
            iconName={{ ios: 'doc.text', android: 'assessment', web: 'assessment' } as const}
            iconColor="#16A34A"
            onPress={() => onActionPress?.('summary')}
          />
          <QuickActionCard
            title="Manage Categories"
            iconName={{ ios: 'folder.badge.plus', android: 'category', web: 'category' } as const}
            iconColor="#F59E0B"
            onPress={() => onActionPress?.('categories')}
          />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  container: {
    width: '100%',
    paddingHorizontal: t.spacing.md,
    marginBottom: t.spacing.md,
  },
  sectionTitle: {
    ...t.typography.subtitle,
    color: t.colors.text.primary,
    fontWeight: '700',
    marginBottom: t.spacing.xs,
    paddingHorizontal: t.spacing.xs,
  },
  grid: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));
