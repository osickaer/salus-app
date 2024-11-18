import { Stack } from "expo-router";

export default function HistoryLayout() {
  return (
    <Stack>
      {/* Main Log Page */}
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Log" }}
      />

      {/* Meal History Screens */}
      <Stack.Screen
        name="mealHistory"
        options={{
          headerTitle: "Meal History",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#0E0E0E",
          },
          headerTitleStyle: {
            color: "#f5f5f5",
          },
        }}
      />
      <Stack.Screen
        name="mealDetails"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="savedMeals"
        options={{
          headerTitle: "Saved Meals",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#0E0E0E",
          },
          headerTitleStyle: {
            color: "#f5f5f5",
          },
        }}
      />
      <Stack.Screen
        name="workoutHistory"
        options={{
          headerTitle: "Workout History",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#0E0E0E",
          },
          headerTitleStyle: {
            color: "#f5f5f5",
          },
        }}
      />
      <Stack.Screen
        name="savedWorkouts"
        options={{
          headerTitle: "Workout History",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#0E0E0E",
          },
          headerTitleStyle: {
            color: "#f5f5f5",
          },
        }}
      />
    </Stack>
  );
}
