import { Stack } from "expo-router";

export default function LogLayout() {
  return (
    <Stack>
      {/* Main Log Page */}
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Log" }}
      />

      {/* Modals for Logging */}
      <Stack.Screen
        name="logMeal"
        options={{
          headerShown: false,
          presentation: "modal",
          title: "Log Meal",
        }}
      />
      <Stack.Screen
        name="logWorkout"
        options={{
          headerShown: false,
          presentation: "modal",
          title: "Log Workout",
        }}
      />
      <Stack.Screen
        name="logWeight"
        options={{
          headerShown: false,
          presentation: "modal",
          title: "Log Weight",
        }}
      />
    </Stack>
  );
}
