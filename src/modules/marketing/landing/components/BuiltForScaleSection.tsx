"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Layers,
  CreditCard,
  GitBranch,
  Code2,
  Shield,
  Activity,
  Database,
  AlertTriangle,
} from "lucide-react";

const pillars = [
  {
    icon: Layers,
    title: "Multi-tenant enforced architecture",
    description: "Isolated data, shared infrastructure. Scale without rewriting.",
  },
  {
    icon: CreditCard,
    title: "Usage-based pricing engine",
    description: "Pay for what you use. No fixed seats, no property caps.",
  },
  {
    icon: GitBranch,
    title: "Blue-Green zero downtime deployments",
    description: "Releases without taking the platform offline.",
  },
  {
    icon: Code2,
    title: "Clean Architecture + CQRS",
    description: "Maintainable codebase. Read/write separation. Event-driven.",
  },
  {
    icon: Shield,
    title: "Enterprise-grade security principles",
    description: "Encryption at rest and in transit. Role-based access.",
  },
  {
    icon: Activity,
    title: "Observability + Monitoring built-in",
    description: "Metrics, traces, alerts. Know the health of every service.",
  },
  {
    icon: Database,
    title: "Backup & Recovery readiness",
    description: "Automated backups. Point-in-time restore. No data loss.",
  },
  {
    icon: AlertTriangle,
    title: "Incident response readiness",
    description: "Runbooks, on-call, post-mortems. Built for reliability.",
  },
];

export default function BuiltForScaleSection() {
  return (
    <section
      id="architecture"
      className="py-16 sm:py-20 md:py-28 bg-white overflow-hidden"
      aria-labelledby="built-for-scale-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <p
            id="built-for-scale-heading"
            className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-4"
          >
            Infrastructure
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            Built for Scale from Day One
          </h2>
          <p className="text-lg sm:text-xl text-slate-600">
            Enterprise-grade foundations. Not bolted on—built in.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-lg shadow-blue-500/20">
                  <Icon className="w-6 h-6 text-white" aria-hidden />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
