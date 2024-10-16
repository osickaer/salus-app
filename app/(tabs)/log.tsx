import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import dayjs from "dayjs";
import LogInputField from "@/components/LogInputField"; // Reusable input component
import LogButton from "@/components/LogButton"; // Reusable button component
import LogItemCard from "@/components/LogItemCard"; // Reusable log card component
import Container from "@/components/Container"; // Existing container component
import { Ionicons } from "@expo/vector-icons";

type Log = {
  id: string;
  type: "meal" | "workout";
  description: string;
  timestamp: string;
};

export default function LoggingPage() {
  const insets = useSafeAreaInsets();
  const [mealDescription, setMealDescription] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [logs, setLogs] = useState<Log[]>([]);

  const logMeal = () => {
    const newLog: Log = {
      id: Date.now().toString(),
      type: "meal",
      description: mealDescription,
      timestamp: new Date().toLocaleString(),
    };
    setLogs([...logs, newLog]);
    setMealDescription(""); // Reset input
  };

  const logWorkout = () => {
    const newLog: Log = {
      id: Date.now().toString(),
      type: "workout",
      description: workoutDescription,
      timestamp: new Date().toLocaleString(),
    };
    setLogs([...logs, newLog]);
    setWorkoutDescription(""); // Reset input
  };

  return (
    <ScrollView
      className="flex-1 bg-darkBackground"
      style={{ paddingTop: insets.top }}
    >
      <View className="flex-row justify-between items-center ml-4 mr-5 mb-4">
        <Ionicons color="#c99708" name="person-circle" size={56} />
        <Ionicons color="#2C2C2C" name="settings" size={28} />
      </View>
      <Text className="text-textPrimaryDark text-2xl font-semibold mx-5 my-2">
        Workout Schedule
      </Text>
      <Container extraClassNames="mx-4">
        <View className="flex-row justify-between mb-2">
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
        <View className="flex-row items-center">
          <View className="flex-col justify-center">
            <View className="bg-primary/50 w-1 min-h-[32px] flex-1 rounded-full" />
          </View>
          <View className="flex-col justify-center mx-2">
            <Text
              style={{ lineHeight: 20 }}
              className="text-textSecondaryDark text-lg font-medium"
            >
              Push
            </Text>
            <Text
              style={{ lineHeight: 0 }}
              className="text-textMutedDark text-md font-normal mt-1"
            >
              Barbell Bench, Overhead Press, Cable Crossovers, Lateral Raise,
              Tricep Pushdown
            </Text>
          </View>
          <Ionicons color="#f5f5f5" name="ellipsis-horizontal" size={20} />
        </View>
      </Container>

      <Container padding="p-4" extraClassNames="mx-4">
        <Text className="text-textPrimaryDark text-xl font-medium mb-4">
          Log a Meal
        </Text>
        <LogInputField
          placeholder="Enter meal description"
          value={mealDescription}
          onChangeText={setMealDescription}
        />
        <LogButton title="Log Meal" onPress={logMeal} />
      </Container>

      <Container padding="p-4" extraClassNames="mx-4">
        <Text className="text-textPrimaryDark text-xl font-medium mb-4">
          Log a Workout
        </Text>
        <LogInputField
          placeholder="Enter workout description"
          value={workoutDescription}
          onChangeText={setWorkoutDescription}
        />
        <LogButton title="Log Workout" onPress={logWorkout} />
      </Container>

      <Container padding="p-4" extraClassNames="mx-4">
        <Text className="text-textPrimaryDark text-xl font-medium mb-4">
          Previous Logs
        </Text>

        <ScrollView>
          {logs.length > 0 ? (
            logs.map((log) => (
              <LogItemCard
                key={log.id}
                type={log.type}
                description={log.description}
                timestamp={log.timestamp}
              />
            ))
          ) : (
            <Text className="text-textSecondaryDark">No logs yet</Text>
          )}
        </ScrollView>
      </Container>
    </ScrollView>
  );
}
