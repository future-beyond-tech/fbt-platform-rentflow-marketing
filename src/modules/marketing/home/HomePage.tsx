import {
  Zap,
  LayoutGrid,
  Receipt,
  ArrowRight,
  Building2,
  FileSpreadsheet,
  Users,
  Wallet,
  Activity,
  Layers,
  Gauge,
  Lock,
  ClipboardCheck,
  CheckCircle2,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatCounter } from "@/components/ui/StatCounter";
import { LogoStrip } from "@/components/ui/LogoStrip";
import { DemoForm } from "@/components/marketing/DemoForm";
import { routes } from "@/config/routes";

function Hero() {
  return (
    <Section background="dark" className="pt-24 sm:pt-28 pb-20 sm:pb-24" id="hero">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-4">
          The Operating Layer for India&apos;s ₹45,000 Cr PG Economy
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl mx-auto">
          One System. Every Bed. Every Bill. Every Operator.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
          RentFlow connects rent, utilities, compliance, and collections into one event-driven layer. You pay for what you process—not for seats or spreadsheets.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="#demo" variant="primary" size="lg">
            Book a 15-min walkthrough
          </Button>
          <Button href="#architecture" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
            Platform blueprint
          </Button>
        </div>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 text-sm">
          <li className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-blue-400" />
            Bed-level billing
          </li>
          <li className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-400" />
            Utility automation engine
          </li>
          <li className="flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-blue-400" />
            Capability-based control
          </li>
        </ul>
        <p className="mt-6 text-slate-500 text-sm">
          Usage-metered — your cost scales with your revenue. Built for 1 property or 1,000.
        </p>
      </Container>
    </Section>
  );
}

function DifferentiationLine() {
  return (
    <Section background="white">
      <Container size="narrow">
        <p className="text-center text-slate-700 text-lg leading-relaxed">
          RentFlow is not a rent collection app or a CRUD dashboard. It&apos;s infrastructure orchestration: modular, capability-driven, metered, and event-emitting. Built for Indian PG complexity—shared meters, pro-rata, GST, and multi-entity—from the ground up.
        </p>
      </Container>
    </Section>
  );
}

function ProofStrip() {
  return (
    <Section background="white">
      <Container>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 text-center max-w-2xl mx-auto">
          Built for operators managing high-churn, high-complexity rental infrastructure.
        </h2>
        <p className="mt-6 text-center text-slate-600 max-w-2xl mx-auto">
          We&apos;re not a rent collection app. We&apos;re the operating layer that connects collection, utilities, compliance, and communication.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Built on event-driven, multi-tenant architecture
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Usage-metered from day one
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Early operators in pilot
          </span>
        </div>
        <LogoStrip className="mt-10" headline="Pilot operators">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-28 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-medium"
            >
              Operator {i}
            </div>
          ))}
        </LogoStrip>
        <p className="mt-6 text-center text-slate-600 text-sm">
          Pilot operators managing ___ beds
        </p>
      </Container>
    </Section>
  );
}

function Metrics() {
  return (
    <Section background="muted">
      <Container>
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500 mb-8">
          Pilot metrics
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCounter value={0} label="Beds managed" pilot />
          <StatCounter value="₹0" label="GMV processed" pilot />
          <StatCounter value={0} label="Admin hours saved" pilot />
          <StatCounter value={0} label="Disputes reduced" pilot />
        </div>
      </Container>
    </Section>
  );
}

function TheProblem() {
  const points = [
    { icon: FileSpreadsheet, text: "Excel-based chaos: no single source of truth" },
    { icon: Zap, text: "Manual electricity split and utility disputes" },
    { icon: Users, text: "Frequent move-ins/move-outs; high churn" },
    { icon: Activity, text: "Staff opacity; no role-based visibility" },
    { icon: Wallet, text: "Revenue leakage from missed rent and errors" },
    { icon: Receipt, text: "Subscription-heavy tools with unused features" },
  ];
  return (
    <Section background="muted">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            PG operations have no operating system
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Fifty thousand PGs. Electricity in one app. Rent in another. WhatsApp for reminders. Excel for reconciliation. That&apos;s not a software problem—it&apos;s an infrastructure gap.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {points.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white"
            >
              <item.icon className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-slate-700">{item.text}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-800 font-medium max-w-2xl mx-auto">
          RentFlow is the layer that connects the system. One identity. One ledger. One event stream.
        </p>
      </Container>
    </Section>
  );
}

function ArchitectureMoat() {
  return (
    <Section background="white" id="architecture">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">
          Why the architecture matters
        </h2>
        <p className="text-center text-slate-600 max-w-3xl mx-auto mb-10">
          RentFlow is built as a capability-driven platform: each function (billing, utilities, compliance, notifications) is a module that emits events and can be metered independently.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card padding="md" hover>
            <Gauge className="h-10 w-10 text-blue-600 mb-3" />
            <h3 className="font-bold text-slate-900">Usage-metered</h3>
            <p className="mt-2 text-sm text-slate-600">
              You pay for what you process (e.g. rent collected, invoices generated). Aligns our revenue with your revenue; no fixed seat or property caps.
            </p>
          </Card>
          <Card padding="md" hover>
            <Activity className="h-10 w-10 text-blue-600 mb-3" />
            <h3 className="font-bold text-slate-900">Event-emitting</h3>
            <p className="mt-2 text-sm text-slate-600">
              Every action (payment, move-in, meter reading) is an event. Enables audit trails, integrations, and future products (e.g. IoT, insurance) on the same backbone.
            </p>
          </Card>
          <Card padding="md" hover>
            <Layers className="h-10 w-10 text-blue-600 mb-3" />
            <h3 className="font-bold text-slate-900">Multi-application</h3>
            <p className="mt-2 text-sm text-slate-600">
              Owner OS, Tenant Portal, Staff Portal, Analytics Studio—one identity, one data layer. Defensibility compounds as you use more surfaces.
            </p>
          </Card>
        </div>
        <p className="text-center text-slate-700 font-medium">
          That&apos;s why we call it an operating system: it&apos;s designed to run the whole operation, not a single task.
        </p>
        <div className="mt-6 text-center">
          <Button href={routes.security} variant="outline" size="sm">
            Full security & architecture
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function OutcomeBlocks() {
  const blocks = [
    {
      outcome: "Zero revenue leakage from missed rent",
      capability: "Auto-invoicing + UPI + reconciliation",
      proof: "98.5% collection rate, auto-matched",
    },
    {
      outcome: "No utility disputes",
      capability: "Metered usage, event-driven billing, tenant-facing breakdown",
      proof: "₹0 manual utility errors",
    },
    {
      outcome: "Compliance without a full-time CA",
      capability: "GST-ready reports, e-sign, audit trail",
      proof: "Audit-ready in one click",
    },
    {
      outcome: "Scale without new hires",
      capability: "Same platform from 10 beds to 10,000; usage-based cost",
      proof: "From 1 property to 1,000 on one stack",
    },
    {
      outcome: "Investor-grade visibility",
      capability: "Portfolio P&L, occupancy, real-time",
      proof: "Institutional-grade reporting",
    },
  ];
  return (
    <Section background="muted">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">
          Outcomes, not just features
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map((b, i) => (
            <Card key={i} padding="md" hover>
              <h3 className="font-bold text-slate-900">{b.outcome}</h3>
              <p className="mt-2 text-sm text-slate-600">{b.capability}</p>
              <p className="mt-2 text-sm font-medium text-green-700">{b.proof}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function InvestorSection() {
  return (
    <Section background="dark">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Built for operators today. Built for institutional capital tomorrow.
          </h2>
          <p className="mt-6 text-slate-300 leading-relaxed">
            RentFlow&apos;s architecture supports portfolio-level visibility, audit trails, and compliance readiness. As institutional capital enters Indian rental (student housing, co-living, build-to-rent), the operators who run on a single, scalable operating layer will be the ones that can report, comply, and scale without re-platforming.
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
            <li>Multi-tenant isolation</li>
            <li>Usage-based unit economics</li>
            <li>Owner OS + Tenant + Staff + Analytics</li>
            <li>Utility automation as wedge</li>
          </ul>
          <Button href={routes.forInvestors} variant="secondary" size="lg" className="mt-8">
            For investors: read the thesis
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function ROISection() {
  return (
    <Section background="white">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-6">
            Designed for real ROI
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Early pilots: 35+ hours saved monthly, 23% revenue impact, ₹94,167 monthly savings. Payback in days. Your cost scales with your revenue—low occupancy means lower platform cost.
          </p>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-6 text-center sm:text-left">
              <div>
                <p className="text-sm text-slate-500">Traditional</p>
                <p className="text-xl font-bold text-slate-900">₹45,000/mo fixed</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">RentFlow</p>
                <p className="text-xl font-bold text-green-700">₹3,500–6,200/mo usage-based</p>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-slate-600">
              14-day trial. No credit card. Usage-based—you only pay when you&apos;re collecting rent.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Activate capabilities per property",
      description: "Turn on billing, utilities, tenant portal, and reporting per property. No bloated bundles.",
    },
    {
      step: "2",
      title: "Track beds, utilities, usage in real-time",
      description: "Bed-level visibility, meter readings, and usage data in one place. Event-driven updates.",
    },
    {
      step: "3",
      title: "Auto-bill, collect, audit, and analyze",
      description: "Invoicing, payment collection, reconciliation, and audit trail. Analytics across portfolio.",
    },
  ];
  return (
    <Section background="muted">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
          How RentFlow works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <Card key={s.step} padding="lg" hover>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white text-lg font-bold">
                {s.step}
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function DifferentiationGrid() {
  const items = [
    { icon: Gauge, title: "Usage-based metering architecture", description: "Pay for what you process. No per-seat or per-property caps." },
    { icon: LayoutGrid, title: "Capability runtime control", description: "Activate features per property. Modular, not monolithic." },
    { icon: Zap, title: "Utility allocation + proration engine", description: "Built for shared meters and Indian PG complexity." },
    { icon: Layers, title: "Multi-portal operating model", description: "Owner OS, Tenant Portal, Staff Portal, Analytics—one identity." },
    { icon: ClipboardCheck, title: "Audit trail & observability", description: "Event-driven logs. Compliance and dispute resolution ready." },
    { icon: Activity, title: "IoT-ready utility integrations", description: "Designed for meter and sensor integrations." },
  ];
  return (
    <Section background="white">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-2">
          Why RentFlow
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-xl mx-auto">
          Infrastructure built for scale and clarity.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Card key={i} padding="md" hover>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-bold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function UseCaseSegments() {
  const segments = [
    { title: "Single PG Owner", description: "One property, full control. Bed-level billing and utility automation.", href: `${routes.forOperators}#single-pg` },
    { title: "Multi-Property Operator", description: "Scale across properties with one dashboard and usage-based cost.", href: `${routes.forOperators}#multi-property` },
    { title: "Enterprise Co-Living", description: "Institutional-grade visibility, RBAC, and audit-ready reporting.", href: `${routes.forOperators}#enterprise` },
  ];
  return (
    <Section background="muted">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
          Use case segments
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {segments.map((s) => (
            <Card key={s.title} padding="md" hover>
              <Building2 className="h-10 w-10 text-slate-400" />
              <h3 className="mt-3 font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.description}</p>
              <Button href={s.href} variant="ghost" size="sm" className="mt-4 -ml-2">
                Learn more <ArrowRight className="h-4 w-4 ml-1 inline" />
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function SecurityPreview() {
  const items = [
    "Tenant isolation",
    "Role-based access control",
    "Audit logs",
    "Secure identity via centralized auth",
  ];
  return (
    <Section background="white">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Security & compliance
          </h2>
          <p className="mt-4 text-slate-600">
            Multi-tenant isolation, RBAC, audit trail, and secure identity—built in from day one.
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Lock className="h-4 w-4 text-slate-500" />
                {item}
              </li>
            ))}
          </ul>
          <Button href={routes.security} variant="outline" size="md" className="mt-8">
            Full security overview
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function FinalCTA() {
  return (
    <Section background="dark" id="demo">
      <Container>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
          Join Founding Operators
        </h2>
        <p className="mt-4 text-slate-300 text-center max-w-lg mx-auto">
          Request a demo. We&apos;ll show you the platform and how pricing works for your scale.
        </p>
        <div className="mt-10 max-w-md mx-auto">
          <DemoForm />
        </div>
      </Container>
    </Section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <DifferentiationLine />
      <ProofStrip />
      <Metrics />
      <TheProblem />
      <ArchitectureMoat />
      <OutcomeBlocks />
      <HowItWorks />
      <DifferentiationGrid />
      <UseCaseSegments />
      <InvestorSection />
      <ROISection />
      <SecurityPreview />
      <FinalCTA />
    </>
  );
}
