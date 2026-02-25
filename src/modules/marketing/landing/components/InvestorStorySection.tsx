"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Wallet,
  Clock,
  Code2,
  Wrench,
  Shield,
  Zap,
  ChevronDown,
  ChevronUp,
  Quote,
  Target,
  Server,
  AlertOctagon,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

interface ComparisonPoint {
  aspect: string;
  traditional: string;
  rentflow: string;
  savings: string;
}

const comparisonData: ComparisonPoint[] = [
  {
    aspect: "Initial Investment",
    traditional: "₹1,00,000+ (Custom Development)",
    rentflow: "₹0 (14-day free trial)",
    savings: "100% upfront savings",
  },
  {
    aspect: "Monthly Maintenance",
    traditional: "₹10,000/month (Fixed)",
    rentflow: "₹2,000-6,000 (Usage-based)",
    savings: "40-80% reduction",
  },
  {
    aspect: "Features Included",
    traditional: "Guest registration only",
    rentflow: "Full property management suite",
    savings: "10x functionality",
  },
  {
    aspect: "Payment Collection",
    traditional: "Manual/Offline",
    rentflow: "Auto UPI/Card/Cash with reconciliation",
    savings: "20 hrs/month saved",
  },
  {
    aspect: "Utility Management",
    traditional: "Excel sheets",
    rentflow: "Auto-calculation & WhatsApp delivery",
    savings: "8 hrs/month saved",
  },
  {
    aspect: "Scalability",
    traditional: "Rebuild required for growth",
    rentflow: "Infinite scale (10x→100x→1000x)",
    savings: "Zero migration cost",
  },
];

const hiddenCosts = [
  { label: "Developer dependency", cost: "₹25,000/change", icon: Code2 },
  { label: "Server hosting", cost: "₹5,000/month", icon: Server },
  { label: "Bug fixes", cost: "₹15,000/incident", icon: Wrench },
  { label: "Security patches", cost: "₹10,000/quarter", icon: Shield },
  { label: "Feature additions", cost: "₹50,000+ per feature", icon: Zap },
  { label: "Downtime losses", cost: "₹2,000/hour", icon: Clock },
];

export default function InvestorStorySection() {
  const [showFullStory, setShowFullStory] = useState(false);

  return (
    <section
      id="investor-story"
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-4 sm:mb-6">
            <Lightbulb className="w-4 h-4 flex-shrink-0" />
            <span>Real-World Insight</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            The ₹1 Lakh Mistake Every PG Owner Makes
          </h2>
          <p className="text-base sm:text-xl text-slate-600">
            A true story that reveals why fragmented solutions cost more than they save—and why RentFlow is the inevitable future.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden mb-10 sm:mb-16"
        >
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">The Hyderabad PG Owner&apos;s Dilemma</h3>
                <p className="text-slate-300 text-sm sm:text-base">15 Properties • 600+ Beds • ₹8 Crore Annual Revenue</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-8">
            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="text-base sm:text-xl leading-relaxed mb-4 sm:mb-6">
                My friend stays in a PG in Hyderabad. His owner operates <strong>15 PG properties</strong> with{" "}
                <strong> over 600 beds</strong>—a substantial portfolio generating significant monthly revenue.
              </p>

              <AnimatePresence>
                {showFullStory && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                      <h4 className="text-red-900 font-bold text-lg mb-3 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        The Problem: A ₹1 Lakh &quot;Solution&quot; That Solves Nothing
                      </h4>
                      <p className="text-red-800">
                        The owner spent <strong>₹1,00,000</strong> building custom software. The result? A basic guest
                        registration system. That&apos;s it. No payment collection. No utility management. No financial
                        tracking. Just guest details and owner approval.
                      </p>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
                      <h4 className="text-amber-900 font-bold text-lg mb-3 flex items-center">
                        <Wallet className="w-5 h-5 mr-2" />
                        The Hidden Tax: ₹10,000/Month Forever
                      </h4>
                      <p className="text-amber-800">
                        Maintenance costs <strong>₹10,000 every month</strong>—regardless of usage, regardless of value
                        delivered. That&apos;s <strong>₹1,20,000/year</strong> for software that does essentially one
                        thing.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-slate-50 p-6 rounded-2xl">
                        <h5 className="font-bold text-slate-900 mb-4 flex items-center">
                          <XCircle className="w-5 h-5 text-red-500 mr-2" />
                          What He Still Does Manually
                        </h5>
                        <ul className="space-y-3 text-slate-700">
                          <li className="flex items-start space-x-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>Chases 600+ tenants for rent via WhatsApp/calls</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>Manually splits electricity bills across 600 beds</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>Reconciles bank statements for 15 properties</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>Tracks vacancies on Excel sheets</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>Calculates GST manually for filing</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-2xl">
                        <h5 className="font-bold text-slate-900 mb-4 flex items-center">
                          <AlertOctagon className="w-5 h-5 text-amber-500 mr-2" />
                          Hidden Costs of &quot;Cheap&quot; Software
                        </h5>
                        <div className="space-y-3">
                          {hiddenCosts.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 bg-white rounded-lg"
                            >
                              <div className="flex items-center space-x-2">
                                <item.icon className="w-4 h-4 text-slate-400" />
                                <span className="text-sm text-slate-700">{item.label}</span>
                              </div>
                              <span className="text-sm font-semibold text-red-600">{item.cost}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                      <h4 className="text-blue-900 font-bold text-lg mb-3 flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        The Real Cost: Opportunity Lost
                      </h4>
                      <p className="text-blue-800 mb-4">
                        While this owner manages chaos, competitors using proper systems scale faster, operate leaner, and
                        capture market share. The ₹1 lakh software isn&apos;t an asset—it&apos;s an anchor.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
                        <div className="bg-white p-3 sm:p-4 rounded-xl min-w-0">
                          <div className="text-xl sm:text-2xl font-bold text-red-600">₹2,20,000</div>
                          <div className="text-xs text-slate-600">Year 1 Total Cost</div>
                        </div>
                        <div className="bg-white p-3 sm:p-4 rounded-xl min-w-0">
                          <div className="text-xl sm:text-2xl font-bold text-red-600">40+ hrs</div>
                          <div className="text-xs text-slate-600">Weekly Admin</div>
                        </div>
                        <div className="bg-white p-3 sm:p-4 rounded-xl min-w-0">
                          <div className="text-xl sm:text-2xl font-bold text-red-600">0%</div>
                          <div className="text-xs text-slate-600">Automation</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setShowFullStory(!showFullStory)}
                className="mt-6 flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors min-h-[44px] py-2"
              >
                <span>{showFullStory ? "Show Less" : "Read Full Story"}</span>
                {showFullStory ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-6 sm:mb-10">
            The Math That Matters to Investors
          </h3>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0" style={{ WebkitOverflowScrolling: "touch" }}>
              <table className="w-full min-w-[640px]">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-sm sm:text-base">Aspect</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-red-300 text-sm sm:text-base">DIY/Basic Software</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-green-300 text-sm sm:text-base">RentFlow</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-sm sm:text-base">Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonData.map((row, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-slate-900 text-sm sm:text-base">{row.aspect}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-red-600 font-medium text-sm sm:text-base">{row.traditional}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-green-600 font-medium text-sm sm:text-base">{row.rentflow}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {row.savings}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white min-w-0"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Zero Upfront Cost</h3>
            <p className="text-blue-100 text-sm sm:text-base mb-4 sm:mb-6">
              No ₹1 lakh development. No surprise maintenance bills. Start free, pay only as you grow.
            </p>
            <div className="text-2xl sm:text-3xl font-bold">₹0</div>
            <div className="text-xs sm:text-sm text-blue-200">to get started</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white min-w-0"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">True Scalability</h3>
            <p className="text-green-100 text-sm sm:text-base mb-4 sm:mb-6">
              Go from 10 beds to 10,000 without rebuilding. Our Kubernetes architecture grows with you.
            </p>
            <div className="text-2xl sm:text-3xl font-bold">10x→100x→1000x</div>
            <div className="text-xs sm:text-sm text-green-200">seamless scaling</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white sm:col-span-2 lg:col-span-1 min-w-0"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Enterprise Security</h3>
            <p className="text-purple-100 text-sm sm:text-base mb-4 sm:mb-6">
              Bank-grade encryption, SOC 2 compliance, 99.99% uptime. Sleep peacefully knowing data is safe.
            </p>
            <div className="text-2xl sm:text-3xl font-bold">99.99%</div>
            <div className="text-xs sm:text-sm text-purple-200">uptime guarantee</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white text-center overflow-hidden"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Why This Matters for Investors</h3>
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8 sm:mb-10 px-1">
            Every PG owner with 15+ properties faces this exact dilemma. The market is fragmented, solutions are
            inadequate, and owners are bleeding money on ineffective software.{" "}
            <strong className="text-white"> RentFlow captures this gap.</strong>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 min-w-0">
              <div className="text-2xl sm:text-4xl font-bold text-blue-400 mb-1 sm:mb-2">50,000+</div>
              <div className="text-xs sm:text-sm text-slate-400">PGs in India</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 min-w-0">
              <div className="text-2xl sm:text-4xl font-bold text-green-400 mb-1 sm:mb-2">₹30,000Cr</div>
              <div className="text-xs sm:text-sm text-slate-400">Market Size</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 min-w-0">
              <div className="text-2xl sm:text-4xl font-bold text-purple-400 mb-1 sm:mb-2">90%</div>
              <div className="text-xs sm:text-sm text-slate-400">Use Excel/Paper</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 min-w-0">
              <div className="text-2xl sm:text-4xl font-bold text-amber-400 mb-1 sm:mb-2">0</div>
              <div className="text-xs sm:text-sm text-slate-400">Real Competitors</div>
            </div>
          </div>

          <motion.a
            href="/investors"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 min-h-[44px] bg-white text-slate-900 font-bold text-base sm:text-lg rounded-full hover:bg-slate-100 transition-colors inline-flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Request Investor Brief</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
