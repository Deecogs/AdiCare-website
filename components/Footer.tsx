"use client";

import React from "react";
import { Reveal, Logo, CTAButton } from "./primitives";

// ----------------------------------------------------------------
// <FinalCTA>
// ----------------------------------------------------------------
export const FinalCTA = () => (
  <section id="preorder" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)", position: "relative", overflow: "hidden" }}>
    <div className="container">
      <Reveal>
        <div data-dark style={{ background: "var(--dark)", color: "var(--dark-text)", borderRadius: "var(--radius-lg)", padding: "72px 56px", position: "relative", overflow: "hidden", textAlign: "center" }}>
          <div style={{ position: "absolute", top: -200, left: -120, width: 500, height: 500, background: "radial-gradient(circle, rgba(255,122,89,0.35) 0%, transparent 60%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -180, right: -120, width: 500, height: 500, background: "radial-gradient(circle, rgba(197,68,128,0.32) 0%, transparent 60%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 2 }}>
            <div className="eyebrow" style={{ color: "var(--accent-2)" }}>Get started</div>
            <h2 style={{ marginTop: 18, fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 600, lineHeight: 1.0, letterSpacing: "-0.035em", maxWidth: 820, margin: "18px auto 0" }}>
              Still have questions?<br />
              <span className="italic grad-text">Get a tour.</span>
            </h2>
            <p style={{ marginTop: 22, fontSize: 17, color: "var(--dark-dim)", maxWidth: 560, margin: "22px auto 0", lineHeight: 1.55 }}>
              A 15-minute walkthrough with our clinical team. We&apos;ll demo Adicare live in your specialty, answer the hard questions, and help you decide if this is right for your practice.
            </p>

            <div className="cta-grid" style={{ marginTop: 36, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, maxWidth: 640, margin: "36px auto 0" }}>
              <div style={{ background: "var(--dark-2)", border: "1px solid var(--dark-border)", borderRadius: 18, padding: 24, textAlign: "left" }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--accent-2)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>For doctors</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, letterSpacing: "-0.015em", marginBottom: 6 }}>Book a 15-min demo</div>
                <div style={{ fontSize: 13, color: "var(--dark-dim)", marginBottom: 16, lineHeight: 1.5 }}>Live walkthrough · your specialty · your questions.</div>
                <CTAButton href="#" variant="primary" style={{ width: "100%", justifyContent: "center" }}>Schedule a call</CTAButton>
              </div>
              <div style={{ background: "var(--dark-2)", border: "1px solid var(--dark-border)", borderRadius: 18, padding: 24, textAlign: "left" }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--accent-2)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>For hospitals</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, letterSpacing: "-0.015em", marginBottom: 6 }}>Talk to enterprise</div>
                <div style={{ fontSize: 13, color: "var(--dark-dim)", marginBottom: 16, lineHeight: 1.5 }}>Pilots, custom integrations, volume pricing.</div>
                <CTAButton href="#" variant="ghost" dark style={{ width: "100%", justifyContent: "center" }}>Get in touch</CTAButton>
              </div>
            </div>

            {/* Compliance trust line — re-enable once these are actually in place.
            <div className="mono" style={{ marginTop: 36, fontSize: 11, color: "var(--dark-dim)", letterSpacing: "0.12em", textTransform: "uppercase", display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
              <span>● ABDM Compliant</span>
              <span>● 100% Data Privacy</span>
              <span>● AWS Healthcare</span>
            </div>
            */}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// ----------------------------------------------------------------
// <Footer>
// ----------------------------------------------------------------
export const Footer = () => {
  const columns: [string, string[]][] = [
    ["Products", ["Rx-01 Device", "Adicare EMR", "Adicare Scribe", "Adicare Connect", "Roadmap"]],
    ["For doctors", ["Pre-order", "Specialties", "Pricing", "Refills", "Help center"]],
    ["Developers", ["Documentation", "API Reference", "Status", "Changelog"]],
    ["Company", ["About", "Careers", "Press", "Contact", "Privacy", "Terms"]],
  ];
  return (
    <footer style={{ background: "var(--dark)", color: "var(--dark-text)", paddingTop: 72, paddingBottom: 32 }} data-dark>
      <div className="container">
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr", gap: 40 }}>
          <div>
            <Logo size={34} dark />
            <p style={{ marginTop: 16, fontSize: 13.5, color: "var(--dark-dim)", lineHeight: 1.6, maxWidth: 280 }}>
              The AI-native ambient healthcare platform for the next generation of practitioners. Made in Bengaluru, for India and the world.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
              <a href="#" style={{ padding: "8px 14px", border: "1px solid var(--dark-border)", borderRadius: 10, fontSize: 11, color: "var(--dark-text)", display: "inline-flex", alignItems: "center", gap: 8 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 1l8 6-8 6V1z" fill="currentColor" /></svg>
                <span style={{ textAlign: "left", lineHeight: 1.1 }}>
                  <span style={{ display: "block", fontSize: 8, opacity: 0.7 }}>GET IT ON</span>
                  <span style={{ display: "block", fontSize: 11, fontWeight: 600 }}>Google Play</span>
                </span>
              </a>
              <a href="#" style={{ padding: "8px 14px", border: "1px solid var(--dark-border)", borderRadius: 10, fontSize: 11, color: "var(--dark-text)", display: "inline-flex", alignItems: "center", gap: 8 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M9.3 2.1c-.5.5-1.3.9-2 .8-.1-.8.3-1.6.7-2.1.5-.5 1.3-.9 2-1 0 .8-.3 1.6-.7 2.3zM10 3.5c-1.1 0-2 .6-2.5.6S6 3.5 5 3.6C3.7 3.6 2.5 4.4 2 5.5 1 7.7 1.8 11 2.7 12.7c.5.9 1.1 1.8 1.9 1.8.7 0 1-.5 1.9-.5s1.1.5 1.9.5c.8 0 1.3-.9 1.8-1.8.6-1 .9-2 .9-2-.1 0-1.8-.7-1.8-2.7 0-1.7 1.4-2.5 1.4-2.5-.8-1.1-2-1.2-2.5-1.3z" fill="currentColor" /></svg>
                <span style={{ textAlign: "left", lineHeight: 1.1 }}>
                  <span style={{ display: "block", fontSize: 8, opacity: 0.7 }}>DOWNLOAD ON THE</span>
                  <span style={{ display: "block", fontSize: 11, fontWeight: 600 }}>App Store</span>
                </span>
              </a>
            </div>
          </div>

          {columns.map(([title, links]) => (
            <div key={title} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="mono" style={{ fontSize: 10, color: "var(--accent-2)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>{title}</div>
              {links.map((it) => (
                <a
                  key={it}
                  href="#"
                  style={{ fontSize: 13.5, color: "var(--dark-dim)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--dark-text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dark-dim)")}
                >
                  {it}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, paddingTop: 28, borderTop: "1px solid var(--dark-border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--dark-dim)", letterSpacing: "0.08em" }}>© 2026 Adicare Health Pvt Ltd · All rights reserved</div>
          <div style={{ display: "flex", gap: 14 }}>
            {["Twitter", "LinkedIn", "Instagram", "GitHub"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--dark-border)", display: "grid", placeItems: "center", fontSize: 11, color: "var(--dark-dim)", fontFamily: "var(--font-mono)", transition: "all 0.2s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--dark-text)";
                  e.currentTarget.style.borderColor = "var(--dark-text)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--dark-dim)";
                  e.currentTarget.style.borderColor = "var(--dark-border)";
                }}
              >
                {s[0]}
              </a>
            ))}
          </div>
          <div className="mono" style={{ fontSize: 11, color: "var(--dark-dim)", letterSpacing: "0.08em" }}>हम भारत में बनाते हैं · MADE IN INDIA</div>
        </div>
      </div>
    </footer>
  );
};
