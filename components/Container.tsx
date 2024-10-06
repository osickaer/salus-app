import { View, Text } from "react-native";
import React from "react";

interface ContainerProps {
  children?: React.ReactNode; // Children can be any valid React element(s)
  extraClassNames?: string; // Optional additional class names
}

const Container: React.FC<ContainerProps> = ({ children, extraClassNames }) => {
  return (
    <View
      className={`bg-darkContainer p-4 mr-4 rounded-md ${
        extraClassNames || ""
      }`}
    >
      {children}
    </View>
  );
};

export default Container;
