"use client";

import React from "react";
import { motion } from "framer-motion";
import { socialProof } from "../data/waitlist.data";
import type { FC } from "react";

export const SocialProof: FC = () => {
  return (
    <section className="py-10 sm:py-16 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center"
        >
          {socialProof.map((item, i) => (
            <div key={item.label} className="min-w-0">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">{item.stat}</div>
              <div className="text-slate-600 mt-1 text-sm sm:text-base">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
