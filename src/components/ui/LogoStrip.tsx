import { type ReactNode } from "react";
import { clsx } from "clsx";

type LogoStripProps = {
  headline?: string;
  children: ReactNode;
  className?: string;
};

export function LogoStrip({ headline, children, className }: LogoStripProps) {
  return (
    <div className={clsx("text-center", className)}>
      {headline && (
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-6">
          {headline}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-70 grayscale">
        {children}
      </div>
    </div>
  );
}
