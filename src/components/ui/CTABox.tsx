import { type ReactNode } from "react";
import { clsx } from "clsx";
import { Button } from "./Button";

type CTABoxProps = {
  headline: string;
  subhead?: string;
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  children?: ReactNode;
  className?: string;
  dark?: boolean;
};

export function CTABox({
  headline,
  subhead,
  primaryAction,
  secondaryAction,
  children,
  className,
  dark = false,
}: CTABoxProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border p-8 sm:p-10 md:p-12 text-center",
        dark
          ? "border-slate-700 bg-slate-800/50 text-white"
          : "border-slate-200 bg-slate-50 text-slate-900",
        className
      )}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{headline}</h2>
      {subhead && (
        <p
          className={clsx(
            "mt-3 max-w-xl mx-auto text-lg",
            dark ? "text-slate-300" : "text-slate-600"
          )}
        >
          {subhead}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button href={primaryAction.href} variant="primary" size="lg">
          {primaryAction.label}
        </Button>
        {secondaryAction && (
          <Button
            href={secondaryAction.href}
            variant={dark ? "outline" : "ghost"}
            size="lg"
            className={dark ? "border-white/30 text-white hover:bg-white/10" : ""}
          >
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}
