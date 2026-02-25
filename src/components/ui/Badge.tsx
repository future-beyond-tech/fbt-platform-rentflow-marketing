import { type ReactNode } from "react";
import { clsx } from "clsx";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "blue" | "green" | "amber" | "dark";
};

const variantMap = {
  default: "bg-slate-100 text-slate-700",
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  amber: "bg-amber-100 text-amber-800",
  dark: "bg-slate-800 text-slate-200",
};

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        variantMap[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
