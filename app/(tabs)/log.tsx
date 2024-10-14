import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LogInputField from "@/components/LogInputField"; // Reusable input component
import LogButton from "@/components/LogButton"; // Reusable button component
import LogItemCard from "@/components/LogItemCard"; // Reusable log card component
import Container from "@/components/Container"; // Existing container component

type Log = {
  id: string;
  type: "meal" | "workout";
  description: string;
  timestamp: string;
};

const LoggingPage: React.FC = () => {
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
    <View className="flex-1 bg-darkBackground" style={{ paddingTop: insets.top }}>
      <Text className="text-textPrimaryDark font-bold text-2xl mx-5 my-4">
        Log Meals & Workouts
      </Text>

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
    </View>
  );
};

export default LoggingPage;
