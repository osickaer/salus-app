// app/(tabs)/log/logStrengthWorkout.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  removeExercise,
  clearExercises,
  addSet,
  removeSet,
  updateSet,
} from "@/store/slices/exercisesSlice";
import Container from "@/components/layout/Container";
import CalendarPicker from "@/components/calendars/CalendarPicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import ModalHeader from "@/components/layout/ModalHeader";
import OptionsButton from "@/components/buttons/OptionsButton";
import { supabase } from "@/lib/supabase";

export default function LogWorkout() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [workout, setWorkout] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state

  // Fetch exercises from the Redux store
  const exercises = useSelector(
    (state: RootState) => state.exercises.temporaryExercises
  );

  const handleAddSet = (instanceId: string) => {
    const exercise = exercises.find((e) => e.instanceId === instanceId);
    const nextSetNum = exercise ? exercise.sets.length + 1 : 1;

    dispatch(
      addSet({
        instanceId,
        newSet: {
          setNum: nextSetNum,
          previous: "",
          reps: "",
          weight: "",
        },
      })
    );
  };

  const handleRemoveSet = (instanceId: string, setNum: number) => {
    dispatch(
      removeSet({
        instanceId,
        setNum,
      })
    );
  };

  const handleDeleteExercise = (instanceId: string) => {
    console.log("Deleting exercise with ID:", instanceId); // Debug log
    dispatch(removeExercise(instanceId));
  };

  const handleCancel = () => {
    // Clear exercises and navigate back
    dispatch(clearExercises());
    router.back();
  };

  const handleSaveWorkout = async () => {
    Alert.alert("Save Workout", "Are you sure you want to save this workout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Save",
        onPress: async () => {
          setLoading(true); // Start loading
          try {
            const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/workout/logStrengthWorkout`;
            const { data: session } = await supabase.auth.getSession();

            if (!session || !session.session) {
              throw new Error("User is not authenticated.");
            }

            const workoutData = {
              workoutName: workout,
              workoutNotes: "", // Add notes input if needed
              workoutDate: date.toISOString(),
              strengthExercises: exercises.map((exercise) => ({
                exerciseName: exercise.exerciseName,
                sets: exercise.sets,
              })),
            };

            const response = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.session.access_token}`,
              },
              body: JSON.stringify(workoutData),
            });

            if (response.ok) {
              const result = await response.json();
              Alert.alert("Success", result.message);
              dispatch(clearExercises());
              router.back();
            } else {
              const error = await response.json();
              Alert.alert("Error", error.message || "Failed to save workout.");
            }
          } catch (error: any) {
            Alert.alert("Error", error.message || "Something went wrong.");
          } finally {
            setLoading(false); // End loading
          }
        },
      },
    ]);
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

      {loading && (
        <View className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/50 z-10">
          <ActivityIndicator size="large" color="#c99708" />
        </View>
      )}

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
              returnKeyType="done"
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
        {exercises.map(({ exerciseName, sets, instanceId }, exerciseIndex) => (
          <Container
            key={instanceId}
            extraClassNames="bg-tertiaryBackground justify-center"
          >
            <View className="flex-row justify-between">
              <Text className="text-textPrimaryDark text-lg font-medium">
                {exerciseName}
              </Text>
              <OptionsButton
                items={[
                  {
                    label: "Delete Exercise",
                    onPress: () => handleDeleteExercise(instanceId),
                  },
                ]}
              />
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
                    returnKeyType="done"
                    maxLength={5}
                    value={weight.toString()}
                    onChangeText={(value) =>
                      dispatch(
                        updateSet({
                          instanceId,
                          setNum,
                          weight: value,
                        })
                      )
                    }
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
                    value={reps.toString()}
                    onChangeText={(value) =>
                      dispatch(
                        updateSet({
                          instanceId,
                          setNum,
                          reps: value,
                        })
                      )
                    }
                  />
                </View>
                <View className="flex-[1] items-end">
                  <OptionsButton
                    items={[
                      {
                        label: "Delete Set",
                        onPress: () => handleRemoveSet(instanceId, setNum),
                      },
                    ]}
                  />
                </View>
              </View>
            ))}

            <View className="bg-darkSecondaryContainer my-2 opacity-50 h-[0.5px]"></View>
            <Pressable
              onPress={() => handleAddSet(instanceId)}
              className="flex-row mt-2"
            >
              <TouchableOpacity className="w-[24px] h-[24px] bg-darkSecondaryContainer rounded-full flex items-center justify-center">
                <Ionicons
                  color="#202122"
                  name="add"
                  size={18}
                  style={{ marginLeft: 0.5 }}
                />
              </TouchableOpacity>
              <Text className="text-lg text-textMutedDark ml-2 font-normal">
                Add set
              </Text>
            </Pressable>
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
