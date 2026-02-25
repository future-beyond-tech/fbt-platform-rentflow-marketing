"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2, Users, TrendingUp, Shield, Zap, Globe, ArrowRight, CheckCircle2, Play, Menu, X,
    Clock, Wallet, AlertTriangle, Calculator, FileText, Smartphone, BarChart3, Target, Briefcase,
    Crown, Sparkles, Phone, Linkedin, Twitter, Instagram, Mail, MapPin, ChevronRight, PieChart,
    Check, Award, HeartHandshake, Rocket, Gem, Trophy
} from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import InvestorStorySection from "./components/InvestorStorySection";
import DigitalizationMovementSection from "./components/DigitalizationMovementSection";
import PGManagementSEOSection from "./components/PGManagementSEOSection";
import WhyNowSection from "./components/WhyNowSection";
import BuiltForScaleSection from "./components/BuiltForScaleSection";
import ROICalculatorSection from "./components/ROICalculatorSection";
import UseCaseSegmentsSection from "./components/UseCaseSegmentsSection";
import Vision2027Section from "./components/Vision2027Section";
import { AnimatedCounter } from "./components/AnimatedCounter";
import { features, howItWorks } from "./data/landing";

// --- Data ---
const navItems = [
    { label: "Product", href: "#features" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "Architecture", href: "#architecture" },
    { label: "ROI", href: "#roi-calculator" },
    { label: "Pricing", href: "#pricing" },
];

const stats = [
    { value: "500", label: "Properties Managed", suffix: "+" },
    { value: "50,000", label: "Beds Under Management", suffix: "+" },
    { value: "₹100", label: "Crore GMV Processed", suffix: "+" },
    { value: "99.99", label: "Uptime Guarantee", suffix: "%" },
];

// Icons for features (order matches @/data/landing features array)
const featureIcons = [Building2, Users, FileText, Wallet, BarChart3, Mail];

const pricingTiers = [
    {
        name: "Starter",
        price: "₹1,999",
        description: "Independent PG owners with 1-3 properties",
        features: ["Up to 50 beds", "Basic invoicing", "Mobile app", "Email support", "GST compliance"],
        cta: "Join Founding Operators",
    },
    {
        name: "Growth",
        price: "₹4,999",
        description: "Growing portfolios with 4-10 properties",
        features: ["Up to 200 beds", "Advanced analytics", "Auto utilities", "WhatsApp integration", "API access", "Priority support"],
        highlighted: true,
        cta: "Join Founding Operators",
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "Large portfolios, co-living chains, institutions",
        features: ["Unlimited beds", "Dedicated manager", "Custom integrations", "SLA guarantee", "White-label"],
        cta: "Become an Early Access Partner",
    },
];

const roiData = [
    { month: "Jan", traditional: 45000, rentflow: 3500 },
    { month: "Feb", traditional: 45000, rentflow: 4200 },
    { month: "Mar", traditional: 45000, rentflow: 3800 },
    { month: "Apr", traditional: 45000, rentflow: 5100 },
    { month: "May", traditional: 45000, rentflow: 4800 },
    { month: "Jun", traditional: 45000, rentflow: 6200 },
];

// --- Components ---

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.02 }}>
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <span className={`text-2xl font-bold ${isScrolled ? "text-slate-900" : "text-white"}`}>
              RentFlow
            </span>
                    </motion.div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a key={item.label} href={item.href} className={`text-sm font-medium transition-colors hover:text-blue-500 ${isScrolled ? "text-slate-600" : "text-white/90"}`}>
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <a href="/waitlist" className={`text-sm font-medium transition-colors ${isScrolled ? "text-slate-600 hover:text-slate-900" : "text-white/90 hover:text-white"}`}>
                            Sign In
                        </a>
                        <motion.a href="/waitlist" className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Join Founding Operators
                        </motion.a>
                    </div>

                    <button type="button" aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} className="md:hidden p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X className={`w-6 h-6 ${isScrolled ? "text-slate-900" : "text-white"}`} /> : <Menu className={`w-6 h-6 ${isScrolled ? "text-slate-900" : "text-white"}`} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-t border-slate-100">
                        <div className="px-4 py-6 space-y-4">
                            {navItems.map((item) => (
                                <a key={item.label} href={item.href} className="block text-base font-medium text-slate-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                                    {item.label}
                                </a>
                            ))}
                            <div className="pt-4 space-y-3">
                                <a href="/waitlist" className="block w-full text-left text-base font-medium text-slate-600">Sign In</a>
                                <a href="/waitlist" className="block w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-full text-center">Join Founding Operators</a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

const Hero = () => {
    return (
        <section className="relative min-h-[100dvh] min-h-screen flex items-center justify-center overflow-hidden bg-slate-900" aria-labelledby="hero-heading">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')] bg-cover bg-center opacity-10" />

            <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} aria-hidden />
            <motion.div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }} transition={{ duration: 8, repeat: Infinity }} aria-hidden />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 sm:mb-8">
                    <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0" aria-hidden />
                    <span className="text-xs sm:text-sm font-medium text-blue-300 text-center">India&apos;s First Usage-Based Operating System</span>
                </motion.div>

                <motion.h1 id="hero-heading" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight max-w-5xl mx-auto">
                    India&apos;s First Usage-Based Operating System for <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">PG & Co-Living Infrastructure</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-1">
                    Automate 35+ admin hours per month. Recover hidden revenue leakage. Scale from 1 bed to 1,000 properties — without increasing operational overhead.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-8 sm:mb-10">
                    <div className="text-center">
                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                            <AnimatedCounter value={35} suffix="+" /> <span className="text-slate-400 font-normal text-lg sm:text-xl">hrs</span>
                        </p>
                        <p className="text-slate-400 text-xs sm:text-sm font-medium">admin saved/month</p>
                    </div>
                    <div className="w-px h-12 bg-white/20 hidden sm:block" aria-hidden />
                    <div className="text-center">
                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400">
                            <AnimatedCounter value={23} suffix="%" />
                        </p>
                        <p className="text-slate-400 text-xs sm:text-sm font-medium">revenue impact</p>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 w-full max-w-lg sm:max-w-none mx-auto">
                    <motion.a href="/waitlist" className="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 min-h-[44px] bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-full hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <span>Join Founding Operators</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" aria-hidden />
                    </motion.a>
                    <motion.a href="#architecture" className="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 min-h-[44px] bg-white/10 backdrop-blur-sm text-white text-sm sm:text-base font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center space-x-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Play className="w-5 h-5 flex-shrink-0" aria-hidden />
                        <span>View Platform Architecture</span>
                    </motion.a>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-slate-400 text-xs sm:text-sm">
                    <div className="flex items-center space-x-2"><CheckCircle2 className="w-5 h-5 text-green-400" aria-hidden /><span>Usage-based — pay as you scale</span></div>
                    <div className="flex items-center space-x-2"><CheckCircle2 className="w-5 h-5 text-green-400" aria-hidden /><span>Zero lock-in</span></div>
                    <div className="flex items-center space-x-2"><CheckCircle2 className="w-5 h-5 text-green-400" aria-hidden /><span>Enterprise-grade security</span></div>
                </motion.div>
            </div>

            <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} aria-hidden>
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"><div className="w-1.5 h-3 bg-white/50 rounded-full" /></div>
            </motion.div>
        </section>
    );
};

const Stats = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">{stat.value}<span className="text-blue-600">{stat.suffix}</span></div>
                            <div className="text-slate-600 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProblemSolution = () => {
    const problems = [
        { icon: Clock, text: "35+ hours monthly on admin tasks" },
        { icon: Wallet, text: "₹11.3L annual revenue leakage" },
        { icon: AlertTriangle, text: "Payment collection nightmares" },
        { icon: Calculator, text: "Manual utility calculations" },
        { icon: FileText, text: "Compliance & legal risks" },
        { icon: Users, text: "Tenant management chaos" },
    ];

    return (
        <section className="py-16 sm:py-20 md:py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="min-w-0">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-6">
                            <AlertTriangle className="w-4 h-4" />
                            <span>The Problem</span>
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">Property Management is Broken</h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            PG owners spend more time managing spreadsheets than managing properties. The average 40-bed PG loses ₹11.3 lakhs annually to inefficiencies, delays, and manual errors.
                        </p>
                        <div className="space-y-4">
                            {problems.map((problem, index) => (
                                <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm">
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <problem.icon className="w-5 h-5 text-red-600" />
                                    </div>
                                    <span className="text-slate-700 font-medium">{problem.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl transform rotate-3 opacity-20" />
                        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                            <div className="p-6 bg-slate-900">
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between gap-2 p-3 sm:p-4 bg-slate-800 rounded-xl min-w-0">
                                        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-white font-semibold text-sm sm:text-base truncate">Rent Collection</div>
                                                <div className="text-slate-400 text-xs sm:text-sm">Auto-reconciled</div>
                                            </div>
                                        </div>
                                        <div className="text-green-400 font-bold text-sm sm:text-base flex-shrink-0">98.5%</div>
                                    </div>
                                    <div className="flex items-center justify-between gap-2 p-3 sm:p-4 bg-slate-800 rounded-xl min-w-0">
                                        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-white font-semibold text-sm sm:text-base truncate">Utilities</div>
                                                <div className="text-slate-400 text-xs sm:text-sm">Auto-calculated</div>
                                            </div>
                                        </div>
                                        <div className="text-blue-400 font-bold text-sm sm:text-base flex-shrink-0">₹0 errors</div>
                                    </div>
                                    <div className="flex items-center justify-between gap-2 p-3 sm:p-4 bg-slate-800 rounded-xl min-w-0">
                                        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-white font-semibold text-sm sm:text-base truncate">Time Saved</div>
                                                <div className="text-slate-400 text-xs sm:text-sm">Monthly</div>
                                            </div>
                                        </div>
                                        <div className="text-purple-400 font-bold text-sm sm:text-base flex-shrink-0">35 hrs</div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 sm:p-6 bg-slate-50">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="text-xs sm:text-sm text-slate-600">Monthly Savings</div>
                                        <div className="text-2xl sm:text-3xl font-bold text-slate-900">₹94,167</div>
                                    </div>
                                    <div className="px-3 sm:px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-semibold">ROI: 1,916%</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Features = () => {
    return (
        <section id="features" className="py-16 sm:py-20 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4 sm:mb-6">
                        <Sparkles className="w-4 h-4 flex-shrink-0" />
                        <span>World-First Features</span>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
                        Built for Scale, Designed for Simplicity
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-base sm:text-xl text-slate-600">
                        Every feature engineered to eliminate friction while providing enterprise-grade capabilities.
                    </motion.p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {features.map((feature, index) => {
                        const Icon = featureIcons[index];
                        return (
                            <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group p-6 sm:p-8 bg-slate-50 rounded-2xl sm:rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-200 min-w-0">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/25">
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">{feature.title}</h3>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const HowItWorksSection = () => {
    return (
        <section id="how-it-works" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
                        <Rocket className="w-4 h-4" />
                        <span>Simple Setup</span>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        How It Works
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-xl text-slate-600">
                        Get started in three straightforward steps. No complex onboarding.
                    </motion.p>
                </div>

                <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-4">
                    {howItWorks.map((item, index) => (
                        <React.Fragment key={item.step}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="flex-1 p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 min-w-0"
                            >
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 text-white text-lg sm:text-xl font-bold shadow-lg shadow-blue-500/25">
                                    {item.step}
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">{item.title}</h3>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{item.description}</p>
                            </motion.div>
                            {index < howItWorks.length - 1 && (
                                <div className="hidden md:flex items-center justify-center flex-shrink-0 py-8">
                                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 + 0.2 }}>
                                        <ArrowRight className="w-8 h-8 text-slate-300" />
                                    </motion.div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ROISection = () => {
    return (
        <section className="py-16 sm:py-20 md:py-24 bg-slate-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="min-w-0">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold mb-6">
                            <TrendingUp className="w-4 h-4" />
                            <span>Proven ROI</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Payback in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">6 Days</span></h2>
                        <p className="text-base sm:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed">
                            RentFlow doesn&apos;t cost you money—it makes you money. Our usage-based pricing means you only pay when you generate revenue.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-1">35 Hours Saved Monthly</h4>
                                    <p className="text-slate-400">Valued at ₹17,500/month of owner&apos;s time</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Wallet className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-1">₹1,00,000 Revenue Protection</h4>
                                    <p className="text-slate-400">Reduced vacancy, zero missed late fees, accurate utilities</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-1">₹1,74,000 Cost Avoidance</h4>
                                    <p className="text-slate-400">Compliance penalties, disputes, accounting fees eliminated</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-400">Annual Investment</span>
                                <span className="text-2xl font-bold">₹24,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-400">Annual Returns</span>
                                <span className="text-2xl font-bold text-green-400">₹4,84,000</span>
                            </div>
                            <div className="h-px bg-white/10 my-4" />
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold">Net Profit</span>
                                <span className="text-3xl font-bold text-green-400">₹4,60,000</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative min-w-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl sm:rounded-3xl transform rotate-3 opacity-20" />
                        <div className="relative bg-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl min-h-[320px]">
                            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Cost Comparison: Traditional vs RentFlow</h3>
                            <div className="h-56 sm:h-72 md:h-80 min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={roiData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                                        <YAxis stroke="#94a3b8" fontSize={12} width={40} />
                                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                                        <Bar dataKey="traditional" name="Traditional Software" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="rentflow" name="RentFlow" fill="#10b981" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 sm:space-x-0">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded flex-shrink-0" />
                                    <span className="text-slate-400 text-xs sm:text-sm">Traditional: ₹45,000/mo (fixed)</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded flex-shrink-0" />
                                    <span className="text-slate-400 text-xs sm:text-sm">RentFlow: ₹3.5-6.2k/mo (usage)</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Pricing = () => {
    return (
        <section id="pricing" className="py-16 sm:py-20 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4 sm:mb-6">
                        <Sparkles className="w-4 h-4 flex-shrink-0" />
                        <span>Transparent Pricing</span>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
                        Usage-Based Pricing
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-base sm:text-xl text-slate-600">
                        World-first in property management. Pay only for what you use, not seats or properties.
                    </motion.p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-stretch">
                    {pricingTiers.map((tier, index) => (
                        <motion.div key={tier.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className={`relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl min-w-0 flex flex-col ${tier.highlighted ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl shadow-blue-500/25 md:scale-105 order-first lg:order-none z-10" : "bg-slate-50 text-slate-900 border border-slate-200"}`}>
                            {tier.highlighted && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full">Most Popular</div>}
                            <div className="mb-6">
                                <h3 className={`text-2xl font-bold mb-2 ${tier.highlighted ? "text-white" : "text-slate-900"}`}>{tier.name}</h3>
                                <p className={`text-sm ${tier.highlighted ? "text-blue-100" : "text-slate-600"}`}>{tier.description}</p>
                            </div>
                            <div className="mb-6">
                                <span className={`text-4xl font-bold ${tier.highlighted ? "text-white" : "text-slate-900"}`}>{tier.price}</span>
                                {tier.price !== "Custom" && <span className={`text-sm ${tier.highlighted ? "text-blue-100" : "text-slate-600"}`}>/month</span>}
                            </div>
                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start space-x-3">
                                        <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${tier.highlighted ? "text-blue-200" : "text-green-500"}`} />
                                        <span className={`text-sm ${tier.highlighted ? "text-blue-50" : "text-slate-600"}`}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <motion.a href="/waitlist" className={`w-full py-3.5 sm:py-4 min-h-[44px] rounded-full font-semibold transition-all mt-auto flex items-center justify-center ${tier.highlighted ? "bg-white text-blue-600 hover:bg-blue-50" : "bg-slate-900 text-white hover:bg-slate-800"}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                {tier.cta}
                            </motion.a>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16 text-center">
                    <p className="text-slate-600">All plans include 14-day free trial. No credit card required. <a href="#" className="text-blue-600 font-semibold hover:underline">Compare all features</a></p>
                </motion.div>
            </div>
        </section>
    );
};

const Investors = () => {
    return (
        <section className="py-16 sm:py-20 md:py-24 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="min-w-0">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold mb-4 sm:mb-6">
                            <Crown className="w-4 h-4 flex-shrink-0" />
                            <span>For Investors</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Institutional-Grade Portfolio Management</h2>
                        <p className="text-base sm:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed">
                            Whether you manage 10 properties or 1,000, RentFlow provides the visibility, control, and analytics you need to maximize ROI across your entire portfolio.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="p-4 sm:p-6 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 min-w-0">
                                <BarChart3 className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400 mb-3 sm:mb-4" />
                                <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Real-Time Analytics</h4>
                                <p className="text-slate-400 text-xs sm:text-sm">Portfolio-wide P&L, occupancy trends, and performance benchmarking.</p>
                            </div>
                            <div className="p-4 sm:p-6 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 min-w-0">
                                <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-green-400 mb-3 sm:mb-4" />
                                <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Risk Management</h4>
                                <p className="text-slate-400 text-xs sm:text-sm">Compliance monitoring, audit trails, and automated risk alerts.</p>
                            </div>
                            <div className="p-4 sm:p-6 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 min-w-0">
                                <Target className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400 mb-3 sm:mb-4" />
                                <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Asset Optimization</h4>
                                <p className="text-slate-400 text-xs sm:text-sm">AI-powered pricing recommendations and vacancy prediction.</p>
                            </div>
                            <div className="p-4 sm:p-6 bg-white/5 rounded-2xl border border-white/10 min-w-0">
                                <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 mb-3 sm:mb-4" />
                                <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">White-Label Ready</h4>
                                <p className="text-slate-400 text-xs sm:text-sm">Custom branding and dedicated infrastructure options.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative min-w-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl sm:rounded-3xl transform -rotate-3 opacity-20" />
                        <div className="relative bg-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl">
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
                                <div className="min-w-0">
                                    <div className="text-xs sm:text-sm text-slate-400">Portfolio Value</div>
                                    <div className="text-2xl sm:text-3xl font-bold">₹47.5 Crore</div>
                                </div>
                                <div className="px-3 sm:px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-xs sm:text-sm font-semibold">+23.5% YOY</div>
                            </div>

                            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                                <div className="flex items-center justify-between gap-2 p-3 sm:p-4 bg-slate-700/50 rounded-xl min-w-0">
                                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                                        <Building2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                        <span className="truncate">Properties</span>
                                    </div>
                                    <span className="font-bold flex-shrink-0">24</span>
                                </div>
                                <div className="flex items-center justify-between gap-2 p-3 sm:p-4 bg-slate-700/50 rounded-xl min-w-0">
                                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                                        <Users className="w-5 h-5 text-green-400 flex-shrink-0" />
                                        <span className="truncate">Active Tenants</span>
                                    </div>
                                    <span className="font-bold flex-shrink-0">1,247</span>
                                </div>
                                <div className="flex items-center justify-between gap-2 p-3 sm:p-4 bg-slate-700/50 rounded-xl min-w-0">
                                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                                        <TrendingUp className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                        <span className="truncate">Monthly Revenue</span>
                                    </div>
                                    <span className="font-bold flex-shrink-0">₹89.4L</span>
                                </div>
                                <div className="flex items-center justify-between gap-2 p-3 sm:p-4 bg-slate-700/50 rounded-xl min-w-0">
                                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                                        <PieChart className="w-5 h-5 text-amber-400 flex-shrink-0" />
                                        <span className="truncate">Occupancy Rate</span>
                                    </div>
                                    <span className="font-bold flex-shrink-0">94.2%</span>
                                </div>
                            </div>

                            <div className="h-40 sm:h-48 min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={roiData}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                        <XAxis dataKey="month" stroke="#64748b" />
                                        <YAxis stroke="#64748b" />
                                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                                        <Area type="monotone" dataKey="rentflow" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const CTA = () => {
    return (
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden" aria-labelledby="cta-heading">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden>
                    <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10">
                    <h2 id="cta-heading" className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Join the Operators Building India&apos;s Rental Infrastructure</h2>
                    <p className="text-base sm:text-xl md:text-2xl text-blue-100 mb-8 sm:mb-10 max-w-3xl mx-auto px-1">
                        Scale from 1 bed to 1,000 properties on one platform. Usage-based. Zero lock-in. Built for the long term.
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
                        <motion.a href="/waitlist" className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 min-h-[44px] bg-white text-blue-600 font-bold text-base sm:text-lg rounded-full hover:bg-blue-50 transition-colors shadow-2xl flex items-center justify-center space-x-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <span>Join Founding Operators</span>
                            <ArrowRight className="w-5 h-5 flex-shrink-0" aria-hidden />
                        </motion.a>
                        <motion.a href="#architecture" className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 min-h-[44px] bg-transparent text-white font-bold text-base sm:text-lg rounded-full border-2 border-white/30 hover:bg-white/10 transition-colors flex items-center justify-center space-x-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Phone className="w-5 h-5 flex-shrink-0" aria-hidden />
                            <span>See How You Scale</span>
                        </motion.a>
                    </div>

                    <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-blue-100 text-sm sm:text-base">
                        <div className="flex items-center space-x-2"><CheckCircle2 className="w-5 h-5" aria-hidden /><span>Usage-based pricing</span></div>
                        <div className="flex items-center space-x-2"><CheckCircle2 className="w-5 h-5" aria-hidden /><span>No credit card to start</span></div>
                        <div className="flex items-center space-x-2"><CheckCircle2 className="w-5 h-5" aria-hidden /><span>View Platform Blueprint</span></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const Footer = () => {
    const footerLinks = {
        Product: ["Features", "Pricing", "Integrations", "API", "Security", "Roadmap"],
        Solutions: ["PG Owners", "Property Managers", "Co-living", "Student Housing", "Enterprise", "Investors"],
        Resources: ["Blog", "Case Studies", "Documentation", "Help Center", "Community", "Webinars"],
        Company: ["About", "Careers", "Press", "Partners", "Contact", "Legal"],
    };

    return (
        <footer className="bg-slate-950 text-slate-400 py-12 sm:py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-6 sm:gap-8 mb-10 sm:mb-12">
                    <div className="col-span-2 min-w-0">
                        <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <span className="text-xl sm:text-2xl font-bold text-white truncate">RentFlow</span>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-xs">
                            India&apos;s first usage-based operating system for PG & co-living infrastructure. Built for scale. Built to last.
                        </p>
                        <div className="flex flex-wrap gap-3 sm:space-x-4 sm:gap-0">
                            <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category} className="min-w-0">
                            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{category}</h4>
                            <ul className="space-y-2 sm:space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-xs sm:text-sm hover:text-white transition-colors">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-slate-800 pt-8 sm:pt-10 mb-8 sm:mb-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <p className="text-white font-semibold text-center sm:text-left">Ready to scale?</p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <a href="/waitlist" className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                            Join Founding Operators
                        </a>
                        <a href="#architecture" className="px-5 py-2.5 rounded-full border border-slate-600 text-slate-300 text-sm font-semibold hover:bg-white/5 hover:text-white transition-colors">
                            View Platform Blueprint
                        </a>
                    </div>
                </div>

                <div className="border-t border-slate-900 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs sm:text-sm mb-0 text-center md:text-left">© 2026 RentFlow by Future Beyond Tech. All rights reserved.</p>
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// --- Main Page Component ---
export default function RentFlowLandingPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <WhyNowSection />
            <Stats />
            <BuiltForScaleSection />
            <ProblemSolution />
            <ROICalculatorSection />
            <UseCaseSegmentsSection />
            <Features />
            <HowItWorksSection />
            <ROISection />
            <DigitalizationMovementSection />
            <Pricing />
            <InvestorStorySection />
            <Investors />
            <Vision2027Section />
            <PGManagementSEOSection />
            <CTA />
            <Footer />
        </main>
    );
}