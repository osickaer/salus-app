// app/(tabs)/log/meal.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
  Modal,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import Container from "@/components/Container";
import { Ionicons } from "@expo/vector-icons";

type IconNames = React.ComponentProps<typeof Ionicons>["name"];
import DragIndicator from "@/components/DragIndicator";

export default function LogMeal() {
  const router = useRouter();
  const [meal, setMeal] = useState("");
  const [mealType, setMealType] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const mealTypes = [
    { id: "breakfast", icon: "sunny" as IconNames, label: "Breakfast" },
    { id: "lunch", icon: "restaurant" as IconNames, label: "Lunch" },
    { id: "dinner", icon: "moon" as IconNames, label: "Dinner" },
    { id: "snack", icon: "nutrition" as IconNames, label: "Snack" },
  ];

  const handleSaveMeal = () => {
    // Handle saving meal logic here
    console.log("Meal logged:", meal);
    router.back(); // Navigate back to the previous page
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios"); // Keep it open for iOS until closed manually
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View className="flex-1 px-4 bg-darkModalBackground">
      {/* <DragIndicator /> */}
      <View className="w-full flex-row justify-between items-center py-4">
        <Text
          onPress={() => router.back()}
          className="flex-1 text-lg text-secondary font-medium text-left underline"
        >
          Cancel
        </Text>
        <Text className="flex-1 text-xl text-textPrimaryDark font-bold text-center">
          Log Meal
        </Text>
        <Text
          onPress={handleSaveMeal}
          className="flex-1 text-lg text-primary font-medium text-right underline"
        >
          Save
        </Text>
      </View>

      <Container extraClassNames="bg-tertiaryBackground justify-center">
        <View className="flex-row justify-between">
          <Text className="text-base text-textPrimaryDark font-normal">
            {dayjs().format("MMMM D, YYYY")}
          </Text>
          {/* <Ionicons
            color="#888888"
            name="pencil"
            size={20}
            style={{ marginLeft: 0.5 }}
          /> */}
          <Text
            onPress={() => setShowDatePicker(true)}
            className="text-base text-textMutedDark font-normal underline"
          >
            Select
          </Text>
        </View>
      </Container>

      {showDatePicker && (
        <Modal transparent={true} animationType="slide">
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-lg p-4">
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={onChangeDate}
                maximumDate={new Date()} // Prevent selecting future dates
              />
              {Platform.OS === "ios" && (
                <Button title="Done" onPress={() => setShowDatePicker(false)} />
              )}
            </View>
          </View>
        </Modal>
      )}

      <Container extraClassNames="bg-tertiaryBackground">
        <View className="flex-row justify-between space-x-2">
          {mealTypes.map((type) => (
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
      <TextInput
        placeholder="Enter your meal details"
        placeholderTextColor="#888"
        className="bg-tertiaryBackground text-textPrimaryDark text-base text-start rounded-md px-4 p-4 min-h-[92px]"
        style={{
          lineHeight: 20,
        }}
        multiline={true}
        numberOfLines={2}
        value={meal}
        onChangeText={setMeal}
      />
    </View>
  );
}
