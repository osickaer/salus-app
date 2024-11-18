import { View, TouchableOpacity } from "react-native";
import React from "react";

interface tileButtonProps {
  children?: React.ReactNode; // Children can be any valid React element(s)
  onPress?: () => void;
}

const TileButton: React.FC<tileButtonProps> = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-darkContainer rounded-md shadow-xl p-4 mb-4 w-[48%]"
    >
      <View className="flex-col justify-center items-center">{children}</View>
    </TouchableOpacity>
  );
};

export default TileButton;
