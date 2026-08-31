# Board & Bite

Tell it what condition or dietary goal you're managing and get a full week of meals, a
safe-snack list, and what to avoid — built from a curated food-safety rulebook, not an AI guess.

An optional Gemini layer adds plain-language explanations on top of the plan; the rule-based
engine that decides what's actually safe to eat works the same with or without it.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4. No accounts, no database — everything
lives in a single session.

- `src/lib/data/` — the condition, allergy, preference, and food databases the plan is built from
- `src/lib/planGenerator.ts` — the rule engine that filters and assembles the weekly plan
- `src/lib/gemini.ts` — optional AI layer for the summary/tips (falls back to templates if unused)
- `src/app/` — the landing page (`/`) and the planner (`/plan`)

See [PRODUCT.md](PRODUCT.md) for product context and [DESIGN.md](DESIGN.md) for the design system.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To enable AI-written summaries and tips, copy `.env.local.example` to `.env.local` and add a
[Gemini API key](https://ai.google.dev/). This is entirely optional — the app is fully
functional without it.

## Disclaimer

Board & Bite gives general educational guidance, not medical advice or a clinical nutrition
plan. It's a personal/portfolio project, not a reviewed medical product — check any significant
dietary change with a doctor or registered dietitian.
