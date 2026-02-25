"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";
import { WaitlistForm } from "./WaitlistForm";
import type { FC } from "react";

export const InvestorSection: FC = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold mb-6"
        >
          <TrendingUp className="w-4 h-4" />
          For investors &amp; portfolio owners
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Scale your PG portfolio with usage-based ops
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-slate-400 mb-8"
        >
          Join the waitlist for early access and founding-member pricing.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <WaitlistForm />
        </motion.div>
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mt-6 text-blue-400 hover:text-blue-300 transition-colors"
        >
          Back to main site <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>
    </section>
  );
};
