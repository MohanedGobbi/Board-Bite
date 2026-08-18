# Design

<!-- impeccable:design-schema 1 -->

## World

**Clean modern** — a flat, restrained SaaS-adjacent surface: near-white ground, white cards,
hairline neutral borders, one green accent doing double duty as both the primary action color
and the "safe/recommended" semantic color. No metaphor, no display face, no texture — the
mechanism (condition in, plan out) is the only thing meant to stand out.

This replaces the earlier **Kitchen Wall Calendar** corkboard world (pinned paper index cards,
magnet dots, marker-ink handwriting, torn-paper lists). That world was built and shipped, then
explicitly rejected by the user ("looks bad... keep it simple and modern"). This is a redesign,
not a refinement: the old look was treated as evidence/anti-reference only, nothing from its
visual system (tilt, magnet pins, handwriting font, torn edges, cork texture) carried forward.
Product truth, the rule-engine/AI mechanism, and all copy content were preserved. Full direction
contract lives as an HTML comment, first child of `<body>`, in [layout.tsx](src/app/layout.tsx).

Per direct, specific user brief ("simple and modern" + "add a landing page"), this redesign
skipped the impeccable direction-roll ceremony — a pinned brief overrides the dice.

## Color strategy

Restrained (neutrals plus one accent) — the default for Operate-mode surfaces, and the right
call after the previous Full-palette corkboard world read as too busy. Semantic red is kept
only for the avoid state so it stays the one color that means "stop."

| Token | Light | Dark | Role |
|---|---|---|---|
| `--bg` | `#fafbfa` | `#111413` | Page ground |
| `--surface` / `--surface-alt` | `#ffffff` / `#f3f6f3` | `#191d1b` / `#1e2321` | Cards / section alternation |
| `--border` / `--border-strong` | `#e2e8e3` / `#8b988f` | `#2a302d` / `#616c5e` | Hairline / interactive-boundary borders (both meet 3:1 non-text contrast against their surface) |
| `--ink` / `--ink-soft` / `--ink-faint` | `#15181a` / `#52585a` / `#6b726f` | `#f1f3f1` / `#b7c0bb` / `#78827d` | Text, 3 weights (all ≥4.5:1 on `--bg`/`--surface`) |
| `--primary` / `--primary-hover` | `#157a40` / `#106334` | `#35c274` / `#4fd989` | Brand accent = CTA = "recommended" semantic |
| `--primary-soft` / `--primary-ink` | `#e6f5eb` / `#106334` | `#163325` / `#7fe3a8` | Tinted panels/badges |
| `--on-primary` | `#ffffff` | `#0e1210` | Text/icon color placed on `--primary` — split from `--ink` because a bright accent green needs dark text for 4.5:1 while it needs white text in light mode; never hardcode white/black on a colored surface |
| `--avoid` / `--avoid-soft` / `--avoid-ink` | `#c53a2f` / `#fceceb` / `#9a2f26` | `#e8695f` / `#34211f` / `#f3a89f` | Avoid-list state |

Every text/background and icon/background pairing above was checked against WCAG contrast
minimums (4.5:1 text, 3:1 UI-component boundaries) before shipping — this was not done for the
corkboard world's tan-on-tan pairings, and is worth carrying forward as a standing check.

## Type

Single family: **Inter** (`--font-sans`), weights 400–800. No separate display face — hierarchy
comes entirely from size, weight, and tracking (large headlines use `font-extrabold` and tight
tracking). Deliberately simpler than the previous two-typeface system per the "keep it simple"
brief; Inter is a real sourced/self-hosted Google Font (`next/font/google`), not a system-font
fallback standing in as a display voice.

## Components

- **`Button`** — primary (`bg-primary`/`text-on-primary`) and secondary (bordered, transparent)
  variants, `md`/`lg` sizes. Solid hover/active states, focus-visible ring from `--ring`.
- **`SelectableCard`** — the condition/allergy/preference picker unit: a bordered card with a
  trailing circular checkmark indicator (drawn SVG, not a unicode glyph). Selected state = green
  border + tinted fill + filled checkmark circle. Replaces the old tilted/magnet-pinned card;
  no rotation, no decorative motion on selection.
- **`DayCard`** — one plain card per day in the results grid, `rise-in` entrance staggered by
  60ms/index. No per-field reveal animation (the old `.write-on` clip-path was dropped — one
  authored moment per view, not one per field).
- **`ListCallout`** — avoid/recommend panels: a full-bleed tinted background (never a colored
  `border-left`, which the craft floor bans), heading + drawn check/x icon list. Replaces the
  torn-paper `TornList`.
- **`Nav`** — shared header (wordmark linking home + optional right-side action) used on both
  `/` and `/plan`.

## Motion

One authored entrance, `.rise-in`: opacity 0→1, `translateY(14px)→0`,
`cubic-bezier(0.16, 1, 0.3, 1)` (expo-out, no overshoot), used for the results panels, the
landing hero preview card, and staggered day cards. Respects `prefers-reduced-motion`. Nothing
else animates — no hover-lift, no tilt, no magnet-press; simplicity extends to interaction, not
just color.

## Layout

- Two routes: **`/`** (landing, Persuade mode) and **`/plan`** (the tool, Operate mode) — the
  landing page is new in this redesign; previously `/` went straight to the form.
- Landing hero is a two-column split (headline+CTA / a real preview card showing condition tags
  resolving into an actual sample day's meals — proof, not a claim or generic hero-metric tile).
- "How it works" is three explicitly different visual treatments per step (chips / mini
  avoid-reach panel / quote card), not a repeated icon+heading+text grid — the craft floor flags
  uniform icon-cards as the lazy default for this section.
- `/plan` form: `max-w-4xl`, condition grid `grid-cols-2` → `sm:3` → `md:4`. Results:
  `max-w-5xl`, day grid `grid-cols-1` → `sm:2` → `md:3` → `lg:4` → `xl:7`.
- Corner radius `rounded-lg`/`rounded-xl`/`rounded-2xl` depending on element scale — soft but
  not pill-everything.

## Product name

**Board & Bite** — carried forward unchanged from the previous world; the name itself was never
part of the "looks bad" feedback, only the corkboard visual system.

## Known constraints for future work

- No accounts/persistence (v1 scope, per `PRODUCT.md`).
- Gemini enhancement (`src/lib/gemini.ts`) is best-effort; the rule-based plan and template
  summary/tips remain the source of truth and must keep working with `GEMINI_API_KEY` unset.
- Food/condition data (`src/lib/data/`) is illustrative/general-education content, not sourced
  clinical guidance — see `PRODUCT.md`'s Evidence on Hand.
- The landing page's hero preview and "how it works" step 2/3 use static, hand-picked example
  content (not live-generated) — intentional for a stable marketing surface, but means it will
  drift if the underlying food/rule data changes materially.
