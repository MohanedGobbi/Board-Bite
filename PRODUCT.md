# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4, single app, no accounts/database. Diet plan generation is hybrid: a curated rule-based food/condition database assembles the actual weekly plan (deterministic, offline-safe), and the Gemini API (when a key is configured) adds natural-language explanations and tips on top. The app must work with the rule-based engine alone if no Gemini key is present.

## Users

Anyone entering one or more health conditions or dietary goals to get eating guidance. Two overlapping situations, both served by the same flow: someone managing a diagnosed condition (e.g. diabetes, hypertension, celiac) who needs practical day-to-day guidance, and someone without a formal diagnosis pursuing a looser goal or sensitivity (e.g. "I want to lower my cholesterol," "dairy upsets my stomach"). The condition-selection step frames it either way rather than assuming which one applies; the product does not ask the user to declare which category they're in.

## Product Purpose

Given one or more selected illnesses/conditions (and dietary preferences/allergies), generate a personalized weekly meal plan: breakfast/lunch/dinner/snacks for 7 days, a list of foods to avoid, a list of recommended snacks/foods, and short explanatory tips — without requiring an account or any manual meal planning knowledge from the user.

## Positioning

Most diet/nutrition apps start from calorie counting or general wellness. This product starts from the medical/dietary constraint (the illness or condition) and works outward to a ready-made plan, combining a curated, auditable rule base (so avoid/recommend lists are predictable and condition-driven, not AI-hallucinated) with AI-generated explanations for a natural, human tone.

## Operating Context

A marketing/explainer landing page (`/`) leads into the single-session tool (`/plan`): select condition(s)/goals and any dietary preferences or allergies, submit, and view a generated weekly plan on a results view. No login, no saved history between visits (v1). Primarily desktop and mobile browser use.

## Capabilities and Constraints

- Rule-based database covers a curated initial set of common conditions (diabetes, hypertension, high cholesterol, celiac/gluten sensitivity, lactose intolerance, IBS, GERD/acid reflux, chronic kidney disease, gout, PCOS, hypothyroidism, fatty liver, heart disease, general weight management) plus common allergies/exclusions (nuts, shellfish, egg, soy, dairy, gluten).
- Multiple conditions can be selected at once; the plan must satisfy the combined constraints (union of avoid lists).
- Gemini API integration is optional/best-effort: missing or invalid API key must degrade gracefully to the rule-based plan with template-based (non-AI) explanations, not an error state.
- No accounts, no database, no persistence of user data server-side (v1).

## Brand Commitments

None yet — this is a personal/portfolio project with no pre-existing name, identity, or prior visual system. A name and identity are being proposed as part of this design pass.

## Evidence on Hand

None. No existing content, testimonials, data, or assets — all condition/food data will be authored as part of this build and must be presented as general educational guidance, not sourced medical literature.

## Product Principles

- Rule-based logic owns anything safety-adjacent (what's avoided/recommended); AI only adds tone and explanation on top, never overrides the underlying constraint logic.
- Never gatekeep behind login — the core value (get a plan) must be reachable immediately.
- Combining multiple conditions must feel handled, not broken — the UI and the plan should make it clear when a constraint from one condition shaped a choice.
- This is a portfolio piece: craft and polish matter more than exhaustive medical completeness, but the health framing still calls for a calm, credible tone (never gimmicky) and a visible "not medical advice" disclaimer.

## Accessibility & Inclusion

No condition-specific accessibility requirement established. Standard web accessibility (keyboard navigation, contrast, screen-reader friendly form controls) applies given the form-heavy, health-adjacent nature of the product.
