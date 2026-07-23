/** RecentActivitySection component */
import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ActivityRow } from './ActivityRow';
import { createStyles } from '@/theme';

export function RecentActivitySection() {
  const activities = [
    {
      id: '1',
      title: 'Backup Exported',
      time: '2 hours ago',
      iconName: { ios: 'square.and.arrow.up', android: 'upload', web: 'upload' } as const,
    },
    {
      id: '2',
      title: 'Budget Updated to ৳ 50,000',
      time: '3 days ago',
      iconName: { ios: 'pencil', android: 'edit', web: 'edit' } as const,
    },
    {
      id: '3',
      title: 'Custom Category Added',
      time: '5 days ago',
      iconName: { ios: 'folder.badge.plus', android: 'create_new_folder', web: 'create_new_folder' } as const,
    },
    {
      id: '4',
      title: 'Preferred Currency Set (BDT)',
      time: '1 week ago',
      iconName: { ios: 'globe', android: 'language', web: 'language' } as const,
    },
    {
      id: '5',
      title: 'Profile Initialized',
      time: 'Jan 15, 2026',
      iconName: { ios: 'person.badge.shield.checkmark', android: 'verified_user', web: 'verified_user' } as const,
    },
  ];

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(350)} style={styles.container}>
      <Text style={styles.sectionTitle}>Recent Activity Log</Text>

      <View style={styles.card}>
        {activities.map((item, index) => (
          <ActivityRow
            key={item.id}
            title={item.title}
            time={item.time}
            iconName={item.iconName}
            isLast={index === activities.length - 1}
          />
        ))}
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
  card: {
    width: '100%',
    backgroundColor: t.colors.card,
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    overflow: 'hidden',
    ...t.shadows.xs,
  },
}));
