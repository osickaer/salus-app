import { Stack } from "expo-router";

export default function LogLayout() {
  return (
    <Stack>
      {/* Main Chat Page */}
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Chat" }}
      />

      <Stack.Screen
        name="conversation"
        options={{
          headerShown: true,
          title: "",
          headerStyle: {
            backgroundColor: "#0E0E0E", // Replace with your desired color
          },
        }}
      />
    </Stack>
  );
}
