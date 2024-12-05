declare global {
  interface ChatConversation {
    conversationId: string;
    user: string;
    conversationDesc: string;
    createdAt: string;
  }

  interface Message {
    chatId: string;
    role: "user" | "assistant";
    message: string;
  }

  interface ShortMeal {
    mealId: string;
    foodDesc: string;
    mealType: string;
    calories: number;
    mealTimestamp: string;
  }

  interface MealDetail {
    calcium: number;
    calories: number;
    cholesterol: number;
    copper: number;
    cystine: number;
    fiber: number;
    fiberInsoluble: number;
    fiberSoluble: number;
    folate: number;
    foodDesc: string;
    histidine: number;
    ingredients: string[];
    iron: number;
    isoleucine: number;
    leucine: number;
    lysine: number;
    magnesium: number;
    manganese: number;
    mealId: string;
    mealTimestamp: string; // ISO date string
    mealType: string;
    methionine: number;
    monoUnsatFat: number;
    netCarbs: number;
    omega3: number;
    omega6: number;
    phenylalanine: number;
    phosphorus: number;
    polyUnsatFat: number;
    potassium: number;
    protein: number;
    satFat: number;
    selenium: number;
    sodium: number;
    starch: number;
    sugars: number;
    threonine: number;
    totalCarbs: number;
    totalFat: number;
    transFat: number;
    tryptophan: number;
    tyrosine: number;
    user: string; // UUID
    valine: number;
    vitaminA: number;
    vitaminB1: number;
    vitaminB12: number;
    vitaminB2: number;
    vitaminB3: number;
    vitaminB5: number;
    vitaminB6: number;
    vitaminC: number;
    vitaminD: number;
    vitaminE: number;
    vitaminK: number;
    zinc: number;
  }

  interface UserGoal {
    user: string; // UUID
    goalTimestamp: string; // ISO date string
    measureSys: "USCS" | "Metric"; // Measurement system
    activityFactor: number;
    surgery: number;
    trauma: number;
    burns: number;
    infection: number;
    tdee: string; // Total Daily Energy Expenditure as string
    proteinGoal: number;
    fatGoal: number;
    carbGoal: number;
    satFatGoal: number;
    polyUnsatFatGoal: number;
    monoSatFatGoal: number;
    transFatGoal: number;
    cholesterolGoal: number;
    sodiumGoal: number;
    potassiumGoal: number;
    vitAGoal: number;
    vitCGoal: number;
    calciumGoal: number;
    ironGoal: number;
    proteinCalsGoal: number; // Calories from protein
    fatCalsGoal: number; // Calories from fat
    carbCalsGoal: number; // Calories from carbs
    calsGoal: number; // Total calorie goal
    satFatCalsGoal: number; // Calories from saturated fat
    weightGoal: string; // e.g., "Gain Weight"
    bodyGoal: string; // e.g., "Gain Muscle"
    vitaminB1Goal: number;
    vitaminB2Goal: number;
    vitaminB3Goal: number;
    vitaminB5Goal: number;
    vitaminB6Goal: number;
    vitaminB12Goal: number;
    folateGoal: number;
    vitaminDGoal: number;
    vitaminEGoal: number;
    vitaminKGoal: number;
    copperGoal: number;
    magnesiumGoal: number;
    manganeseGoal: number;
    phosphorusGoal: number;
    seleniumGoal: number;
    zincGoal: number;
    fiberGoal: number;
    sugarGoal: number;
    omega3Goal: number;
    omega6Goal: number;
    lifestyleNotes: string;
    bodyNotes: string;
    weightNotes: string;
  }
}

export {}; // This makes it a module and avoids TypeScript errors
