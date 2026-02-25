"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Calculator, Clock, Wallet, TrendingUp, Percent } from "lucide-react";

const HOURS_SAVED_PER_BED = 0.75;
const LEAKAGE_RECOVERY_RATE = 0.02;
const OWNER_HOUR_VALUE = 500;

interface CalculatorInputs {
  properties: number;
  bedsPerProperty: number;
  avgRent: number;
  utilityCostPerBed: number;
}

function computeROI(inputs: CalculatorInputs) {
  const totalBeds = inputs.properties * inputs.bedsPerProperty;
  const adminHoursSaved = totalBeds * HOURS_SAVED_PER_BED;
  const monthlyRevenue = totalBeds * inputs.avgRent;
  const revenueLeakageRecovered = monthlyRevenue * LEAKAGE_RECOVERY_RATE;
  const timeValueSaved = adminHoursSaved * OWNER_HOUR_VALUE;
  const annualProfitImpact =
    (timeValueSaved + revenueLeakageRecovered) * 12;
  const traditionalMonthlyCost = Math.min(
    45000,
    15000 + totalBeds * 50
  );
  const rentflowEstimate = Math.min(8000, 2000 + totalBeds * 8);
  const costReductionPct =
    traditionalMonthlyCost > 0
      ? Math.round(
          ((traditionalMonthlyCost - rentflowEstimate) / traditionalMonthlyCost) *
            100
        )
      : 0;

  return {
    adminHoursSaved: Math.round(adminHoursSaved * 10) / 10,
    revenueLeakageRecovered: Math.round(revenueLeakageRecovered),
    annualProfitImpact: Math.round(annualProfitImpact),
    costReductionPct,
    chartData: [
      { name: "Admin hrs saved", value: Math.round(adminHoursSaved), fill: "#3b82f6" },
      { name: "Leakage recovered (₹)", value: Math.round(revenueLeakageRecovered / 1000), fill: "#10b981" },
      { name: "Annual impact (₹L)", value: Math.round(annualProfitImpact / 100000), fill: "#8b5cf6" },
    ],
  };
}

const defaultInputs: CalculatorInputs = {
  properties: 5,
  bedsPerProperty: 20,
  avgRent: 12000,
  utilityCostPerBed: 800,
};

const ROI_SESSION_KEY = "roi_session_id";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(ROI_SESSION_KEY);
  if (!id) {
    id = "sess_" + Math.random().toString(36).slice(2, 12);
    sessionStorage.setItem(ROI_SESSION_KEY, id);
  }
  return id;
}

function logCalculation(inputs: CalculatorInputs, results: ReturnType<typeof computeROI>) {
  fetch("/api/analytics/roi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: getSessionId(),
      inputs: {
        properties: inputs.properties,
        bedsPerProperty: inputs.bedsPerProperty,
        avgRent: inputs.avgRent,
        utilityCostPerBed: inputs.utilityCostPerBed,
      },
      results: {
        adminHoursSaved: results.adminHoursSaved,
        revenueLeakageRecovered: results.revenueLeakageRecovered,
        annualProfitImpact: results.annualProfitImpact,
        costReductionPct: results.costReductionPct,
      },
      source: "landing_page",
    }),
  }).catch(() => {});
}

export default function ROICalculatorSection() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const lastLogged = useRef<string>("");

  const roi = useMemo(() => {
    const result = computeROI(inputs);
    const key = JSON.stringify(inputs);
    if (key !== lastLogged.current) {
      lastLogged.current = key;
      logCalculation(inputs, result);
    }
    return result;
  }, [inputs]);

  const update = (key: keyof CalculatorInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: Math.max(0, value) }));
  };

  return (
    <section
      id="roi-calculator"
      className="py-16 sm:py-20 md:py-28 bg-slate-50 overflow-hidden"
      aria-labelledby="roi-calculator-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <p
            id="roi-calculator-heading"
            className="text-sm font-semibold uppercase tracking-widest text-green-600 mb-4 inline-flex items-center gap-2"
          >
            <Calculator className="w-4 h-4" aria-hidden />
            ROI Calculator
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            See Your Impact
          </h2>
          <p className="text-lg sm:text-xl text-slate-600">
            Adjust the numbers below. Results update instantly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start"
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Inputs</h3>
            <div className="space-y-5">
              <div>
                <label htmlFor="roi-properties" className="block text-sm font-medium text-slate-700 mb-1">
                  Number of properties
                </label>
                <input
                  id="roi-properties"
                  type="number"
                  min={1}
                  max={1000}
                  value={inputs.properties}
                  onChange={(e) => update("properties", Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="roi-beds" className="block text-sm font-medium text-slate-700 mb-1">
                  Beds per property
                </label>
                <input
                  id="roi-beds"
                  type="number"
                  min={1}
                  max={500}
                  value={inputs.bedsPerProperty}
                  onChange={(e) => update("bedsPerProperty", Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="roi-rent" className="block text-sm font-medium text-slate-700 mb-1">
                  Average rent (₹/bed/month)
                </label>
                <input
                  id="roi-rent"
                  type="number"
                  min={0}
                  value={inputs.avgRent}
                  onChange={(e) => update("avgRent", Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="roi-utility" className="block text-sm font-medium text-slate-700 mb-1">
                  Utility cost per bed (₹/month)
                </label>
                <input
                  id="roi-utility"
                  type="number"
                  min={0}
                  value={inputs.utilityCostPerBed}
                  onChange={(e) => update("utilityCostPerBed", Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                layout
                className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Admin hours saved</p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">
                    {roi.adminHoursSaved}
                    <span className="text-sm font-normal text-slate-500">/month</span>
                  </p>
                </div>
              </motion.div>
              <motion.div
                layout
                className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-6 h-6 text-green-600" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Revenue leakage recovered</p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">
                    ₹{(roi.revenueLeakageRecovered / 1000).toFixed(0)}K
                    <span className="text-sm font-normal text-slate-500">/mo</span>
                  </p>
                </div>
              </motion.div>
              <motion.div
                layout
                className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-4 col-span-2"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-purple-600" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Annual profit impact</p>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                    ₹{(roi.annualProfitImpact / 100000).toFixed(1)} L
                  </p>
                </div>
              </motion.div>
              <motion.div
                layout
                className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-4 col-span-2"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Percent className="w-6 h-6 text-amber-600" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Cost reduction vs traditional</p>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900">{roi.costReductionPct}%</p>
                </div>
              </motion.div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 min-h-[240px]">
              <p className="text-sm font-medium text-slate-400 mb-4">Impact snapshot</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={roi.chartData} layout="vertical" margin={{ left: 0, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" fontSize={12} />
                  <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={11} width={100} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                    labelStyle={{ color: "#94a3b8" }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {roi.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
