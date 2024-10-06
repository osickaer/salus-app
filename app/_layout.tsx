import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Stack, Tabs } from 'expo-router';
import { supabase } from '../lib/supabase';
import Auth from '../components/Auth'; // Your Auth component
import * as SplashScreen from 'expo-splash-screen';
import { Session } from '@supabase/supabase-js';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Fetch session when the component mounts
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);

        // Subscribe to authentication changes
        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
        });
      } catch (e) {
        console.error(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync(); // Hide splash screen after app is ready
      }
    };

    prepareApp();
  }, []);

  // If the app is not ready, return null to continue showing the splash screen
  if (!appIsReady) {
    return null;
  }

  // If the user is authenticated, show the tab navigator; otherwise, show the Auth component
  return session && session.user ? (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
  ) : (
    <Auth />
  );
}
