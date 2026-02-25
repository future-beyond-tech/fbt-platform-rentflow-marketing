import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "For Operators | RentFlow — PG & Co-Living Operating System",
  description:
    "RentFlow for PG and co-living operators. Automate billing, utilities, staff and tenant operations with a usage-based platform built for India.",
};

export default function ForOperatorsPage() {
  return (
    <>
      <Section background="white" className="pt-24 sm:pt-28">
        <Container size="narrow" className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Built for operators managing high-churn, high-complexity rental infrastructure
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Single PG owners, multi-property operators, and enterprise co-living—one platform, capability-based control, usage-based pricing.
          </p>
          <div className="mt-10">
            <Button href="#demo" variant="primary" size="lg">
              Book a demo
            </Button>
          </div>
        </Container>
      </Section>
      <Section background="muted">
        <Container>
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            Use cases
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200">
              <h3 className="font-bold text-slate-900">Single PG Owner</h3>
              <p className="mt-2 text-sm text-slate-600">
                One property, full control: bed-level billing, utility automation, tenant portal, and audit trail.
              </p>
              <Button href={`${routes.home}#demo`} variant="ghost" size="sm" className="mt-4">
                Get started →
              </Button>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200">
              <h3 className="font-bold text-slate-900">Multi-Property Operator</h3>
              <p className="mt-2 text-sm text-slate-600">
                Scale across properties with one dashboard, centralized reporting, and usage-based cost.
              </p>
              <Button href={`${routes.home}#demo`} variant="ghost" size="sm" className="mt-4">
                Get started →
              </Button>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200">
              <h3 className="font-bold text-slate-900">Enterprise Co-Living</h3>
              <p className="mt-2 text-sm text-slate-600">
                Institutional-grade visibility, RBAC, audit logs, and API for integrations.
              </p>
              <Button href={`${routes.home}#demo`} variant="ghost" size="sm" className="mt-4">
                Get started →
              </Button>
            </div>
          </div>
        </Container>
      </Section>
      <Section background="white">
        <Container className="text-center">
          <Button href="#demo" variant="primary" size="lg">
            Book a demo
          </Button>
        </Container>
      </Section>
    </>
  );
}
