import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface WorkoutScheduleItemProps {
  title: string;
  subtitle: string;
}

const WorkoutScheduleItem: React.FC<WorkoutScheduleItemProps> = ({
  title,
  subtitle,
}) => {
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row flex-1">
        <View className="justify-center">
          <View className="bg-primary/50 w-1 min-h-[32px] rounded-full" />
        </View>
        <View className="justify-center mx-2 flex-shrink">
          <Text
            style={{ lineHeight: 20 }}
            className="text-textSecondaryDark text-lg font-medium"
            numberOfLines={1} // Ensures title truncates if too long
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <Text
            style={{ lineHeight: 20 }}
            className="text-textMutedDark text-md font-normal mt-1"
            numberOfLines={1} // Ensures subtitle truncates if too long
            ellipsizeMode="tail"
          >
            {subtitle}
          </Text>
        </View>
      </View>
      <Ionicons
        color="#f5f5f5"
        name="ellipsis-horizontal"
        size={20}
        style={{ marginLeft: 8 }} // Keeps minimal spacing between text and icon
      />
    </View>
  );
};

export default WorkoutScheduleItem;
