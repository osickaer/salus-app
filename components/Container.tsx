import { View } from "react-native";
import React from "react";

interface ContainerProps {
  children?: React.ReactNode; // Children can be any valid React element(s)
  extraClassNames?: string; // Optional additional class names
  padding?: string; // Custom padding class, e.g., "p-0", "p-4"
  flex?: boolean; // Whether to apply `flex-1` to take full space
}

const Container: React.FC<ContainerProps> = ({
  children,
  extraClassNames,
  padding = "p-4",
  flex = false,
}) => {
  return (
    <View
      className={`${
        flex ? "flex-1" : ""
      } ${padding} bg-darkContainer rounded-md ${extraClassNames || ""}`}
    >
      {children}
    </View>
  );
};

export default Container;
