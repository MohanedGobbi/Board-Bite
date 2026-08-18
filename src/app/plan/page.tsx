"use client";

import { useState } from "react";
import { ALLERGIES } from "@/lib/data/allergies";
import { PREFERENCES } from "@/lib/data/preferences";
import { PlanForm } from "@/components/PlanForm";
import { PlanResults } from "@/components/PlanResults";
import { Nav } from "@/components/Nav";
import type { GeneratedPlan } from "@/lib/types";

function toggleInList(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

export default function PlanPage() {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conditionIds: selectedConditions,
          allergyIds: selectedAllergies,
          preferenceIds: selectedPreferences,
        }),
      });
      if (!res.ok) throw new Error("Couldn't build a plan right now. Please try again.");
      const data: GeneratedPlan = await res.json();
      setPlan(data);
    } catch {
      setError("Couldn't build a plan right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const selectedAllergyNames = ALLERGIES.filter((a) => selectedAllergies.includes(a.id)).map((a) => a.name);
  const selectedPreferenceNames = PREFERENCES.filter((p) => selectedPreferences.includes(p.id)).map((p) => p.name);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Nav />
      <main className="flex-1">
        {plan ? (
          <PlanResults
            plan={plan}
            selectedAllergyNames={selectedAllergyNames}
            selectedPreferenceNames={selectedPreferenceNames}
            onReset={() => setPlan(null)}
          />
        ) : (
          <PlanForm
            selectedConditions={selectedConditions}
            selectedAllergies={selectedAllergies}
            selectedPreferences={selectedPreferences}
            toggleCondition={(id) => setSelectedConditions((prev) => toggleInList(prev, id))}
            toggleAllergy={(id) => setSelectedAllergies((prev) => toggleInList(prev, id))}
            togglePreference={(id) => setSelectedPreferences((prev) => toggleInList(prev, id))}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        )}
      </main>
    </div>
  );
}
