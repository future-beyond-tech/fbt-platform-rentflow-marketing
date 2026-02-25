"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { FC } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date();
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export const CountdownTimer: FC<CountdownTimerProps> = ({ targetDate }) => {
  const target = new Date(targetDate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(target));

  useEffect(() => {
    const t = new Date(targetDate);
    const id = setInterval(() => setTimeLeft(getTimeLeft(t)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex flex-wrap items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-xs sm:text-sm font-semibold max-w-full"
    >
      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
      <span className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {units.map(({ value, label }) => (
          <span key={label} className="tabular-nums whitespace-nowrap">
            {String(value).padStart(2, "0")} {label}
          </span>
        ))}
      </span>
    </motion.div>
  );
};
