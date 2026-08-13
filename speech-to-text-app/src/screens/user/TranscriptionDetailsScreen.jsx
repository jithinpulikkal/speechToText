import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import ConfirmDialog from "../../components/ConfirmDialog";
import Header from "../../components/Header";
import { deleteTranscription, getTranscription, updateTranscription } from "../../api/transcriptionApi";
import { copyText } from "../../services/clipboardService";
import { shareText } from "../../services/shareService";
import { useFeedback } from "../../context/FeedbackContext";
import { useTheme } from "../../context/ThemeContext";

export default function TranscriptionDetailsScreen({ route, navigation }) {
  const [item, setItem] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { show } = useFeedback();
  const { theme } = useTheme();
  useEffect(() => { getTranscription(route.params.id).then(res => setItem(res.data.transcription)); }, [route.params.id]);
  if (!item) return null;
  const save = async () => {
    const res = await updateTranscription(item.id, item);
    setItem(res.data.transcription);
    show("Transcription updated.");
  };
  const confirmDelete = async () => {
    await deleteTranscription(item.id);
    show("Transcription deleted.");
    navigation.goBack();
  };

  const remove = () => setShowDeleteDialog(true);

  return (
    <ScrollView style={tw`flex-1 ${theme.bg}`} contentContainerStyle={tw`p-5`}>
      <Header title="Details" />
      <AppInput value={item.title} onChangeText={title => setItem({ ...item, title })} />
      <View style={tw`h-3`} />
      <AppInput multiline value={item.transcriptionText} onChangeText={transcriptionText => setItem({ ...item, transcriptionText })} />
      <View style={tw`gap-3 mt-4`}>
        <AppButton title="Save" onPress={save} disabled={!item.transcriptionText.trim()} />
        <AppButton title="Copy" variant="ghost" onPress={async () => { await copyText(item.transcriptionText); show("Transcription copied to clipboard."); }} />
        <AppButton title="Share" variant="ghost" onPress={() => shareText(item.transcriptionText, item.title)} />
        <AppButton title="Delete" variant="danger" onPress={remove} />
      </View>
      <ConfirmDialog
        visible={showDeleteDialog}
        title="Delete transcription?"
        message="This transcription will be permanently deleted."
        confirmText="Delete"
        danger
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
      />
    </ScrollView>
  );
}
