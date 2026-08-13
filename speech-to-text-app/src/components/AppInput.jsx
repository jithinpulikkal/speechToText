import React from "react";
import { TextInput } from "react-native";
import tw from "twrnc";
import { useTheme } from "../context/ThemeContext";

export default function AppInput(props) {
  const { theme, isDark } = useTheme();
  return (
    <TextInput
      placeholderTextColor={isDark ? "#94a3b8" : "#64748b"}
      {...props}
      style={[tw`border rounded-lg px-3 py-3 ${theme.input} ${theme.text}`, props.multiline && tw`min-h-32 text-top`, props.style]}
    />
  );
}
