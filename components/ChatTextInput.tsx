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
    <View className="bg-secondaryBackground pl-4 rounded-xl w-full flex-row items-center">
      <TextInput
        className="flex-1 my-4 text-textPrimaryDark"
        style={{ fontSize: 16, paddingVertical: 0 }} // Remove vertical padding for a tight fit
        placeholder={placeholder}
        placeholderTextColor="#999999"
        value={value}
        onChangeText={onChangeText}
        multiline={true} // Enable multiline for vertical expansion
        textAlignVertical="center" // Keep text vertically centered
      />
      <TouchableOpacity onPress={onSend} className="mr-2">
        <Ionicons
          name="arrow-up-circle"
          size={32} // Reduced size for tighter fit
          color={value ? "#c99708" : "#202020"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChatTextInput;
