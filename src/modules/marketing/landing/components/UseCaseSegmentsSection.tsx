"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, Building2, Building, ArrowRight, Check, X } from "lucide-react";

const segments = [
  {
    icon: Home,
    title: "Micro Owner",
    range: "1–2 properties",
    pain: "Wearing every hat. Rent chasing, utility splits, and compliance on the side. No time to scale.",
    withRentflow: "One dashboard. Auto invoicing, UPI collection, and utility split. Run from your phone.",
    impact: "12+ hrs/month saved. Zero revenue leakage. Ready to add property #2.",
  },
  {
    icon: Building2,
    title: "Growing Operator",
    range: "10–50 properties",
    pain: "Spreadsheets break. Staff coordination fails. Revenue leaks at every handoff. Scaling hurts.",
    withRentflow: "Portfolio-wide view. Role-based access, automated workflows, and real-time P&L.",
    impact: "35+ hrs/month saved. 15–25% leakage recovered. Scale to 50 without adding ops headcount.",
  },
  {
    icon: Building,
    title: "Institutional Portfolio",
    range: "100+ properties",
    pain: "Legacy systems. Data silos. No single source of truth. Investors ask for reports you can't produce.",
    withRentflow: "Institutional-grade stack. Multi-tenant, audit trails, API, and white-label options.",
    impact: "100+ hrs/month saved. Single source of truth. Investor-ready reporting and compliance.",
  },
];

export default function UseCaseSegmentsSection() {
  return (
    <section
      id="use-cases"
      className="py-16 sm:py-20 md:py-28 bg-white overflow-hidden"
      aria-labelledby="use-cases-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <p
            id="use-cases-heading"
            className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-4"
          >
            Use cases
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            From 1 Bed to 1,000 Properties
          </h2>
          <p className="text-lg sm:text-xl text-slate-600">
            Same platform. Every scale. Measurable impact.
          </p>
        </motion.div>

        <div className="space-y-8 sm:space-y-12">
          {segments.map((segment, index) => {
            const Icon = segment.icon;
            return (
              <motion.article
                key={segment.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50 transition-colors"
              >
                <div className="p-6 sm:p-8 md:p-10">
                  <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8">
                    <div className="lg:col-span-3 flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25">
                        <Icon className="w-7 h-7 text-white" aria-hidden />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{segment.title}</h3>
                        <p className="text-sm font-semibold text-blue-600 mt-1">{segment.range}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-9 grid sm:grid-cols-3 gap-6">
                      <div className="sm:col-span-1 flex flex-col">
                        <p className="text-xs font-semibold uppercase tracking-wider text-red-600 mb-2 flex items-center gap-2">
                          <X className="w-4 h-4" aria-hidden /> Current pain
                        </p>
                        <p className="text-slate-700 text-sm leading-relaxed">{segment.pain}</p>
                      </div>
                      <div className="sm:col-span-1 flex items-center justify-center text-slate-300">
                        <ArrowRight className="w-8 h-8 hidden sm:block" aria-hidden />
                      </div>
                      <div className="sm:col-span-1 flex flex-col">
                        <p className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-2 flex items-center gap-2">
                          <Check className="w-4 h-4" aria-hidden /> With RentFlow
                        </p>
                        <p className="text-slate-700 text-sm leading-relaxed">{segment.withRentflow}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-12 pt-4 border-t border-slate-200">
                      <p className="text-sm">
                        <span className="font-semibold text-slate-900">Measurable impact: </span>
                        <span className="text-slate-700">{segment.impact}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
