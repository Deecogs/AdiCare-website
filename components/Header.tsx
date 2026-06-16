"use client";

import React, { useState, useEffect, useMemo, type CSSProperties } from "react";
import Image from "next/image";
import { Reveal, Logo, CTAButton } from "./primitives";
import { DeviceSVG } from "./DeviceSVG";
import { openLead } from "./lead";

// ----------------------------------------------------------------
// <AnnouncementBar>
// ----------------------------------------------------------------
export const AnnouncementBar = () => (
  <div
    style={{
      background: "var(--text)",
      color: "white",
      fontSize: 12,
      letterSpacing: "0.02em",
      padding: "9px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      fontFamily: "var(--font-display)",
      flexWrap: "wrap",
      textAlign: "center",
    }}
  >
    <span
      style={{
        padding: "2px 8px",
        background: "var(--accent-grad)",
        borderRadius: 99,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      New
    </span>
    <span>Adicare Rx-01 hardware now available for pre-order — first 1,000 units</span>
    <button
      onClick={() => openLead("preorder")}
      style={{ display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 600, color: "inherit", cursor: "pointer" }}
    >
      Reserve yours
      <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
        <path d="M2 5.5h6m0 0L5.5 3m2.5 2.5L5.5 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </button>
  </div>
);

// ----------------------------------------------------------------
// <Nav>
// ----------------------------------------------------------------
export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  // Absolute "/#..." anchors so the same Nav works on sub-pages
  // (e.g. /resources) and still scrolls correctly on the homepage.
  const productsMenu = [
    { name: "Adicare Rx-01", desc: "The smart prescription pad", href: "/#device" },
    { name: "Adicare EMR", desc: "Modern clinic operating system", href: "/#products" },
    { name: "Adicare Scribe", desc: "Voice-to-prescription AI", href: "/#features" },
    { name: "Adicare Connect", desc: "ABDM interoperability — coming soon", href: "/#products" },
    { name: "Adicare AI", desc: "The clinical AI engine", href: "/#ai" },
  ];

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(250,250,250,0.85)" : "var(--bg)",
        backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}
      >
        <a href="/" aria-label="Adicare home">
          <Logo priority size={38} />
        </a>
        <div
          className="nav-menu"
          style={{ display: "flex", alignItems: "center", gap: 36, fontSize: 14, color: "var(--text-2)" }}
        >
          <div
            onMouseEnter={() => setOpen("products")}
            onMouseLeave={() => setOpen(null)}
            style={{ position: "relative", padding: "10px 0", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}
          >
            Products
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              aria-hidden="true"
              style={{ transform: open === "products" ? "rotate(180deg)" : "none", transition: "0.2s" }}
            >
              <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            </svg>
            {open === "products" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: -16,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: 10,
                  boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
                  minWidth: 320,
                }}
              >
                {productsMenu.map((p) => (
                  <a
                    key={p.name}
                    href={p.href}
                    style={{ display: "block", padding: "10px 12px", borderRadius: 10, transition: "background 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-tint)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "var(--dim)", marginTop: 2 }}>{p.desc}</div>
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="/#features">Features</a>
          <a href="/#demo">Live Demo</a>
          <a href="/#doctors">Doctors</a>
          <a href="/resources">Resources</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Sign in — re-enable once accounts / auth exist.
          <a href="#" style={{ fontSize: 14, color: "var(--text-2)", padding: "8px 14px" }}>
            Sign in
          </a>
          */}
          <CTAButton onClick={() => openLead("demo")} variant="primary" style={{ padding: "10px 18px", fontSize: 13 }}>
            Get a demo
          </CTAButton>
        </div>
      </div>
    </nav>
  );
};

// ----------------------------------------------------------------
// <RotatingWord>
// ----------------------------------------------------------------
const RotatingWord = ({ words = [] as string[] }) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span style={{ position: "relative", display: "inline-block", verticalAlign: "baseline", minWidth: "9ch" }}>
      {words.map((w, idx) => (
        <span
          key={w}
          className="grad-text italic"
          style={{
            position: idx === 0 ? "relative" : "absolute",
            left: 0,
            top: 0,
            opacity: i === idx ? 1 : 0,
            transform: i === idx ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s, transform 0.5s",
            fontStyle: "italic",
            whiteSpace: "nowrap",
          }}
        >
          {w}
        </span>
      ))}
    </span>
  );
};

// ----------------------------------------------------------------
// Prescriptions cycled on the hero device
// ----------------------------------------------------------------
const HERO_PRESCRIPTIONS = [
  {
    header: "R. Sharma · 58/M · T2DM",
    meds: ["Metformin 1g BD", "Glimepiride 2mg OD", "Telmisartan 40mg"],
    fu: "F/U 6 wks",
    chips: { icr: "Metformin 1g BD", safety: "No interactions", sync: "Rx-2841.pdf" },
  },
  {
    header: "A. Verma · 6yr/M · 22kg",
    meds: ["Amoxicillin 250 / 5ml", "TID × 5 days", "Paracetamol PRN"],
    fu: "Return if fever",
    chips: { icr: "Amoxicillin 250mg", safety: "Dose verified", sync: "Rx-2842.pdf" },
  },
  {
    header: "S. Khan · 42/F · HTN",
    meds: ["Amlodipine 5mg OD", "Atorvastatin 20mg HS", "Aspirin 75mg OD"],
    fu: "BP weekly",
    chips: { icr: "Amlodipine 5mg", safety: "Statin · ok", sync: "Rx-2843.pdf" },
  },
];

const StylusTip = () => (
  <svg
    width="26"
    height="42"
    viewBox="0 0 26 42"
    aria-hidden="true"
    style={{
      position: "absolute",
      left: -4,
      bottom: "70%",
      transform: "rotate(22deg)",
      transformOrigin: "bottom left",
      filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.22))",
      animation: "stylusWiggle 0.18s ease-in-out infinite alternate",
      pointerEvents: "none",
    }}
  >
    <rect x="8" y="0" width="10" height="26" rx="2" fill="#1a1c28" />
    <rect x="8.5" y="0" width="1.5" height="26" fill="rgba(255,255,255,0.28)" />
    <rect x="16" y="0" width="1.5" height="26" fill="rgba(255,255,255,0.08)" />
    <rect x="8" y="14" width="10" height="0.6" fill="rgba(255,255,255,0.18)" />
    <rect x="8" y="17" width="10" height="0.6" fill="rgba(255,255,255,0.18)" />
    <rect x="8" y="20" width="10" height="0.6" fill="rgba(255,255,255,0.18)" />
    <path d="M8 26 L18 26 L15 34 L11 34 Z" fill="#0a0b14" />
    <path d="M11 34 L15 34 L13 40 Z" fill="#1a1c28" />
    <circle cx="13" cy="40" r="1.4" fill="var(--accent, #f04e4e)" />
  </svg>
);

const HandwrittenLine = ({
  text,
  progress,
  active,
  style,
}: {
  text: string;
  progress: number;
  active: boolean;
  style?: CSSProperties;
}) => {
  const clip = `inset(0 ${(1 - progress) * 100}% 0 0)`;
  return (
    <div style={{ position: "relative", lineHeight: 1.2, width: "fit-content", ...style }}>
      <span style={{ visibility: "hidden", whiteSpace: "pre" }}>{text || " "}</span>
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          whiteSpace: "pre",
          clipPath: clip,
          WebkitClipPath: clip,
        }}
      >
        {text}
      </span>
      {active && progress > 0.01 && progress < 0.995 && (
        <div style={{ position: "absolute", left: `calc(${progress * 100}% - 1px)`, top: 0, height: "100%", pointerEvents: "none", zIndex: 5 }}>
          <StylusTip />
        </div>
      )}
    </div>
  );
};

const PaperWriting = ({
  rxIdx,
  lineIdx,
  lineProgress,
  phase,
  rootStyle,
}: {
  rxIdx: number;
  lineIdx: number;
  lineProgress: number;
  phase: string;
  rootStyle?: CSSProperties;
}) => {
  const rx = HERO_PRESCRIPTIONS[rxIdx];
  const fading = phase === "fading";

  const lines: { text: string; css: CSSProperties }[] = [
    {
      text: rx.header,
      css: { fontSize: "clamp(11px, 1.35vw, 17px)", fontWeight: 500, color: "#3d3d3d", marginBottom: "0.35em", letterSpacing: "0.01em" },
    },
    ...rx.meds.map((m, i) => ({
      text: m,
      css: {
        fontSize: "clamp(15px, 2.1vw, 27px)",
        fontWeight: 600,
        marginBottom: "0.12em",
        transform: `rotate(${[-0.7, 0.4, -0.3][i % 3]}deg)`,
        transformOrigin: "left center",
      } as CSSProperties,
    })),
    {
      text: rx.fu,
      css: { fontSize: "clamp(11px, 1.4vw, 18px)", fontWeight: 500, color: "#525252", fontStyle: "italic", marginTop: "0.4em", letterSpacing: "0.01em" },
    },
  ];

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "23%",
        top: "22%",
        width: "46%",
        height: "54%",
        pointerEvents: "none",
        fontFamily: "var(--font-hand)",
        color: "#1a1d24",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.45s ease",
        display: "flex",
        flexDirection: "column",
        ...rootStyle,
      }}
    >
      {lines.map((ln, i) => (
        <HandwrittenLine
          key={i}
          text={ln.text}
          progress={i < lineIdx ? 1 : i === lineIdx ? lineProgress : 0}
          active={i === lineIdx && phase === "writing"}
          style={ln.css}
        />
      ))}
    </div>
  );
};

const FloatingChip = ({
  style,
  eyebrow,
  title,
  tone = "accent",
  visible = true,
}: {
  style?: CSSProperties;
  eyebrow: string;
  title: string;
  tone?: "accent" | "green" | "muted";
  visible?: boolean;
}) => {
  const tones = {
    accent: { dot: "var(--accent)", border: "var(--accent-soft)" },
    green: { dot: "#10b981", border: "#d1fae5" },
    muted: { dot: "var(--dim)", border: "var(--border-2)" },
  };
  const t = tones[tone];
  return (
    <div
      style={{
        position: "absolute",
        background: "var(--surface)",
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        padding: "10px 14px",
        boxShadow: "0 12px 30px rgba(15,17,23,0.08)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: "var(--font-display)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.96)",
        transition: "opacity 0.45s ease, transform 0.45s cubic-bezier(.2,.7,.2,1)",
        animation: visible ? "chipFloat 4s ease-in-out infinite" : "none",
        ...style,
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: t.dot, boxShadow: `0 0 10px ${t.dot}` }} />
      <div>
        <div className="mono" style={{ fontSize: 9, color: "var(--dim)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {eyebrow}
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginTop: 1 }}>{title}</div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------
// <Hero>
// ----------------------------------------------------------------
export const Hero = () => {
  // Kept imported for the commented-out original SVG device (easy revert).
  void DeviceSVG;
  const [rxIdx, setRxIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);
  const [phase, setPhase] = useState<"writing" | "paused" | "fading">("writing");

  const lineTexts = useMemo(() => {
    const rx = HERO_PRESCRIPTIONS[rxIdx];
    return [rx.header, ...rx.meds, rx.fu];
  }, [rxIdx]);

  useEffect(() => {
    if (phase !== "writing") return;
    if (lineIdx >= lineTexts.length) return;
    const text = lineTexts[lineIdx];
    const durationMs = Math.max(700, text.length * 65);
    let raf: number;
    let start: number | undefined;
    let done = false;
    const tick = (t: number) => {
      if (done) return;
      if (!start) start = t;
      const p = Math.min(1, (t - start) / durationMs);
      setLineProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        done = true;
        setTimeout(() => {
          if (lineIdx + 1 < lineTexts.length) {
            setLineIdx((l) => l + 1);
            setLineProgress(0);
          } else {
            setPhase("paused");
          }
        }, 240);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      done = true;
      cancelAnimationFrame(raf);
    };
  }, [lineIdx, lineTexts, phase]);

  useEffect(() => {
    if (phase === "paused") {
      const t = setTimeout(() => setPhase("fading"), 1600);
      return () => clearTimeout(t);
    }
    if (phase === "fading") {
      const t = setTimeout(() => {
        setRxIdx((r) => (r + 1) % HERO_PRESCRIPTIONS.length);
        setLineIdx(0);
        setLineProgress(0);
        setPhase("writing");
      }, 550);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const currentRx = HERO_PRESCRIPTIONS[rxIdx];
  const chipKey = `${rxIdx}-${phase}`;
  const showICR = lineIdx >= 1 && phase !== "fading";
  const showSafety = lineIdx >= 2 && phase !== "fading";
  const showSync = phase === "paused";

  return (
    <section id="device" style={{ position: "relative", paddingTop: 64, paddingBottom: 80, overflow: "hidden", background: "var(--bg)" }}>
      <div style={{ position: "absolute", inset: 0, background: "var(--halo)", pointerEvents: "none" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          opacity: 0.4,
          maskImage: "radial-gradient(ellipse 70% 80% at 50% 30%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 50% 30%, black, transparent)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container hero-grid"
        style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 48, alignItems: "center" }}
      >
        {/* LEFT — copy */}
        <div>
          <Reveal>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px 6px 6px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 99,
                fontSize: 12,
                color: "var(--text-2)",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  background: "var(--accent-grad)",
                  color: "white",
                  padding: "2px 10px",
                  borderRadius: 99,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Live
              </span>
              Built for doctors. Backed by AI. Made in India.
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1
              style={{
                marginTop: 24,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 5.6vw, 78px)",
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                color: "var(--text)",
              }}
            >
              The AI-native<br />
              healthcare<br />
              platform for<br />
              <RotatingWord words={["doctors.", "clinics.", "hospitals.", "specialists.", "the OPD."]} />
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p style={{ marginTop: 28, fontSize: 18, lineHeight: 1.55, color: "var(--text-2)", maxWidth: 520 }}>
              Adicare turns your paper prescriptions into clinical-grade digital records — instantly. Then layers in an AI that
              scribes, parses, summarises, and follows up, so you stay focused on the patient.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
              <CTAButton onClick={() => openLead("demo")} variant="primary" style={{ padding: "15px 24px", fontSize: 15 }}>
                Book a demo
              </CTAButton>
              <CTAButton href="#demo" variant="ghost" style={{ padding: "15px 22px", fontSize: 15 }} icon={false}>
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style={{ marginRight: 2 }}>
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4" fill="none" />
                  <path d="M6 5l3 2-3 2z" fill="currentColor" />
                </svg>
                Try live AI demo
              </CTAButton>
            </div>
          </Reveal>

          {/* Social-proof / waitlist count — re-enable once the numbers are real.
          <Reveal delay={420}>
            <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <div style={{ display: "flex", marginRight: 4 }}>
                {["#ffd6c2", "#ffc2c2", "#ffe0c2", "#c2e0ff"].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: c,
                      border: "2px solid var(--bg)",
                      marginLeft: i === 0 ? 0 : -10,
                      display: "grid",
                      placeItems: "center",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "rgba(0,0,0,0.5)",
                    }}
                  >
                    {["DR", "AM", "PS", "KV"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>4,800+ doctors</div>
                <div style={{ fontSize: 12, color: "var(--dim)" }}>already on the Adicare waitlist</div>
              </div>
            </div>
          </Reveal>
          */}
        </div>

        {/* RIGHT — device stage */}
        <Reveal delay={300}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: "10% -8% 0 -4%",
                background: "var(--accent-grad)",
                filter: "blur(60px)",
                opacity: 0.18,
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />
            {/* ===== ORIGINAL animated SVG device — preserved for easy revert.
                 To go back: delete the "NEW" block below and uncomment this. =====
            <div
              style={{
                position: "relative",
                transform: "perspective(1500px) rotateY(-6deg) rotateX(2deg)",
                filter: "drop-shadow(0 30px 60px rgba(15,17,23,0.18))",
              }}
            >
              <DeviceSVG progress={1} strokesVisible={false} style={{ width: "100%", height: "auto" }} />
              <PaperWriting rxIdx={rxIdx} lineIdx={lineIdx} lineProgress={lineProgress} phase={phase} />
            </div>
            ===================================================================== */}

            {/* NEW — real Rx-01 device photo, gently floating, with the live
                handwritten prescription written onto its paper. */}
            <div style={{ position: "relative", filter: "drop-shadow(0 34px 60px rgba(15,17,23,0.28))", animation: "aiFloat 6s ease-in-out infinite" }}>
              <Image
                src="/device.png"
                alt="Adicare Rx-01 — the smart prescription pad"
                width={1280}
                height={720}
                priority
                sizes="(max-width: 980px) 90vw, 560px"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: 10 }}
              />
              {/* prescription paper sitting on the pad (covers the stock sketch).
                  Tweak left/top/width/height/rotate to fine-tune the fit. */}
              <div
                style={{
                  position: "absolute",
                  left: "5.6%",
                  top: "6.8%",
                  width: "61%",
                  height: "86%",
                  transform: "rotate(-1.3deg)",
                  borderRadius: 4,
                  background: "linear-gradient(180deg, #ffffff 0%, #fffdf9 100%)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.12), inset 0 0 50px rgba(0,0,0,0.03)",
                  overflow: "hidden",
                }}
              >
                <div className="mono" style={{ position: "absolute", left: "9%", top: "5%", fontSize: "clamp(7px, 1vw, 11px)", color: "#9a917f", letterSpacing: "0.12em" }}>ADICARE · Rx</div>
                <div className="italic" style={{ position: "absolute", left: "9%", top: "10%", fontSize: "clamp(16px, 2.4vw, 30px)", color: "#dfd6c2" }}>℞</div>
                <PaperWriting
                  rxIdx={rxIdx}
                  lineIdx={lineIdx}
                  lineProgress={lineProgress}
                  phase={phase}
                  rootStyle={{ left: "10%", top: "26%", width: "80%", height: "64%" }}
                />
              </div>
            </div>

            <FloatingChip key={`icr-${chipKey}`} visible={showICR} style={{ top: "12%", left: "-6%" }} eyebrow="ICR · 0.4s" title={currentRx.chips.icr} tone="accent" />
            <FloatingChip key={`safe-${chipKey}`} visible={showSafety} style={{ top: "44%", right: "-4%" }} eyebrow="Safety" title={currentRx.chips.safety} tone="green" />
            <FloatingChip key={`sync-${chipKey}`} visible={showSync} style={{ bottom: "8%", left: "0%" }} eyebrow="Synced · cloud" title={currentRx.chips.sync} tone="muted" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// <TrustBar>
// ----------------------------------------------------------------
export const TrustBar = () => {
  const logos = ["APOLLO Hospitals", "MEDANTA", "FORTIS", "MAX Healthcare", "AIIMS", "Tata 1mg", "Cloudnine", "Manipal"];
  return (
    <section
      style={{
        padding: "60px 0 60px",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div
          className="mono"
          style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.18em", color: "var(--dim)", textTransform: "uppercase", marginBottom: 32 }}
        >
          trusted by leading practitioners and institutions
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 56, flexWrap: "wrap", opacity: 0.65 }}>
          {logos.map((l) => (
            <div
              key={l}
              style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--text)", filter: "grayscale(1)" }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
