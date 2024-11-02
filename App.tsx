import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';
import queryClient from './QueryClient';
import { CourseProvider } from './app/context/CourseContext';
import { FileProvider } from './app/context/FileContext';
import { FolderProvider } from './app/context/FolderContext';
import { ReminderProvider } from './app/context/ReminderContext';
import { TodoProvider } from './app/context/TodoContext';
import { UserProvider } from './app/context/UserContext';
import Router from './app/routes/router';

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter Regular': Inter_400Regular,
    'Inter Medium': Inter_500Medium,
    'Inter Semibold': Inter_600SemiBold,
    'Inter Bold': Inter_700Bold,
    'Inter Black': Inter_900Black,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider config={config}>
        <NavigationContainer onReady={onLayoutRootView}>
          <UserProvider>
            <CourseProvider>
              <FolderProvider>
                <ReminderProvider>
                  <FileProvider>
                    <TodoProvider>
                      <Router />
                    </TodoProvider>
                  </FileProvider>
                </ReminderProvider>
              </FolderProvider>
            </CourseProvider>
          </UserProvider>
        </NavigationContainer>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
