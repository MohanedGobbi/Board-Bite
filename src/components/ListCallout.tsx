"use client";

type ListCalloutProps = {
  title: string;
  items: string[];
  tone: "avoid" | "recommend";
};

export function ListCallout({ title, items, tone }: ListCalloutProps) {
  const isAvoid = tone === "avoid";

  return (
    <div
      className={`rise-in rounded-xl border p-5 ${
        isAvoid ? "border-avoid-soft bg-avoid-soft" : "border-primary-soft bg-primary-soft"
      }`}
    >
      <h3 className={`mb-3 text-base font-semibold ${isAvoid ? "text-avoid-ink" : "text-primary-ink"}`}>{title}</h3>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={`flex items-start gap-2 text-sm leading-snug ${isAvoid ? "text-avoid-ink" : "text-primary-ink"}`}
          >
            <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden>
              {isAvoid ? (
                <path
                  d="M4 4L12 12M12 4L4 12"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3.5 8.5L6.5 11.5L12.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
