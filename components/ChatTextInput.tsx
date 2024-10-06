import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StyledTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  onSend: () => void;
}

// Reusable styled TextInput component
const ChatTextInput = ({
  value,
  onChangeText,
  placeholder,
  onSend,
}: StyledTextInputProps) => {
  return (
    <View className="bg-secondaryBackground pl-4 pr-1 pt-1 pb-1 rounded-full w-full flex-row items-center">
      <TextInput
        className="flex-1 text-textPrimaryDark"
        placeholder={placeholder}
        placeholderTextColor="#999999"
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={onSend} className="ml-2">
        <Ionicons
          name="arrow-up-circle"
          size={36}
          color={value ? "#c99708" : "#202020"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChatTextInput;
