import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Button } from "@/components/Button";

export default function LandingPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Nav
        right={
          <Link href="/plan">
            <Button size="md">Open the planner</Button>
          </Link>
        }
      />

      <main className="flex-1">
        {/* Hero: the mechanism stated and proven in one viewport */}
        <section className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Tell us what you&rsquo;re managing.
              <br />
              We&rsquo;ll tell you what to eat this week.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              Select a condition or dietary goal, and get a full week of meals, a safe-snack
              list, and what to avoid — built from a food-safety rulebook, not a guess.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/plan">
                <Button size="lg">Build my week</Button>
              </Link>
              <a href="#how-it-works" className="text-sm font-semibold text-ink-soft hover:text-ink">
                See how it works
              </a>
            </div>
          </div>

          <div className="rise-in rounded-2xl border border-border bg-surface p-5 shadow-[0_1px_2px_rgba(20,24,21,0.04),0_12px_32px_-16px_rgba(20,24,21,0.18)]">
            <div className="flex flex-wrap gap-2">
              {["Type 2 Diabetes", "Dairy-free"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary-soft bg-primary-soft px-3 py-1 text-xs font-semibold text-primary-ink"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="my-4 h-px bg-border" />
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-faint">Monday</p>
            <dl className="flex flex-col gap-3">
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">Breakfast</dt>
                <dd className="text-sm text-ink">Steel-cut oatmeal with mixed berries &amp; cinnamon</dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">Lunch</dt>
                <dd className="text-sm text-ink">Grilled chicken, quinoa, cucumber &amp; lemon-olive oil dressing</dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">Dinner</dt>
                <dd className="text-sm text-ink">Baked chicken breast, quinoa &amp; steamed green beans</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* How it works: one connected flow, each step a different kind of proof */}
        <section id="how-it-works" className="border-t border-border bg-surface-alt">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <h2 className="max-w-lg text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              From condition to a plan you can cook, in three steps.
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
              <div className="flex flex-col gap-4">
                <span className="text-sm font-semibold text-primary">Step 1</span>
                <p className="text-base font-semibold text-ink">Select what applies to you</p>
                <div className="flex flex-wrap gap-2">
                  {["Diabetes", "Gluten", "Vegetarian"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-ink-soft">
                  As many conditions, allergies, or eating styles as apply — the plan is built
                  from the combined list.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-sm font-semibold text-primary">Step 2</span>
                <p className="text-base font-semibold text-ink">The rule engine builds the week</p>
                <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-surface px-4 py-3">
                  <p className="text-xs font-medium text-avoid-ink">Avoid — sugary drinks, fried foods</p>
                  <p className="text-xs font-medium text-primary-ink">Reach for — lean protein, whole grains</p>
                </div>
                <p className="text-sm leading-relaxed text-ink-soft">
                  A curated food-safety rulebook decides what&rsquo;s in and out — auditable and
                  predictable, not AI guesswork.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-sm font-semibold text-primary">Step 3</span>
                <p className="text-base font-semibold text-ink">AI adds the plain-language why</p>
                <blockquote className="rounded-lg border border-border bg-surface px-4 py-3 text-sm italic leading-relaxed text-ink-soft">
                  &ldquo;This week keeps carbs paired with protein to help steady blood sugar
                  through the day.&rdquo;
                </blockquote>
                <p className="text-sm leading-relaxed text-ink-soft">
                  Optional, on top of the rule-based plan — never replacing it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Rules first, AI second.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              What&rsquo;s safe to eat is decided by a curated, condition-by-condition rulebook —
              not a language model. When available, AI only adds a short plain-language summary
              and a few extra tips on top; the underlying plan works the same with or without it.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-faint">
              Board &amp; Bite gives general educational guidance, not medical advice. Always
              check significant dietary changes with a doctor or registered dietitian.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <p className="text-sm text-ink-faint">Board &amp; Bite</p>
        </div>
      </footer>
    </div>
  );
}
