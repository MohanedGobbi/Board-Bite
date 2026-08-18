"use client";

import { CONDITIONS } from "@/lib/data/conditions";
import { ALLERGIES } from "@/lib/data/allergies";
import { PREFERENCES } from "@/lib/data/preferences";
import { SelectableCard } from "@/components/SelectableCard";
import { Button } from "@/components/Button";

type PlanFormProps = {
  selectedConditions: string[];
  selectedAllergies: string[];
  selectedPreferences: string[];
  toggleCondition: (id: string) => void;
  toggleAllergy: (id: string) => void;
  togglePreference: (id: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
};

export function PlanForm({
  selectedConditions,
  selectedAllergies,
  selectedPreferences,
  toggleCondition,
  toggleAllergy,
  togglePreference,
  onSubmit,
  loading,
  error,
}: PlanFormProps) {
  const hasAnyCondition = selectedConditions.length > 0;

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
      <header className="mb-12 max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          What are you managing?
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          Select a condition or two, flag anything you avoid, and we&rsquo;ll build a full week
          of breakfasts, lunches, dinners and snacks around it.
        </p>
      </header>

      <section aria-labelledby="conditions-heading" className="mb-10">
        <h2 id="conditions-heading" className="mb-1 text-lg font-semibold text-ink">
          Condition or goal
        </h2>
        <p className="mb-4 text-sm text-ink-faint">
          Pick as many as apply — diagnosed condition or a looser goal, either works.
        </p>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
          {CONDITIONS.map((c) => (
            <SelectableCard
              key={c.id}
              label={c.shortLabel}
              selected={selectedConditions.includes(c.id)}
              onToggle={() => toggleCondition(c.id)}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="allergies-heading" className="mb-10">
        <h2 id="allergies-heading" className="mb-4 text-lg font-semibold text-ink">
          Anything to avoid entirely?
        </h2>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
          {ALLERGIES.map((a) => (
            <SelectableCard
              key={a.id}
              label={a.name}
              selected={selectedAllergies.includes(a.id)}
              onToggle={() => toggleAllergy(a.id)}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="preferences-heading" className="mb-12">
        <h2 id="preferences-heading" className="mb-4 text-lg font-semibold text-ink">
          Eating style
        </h2>
        <div className="grid grid-cols-2 gap-2.5 sm:w-1/2">
          {PREFERENCES.map((p) => (
            <SelectableCard
              key={p.id}
              label={p.name}
              selected={selectedPreferences.includes(p.id)}
              onToggle={() => togglePreference(p.id)}
            />
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-4">
        <Button size="lg" onClick={onSubmit} disabled={loading}>
          {loading ? "Building your week…" : "Build my week"}
        </Button>
        {!hasAnyCondition && (
          <p className="text-sm text-ink-faint">
            No condition selected yet — you&rsquo;ll still get a balanced general week.
          </p>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm font-medium text-avoid">
          {error}
        </p>
      )}
    </div>
  );
}
