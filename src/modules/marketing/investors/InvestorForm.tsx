"use client";

import React, { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

const INVESTOR_TYPES = [
  "Angel",
  "VC",
  "PG Operator",
  "Corporate",
] as const;

type InvestorType = (typeof INVESTOR_TYPES)[number];

interface FormState {
  fullName: string;
  email: string;
  investorType: InvestorType | "";
  linkedinUrl: string;
  message: string;
  status: "idle" | "loading" | "success" | "error";
}

const initialState: FormState = {
  fullName: "",
  email: "",
  investorType: "",
  linkedinUrl: "",
  message: "",
  status: "idle",
};

export function InvestorForm() {
  const [state, setState] = useState<FormState>(initialState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.fullName.trim() || !state.email.trim()) return;
    setState((s) => ({ ...s, status: "loading" }));
    try {
      const response = await fetch("/api/investors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: state.fullName.trim(),
          email: state.email.trim(),
          investorType: state.investorType || undefined,
          linkedinUrl: state.linkedinUrl?.trim() || undefined,
          message: state.message?.trim() || undefined,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setState({ ...initialState, status: "success" });
      } else {
        setState((s) => ({ ...s, status: "error" }));
      }
    } catch {
      setState((s) => ({ ...s, status: "error" }));
    }
  };

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" aria-hidden />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Thank you.</h3>
        <p className="text-slate-600">
          We will reach out within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-5"
    >
      <div>
        <label htmlFor="investor-name" className="block text-sm font-medium text-slate-700 mb-1.5">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="investor-name"
          type="text"
          required
          value={state.fullName}
          onChange={(e) => setState((s) => ({ ...s, fullName: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          placeholder="Full name"
        />
      </div>
      <div>
        <label htmlFor="investor-email" className="block text-sm font-medium text-slate-700 mb-1.5">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="investor-email"
          type="email"
          required
          value={state.email}
          onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="investor-type" className="block text-sm font-medium text-slate-700 mb-1.5">
          Investor Type
        </label>
        <p className="text-xs text-slate-500 mb-2" id="investor-type-hint">
          Helps us tailor the investor brief.
        </p>
        <select
          id="investor-type"
          value={state.investorType}
          onChange={(e) => setState((s) => ({ ...s, investorType: e.target.value as InvestorType | "" }))}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
          aria-describedby="investor-type-hint investor-type-helper"
        >
          <option value="">Select</option>
          {INVESTOR_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <p className="mt-1.5 text-xs text-slate-500" id="investor-type-helper">
          Select the category that best describes you.
        </p>
      </div>
      <div>
        <label htmlFor="investor-linkedin" className="block text-sm font-medium text-slate-700 mb-1.5">
          LinkedIn URL
        </label>
        <input
          id="investor-linkedin"
          type="url"
          value={state.linkedinUrl}
          onChange={(e) => setState((s) => ({ ...s, linkedinUrl: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          placeholder="https://linkedin.com/in/..."
        />
      </div>
      <div>
        <label htmlFor="investor-message" className="block text-sm font-medium text-slate-700 mb-1.5">
          Message <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="investor-message"
          rows={3}
          value={state.message}
          onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
          placeholder="Brief note or question"
        />
      </div>
      {state.status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={state.status === "loading"}
        className="w-full sm:w-auto px-8 py-4 min-h-[48px] rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
      >
        {state.status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Request Investor Brief"
        )}
      </button>
    </form>
  );
}
