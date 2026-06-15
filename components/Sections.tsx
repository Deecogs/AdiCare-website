"use client";

import React, { useState } from "react";
import { Reveal, SectionEyebrow, Headline, CTAButton, useCounter } from "./primitives";

// ----------------------------------------------------------------
// <Stats>
// ----------------------------------------------------------------
const StatItem = ({ num, suffix, label, decimals = 0 }: { num: number; suffix: string; label: string; decimals?: number }) => {
  const [ref, val] = useCounter(num, 1400);
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>
        <span className="grad-text">{val.toFixed(decimals)}{suffix}</span>
      </div>
      <div style={{ marginTop: 12, fontSize: 13, color: "var(--text-2)", letterSpacing: "0.01em" }}>{label}</div>
    </div>
  );
};

export const Stats = () => {
  const items = [
    { num: 4800, suffix: "+", label: "Doctors on the waitlist" },
    { num: 240, suffix: "+", label: "Pilot clinics across India" },
    { num: 12, suffix: "", label: "Indic languages supported" },
    { num: 99.7, suffix: "%", label: "ICR accuracy on real scripts", decimals: 1 },
  ];
  return (
    <section style={{ padding: "80px 0", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="container">
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {items.map((it, i) => (
            <StatItem key={i} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// <Testimonials>
// ----------------------------------------------------------------
export const Testimonials = () => {
  const items = [
    {
      institute: "Apollo Clinic, Bengaluru",
      sessions: "4,200+",
      label: "consultations digitised",
      quote: "We switched the entire OPD over in a weekend. The handwriting recognition is uncanny — even my worst scripts come back clean. Patient records that used to take 20 minutes to find now load in a tap.",
      doctor: "Dr. K. Sudheer Kumar",
      role: "Consultant Endocrinologist",
    },
    {
      institute: "Cloudnine, Hyderabad",
      sessions: "2,800+",
      label: "prenatal records managed",
      quote: "The voice scribe is what won me over. I consult in Hindi and English in the same sentence, and the SOAP note still comes out perfect. My evenings are mine again.",
      doctor: "Dr. Priya Iyer",
      role: "Senior Consultant, OBG",
    },
    {
      institute: "Manipal Hospitals, Mumbai",
      sessions: "3,900+",
      label: "follow-ups automated",
      quote: "We were skeptical about another platform. After 30 days the receptionist's WhatsApp queue was empty for the first time in five years. Adicare handles the boring half of practice.",
      doctor: "Dr. Harshwardhan Bora",
      role: "Senior Consultant, Internal Medicine",
    },
  ];
  const [active, setActive] = useState(0);
  return (
    <section id="testimonials" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)", background: "var(--bg)" }}>
      <div className="container">
        <Reveal>
          <SectionEyebrow>Testimonials</SectionEyebrow>
        </Reveal>
        <Reveal delay={80}>
          <Headline align="center">
            Real stories.{" "}<span className="italic grad-text">Measurable</span> impact.
          </Headline>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ marginTop: 20, textAlign: "center", fontSize: 17, color: "var(--text-2)", maxWidth: 600, margin: "20px auto 0", lineHeight: 1.55 }}>
            Practitioners across India are already cutting admin time, lifting follow-up rates, and getting their evenings back.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="testimonial-card" style={{ marginTop: 56, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "44px 48px", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48, alignItems: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 220, height: 220, background: "var(--accent-grad)", opacity: 0.12, filter: "blur(50px)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="mono" style={{ fontSize: 10, color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Institutional Partner</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 28 }}>{items[active].institute}</div>
              <div className="mono" style={{ fontSize: 10, color: "var(--dim)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>Adicare Sessions</div>
              <div className="grad-text" style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>{items[active].sessions}</div>
              <div style={{ fontSize: 13, color: "var(--text-2)", marginTop: 4 }}>{items[active].label}</div>
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <svg width="32" height="24" viewBox="0 0 32 24" aria-hidden="true" style={{ color: "var(--accent)", opacity: 0.4, marginBottom: 16 }}>
                <path d="M0 24V14C0 6 4 1 12 0v4c-4 1-6 4-6 8h6v12H0zm20 0V14c0-8 4-13 12-14v4c-4 1-6 4-6 8h6v12H20z" fill="currentColor" />
              </svg>
              <blockquote style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 400, lineHeight: 1.5, letterSpacing: "-0.01em", color: "var(--text)" }}>{items[active].quote}</blockquote>
              <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--accent-grad)", color: "white", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 15 }}>
                  {items[active].doctor.split(" ").map((n) => n[0]).slice(-2).join("")}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{items[active].doctor}</div>
                  <div style={{ fontSize: 12, color: "var(--dim)" }}>{items[active].role}</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{ width: i === active ? 28 : 8, height: 8, borderRadius: 99, background: i === active ? "var(--accent)" : "var(--border-2)", transition: "all 0.25s" }}
              aria-label={`Show testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// <Integrations>
// ----------------------------------------------------------------
export const Integrations = () => {
  const items = [
    { name: "WhatsApp", color: "#25D366", letter: "W" },
    { name: "Google Meet", color: "#00897B", letter: "M" },
    { name: "1mg", color: "#FF6F00", letter: "1" },
    { name: "Tata Health", color: "#1E40AF", letter: "T" },
    { name: "PharmEasy", color: "#10B981", letter: "P" },
    { name: "Metropolis", color: "#7E22CE", letter: "M" },
    { name: "ABDM", color: "#0EA5E9", letter: "A" },
    { name: "Razorpay", color: "#0B2A57", letter: "R" },
    { name: "Stripe", color: "#635BFF", letter: "S" },
    { name: "Slack", color: "#4A154B", letter: "#" },
    { name: "Zoho", color: "#E42527", letter: "Z" },
    { name: "Practo", color: "#1672EC", letter: "P" },
  ];
  return (
    <section style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)", background: "var(--bg-tint)" }}>
      <div className="container">
        <div className="integ-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 56, alignItems: "center" }}>
          <div>
            <Reveal>
              <SectionEyebrow align="left">Integrations</SectionEyebrow>
            </Reveal>
            <Reveal delay={80}>
              <Headline align="left">
                The apps you need,<br />
                <span className="italic grad-text">already in Adicare.</span>
              </Headline>
            </Reveal>
            <Reveal delay={160}>
              <p style={{ marginTop: 22, fontSize: 17, color: "var(--text-2)", lineHeight: 1.55, maxWidth: 440 }}>
                Stop switching between 14 tabs. Communication, payments, pharmacy, labs, ABDM — Adicare brings every workflow into one intelligent workspace.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div style={{ marginTop: 28 }}>
                <CTAButton href="#" variant="ghost">See all 40+ integrations</CTAButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {items.map((it) => (
                <div
                  key={it.name}
                  title={it.name}
                  style={{ aspectRatio: "1", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 18, display: "grid", placeItems: "center", transition: "all 0.25s", cursor: "pointer" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px) scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 12px 24px rgba(15,17,23,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: it.color, color: "white", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>{it.letter}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// <Certifications>
// ----------------------------------------------------------------
export const Certifications = () => {
  const items = [
    { name: "ABDM Compliant", sub: "National Health Authority" },
    { name: "FHIR R4", sub: "Interoperable records" },
    { name: "HIPAA Ready", sub: "End-to-end encryption" },
    { name: "DPDP Compliant", sub: "Indian data protection" },
    { name: "AWS Healthcare", sub: "Cloud partner" },
  ];
  return (
    <section style={{ padding: "80px 0", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <div className="mono" style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.18em", color: "var(--dim)", textTransform: "uppercase", marginBottom: 32 }}>
          built on standards · audited end-to-end
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
          {items.map((c) => (
            <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", border: "1px solid var(--border)", borderRadius: 14, background: "var(--bg)", minWidth: 220 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--accent-grad)", color: "white", display: "grid", placeItems: "center" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8l3 3 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em" }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "var(--dim)" }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// <Blog>
// ----------------------------------------------------------------
export const Blog = () => {
  const posts = [
    { tag: "Product", title: "Why we built Adicare on paper, not screens", desc: "The OPD is the last room screens haven't disrupted — for good reason. Here's how we got around it.", time: "6 min read", color: "linear-gradient(135deg, #fff5f3 0%, #ffd9cd 100%)" },
    { tag: "Research", title: "ICR accuracy on Indian clinical scripts: 99.7%", desc: "Our ICR model was trained on 4M+ anonymised prescriptions across 12 languages. The benchmarks are in.", time: "9 min read", color: "linear-gradient(135deg, #f3f5fd 0%, #d6dcf5 100%)" },
    { tag: "Field notes", title: "30 days at Apollo Bengaluru with Adicare Rx-01", desc: "How a single endocrinology clinic onboarded the hardware, the software, and 2,400 patients in one month.", time: "12 min read", color: "linear-gradient(135deg, #f0f9f4 0%, #c8eada 100%)" },
  ];
  return (
    <section id="blog" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)", background: "var(--bg)" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <Reveal>
              <SectionEyebrow align="left">Adicare Stories</SectionEyebrow>
            </Reveal>
            <Reveal delay={80}>
              <Headline align="left" size="lg">
                What we're learning,<br />
                <span className="italic grad-text">writing, and shipping.</span>
              </Headline>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <CTAButton href="#" variant="ghost">All resources</CTAButton>
          </Reveal>
        </div>

        <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <a
                href="#"
                style={{ display: "block", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden", transition: "all 0.3s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 18px 40px rgba(15,17,23,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div style={{ height: 180, background: p.color, position: "relative", display: "grid", placeItems: "center" }}>
                  <div style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", fontSize: 56, color: "rgba(0,0,0,0.18)", fontWeight: 300 }}>℞</div>
                </div>
                <div style={{ padding: 24 }}>
                  <div className="mono" style={{ fontSize: 10, color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>{p.tag} · {p.time}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.25, marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.55 }}>{p.desc}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
