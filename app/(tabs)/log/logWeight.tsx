// app/(tabs)/log/weight.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import AccessoryTextInput from "@/components/inputs/AccessoryTextInput";
import ModalHeader from "@/components/layout/ModalHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CalendarPicker from "@/components/calendars/CalendarPicker";
import Container from "@/components/layout/Container";
import { Ionicons } from "@expo/vector-icons";

export default function LogWeight() {
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleCancel = () => {
    console.log("Action cancelled");
    router.back();
  };

  const handleSaveWeight = () => {
    // Handle saving weight logic here
    console.log("Weight logged:", weight);
    router.back(); // Navigate back to the previous page
  };

  return (
    <View className="flex-1 bg-darkModalBackground">
      <ModalHeader
        title="Log Weight"
        onCancel={handleCancel}
        onSave={handleSaveWeight}
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
            <Ionicons name="scale" size={24} color="#737373" />

            <AccessoryTextInput>
              <TextInput
                placeholder="Weight"
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
              lbs
            </Text>
          </View>
        </Container>
      </KeyboardAwareScrollView>
    </View>
  );
}
