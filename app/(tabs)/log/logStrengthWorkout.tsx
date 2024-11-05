// app/(tabs)/log/workout.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Container from "@/components/layout/Container";
import CalendarPicker from "@/components/calendars/CalendarPicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import ModalHeader from "@/components/layout/ModalHeader";

let exerciseData = [
  {
    exerciseName: "Barbell Bench",
    sets: [
      { setNum: 1, previous: "125 lbs x 12", reps: 12, weight: 135 },
      { setNum: 2, previous: "125 lbs x 12", reps: 12, weight: 135 },
      { setNum: 3, previous: "125 lbs x 12", reps: 12, weight: 150 },
    ],
  },
  {
    exerciseName: "Barbell Squat",
    sets: [
      { setNum: 1, previous: "125 lbs x 12", reps: 12, weight: 135 },
      { setNum: 2, previous: "125 lbs x 12", reps: 12, weight: 135 },
      { setNum: 3, previous: "125 lbs x 12", reps: 12, weight: 150 },
    ],
  },
];

export default function LogWorkout() {
  const router = useRouter();
  const [workout, setWorkout] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleCancel = () => {
    console.log("Action cancelled");
    router.back();
  };

  const handleSaveWorkout = () => {
    // Handle saving workout logic here
    console.log("Workout logged");
    router.back(); // Navigate back to the previous page
  };

  return (
    <View className="flex-1 bg-darkModalBackground">
      <ModalHeader
        title="Log Strength Workout"
        onCancel={handleCancel}
        onSave={handleSaveWorkout}
        cancelText="Back"
        saveText="Save"
      />
      <KeyboardAwareScrollView
        className="px-4"
        contentContainerStyle={{ paddingBottom: 160 }}
        enableOnAndroid={true}
      >
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
              <Text className="flex-[3] text-[#888] text-base font-normal text-center">
                weight
              </Text>
              <Text className="flex-[3] text-[#888] text-base font-normal text-center">
                reps
              </Text>
              <View className="flex-[1]"></View>
            </View>
            <View className="bg-darkSecondaryContainer opacity-50 h-[0.5px]"></View>
            {sets.map(({ setNum, previous, reps, weight }) => (
              <View className="flex-row justify-between mt-2 items-center">
                <Text className="flex-[1] text-textPrimaryDark text-base font-normal text-center">
                  {setNum}
                </Text>
                <Text className="flex-[5] text-textPrimaryDark text-base font-normal text-center">
                  {previous}
                </Text>
                <View className="flex-[3] items-center">
                  <TextInput
                    className="flex w-[56px] py-2 text-textPrimaryDark text-base font-normal text-center border-[0.5px] border-[#888]/60 focus:border-primary rounded-md"
                    style={{
                      fontSize: 16,
                      textAlignVertical: "center",
                      lineHeight: 0,
                    }}
                    keyboardType="decimal-pad" // Allows decimals
                    maxLength={5}
                  />
                </View>
                <View className="flex-[3] items-center">
                  <TextInput
                    className="flex w-[56px] py-2 text-textPrimaryDark text-base font-normal text-center border-[0.5px] border-[#888]/60 focus:border-primary rounded-md"
                    style={{
                      fontSize: 16,
                      textAlignVertical: "center",
                      lineHeight: 0,
                    }}
                    keyboardType="decimal-pad" // Allows decimals
                    returnKeyType="done"
                    maxLength={5}
                  />
                </View>

                <View className="flex-[1] items-end">
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={24}
                    color="#737373"
                  />
                </View>
              </View>
            ))}
          </Container>
        ))}
      </KeyboardAwareScrollView>
    </View>
  );
}
