"use client";

import { useState, type ReactNode } from "react";
import { clsx } from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";

export type FAQItem = {
  question: string;
  answer: ReactNode;
};

type FAQAccordionProps = {
  items: FAQItem[];
  className?: string;
};

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={clsx("space-y-2", className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-slate-200 bg-white overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors min-h-[56px]"
            aria-expanded={openIndex === i}
            aria-controls={`faq-answer-${i}`}
            id={`faq-question-${i}`}
          >
            <span>{item.question}</span>
            {openIndex === i ? (
              <ChevronUp className="w-5 h-5 shrink-0 text-slate-500" />
            ) : (
              <ChevronDown className="w-5 h-5 shrink-0 text-slate-500" />
            )}
          </button>
          {openIndex === i && (
            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              className="px-5 pb-5 pt-0 text-slate-600 border-t border-slate-100"
            >
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
