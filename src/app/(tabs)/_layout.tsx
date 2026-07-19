import { View } from 'react-native';
import { Stack } from 'expo-router';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { createStyles } from '@/theme';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="transactions" />
          <Stack.Screen name="analytics" />
          <Stack.Screen name="profile" />
        </Stack>
      </View>
      <BottomNavigation />
    </View>
  );
}

const styles = createStyles((t) => ({
  container: {
    flex: 1,
    backgroundColor: t.colors.background,
  },
  content: {
    flex: 1,
  },
}));
