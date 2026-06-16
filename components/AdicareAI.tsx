"use client";

import React, { type ReactNode } from "react";
import Image from "next/image";
import { Reveal, SectionEyebrow, Headline, CTAButton } from "./primitives";
import { openLead } from "./lead";

// The Adicare AI logo (the iC mark), animated: a rotating gradient halo
// behind a gently floating badge. Reusable as the assistant avatar.
export const AILogo = ({ size = 132 }: { size?: number }) => (
  <div style={{ position: "relative", display: "inline-grid", placeItems: "center", width: size * 1.5, height: size * 1.5 }}>
    {/* rotating colourful halo */}
    <div
      style={{
        position: "absolute",
        width: size * 1.2,
        height: size * 1.2,
        borderRadius: "50%",
        background: "conic-gradient(from 0deg, #ff7a59, #f04e4e, #c54480, #ff7a59)",
        filter: "blur(26px)",
        opacity: 0.45,
        animation: "icSpin 12s linear infinite",
      }}
    />
    {/* floating badge holding the logo */}
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 22px 55px rgba(15,17,23,0.14)",
        display: "grid",
        placeItems: "center",
        animation: "aiFloat 5s ease-in-out infinite",
      }}
    >
      <Image src="/llm-logo.png" alt="Adicare AI" width={275} height={276} style={{ width: size * 0.6, height: "auto", display: "block" }} />
    </div>
  </div>
);

const icon = (d: ReactNode) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">{d}</svg>
);

const CAPS: { id: string; title: string; desc: string; svg: ReactNode }[] = [
  {
    id: "lang",
    title: "12+ Indic languages",
    desc: "Consult and document in Hindi, Tamil, Bengali, Telugu, Marathi and more — code-switching included.",
    svg: icon(<><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke="currentColor" strokeWidth="1.6" /></>),
  },
  {
    id: "voice",
    title: "Speech-to-text & text-to-speech",
    desc: "Dictate notes hands-free and have summaries or instructions read back aloud — voice in, voice out.",
    svg: icon(<><rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></>),
  },
  {
    id: "device",
    title: "On-device capable",
    desc: "Runs at the edge for low latency and privacy — keeps working even with patchy connectivity.",
    svg: icon(<><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></>),
  },
  {
    id: "cdss",
    title: "Critical medical recommendations",
    desc: "Real-time interaction, dosing, and screening flags surfaced the moment you prescribe.",
    svg: icon(<><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 12l2 2 4-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></>),
  },
  {
    id: "image",
    title: "Medical image inference",
    desc: "Reads scans, X-rays, lab reports, and documents — extracts the findings that matter.",
    svg: icon(<><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M3 16l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" /></>),
  },
  {
    id: "data",
    title: "Built on Indian clinical data",
    desc: "Continuously trained on de-identified records — protocols that match Indian patient reality.",
    svg: icon(<><ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.6" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" stroke="currentColor" strokeWidth="1.6" /></>),
  },
];

export const AdicareAI = () => (
  <section id="ai" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)", background: "var(--bg)", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, background: "var(--halo)", pointerEvents: "none" }} />
    <div className="container" style={{ position: "relative", zIndex: 2 }}>
      <Reveal>
        <div style={{ display: "grid", placeItems: "center", marginBottom: 8 }}>
          <AILogo size={132} />
        </div>
      </Reveal>
      <Reveal delay={80}>
        <SectionEyebrow>Adicare AI</SectionEyebrow>
      </Reveal>
      <Reveal delay={120}>
        <Headline align="center">
          One AI engine,<br />
          built for <span className="italic grad-text">Indian medicine.</span>
        </Headline>
      </Reveal>
      <Reveal delay={180}>
        <p style={{ marginTop: 22, textAlign: "center", fontSize: 17, color: "var(--text-2)", maxWidth: 640, margin: "22px auto 0", lineHeight: 1.55 }}>
          The intelligence behind every Adicare feature — multilingual, multimodal, and tuned for the
          realities of Indian clinics. It scribes, reads records and images, and flags what matters in real time.
        </p>
      </Reveal>

      <div className="product-grid" style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {CAPS.map((c, i) => (
          <Reveal key={c.id} delay={(i % 3) * 70}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 26, height: "100%" }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center", marginBottom: 16 }}>
                {c.svg}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17.5, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.2, marginBottom: 8 }}>{c.title}</h3>
              <p style={{ fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.55 }}>{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mono" style={{ marginTop: 28, textAlign: "center", fontSize: 10, color: "var(--dim)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        Adicare AI assists clinicians — it does not replace clinical judgement
      </p>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
        <CTAButton onClick={() => openLead("demo")} variant="primary">See Adicare AI in a demo</CTAButton>
      </div>
    </div>
  </section>
);
