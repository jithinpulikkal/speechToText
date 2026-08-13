import { Share } from "react-native";

export function shareText(text, title = "Transcription") {
  return Share.share({ title, message: text });
}
