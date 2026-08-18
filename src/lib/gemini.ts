import type { GeneratedPlan } from "@/lib/types";

interface GeminiEnhancement {
  summary: string;
  tips: string[];
}

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

/**
 * Best-effort AI layer: writes a short, human summary and a few extra tips on top of
 * the already-decided rule-based plan. Never asked to change what's safe to eat —
 * that stays owned by the rule engine. Returns null on any failure so the caller
 * falls back to the template summary/tips.
 */
export async function enhanceWithGemini(
  conditionNames: string[],
  plan: Pick<GeneratedPlan, "avoidList" | "recommendList" | "days">
): Promise<GeminiEnhancement | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const prompt = `You are writing supportive, plain-language copy for a diet-planning app. The user selected these condition(s)/goal(s): ${conditionNames.join(", ") || "none specified"}.

The meal plan itself is already decided by a rule engine (do not change or re-list it). It avoids: ${plan.avoidList.join("; ")}. It emphasizes: ${plan.recommendList.join("; ")}.

Write:
1. "summary": one warm, encouraging paragraph (2-3 sentences) explaining what this plan is built around and why, in plain language, no medical jargon, no exclamation-mark hype.
2. "tips": 3 short practical tips (each under 20 words) for living with these condition(s) day to day, complementary to (not repeating) the avoid/recommend lists above.

Respond as JSON only: {"summary": string, "tips": string[]}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        }),
        signal: AbortSignal.timeout(10_000),
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;

    const parsed = JSON.parse(text);
    if (typeof parsed.summary !== "string" || !Array.isArray(parsed.tips)) return null;

    return {
      summary: parsed.summary,
      tips: parsed.tips.filter((t: unknown): t is string => typeof t === "string").slice(0, 5),
    };
  } catch {
    return null;
  }
}
