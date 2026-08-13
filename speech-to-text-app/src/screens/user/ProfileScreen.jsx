import React from "react";
import { Text, View } from "react-native";
import tw from "twrnc";
import AppButton from "../../components/AppButton";
import Header from "../../components/Header";
import { useTheme } from "../../context/ThemeContext";

export default function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();
  return (
    <View style={tw`flex-1 p-5 ${theme.bg}`}>
      <Header title="Settings" />
      <Text style={tw`text-lg font-bold ${theme.text}`}>Local speech workspace</Text>
      <Text style={tw`mb-5 ${theme.muted}`}>Record, edit, save, and manage transcriptions without an account.</Text>
      <View style={tw`gap-3 mt-4`}>
        <AppButton title="Toggle Theme" variant="ghost" onPress={toggleTheme} />
      </View>
    </View>
  );
}
