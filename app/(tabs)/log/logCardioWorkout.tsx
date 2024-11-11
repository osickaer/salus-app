import React, { useState } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import AccessoryTextInput from "@/components/inputs/AccessoryTextInput";
import ModalHeader from "@/components/layout/ModalHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CalendarPicker from "@/components/calendars/CalendarPicker";
import Container from "@/components/layout/Container";
import { Ionicons } from "@expo/vector-icons";

export default function LogWorkout() {
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [intensity, setIntensity] = useState("Moderate");
  const [isIntensityModalVisible, setIsIntensityModalVisible] = useState(false);

  const handleCancel = () => {
    console.log("Action cancelled");
    router.back();
  };

  const handleSaveWorkout = () => {
    console.log("Cardio logged:");
    router.back(); // Navigate back to the previous page
  };

  return (
    <View className="flex-1 bg-darkModalBackground">
      <ModalHeader
        title="Log Cardio Workout"
        onCancel={handleCancel}
        onSave={handleSaveWorkout}
        cancelText="Back"
        saveText="Save"
      />
      <KeyboardAwareScrollView
        className="px-4"
        contentContainerStyle={{ paddingBottom: 160 }}
        enableOnAndroid={true}
      >
        <Container extraClassNames="bg-tertiaryBackground justify-center">
          <CalendarPicker
            date={date}
            show={show}
            setShow={setShow}
            onDateChange={(e, selectedDate) => {
              if (selectedDate) setDate(selectedDate);
            }}
          />
        </Container>

        <Container extraClassNames="bg-tertiaryBackground justify-center">
          <View className="flex-row items-center">
            <Ionicons name="stopwatch" size={24} color="#737373" />
            <AccessoryTextInput>
              <TextInput
                placeholder="Duration"
                placeholderTextColor="#888"
                className="bg-[#444444] text-textPrimaryDark text-base rounded-md p-2 ml-2 w-[86px] border border-transparent focus:border focus:border-primary/60 text-center"
                style={{ lineHeight: 20 }}
                keyboardType="decimal-pad"
                maxLength={5}
                value={weight}
                onChangeText={setWeight}
              />
            </AccessoryTextInput>
            <Text className="text-textSecondaryDark text-lg ml-2 self-end">
              minutes
            </Text>
          </View>
        </Container>

        <Container extraClassNames="bg-tertiaryBackground justify-center">
          <View className="flex-row items-center">
            <Ionicons name="speedometer" size={24} color="#737373" />
            <TouchableOpacity
              onPress={() => setIsIntensityModalVisible(true)}
              className="flex-1 ml-2 p-3 bg-[#444444] rounded-md"
            >
              <Text className="text-textPrimaryDark text-base">
                {intensity}
              </Text>
            </TouchableOpacity>
          </View>
        </Container>
      </KeyboardAwareScrollView>

      {/* Intensity Picker Modal */}
      <Modal
        visible={isIntensityModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsIntensityModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="w-4/5 bg-darkModalBackground rounded-lg p-4 items-center">
            <Text className="text-lg text-textPrimaryDark font-bold">
              Select Intensity Level
            </Text>

            <Picker
              selectedValue={intensity}
              onValueChange={(itemValue) => setIntensity(itemValue)}
              style={{ width: "100%", color: "white" }}
              dropdownIconColor="#737373"
              itemStyle={{ color: "white" }} // Ensures the text in the Picker is white
            >
              <Picker.Item label="Very light" value="Very light" />
              <Picker.Item label="Light" value="Light" />
              <Picker.Item label="Moderate" value="Moderate" />
              <Picker.Item label="Hard" value="Hard" />
              <Picker.Item label="Maximum" value="Maximum" />
            </Picker>

            {/* "Done" button similar to "Strength" button */}
            <TouchableOpacity
              className="w-full py-3 bg-yellow-600 rounded-md mt-2"
              onPress={() => setIsIntensityModalVisible(false)}
            >
              <Text className="text-white text-center text-base font-semibold">
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
