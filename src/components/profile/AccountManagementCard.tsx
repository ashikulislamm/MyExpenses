import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SymbolView } from 'expo-symbols';
import { StorageService } from '@/services/storage/storage.service';
import { useSecurityStore } from '@/stores/security.store';
import { useAppStore } from '@/stores/app.store';
import { useProfileStore } from '@/features/profile/store/profile.store';
import { createStyles, colors } from '@/theme';

export function AccountManagementCard() {
  const handleWipeData = () => {
    Alert.alert(
      'Wipe Out All Data',
      'This will permanently delete all your local database profile records, transaction history, budget targets, and security settings. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Everything',
          style: 'destructive',
          onPress: async () => {
            try {
              // 1. Clear SQLite profile record & store
              await useProfileStore.getState().clearProfile();

              // 2. Wipe local storage and secure store
              await StorageService.clearAll();

              // 3. Reset application and security state
              useSecurityStore.getState().reset();
              useAppStore.getState().reset();

              Alert.alert('Data Wiped', 'All SQLite records and local profile settings have been deleted.');
            } catch {
              Alert.alert('Error', 'An error occurred while deleting data.');
            }
          },
        },
      ]
    );
  };

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(280)} style={styles.container}>
      <Text style={styles.sectionTitle}>Account Management</Text>

      <View style={styles.groupedList}>
        <View style={styles.row}>
          <View style={styles.leftGroup}>
            <View style={[styles.iconContainer, { backgroundColor: '#FEF2F2' }]}>
              <SymbolView
                name={{ ios: 'trash.fill', android: 'delete', web: 'delete' }}
                size={18}
                tintColor="#EF4444"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Wipe Out All Data</Text>
              <Text style={styles.subtitle}>Reset database and delete all local data</Text>
            </View>
          </View>

          <Pressable
            onPress={handleWipeData}
            style={({ pressed }) => [
              styles.wipeButton,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Wipe Out All Data Button"
          >
            <Text style={styles.wipeButtonText}>Reset</Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  container: {
    width: '100%',
    paddingHorizontal: t.spacing.md,
    marginBottom: t.spacing.lg,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: t.colors.text.primary,
    marginBottom: t.spacing.xs,
    paddingHorizontal: t.spacing.xs,
  },
  groupedList: {
    width: '100%',
    backgroundColor: t.colors.card,
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    paddingHorizontal: t.spacing.md,
    paddingVertical: t.spacing.xs,
    ...t.shadows.xs,
  },
  row: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: t.spacing.xs,
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
  subtitle: {
    ...t.typography.caption,
    fontSize: 12,
    color: t.colors.text.tertiary,
    marginTop: 1,
  },
  wipeButton: {
    paddingHorizontal: t.spacing.md,
    paddingVertical: 6,
    borderRadius: t.radius.full,
    borderWidth: 1,
    borderColor: colors.danger,
    backgroundColor: '#FEF2F2',
  },
  wipeButtonText: {
    ...t.typography.caption,
    fontWeight: '600',
    color: colors.danger,
  },
  pressed: {
    opacity: t.opacity.pressed,
  },
}));
