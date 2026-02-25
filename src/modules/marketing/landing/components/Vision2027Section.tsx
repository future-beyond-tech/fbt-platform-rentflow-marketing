"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, IndianRupee, Activity, Smartphone, Layers } from "lucide-react";

const metrics = [
  { icon: Building2, value: "50,000+", label: "Properties" },
  { icon: IndianRupee, value: "₹X,000 Cr", label: "Rent managed" },
  { icon: Activity, value: "99.9%", label: "Uptime target" },
  { icon: Smartphone, value: "85%", label: "Mobile task completion" },
  { icon: Layers, value: "Institutional-grade", label: "Infrastructure" },
];

export default function Vision2027Section() {
  return (
    <section
      className="py-16 sm:py-20 md:py-28 bg-slate-900 text-white overflow-hidden"
      aria-labelledby="vision-2027-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-4xl mx-auto mb-12 sm:mb-16"
        >
          <p
            id="vision-2027-heading"
            className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-4"
          >
            Vision 2027
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            The Infrastructure Layer for India&apos;s Rental Economy
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            One platform. Every PG. Every co-living operator. Built to last.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          {metrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-blue-400" aria-hidden />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{item.value}</p>
                <p className="text-sm font-medium text-slate-400">{item.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 text-sm sm:text-base mt-10 max-w-xl mx-auto"
        >
          Ambitious. Confident. On track.
        </motion.p>
      </div>
    </section>
  );
}
