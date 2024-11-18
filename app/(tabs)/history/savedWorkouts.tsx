import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Container from "@/components/layout/Container";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

// Define types for workouts
interface StrengthWorkoutDetail {
  workoutId: number;
  workoutType: string;
  workoutName: string;
  exerciseName: string[];
}
interface CardioWorkoutDetail {
  workoutId: number;
  workoutType: string;
  workoutName: string;
  cardioExercise: string;
}

// Sample data received from backend, already sorted
const sampleStrengthWorkouts: StrengthWorkoutDetail[] = [
  {
    workoutId: 1,
    workoutType: "strength_training",
    workoutName: "pull day",
    exerciseName: ["Pullups", "Barbell Rows", "Dumbell Curls", "Hammer Curls"],
  },
];

const sampleCardioWorkouts: CardioWorkoutDetail[] = [
  {
    workoutId: 5,
    workoutType: "cardio",
    workoutName: "Biking",
    cardioExercise: "Biking",
  },
];

export default function SavedWorkouts() {
  const [activeTab, setActiveTab] = useState<string>("Strength");

  // Tabs for navigation
  const tabs = ["Strength", "Cardio"];

  return (
    <View className="flex-1 bg-darkBackground">
      {/* Tab Navigation */}
      <View className="flex-row justify-between p-2 m-4 bg-darkContainer rounded-md">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-[1] ml-0 px-4 py-2 rounded-sm ${
              activeTab === tab ? "bg-primary" : ""
            }`}
          >
            <Text
              className={`text-center text-white ${
                activeTab === tab ? "font-bold" : "font-normal"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Workouts List */}
      {activeTab === "Strength" ? (
        <FlatList
          className="mx-4"
          data={sampleStrengthWorkouts}
          keyExtractor={(item) => item.workoutId.toString()}
          renderItem={({ item }) => (
            <Container>
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-lg font-medium text-textPrimaryDark">
                    {item.workoutName}
                  </Text>
                  {item.exerciseName.map((exercise, index) => (
                    <Text
                      key={index}
                      className="text-sm text-textSecondaryDark font-normal"
                    >
                      {exercise}
                    </Text>
                  ))}
                </View>
                <Ionicons
                  color="#f5f5f5"
                  name="ellipsis-horizontal"
                  size={20}
                />
              </View>
            </Container>
          )}
          ListEmptyComponent={
            <Text className="text-center text-gray-400 mt-4">
              No strength workouts found.
            </Text>
          }
        />
      ) : (
        <FlatList
          className="mx-4"
          data={sampleCardioWorkouts}
          keyExtractor={(item) => item.workoutId.toString()}
          renderItem={({ item }) => (
            <Container>
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-lg font-medium text-textPrimaryDark">
                    {item.workoutName}
                  </Text>
                  <Text className="text-sm text-textSecondaryDark font-normal">
                    Exercise: {item.cardioExercise}
                  </Text>
                </View>
                <Ionicons
                  color="#f5f5f5"
                  name="ellipsis-horizontal"
                  size={20}
                />
              </View>
            </Container>
          )}
          ListEmptyComponent={
            <Text className="text-center text-gray-400 mt-4">
              No cardio workouts found.
            </Text>
          }
        />
      )}
    </View>
  );
}
