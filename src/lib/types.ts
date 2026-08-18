export type MealSlot = "breakfast" | "lunch" | "dinner" | "snack";

export type Allergen = "nuts" | "shellfish" | "egg" | "soy" | "dairy" | "gluten" | "fish";

export interface FoodItem {
  id: string;
  name: string;
  slots: MealSlot[];
  tags: string[];
  allergens: Allergen[];
}

export interface ConditionRule {
  id: string;
  name: string;
  shortLabel: string;
  avoidTags: string[];
  preferTags: string[];
  avoidAllergens?: Allergen[];
  avoidList: string[];
  recommendList: string[];
  snackIds: string[];
  tip: string;
}

export interface AllergyRule {
  id: string;
  name: string;
  allergen: Allergen;
}

export interface PreferenceRule {
  id: string;
  name: string;
  avoidTags: string[];
  avoidAllergens?: Allergen[];
}

export interface DayPlan {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string[];
}

export interface GeneratedPlan {
  days: DayPlan[];
  avoidList: string[];
  recommendList: string[];
  snackSuggestions: string[];
  tips: string[];
  conditionNames: string[];
  degraded: string[];
  summary?: string;
  aiGenerated: boolean;
}
