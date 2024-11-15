import {
  View,
  Text,
  SectionList,
  SectionListData,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import Container from "@/components/layout/Container";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

// Define types for meals and grouped meals
interface Meal {
  mealId: string;
  foodDesc: string;
  mealType: string; // New property for meal type
  calories: number;
  mealTimestamp: string;
}

interface Section {
  title: string;
  data: Meal[];
}

// Sample data received from backend, already sorted
const sampleMeals: Meal[] = [
  {
    mealId: "1",
    foodDesc: "Oatmeal with Berries and Chocolate",
    mealType: "Breakfast",
    calories: 300,
    mealTimestamp: "2023-11-08",
  },
  {
    mealId: "2",
    foodDesc: "Grilled Chicken Salad",
    mealType: "Lunch",
    calories: 550,
    mealTimestamp: "2023-11-08",
  },
  {
    mealId: "3",
    foodDesc: "Steak with Vegetables",
    mealType: "Dinner",
    calories: 700,
    mealTimestamp: "2023-11-07",
  },
  {
    mealId: "4",
    foodDesc: "Greek Yogurt with Honey",
    mealType: "Snack",
    calories: 200,
    mealTimestamp: "2023-11-08",
  },
  {
    mealId: "5",
    foodDesc: "Avocado Toast",
    mealType: "Breakfast",
    calories: 400,
    mealTimestamp: "2023-11-07",
  },
];

// Group meals by date for the section list
const groupMealsByDate = (meals: Meal[]): Section[] => {
  const groupedMeals = meals.reduce(
    (grouped: { [date: string]: Meal[] }, meal) => {
      (grouped[meal.mealTimestamp] = grouped[meal.mealTimestamp] || []).push(
        meal
      );
      return grouped;
    },
    {}
  );

  return Object.keys(groupedMeals).map((date) => ({
    title: date,
    data: groupedMeals[date],
  }));
};

export default function MealHistory() {
  const router = useRouter();
  const [data, setData] = useState<Section[]>(groupMealsByDate(sampleMeals));

  // Placeholder function for loading more data
  const loadMoreData = () => {
    // This function would load more data from the backend
    // Append new sections or items to the data state here
    console.log("Loading more data...");
  };

  return (
    <View className="flex-1 bg-darkBackground">
      <SectionList
        className="p-4"
        sections={data}
        keyExtractor={(item) => item.mealId.toString()}
        renderItem={({ item }: { item: Meal }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/history/mealDetails",
                params: { mealId: "01e45fab-c7ef-4cd2-8c67-9036cda0a3c9" },
              })
            }
          >
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
                <Ionicons
                  color="#f5f5f5"
                  name="ellipsis-horizontal"
                  size={20}
                />
              </View>
            </Container>
          </TouchableOpacity>
        )}
        renderSectionHeader={({
          section,
        }: {
          section: SectionListData<Meal>;
        }) => (
          <View className="bg-darkBackground p-1 mb-2 shadow-lg">
            <Text className="text-base font-semibold text-textAccentDark">
              {section.title}
            </Text>
          </View>
        )}
        onEndReached={loadMoreData} // Trigger loading more data
        onEndReachedThreshold={0.5} // Load more when 50% from the bottom
        stickySectionHeadersEnabled={false} // Disable sticky headers
      />
    </View>
  );
}
