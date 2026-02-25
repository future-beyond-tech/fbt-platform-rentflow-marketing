"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileSpreadsheet,
  Zap,
  Wallet,
  Scale,
  Puzzle,
  AlertTriangle,
} from "lucide-react";

const painPoints = [
  { icon: FileSpreadsheet, label: "Manual rent tracking" },
  { icon: Zap, label: "Utility disputes" },
  { icon: Wallet, label: "Revenue leakage" },
  { icon: Scale, label: "Compliance complexity" },
  { icon: Puzzle, label: "Fragmented tooling" },
];

export default function WhyNowSection() {
  return (
    <section
      className="py-16 sm:py-20 md:py-28 bg-slate-950 text-white overflow-hidden"
      aria-labelledby="why-now-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-4xl mx-auto mb-12 sm:mb-16"
        >
          <p
            id="why-now-heading"
            className="text-sm sm:text-base font-semibold uppercase tracking-widest text-blue-400 mb-4"
          >
            Why now?
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 sm:mb-8">
            India&apos;s{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              ₹45,000 Cr
            </span>{" "}
            PG Market Still Runs on Excel.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-14 sm:mb-16"
        >
          {painPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex flex-col items-center sm:items-start p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-red-400" aria-hidden />
                </div>
                <span className="text-sm sm:text-base font-semibold text-slate-200 text-center sm:text-left">
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white max-w-3xl mx-auto leading-tight">
            Rental infrastructure needs its{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              operating system.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
