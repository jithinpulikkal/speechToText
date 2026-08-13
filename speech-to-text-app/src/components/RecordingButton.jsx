import React from "react";
import { Pressable } from "react-native";
import { Mic } from "lucide-react-native";
import tw from "twrnc";

export default function RecordingButton({ active, onPress }) {
  return <Pressable onPress={onPress} style={tw`w-28 h-28 rounded-full items-center justify-center ${active ? "bg-red-600" : "bg-blue-600"}`}><Mic size={44} color="#fff" /></Pressable>;
}
