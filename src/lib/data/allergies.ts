import type { AllergyRule } from "@/lib/types";

export const ALLERGIES: AllergyRule[] = [
  { id: "nuts", name: "Tree Nuts / Peanuts", allergen: "nuts" },
  { id: "shellfish", name: "Shellfish", allergen: "shellfish" },
  { id: "egg", name: "Eggs", allergen: "egg" },
  { id: "soy", name: "Soy", allergen: "soy" },
  { id: "dairy", name: "Dairy", allergen: "dairy" },
  { id: "gluten", name: "Gluten", allergen: "gluten" },
  { id: "fish", name: "Fish", allergen: "fish" },
];
