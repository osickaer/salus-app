import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Container from "@/components/layout/Container";
import ModalHeader from "@/components/layout/ModalHeader";
import CaloriePieChart from "@/components/graphs/CaloriePieChart";
import MicronutrientProgressBar from "@/components/features/MicronutrientProgressBar";
import { supabase } from "@/lib/supabase";

type IconNames = React.ComponentProps<typeof Ionicons>["name"];

export default function MealDetails() {
  const router = useRouter();
  const { mealId } = useLocalSearchParams();
  const [mealDetails, setMealDetails] = useState<MealDetail | null>(null);
  const [userGoal, setUserGoal] = useState<UserGoal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealDetail = async () => {
      if (!mealId) {
        Alert.alert("Error", "Meal ID is missing.");
        return;
      }

      try {
        const jwt = await supabase.auth
          .getSession()
          .then((res) => res.data.session?.access_token);

        if (!jwt) {
          console.error("No JWT found, user may not be authenticated");
          return;
        }
        const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/meal/${mealId}/mealDetail`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch meal detail: ${response.statusText}`
          );
        }

        const mealDetail = await response.json();

        setMealDetails(mealDetail);
      } catch (error) {
        console.error("Error fetching meal detail:", error);
        Alert.alert("Error", "Failed to load meal details.");
      }
    };

    fetchMealDetail();
  }, []);

  useEffect(() => {
    const fetchUserGoal = async () => {
      try {
        const jwt = await supabase.auth
          .getSession()
          .then((res) => res.data.session?.access_token);

        if (!jwt) {
          console.error("No JWT found, user may not be authenticated");
          return;
        }
        const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/goal/userGoal`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch meal detail: ${response.statusText}`
          );
        }

        const userGoal = await response.json();

        setUserGoal(userGoal);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meal detail:", error);
        Alert.alert("Error", "Failed to load meal details.");
      }
    };

    fetchUserGoal();
  }, []);

  const handleCancel = () => {
    router.back();
  };
  const handleSave = () => {
    router.back();
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-darkModalBackground">
        <ActivityIndicator size="large" color="#c99708" />
      </View>
    );
  }

  const micronutrients = [
    {
      title: "Saturated Fat",
      total: mealDetails?.satFat ?? 0,
      goal: userGoal?.satFatGoal ?? 0,
    },
    {
      title: "Polyunsaturated Fat",
      total: mealDetails?.polyUnsatFat ?? 0,
      goal: userGoal?.polyUnsatFatGoal ?? 0,
    },
    {
      title: "Monounsaturated Fat",
      total: mealDetails?.monoUnsatFat ?? 0,
      goal: userGoal?.monoSatFatGoal ?? 0,
    },
    {
      title: "Trans Fat",
      total: mealDetails?.transFat ?? 0,
      goal: userGoal?.transFatGoal ?? 0,
    },
    {
      title: "Cholesterol",
      total: mealDetails?.cholesterol ?? 0,
      goal: userGoal?.cholesterolGoal ?? 0,
    },
    {
      title: "Sodium",
      total: mealDetails?.sodium ?? 0,
      goal: userGoal?.sodiumGoal ?? 0,
    },
    {
      title: "Potassium",
      total: mealDetails?.potassium ?? 0,
      goal: userGoal?.potassiumGoal ?? 0,
    },
    {
      title: "Vitamin A",
      total: mealDetails?.vitaminA ?? 0,
      goal: userGoal?.vitAGoal ?? 0,
    },
    {
      title: "Vitamin C",
      total: mealDetails?.vitaminC ?? 0,
      goal: userGoal?.vitCGoal ?? 0,
    },
    {
      title: "Calcium",
      total: mealDetails?.calcium ?? 0,
      goal: userGoal?.calciumGoal ?? 0,
    },
    {
      title: "Iron",
      total: mealDetails?.iron ?? 0,
      goal: userGoal?.ironGoal ?? 0,
    },
    {
      title: "Vitamin B1",
      total: mealDetails?.vitaminB1 ?? 0,
      goal: userGoal?.vitaminB1Goal ?? 0,
    },
    {
      title: "Vitamin B2",
      total: mealDetails?.vitaminB2 ?? 0,
      goal: userGoal?.vitaminB2Goal ?? 0,
    },
    {
      title: "Vitamin B3",
      total: mealDetails?.vitaminB3 ?? 0,
      goal: userGoal?.vitaminB3Goal ?? 0,
    },
    {
      title: "Vitamin B5",
      total: mealDetails?.vitaminB5 ?? 0,
      goal: userGoal?.vitaminB5Goal ?? 0,
    },
    {
      title: "Vitamin B6",
      total: mealDetails?.vitaminB6 ?? 0,
      goal: userGoal?.vitaminB6Goal ?? 0,
    },
    {
      title: "Vitamin B12",
      total: mealDetails?.vitaminB12 ?? 0,
      goal: userGoal?.vitaminB12Goal ?? 0,
    },
    {
      title: "Folate",
      total: mealDetails?.folate ?? 0,
      goal: userGoal?.folateGoal ?? 0,
    },
    {
      title: "Vitamin D",
      total: mealDetails?.vitaminD ?? 0,
      goal: userGoal?.vitaminDGoal ?? 0,
    },
    {
      title: "Vitamin E",
      total: mealDetails?.vitaminE ?? 0,
      goal: userGoal?.vitaminEGoal ?? 0,
    },
    {
      title: "Vitamin K",
      total: mealDetails?.vitaminK ?? 0,
      goal: userGoal?.vitaminKGoal ?? 0,
    },
    {
      title: "Copper",
      total: mealDetails?.copper ?? 0,
      goal: userGoal?.copperGoal ?? 0,
    },
    {
      title: "Magnesium",
      total: mealDetails?.magnesium ?? 0,
      goal: userGoal?.magnesiumGoal ?? 0,
    },
    {
      title: "Manganese",
      total: mealDetails?.manganese ?? 0,
      goal: userGoal?.manganeseGoal ?? 0,
    },
    {
      title: "Phosphorus",
      total: mealDetails?.phosphorus ?? 0,
      goal: userGoal?.phosphorusGoal ?? 0,
    },
    {
      title: "Selenium",
      total: mealDetails?.selenium ?? 0,
      goal: userGoal?.seleniumGoal ?? 0,
    },
    {
      title: "Zinc",
      total: mealDetails?.zinc ?? 0,
      goal: userGoal?.zincGoal ?? 0,
    },
    {
      title: "Fiber",
      total: mealDetails?.fiber ?? 0,
      goal: userGoal?.fiberGoal ?? 0,
    },
    {
      title: "Sugars",
      total: mealDetails?.sugars ?? 0,
      goal: userGoal?.sugarGoal ?? 0,
    },
    {
      title: "Omega-3",
      total: mealDetails?.omega3 ?? 0,
      goal: userGoal?.omega3Goal ?? 0,
    },
    {
      title: "Omega-6",
      total: mealDetails?.omega6 ?? 0,
      goal: userGoal?.omega6Goal ?? 0,
    },
  ];

  return (
    <View className="flex-1 bg-darkModalBackground">
      <ModalHeader
        title="Meal Details"
        onCancel={handleCancel}
        onSave={handleSave}
        cancelText="Back"
        saveText="Save"
      />
      <KeyboardAwareScrollView
        className="flex-1 bg-darkModalBackground px-4"
        contentContainerStyle={{ paddingBottom: 160 }}
        enableOnAndroid={true}
      >
        <Container extraClassNames="bg-tertiaryBackground">
          {mealDetails && (
            <>
              <Text className="text-textPrimaryDark text-xl font-medium">
                {mealDetails.foodDesc}
              </Text>
              <Text className="text-textSecondaryDark text-lg font-normal">
                {new Date(mealDetails.mealTimestamp).toLocaleDateString()}
              </Text>
              <Text
                className="text-textSecondaryDark text-lg font-normal"
                style={{ lineHeight: 20 }}
              >
                {mealDetails.mealType}
              </Text>
            </>
          )}
        </Container>
        <Container extraClassNames="bg-tertiaryBackground">
          <View className="items-center">
            <CaloriePieChart
              proteinCals={mealDetails?.protein ?? 0}
              carbsCals={mealDetails?.totalCarbs ?? 0}
              fatCals={mealDetails?.totalFat ?? 0}
            />
            <View className="flex-row mt-4">
              <View className="items-center">
                <View className="flex-row items-center">
                  <Text className="text-textPrimaryDark text-lg font-normal">
                    {mealDetails?.protein}
                    <Text className="text-textSecondaryDark text-base font-normal">
                      {" "}
                      (10%)
                    </Text>
                  </Text>
                </View>
                <Text className="text-[#d55a5a] text-lg font-normal">
                  Protein
                </Text>
              </View>
              <View className="ml-4 items-center">
                <View className="flex-row items-center">
                  <Text className="text-textPrimaryDark text-lg font-normal">
                    {mealDetails?.totalCarbs}
                    <Text className="text-textSecondaryDark text-base font-normal">
                      {" "}
                      (60%)
                    </Text>
                  </Text>
                </View>
                <Text className="text-[#e8b923] text-lg font-normal">
                  Carbs
                </Text>
              </View>
              <View className="ml-4 items-center">
                <View className="flex-row items-center">
                  <Text className="text-textPrimaryDark text-lg font-normal">
                    {mealDetails?.totalFat}
                    <Text className="text-textSecondaryDark text-base font-normal">
                      {" "}
                      (20%)
                    </Text>
                  </Text>
                </View>
                <Text className="text-[#3aafa9] text-lg font-normal">Fats</Text>
              </View>
            </View>
          </View>
        </Container>
        <Container extraClassNames="bg-tertiaryBackground">
          <View className="flex-row">
            <Text className="flex-[3] text-textPrimaryDark text-lg font-medium text-left">
              Micronutrient
            </Text>
            <Text className="flex-[2] text-textPrimaryDark text-lg font-medium text-right">
              Total
            </Text>
            <Text className="flex-[3] text-textPrimaryDark text-lg font-medium text-right">
              Daily Goal
            </Text>
          </View>
          {micronutrients.map((nutrient, index) => (
            <MicronutrientProgressBar
              key={index}
              title={nutrient.title}
              total={nutrient.total}
              goal={nutrient.goal}
            />
          ))}
        </Container>
      </KeyboardAwareScrollView>
    </View>
  );
}
