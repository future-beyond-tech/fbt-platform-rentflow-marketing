"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import type { FC } from "react";

interface ScarcityCounterProps {
  remaining: number;
  total: number;
}

export const ScarcityCounter: FC<ScarcityCounterProps> = ({
  remaining,
  total,
}) => {
  const pct = Math.round((1 - remaining / total) * 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm mx-auto mb-6"
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-amber-400 text-sm font-semibold flex items-center gap-1.5">
          <Users className="w-4 h-4" aria-hidden />
          Founding spots remaining
        </span>
        <span className="text-white font-bold tabular-nums">
          {remaining} / {total}
        </span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, delay: 0.3 }}
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        />
      </div>
    </motion.div>
  );
};
