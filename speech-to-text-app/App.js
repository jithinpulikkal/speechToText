import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { FeedbackProvider } from "./src/context/FeedbackContext";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";

function Root() {
  const { isDark } = useTheme();
  return (
    <NavigationContainer>
      <StatusBar style={isDark ? "light" : "dark"} />
      <FeedbackProvider>
        <AppNavigator />
      </FeedbackProvider>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  );
}
