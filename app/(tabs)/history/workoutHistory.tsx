import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import Container from "@/components/layout/Container";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";

// Define types for workouts
interface StrengthWorkoutDetail {
  workoutId: number;
  workoutType: string;
  workoutDate: string;
  workoutName: string;
  exerciseName: string[];
}
interface CardioWorkoutDetail {
  workoutId: number;
  workoutType: string;
  workoutDate: string;
  workoutName: string;
  cardioExercise: string;
}

// Sample data received from backend, already sorted
const sampleStrengthWorkouts: StrengthWorkoutDetail[] = [
  {
    workoutId: 1,
    workoutType: "strength_training",
    workoutDate: "2024-09-07",
    workoutName: "pull day",
    exerciseName: ["Pullups", "Barbell Rows", "Dumbell Curls", "Hammer Curls"],
  },
];

const sampleCardioWorkouts: CardioWorkoutDetail[] = [
  {
    workoutId: 5,
    workoutType: "cardio",
    workoutDate: "2024-09-07",
    workoutName: "Biking",
    cardioExercise: "Biking",
  },
];

export default function WorkoutHistory() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("Strength");
  const [strengthWorkoutData, setStrengthWorkoutData] = useState<
    StrengthWorkoutDetail[]
  >([]);
  const [cardioWorkoutData, setCardioWorkoutData] = useState<
    StrengthWorkoutDetail[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (activeTab === "Strength") {
      fetchStrengthWorkouts();
    }
  }, [activeTab]);

  const fetchStrengthWorkouts = async () => {
    setLoading(true);

    try {
      const jwt = await supabase.auth
        .getSession()
        .then((res) => res.data.session?.access_token);

      if (!jwt) {
        Alert.alert("Error", "You must be logged in to view your workouts.");
        setLoading(false);
        return;
      }

      const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/workout/strengthWorkoutHistory`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch workouts: ${response.statusText}`);
      }

      const rawData = await response.json();

      // Transform data to group exercises under their respective workouts
      const transformedData: StrengthWorkoutDetail[] = Object.values(
        rawData.reduce((acc: any, item: any) => {
          const workoutId = item.workout_id;
          if (!acc[workoutId]) {
            acc[workoutId] = {
              workoutId: Number(workoutId),
              workoutType: item.workout_type,
              workoutDate: item.workout_date,
              workoutName: item.workout_name,
              exerciseName: [],
            };
          }
          acc[workoutId].exerciseName.push(item.exercise_name);
          return acc;
        }, {})
      );

      setStrengthWorkoutData(transformedData);
    } catch (error) {
      console.error("Error fetching strength workouts:", error);
      Alert.alert("Error", "Failed to load strength workouts.");
    } finally {
      setLoading(false);
    }
  };

  // Tabs for navigation
  const tabs = ["Strength", "Cardio"];

  return (
    <View className="flex-1 bg-darkBackground">
      {/* Tab Navigation */}
      <View className="flex-row justify-between m-4 p-2 bg-darkContainer rounded-md">
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

      {/* Loading Indicator */}
      {loading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#c99708" />
        </View>
      )}

      {/* Workouts List */}
      {!loading && activeTab === "Strength" ? (
        <FlatList
          className="px-4"
          data={strengthWorkoutData}
          keyExtractor={(item) => item.workoutId.toString()}
          renderItem={({ item }) => (
            <Container>
              <View className="flex-row justify-between items-start">
                {/* Workout Information */}
                <View className="flex-1">
                  {/* Workout Name and Date */}
                  <View className="mb-2">
                    <Text className="text-xl font-medium text-textPrimaryDark">
                      {item.workoutName}
                    </Text>
                    <Text className="text-base text-textSecondaryDark font-normal">
                      {dayjs(item.workoutDate).format("MMMM D, YYYY")}
                    </Text>
                  </View>

                  {/* Exercise Names */}
                  <View className="space-y-1">
                    {item.exerciseName.map((exercise, index) => (
                      <Text
                        key={index}
                        className="text-md text-textSecondaryDark font-normal"
                      >
                        {exercise}
                      </Text>
                    ))}
                  </View>
                </View>

                {/* Icon */}
                <Ionicons
                  color="#f5f5f5"
                  name="ellipsis-horizontal"
                  size={20}
                  style={{ marginLeft: 8 }}
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
        !loading && (
          <Text className="text-center text-gray-400 mt-4">
            Cardio workout functionality coming soon.
          </Text>
        )
      )}
    </View>
  );
}
