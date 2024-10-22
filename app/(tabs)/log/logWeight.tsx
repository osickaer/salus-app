// app/(tabs)/log/weight.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LogWeight() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [weight, setWeight] = useState("");

  const handleSaveWeight = () => {
    // Handle saving weight logic here
    console.log("Weight logged:", weight);
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
        Log Weight
      </Text>
      <TextInput
        placeholder="Enter your weight (e.g. 70kg)"
        placeholderTextColor="#888"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        style={{
          backgroundColor: "#3a3a3a",
          color: "#fff",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
        }}
      />
      <Button title="Save Weight" onPress={handleSaveWeight} />
      <Button title="Cancel" onPress={() => router.back()} color="red" />
    </View>
  );
}
