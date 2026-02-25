"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Tag, Rocket } from "lucide-react";
import { viralFeatures } from "../data/waitlist.data";
import type { FC } from "react";

const iconMap = { TrendingUp, Tag, Rocket };

export const ViralFeaturesStrip: FC = () => {
  return (
    <section className="py-8 sm:py-12 bg-slate-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {viralFeatures.map((feature, i) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap] ?? Rocket;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 min-w-0"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
