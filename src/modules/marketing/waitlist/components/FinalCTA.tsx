"use client";

import React from "react";
import { motion } from "framer-motion";
import { WaitlistForm } from "./WaitlistForm";
import type { FC } from "react";

export const FinalCTA: FC = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
        >
          Founding spots are limited. Lock in 50% off for life.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-blue-100 mb-6 sm:mb-8 text-sm sm:text-base"
        >
          Join 500+ operators. Get feature voting, founder access, and early AI automation.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <WaitlistForm />
        </motion.div>
      </div>
    </section>
  );
};
