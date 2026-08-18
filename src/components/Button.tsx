"use client";

import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
};

export function Button({ variant = "primary", size = "md", className = "", children, ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50";
  const sizes = size === "lg" ? "px-6 py-3.5 text-base" : "px-5 py-2.5 text-sm";
  const styles =
    variant === "primary"
      ? "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-hover"
      : "border border-border-strong text-ink hover:bg-surface-alt";

  return (
    <button {...props} className={`${base} ${sizes} ${styles} ${className}`}>
      {children}
    </button>
  );
}
