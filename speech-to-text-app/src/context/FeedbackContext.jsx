import React, { createContext, useContext, useMemo, useState } from "react";
import { Text, View } from "react-native";
import tw from "twrnc";

const FeedbackContext = createContext(null);

export function FeedbackProvider({ children }) {
  const [message, setMessage] = useState("");
  const show = text => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  };
  const value = useMemo(() => ({ show }), []);
  return (
    <FeedbackContext.Provider value={value}>
      {children}
      {!!message && (
        <View style={tw`absolute left-4 right-4 bottom-8 bg-slate-900 p-3 rounded-lg`}>
          <Text style={tw`text-white text-center`}>{message}</Text>
        </View>
      )}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  return useContext(FeedbackContext);
}
