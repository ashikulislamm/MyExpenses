import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useInit } from '@/hooks/useInit';
import { useAppStore } from '@/stores/app.store';
import { createStyles } from '@/theme';

export default function InitGate() {
  useInit();
  const status = useAppStore((s) => s.status);

  useEffect(() => {
    if (status === 'onboarding') {
      router.replace('/(onboarding)/welcome');
    } else if (status === 'authenticating') {
      router.replace('/(auth)/unlock');
    } else if (status === 'ready') {
      router.replace('/(tabs)');
    }
  }, [status]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#2563EB" />
    </View>
  );
}

const styles = createStyles((t) => ({
  container: {
    flex: 1,
    backgroundColor: t.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
