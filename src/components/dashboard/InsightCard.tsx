import React from 'react';
import { View, Text } from 'react-native';
import { SymbolView } from 'expo-symbols';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { createStyles } from '@/theme';

export function InsightCard() {
  return (
    <Animated.View
      entering={FadeInUp.duration(400).delay(800).springify().damping(18)}
      style={styles.card}
    >
      <View style={styles.iconWrap}>
        <SymbolView
          name={{ ios: 'lightbulb', android: 'lightbulb', web: 'lightbulb' }}
          size={20}
          tintColor="#F59E0B"
          weight="medium"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Smart Insight</Text>
        <Text style={styles.description}>
          You spent 18% less on food this week. Keep it up!
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = createStyles((t) => ({
  card: {
    flexDirection: 'row',
    marginHorizontal: t.spacing.xxl,
    borderRadius: t.radius.lg,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    padding: t.spacing.lg,
    alignItems: 'center',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: t.radius.sm,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: t.spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 18,
    color: '#92400E',
    letterSpacing: 0,
    marginBottom: 2,
  },
  description: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: '#A16207',
    letterSpacing: 0,
  },
}));
