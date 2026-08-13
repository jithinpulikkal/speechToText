import React from "react";
import { Pressable, Text, View } from "react-native";
import tw from "twrnc";
import { formatDate, formatDuration } from "../utils/dateUtils";
import { useTheme } from "../context/ThemeContext";

export default function TranscriptionCard({ item, onPress }) {
  const { theme } = useTheme();
  return (
    <Pressable onPress={onPress} style={tw`p-4 rounded-lg border mb-3 ${theme.card} ${theme.border}`}>
      <Text style={tw`font-bold text-lg ${theme.text}`}>{item.title}</Text>
      <Text numberOfLines={2} style={tw`my-2 ${theme.muted}`}>{item.transcriptionText}</Text>
      <View style={tw`flex-row justify-between`}>
        <Text style={tw`${theme.muted}`}>{formatDate(item.createdAt)}</Text>
        <Text style={tw`${theme.muted}`}>{formatDuration(item.durationSeconds)} | {item.languageCode}</Text>
      </View>
    </Pressable>
  );
}
