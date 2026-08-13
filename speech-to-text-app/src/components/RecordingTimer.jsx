import React from "react";
import { Text } from "react-native";
import tw from "twrnc";
import { formatDuration } from "../utils/dateUtils";

export default function RecordingTimer({ seconds }) {
  return <Text style={tw`text-lg font-semibold text-slate-500`}>{formatDuration(seconds)}</Text>;
}
