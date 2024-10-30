// app/(tabs)/log/meal.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  StyleSheet,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import Container from "@/components/Container";
import { Ionicons } from "@expo/vector-icons";

type IconNames = React.ComponentProps<typeof Ionicons>["name"];

export default function LogMeal() {
  const router = useRouter();
  const [meal, setMeal] = useState("");
  const [mealType, setMealType] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const mealTypes = [
    { id: "breakfast", icon: "sunny" as IconNames, label: "Breakfast" },
    { id: "lunch", icon: "restaurant" as IconNames, label: "Lunch" },
    { id: "dinner", icon: "moon" as IconNames, label: "Dinner" },
    { id: "snack", icon: "nutrition" as IconNames, label: "Snack" },
  ];

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
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
        <Text className="flex-1 text-xl text-textPrimaryDark font-bold text-center">
          Log Meal
        </Text>
        <Text
          onPress={() =>
            console.log(
              "Meal logged:",
              meal,
              dayjs(date).format("MMMM D, YYYY")
            )
          }
          className="flex-1 text-lg text-primary font-medium text-right underline"
        >
          Save
        </Text>
      </View>

      <Container extraClassNames="bg-tertiaryBackground justify-center">
        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <Ionicons name="calendar" size={24} color="#c99708" />
            <Text
              onPress={() => setShow(!show)}
              className="text-base text-textPrimaryDark font-normal ml-2 mt-[2px]"
            >
              {dayjs(date).format("MMMM D, YYYY")}
            </Text>
          </View>

          <TouchableOpacity onPress={() => setShow(!show)}>
            <Text className="text-base text-textMutedDark font-normal underline">
              Change
            </Text>
          </TouchableOpacity>
        </View>

        {/* Inline Expanding Calendar */}
        {show && (
          <View>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="inline" // Use 'inline' display for a calendar-like UI
              onChange={handleDateChange}
              maximumDate={new Date()} // Prevent future dates
            />
          </View>
        )}
      </Container>

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
        style={{ lineHeight: 20 }}
        multiline
        numberOfLines={2}
        value={meal}
        onChangeText={setMeal}
      />
    </View>
  );
}
