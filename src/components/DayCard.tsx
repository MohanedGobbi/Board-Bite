"use client";

import type { DayPlan } from "@/lib/types";

const MEAL_LABELS: { key: keyof Pick<DayPlan, "breakfast" | "lunch" | "dinner">; label: string }[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
];

export function DayCard({ day, index }: { day: DayPlan; index: number }) {
  return (
    <div
      style={{ animationDelay: `${index * 60}ms` }}
      className="rise-in flex flex-col gap-3 rounded-xl border border-border bg-surface p-4"
    >
      <h3 className="text-sm font-semibold text-ink">{day.day}</h3>
      <dl className="flex flex-col gap-2.5">
        {MEAL_LABELS.map(({ key, label }) => (
          <div key={key}>
            <dt className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">{label}</dt>
            <dd className="text-sm leading-snug text-ink-soft">{day[key]}</dd>
          </div>
        ))}
        <div>
          <dt className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">Snacks</dt>
          <dd className="text-sm leading-snug text-ink-soft">{day.snacks.join(" · ")}</dd>
        </div>
      </dl>
    </div>
  );
}
