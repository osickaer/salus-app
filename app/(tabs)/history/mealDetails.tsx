import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Container from "@/components/layout/Container";
import ModalHeader from "@/components/layout/ModalHeader";
import CaloriePieChart from "@/components/graphs/CaloriePieChart";
import MicronutrientProgressBar from "@/components/features/MicronutrientProgressBar";

interface MealDetails {
  user_id: string;
  meal_timestamp: Date;
  food_desc: string;
  ingredients: string[]; // Assuming ingredients are stored as an array of strings
  calories: number;
  protein: number;
  total_carbs: number;
  total_fat: number;
  sat_fat: number;
  poly_unsat_fat: number;
  mono_unsat_fat: number;
  trans_fat: number;
  cholesterol: number;
  sodium: number;
  potassium: number;
  vitamin_a: number;
  vitamin_c: number;
  calcium: number;
  iron: number;
  meal_type: string;
  vitamin_b1: number;
  vitamin_b2: number;
  vitamin_b3: number;
  vitamin_b5: number;
  vitamin_b6: number;
  vitamin_b12: number;
  folate: number;
  vitamin_d: number;
  vitamin_e: number;
  vitamin_k: number;
  copper: number;
  magnesium: number;
  manganese: number;
  phosphorus: number;
  selenium: number;
  zinc: number;
  fiber: number;
  fiber_soluble: number;
  fiber_insoluble: number;
  net_carbs: number;
  starch: number;
  sugars: number;
  omega_3: number;
  omega_6: number;
  histidine: number;
  isoleucine: number;
  leucine: number;
  lysine: number;
  methionine: number;
  phenylalanine: number;
  threonine: number;
  tryptophan: number;
  tyrosine: number;
  valine: number;
  cystine: number;
  meal_id: string;
}

interface UserGoals {
  protein_goal: number;
  fat_goal: number;
  carb_goal: number;
  sat_fat_goal: number;
  poly_unsat_fat_goal: number;
  mono_unsat_fat_goal: number;
  trans_fat_goal: number;
  cholesterol_goal: number;
  sodium_goal: number;
  potassium_goal: number;
  vit_a_goal: number;
  vit_c_goal: number;
  calcium_goal: number;
  iron_goal: number;
  protein_cals_goal: number;
  fat_cals_goal: number;
  carb_cals_goal: number;
  cals_goal: number;
  sat_fat_cals_goal: number;
  vitamin_b1_goal: number;
  vitamin_b2_goal: number;
  vitamin_b3_goal: number;
  vitamin_b5_goal: number;
  vitamin_b6_goal: number;
  vitamin_b12_goal: number;
  folate_goal: number;
  vitamin_d_goal: number;
  vitamin_e_goal: number;
  vitamin_k_goal: number;
  copper_goal: number;
  magnesium_goal: number;
  manganese_goal: number;
  phosphorus_goal: number;
  selenium_goal: number;
  zinc_goal: number;
  fiber_goal: number;
  sugar_goal: number;
  omega_3_goal: number;
  omega_6_goal: number;
}

const mockMealData: MealDetails = {
  user_id: "cffb4f66-6094-44a3-9580-e75ac1a4d43f",
  meal_timestamp: new Date("2024-11-06T00:00:00"),
  food_desc: "Rice, beans, and egg",
  ingredients: ["Rice", "Beans", "Egg"],
  calories: 387,
  protein: 16.3,
  total_carbs: 66.8,
  total_fat: 6.7,
  sat_fat: 1.5,
  poly_unsat_fat: 2.0,
  mono_unsat_fat: 1.2,
  trans_fat: 0.0,
  cholesterol: 186,
  sodium: 300,
  potassium: 580,
  vitamin_a: 300,
  vitamin_c: 1.0,
  calcium: 60,
  iron: 3.1,
  meal_type: "lunch",
  vitamin_b1: 0.3,
  vitamin_b2: 0.2,
  vitamin_b3: 2.3,
  vitamin_b5: 0.9,
  vitamin_b6: 0.5,
  vitamin_b12: 0.5,
  folate: 120,
  vitamin_d: 1.1,
  vitamin_e: 0.7,
  vitamin_k: 0.8,
  copper: 0.2,
  magnesium: 60,
  manganese: 0.8,
  phosphorus: 250,
  selenium: 25,
  zinc: 1.5,
  fiber: 7.5,
  fiber_soluble: 1.2,
  fiber_insoluble: 6.3,
  net_carbs: 59.3,
  starch: 40,
  sugars: 1.2,
  omega_3: 0.1,
  omega_6: 1.5,
  histidine: 0.4,
  isoleucine: 0.7,
  leucine: 1.2,
  lysine: 1.1,
  methionine: 0.3,
  phenylalanine: 0.5,
  threonine: 0.6,
  tryptophan: 0.2,
  tyrosine: 0.4,
  valine: 0.8,
  cystine: 0.3,
  meal_id: "01e45fab-c7ef-4cd2-8c67-9036cda0a3c9",
};

const mockUserGoals: UserGoals = {
  protein_goal: 166,
  fat_goal: 65,
  carb_goal: 293,
  sat_fat_goal: 22,
  poly_unsat_fat_goal: 22,
  mono_unsat_fat_goal: 22,
  trans_fat_goal: 1,
  cholesterol_goal: 250,
  sodium_goal: 1500,
  potassium_goal: 3400,
  vit_a_goal: 900,
  vit_c_goal: 90,
  calcium_goal: 1000,
  iron_goal: 8,
  protein_cals_goal: 666,
  fat_cals_goal: 583,
  carb_cals_goal: 1170,
  cals_goal: 2419,
  sat_fat_cals_goal: 194,
  vitamin_b1_goal: 1.2,
  vitamin_b2_goal: 1.3,
  vitamin_b3_goal: 16,
  vitamin_b5_goal: 5,
  vitamin_b6_goal: 1.3,
  vitamin_b12_goal: 2.4,
  folate_goal: 400,
  vitamin_d_goal: 15,
  vitamin_e_goal: 15,
  vitamin_k_goal: 120,
  copper_goal: 0.9,
  magnesium_goal: 400,
  manganese_goal: 2.3,
  phosphorus_goal: 700,
  selenium_goal: 55,
  zinc_goal: 11,
  fiber_goal: 38,
  sugar_goal: 36,
  omega_3_goal: 1.6,
  omega_6_goal: 17,
};

type IconNames = React.ComponentProps<typeof Ionicons>["name"];

export default function MealDetails() {
  const userId = "cffb4f66-6094-44a3-9580-e75ac1a4d43f";
  const router = useRouter();
  const { mealId } = useLocalSearchParams();
  const [mealDetails, setMealDetails] = useState<MealDetails | null>(null);
  const [userGoals, setUserGoals] = useState<UserGoals | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mealId) {
      // Simulate an API call to fetch meal details by mealId
      setLoading(true);
      setTimeout(() => {
        setMealDetails(mockMealData); // Use fetched data here
        setLoading(false);
      }, 100); // Simulate a 1-second delay
    }
  }, [mealId]);

  useEffect(() => {
    if (userId) {
      // Simulate an API call to fetch meal details by mealId
      setLoading(true);
      setTimeout(() => {
        setUserGoals(mockUserGoals); // Use fetched data here
        setLoading(false);
      }, 100); // Simulate a 1-second delay
    }
  }, [userId]);

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
      total: mealDetails?.sat_fat ?? 0,
      goal: userGoals?.sat_fat_goal ?? 0,
    },
    {
      title: "Polyunsaturated Fat",
      total: mealDetails?.poly_unsat_fat ?? 0,
      goal: userGoals?.poly_unsat_fat_goal ?? 0,
    },
    {
      title: "Monounsaturated Fat",
      total: mealDetails?.mono_unsat_fat ?? 0,
      goal: userGoals?.mono_unsat_fat_goal ?? 0,
    },
    {
      title: "Trans Fat",
      total: mealDetails?.trans_fat ?? 0,
      goal: userGoals?.trans_fat_goal ?? 0,
    },
    {
      title: "Cholesterol",
      total: mealDetails?.cholesterol ?? 0,
      goal: userGoals?.cholesterol_goal ?? 0,
    },
    {
      title: "Sodium",
      total: mealDetails?.sodium ?? 0,
      goal: userGoals?.sodium_goal ?? 0,
    },
    {
      title: "Potassium",
      total: mealDetails?.potassium ?? 0,
      goal: userGoals?.potassium_goal ?? 0,
    },
    {
      title: "Vitamin A",
      total: mealDetails?.vitamin_a ?? 0,
      goal: userGoals?.vit_a_goal ?? 0,
    },
    {
      title: "Vitamin C",
      total: mealDetails?.vitamin_c ?? 0,
      goal: userGoals?.vit_c_goal ?? 0,
    },
    {
      title: "Calcium",
      total: mealDetails?.calcium ?? 0,
      goal: userGoals?.calcium_goal ?? 0,
    },
    {
      title: "Iron",
      total: mealDetails?.iron ?? 0,
      goal: userGoals?.iron_goal ?? 0,
    },
    {
      title: "Vitamin B1",
      total: mealDetails?.vitamin_b1 ?? 0,
      goal: userGoals?.vitamin_b1_goal ?? 0,
    },
    {
      title: "Vitamin B2",
      total: mealDetails?.vitamin_b2 ?? 0,
      goal: userGoals?.vitamin_b2_goal ?? 0,
    },
    {
      title: "Vitamin B3",
      total: mealDetails?.vitamin_b3 ?? 0,
      goal: userGoals?.vitamin_b3_goal ?? 0,
    },
    {
      title: "Vitamin B5",
      total: mealDetails?.vitamin_b5 ?? 0,
      goal: userGoals?.vitamin_b5_goal ?? 0,
    },
    {
      title: "Vitamin B6",
      total: mealDetails?.vitamin_b6 ?? 0,
      goal: userGoals?.vitamin_b6_goal ?? 0,
    },
    {
      title: "Vitamin B12",
      total: mealDetails?.vitamin_b12 ?? 0,
      goal: userGoals?.vitamin_b12_goal ?? 0,
    },
    {
      title: "Folate",
      total: mealDetails?.folate ?? 0,
      goal: userGoals?.folate_goal ?? 0,
    },
    {
      title: "Vitamin D",
      total: mealDetails?.vitamin_d ?? 0,
      goal: userGoals?.vitamin_d_goal ?? 0,
    },
    {
      title: "Vitamin E",
      total: mealDetails?.vitamin_e ?? 0,
      goal: userGoals?.vitamin_e_goal ?? 0,
    },
    {
      title: "Vitamin K",
      total: mealDetails?.vitamin_k ?? 0,
      goal: userGoals?.vitamin_k_goal ?? 0,
    },
    {
      title: "Copper",
      total: mealDetails?.copper ?? 0,
      goal: userGoals?.copper_goal ?? 0,
    },
    {
      title: "Magnesium",
      total: mealDetails?.magnesium ?? 0,
      goal: userGoals?.magnesium_goal ?? 0,
    },
    {
      title: "Manganese",
      total: mealDetails?.manganese ?? 0,
      goal: userGoals?.manganese_goal ?? 0,
    },
    {
      title: "Phosphorus",
      total: mealDetails?.phosphorus ?? 0,
      goal: userGoals?.phosphorus_goal ?? 0,
    },
    {
      title: "Selenium",
      total: mealDetails?.selenium ?? 0,
      goal: userGoals?.selenium_goal ?? 0,
    },
    {
      title: "Zinc",
      total: mealDetails?.zinc ?? 0,
      goal: userGoals?.zinc_goal ?? 0,
    },
    {
      title: "Fiber",
      total: mealDetails?.fiber ?? 0,
      goal: userGoals?.fiber_goal ?? 0,
    },
    {
      title: "Sugars",
      total: mealDetails?.sugars ?? 0,
      goal: userGoals?.sugar_goal ?? 0,
    },
    {
      title: "Omega-3",
      total: mealDetails?.omega_3 ?? 0,
      goal: userGoals?.omega_3_goal ?? 0,
    },
    {
      title: "Omega-6",
      total: mealDetails?.omega_6 ?? 0,
      goal: userGoals?.omega_6_goal ?? 0,
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
                {mealDetails.food_desc}
              </Text>
              <Text className="text-textSecondaryDark text-lg font-normal">
                {mealDetails.meal_timestamp.toLocaleDateString()}
              </Text>
              <Text
                className="text-textSecondaryDark text-lg font-normal"
                style={{ lineHeight: 20 }}
              >
                {mealDetails.meal_type}
              </Text>
            </>
          )}
        </Container>
        <Container extraClassNames="bg-tertiaryBackground">
          <View className="items-center">
            <CaloriePieChart
              proteinCals={mealDetails?.protein ?? 0}
              carbsCals={mealDetails?.total_carbs ?? 0}
              fatCals={mealDetails?.total_fat ?? 0}
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
                    {mealDetails?.total_carbs}
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
                    {mealDetails?.total_fat}
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
