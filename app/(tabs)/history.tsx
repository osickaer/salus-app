import React, { useState } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import dayjs from "dayjs";
import Container from "@/components/Container";
import WeekCalendarScreen from "@/components/WeeklyCalendarScreen";

export default function History() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1 bg-darkBackground"
      style={{ paddingTop: insets.top }}
    >
      <Container padding="p-0" extraClassNames="min-h-[150px]">
        <Text className="text-lg font-semibold text-textPrimaryDark mb-4">
          Weekly Calendar
        </Text>

        <WeekCalendarScreen />
      </Container>
    </View>
  );
}
