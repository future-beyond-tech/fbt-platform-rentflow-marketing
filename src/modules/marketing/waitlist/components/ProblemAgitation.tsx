"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, Clock, FileSpreadsheet } from "lucide-react";
import { painPoints } from "../data/waitlist.data";
import type { FC } from "react";

const iconMap = { AlertCircle, Clock, FileSpreadsheet };

export const ProblemAgitation: FC = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4"
        >
          Sound familiar?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-slate-600 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base"
        >
          PG owners waste time and money on tools that weren&apos;t built for them.
        </motion.p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {painPoints.map((point, i) => {
            const Icon = iconMap[point.icon as keyof typeof iconMap] ?? AlertCircle;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm"
              >
                <Icon className="w-10 h-10 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{point.title}</h3>
                <p className="text-slate-600">{point.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
