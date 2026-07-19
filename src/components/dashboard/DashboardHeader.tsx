import React from 'react';
import { View, Text } from 'react-native';
import { SymbolView } from 'expo-symbols';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { createStyles } from '@/theme';

export function DashboardHeader() {
  return (
    <Animated.View entering={FadeInDown.duration(400)} style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.greeting}>Good Morning,</Text>
        <Text style={styles.name}>Alex</Text>
      </View>
      <View style={styles.right}>
        <View style={styles.avatar}>
          <SymbolView
            name={{ ios: 'person.crop.circle', android: 'person', web: 'person' }}
            size={22}
            tintColor="#475569"
            weight="medium"
          />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: t.spacing.xxl,
    paddingTop: t.spacing.lg,
    paddingBottom: t.spacing.xs,
  },
  left: {
    flex: 1,
  },
  greeting: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: t.colors.text.tertiary,
    letterSpacing: -0.1,
  },
  name: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 28,
    color: t.colors.text.primary,
    letterSpacing: -0.3,
    marginTop: t.spacing.xxs,
  },
  right: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
