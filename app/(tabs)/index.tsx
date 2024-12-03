// app/(tabs)/index.tsx

import { Redirect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const Index = () => {
  return <Redirect href="/chat" />;
};
export default Index;
