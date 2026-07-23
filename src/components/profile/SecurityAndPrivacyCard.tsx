import React from 'react';
import { View, Text, Switch, Alert, Platform } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SymbolView } from 'expo-symbols';
import { useSecurityStore } from '@/stores/security.store';
import { StorageService } from '@/services/storage/storage.service';
import { BiometricService } from '@/services/security/biometric.service';
import { AuthenticationStatus } from '@/types/security.types';
import { createStyles, colors } from '@/theme';

export function SecurityAndPrivacyCard() {
  const { biometricEnabled, setBiometricEnabled } = useSecurityStore();

  const handleToggle = async (newValue: boolean) => {
    if (newValue) {
      const isHardwareAvailable = await BiometricService.isAvailable();
      if (!isHardwareAvailable && Platform.OS !== 'web') {
        Alert.alert(
          'Biometrics Not Available',
          'Biometric authentication is not supported or not set up on this device.'
        );
        return;
      }

      const result = await BiometricService.authenticate({
        promptMessage: 'Confirm identity to enable security protection',
        cancelLabel: 'Cancel',
        disableDeviceFallback: true,
      });

      if (result.status === AuthenticationStatus.Success) {
        setBiometricEnabled(true);
        await StorageService.setBiometricEnabled(true);
      } else if (result.status !== AuthenticationStatus.Cancelled) {
        Alert.alert('Verification Failed', 'Could not authenticate your identity.');
      }
    } else {
      setBiometricEnabled(false);
      await StorageService.setBiometricEnabled(false);
    }
  };

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(220)} style={styles.container}>
      <Text style={styles.sectionTitle}>Security & Privacy</Text>

      <View style={styles.groupedList}>
        <View style={styles.row}>
          <View style={styles.leftGroup}>
            <View style={[styles.iconContainer, { backgroundColor: '#ECFDF5' }]}>
              <SymbolView
                name={{ ios: 'faceid', android: 'fingerprint', web: 'fingerprint' }}
                size={18}
                tintColor="#059669"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Biometric Authentication</Text>
              <Text style={styles.subtitle}>Require Face ID or Fingerprint to unlock</Text>
            </View>
          </View>

          <Switch
            value={biometricEnabled}
            onValueChange={handleToggle}
            trackColor={{ false: colors.border, true: '#86EFAC' }}
            thumbColor={biometricEnabled ? colors.success : colors.text.muted}
            ios_backgroundColor={colors.border}
            accessibilityLabel="Biometric Authentication Toggle"
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
}));
