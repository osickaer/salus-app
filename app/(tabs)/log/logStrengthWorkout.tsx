// app/(tabs)/log/logStrengthWorkout.tsx
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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { clearExercises } from "@/store/slices/exercisesSlice";
import Container from "@/components/layout/Container";
import CalendarPicker from "@/components/calendars/CalendarPicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import ModalHeader from "@/components/layout/ModalHeader";

export default function LogWorkout() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [workout, setWorkout] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  // Fetch exercises from the Redux store
  const exercises = useSelector(
    (state: RootState) => state.exercises.temporaryExercises
  );

  const handleCancel = () => {
    // Clear exercises and navigate back
    dispatch(clearExercises());
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
        cancelText="Cancel"
        saveText="Save"
      />
      <KeyboardAwareScrollView
        className="px-4"
        contentContainerStyle={{ paddingBottom: 160 }}
        enableOnAndroid={true}
      >
        {/* Workout Name Input */}
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

        {/* Date Picker */}
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

        {/* Render Exercises */}
        {exercises.map(({ exerciseName, sets }, exerciseIndex) => (
          <Container
            key={exerciseName + exerciseIndex}
            extraClassNames="bg-tertiaryBackground justify-center"
          >
            <View className="flex-row justify-between">
              <Text className="text-textPrimaryDark text-lg font-medium">
                {exerciseName}
              </Text>
              <Ionicons name="ellipsis-horizontal" size={24} color="#737373" />
            </View>

            {/* Render Sets */}
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
            <View className="bg-darkSecondaryContainer my-2 opacity-50 h-[0.5px]"></View>
            {sets.map(({ setNum, previous, reps, weight }, setIndex) => (
              <View
                key={`${exerciseName}-${setNum}-${setIndex}`}
                className="flex-row justify-between my-2 items-center"
              >
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
                    keyboardType="decimal-pad"
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
                    keyboardType="decimal-pad"
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
            <View className="bg-darkSecondaryContainer my-2 opacity-50 h-[0.5px]"></View>
          </Container>
        ))}

        {/* Add Exercise Button */}
        <Pressable
          onPress={() => {
            router.push("/log/exerciseSearch");
          }}
          className="flex-row justify-center items-center h-[225px] w-full border-[1px] rounded-md border-darkSecondaryContainer/75"
        >
          <TouchableOpacity className="w-[28px] h-[28px] bg-darkSecondaryContainer rounded-full flex items-center justify-center">
            <Ionicons
              color="#202122"
              name="add"
              size={20}
              style={{ marginLeft: 0.5 }}
            />
          </TouchableOpacity>
          <Text className="text-darkSecondaryContainer text-lg font-normal ml-2">
            Add exercise
          </Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
}
