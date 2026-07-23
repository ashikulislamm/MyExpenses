/** AchievementSection component */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AchievementCard } from './AchievementCard';
import { createStyles } from '@/theme';

export function AchievementSection() {
  const achievements = [
    {
      id: '1',
      title: 'First Expense',
      category: 'Getting Started',
      isCompleted: true,
      progressPercent: 100,
      iconName: { ios: 'trophy.fill', android: 'emoji_events', web: 'emoji_events' } as const,
      badgeColor: '#F59E0B',
    },
    {
      id: '2',
      title: '30 Day Streak',
      category: 'Habit Builder',
      isCompleted: true,
      progressPercent: 100,
      iconName: { ios: 'flame.fill', android: 'local_fire_department', web: 'local_fire_department' } as const,
      badgeColor: '#EA580C',
    },
    {
      id: '3',
      title: 'Budget Master',
      category: 'Financial Discipline',
      isCompleted: true,
      progressPercent: 100,
      iconName: { ios: 'dollarsign.circle.fill', android: 'savings', web: 'savings' } as const,
      badgeColor: '#16A34A',
    },
    {
      id: '4',
      title: '100 Logs Added',
      category: 'Tracker Veteran',
      isCompleted: true,
      progressPercent: 100,
      iconName: { ios: 'chart.bar.fill', android: 'analytics', web: 'analytics' } as const,
      badgeColor: '#2563EB',
    },
    {
      id: '5',
      title: 'Savings Goal',
      category: 'In Progress',
      isCompleted: false,
      progressPercent: 75,
      iconName: { ios: 'target', android: 'track_changes', web: 'track_changes' } as const,
      badgeColor: '#0EA5E9',
    },
  ];

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(250)} style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Milestones & Achievements</Text>
        <Text style={styles.countTag}>4 of 5 Unlocked</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {achievements.map((item) => (
          <AchievementCard
            key={item.id}
            title={item.title}
            category={item.category}
            isCompleted={item.isCompleted}
            progressPercent={item.progressPercent}
            iconName={item.iconName}
            badgeColor={item.badgeColor}
          />
        ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  container: {
    width: '100%',
    marginBottom: t.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: t.spacing.lg,
    marginBottom: t.spacing.xs,
  },
  sectionTitle: {
    ...t.typography.subtitle,
    color: t.colors.text.primary,
    fontWeight: '700',
  },
  countTag: {
    ...t.typography.caption,
    color: t.colors.primary,
    fontWeight: '600',
    fontSize: 12,
  },
  scrollContent: {
    paddingLeft: t.spacing.md,
    paddingRight: t.spacing.xs,
    paddingVertical: t.spacing.xxs,
  },
}));
