import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import tw from "twrnc";
import { useTheme } from "../context/ThemeContext";
import AppButton from "./AppButton";

export default function ConfirmDialog({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger,
  onCancel,
  onConfirm
}) {
  const { theme, isDark } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={tw`flex-1 items-center justify-center px-5 ${isDark ? "bg-white/10" : "bg-black/30"}`} onPress={onCancel}>
        <Pressable style={tw`w-full max-w-md rounded-xl border p-5 ${theme.card} ${theme.border}`} onPress={event => event.stopPropagation()}>
          <Text style={tw`text-xl font-bold mb-2 ${theme.text}`}>{title}</Text>
          <Text style={tw`mb-5 leading-5 ${theme.muted}`}>{message}</Text>
          <View style={tw`flex-row gap-3`}>
            <View style={tw`flex-1`}>
              <AppButton title={cancelText} variant="ghost" onPress={onCancel} />
            </View>
            <View style={tw`flex-1`}>
              <AppButton title={confirmText} variant={danger ? "danger" : "primary"} onPress={onConfirm} />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
