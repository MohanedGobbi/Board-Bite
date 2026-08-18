"use client";

type SelectableCardProps = {
  label: string;
  selected: boolean;
  onToggle: () => void;
};

export function SelectableCard({ label, selected, onToggle }: SelectableCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`relative flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
        selected
          ? "border-primary bg-primary-soft text-primary-ink"
          : "border-border bg-surface text-ink hover:border-border-strong"
      }`}
    >
      <span>{label}</span>
      <span
        aria-hidden
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
          selected ? "border-primary bg-primary text-on-primary" : "border-border-strong bg-transparent"
        }`}
      >
        {selected && (
          <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden>
            <path
              d="M3.5 8.5L6.5 11.5L12.5 4.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
