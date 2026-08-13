import { Platform } from "react-native";

let handlers = {};
let webRecognition = null;
let nativeVoice = null;

function getNativeVoice() {
  if (Platform.OS === "web") return null;
  if (!nativeVoice) {
    const voiceModule = require("@react-native-voice/voice");
    nativeVoice = voiceModule.default || voiceModule;
  }
  return nativeVoice;
}

export function configureSpeechRecognition(nextHandlers) {
  handlers = nextHandlers || {};
  const Voice = getNativeVoice();
  if (!Voice) {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        webRecognition = new SpeechRecognition();
        webRecognition.continuous = true;
        webRecognition.interimResults = true;
        webRecognition.onstart = () => handlers.onStart?.();
        webRecognition.onend = () => handlers.onEnd?.();
        webRecognition.onerror = event => handlers.onError?.(event.error || "Speech recognition failed.");
        webRecognition.onresult = event => {
          let finalText = "";
          let partialText = "";
          for (let index = event.resultIndex; index < event.results.length; index += 1) {
            const transcript = event.results[index][0]?.transcript || "";
            if (event.results[index].isFinal) finalText += transcript;
            else partialText += transcript;
          }
          if (partialText) handlers.onPartial?.(partialText.trim());
          if (finalText) handlers.onResult?.(finalText.trim());
        };
      }
    }
    return;
  }
  Voice.onSpeechStart = () => handlers.onStart?.();
  Voice.onSpeechPartialResults = event => handlers.onPartial?.(event.value?.[0] || "");
  Voice.onSpeechResults = event => handlers.onResult?.(event.value?.[0] || "");
  Voice.onSpeechEnd = () => handlers.onEnd?.();
  Voice.onSpeechError = event => handlers.onError?.(event.error?.message || "Speech recognition failed.");
}

export async function startListening(languageCode) {
  const Voice = getNativeVoice();
  if (!Voice) {
    if (!webRecognition) throw new Error("Speech recognition is not supported in this browser.");
    webRecognition.lang = languageCode || "en-IN";
    webRecognition.start();
    return;
  }
  const services = await Voice.getSpeechRecognitionServices();
  if (!services?.length) throw new Error("Speech recognition unavailable.");
  await Voice.start(languageCode || "en-IN");
}

export function stopListening() {
  const Voice = getNativeVoice();
  if (!Voice) {
    webRecognition?.stop();
    return Promise.resolve();
  }
  return Voice.stop();
}

export function cancelListening() {
  const Voice = getNativeVoice();
  if (!Voice) {
    webRecognition?.abort();
    return Promise.resolve();
  }
  return Voice.cancel();
}

export async function destroySpeechRecognition() {
  const Voice = getNativeVoice();
  if (!Voice) {
    webRecognition?.abort();
    webRecognition = null;
    handlers = {};
    return;
  }
  await Voice.destroy();
  Voice.removeAllListeners();
  handlers = {};
}
