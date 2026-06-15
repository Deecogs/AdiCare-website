"use client";

import React, { useState, useEffect, type ReactNode } from "react";
import { Reveal, SectionEyebrow, Headline, CTAButton } from "./primitives";
import { DeviceSVG } from "./DeviceSVG";

// ----------------------------------------------------------------
//  MOCKUP VISUALS
// ----------------------------------------------------------------
const RxDeviceMockup = () => (
  <div style={{ height: "100%", background: "linear-gradient(135deg, #fff5f3 0%, #ffe9e0 100%)", display: "grid", placeItems: "center", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: "-20% -10% 0 -10%", background: "radial-gradient(circle, #ffc2b3 0%, transparent 65%)", opacity: 0.6 }} />
    <div style={{ width: "76%", position: "relative", transform: "rotate(-3deg)" }}>
      <DeviceSVG progress={1} />
    </div>
  </div>
);

const EMRMockup = () => {
  const [active, setActive] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % 4), 1800);
    return () => clearInterval(t);
  }, []);
  const patients = [
    { name: "Rajeev Sharma", age: "58 · M", tag: "T2DM · F/U", waiting: "12:40" },
    { name: "Priya Iyer", age: "34 · F", tag: "Prenatal · w24", waiting: "12:55" },
    { name: "Kabir Das", age: "71 · M", tag: "HTN · review", waiting: "13:10" },
    { name: "Anika Verma", age: "6 · F", tag: "URTI", waiting: "13:25" },
  ];
  return (
    <div style={{ height: "100%", background: "linear-gradient(135deg, #f5f6fb 0%, #ecedf5 100%)", padding: 18, display: "flex", flexDirection: "column", gap: 8, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--dim)", letterSpacing: "0.12em", textTransform: "uppercase" }}>OPD QUEUE · MON</div>
        <div style={{ display: "flex", gap: 4 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--dim-2)" }} />
          ))}
        </div>
      </div>
      {patients.map((p, i) => (
        <div
          key={p.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            background: i === active ? "white" : "rgba(255,255,255,0.5)",
            border: `1px solid ${i === active ? "var(--accent)" : "rgba(255,255,255,0.6)"}`,
            borderRadius: 10,
            fontFamily: "var(--font-display)",
            transition: "all 0.25s",
            boxShadow: i === active ? "0 6px 14px rgba(240,78,78,0.15)" : "none",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: i === active ? "var(--accent-grad)" : "#e2e3eb",
              color: i === active ? "white" : "var(--text-2)",
              display: "grid",
              placeItems: "center",
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            {p.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>{p.name}</div>
            <div style={{ fontSize: 10, color: "var(--dim)" }}>{p.age} · {p.tag}</div>
          </div>
          <div className="mono" style={{ fontSize: 10, color: i === active ? "var(--accent)" : "var(--dim)" }}>{p.waiting}</div>
        </div>
      ))}
    </div>
  );
};

const ScribeMockup = () => (
  <div style={{ height: "100%", background: "linear-gradient(135deg, #fef4ee 0%, #fbe6d9 100%)", padding: 22, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 16, position: "relative" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 80, justifyContent: "center" }}>
      {Array.from({ length: 34 }).map((_, idx) => {
        // Rounded to whole px so server (Node) and client (browser) produce
        // byte-identical styles — avoids React hydration mismatches from
        // trig floating-point differences across JS engines.
        const h = Math.round(6 + Math.abs(Math.sin(idx * 0.55)) * 56 + Math.abs(Math.cos(idx * 1.3)) * 18);
        const active = idx < 18;
        return <div key={idx} style={{ width: 3, height: h, background: active ? "var(--accent)" : "#e8c8b4", borderRadius: 2, animation: `wavy 1.4s ease-in-out infinite ${idx * 60}ms` }} />;
      })}
    </div>
    <div style={{ background: "white", borderRadius: 12, padding: "12px 14px", fontFamily: "var(--font-display)", fontSize: 12, color: "var(--text-2)", lineHeight: 1.5, border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 6px 14px rgba(0,0,0,0.04)" }}>
      <span className="mono" style={{ fontSize: 9, color: "var(--accent)", letterSpacing: "0.12em", marginRight: 6, fontWeight: 600 }}>00:14 · हिंदी</span>
      मरीज को छाती में हल्का दर्द है, सांस लेने में कोई तकलीफ़ नहीं…
    </div>
  </div>
);

const ConnectMockup = () => (
  <div style={{ height: "100%", background: "linear-gradient(135deg, #eef6fb 0%, #e0eef6 100%)", padding: 22, display: "flex", flexDirection: "column", gap: 12, position: "relative" }}>
    <div className="mono" style={{ fontSize: 9, color: "var(--dim)", letterSpacing: "0.12em", textTransform: "uppercase" }}>POST /v1/abdm/link</div>
    <div style={{ background: "#101522", borderRadius: 10, padding: "12px 14px", flex: 1, fontFamily: "var(--font-mono)", fontSize: 11, color: "#cbd5e1", lineHeight: 1.6, overflow: "hidden" }}>
      <div><span style={{ color: "#94a3b8" }}>{"{"}</span></div>
      <div style={{ paddingLeft: 14 }}><span style={{ color: "#a5b4fc" }}>&quot;abha&quot;</span>: <span style={{ color: "#86efac" }}>&quot;34-7821-4561-9023&quot;</span>,</div>
      <div style={{ paddingLeft: 14 }}><span style={{ color: "#a5b4fc" }}>&quot;patient&quot;</span>: <span style={{ color: "#86efac" }}>&quot;R. Sharma&quot;</span>,</div>
      <div style={{ paddingLeft: 14 }}><span style={{ color: "#a5b4fc" }}>&quot;consent&quot;</span>: <span style={{ color: "#fde68a" }}>&quot;granted&quot;</span>,</div>
      <div style={{ paddingLeft: 14 }}><span style={{ color: "#a5b4fc" }}>&quot;status&quot;</span>: <span style={{ color: "#86efac" }}>&quot;✓ linked&quot;</span></div>
      <div><span style={{ color: "#94a3b8" }}>{"}"}</span></div>
    </div>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {["FHIR R4", "OAuth 2.0", "Webhooks", "GraphQL"].map((t) => (
        <span key={t} style={{ fontSize: 10, padding: "4px 8px", background: "white", borderRadius: 99, fontFamily: "var(--font-mono)", color: "var(--text-2)", border: "1px solid rgba(255,255,255,0.7)" }}>{t}</span>
      ))}
    </div>
  </div>
);

const ProductCard = ({ tag, title, desc, cta, href, visual, tone }: { tag: string; title: string; desc: string; cta: string; href: string; visual: ReactNode; tone: string }) => (
  <div
    style={{
      background: tone === "primary" ? "var(--accent-grad-soft)" : "var(--surface)",
      border: tone === "primary" ? "1px solid var(--accent-soft)" : "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      padding: 28,
      display: "flex",
      flexDirection: "column",
      minHeight: 460,
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s cubic-bezier(.2,.7,.2,1)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 24px 60px rgba(15,17,23,0.10)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "";
    }}
  >
    <div style={{ flex: 1, minHeight: 240, position: "relative", marginBottom: 24, borderRadius: 16, overflow: "hidden" }}>{visual}</div>
    <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: tone === "primary" ? "var(--accent)" : "var(--dim)", fontWeight: 600, marginBottom: 10 }}>{tag}</div>
    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 10 }}>{title}</h3>
    <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.55, marginBottom: 18 }}>{desc}</p>
    <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: tone === "primary" ? "var(--accent)" : "var(--text)", width: "fit-content" }}>
      {cta}
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6h7m0 0L6 3m3 3L6 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
    </a>
  </div>
);

export const ProductSuite = () => {
  const products = [
    { tag: "ADICARE Rx-01", title: "The smart prescription pad", desc: "Write on real paper. Adicare digitises every stroke to the cloud in under 400ms as a signed, searchable PDF.", cta: "Pre-order ₹39,000", href: "#preorder", visual: <RxDeviceMockup />, tone: "primary" },
    { tag: "ADICARE EMR", title: "The modern clinic OS", desc: "Patient queues, consultations, billing, refills — one tab, infinite shortcuts. Onboard your staff in an afternoon.", cta: "See it in action", href: "#features", visual: <EMRMockup />, tone: "neutral" },
    { tag: "ADICARE SCRIBE", title: "AI voice-to-prescription", desc: "Consult naturally in 12+ Indic languages. Adicare drafts the script, the SOAP note, and the follow-up.", cta: "Try voice demo", href: "#features", visual: <ScribeMockup />, tone: "neutral" },
    { tag: "ADICARE CONNECT", title: "ABDM + dev platform", desc: "ABHA-verified patients, FHIR-native records, and a REST + GraphQL API for healthtech builders.", cta: "Read the docs", href: "#", visual: <ConnectMockup />, tone: "neutral" },
  ];

  return (
    <section id="products" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)", position: "relative" }}>
      <div className="container">
        <Reveal>
          <SectionEyebrow>The Adicare Product Suite</SectionEyebrow>
        </Reveal>
        <Reveal delay={80}>
          <Headline align="center">
            One platform.{" "}<span className="italic grad-text">Infinite</span><br />
            healthcare possibilities.
          </Headline>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ marginTop: 22, textAlign: "center", fontSize: 17, color: "var(--text-2)", maxWidth: 620, margin: "22px auto 0", lineHeight: 1.55 }}>
            Hardware, software, and AI — built around the way doctors actually work, not the way software vendors think they do.
          </p>
        </Reveal>

        <div className="product-grid" style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {products.map((p, i) => (
            <Reveal key={p.tag} delay={i * 80}>
              <ProductCard {...p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// <CDSS> — Clinical Decision Support, DARK section
// ----------------------------------------------------------------
export const CDSS = () => {
  const items = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4" />
          <path d="M7 11l3 3 5-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Complete patient context",
      body: "Longitudinal records — every prior visit, lab, and prescription — surfaced the moment you need them.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M11 3v8m0 4v.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      ),
      title: "Actionable alerts, not noise",
      body: "Drug interactions, dosing flags, screening reminders — only when the workflow asks for them.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 3" />
        </svg>
      ),
      title: "Ambient intelligence",
      body: "Insights appear naturally during documentation — no extra clicks, no disruption to your conversation.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M3 17l4-4 3 3 6-7 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Powered by real-world data",
      body: "Continuously trained on de-identified Indian clinical records — protocols that match Indian patient reality.",
    },
  ];

  return (
    <section data-dark style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)", background: "var(--dark)", color: "var(--dark-text)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -200, left: -200, width: 600, height: 600, background: "radial-gradient(circle, rgba(240,78,78,0.25) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -300, right: -200, width: 700, height: 700, background: "radial-gradient(circle, rgba(197,68,128,0.22) 0%, transparent 60%)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="cdss-grid" style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 56, alignItems: "start" }}>
          <div>
            <Reveal>
              <div className="eyebrow" style={{ color: "var(--accent-2)" }}>Clinical Decision Support</div>
            </Reveal>
            <Reveal delay={80}>
              <Headline align="left" style={{ color: "var(--dark-text)", marginTop: 14 }}>
                Smarter clinical decisions,<br />
                <span className="italic grad-text">in real time.</span>
              </Headline>
            </Reveal>
            <Reveal delay={160}>
              <p style={{ marginTop: 22, fontSize: 17, color: "var(--dark-dim)", maxWidth: 460, lineHeight: 1.55 }}>
                Adicare&apos;s CDSS engine reads alongside you — checking interactions, flagging drift, and suggesting evidence-backed next steps without ever taking your eyes off the patient.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div style={{ marginTop: 28 }}>
                <CTAButton href="#features" variant="primary">See how it works</CTAButton>
              </div>
            </Reveal>
          </div>

          <div className="cdss-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {items.map((it, i) => (
              <Reveal key={it.title} delay={80 + i * 70}>
                <div
                  style={{ background: "var(--dark-2)", border: "1px solid var(--dark-border)", borderRadius: 18, padding: 22, height: "100%", transition: "all 0.25s" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--dark-soft)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--dark-2)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,122,89,0.12)", color: "var(--accent-2)", display: "grid", placeItems: "center", marginBottom: 16 }}>{it.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 8, color: "var(--dark-text)" }}>{it.title}</h3>
                  <p style={{ fontSize: 13.5, color: "var(--dark-dim)", lineHeight: 1.55 }}>{it.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
