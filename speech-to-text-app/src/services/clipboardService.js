import * as Clipboard from "expo-clipboard";

export function copyText(text) {
  return Clipboard.setStringAsync(text);
}
