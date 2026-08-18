import type { PreferenceRule } from "@/lib/types";

export const PREFERENCES: PreferenceRule[] = [
  { id: "vegetarian", name: "Vegetarian", avoidTags: ["meat", "seafood"] },
  { id: "vegan", name: "Vegan", avoidTags: ["meat", "seafood"], avoidAllergens: ["dairy", "egg"] },
];
