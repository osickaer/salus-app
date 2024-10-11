import { View } from "react-native";
import { Svg, Rect } from "react-native-svg";
import React from "react";

interface ProgressBarProps {
  progressPercent: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPercent,
  color,
}) => {
  return (
    <View className="mb-4">
      <Svg height={12} width={"100%"}>
        {/* Full background bar */}
        <Rect
          rx={6} // Rounded corners
          width={"100%"} // Full width
          height={"100%"}
          fill="#0E0E0E" // Background color
        />
        {/* Progress bar */}
        <Rect
          rx={6} // Rounded corners
          width={`${100 * progressPercent}%`} // Example: 20% progress
          height={"100%"}
          fill={color} // Progress color
        />
      </Svg>
    </View>
  );
};

export default ProgressBar;
