// components/CalendarPicker.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";

interface CalendarPickerProps {
  date: Date;
  show: boolean;
  setShow: (show: boolean) => void;
  onDateChange: (event: any, selectedDate?: Date) => void;
}

export default function CalendarPicker({
  date,
  show,
  setShow,
  onDateChange,
}: CalendarPickerProps) {
  return (
    <View>
      <View className="flex-row justify-between">
        <View className="flex-row items-center">
          <Ionicons name="calendar" size={24} color="#737373" />
          <Text
            onPress={() => setShow(!show)}
            className="text-base text-textPrimaryDark font-base ml-2"
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

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="inline"
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
}
