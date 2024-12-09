import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import Container from "@/components/layout/Container";
import { Ionicons } from "@expo/vector-icons";
import ModalHeader from "@/components/layout/ModalHeader";
import CalendarPicker from "@/components/calendars/CalendarPicker";
import AccessoryTextInput from "@/components/inputs/AccessoryTextInput";
import { supabase } from "@/lib/supabase";

type IconNames = React.ComponentProps<typeof Ionicons>["name"];

export default function LogMeal() {
  const router = useRouter();
  const [meal, setMeal] = useState("");
  const [mealType, setMealType] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading

  const mealTypes = [
    { id: "breakfast", icon: "sunny" as IconNames, label: "Breakfast" },
    { id: "lunch", icon: "restaurant" as IconNames, label: "Lunch" },
    { id: "dinner", icon: "moon" as IconNames, label: "Dinner" },
    { id: "snack", icon: "nutrition" as IconNames, label: "Snack" },
    { id: "water", icon: "water" as IconNames, label: "Water" },
  ];

  const topRowMealTypes = mealTypes.slice(0, 3); // First three items
  const bottomRowMealTypes = mealTypes.slice(3); // Last two items

  const handleCancel = () => {
    console.log("Action cancelled");
    router.back();
  };

  const handleSave = async () => {
    if (!meal.trim()) {
      Alert.alert("Error", "Meal description cannot be empty.");
      return;
    }

    setLoading(true); // Set loading to true before starting the request

    try {
      const jwt = await supabase.auth
        .getSession()
        .then((res) => res.data.session?.access_token);

      if (!jwt) {
        console.error("No JWT found, user may not be authenticated");
        Alert.alert("Error", "You must be logged in to save a meal.");
        setLoading(false); // Set loading to false
        return;
      }

      const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/meal/logMeal`;
      const payload = {
        timestamp: dayjs(date).format("YYYY-MM-DDTHH:mm:ss"),
        foodDescription: meal.trim(),
        mealType: mealType || null, // Send mealType as null if not selected
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to log meal:", errorData);
        Alert.alert("Error", `Failed to log meal: ${errorData.message}`);
        setLoading(false); // Set loading to false
        return;
      }

      Alert.alert("Success", "Meal logged successfully!");
      router.back(); // Navigate back after successful logging
    } catch (error) {
      console.error("Error logging meal:", error);
      Alert.alert("Error", "Failed to log meal. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after request finishes
    }
  };

  return (
    <View className="flex-1 bg-darkModalBackground">
      {/* Fixed Header */}
      <ModalHeader
        title="Log Meal"
        onCancel={handleCancel}
        onSave={handleSave}
        cancelText="Back"
        saveText="Save"
      />

      {/* Show loading indicator */}
      {loading && (
        <View className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/50 z-10">
          <ActivityIndicator size="large" color="#c99708" />
        </View>
      )}

      {/* Scrollable Content */}
      <KeyboardAwareScrollView
        className="px-4"
        contentContainerStyle={{ paddingBottom: 160 }}
        enableOnAndroid={true}
      >
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

        <Container extraClassNames="bg-tertiaryBackground">
          {/* Top row with 3 buttons */}
          <View className="flex-row justify-between space-x-2 mb-2">
            {topRowMealTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => setMealType(type.id)}
                className={`flex-1 py-3 px-2 rounded-md flex items-center justify-center ${
                  mealType === type.id
                    ? "bg-primary/20 border border-primary"
                    : "border border-textMutedDark/30"
                }`}
              >
                <Ionicons
                  name={
                    mealType === type.id
                      ? type.icon
                      : ((type.icon + "-outline") as IconNames)
                  }
                  size={20}
                  color={mealType === type.id ? "#c99708" : "#888888"}
                />
                <Text
                  className={`text-sm mt-1 ${
                    mealType === type.id
                      ? "text-primary font-medium"
                      : "text-textMutedDark"
                  }`}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bottom row with 2 buttons */}
          <View className="flex-row justify-between space-x-2">
            {bottomRowMealTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => setMealType(type.id)}
                className={`flex-1 py-3 px-2 rounded-md flex items-center justify-center ${
                  mealType === type.id
                    ? "bg-primary/20 border border-primary"
                    : "border border-textMutedDark/30"
                }`}
              >
                <Ionicons
                  name={
                    mealType === type.id
                      ? type.icon
                      : ((type.icon + "-outline") as IconNames)
                  }
                  size={20}
                  color={mealType === type.id ? "#c99708" : "#888888"}
                />
                <Text
                  className={`text-sm mt-1 ${
                    mealType === type.id
                      ? "text-primary font-medium"
                      : "text-textMutedDark"
                  }`}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Container>

        <AccessoryTextInput>
          <TextInput
            placeholder="Enter your meal details"
            placeholderTextColor="#888"
            className="bg-tertiaryBackground text-textPrimaryDark text-base text-start rounded-md px-4 p-4 min-h-[92px]"
            style={{ lineHeight: 20 }}
            multiline
            numberOfLines={2}
            value={meal}
            onChangeText={setMeal}
          />
        </AccessoryTextInput>
      </KeyboardAwareScrollView>
    </View>
  );
}
