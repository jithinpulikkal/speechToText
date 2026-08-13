import React from "react";
import { Text, View } from "react-native";
import tw from "twrnc";
import { useTheme } from "../context/ThemeContext";

export default function Header({ title, right }) {
  const { theme } = useTheme();
  return <View style={tw`flex-row items-center justify-between mb-4`}><Text style={tw`text-2xl font-bold ${theme.text}`}>{title}</Text>{right}</View>;
}
