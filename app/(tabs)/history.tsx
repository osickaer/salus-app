import React, { useState } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import dayjs from "dayjs";
import Container from "@/components/Container";
import WeekCalendarScreen from "@/components/WeeklyCalendarScreen";
import { Svg, Circle } from "react-native-svg";

export default function History() {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Dummy data for the chart
  const totalCaloriesGoal = 1900;
  const protein = 300; // 30% contribution
  const carbs = 100; // 40% contribution
  const fat = 120; // 30% contribution

  // Calculate percentages
  const proteinPercent = protein / totalCaloriesGoal;
  const carbsPercent = carbs / totalCaloriesGoal;
  const fatPercent = fat / totalCaloriesGoal;

  // Define circle properties
  const radius = 90; // Radius of the progress circle
  const strokeWidth = 20; // Stroke width of the progress circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const center = radius + strokeWidth; // Center point for the circle

  return (
    <View
      className="flex-1 bg-darkBackground"
      style={{ paddingTop: insets.top }}
    >
      <Text className="text-textPrimaryDark font-bold text-2xl mx-5 my-4 ">
        History
      </Text>
      <Container padding="p-0" extraClassNames="min-h-[150px] mx-4">
        <WeekCalendarScreen
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </Container>

      {/* Circular Progress for Calorie Breakdown */}
      <Container padding="p-4" extraClassNames="min-h-[150px] mx-4">
        <Text className="text-textPrimaryDark text-xl font-medium">
          Daily Calories
        </Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Svg height={center * 2} width={center * 2}>
            {/* Full circle background */}
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke="gray"
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
                strokeDasharray={`${
                  circumference * fatPercent
                }, ${circumference}`}
                strokeDashoffset={
                  -circumference * (carbsPercent + proteinPercent)
                } // Correct offset for fat
                strokeLinecap="round"
                fill="transparent"
                rotation="-90"
                originX={center}
                originY={center}
              />
            )}
          </Svg>
          {/* Display total calories in the middle of the circle */}
          <Text className="absolute text-textPrimaryDark text-xl">
            {totalCaloriesGoal} cals
          </Text>
        </View>
      </Container>
    </View>
  );
}
