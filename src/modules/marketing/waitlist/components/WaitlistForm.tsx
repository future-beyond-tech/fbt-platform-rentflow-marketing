"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import type { FC } from "react";
import type { WaitlistFormState, WaitlistSuccessData } from "../types/waitlist.types";

export const WaitlistForm: FC = () => {
  const [state, setState] = useState<WaitlistFormState>({ email: "", fullName: "", status: "idle" });
  const [result, setResult] = useState<WaitlistSuccessData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.email.trim()) return;
    setState((s) => ({ ...s, status: "loading" }));
    setResult(null);
    try {
      const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const referralCode = urlParams?.get("ref") ?? undefined;

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: state.email.trim(),
          fullName: state.fullName?.trim() || undefined,
          referralCode,
          source: "waitlist_page",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
        setState({ email: "", fullName: "", status: "success", message: data.data.message });
      } else {
        setState((s) => ({
          ...s,
          status: "error",
          message: data.error || "Something went wrong. Try again.",
        }));
      }
    } catch {
      setState((s) => ({ ...s, status: "error", message: "Something went wrong. Try again." }));
    }
  };

  if (state.status === "success" && result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-0 p-4 sm:p-6 rounded-xl bg-green-500/10 border border-green-500/20 text-center"
      >
        <p className="flex items-center justify-center gap-2 text-green-400 text-sm font-medium mb-2">
          <CheckCircle className="w-4 h-4 flex-shrink-0" /> {result.message}
        </p>
        <p className="text-slate-300 text-sm mb-3">Your position: #{result.position.toLocaleString()}</p>
        <p className="text-slate-400 text-xs mb-2">Share your link to move up:</p>
        <code className="block bg-slate-800/50 px-3 py-2 rounded-lg text-xs text-slate-300 break-all select-all">
          {result.referralLink}
        </code>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto min-w-0">
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        <input
          type="text"
          placeholder="Full name (optional)"
          value={state.fullName ?? ""}
          onChange={(e) => setState((s) => ({ ...s, fullName: e.target.value }))}
          disabled={state.status === "loading"}
          className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-base bg-white text-slate-900"
          aria-label="Full name"
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="you@yourpg.com"
            value={state.email}
            onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
            disabled={state.status === "loading"}
            className="flex-1 min-w-0 w-full px-4 py-3 min-h-[44px] rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-base bg-white text-slate-900"
            required
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={state.status === "loading"}
            className="w-full sm:w-auto px-6 py-3 min-h-[44px] rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
          >
            {state.status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden /> : "Join Founding Operators"}
          </button>
        </div>
        {state.status === "error" && (
          <p className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {state.message}
          </p>
        )}
      </motion.form>
    </div>
  );
};
