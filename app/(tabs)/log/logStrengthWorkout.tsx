// app/(tabs)/log/workout.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import Container from "@/components/Container";
import CalendarPicker from "@/components/CalendarPicker";
import { Ionicons } from "@expo/vector-icons";

let exerciseData = [
  {
    exerciseName: "Barbell Bench",
    sets: [
      { setNum: 1, reps: 12, weight: 135 },
      { setNum: 2, reps: 12, weight: 135 },
      { setNum: 3, reps: 12, weight: 150 },
    ],
  },
  {
    exerciseName: "Barbell Squat",
    sets: [
      { setNum: 1, reps: 12, weight: 135 },
      { setNum: 2, reps: 12, weight: 135 },
      { setNum: 3, reps: 12, weight: 150 },
    ],
  },
];

export default function LogWorkout() {
  const router = useRouter();
  const [workout, setWorkout] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleSaveWorkout = () => {
    // Handle saving workout logic here
    console.log("Workout logged");
    router.back(); // Navigate back to the previous page
  };

  return (
    <View className="flex-1 px-4 bg-darkModalBackground">
      <View className="w-full flex-row justify-between items-center py-4">
        <Text
          onPress={() => router.back()}
          className="flex-1 text-lg text-secondary font-medium text-left underline"
        >
          Cancel
        </Text>
        <Text className="flex-2 text-xl text-textPrimaryDark font-bold text-center">
          Log Strength Workout
        </Text>
        <Text
          onPress={handleSaveWorkout}
          className="flex-1 text-lg text-primary font-medium text-right underline"
        >
          Save
        </Text>
      </View>
      <Container extraClassNames="bg-tertiaryBackground justify-center">
        <View className="flex-row">
          <Ionicons name="pricetag" size={24} color="#737373" />
          <TextInput
            placeholder="Enter workout name"
            placeholderTextColor="#888"
            className="flex-1 text-textPrimaryDark ml-4"
            style={{ fontSize: 16 }}
            value={workout}
            onChangeText={setWorkout}
            maxLength={36}
          />
        </View>
      </Container>
      <Container extraClassNames="bg-tertiaryBackground justify-center">
        <CalendarPicker
          date={date}
          show={show}
          setShow={setShow}
          onDateChange={(e, selectedDate) => {
            if (selectedDate) setDate(selectedDate);
          }}
        />
      </Container>

      {exerciseData.map(({ exerciseName, sets }) => (
        <Container extraClassNames="bg-tertiaryBackground justify-center">
          <View className="flex-row justify-between">
            <Text className="text-textPrimaryDark text-lg font-medium">
              {exerciseName}
            </Text>
            <Ionicons name="ellipsis-horizontal" size={24} color="#737373" />
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="flex-[1] text-[#888] text-base font-normal text-center">
              set
            </Text>
            <Text className="flex-[5] text-[#888] text-base font-normal text-center">
              previous
            </Text>
            <Text className="flex-[2] text-[#888] text-base font-normal text-center">
              weight
            </Text>
            <Text className="flex-[2] text-[#888] text-base font-normal text-center">
              reps
            </Text>
          </View>
          <View className="bg-darkSecondaryContainer opacity-50 h-[0.5px]"></View>
          {sets.map(({ setNum, reps, weight }) => (
            <View className="flex-row">
              <Text>{`Set ${setNum}, Weight ${weight}`}</Text>
            </View>
          ))}
        </Container>
      ))}
    </View>
  );
}
