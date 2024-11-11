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
      <View className="flex-row">
        <View className="flex-col justify-center">
          <View className="bg-primary/50 w-1 min-h-[32px] flex-1 rounded-full" />
        </View>
        <View className="flex-col justify-center mx-2">
          <Text
            style={{ lineHeight: 20 }}
            className="text-textSecondaryDark text-lg font-medium"
          >
            {title}
          </Text>
          <Text
            style={{ lineHeight: 0 }}
            className="text-textMutedDark text-md font-normal mt-1"
          >
            {subtitle}
          </Text>
        </View>
      </View>
      <Ionicons color="#f5f5f5" name="ellipsis-horizontal" size={20} />
    </View>
  );
};

export default WorkoutScheduleItem;
