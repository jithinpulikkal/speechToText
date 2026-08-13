import React from "react";
import { Text, View } from "react-native";
import tw from "twrnc";

export default function StatusBadge({ status }) {
  return <View style={tw`px-3 py-1 rounded-full bg-slate-200`}><Text style={tw`text-slate-700 font-semibold`}>{status}</Text></View>;
}
