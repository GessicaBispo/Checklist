import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BASE_COLORS } from '@/styles/base';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const currentTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const customTheme = {
    ...currentTheme,
    colors: {
      ...currentTheme.colors,
      background: '#F2F2F2',
    },
  };

  return (
    <AuthProvider>
      <ThemeProvider value={customTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="dark" backgroundColor={BASE_COLORS.surface} />
      </ThemeProvider>
    </AuthProvider>
  );
}
