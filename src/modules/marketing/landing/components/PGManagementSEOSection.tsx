"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqItems = [
  {
    question: "What is PG management software?",
    answer: "PG management software helps paying guest (PG) and co-living operators manage properties, tenants, rent collection, utility billing, and compliance from a single platform. It replaces spreadsheets and manual bookkeeping with automated invoicing, payment tracking, and real-time visibility.",
  },
  {
    question: "How does per-bed billing work?",
    answer: "Per-bed billing charges each tenant for their bed or room, often with separate components for rent, food, and utilities. Good PG management software in India supports per-bed rates, pro-rata calculations for mid-month move-ins, and automatic utility splits based on usage or fixed shares.",
  },
  {
    question: "How is utility billing automated?",
    answer: "Utility billing is automated by defining rules (e.g. split by bed count or meter reading), then generating line items per tenant and attaching them to the monthly invoice. RentFlow automates utility allocation and sends clear breakdowns to tenants, reducing disputes and manual work.",
  },
  {
    question: "Is RentFlow suitable for small PG owners?",
    answer: "Yes. RentFlow is built for every scale—from a single property with a handful of beds to large portfolios. Usage-based pricing means small PG owners pay only for what they use, with no large upfront cost or fixed monthly fee that burns cash when occupancy is low.",
  },
  {
    question: "What is usage-based pricing?",
    answer: "Usage-based pricing means you pay for the platform based on usage (e.g. rent collected or transactions processed), not per seat or per property. When occupancy or revenue is low, your software cost is lower—aligning the product cost with your business reality.",
  },
];

export default function PGManagementSEOSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      className="py-16 sm:py-20 md:py-28 bg-slate-50 overflow-hidden"
      aria-labelledby="pg-software-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Educational content */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mb-12 sm:mb-16"
        >
          <h2
            id="pg-software-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6"
          >
            What is PG Management Software in India?
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700 space-y-6">
            <p>
              PG management software is a platform designed to run paying guest accommodations and co-living operations. It covers tenant onboarding, rent collection, utility splitting, maintenance, compliance, and reporting—so owners can focus on occupancy and experience instead of spreadsheets and midnight reconciliation.
            </p>
            <p>
              India needs a localized solution because the model here is different: per-bed billing, food and utility components, GST on rent, and a mix of UPI, cash, and bank transfers. Generic property management tools built for Western markets don’t handle these workflows. A PG management software built for India does.
            </p>
            <p>
              Usage-based pricing is different from traditional SaaS. Instead of paying a fixed fee per property or per user regardless of revenue, you pay in line with what you collect. When occupancy drops, your software cost drops. That alignment makes it easier for small PG owners to adopt and for scaling operators to predict costs as they grow.
            </p>
            <p>
              RentFlow is built as India’s first usage-based operating system for PG and co-living infrastructure—aimed at digitizing rental operations from a single bed to thousands of properties, with automation, visibility, and compliance built in.
            </p>
          </div>
        </motion.header>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            Frequently asked questions
          </h3>
          <ul className="space-y-3" role="list">
            {faqItems.map((item, index) => (
              <li key={item.question}>
                <article className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-4 text-left min-h-[44px] hover:bg-slate-50 transition-colors"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className="font-semibold text-slate-900">{item.question}</span>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" aria-hidden />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" aria-hidden />
                    )}
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-question-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-4 pt-0 text-slate-700 leading-relaxed border-t border-slate-100">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </li>
            ))}
          </ul>
        </motion.div>

        <nav className="mt-12 text-center" aria-label="Next steps">
          <a
            href="/waitlist"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
          >
            Join the waitlist
            <span aria-hidden>→</span>
          </a>
        </nav>
      </div>
    </section>
  );
}
