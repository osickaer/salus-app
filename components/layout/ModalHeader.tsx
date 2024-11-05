import React from "react";
import { View, Text } from "react-native";

interface ModalHeaderProps {
  title: string;
  onCancel: () => void;
  onSave: () => void;
  cancelText?: string;
  saveText?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onCancel,
  onSave,
  cancelText = "Cancel",
  saveText = "Save",
}) => {
  return (
    <View className="w-full flex-row justify-between items-center px-5 py-4">
      {/* Cancel Button */}
      <Text
        onPress={onCancel}
        className="flex-1 text-lg text-secondary font-medium text-left underline"
      >
        {cancelText}
      </Text>

      {/* Title */}
      <Text className="flex-2 text-xl text-textPrimaryDark font-bold text-center">
        {title}
      </Text>

      {/* Save Button */}
      <Text
        onPress={onSave}
        className="flex-1 text-lg text-primary font-medium text-right underline"
      >
        {saveText}
      </Text>
    </View>
  );
};

export default ModalHeader;
