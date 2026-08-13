import React from "react";
import { ActivityIndicator, Text, Pressable } from "react-native";
import tw from "twrnc";
import { useTheme } from "../context/ThemeContext";

export default function AppButton({ title, onPress, disabled, loading, variant = "primary", icon: Icon }) {
  const { isDark } = useTheme();
  const base = "min-h-12 px-4 rounded-lg flex-row items-center justify-center";
  const styles = variant === "ghost" ? `bg-transparent border ${isDark ? "border-neutral-600" : "border-slate-300"}` : variant === "danger" ? "bg-red-600" : "bg-blue-600";
  const text = variant === "ghost" ? (isDark ? "text-white" : "text-slate-700") : "text-white";
  const iconColor = variant === "ghost" ? (isDark ? "#fff" : "#334155") : "#fff";
  return (
    <Pressable onPress={onPress} disabled={disabled || loading} style={tw`${base} ${styles} ${disabled ? "opacity-50" : ""}`}>
      {loading ? <ActivityIndicator color="#fff" /> : Icon ? <Icon size={18} color={iconColor} style={tw`mr-2`} /> : null}
      <Text style={tw`${text} font-semibold`}>{title}</Text>
    </Pressable>
  );
}
