import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, History, Settings } from "lucide-react-native";
import SpeechToTextScreen from "../screens/user/SpeechToTextScreen";
import HistoryScreen from "../screens/user/HistoryScreen";
import TranscriptionDetailsScreen from "../screens/user/TranscriptionDetailsScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import { useTheme } from "../context/ThemeContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function UserTabs() {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: theme.tabInactive,
        tabBarStyle: {
          backgroundColor: theme.tabBg,
          borderTopColor: theme.tabBorder,
          height: 76,
          paddingTop: 8,
          paddingBottom: 12
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 2
        },
        tabBarItemStyle: {
          paddingVertical: 4
        }
      }}
    >
      <Tab.Screen name="Home" component={SpeechToTextScreen} options={{ tabBarIcon: p => <Home color={p.color} size={22} /> }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ tabBarIcon: p => <History color={p.color} size={22} /> }} />
      <Tab.Screen name="Settings" component={ProfileScreen} options={{ tabBarIcon: p => <Settings color={p.color} size={22} /> }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserTabs" component={UserTabs} />
      <Stack.Screen name="TranscriptionDetails" component={TranscriptionDetailsScreen} />
    </Stack.Navigator>
  );
}
