import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfileHeaderRow from "@/components/layout/ProfileHeaderRow";
import dayjs from "dayjs";
import Container from "@/components/layout/Container";
import WeekCalendarScreen from "@/components/calendars/WeeklyCalendarScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CalorieGraph from "@/components/graphs/CalorieGraph";
import ProgressBar from "@/components/graphs/ProgressBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import TileButton from "@/components/buttons/TileButton";
import { router } from "expo-router";

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
      <KeyboardAwareScrollView
        className="flex-grow"
        enableOnAndroid={true}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        <ProfileHeaderRow />
        <Text className="text-textPrimaryDark font-bold text-2xl mx-5 mb-2 ">
          History
        </Text>
        <Container padding="p-0" extraClassNames="min-h-[130px] mx-4">
          <WeekCalendarScreen
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Container>
        <Container padding="p-4" extraClassNames="mx-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-textPrimaryDark text-xl font-medium">
              Daily Calories
            </Text>
            <TouchableOpacity className="w-[32px] h-[32px] bg-primary rounded-full flex items-center justify-center">
              <Ionicons
                color="#f5f5f5"
                name="add"
                size={20}
                style={{ marginLeft: 0.5 }}
              />
            </TouchableOpacity>
          </View>
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
          <TileButton onPress={() => router.push("/history/mealHistory")}>
            <Ionicons color="#f5f5f5" name="restaurant" size={32} />
            <Text className="mt-4 text-textPrimaryDark text-lg font-normal">
              Meals
            </Text>
          </TileButton>
          <TileButton>
            <Ionicons color="#f5f5f5" name="bookmark" size={32} />
            <Text className="mt-4 text-textPrimaryDark text-lg font-normal">
              Saved Meals
            </Text>
          </TileButton>
          <TileButton>
            <Ionicons color="#f5f5f5" name="barbell" size={32} />
            <Text className="mt-4 text-textPrimaryDark text-lg font-normal">
              Workouts
            </Text>
          </TileButton>
          <TileButton>
            <Ionicons color="#f5f5f5" name="save" size={32} />
            <Text className="mt-4 text-textPrimaryDark text-lg font-normal">
              Saved Workouts
            </Text>
          </TileButton>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
