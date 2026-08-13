import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import tw from "twrnc";
import AppButton from "../../components/AppButton";
import ConfirmDialog from "../../components/ConfirmDialog";
import AppInput from "../../components/AppInput";
import Header from "../../components/Header";
import LanguageSelector from "../../components/LanguageSelector";
import RecordingButton from "../../components/RecordingButton";
import RecordingTimer from "../../components/RecordingTimer";
import StatusBadge from "../../components/StatusBadge";
import { useFeedback } from "../../context/FeedbackContext";
import { useTheme } from "../../context/ThemeContext";
import useRecordingTimer from "../../hooks/useRecordingTimer";
import { createTranscription } from "../../api/transcriptionApi";
import { getItem, setItem } from "../../services/secureStorageService";
import { configureSpeechRecognition, destroySpeechRecognition, startListening, stopListening } from "../../services/speechRecognitionService";
import { STATUS } from "../../utils/constants";
import { getApiMessage } from "../../utils/apiErrors";

export default function SpeechToTextScreen() {
  const [status, setStatus] = useState(STATUS.READY);
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en-IN");
  const [saving, setSaving] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const committedTextRef = useRef("");
  const listening = status === STATUS.LISTENING;
  const timer = useRecordingTimer(listening);
  const { show } = useFeedback();
  const { theme } = useTheme();

  useEffect(() => {
    getItem("preferredLanguage").then(value => value && setLanguage(value));
    configureSpeechRecognition({
      onPartial: value => setText(appendSpeechText(committedTextRef.current, value)),
      onResult: value => {
        committedTextRef.current = appendSpeechText(committedTextRef.current, value);
        setText(committedTextRef.current);
      },
      onEnd: () => {
        setStatus(current => current === STATUS.LISTENING ? STATUS.COMPLETED : current);
      },
      onError: message => { setStatus(STATUS.ERROR); show(message || "No speech detected."); }
    });
    return () => destroySpeechRecognition();
  }, []);

  const changeLanguage = async code => {
    setLanguage(code);
    await setItem("preferredLanguage", code);
  };

  const start = async () => {
    try {
      timer.reset();
      committedTextRef.current = text;
      setStatus(STATUS.LISTENING);
      await startListening(language);
    } catch (err) {
      setStatus(STATUS.ERROR);
      show(err.message || "Microphone permission is required to convert speech to text.");
    }
  };

  const stop = async () => {
    setStatus(STATUS.PROCESSING);
    await stopListening();
    setStatus(STATUS.COMPLETED);
  };

  const clear = () => {
    if (listening) return;
    if (!text) return;
    setShowClearDialog(true);
  };

  const confirmClear = () => {
    committedTextRef.current = "";
    setText("");
    setStatus(STATUS.READY);
    timer.reset();
    setShowClearDialog(false);
  };

  const updateText = value => {
    committedTextRef.current = value;
    setText(value);
  };

  const save = async () => {
    try {
      setSaving(true);
      await createTranscription({ transcriptionText: text, languageCode: language, durationSeconds: timer.seconds });
      setStatus(STATUS.READY);
      timer.reset();
      show("Transcription saved successfully.");
    } catch (err) {
      show(getApiMessage(err, "Failed to save transcription."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView style={tw`flex-1 ${theme.bg}`}>
      <ScrollView contentContainerStyle={tw`p-5`}>
        <Header title="Speech to Text" right={<StatusBadge status={status} />} />
        <LanguageSelector value={language} onChange={changeLanguage} />
        <View style={tw`items-center my-8 gap-3`}>
          <RecordingButton active={listening} onPress={listening ? stop : start} />
          <Text style={tw`text-lg ${theme.text}`}>{listening ? "Listening..." : status === STATUS.PROCESSING ? "Converting speech to text..." : "Tap the microphone to start speaking"}</Text>
          <RecordingTimer seconds={timer.seconds} />
        </View>
        <Text style={tw`font-semibold mb-2 ${theme.text}`}>Transcription</Text>
        <AppInput multiline value={text} onChangeText={updateText} placeholder="Recognized speech will appear here..." />
        <View style={tw`flex-row gap-3 my-4`}>
          <View style={tw`flex-1`}><AppButton title="Clear" variant="ghost" disabled={listening} onPress={clear} /></View>
          <View style={tw`flex-1`}><AppButton title="Stop" variant="danger" disabled={!listening} onPress={stop} /></View>
        </View>
        <AppButton title="Save Transcription" disabled={!text.trim() || listening || saving} loading={saving} onPress={save} />
      </ScrollView>
      <ConfirmDialog
        visible={showClearDialog}
        title="Clear transcription?"
        message="This will remove the current transcription."
        confirmText="Clear"
        danger
        onCancel={() => setShowClearDialog(false)}
        onConfirm={confirmClear}
      />
    </KeyboardAvoidingView>
  );
}

function appendSpeechText(current, next) {
  const cleanNext = String(next || "").trim();
  if (!cleanNext) return current;
  const cleanCurrent = String(current || "").replace(/[ \t]+$/g, "");
  if (!cleanCurrent) return cleanNext;
  if (cleanCurrent.endsWith(cleanNext)) return cleanCurrent;
  if (cleanCurrent.endsWith("\n")) return `${cleanCurrent}${cleanNext}`;
  return `${cleanCurrent} ${cleanNext}`;
}
