import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { FeedbackProvider } from "./src/context/FeedbackContext";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";
import AppSplash from "./src/components/AppSplash";

function Root() {
  const { isDark } = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setShowSplash(false), 1400);
    return () => clearTimeout(id);
  }, []);

  if (showSplash) {
    return (
      <>
        <StatusBar style="light" />
        <AppSplash />
      </>
    );
  }

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
