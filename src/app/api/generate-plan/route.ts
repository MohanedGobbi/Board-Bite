import { NextRequest, NextResponse } from "next/server";
import { generatePlan } from "@/lib/planGenerator";
import { enhanceWithGemini } from "@/lib/gemini";
import { CONDITIONS } from "@/lib/data/conditions";
import { ALLERGIES } from "@/lib/data/allergies";
import { PREFERENCES } from "@/lib/data/preferences";

function templateSummary(conditionNames: string[]): string {
  if (conditionNames.length === 0) {
    return "Here's a general balanced week built from your dietary preferences — pin a condition next time to tailor it further.";
  }
  if (conditionNames.length === 1) {
    return `This week is built around ${conditionNames[0]}: the avoid list keeps out the foods most likely to work against it, and the recommend list leans on what tends to help.`;
  }
  return `This week accounts for all of your picks together — ${conditionNames.join(", ")} — so the avoid list is the combined list from every condition you pinned.`;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { conditionIds, allergyIds, preferenceIds } = (body ?? {}) as {
    conditionIds?: unknown;
    allergyIds?: unknown;
    preferenceIds?: unknown;
  };

  const validConditionIds = new Set(CONDITIONS.map((c) => c.id));
  const validAllergyIds = new Set(ALLERGIES.map((a) => a.id));
  const validPreferenceIds = new Set(PREFERENCES.map((p) => p.id));

  const cleanConditionIds = Array.isArray(conditionIds)
    ? conditionIds.filter((id): id is string => typeof id === "string" && validConditionIds.has(id))
    : [];
  const cleanAllergyIds = Array.isArray(allergyIds)
    ? allergyIds.filter((id): id is string => typeof id === "string" && validAllergyIds.has(id))
    : [];
  const cleanPreferenceIds = Array.isArray(preferenceIds)
    ? preferenceIds.filter((id): id is string => typeof id === "string" && validPreferenceIds.has(id))
    : [];

  const plan = generatePlan({
    conditionIds: cleanConditionIds,
    allergyIds: cleanAllergyIds,
    preferenceIds: cleanPreferenceIds,
  });

  const enhancement = await enhanceWithGemini(plan.conditionNames, plan);

  if (enhancement) {
    plan.summary = enhancement.summary;
    plan.tips = [...enhancement.tips, ...plan.tips];
    plan.aiGenerated = true;
  } else {
    plan.summary = templateSummary(plan.conditionNames);
    plan.aiGenerated = false;
  }

  return NextResponse.json(plan);
}
