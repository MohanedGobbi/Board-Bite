import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Board & Bite — a weekly diet plan for your condition",
  description:
    "Tell us what you're managing and get a weekly meal plan, a snack list, and what to avoid — built from a curated food-safety rulebook.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <div
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: The mechanism (condition in, safe week out) is the design — nothing else competes with it.
OWN-WORLD: Flat modern surface, Restrained color strategy: near-white ground (#fafbfa), white
cards, hairline neutral borders, a single green accent (#1c9a52) that means both "primary
action" and "recommended/safe" — one hue doing double duty instead of a decorative palette.
Avoid state stays a distinct red (#d1453a) so the one safety-relevant color contrast never
blurs. One typeface (Inter) throughout, hierarchy from size/weight only, no display face.
Redesign of the earlier "Kitchen Wall Calendar" corkboard world — replaced per direct user
feedback ("looks bad... keep it simple and modern"), not refined on top of it.
STORY: Landing page states the mechanism in one viewport and proves it with a live-looking
preview, then hands off to /plan — select condition(s)/allergies as plain checkable cards,
generate, read a clean weekly grid plus avoid/recommend panels.
FIRST VIEWPORT: Nav + hero: headline, one-sentence subhead, primary CTA, and a real preview
card showing condition tags resolving into a sample day's meals — proof, not a claim.
FORM: Direct redesign per user request, no direction-roll re-run (brief pinned: "simple and
modern" + "add a landing page").
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review,
the verdict, and DESIGN.md
-->`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
