import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const ProfileHeaderRow = () => {
  return (
    <View className="flex-row justify-between items-center ml-2 mr-3 mb-4">
      <Ionicons color="#c99708" name="person-circle" size={56} />
      <Ionicons color="#f5f5f5" name="settings-outline" size={28} />
    </View>
  );
};

export default ProfileHeaderRow;
