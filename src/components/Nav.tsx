import Link from "next/link";
import type { ReactNode } from "react";

export function Nav({ right }: { right?: ReactNode }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-base font-bold tracking-tight text-ink">
          Board &amp; Bite
        </Link>
        {right}
      </div>
    </header>
  );
}
