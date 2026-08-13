import React from "react";
import { ImageBackground, View } from "react-native";
import tw from "twrnc";

export default function AppSplash() {
  return (
    <View style={tw`flex-1 bg-black`}>
      <ImageBackground
        source={require("../assets/splashScreen.png")}
        resizeMode="cover"
        style={tw`flex-1`}
      />
    </View>
  );
}
