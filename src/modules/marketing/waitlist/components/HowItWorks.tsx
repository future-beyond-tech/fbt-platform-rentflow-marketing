"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { howItWorksSteps } from "../data/waitlist.data";
import type { FC } from "react";

export const HowItWorks: FC = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-8 sm:mb-12"
        >
          How it works
        </motion.h2>
        <div className="flex flex-col md:flex-row md:items-start gap-6 sm:gap-8 md:gap-4">
          {howItWorksSteps.map((item, i) => (
            <React.Fragment key={item.step}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-1 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </motion.div>
              {i < howItWorksSteps.length - 1 && (
                <div className="hidden md:flex items-center justify-center flex-shrink-0 py-6">
                  <ArrowRight className="w-8 h-8 text-slate-300" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
