import React from 'react';
// QuickActionCard component
import { View, Text, Pressable } from 'react-native';
import { SymbolView } from 'expo-symbols';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming 
} from 'react-native-reanimated';
import { createStyles, hexToRgba } from '@/theme';

export interface QuickActionCardProps {
  readonly title: string;
  readonly iconName: React.ComponentProps<typeof SymbolView>['name'];
  readonly iconColor?: string;
  readonly onPress?: () => void;
}

export function QuickActionCard({
  title,
  iconName,
  iconColor = '#2563EB',
  onPress,
}: QuickActionCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPressIn={() => { scale.value = withTiming(0.95, { duration: 100 }); }}
        onPressOut={() => { scale.value = withTiming(1, { duration: 150 }); }}
        onPress={onPress}
        style={styles.pressable}
      >
        <Animated.View style={[styles.card, animatedStyle]}>
          <View style={[styles.iconBox, { backgroundColor: `${iconColor}15` }]}>
            <SymbolView
              name={iconName}
              size={20}
              tintColor={iconColor}
            />
          </View>
          <Text style={styles.titleText} numberOfLines={2}>{title}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = createStyles((t) => ({
  wrapper: {
    flex: 1,
    minWidth: '46%',
    margin: t.spacing.xs,
  },
  pressable: {
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: hexToRgba(t.colors.background, 0.9),
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: hexToRgba(t.colors.border, 0.9),
    padding: t.spacing.md,
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 90,
    ...t.shadows.xs,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: t.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: t.spacing.xs,
  },
  titleText: {
    ...t.typography.bodySmall,
    color: t.colors.text.primary,
    fontWeight: '600',
    fontSize: 13,
  },
}));
