import React, { useState } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import dayjs from "dayjs";
import Container from "@/components/Container";
import WeekCalendarScreen from "@/components/WeeklyCalendarScreen";

export default function History() {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  return (
    <View
      className="flex-1 bg-darkBackground"
      style={{ paddingTop: insets.top }}
    >
      <Container padding="p-0" extraClassNames="min-h-[150px] m-4">
        <Text className="text-lg font-semibold text-textPrimaryDark mb-4">
          Weekly Calendar
        </Text>

        <WeekCalendarScreen selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      </Container>
    </View>
  );
}
