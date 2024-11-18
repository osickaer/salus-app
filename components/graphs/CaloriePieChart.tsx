import React from "react";
import { View, Dimensions, Text } from "react-native";
import PieChart from "react-native-pie-chart";

interface CaloriePieChartProps {
  proteinCals: number;
  fatCals: number;
  carbsCals: number;
}

const CaloriePieChart: React.FC<CaloriePieChartProps> = ({
  proteinCals,
  fatCals,
  carbsCals,
}) => {
  const totalCals = proteinCals + fatCals + carbsCals;
  const data = [
    proteinCals / totalCals,
    fatCals / totalCals,
    carbsCals / totalCals,
  ];

  const colors = ["#d55a5a", "#e8b923", "#3aafa9"]; // Gold for Protein, Tomato for Fat, SteelBlue for Carbs

  return (
    <View style={{ alignItems: "center" }}>
      <PieChart
        widthAndHeight={72 * 2} // Adjust size as needed
        series={data}
        sliceColor={colors}
      />
    </View>
  );
};

export default CaloriePieChart;
