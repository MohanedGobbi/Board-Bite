"use client";

import type { GeneratedPlan } from "@/lib/types";
import { DayCard } from "@/components/DayCard";
import { ListCallout } from "@/components/ListCallout";
import { Button } from "@/components/Button";

type PlanResultsProps = {
  plan: GeneratedPlan;
  selectedAllergyNames: string[];
  selectedPreferenceNames: string[];
  onReset: () => void;
};

export function PlanResults({ plan, selectedAllergyNames, selectedPreferenceNames, onReset }: PlanResultsProps) {
  const tags = [...plan.conditionNames, ...selectedAllergyNames, ...selectedPreferenceNames];

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">
            This week accounts for
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.length === 0 ? (
              <span className="text-sm text-ink-faint">A general balanced week</span>
            ) : (
              tags.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-soft"
                >
                  {label}
                </span>
              ))
            )}
          </div>
        </div>
        <Button variant="secondary" onClick={onReset}>
          Start over
        </Button>
      </div>

      {plan.summary && (
        <div className="rise-in mb-10 max-w-2xl rounded-xl border border-primary-soft bg-primary-soft px-5 py-4">
          <p className="text-sm leading-relaxed text-primary-ink">{plan.summary}</p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-primary-ink/70">
            {plan.aiGenerated ? "Written with Gemini, on top of the rule-based plan" : "Rule-based plan"}
          </p>
        </div>
      )}

      {plan.degraded.length > 0 && (
        <div className="mb-10 max-w-2xl rounded-xl border border-border bg-surface-alt px-5 py-4">
          <p className="text-sm font-semibold text-ink">A couple of notes on this plan</p>
          <ul className="mt-1 list-disc pl-5 text-sm text-ink-soft">
            {plan.degraded.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      <section aria-labelledby="week-heading" className="mb-12">
        <h2 id="week-heading" className="mb-4 text-2xl font-bold tracking-tight text-ink">
          Your week
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {plan.days.map((day, i) => (
            <DayCard key={day.day} day={day} index={i} />
          ))}
        </div>
      </section>

      <section aria-labelledby="lists-heading" className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <h2 id="lists-heading" className="sr-only">
          What to avoid and what to reach for
        </h2>
        <ListCallout title="Avoid" items={plan.avoidList} tone="avoid" />
        <ListCallout title="Reach for" items={plan.recommendList} tone="recommend" />
      </section>

      <section aria-labelledby="snacks-heading" className="mb-12">
        <h2 id="snacks-heading" className="mb-4 text-2xl font-bold tracking-tight text-ink">
          Safe snacks
        </h2>
        <div className="flex flex-wrap gap-2">
          {plan.snackSuggestions.map((snack) => (
            <span
              key={snack}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-ink-soft"
            >
              {snack}
            </span>
          ))}
        </div>
      </section>

      {plan.tips.length > 0 && (
        <section aria-labelledby="tips-heading" className="mb-12">
          <h2 id="tips-heading" className="mb-4 text-2xl font-bold tracking-tight text-ink">
            Worth knowing
          </h2>
          <div className="max-w-2xl rounded-xl border border-border bg-surface-alt px-5 py-4">
            <ul className="flex flex-col gap-2.5">
              {plan.tips.map((tip) => (
                <li key={tip} className="text-sm leading-relaxed text-ink-soft">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <p className="max-w-2xl border-t border-border pt-4 text-xs leading-relaxed text-ink-faint">
        Board &amp; Bite gives general educational guidance, not medical advice or a clinical
        nutrition plan. Please check significant dietary changes with a doctor or registered
        dietitian — especially for kidney, thyroid, or other conditions your treatment already
        manages closely.
      </p>
    </div>
  );
}
