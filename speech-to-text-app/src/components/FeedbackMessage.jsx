import React from "react";
import { Text } from "react-native";
import tw from "twrnc";

export default function FeedbackMessage({ children }) {
  return children ? <Text style={tw`text-red-600 my-2`}>{children}</Text> : null;
}
