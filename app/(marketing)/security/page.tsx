import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Security & Compliance | RentFlow",
  description:
    "RentFlow security: multi-tenant isolation, RBAC, audit trails, encryption, backup. Built in, not bolted on. Built for the day your auditor or investor asks for a single source of truth.",
};

export default function SecurityPage() {
  return (
    <>
      <Section background="white" className="pt-24 sm:pt-28">
        <Container size="narrow" className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Security & compliance
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Security and compliance are built into the platform—not bolted on.
          </p>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            Built for the day your auditor or investor asks for a single source of truth.
          </p>
        </Container>
      </Section>

      <Section background="muted">
        <Container>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Data isolation</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card padding="md">
              <h3 className="font-bold text-slate-900">Multi-tenant architecture</h3>
              <p className="mt-2 text-sm text-slate-600">
                Tenant data is logically isolated. No cross-tenant access at the API or data layer. Access is enforced at the API and database layer by tenant identity.
              </p>
            </Card>
            <Card padding="md">
              <h3 className="font-bold text-slate-900">Encryption</h3>
              <p className="mt-2 text-sm text-slate-600">
                Encryption at rest and in transit (TLS). Sensitive data protected using industry-standard practices.
              </p>
            </Card>
            <Card padding="md">
              <h3 className="font-bold text-slate-900">Access scoping</h3>
              <p className="mt-2 text-sm text-slate-600">
                Access scoped by role and organization. Your data is isolated by design. No use of your data for training or cross-tenant analytics without explicit consent.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Identity & access</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Card padding="md">
              <h3 className="font-bold text-slate-900">Proprietary identity layer</h3>
              <p className="mt-2 text-sm text-slate-600">
                Centralized authentication, SSO-ready, role-based access control (RBAC), and multi-factor authentication (MFA). Session management and device control. No dependency on third-party identity for core security.
              </p>
            </Card>
            <Card padding="md">
              <h3 className="font-bold text-slate-900">Role-based access control</h3>
              <p className="mt-2 text-sm text-slate-600">
                Owner, manager, staff, and viewer permissions enforced at the application and API layer.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section background="muted">
        <Container>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Compliance readiness</h2>
          <p className="text-slate-700 max-w-3xl mb-6">
            Audit trails for financial and operational actions. Designed for GST and audit requirements. Path to SOC 2 and institutional requirements stated clearly; we document our posture and improve over time.
          </p>
          <p className="text-slate-600 text-sm">
            Indian context: GST-ready reports, e-sign readiness, agreement and notice tracking. From single-owner to institutional: same platform, same audit trail.
          </p>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Uptime & reliability</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Card padding="md">
              <h3 className="font-bold text-slate-900">Target uptime</h3>
              <p className="mt-2 text-sm text-slate-600">
                Uptime target designed for operational continuity. Blue-green deployments; no planned downtime for releases. Automated health checks and incident response readiness.
              </p>
            </Card>
            <Card padding="md">
              <h3 className="font-bold text-slate-900">Backup & recovery</h3>
              <p className="mt-2 text-sm text-slate-600">
                Backup and recovery procedures designed for operational continuity. We document our posture and improve over time; no exaggerated claims.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section background="muted">
        <Container>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Auditability</h2>
          <p className="text-slate-700 max-w-3xl">
            Event-emitting design: every payment, move-in, meter reading, and key config change is an event. Logs and trails available for operators and for institutional due diligence. Enables dispute resolution, compliance, and investor due diligence from one audit trail.
          </p>
        </Container>
      </Section>
    </>
  );
}
