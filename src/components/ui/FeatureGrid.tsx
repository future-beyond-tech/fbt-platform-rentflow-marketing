import { type ReactNode } from "react";
import { clsx } from "clsx";
import { Card } from "./Card";

export type FeatureGridItem = {
  title: string;
  description: string;
  icon?: ReactNode;
};

type FeatureGridProps = {
  items: FeatureGridItem[];
  columns?: 2 | 3 | 4;
  className?: string;
};

export function FeatureGrid({
  items,
  columns = 3,
  className,
}: FeatureGridProps) {
  return (
    <div
      className={clsx(
        "grid gap-4 sm:gap-6",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {items.map((item, i) => (
        <Card key={i} hover padding="md">
          {item.icon && (
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              {item.icon}
            </div>
          )}
          <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            {item.description}
          </p>
        </Card>
      ))}
    </div>
  );
}
