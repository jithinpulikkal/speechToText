import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import tw from "twrnc";
import AppInput from "../../components/AppInput";
import Header from "../../components/Header";
import TranscriptionCard from "../../components/TranscriptionCard";
import { getTranscriptions } from "../../api/transcriptionApi";
import { useTheme } from "../../context/ThemeContext";

export default function HistoryScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const { theme } = useTheme();
  const load = async query => {
    const response = await getTranscriptions({ search: query || undefined });
    setItems(response.data.transcriptions);
  };
  useFocusEffect(useCallback(() => { load(search).catch(() => {}); }, []));
  return (
    <View style={tw`flex-1 p-5 ${theme.bg}`}>
      <Header title="History" />
      <AppInput placeholder="Search transcriptions" value={search} onChangeText={setSearch} onSubmitEditing={() => load(search)} />
      <FlatList
        style={tw`mt-4`}
        data={items}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <TranscriptionCard item={item} onPress={() => navigation.navigate("TranscriptionDetails", { id: item.id })} />}
      />
    </View>
  );
}
