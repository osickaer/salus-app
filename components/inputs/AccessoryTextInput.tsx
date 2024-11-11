import React, { ReactElement, RefObject } from "react";
import {
  View,
  TextInput,
  InputAccessoryView,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";

interface AccessoryTextInputProps {
  children: ReactElement<typeof TextInput>;
  nextFieldRef?: RefObject<TextInput>;
  accessoryLabel?: string;
}

// Extend TextInput props to include inputAccessoryViewID
type TextInputWithAccessoryID = React.ElementType & {
  inputAccessoryViewID?: string;
};

const AccessoryTextInput: React.FC<AccessoryTextInputProps> = ({
  children,
  nextFieldRef,
  accessoryLabel = "Done",
}) => {
  const accessoryID = accessoryLabel;

  return (
    <View>
      {/* Render the passed TextInput component */}
      {React.cloneElement(
        children as React.ReactElement<TextInputWithAccessoryID>,
        {
          inputAccessoryViewID: accessoryID,
        }
      )}

      {/* Accessory View */}
      <InputAccessoryView nativeID={accessoryID}>
        <View className="w-full h-12 flex-row justify-end items-center bg-[#131313] px-2">
          <TouchableOpacity
            onPress={() => {
              if (accessoryLabel === "Next" && nextFieldRef?.current) {
                nextFieldRef.current.focus();
              } else {
                Keyboard.dismiss();
              }
            }}
          >
            <Text className="text-lg font-bold underline text-[#c99708]">
              {accessoryLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </InputAccessoryView>
    </View>
  );
};

export default AccessoryTextInput;
