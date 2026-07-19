import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="onboarding/security"
        options={{ animation: 'slide_from_right' }}
      />
    </Stack>
  );
}
