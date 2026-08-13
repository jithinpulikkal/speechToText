import React from "react";
import { ActivityIndicator, View } from "react-native";
import tw from "twrnc";

export default function LoadingScreen() {
  return <View style={tw`flex-1 items-center justify-center`}><ActivityIndicator size="large" /></View>;
}
