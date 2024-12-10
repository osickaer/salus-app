import { View, StyleSheet } from "react-native";
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
        flex ? "flex-1" : "flex"
      } ${padding} bg-darkContainer rounded-md mb-4 ${extraClassNames || ""}`}
      style={[styles.shadow, { elevation: 15 }]} // Adjust elevation for Android
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000", // Color of the shadow
    shadowOffset: {
      width: 0,
      height: 2, // Height of the shadow (distance from the element)
    },
    shadowOpacity: 0.2, // Opacity of the shadow
    shadowRadius: 5, // Spread of the shadow (controls the size)
  },
});

export default Container;
