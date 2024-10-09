import React, { useState } from "react";
import { View, Text, LayoutChangeEvent } from "react-native";
import {
  CalendarProvider,
  WeekCalendar,
  DateData,
} from "react-native-calendars";
import dayjs from "dayjs";

interface WeekCalendarScreenProps {
  selectedDate: dayjs.Dayjs;
  setSelectedDate: (date: dayjs.Dayjs) => void;
}

const WeekCalendarScreen: React.FC<WeekCalendarScreenProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const [calendarWidth, setCalendarWidth] = useState<number | null>(null);
  const [currentMonthYear, setCurrentMonthYear] = useState<string>(
    selectedDate.format("MMMM YYYY")
  );

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setCalendarWidth(width);
  };

  // Handle month change when the week is displayed
  const handleMonthChange = (date: DateData) => {
    const monthYear = dayjs(date.dateString).format("MMMM YYYY");
    setCurrentMonthYear(monthYear);
  };

  return (
    <CalendarProvider
      date={selectedDate.format("YYYY-MM-DD")} // Convert dayjs to string for CalendarProvider
      onMonthChange={handleMonthChange}
      showTodayButton={false}
    >
      {/* Title displaying the month and year */}
      <View className="flex items-start m-4">
        <Text className="text-textPrimaryDark text-xl font-medium">
          {currentMonthYear}
        </Text>
      </View>

      {/* Parent View with margin; onLayout dynamically adjusts the width */}
      <View onLayout={onLayout}>
        {calendarWidth && (
          <WeekCalendar
            firstDay={0}
            onDayPress={(day) => setSelectedDate(dayjs(day.dateString))} // Fix dayjs conversion
            markedDates={
              selectedDate
                ? {
                    [selectedDate.format("YYYY-MM-DD")]: {
                      selected: true,
                      selectedColor: "#c99708",
                    },
                  }
                : {}
            }
            theme={{
              calendarBackground: "transparent",
              selectedDayBackgroundColor: "transparent",
              selectedDayTextColor: "white",
              dayTextColor: "white",
              todayTextColor: "white",
            }}
            calendarWidth={calendarWidth}
            staticHeader={true}
            pagingEnabled={false}
            showScrollIndicator={false}
          />
        )}
      </View>
    </CalendarProvider>
  );
};

export default WeekCalendarScreen;
