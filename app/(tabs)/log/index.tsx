import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import ProfileHeaderRow from "@/components/ProfileHeaderRow";
import LogInputField from "@/components/LogInputField"; // Reusable input component
import LogButton from "@/components/LogButton"; // Reusable button component
import LogItemCard from "@/components/LogItemCard"; // Reusable log card component
import Container from "@/components/Container"; // Existing container component
import WorkoutScheduleItem from "@/components/WorkoutScheduleItem";
import { Ionicons } from "@expo/vector-icons";

const workout_schedule_data = [
  {
    id: "1",
    title: "Push",
    exercises:
      "Barbell Bench, Overhead Press, Cable Crossovers, Lateral Raise, Tricep Pushdown",
  },
  {
    id: "2",
    title: "Pull",
    exercises: "Pullup, Row, Bicep curl, Straight Arm Pulldown, Hammer Curl",
  },
];

export default function LoggingPage() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="flex-1 bg-darkBackground">
      <ScrollView
        style={{ paddingTop: insets.top }}
        className="flex-grow"
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeaderRow />
        <Text className="text-textPrimaryDark text-2xl font-semibold mx-5 mb-2">
          Workout Schedule
        </Text>
        <Container extraClassNames="mx-4">
          <View className="flex-row justify-between mb-4">
            <Text className="text-textSecondaryDark text-xl font-normal">
              {dayjs().format("MMMM D, YYYY")}
            </Text>
            <TouchableOpacity className="w-[28px] h-[28px] bg-primary rounded-full flex items-center justify-center">
              <Ionicons
                color="#f5f5f5"
                name="add"
                size={20}
                style={{ marginLeft: 0.5 }}
              />
            </TouchableOpacity>
          </View>
          <View className="flex-col space-y-4">
            {workout_schedule_data.map((workout_data) => (
              <View key={workout_data.id}>
                <WorkoutScheduleItem
                  title={workout_data.title}
                  subtitle={workout_data.exercises}
                />
              </View>
            ))}
          </View>
        </Container>

        <Text className="text-textPrimaryDark text-2xl font-semibold mx-5 mb-2">
          Logging
        </Text>

        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => router.push("/log/logMeal")}
            className="bg-transparent mx-4 p-3 rounded-md border-[0.5px] border-primary/60"
          >
            <View className="flex-row justify-center">
              <Ionicons
                color="#c99708"
                name="restaurant"
                size={20}
                style={{ marginRight: 8 }}
              />
              <Text className="text-primary text-base text-center mr-2">
                Log Meal
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/log/logWorkout")}
            className="bg-transparent mx-4 p-3 rounded-md border-[0.5px] border-primary/60"
          >
            <View className="flex-row justify-center">
              <Ionicons
                color="#c99708"
                name="barbell"
                size={20}
                style={{ marginRight: 8 }}
              />
              <Text className="text-primary text-base text-center mr-2">
                Log Workout
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/log/logWeight")}
            className="bg-transparent mx-4 p-3 rounded-md border-[0.5px] border-primary/60"
          >
            <View className="flex-row justify-center">
              <Ionicons
                color="#c99708"
                name="scale"
                size={20}
                style={{ marginRight: 8 }}
              />
              <Text className="text-primary text-base text-center mr-2">
                Log Weight
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
