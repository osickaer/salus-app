import { View, Text } from "react-native";
import React from "react";

const DragIndicator = () => {
  return (
    <View className="justify-center items-center mt-[8px]">
      <View className="bg-darkSecondaryContainer w-[38px] h-[5px] rounded-full" />
    </View>
  );
};

export default DragIndicator;
