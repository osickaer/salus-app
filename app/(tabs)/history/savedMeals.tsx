import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Container from "@/components/layout/Container";
import { Ionicons } from "@expo/vector-icons";

// Define types for meals
interface Meal {
  mealId: string;
  foodDesc: string;
  mealType: string;
  calories: number;
  mealTimestamp: string;
}

// Sample data received from backend, already sorted
const sampleMeals: Meal[] = [
  {
    mealId: "1",
    foodDesc: "Oatmeal with Berries and Chocolate",
    mealType: "breakfast",
    calories: 300,
    mealTimestamp: "2023-11-08",
  },
  {
    mealId: "2",
    foodDesc: "Grilled Chicken Salad",
    mealType: "lunch",
    calories: 550,
    mealTimestamp: "2023-11-08",
  },
  {
    mealId: "3",
    foodDesc: "Steak with Vegetables",
    mealType: "dinner",
    calories: 700,
    mealTimestamp: "2023-11-07",
  },
  {
    mealId: "4",
    foodDesc: "Greek Yogurt with Honey",
    mealType: "snack",
    calories: 200,
    mealTimestamp: "2023-11-08",
  },
  {
    mealId: "5",
    foodDesc: "Avocado Toast",
    mealType: "breakfast",
    calories: 400,
    mealTimestamp: "2023-11-07",
  },
];

export default function SavedMeals() {
  const [activeTab, setActiveTab] = useState<string>("Breakfast");

  const tabs = ["Breakfast", "Lunch", "Dinner", "Snack"];

  // Filter meals based on the active tab
  const filteredMeals = sampleMeals.filter(
    (meal) => meal.mealType === activeTab.toLowerCase()
  );

  return (
    <View className="flex-1 bg-darkBackground">
      {/* Tab Navigation */}
      <View className="flex-row justify-between p-2 m-4 bg-darkContainer rounded-md">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-[1] ml-0 px-4 py-2 rounded-sm ${
              activeTab === tab ? "bg-primary" : ""
            }`}
          >
            <Text
              className={`text-center text-white ${
                activeTab === tab ? "font-bold" : "font-normal"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Meals List */}
      <FlatList
        className="mx-4"
        data={filteredMeals}
        keyExtractor={(item) => item.mealId}
        renderItem={({ item }) => (
          <Container>
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-lg font-medium text-textPrimaryDark">
                  {item.foodDesc.length > 50
                    ? `${item.foodDesc.slice(0, 50)}...`
                    : item.foodDesc}
                </Text>
                <Text className="text-sm text-textSecondaryDark font-normal">
                  {item.calories} Calories
                </Text>
                <Text className="text-sm text-textSecondaryDark font-normal">
                  {item.mealType}
                </Text>
              </View>
              <Ionicons color="#f5f5f5" name="ellipsis-horizontal" size={20} />
            </View>
          </Container>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-4">
            No meals found for {activeTab}.
          </Text>
        }
      />
    </View>
  );
}
