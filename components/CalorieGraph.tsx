import { View, Text } from "react-native";
import { Svg, Circle } from "react-native-svg";
import React from "react";

// Define circle properties
const radius = 72; // Radius of the progress circle
const strokeWidth = 12; // Stroke width of the progress circle
const circumference = 2 * Math.PI * radius; // Circumference of the circle
const center = radius + strokeWidth; // Center point for the circle

interface CalorieGraphProps {
  proteinPercent: number;
  carbsPercent: number;
  fatPercent: number;
  calories: number;
  totalCalories: number;
}

const CalorieGraph: React.FC<CalorieGraphProps> = ({
  proteinPercent,
  carbsPercent,
  fatPercent,
  calories,
  totalCalories,
}) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Svg height={center * 2} width={center * 2}>
        {/* Full circle background */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#0E0E0E"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Protein segment (second part of the circle) */}
        {proteinPercent > 0 && (
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#d55a5a" // Protein color
            strokeWidth={strokeWidth}
            strokeDasharray={`${
              circumference * proteinPercent
            }, ${circumference}`}
            strokeLinecap="round"
            fill="transparent"
            rotation="-90"
            originX={center}
            originY={center}
          />
        )}
        {/* Carbs segment (first part of the circle) */}
        {carbsPercent > 0 && (
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#e8b923" // Carbs color
            strokeWidth={strokeWidth}
            strokeDasharray={`${
              circumference * carbsPercent
            }, ${circumference}`}
            strokeDashoffset={-circumference * proteinPercent} // Fix offset for correct start point
            strokeLinecap="round"
            fill="transparent"
            rotation="-90"
            originX={center}
            originY={center}
          />
        )}
        {/* Fat segment (third part of the circle) */}
        {fatPercent > 0 && (
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#3aafa9" // Fat color
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference * fatPercent}, ${circumference}`}
            strokeDashoffset={-circumference * (carbsPercent + proteinPercent)} // Correct offset for fat
            strokeLinecap="round"
            fill="transparent"
            rotation="-90"
            originX={center}
            originY={center}
          />
        )}
      </Svg>
      {/* Display total calories in the middle of the circle */}
      <Text className="absolute text-textPrimaryDark text-xl font-light">
        {calories}/{totalCalories} cals
      </Text>
    </View>
  );
};

export default CalorieGraph;
