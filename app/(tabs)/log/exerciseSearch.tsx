import React, { useState, useEffect } from "react";
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
import Container from "@/components/layout/Container";
import { supabase } from "@/lib/supabase";
import ModalHeader from "@/components/layout/ModalHeader";
import { useDispatch } from "react-redux";
import { addExercise } from "@/store/slices/exercisesSlice";
import { v4 as uuidv4 } from "uuid";

const muscleGroups = [
  "All Muscle Groups",
  "Lower Back",
  "Forearms",
  "Shoulders",
  "Biceps",
  "Abdominals",
  "Traps",
  "Chest",
  "Triceps",
  "Abductors",
  "Hamstrings",
  "Adductors",
  "Neck",
  "Middle Back",
  "Lats",
  "Quadriceps",
  "Calves",
  "Glutes",
];

interface Exercise {
  strengthExerciseId: string;
  exerciseName: string;
  force: string;
  primaryMuscles: string[];
  category: string;
  images: string[];
  priority: number;
}

export default function ExerciseSearch() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] =
    useState("All Muscle Groups");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExercises = async () => {
    try {
      const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/workout/strengthExercises`;
      const { data: session } = await supabase.auth.getSession();

      if (!session || !session.session) {
        throw new Error("User is not authenticated.");
      }

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setExercises(data);
      setFilteredExercises(data); // Initially show all exercises
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  // Filter exercises based on search text and selected muscle group
  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    const filtered = exercises.filter((exercise) => {
      const matchesSearch = exercise.exerciseName
        .toLowerCase()
        .includes(lowercasedSearchText);
      const matchesMuscleGroup =
        selectedMuscleGroup === "All Muscle Groups" ||
        exercise.primaryMuscles.includes(selectedMuscleGroup.toLowerCase());
      return matchesSearch && matchesMuscleGroup;
    });

    setFilteredExercises(filtered);
  }, [searchText, selectedMuscleGroup, exercises]);

  const handleCancel = () => {
    router.back();
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleAddExercise = (exercise: Exercise) => {
    dispatch(
      addExercise({
        instanceId: uuidv4(), // Unique ID for this instance
        exerciseName: exercise.exerciseName,
        strengthExerciseId: exercise.strengthExerciseId,
        sets: [{ setNum: 1, previous: "", reps: "", weight: "" }], // Default set
      })
    );
    router.back(); // Navigate back to LogStrengthWorkout
  };

  return (
    <View className="flex-1 bg-darkModalBackground">
      {/* Modal Header */}
      <ModalHeader
        title="Exercises"
        onCancel={handleCancel}
        onSave={() => {}}
        cancelText="Back"
        saveText=""
      />

      {/* Search Bar */}
      <View
        className={`flex-row mx-4 px-2 py-2 border-[1px] rounded-md ${
          searchFocused
            ? "border-primary/75"
            : "border-darkSecondaryContainer/75"
        }`}
      >
        <Ionicons
          name="search"
          size={20}
          color={searchFocused ? "rgba(201, 151, 8, 0.7)" : "#737373"}
        />
        <TextInput
          placeholder="Search exercises..."
          placeholderTextColor="#888"
          className="flex-1 ml-2 text-textPrimaryDark"
          style={{ fontSize: 16 }}
          value={searchText}
          onChangeText={setSearchText}
          maxLength={36}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </View>

      {/* Muscle Group Dropdown */}
      <View className="flex-row mx-4 my-4">
        <Pressable
          onPress={toggleDropdown}
          className="flex-row justify-center items-center"
        >
          <Text className="text-base mr-2 text-textPrimaryDark font-normal">
            {selectedMuscleGroup}
          </Text>
          <Ionicons
            name={dropdownVisible ? "chevron-up" : "chevron-down"}
            size={16}
            color="#737373"
          />
        </Pressable>
      </View>

      {dropdownVisible && (
        <View className="mx-4 mb-4 p-2 bg-tertiaryBackground rounded-md">
          <FlatList
            data={muscleGroups}
            keyExtractor={(item) => item}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedMuscleGroup(item);
                  setDropdownVisible(false);
                }}
                style={{
                  width: "48%",
                  margin: "1%",
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                  borderWidth: 1,
                  borderColor: "#666",
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text className="text-base text-textPrimaryDark">{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Exercise List */}
      {loading ? (
        <Text className="text-center text-textPrimaryDark">Loading...</Text>
      ) : error ? (
        <Text className="text-center text-red-500">{error}</Text>
      ) : (
        <FlatList
          className="px-4"
          data={filteredExercises}
          keyExtractor={(item) => item.strengthExerciseId}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleAddExercise(item)}>
              <Container extraClassNames="bg-tertiaryBackground mb-3">
                <View className="flex-row justify-between items-center">
                  <View className="flex-row flex-1 items-center">
                    <View className="w-[20px] h-[20px] bg-primary rounded-full flex items-center justify-center">
                      <Ionicons name="add" size={16} color="#fff" />
                    </View>
                    <Text className="ml-4 text-textPrimaryDark text-lg font-normal">
                      {item.exerciseName}
                    </Text>
                  </View>

                  <TouchableOpacity>
                    <Ionicons
                      name="information-circle-outline"
                      size={24}
                      color="#737373"
                    />
                  </TouchableOpacity>
                </View>
              </Container>
            </Pressable>
          )}
        />
      )}
      <KeyboardAwareScrollView className="px-4" enableOnAndroid={true} />
    </View>
  );
}
