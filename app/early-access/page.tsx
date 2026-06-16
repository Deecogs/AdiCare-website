import type { Metadata } from "next";
import Link from "next/link";
import { Logo, CTAButton } from "../../components/primitives";
import { LeadCTA } from "../../components/lead";

export const metadata: Metadata = {
  title: "Early access — Adicare",
  description:
    "Adicare is onboarding a limited group of early-access practices. Register your interest or book a demo to be among the first.",
  // Thin/upcoming page — keep it out of search until it has real content.
  robots: { index: false, follow: true },
};

const CONTACT_EMAIL = "business@deecogs.com";

const PERKS = [
  "Priority onboarding with our clinical team",
  "Founder-level support and a direct line to the product team",
  "Early-partner pricing locked in for the first year",
  "A say in the roadmap — your workflow shapes what we build next",
];

export default function EarlyAccess() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", position: "relative", overflow: "hidden" }}>
      {/* soft halo */}
      <div style={{ position: "absolute", inset: 0, background: "var(--halo)", pointerEvents: "none" }} />

      {/* top bar */}
      <div className="container" style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", height: 68 }}>
        <Link href="/" aria-label="Adicare home">
          <Logo size={40} priority />
        </Link>
      </div>

      <div
        className="container"
        style={{ position: "relative", zIndex: 2, display: "grid", placeItems: "center", textAlign: "center", paddingTop: 64, paddingBottom: 96 }}
      >
        <div style={{ maxWidth: 640 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Early access · limited cohort</div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5.4vw, 64px)",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "var(--text)",
            }}
          >
            Be among the first<br />
            practices on <span className="grad-text">Adicare.</span>
          </h1>
          <p style={{ marginTop: 22, fontSize: 18, color: "var(--text-2)", lineHeight: 1.55 }}>
            We&apos;re onboarding a small group of doctors and clinics while we polish the platform.
            Tell us about your practice and we&apos;ll set up a personal walkthrough.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
            <LeadCTA type="demo" style={{ padding: "15px 24px", fontSize: 15 }}>
              Register for early access
            </LeadCTA>
            <CTAButton
              href={`mailto:${CONTACT_EMAIL}?subject=Adicare%20early%20access`}
              variant="ghost"
              icon={false}
              style={{ padding: "15px 22px", fontSize: 15 }}
            >
              Email us instead
            </CTAButton>
          </div>

          {/* perks */}
          <div
            style={{
              marginTop: 56,
              textAlign: "left",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: 28,
              display: "grid",
              gap: 14,
            }}
          >
            <div className="mono" style={{ fontSize: 10, color: "var(--accent)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
              What early partners get
            </div>
            {PERKS.map((p) => (
              <div key={p} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15, color: "var(--text-2)", lineHeight: 1.5 }}>
                <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true" style={{ marginTop: 2, flexShrink: 0 }}>
                  <circle cx="8" cy="8" r="7" fill="var(--accent-soft)" />
                  <path d="M5 8l2 2 4-5" stroke="var(--accent)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {p}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
            <Link href="/" style={{ fontSize: 14, color: "var(--dim)", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M9 3.5L5.5 7 9 10.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
