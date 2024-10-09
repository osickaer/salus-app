import React from "react";
import { View, Text, Dimensions} from "react-native";
import { CalendarProvider, WeekCalendar } from "react-native-calendars";

interface WeekCalendarScreenProps {
  selectedDate : string,
  setSelectedDate : (date: string) => void
}


const WeekCalendarScreen: React.FC<WeekCalendarScreenProps> = ({ selectedDate, setSelectedDate }) => {
  return (
    <CalendarProvider date={selectedDate} showTodayButton={false}>
      <View>
        <WeekCalendar
          firstDay={0} // 0 = Sunday, 1 = Monday
          onDayPress={(day) => setSelectedDate(day.dateString)}
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
          calendarWidth={Dimensions.get("screen").width - 32}
          pagingEnabled={false}
          // disableAllTouchEventsForDisabledDays={true}
        />
      </View>
      <Text className="text-white">{selectedDate}</Text>
    </CalendarProvider>
  );
};

export default WeekCalendarScreen;