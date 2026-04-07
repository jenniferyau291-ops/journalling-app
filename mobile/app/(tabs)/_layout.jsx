
import { Tabs } from "expo-router"; // let you have tabs
import { Ionicons } from "@expo/vector-icons"; // icons for tabs

import COLOURS from "../../constants/colours";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // safe area padding for phones

export default function TabLayout() {
  const insets = useSafeAreaInsets(); // how much space at bottom so tabs dont overlap 

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLOURS.primary,
        headerTitleStyle: {
          color: COLOURS.textPrimary,
          fontWeight: "600",
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: COLOURS.cardBackground,
          borderTopWidth: 1,
          borderTopColor: COLOURS.border,
          paddingTop: 5,
          paddingBottom: insets.bottom,
          height: 60 + insets.bottom,
        },
      }}
    >
         <Tabs.Screen
        name="index"
         options={{
          title: "Home",
          tabBarIcon: ({ colour, size }) => (
            <Ionicons name="home-outline" size={size} color={colour} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
         options={{
          title: "Create",
          tabBarIcon: ({ colour, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={colour} />
          ),
        }}
      />
       <Tabs.Screen
        name="graph"
         options={{
          title: "Mood Tracker",
          tabBarIcon: ({ colour, size }) => (
            <Ionicons name="trending-up-outline" size={size} color={colour} />
          ),
        }}

      />
      <Tabs.Screen
        name="profile"
         options={{
          title: "Profile",
          tabBarIcon: ({ colour, size }) => (
            <Ionicons name="person-outline" size={size} color={colour} />
          ),
        }}
      />
  
    </Tabs>
  );
}