import { FOODS } from "@/lib/data/foods";
import { CONDITIONS } from "@/lib/data/conditions";
import { ALLERGIES } from "@/lib/data/allergies";
import { PREFERENCES } from "@/lib/data/preferences";
import type { Allergen, DayPlan, FoodItem, GeneratedPlan, MealSlot } from "@/lib/types";

const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function violationCount(food: FoodItem, avoidTags: Set<string>, avoidAllergens: Set<Allergen>): number {
  let count = 0;
  for (const a of food.allergens) if (avoidAllergens.has(a)) count++;
  for (const t of food.tags) if (avoidTags.has(t)) count++;
  return count;
}

function preferScore(food: FoodItem, preferTags: Set<string>): number {
  let score = 0;
  for (const t of food.tags) if (preferTags.has(t)) score++;
  return score;
}

/** Sorts by preference score (desc), shuffling within each score tier for weekly variety. */
function buildRotation(pool: FoodItem[], preferTags: Set<string>): FoodItem[] {
  const byScore = new Map<number, FoodItem[]>();
  for (const food of pool) {
    const score = preferScore(food, preferTags);
    if (!byScore.has(score)) byScore.set(score, []);
    byScore.get(score)!.push(food);
  }
  const scores = [...byScore.keys()].sort((a, b) => b - a);
  return scores.flatMap((score) => shuffle(byScore.get(score)!));
}

export interface PlanRequest {
  conditionIds: string[];
  allergyIds: string[];
  preferenceIds: string[];
}

export function generatePlan(request: PlanRequest): GeneratedPlan {
  const conditions = CONDITIONS.filter((c) => request.conditionIds.includes(c.id));
  const allergies = ALLERGIES.filter((a) => request.allergyIds.includes(a.id));
  const preferences = PREFERENCES.filter((p) => request.preferenceIds.includes(p.id));

  const avoidTags = new Set<string>();
  const avoidAllergens = new Set<Allergen>();
  const preferTags = new Set<string>();

  for (const c of conditions) {
    c.avoidTags.forEach((t) => avoidTags.add(t));
    c.preferTags.forEach((t) => preferTags.add(t));
    c.avoidAllergens?.forEach((a) => avoidAllergens.add(a));
  }
  for (const a of allergies) avoidAllergens.add(a.allergen);
  for (const p of preferences) {
    p.avoidTags.forEach((t) => avoidTags.add(t));
    p.avoidAllergens?.forEach((a) => avoidAllergens.add(a));
  }

  const degraded: string[] = [];

  function poolFor(slot: MealSlot): FoodItem[] {
    const slotPool = FOODS.filter((f) => f.slots.includes(slot));
    const safe = slotPool.filter((f) => violationCount(f, avoidTags, avoidAllergens) === 0);
    if (safe.length > 0) return buildRotation(safe, preferTags);

    // No fully-safe option: fall back to the least-bad match rather than an empty slot.
    degraded.push(
      `No ${slot} option fully clears every selected condition/allergy at once — the closest match was used instead. Double-check that meal against your avoid list.`
    );
    const ranked = [...slotPool].sort(
      (a, b) => violationCount(a, avoidTags, avoidAllergens) - violationCount(b, avoidTags, avoidAllergens)
    );
    return ranked.length > 0 ? ranked : slotPool;
  }

  const breakfastRotation = poolFor("breakfast");
  const lunchRotation = poolFor("lunch");
  const dinnerRotation = poolFor("dinner");
  const snackRotation = poolFor("snack");

  function pick(rotation: FoodItem[], index: number): FoodItem {
    return rotation[index % rotation.length];
  }

  function pickTwoSnacks(dayIndex: number): [FoodItem, FoodItem] {
    const first = pick(snackRotation, dayIndex * 2);
    let secondIndex = dayIndex * 2 + 1;
    let second = pick(snackRotation, secondIndex);
    if (second.id === first.id && snackRotation.length > 1) {
      secondIndex += 1;
      second = pick(snackRotation, secondIndex);
    }
    return [first, second];
  }

  const days: DayPlan[] = DAY_NAMES.map((day, i) => {
    const [snack1, snack2] = pickTwoSnacks(i);
    return {
      day,
      breakfast: pick(breakfastRotation, i).name,
      lunch: pick(lunchRotation, i).name,
      dinner: pick(dinnerRotation, i).name,
      snacks: [snack1.name, snack2.name],
    };
  });

  const avoidList = [...new Set(conditions.flatMap((c) => c.avoidList))];
  const recommendList = [...new Set(conditions.flatMap((c) => c.recommendList))];
  const tips = [...new Set(conditions.map((c) => c.tip))];
  const conditionNames = conditions.map((c) => c.name);

  const curatedSnackIds = [...new Set(conditions.flatMap((c) => c.snackIds))];
  const snackById = new Map(FOODS.map((f) => [f.id, f]));
  const safeSnackNames: string[] = [];
  for (const id of curatedSnackIds) {
    const food = snackById.get(id);
    if (food && violationCount(food, avoidTags, avoidAllergens) === 0) safeSnackNames.push(food.name);
  }
  if (safeSnackNames.length < 6) {
    for (const food of snackRotation) {
      if (safeSnackNames.length >= 10) break;
      if (!safeSnackNames.includes(food.name)) safeSnackNames.push(food.name);
    }
  }

  return {
    days,
    avoidList,
    recommendList,
    snackSuggestions: safeSnackNames.slice(0, 10),
    tips,
    conditionNames,
    degraded: [...new Set(degraded)],
    aiGenerated: false,
  };
}
