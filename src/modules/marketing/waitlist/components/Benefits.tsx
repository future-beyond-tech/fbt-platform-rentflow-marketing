"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Wallet, BarChart3 } from "lucide-react";
import { benefits } from "../data/waitlist.data";
import type { FC } from "react";

const iconMap = { Zap, Wallet, BarChart3 };

export const Benefits: FC = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
        >
          Why RentFlow?
        </motion.h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {benefits.map((benefit, i) => {
            const Icon = iconMap[benefit.icon as keyof typeof iconMap] ?? Zap;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
              >
                <Icon className="w-10 h-10 mb-4 text-blue-200" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-blue-100">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
