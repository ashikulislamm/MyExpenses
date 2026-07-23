/** AchievementCard component */
import React from 'react';
import { View, Text } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { createStyles } from '@/theme';

export interface AchievementCardProps {
  readonly title: string;
  readonly category: string;
  readonly isCompleted: boolean;
  readonly progressPercent?: number;
  readonly iconName: React.ComponentProps<typeof SymbolView>['name'];
  readonly badgeColor?: string;
}

export function AchievementCard({
  title,
  category,
  isCompleted,
  progressPercent = 100,
  iconName,
  badgeColor = '#2563EB',
}: AchievementCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={[styles.iconBg, { backgroundColor: `${badgeColor}15` }]}>
          <SymbolView
            name={iconName}
            size={20}
            tintColor={badgeColor}
          />
        </View>

        {isCompleted ? (
          <View style={styles.completedBadge}>
            <SymbolView
              name={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' } as const}
              size={14}
              tintColor="#16A34A"
            />
            <Text style={styles.completedText}>Done</Text>
          </View>
        ) : (
          <View style={styles.inProgressBadge}>
            <Text style={styles.inProgressText}>{progressPercent}%</Text>
          </View>
        )}
      </View>

      <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
      <Text style={styles.categoryText} numberOfLines={1}>{category}</Text>

      {/* Progress track */}
      <View style={styles.track}>
        <View 
          style={[
            styles.fill, 
            { 
              width: `${progressPercent}%`,
              backgroundColor: isCompleted ? '#16A34A' : badgeColor,
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = createStyles((t) => ({
  card: {
    width: 160,
    backgroundColor: t.colors.card,
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    padding: t.spacing.md,
    marginRight: t.spacing.sm,
    ...t.shadows.xs,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: t.spacing.xs,
  },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: t.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: t.radius.full,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  completedText: {
    ...t.typography.caption,
    fontSize: 10,
    fontWeight: '600',
    color: '#15803D',
  },
  inProgressBadge: {
    backgroundColor: t.colors.surface,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: t.radius.full,
  },
  inProgressText: {
    ...t.typography.caption,
    fontSize: 10,
    fontWeight: '600',
    color: t.colors.text.secondary,
  },
  titleText: {
    ...t.typography.bodySmall,
    color: t.colors.text.primary,
    fontWeight: '700',
    fontSize: 13,
    marginTop: t.spacing.xs,
  },
  categoryText: {
    ...t.typography.caption,
    color: t.colors.text.tertiary,
    fontSize: 11,
    marginBottom: t.spacing.xs,
  },
  track: {
    height: 4,
    width: '100%',
    borderRadius: t.radius.full,
    backgroundColor: t.colors.surface,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: t.radius.full,
  },
}));
