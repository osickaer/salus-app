// components/CalendarPicker.tsx
import React from "react";
import { View, Text } from "react-native";
import { Svg, Rect } from "react-native-svg";

interface MicronutrientProgressBarProps {
  title: string;
  total: number;
  goal: number;
}

export default function MicronutrientProgressBar({
  title,
  total,
  goal,
}: MicronutrientProgressBarProps) {
  return (
    <View>
      <View className="flex-row mt-4 items-end">
        <Text className="flex-[3] text-textPrimaryDark text-base font-normal text-left align-text-bottom">
          {title}
        </Text>
        <Text className="flex-[2] text-textPrimaryDark text-base font-normal text-right align-text-bottom">
          {total}g
        </Text>
        <Text className="flex-[3] text-textPrimaryDark text-base font-normal text-right align-text-bottom">
          {goal}g
        </Text>
      </View>
      <View className="flex">
        <Svg height={2} width={"100%"}>
          {/* Full background bar */}
          <Rect
            rx={1} // Rounded corners
            width={"100%"} // Full width
            height={"100%"}
            fill="#737373" // Background color
          />
          {/* Progress bar */}
          <Rect
            rx={1} // Rounded corners
            width={`${(100 * total) / goal}%`} // Example: 20% progress
            height={"100%"}
            fill={"#c99708"} // Progress color
          />
        </Svg>
      </View>
    </View>
  );
}
