import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { createStyles, colors } from '@/theme';
import { useProfileStore } from '@/features/profile/store/profile.store';
import { AvatarService } from '@/features/profile/services/avatar.service';

export interface ProfileHeaderProps {
  readonly onEditName?: () => void;
}

export function ProfileHeader({ onEditName }: ProfileHeaderProps) {
  const { profile, updateAvatar } = useProfileStore();

  const handleSettingsPress = () => {
    router.push('/settings' as any);
  };

  const handleEditAvatar = async () => {
    const fileUri = await AvatarService.pickAvatar();
    if (fileUri) {
      await updateAvatar(fileUri);
    }
  };

  const displayName = profile?.name ?? 'User Profile';
  const displayTenure = profile?.trackingSince ?? 'July 2026';
  const initial = displayName.trim().charAt(0).toUpperCase() || 'A';

  return (
    <Animated.View entering={FadeInDown.duration(400)} style={styles.container}>
      {/* Top Bar with Translucent Settings Button */}
      <View style={styles.topBar}>
        <View style={{ flex: 1 }} />
        <Pressable
          onPress={handleSettingsPress}
          style={({ pressed }) => [
            styles.settingsButton,
            pressed && styles.pressed,
          ]}
          accessibilityLabel="Open Settings"
          accessibilityRole="button"
        >
          <SymbolView
            name={{ ios: 'gearshape', android: 'settings', web: 'settings' }}
            size={20}
            tintColor={colors.text.secondary}
          />
        </Pressable>
      </View>

      {/* Hero Body */}
      <View style={styles.heroBody}>
        {/* Avatar Container with Camera Overlay */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            {profile?.avatarUri ? (
              <Image source={{ uri: profile.avatarUri }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarInitial}>{initial}</Text>
            )}
          </View>
          <Pressable
            onPress={handleEditAvatar}
            style={({ pressed }) => [
              styles.cameraBadge,
              pressed && styles.pressed,
            ]}
            accessibilityLabel="Change Profile Picture"
            accessibilityRole="button"
          >
            <SymbolView
              name={{ ios: 'camera.fill', android: 'photo_camera', web: 'photo_camera' }}
              size={12}
              tintColor="#FFFFFF"
            />
          </Pressable>
        </View>

        {/* User Name */}
        <Text style={styles.name}>{displayName}</Text>

        {/* Edit Profile Button */}
        <Pressable
          onPress={onEditName}
          style={({ pressed }) => [
            styles.editProfileButton,
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Edit Profile Name"
        >
          <SymbolView
            name={{ ios: 'pencil', android: 'edit', web: 'edit' }}
            size={12}
            tintColor={colors.text.secondary}
          />
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </Pressable>

        {/* Tenure Subtitle */}
        <Text style={styles.tenureText}>Tracking since {displayTenure}</Text>
      </View>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  container: {
    width: '100%',
    paddingHorizontal: t.spacing.md,
    paddingTop: t.spacing.xs,
    marginBottom: t.spacing.lg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: t.spacing.xs,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: t.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: t.colors.border,
    ...t.shadows.xs,
  },
  heroBody: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: t.spacing.sm,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: t.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...t.shadows.sm,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarInitial: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 32,
    color: t.colors.primary,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: t.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: t.colors.background,
  },
  name: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 30,
    color: t.colors.text.primary,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: t.spacing.md,
    paddingVertical: 5,
    borderRadius: t.radius.full,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.surface,
    marginBottom: 6,
  },
  editProfileText: {
    ...t.typography.caption,
    fontWeight: '600',
    color: t.colors.text.secondary,
  },
  tenureText: {
    ...t.typography.caption,
    color: t.colors.text.tertiary,
  },
  pressed: {
    opacity: t.opacity.pressed,
  },
}));
