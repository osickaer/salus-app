// app/(tabs)/log/workout.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LogWorkout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [workout, setWorkout] = useState("");

  const handleSaveWorkout = () => {
    // Handle saving workout logic here
    console.log("Workout logged:", workout);
    router.back(); // Navigate back to the previous page
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingHorizontal: 16,
        backgroundColor: "#232323",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#fff",
          marginBottom: 16,
        }}
      >
        Log Workout
      </Text>
      <TextInput
        placeholder="Enter your workout details"
        placeholderTextColor="#888"
        value={workout}
        onChangeText={setWorkout}
        style={{
          backgroundColor: "#3a3a3a",
          color: "#fff",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
        }}
      />
      <Button title="Save Workout" onPress={handleSaveWorkout} />
      <Button title="Cancel" onPress={() => router.back()} color="red" />
    </View>
  );
}
