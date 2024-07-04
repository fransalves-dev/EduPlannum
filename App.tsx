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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useCallback, useContext, useEffect } from 'react';
import { FIREBASE_AUTH } from './FirebaseConfig';
import queryClient from './QueryClient';
import { UserContext, UserProvider } from './app/context/userContext';
import Courses from './app/screens/Courses';
import Folders from './app/screens/Folders';
import LoginPage from './app/screens/Login';
import SignUpPage from './app/screens/SignUp';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const LoggedOutStack = createNativeStackNavigator();
const LoggedInStack = createNativeStackNavigator();

function LoggedOutLayout() {
  return (
    <LoggedOutStack.Navigator>
      <LoggedOutStack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <LoggedOutStack.Screen
        name="Cadastro"
        component={SignUpPage}
        options={{ headerShown: false }}
      />
    </LoggedOutStack.Navigator>
  );
}

function LoggedInLayout() {
  return (
    <LoggedInStack.Navigator>
      <LoggedInStack.Screen
        name="Matérias"
        component={Courses}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="Pastas"
        component={Folders}
        options={{ headerShown: false }}
      />
    </LoggedInStack.Navigator>
  );
}

export default function App() {
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext;
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
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
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
        <UserProvider>
          <NavigationContainer onReady={onLayoutRootView}>
            <Stack.Navigator initialRouteName="Login">
              {user ? (
                <Stack.Screen
                  name="LoggedIn"
                  component={LoggedInLayout}
                  options={{ headerShown: false }}
                />
              ) : (
                <Stack.Screen
                  name="LoggedOut"
                  component={LoggedOutLayout}
                  options={{ headerShown: false }}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
