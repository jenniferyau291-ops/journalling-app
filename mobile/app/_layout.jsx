import { Slot, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";

import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter(); // move screens
  const segments = useSegments(); // what screen currently on 
  const { checkAuth, user, token, isCheckingAuth } = useAuthStore();


  //check if user logged in when app opens
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (segments.length === 0) return; // wait until router is ready

    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)"); // not logged in and not on login (auth screen) go to it 
    else if (isSignedIn && inAuthScreen) router.replace("/(tabs)"); // logged in and in auth screen to go to main app (tabs)
  }, [user, token, segments]);

  return (
// dont show anything until checks are done 
  <SafeAreaProvider>
  <SafeScreen>
  {isCheckingAuth ? null : <Slot />} 
</SafeScreen>
  <StatusBar style="dark" />
</SafeAreaProvider>
); }