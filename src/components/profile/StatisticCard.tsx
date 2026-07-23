/** StatisticCard component */
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SymbolView } from 'expo-symbols';
import Animated, { 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming 
} from 'react-native-reanimated';
import { createStyles } from '@/theme';

export interface StatisticCardProps {
  readonly label: string;
  readonly value: string | number;
  readonly iconName: React.ComponentProps<typeof SymbolView>['name'];
  readonly iconColor?: string;
  readonly delay?: number;
  readonly onPress?: () => void;
}

export function StatisticCard({
  label,
  value,
  iconName,
  iconColor = '#2563EB',
  delay = 0,
  onPress,
}: StatisticCardProps) {
  const scale = useSharedValue(1);

  const animatedScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(delay)} style={styles.wrapper}>
      <Pressable
        onPressIn={() => { scale.value = withTiming(0.96, { duration: 100 }); }}
        onPressOut={() => { scale.value = withTiming(1, { duration: 150 }); }}
        onPress={onPress}
        style={styles.pressable}
      >
        <Animated.View style={[styles.card, animatedScaleStyle]}>
          <View style={styles.topRow}>
            <View style={[styles.iconBg, { backgroundColor: `${iconColor}15` }]}>
              <SymbolView
                name={iconName}
                size={18}
                tintColor={iconColor}
              />
            </View>
          </View>
          <Text style={styles.valueText} numberOfLines={1}>{value}</Text>
          <Text style={styles.labelText} numberOfLines={1}>{label}</Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
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
    backgroundColor: t.colors.card,
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    padding: t.spacing.md,
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
    width: 34,
    height: 34,
    borderRadius: t.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    ...t.typography.h3,
    color: t.colors.text.primary,
    fontWeight: '700',
    fontSize: 20,
    marginTop: t.spacing.xxs,
  },
  labelText: {
    ...t.typography.caption,
    color: t.colors.text.secondary,
    marginTop: 2,
    fontWeight: '500',
  },
}));
