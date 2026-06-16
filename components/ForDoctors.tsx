"use client";

import React, { useState, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { Reveal, SectionEyebrow, Headline, CTAButton, useInView } from "./primitives";
import { openLead } from "./lead";

// Icons for the feature switcher
const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    {children}
  </svg>
);
const icons: Record<string, ReactNode> = {
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.5" /><rect x="12" y="3" width="7" height="4" rx="1.6" stroke="currentColor" strokeWidth="1.5" /><rect x="12" y="10" width="7" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="7" height="6" rx="1.6" stroke="currentColor" strokeWidth="1.5" /></>,
  scribe: <><rect x="8" y="2.5" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M5 11a6 6 0 0 0 12 0M11 17v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  report: <><rect x="4" y="2.5" width="14" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M7.5 7.5h7M7.5 11h7M7.5 14.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  rx: <><path d="M6 5h4a3 3 0 0 1 0 6H6V5zM6 11v6M6 13l8 6M11.5 13.5l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>,
  patients: <><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M3 18a5 5 0 0 1 10 0M15 6a3 3 0 0 1 0 6M19 18a5 5 0 0 0-4-4.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  analytics: <><path d="M4 19V5M4 19h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M8 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>,
};

// Curated set — the 6 most differentiated screens (not every screenshot).
const SHOTS = [
  { id: "dashboard", label: "Dashboard", src: "/images/dashboard.png", desc: "Your day at a glance — live queue, sessions, and what's next." },
  { id: "scribe", label: "AI Scribe", src: "/images/ai-scribe.png", desc: "Consult in 12 Indic languages — Adicare listens and drafts the notes." },
  { id: "report", label: "Smart Reports", src: "/images/report-summary.png", desc: "An editable, AI-generated summary: diagnosis, vitals, and follow-up." },
  { id: "rx", label: "Prescriptions", src: "/images/prescription.png", desc: "Signed, shareable prescriptions generated in seconds." },
  { id: "patients", label: "Patients", src: "/images/patients.png", desc: "Every record, document, and visit — searchable in one tap." },
  { id: "analytics", label: "Analytics", src: "/images/analytics.png", desc: "Know your practice — by region, demographics, and case mix." },
];

const ROTATE_MS = 5000;

const AUDIENCE = [
  { title: "Solo doctors & small clinics", body: "Go fully digital without an IT team. Onboard in an afternoon and keep writing the way you always have." },
  { title: "Multi-specialty OPDs", body: "High patient volume, real-time queues, and multilingual consults — handled across every department." },
  { title: "Hospitals & chains", body: "Multi-doctor, multi-location rollouts with interoperable, audit-ready records from day one." },
];

const SPECIALTIES = [
  "General Physicians", "Diabetes & Endocrinology", "Pediatrics", "OBG & Prenatal",
  "Cardiology", "Internal Medicine", "Dermatology", "ENT", "Orthopedics", "Psychiatry",
];

// ----------------------------------------------------------------
// Showcase — feature switcher with crossfading screenshot stage
// ----------------------------------------------------------------
const Showcase = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stageRef, inView] = useInView({ threshold: 0.25 });

  // Auto-advance, paused on hover/focus or when off-screen.
  useEffect(() => {
    if (paused || !inView) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % SHOTS.length), ROTATE_MS);
    return () => clearTimeout(t);
  }, [active, paused, inView]);

  return (
    <div
      className="showcase-grid"
      style={{ marginTop: 40, display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: 36, alignItems: "center" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Feature list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }} role="tablist" aria-label="Platform features">
        {SHOTS.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              style={{
                position: "relative",
                overflow: "hidden",
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
                textAlign: "left",
                padding: 16,
                borderRadius: 16,
                border: `1px solid ${on ? "var(--border)" : "transparent"}`,
                background: on ? "var(--surface)" : "transparent",
                boxShadow: on ? "0 12px 30px rgba(15,17,23,0.06)" : "none",
                transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = "var(--bg-tint)"; }}
              onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = "transparent"; }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  display: "grid",
                  placeItems: "center",
                  background: on ? "var(--accent-grad)" : "var(--bg-tint)",
                  color: on ? "#fff" : "var(--accent)",
                  transition: "all 0.25s",
                }}
              >
                <Icon>{icons[s.id]}</Icon>
              </span>
              <span style={{ flex: 1 }}>
                <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--text)" }}>{s.label}</span>
                <span style={{ display: "block", marginTop: 3, fontSize: 13, color: "var(--text-2)", lineHeight: 1.45 }}>{s.desc}</span>
              </span>
              {/* progress bar (only on active) */}
              {on && (
                <span style={{ position: "absolute", left: 0, bottom: 0, height: 3, width: "100%", background: "var(--accent-soft)" }}>
                  <span
                    key={`${active}-${paused}-${inView}`}
                    style={{
                      display: "block",
                      height: "100%",
                      width: "100%",
                      transformOrigin: "left",
                      background: "var(--accent-grad)",
                      animation: `growBar ${ROTATE_MS}ms linear forwards`,
                      animationPlayState: paused || !inView ? "paused" : "running",
                    }}
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Screenshot stage */}
      <div className="showcase-stage" ref={stageRef as React.Ref<HTMLDivElement>} style={{ position: "relative" }}>
        {/* gradient glow behind */}
        <div style={{ position: "absolute", inset: "-12% -8%", background: "var(--accent-grad)", filter: "blur(70px)", opacity: 0.14, borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border)", background: "var(--surface)", boxShadow: "0 40px 90px rgba(15,17,23,0.16)" }}>
          {/* browser chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "11px 16px", borderBottom: "1px solid var(--border)", background: "var(--bg)" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            <span className="mono" style={{ marginLeft: 12, fontSize: 11, color: "var(--dim)" }}>app.adicare.health/{SHOTS[active].id}</span>
          </div>
          {/* crossfading images */}
          <div style={{ position: "relative", aspectRatio: "1440 / 1024" }}>
            {SHOTS.map((s, i) => (
              <Image
                key={s.id}
                src={s.src}
                alt={`Adicare platform — ${s.label}`}
                fill
                sizes="(max-width: 960px) 100vw, 680px"
                priority={i === 0}
                style={{ objectFit: "cover", opacity: i === active ? 1 : 0, transition: "opacity 0.5s ease", pointerEvents: "none" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ForDoctors = () => {
  return (
    <section id="doctors" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)", background: "var(--bg)", position: "relative" }}>
      <div className="container">
        <Reveal>
          <SectionEyebrow>For Doctors</SectionEyebrow>
        </Reveal>
        <Reveal delay={80}>
          <Headline align="center">
            Made for the way you <span className="italic grad-text">actually</span><br />
            practise medicine.
          </Headline>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ marginTop: 22, textAlign: "center", fontSize: 17, color: "var(--text-2)", maxWidth: 640, margin: "22px auto 0", lineHeight: 1.55 }}>
            Whether you run a single chamber or a multi-location hospital, Adicare fits your workflow — paper-first, AI-assisted, and built for Indian OPDs.
          </p>
        </Reveal>

        {/* Who it's for */}
        <div className="product-grid" style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {AUDIENCE.map((a, i) => (
            <Reveal key={a.title} delay={i * 80}>
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 28, height: "100%" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center", marginBottom: 16 }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 16l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="16" cy="9" r="1.4" fill="currentColor" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8 }}>{a.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.55 }}>{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Specialties */}
        <Reveal delay={120}>
          <div style={{ marginTop: 36, textAlign: "center" }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--dim)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 18 }}>
              Trusted across specialties
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
              {SPECIALTIES.map((s) => (
                <span key={s} style={{ padding: "8px 14px", border: "1px solid var(--border-2)", borderRadius: 99, fontSize: 13, color: "var(--text-2)", background: "var(--surface)" }}>{s}</span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Product showcase */}
        <Reveal delay={120}>
          <div style={{ marginTop: 72, textAlign: "center" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 12 }}>
              See it in action
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
              The whole consult, in one place.
            </h3>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <Showcase />
        </Reveal>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 44 }}>
          <CTAButton onClick={() => openLead("demo")} variant="primary">Book a demo for your practice</CTAButton>
        </div>
      </div>
    </section>
  );
};
