import React from "react";
import { Text, Pressable, View } from "react-native";
import tw from "twrnc";
import { LANGUAGES } from "../utils/constants";

export default function LanguageSelector({ value, onChange }) {
  return (
    <View style={tw`flex-row flex-wrap gap-2`}>
      {LANGUAGES.map(lang => (
        <Pressable key={lang.code} onPress={() => onChange(lang.code)} style={tw`px-3 py-2 rounded-lg border ${value === lang.code ? "bg-blue-600 border-blue-600" : "border-slate-300"}`}>
          <Text style={tw`${value === lang.code ? "text-white" : "text-slate-700"}`}>{lang.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
