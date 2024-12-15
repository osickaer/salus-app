import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";

interface OptionsButtonItem {
  label: string;
  onPress: () => void;
}

interface OptionsButtonProps {
  items: OptionsButtonItem[];
}

const OptionsButton: React.FC<OptionsButtonProps> = ({ items }) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const openActionSheet = () => {
    const options = items.map((item) => item.label);
    const cancelButtonIndex = options.length;

    showActionSheetWithOptions(
      {
        options: [...options, "Cancel"], // Add Cancel option
        cancelButtonIndex, // Index of Cancel
        title: "Options",
        destructiveButtonIndex: 0,
      },
      (selectedIndex) => {
        if (selectedIndex !== undefined && selectedIndex < items.length) {
          items[selectedIndex].onPress();
        }
      }
    );
  };

  return (
    <TouchableOpacity onPress={openActionSheet}>
      <Ionicons name="ellipsis-horizontal" size={20} color="#f5f5f5" />
    </TouchableOpacity>
  );
};

export default OptionsButton;
