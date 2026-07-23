/** FinancialJourneyCard component */
import React from 'react';
import { View, Text } from 'react-native';
import { SymbolView } from 'expo-symbols';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { createStyles, hexToRgba } from '@/theme';

export interface FinancialJourneyCardProps {
  readonly trackingSince?: string;
  readonly streakDays?: number;
  readonly targetDays?: number;
}

export function FinancialJourneyCard({
  trackingSince = 'January 2026',
  streakDays = 47,
  targetDays = 60,
}: FinancialJourneyCardProps) {
  const progressPercent = Math.min(Math.round((streakDays / targetDays) * 100), 100);

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(100)} style={styles.container}>
      <View style={styles.card}>
        {/* Top Header Row */}
        <View style={styles.headerRow}>
          <View style={styles.titleGroup}>
            <SymbolView
              name={{ ios: 'flame.fill', android: 'local_fire_department', web: 'local_fire_department' }}
              size={18}
              tintColor="#EA580C"
            />
            <Text style={styles.cardTitle}>{streakDays} Day Tracking Streak</Text>
          </View>
          <Text style={styles.sinceText}>Since {trackingSince}</Text>
        </View>

        {/* Motivational Subtext */}
        <Text style={styles.description}>
          You&apos;re building healthy financial habits. Keep logging daily to hit your 60-day milestone!
        </Text>

        {/* Progress Bar Milestone */}
        <View style={styles.progressContainer}>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressLabel}>Streak Goal</Text>
            <Text style={styles.progressValue}>
              {streakDays} / {targetDays} Days ({progressPercent}%)
            </Text>
          </View>

          <View style={styles.track}>
            <View style={[styles.fill, { width: `${progressPercent}%` }]} />
          </View>
        </View>

        {/* Floating Mini Milestone Indicators */}
        <View style={styles.milestonesRow}>
          <View style={styles.milestoneItem}>
            <View style={[styles.milestoneDot, styles.milestoneAchieved]} />
            <Text style={styles.milestoneText}>30d Hero</Text>
          </View>
          <View style={styles.milestoneItem}>
            <View style={[styles.milestoneDot, styles.milestoneAchieved]} />
            <Text style={styles.milestoneText}>45d Pro</Text>
          </View>
          <View style={styles.milestoneItem}>
            <View style={[styles.milestoneDot, styles.milestoneTarget]} />
            <Text style={styles.milestoneText}>60d Master</Text>
          </View>
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
  card: {
    width: '100%',
    backgroundColor: t.colors.background,
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    padding: t.spacing.lg,
    ...t.shadows.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: t.spacing.xs,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardTitle: {
    ...t.typography.title,
    color: t.colors.text.primary,
    fontWeight: '700',
    fontSize: 16,
  },
  sinceText: {
    ...t.typography.caption,
    color: t.colors.text.tertiary,
    fontSize: 12,
  },
  description: {
    ...t.typography.bodySmall,
    color: t.colors.text.secondary,
    lineHeight: 18,
    marginBottom: t.spacing.md,
  },
  progressContainer: {
    marginBottom: t.spacing.xs,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    ...t.typography.caption,
    fontWeight: '600',
    color: t.colors.text.secondary,
  },
  progressValue: {
    ...t.typography.caption,
    fontWeight: '600',
    color: t.colors.primary,
  },
  track: {
    height: 8,
    width: '100%',
    borderRadius: t.radius.full,
    backgroundColor: t.colors.surface,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: t.radius.full,
    backgroundColor: t.colors.primary,
  },
  milestonesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: t.spacing.sm,
    paddingTop: t.spacing.xs,
    borderTopWidth: 1,
    borderTopColor: t.colors.divider,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  milestoneDot: {
    width: 6,
    height: 6,
    borderRadius: t.radius.full,
  },
  milestoneAchieved: {
    backgroundColor: '#16A34A',
  },
  milestoneTarget: {
    backgroundColor: t.colors.text.disabled,
  },
  milestoneText: {
    ...t.typography.caption,
    fontSize: 11,
    color: t.colors.text.tertiary,
  },
}));
