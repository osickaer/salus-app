import React, { useState } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import dayjs from "dayjs";
import Container from "@/components/Container";
import WeekCalendarScreen from "@/components/WeeklyCalendarScreen";
import CalorieGraph from "@/components/CalorieGraph";
import ProgressBar from "@/components/ProgressBar";
import Ionicons from "@expo/vector-icons/Ionicons";

// Dummy data for the charts
const proteinGrams = 40;
const proteinGramsGoal = 100;
const carbsGrams = 100;
const carbsGramsGoal = 150;
const fatGrams = 30;
const fatGramsGoal = 60;

const totalCaloriesGoal = 1900;
const proteinCals = 300; // 30% contribution
const carbsCals = 100; // 40% contribution
const fatCals = 120; // 30% contribution
const calories = proteinCals + carbsCals + fatCals;

// Calculate percentages
const proteinCalsPercent = proteinCals / totalCaloriesGoal;
const carbsCalsPercent = proteinCals / totalCaloriesGoal;
const fatCalsPercent = proteinCals / totalCaloriesGoal;

export default function History() {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <View
      className="flex-1 bg-darkBackground"
      style={{ paddingTop: insets.top }}
    >
      <Text className="text-textPrimaryDark font-bold text-2xl mx-5 my-4 ">
        History
      </Text>
      <Container padding="p-0" extraClassNames="min-h-[130px] mx-4">
        <WeekCalendarScreen
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </Container>
      <Container padding="p-4" extraClassNames="mx-4">
        <Text className="text-textPrimaryDark text-xl font-medium mb-4">
          Daily Calories
        </Text>
        <View className="flex-row justify-between items-center">
          <CalorieGraph
            proteinPercent={proteinCalsPercent}
            carbsPercent={carbsCalsPercent}
            fatPercent={fatCalsPercent}
            calories={calories}
            totalCalories={totalCaloriesGoal}
          />
          <View className="flex-col flex-1 ml-4 justify-center">
            <Text className="text-textSecondaryDark font-light text-base">
              Protein - {proteinGrams}/{proteinGramsGoal}g
            </Text>
            <ProgressBar
              progressPercent={proteinGrams / proteinGramsGoal}
              color="#d55a5a"
            />
            <Text className="text-textSecondaryDark font-light text-base">
              Carbs - {carbsGrams}/{carbsGramsGoal}g
            </Text>
            <ProgressBar
              progressPercent={carbsGrams / carbsGramsGoal}
              color="#e8b923"
            />
            <Text className="text-textSecondaryDark font-light text-base">
              Fats - {fatGrams}/{fatGramsGoal}g
            </Text>
            <ProgressBar
              progressPercent={fatGrams / fatGramsGoal}
              color="#3aafa9"
            />
          </View>
        </View>
      </Container>
      <View className="flex-row flex-wrap justify-between mx-4">
        {/* Repeating Container items */}
        <Container extraClassNames="w-[48%] mb-4">
          <View className="flex-col justify-center items-center">
            <Ionicons color="#f5f5f5" name="restaurant" size={32} />
            <Text className="mt-4 text-textPrimaryDark text-lg font-normal">
              Meals
            </Text>
          </View>
        </Container>
        <Container extraClassNames="w-[48%] mb-4">
          <View className="flex-col justify-center items-center">
            <Ionicons color="#f5f5f5" name="bookmark" size={32} />
            <Text className="mt-4 text-textPrimaryDark text-lg font-normal">
              Saved Meals
            </Text>
          </View>
        </Container>
        <Container extraClassNames="w-[48%] mb-4">
          <View className="flex-col justify-center items-center">
            <Ionicons color="#f5f5f5" name="barbell" size={32} />
            <Text className="mt-4 text-textPrimaryDark text-lg font-normal">
              Workouts
            </Text>
          </View>
        </Container>
        <Container extraClassNames="w-[48%] mb-4">
          <View className="flex-col justify-center items-center">
            <Ionicons color="#f5f5f5" name="save" size={32} />
            <Text className="mt-4 text-textPrimaryDark text-lg font-normal">
              Saved Workouts
            </Text>
          </View>
        </Container>
      </View>
    </View>
  );
}
