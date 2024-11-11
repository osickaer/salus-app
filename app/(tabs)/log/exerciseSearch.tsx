import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import ModalHeader from "@/components/layout/ModalHeader";
import Container from "@/components/layout/Container";

let exercises = [
  {
    strength_exercise_id: "barbell_bench_press",
    exercise_name: "Barbell Bench Press",
  },
  {
    strength_exercise_id: "tricep_pushdowns",
    exercise_name: "Tricep Pushdowns",
  },
  {
    strength_exercise_id: "deadlift",
    exercise_name: "Deadlift",
  },
  {
    strength_exercise_id: "squats",
    exercise_name: "Squats",
  },
  {
    strength_exercise_id: "lat_pulldown",
    exercise_name: "Lat Pulldown",
  },
  {
    strength_exercise_id: "dumbbell_shoulder_press",
    exercise_name: "Dumbbell Shoulder Press",
  },
  {
    strength_exercise_id: "bicep_curl",
    exercise_name: "Bicep Curl",
  },
  {
    strength_exercise_id: "leg_press",
    exercise_name: "Leg Press",
  },
  {
    strength_exercise_id: "pull_up",
    exercise_name: "Pull-Up",
  },
  {
    strength_exercise_id: "seated_row",
    exercise_name: "Seated Row",
  },
  {
    strength_exercise_id: "lunges",
    exercise_name: "Lunges",
  },
  {
    strength_exercise_id: "chest_fly",
    exercise_name: "Chest Fly",
  },
  {
    strength_exercise_id: "calf_raise",
    exercise_name: "Calf Raise",
  },
  {
    strength_exercise_id: "hammer_curl",
    exercise_name: "Hammer Curl",
  },
];

const muscleGroups = [
  "All Muscle Groups",
  "Chest",
  "Back",
  "Shoulders",
  "Arms",
  "Legs",
  "Core",
  "Glutes",
  "Calves",
  "Forearms",
  // Add more as needed
];

export default function ExerciseSearch() {
  const router = useRouter();
  const [workout, setWorkout] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] =
    useState("All Muscle Groups");

  const handleCancel = () => {
    console.log("Action cancelled");
    router.back();
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <View className="flex-1 bg-darkModalBackground">
      <ModalHeader
        title="Exercises"
        onCancel={handleCancel}
        onSave={() => {}}
        cancelText="Back"
        saveText=""
      />
      <View
        className={`flex-row mx-4 px-2 py-2 border-[1px] rounded-md ${
          searchFocused
            ? "border-primary/75"
            : "border-darkSecondaryContainer/75"
        }`}
      >
        <Ionicons name="search" size={20} color="#737373" />
        <TextInput
          placeholder="Search exercises..."
          placeholderTextColor="#888"
          className="flex-1 ml-2 text-textPrimaryDark"
          style={{ fontSize: 16 }}
          value={workout}
          onChangeText={setWorkout}
          maxLength={36}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </View>
      <View className="flex-row mx-4">
        <Pressable
          onPress={toggleDropdown}
          className="flex-row my-4 w-[50%] px-4 justify-center items-center"
        >
          <Text className="text-base mr-1 text-textPrimaryDark font-normal">
            {selectedMuscleGroup}
          </Text>
          <Ionicons
            name={dropdownVisible ? "chevron-down" : "chevron-up"}
            size={16}
            color={"#737373"}
          />
        </Pressable>
      </View>

      {dropdownVisible && (
        <View className="p-2 mb-4 bg-tertiaryBackground">
          <FlatList
            data={muscleGroups}
            keyExtractor={(item) => item}
            numColumns={2} // Keeps the two-column structure
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  console.log(`Selected muscle group: ${item}`);
                  setSelectedMuscleGroup(item);
                  setDropdownVisible(false);
                }}
                style={{
                  width: "48%", // Fixed width for two items per row with margin
                  margin: "1%", // Space between items
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                  borderWidth: 1,
                  borderColor: "#666", // Adjust as needed
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text className="text-base text-textPrimaryDark text-center">
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
          {/* Placeholder for future muscle diagram */}
          {/* <View className="mt-4 p-4 bg-gray-200 rounded-md">
            <Text className="text-center text-gray-600">Done</Text>
          </View> */}
        </View>
      )}

      <FlatList
        className="mx-4"
        data={exercises} // Data source for the list
        renderItem={(
          {
            item,
          }: { item: { strength_exercise_id: string; exercise_name: string } } // Inline type definition
        ) => (
          <Container extraClassNames="bg-tertiaryBackground">
            <View className="flex-row justify-between items-center">
              <View className="flex-row justify-between items-center">
                <TouchableOpacity className="w-[24px] h-[24px] bg-textPrimaryDark rounded-full flex items-center justify-center">
                  <Ionicons
                    color="#3a3a3a"
                    name="add"
                    size={20}
                    style={{ marginLeft: 0.5 }}
                  />
                </TouchableOpacity>
                <Text
                  className="ml-4 text-textPrimaryDark text-lg font-normal"
                  style={{ lineHeight: 0 }}
                >
                  {item.exercise_name}
                </Text>
              </View>
              <TouchableOpacity className="w-[28px] h-[28px] rounded-full flex items-center justify-center">
                <Ionicons
                  color="#737373"
                  name="information-circle-outline"
                  size={28}
                  style={{ marginLeft: 0.5 }}
                />
              </TouchableOpacity>
            </View>
          </Container>
        )}
        keyExtractor={(item) => item.strength_exercise_id} // Unique key for each item
      />
      <KeyboardAwareScrollView className="px-4" enableOnAndroid={true} />
    </View>
  );
}
