import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import ProfileHeaderRow from "@/components/ProfileHeaderRow";
import Container from "@/components/Container";
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

type RoutePaths = "/log/logStrengthWorkout" | "/log/logCardioWorkout" | null;

export default function LoggingPage() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isWorkoutModalVisible, setIsWorkoutModalVisible] = useState(false);
  const [nextRoute, setNextRoute] = useState<RoutePaths>(null);

  const handleNavigate = (route: RoutePaths) => {
    setNextRoute(route);
    setIsWorkoutModalVisible(false);
  };

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

          {/* Log Workout Button with Modal Trigger */}
          <TouchableOpacity
            onPress={() => setIsWorkoutModalVisible(true)}
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
      {/* Workout Choice Modal */}
      <Modal
        visible={isWorkoutModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsWorkoutModalVisible(false)}
        onDismiss={() => {
          if (nextRoute) {
            router.push(nextRoute); // Navigate to the next route after modal closes
            setNextRoute(null); // Reset the next route
          }
        }}
      >
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="w-4/5 bg-darkModalBackground rounded-lg p-6 items-center">
            <Text className="text-lg text-textPrimaryDark font-bold mb-4">
              Select Workout Type
            </Text>

            <TouchableOpacity
              className="w-full py-3 bg-yellow-600 rounded-md mb-4"
              onPress={() => handleNavigate("/log/logStrengthWorkout")}
            >
              <Text className="text-white text-center text-base font-semibold">
                Strength
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-full py-3 bg-yellow-600 rounded-md mb-4"
              onPress={() => handleNavigate("/log/logCardioWorkout")}
            >
              <Text className="text-white text-center text-base font-semibold">
                Cardio
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-2"
              onPress={() => setIsWorkoutModalVisible(false)}
            >
              <Text className="text-red-600 text-base font-semibold">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
