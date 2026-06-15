"use client";

import React, { useState, useEffect, type ReactNode } from "react";
import { Reveal, SectionEyebrow, Headline, CTAButton } from "./primitives";

// ----------------------------------------------------------------
// Visuals
// ----------------------------------------------------------------
const ScribeBigVisual = () => {
  const lines = ["Patient reports intermittent", "chest pain on exertion,", "no radiation, mild dyspnea.", "BP 142/88 · HR 86"];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setShown((s) => (s + 1) % (lines.length + 2)), 1100);
    return () => clearInterval(t);
  }, [lines.length]);
  return (
    <div style={{ height: "100%", background: "linear-gradient(135deg, var(--accent-grad-soft))", padding: 22, display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 14 }}>
      <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 14, padding: 18, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--accent-grad)", display: "grid", placeItems: "center", boxShadow: "0 0 0 6px rgba(240,78,78,0.15)", animation: "micPulse 1.5s ease-in-out infinite" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="white" aria-hidden="true">
              <rect x="5" y="2" width="4" height="7" rx="2" />
              <path d="M3 7v1a4 4 0 0 0 8 0V7M7 12v0.5" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 10, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>LISTENING</div>
            <div style={{ fontSize: 11, color: "var(--dim)" }}>EN-IN · 00:23</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 2, height: 40 }}>
          {Array.from({ length: 28 }).map((_, idx) => {
            // Rounded to whole px to keep SSR and client renders identical
            // (avoids hydration mismatch from trig float differences).
            const h = Math.round(4 + Math.abs(Math.sin(idx * 0.6)) * 32);
            return <div key={idx} style={{ width: 2.5, height: h, background: idx < 18 ? "var(--accent)" : "#e8c8b4", borderRadius: 1.5, animation: `wavy 1.4s ease-in-out infinite ${idx * 60}ms` }} />;
          })}
        </div>
      </div>
      <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 14, padding: 16, fontSize: 13, color: "var(--text)", lineHeight: 1.5, fontFamily: "var(--font-display)", display: "flex", flexDirection: "column", gap: 6, position: "relative" }}>
        <div className="mono" style={{ fontSize: 9, color: "var(--dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>Live transcript</div>
        {lines.map((l, i) => (
          <div key={i} style={{ opacity: i <= shown ? 1 : 0.2, transition: "opacity 0.3s", color: i === shown ? "var(--text)" : "var(--text-2)", fontWeight: i === shown ? 500 : 400 }}>{l}</div>
        ))}
      </div>
    </div>
  );
};

const CoordinatedVisual = () => (
  <div style={{ height: "100%", background: "linear-gradient(135deg, #f0f9f4 0%, #d9eee2 100%)", padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
    {[
      { from: "Adicare", body: "Hi Rajeev — your prescription from Dr. Mehta. View Rx →", time: "10:42" },
      { from: "Adicare", body: "Reminder: take Metformin 1g before dinner today 🍽", time: "19:45", accent: true },
      { from: "Rajeev", body: "Done, thanks 🙏", time: "20:14", sent: true },
    ].map((m, i) => (
      <div
        key={i}
        style={{
          background: m.sent ? "#dcf8c6" : m.accent ? "var(--accent-soft)" : "white",
          border: "1px solid rgba(255,255,255,0.7)",
          borderRadius: 10,
          padding: "8px 12px",
          fontSize: 12,
          color: "var(--text-2)",
          lineHeight: 1.4,
          maxWidth: "82%",
          alignSelf: m.sent ? "flex-end" : "flex-start",
          boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
          position: "relative",
          fontFamily: "var(--font-display)",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 11, color: m.accent ? "var(--accent)" : "var(--text)", marginBottom: 2 }}>{m.from}</div>
        {m.body}
        <div className="mono" style={{ fontSize: 9, color: "var(--dim)", marginTop: 3, textAlign: "right" }}>{m.time}</div>
      </div>
    ))}
  </div>
);

const RecordsVisual = () => (
  <div style={{ height: "100%", background: "linear-gradient(135deg, #f5f1e6 0%, #ede5d1 100%)", padding: 20, display: "flex", flexDirection: "column", gap: 8 }}>
    <div className="mono" style={{ fontSize: 10, color: "var(--dim)", letterSpacing: "0.12em", textTransform: "uppercase" }}>R. SHARMA · 12 RECORDS</div>
    {[
      { y: "2026", t: "HbA1c · 7.2%", flag: false },
      { y: "2025", t: "ECG · sinus, normal", flag: false },
      { y: "2024", t: "Lipid profile · LDL 142", flag: true },
      { y: "2023", t: "Chest X-ray · clear", flag: false },
      { y: "2022", t: "Hypertension diagnosis", flag: false },
    ].map((r, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 10px", background: "white", borderRadius: 8, fontSize: 12, opacity: 1 - i * 0.12 }}>
        <span className="mono" style={{ fontSize: 10, color: "var(--dim)", width: 36 }}>{r.y}</span>
        <span style={{ flex: 1, color: "var(--text)" }}>{r.t}</span>
        {r.flag && <span className="mono" style={{ fontSize: 9, padding: "2px 6px", background: "var(--accent-soft)", color: "var(--accent)", borderRadius: 99, fontWeight: 600, letterSpacing: "0.1em" }}>FLAG</span>}
      </div>
    ))}
  </div>
);

const CommandCenterVisual = () => (
  <div style={{ height: "100%", background: "linear-gradient(135deg, #f3f5fd 0%, #e6eaf7 100%)", padding: 22, display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 12 }}>
    <div style={{ background: "white", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
      <div className="mono" style={{ fontSize: 9, color: "var(--dim)", letterSpacing: "0.12em", textTransform: "uppercase" }}>TODAY · 18</div>
      {["Waiting · 4", "Active · 1", "Done · 13"].map((s, i) => (
        <div key={s} style={{ padding: "6px 10px", background: i === 1 ? "var(--accent-soft)" : "transparent", borderRadius: 6, fontSize: 12, color: i === 1 ? "var(--accent)" : "var(--text-2)", fontWeight: i === 1 ? 600 : 400 }}>{s}</div>
      ))}
    </div>
    <div style={{ background: "white", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--accent-grad)", color: "white", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 700 }}>RS</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600 }}>Rajeev Sharma</div>
          <div className="mono" style={{ fontSize: 10, color: "var(--dim)" }}>58 · M · T2DM</div>
        </div>
        <div style={{ padding: "3px 7px", background: "#dcfce7", color: "#15803d", borderRadius: 99, fontSize: 9, fontWeight: 600, fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}>● LIVE</div>
      </div>
      <div style={{ background: "var(--bg-tint)", borderRadius: 8, padding: "8px 10px", fontSize: 11, color: "var(--text-2)", lineHeight: 1.4 }}>
        <span className="mono" style={{ fontSize: 9, color: "var(--dim)", letterSpacing: "0.1em", marginRight: 6 }}>NOTE</span>
        F/U for diabetes review. HbA1c trending up — suggest titration.
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <div style={{ flex: 1, padding: "6px 8px", background: "var(--accent-grad)", borderRadius: 6, fontSize: 10, color: "white", fontWeight: 600, textAlign: "center" }}>Start visit</div>
        <div style={{ padding: "6px 8px", border: "1px solid var(--border)", borderRadius: 6, fontSize: 10, color: "var(--text-2)" }}>Reschedule</div>
      </div>
    </div>
  </div>
);

const AgentChatMockup = () => {
  const msgs = [
    { who: "patient", body: "Hi, I need to refill my BP medicine" },
    { who: "agent", body: "Sure! I see Telmisartan 40mg, last refilled 8 weeks ago. Confirm refill for 30 days?" },
    { who: "patient", body: "Yes please" },
    { who: "agent", body: "Done ✓ Pharmacy will WhatsApp you when it's ready. Anything else?" },
  ];
  return (
    <div style={{ background: "linear-gradient(180deg, var(--dark-2) 0%, var(--dark) 100%)", borderTopLeftRadius: 18, borderTopRightRadius: 18, padding: "22px 22px 0", marginBottom: 0, display: "flex", flexDirection: "column", gap: 10, position: "relative", border: "1px solid var(--dark-border)", borderBottom: "none", minHeight: 320 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 12, borderBottom: "1px solid var(--dark-border)" }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--accent-grad)", color: "white", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700 }}>A</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--dark-text)" }}>Adicare Agent</div>
          <div className="mono" style={{ fontSize: 10, color: "#22c55e", letterSpacing: "0.1em" }}>● ONLINE · 24/7</div>
        </div>
      </div>
      {msgs.map((m, i) => (
        <div
          key={i}
          style={{
            alignSelf: m.who === "patient" ? "flex-end" : "flex-start",
            maxWidth: "78%",
            background: m.who === "patient" ? "var(--accent-grad)" : "var(--dark-soft)",
            color: m.who === "patient" ? "white" : "var(--dark-text)",
            padding: "8px 12px",
            borderRadius: m.who === "patient" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
            fontSize: 13,
            lineHeight: 1.4,
            border: m.who === "patient" ? "none" : "1px solid var(--dark-border)",
          }}
        >
          {m.body}
        </div>
      ))}
    </div>
  );
};

// ----------------------------------------------------------------
// Cards
// ----------------------------------------------------------------
const BigFeature = ({ eyebrow, title, bullets, visual }: { eyebrow: string; title: string; bullets: string[]; visual: ReactNode }) => (
  <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 32, display: "grid", gridTemplateRows: "auto 1fr", gap: 24, minHeight: 460, overflow: "hidden", position: "relative" }}>
    <div>
      <div className="eyebrow">{eyebrow}</div>
      <h3 style={{ marginTop: 12, fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{title}</h3>
      <ul style={{ listStyle: "none", marginTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
        {bullets.map((b) => (
          <li key={b} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-2)", lineHeight: 1.5 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" style={{ marginTop: 2, flexShrink: 0 }}>
              <circle cx="8" cy="8" r="7" fill="var(--accent-soft)" />
              <path d="M5 8l2 2 4-5" stroke="var(--accent)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {b}
          </li>
        ))}
      </ul>
    </div>
    <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", minHeight: 180 }}>{visual}</div>
  </div>
);

const SmallFeature = ({ eyebrow, title, body, visual }: { eyebrow: string; title: string; body: string; visual: ReactNode }) => (
  <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 32, display: "grid", gridTemplateRows: "1fr auto", gap: 24, minHeight: 460, overflow: "hidden" }}>
    <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", minHeight: 180 }}>{visual}</div>
    <div>
      <div className="eyebrow">{eyebrow}</div>
      <h3 style={{ marginTop: 10, fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.55 }}>{body}</p>
    </div>
  </div>
);

export const Features = () => {
  return (
    <section id="features" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)", background: "var(--bg-tint)", position: "relative" }}>
      <div className="container">
        <Reveal>
          <SectionEyebrow>Smart Features</SectionEyebrow>
        </Reveal>
        <Reveal delay={80}>
          <Headline align="center">
            Limitless clinical <span className="italic grad-text">innovation,</span><br />
            built for healthcare.
          </Headline>
        </Reveal>

        <div className="feat-row" style={{ marginTop: 64, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
          <Reveal>
            <BigFeature
              eyebrow="Save 12+ hours every week"
              title="Consult naturally. We'll handle the paperwork."
              bullets={[
                "Auto-generates clinical notes from your handwriting + voice",
                "Speaks 12 Indic languages + English fluently",
                "Pushes structured records to any EMR you already use",
              ]}
              visual={<ScribeBigVisual />}
            />
          </Reveal>
          <Reveal delay={100}>
            <SmallFeature
              eyebrow="Co-ordinated care"
              title="Follow-ups that actually follow up."
              body="Instant digital prescriptions on WhatsApp. Automated reminders. Refill orchestration. The clinic continuity layer you've been hand-rolling in Excel."
              visual={<CoordinatedVisual />}
            />
          </Reveal>
        </div>

        <div className="feat-row" style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16 }}>
          <Reveal>
            <SmallFeature
              eyebrow="Medical Records Analyser"
              title="Decades of records, made readable."
              body="Drop in any old paper file, lab report, or imaging summary — Adicare extracts structured fields and surfaces the timeline."
              visual={<RecordsVisual />}
            />
          </Reveal>
          <Reveal delay={100}>
            <BigFeature
              eyebrow="Your clinic's command center"
              title="The OPD, completely in flow."
              bullets={[
                "Patient queue with real-time wait estimates",
                "One-click switch between video and in-person visit",
                "Multi-doctor, multi-location ready from day 1",
              ]}
              visual={<CommandCenterVisual />}
            />
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div
            className="dark-row"
            data-dark
            style={{ marginTop: 16, background: "var(--dark)", color: "var(--dark-text)", borderRadius: "var(--radius-lg)", padding: "44px 44px 0", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 40, alignItems: "stretch", overflow: "hidden", position: "relative" }}
          >
            <div style={{ paddingBottom: 44 }}>
              <div className="eyebrow" style={{ color: "var(--accent-2)" }}>Conversational AI Agents</div>
              <h3 style={{ marginTop: 14, fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.025em" }}>
                Voice agents that book, triage,<br />and remind — 24/7.
              </h3>
              <p style={{ marginTop: 18, fontSize: 15.5, color: "var(--dark-dim)", maxWidth: 480, lineHeight: 1.55 }}>
                Build clinical-grade voice and chat agents on top of Adicare&apos;s multimodal engine. Symptom checks, appointment booking, refill FAQs — handled before the receptionist&apos;s coffee is cold.
              </p>
              <div style={{ marginTop: 26 }}>
                <CTAButton href="#" variant="ghost" dark>Read the developer docs</CTAButton>
              </div>
            </div>
            <AgentChatMockup />
            <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(255,122,89,0.25) 0%, transparent 60%)", pointerEvents: "none" }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
