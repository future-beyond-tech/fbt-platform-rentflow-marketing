import { type ReactNode } from "react";
import { clsx } from "clsx";

type SectionProps = {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
  id?: string;
  background?: "white" | "muted" | "dark" | "gradient";
};

const bgMap = {
  white: "bg-white",
  muted: "bg-slate-50",
  dark: "bg-slate-900 text-white",
  gradient: "bg-gradient-to-b from-slate-900 to-slate-800 text-white",
};

export function Section({
  children,
  className,
  as: Tag = "section",
  id,
  background = "white",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={clsx("py-16 sm:py-20 md:py-24", bgMap[background], className)}
    >
      {children}
    </Tag>
  );
}
