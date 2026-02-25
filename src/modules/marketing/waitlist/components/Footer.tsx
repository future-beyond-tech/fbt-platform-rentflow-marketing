"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Mail } from "lucide-react";
import type { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="py-8 sm:py-12 bg-slate-950 text-slate-400 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
          <span className="font-bold text-white truncate">RentFlow</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
          <Link href="/" className="hover:text-white transition-colors min-h-[44px] flex items-center">
            Main site
          </Link>
          <a href="mailto:hello@rentflow.in" className="flex items-center gap-1 hover:text-white transition-colors min-h-[44px]">
            <Mail className="w-4 h-4 flex-shrink-0" /> hello@rentflow.in
          </a>
        </div>
      </div>
      <p className="text-center text-slate-500 text-xs sm:text-sm mt-4 sm:mt-6 px-4">© {new Date().getFullYear()} RentFlow by Future Beyond Tech.</p>
    </footer>
  );
};
