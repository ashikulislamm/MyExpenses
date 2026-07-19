import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { SymbolView } from 'expo-symbols';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { createStyles } from '@/theme';

interface ActionItem {
  readonly icon: string;
  readonly iconAndroid: string;
  readonly iconWeb: string;
  readonly label: string;
}

const actions: ActionItem[] = [
  { icon: 'minus.circle', iconAndroid: 'remove_circle', iconWeb: 'remove_circle', label: 'Add Expense' },
  { icon: 'plus.circle', iconAndroid: 'add_circle', iconWeb: 'add_circle', label: 'Add Income' },
  { icon: 'arrow.right.arrow.left', iconAndroid: 'swap_horiz', iconWeb: 'swap_horiz', label: 'Transfer' },
  { icon: 'doc.text.viewfinder', iconAndroid: 'document_scanner', iconWeb: 'document_scanner', label: 'Scan Receipt' },
];

export function QuickActions() {
  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <Animated.View
          key={action.label}
          entering={FadeInUp.duration(300).delay(200 + index * 80).springify().damping(18)}
          style={styles.buttonWrapper}
        >
          <Pressable
            onPress={() => {}}
            android_ripple={{ color: '#E2E8F0', borderless: true }}
            style={({ pressed }) => [
              styles.button,
              pressed && Platform.OS !== 'android' && styles.buttonPressed,
            ]}
          >
            <SymbolView
              name={{ ios: action.icon as any, android: action.iconAndroid as any, web: action.iconWeb as any }}
              size={22}
              tintColor="#2563EB"
              weight="medium"
            />
            <Text style={styles.label}>{action.label}</Text>
          </Pressable>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = createStyles((t) => ({
  container: {
    flexDirection: 'row',
    paddingHorizontal: t.spacing.xxl,
    gap: t.spacing.sm,
  },
  buttonWrapper: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: t.spacing.md,
    borderRadius: t.radius.md,
    backgroundColor: t.colors.backgroundSecondary,
    gap: t.spacing.xs,
    minHeight: 72,
  },
  buttonPressed: {
    backgroundColor: t.colors.surface,
    opacity: t.opacity.pressed,
  },
  label: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 14,
    color: t.colors.text.secondary,
    letterSpacing: 0,
    textAlign: 'center',
  },
}));
