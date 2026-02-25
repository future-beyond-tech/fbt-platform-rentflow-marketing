"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";

type StatCounterProps = {
  value: number | string;
  suffix?: string;
  label: string;
  className?: string;
  animate?: boolean;
  pilot?: boolean;
};

export function StatCounter({
  value,
  suffix = "",
  label,
  className,
  animate = true,
  pilot = false,
}: StatCounterProps) {
  const [mounted, setMounted] = useState(false);
  const numericValue = typeof value === "number" ? value : 0;
  const displayValue = typeof value === "string" ? value : undefined;

  useEffect(() => {
    setMounted(true);
  }, []);

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!animate || typeof value !== "number" || !mounted) return;
    const duration = 1500;
    const step = numericValue / (duration / 16);
    let current = 0;
    const id = setInterval(() => {
      current += step;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(id);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(id);
  }, [numericValue, animate, mounted]);

  const showValue = displayValue ?? (animate && mounted ? count : numericValue);

  return (
    <div className={clsx("text-center", className)}>
      <p className="text-3xl sm:text-4xl font-bold text-slate-900 tabular-nums">
        {typeof showValue === "number"
          ? showValue.toLocaleString("en-IN")
          : showValue}
        {suffix}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-600">{label}</p>
      {pilot && (
        <p className="mt-0.5 text-xs text-slate-500">Pilot</p>
      )}
    </div>
  );
}
