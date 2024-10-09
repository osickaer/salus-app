import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { CalendarProvider, WeekCalendar } from "react-native-calendars";

const WeekCalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  // Handler for date selection
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <CalendarProvider date={selectedDate} showTodayButton={false}>
      <View>
        <WeekCalendar
          firstDay={0} // 0 = Sunday, 1 = Monday
          onDayPress={(day) => handleDateChange(day.dateString)}
          markedDates={
            selectedDate
              ? {
                  [selectedDate]: {
                    selected: true,
                    selectedColor: "#c99708",
                  },
                }
              : {}
          }
          theme={{
            calendarBackground: "transparent", // Make calendar background transparent
            selectedDayBackgroundColor: "transparent",
            selectedDayTextColor: "white",
            dayTextColor: "white",
            todayTextColor: "white",
          }}
          // disableAllTouchEventsForDisabledDays={true}
        />
      </View>
      <Text className="text-white">{selectedDate}</Text>
    </CalendarProvider>
  );
};

export default WeekCalendarScreen;
