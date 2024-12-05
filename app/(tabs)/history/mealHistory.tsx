import {
  View,
  Text,
  SectionList,
  SectionListData,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import Container from "@/components/layout/Container";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Section {
  title: string;
  data: ShortMeal[];
}

// Group meals by date for the section list
const groupMealsByDate = (meals: ShortMeal[]): Section[] => {
  const groupedMeals = meals.reduce(
    (grouped: { [date: string]: ShortMeal[] }, meal) => {
      const date = meal.mealTimestamp.split("T")[0]; // Extract the date part
      (grouped[date] = grouped[date] || []).push(meal);
      return grouped;
    },
    {}
  );

  return Object.keys(groupedMeals).map((date) => ({
    title: date,
    data: groupedMeals[date],
  }));
};

export default function MealHistory() {
  const router = useRouter();
  const [data, setData] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeals = async () => {
    try {
      const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/meal/mealHistory`;
      const { data: session } = await supabase.auth.getSession();

      if (!session || !session.session) {
        throw new Error("User is not authenticated.");
      }

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const meals: ShortMeal[] = await response.json();
      setData(groupMealsByDate(meals));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-darkBackground">
        <ActivityIndicator size="large" color="#f5f5f5" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-darkBackground">
        <Text className="text-lg font-medium text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-darkBackground">
      <SectionList
        className="p-4"
        sections={data}
        keyExtractor={(item) => item.mealId}
        renderItem={({ item }: { item: ShortMeal }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/history/mealDetails",
                params: { mealId: item.mealId },
              })
            }
          >
            <Container>
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-lg font-medium text-textPrimaryDark">
                    {item.foodDesc.length > 50
                      ? `${item.foodDesc.slice(0, 50)}...`
                      : item.foodDesc}
                  </Text>
                  <Text className="text-sm text-textSecondaryDark font-normal">
                    {item.calories} Calories
                  </Text>
                  <Text className="text-sm text-textSecondaryDark font-normal">
                    {item.mealType}
                  </Text>
                </View>
                <Ionicons
                  color="#f5f5f5"
                  name="ellipsis-horizontal"
                  size={20}
                />
              </View>
            </Container>
          </TouchableOpacity>
        )}
        renderSectionHeader={({
          section,
        }: {
          section: SectionListData<ShortMeal>;
        }) => (
          <View className="bg-darkBackground p-1 mb-2 shadow-lg">
            <Text className="text-base font-semibold text-textAccentDark">
              {section.title}
            </Text>
          </View>
        )}
        onEndReachedThreshold={0.5}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}
