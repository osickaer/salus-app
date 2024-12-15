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
import OptionsButton from "@/components/buttons/OptionsButton";

// Define types for workouts
interface StrengthWorkoutDetail {
  workoutId: number;
  workoutType: string;
  workoutDate: string;
  workoutName: string;
  exerciseNames: string[];
}
interface CardioWorkoutDetail {
  workoutId: number;
  workoutType: string;
  workoutDate: string;
  workoutName: string;
  cardioExercise: string;
}

// Sample data received from backend, already sorte

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

      const data = await response.json();
      console.log(data[0].exerciseNames);
      setStrengthWorkoutData(data); // Directly set data from API
    } catch (error) {
      console.error("Error fetching strength workouts:", error);
      Alert.alert("Error", "Failed to load strength workouts.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWorkout = async (workoutId: number) => {
    Alert.alert(
      "Delete Workout",
      "Are you sure you want to delete this workout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            setLoading(true); // Start loading
            try {
              const jwt = await supabase.auth
                .getSession()
                .then((res) => res.data.session?.access_token);

              if (!jwt) {
                Alert.alert(
                  "Error",
                  "You must be logged in to delete a workout."
                );
                setLoading(false);
                return;
              }

              const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/workout/${workoutId}`;

              const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${jwt}`,
                  "Content-Type": "application/json",
                },
              });

              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                  errorData.message || "Failed to delete workout."
                );
              }

              // Refresh the workouts list
              await fetchStrengthWorkouts();
            } catch (error) {
              console.error("Error deleting workout:", error);
              Alert.alert("Error", "Failed to delete workout.");
            } finally {
              setLoading(false); // End loading
            }
          },
        },
      ]
    );
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
                    {item.exerciseNames.map((exercise, index) => (
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
                <OptionsButton
                  items={[
                    {
                      label: "Delete Workout",
                      onPress: () => handleDeleteWorkout(item.workoutId),
                    },
                  ]}
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
