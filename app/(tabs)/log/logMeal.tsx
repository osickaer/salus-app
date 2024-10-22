// app/(tabs)/log/meal.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LogMeal() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [meal, setMeal] = useState("");

  const handleSaveMeal = () => {
    // Handle saving meal logic here
    console.log("Meal logged:", meal);
    router.back(); // Navigate back to the previous page
  };

  return (
    <View
      className="flex-1 px-4 bg-darkModalBackground"
      style={{
        paddingTop: insets.top,
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
        Log Meal
      </Text>
      <TextInput
        placeholder="Enter your meal details"
        placeholderTextColor="#888"
        value={meal}
        onChangeText={setMeal}
        style={{
          backgroundColor: "#3a3a3a",
          color: "#fff",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
        }}
      />
      <Button title="Save Meal" onPress={handleSaveMeal} />
      <Button title="Cancel" onPress={() => router.back()} color="red" />
    </View>
  );
}
