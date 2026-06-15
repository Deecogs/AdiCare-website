"use client";

import React, { useState, useEffect } from "react";
import { Reveal, SectionEyebrow, Headline } from "./primitives";
import { parsePrescription, type ScanResult } from "./parsePrescription";

const samplePrescriptions = [
  {
    label: "Type 2 diabetes follow-up",
    text: "Pt: Mr. R. Sharma, 58/M\nDx: T2DM, HTN\nMetformin 1g BD x 30 days\nGlimepiride 2mg OD x 30 days\nTelmisartan 40mg OD x 30 days\nF/U: 6 weeks, fasting & PPBS",
  },
  {
    label: "Pediatric URTI",
    text: "Pt: A. Verma, 6 yr/M, 22 kg\nDx: Acute pharyngitis\nAmoxicillin 250mg/5ml, 5ml TID x 5d\nParacetamol 250mg PRN fever\nWarm saline gargle\nReturn if fever >48h",
  },
  {
    label: "Post-op pain management",
    text: "Pt: S. Khan, 42/F\nPost lap chole, POD-1\nTab Paracetamol 1g QID x 3d\nTab Tramadol 50mg BD x 2d PRN\nTab Pantoprazole 40mg OD x 5d\nReview OPD in 7d",
  },
];

const EmptyOutput = () => (
  <div style={{ flex: 1, display: "grid", placeItems: "center", color: "var(--dim)", textAlign: "center", padding: 40 }}>
    <div>
      <div style={{ width: 56, height: 56, borderRadius: 14, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center", margin: "0 auto 16px" }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4" />
          <path d="M7 8h8m-8 4h8m-8 4h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ fontSize: 14, color: "var(--text-2)", fontWeight: 500 }}>Structured EHR output will appear here.</div>
      <div style={{ fontSize: 12, marginTop: 6 }}>
        Hit <strong>Scan with Adicare AI</strong> to begin.
      </div>
    </div>
  </div>
);

const ScanningSkeleton = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    {[60, 90, 70, 95, 80, 50, 75, 65].map((w, i) => (
      <div
        key={i}
        style={{
          height: i % 3 === 0 ? 22 : 14,
          width: `${w}%`,
          background: "linear-gradient(90deg, #f4f4f6 0%, #e9e9ec 50%, #f4f4f6 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.4s linear infinite",
          borderRadius: 6,
        }}
      />
    ))}
  </div>
);

const AIResult = ({ result }: { result: ScanResult }) => {
  const sev = {
    low: { c: "#10b981", bg: "#d1fae5", label: "LOW" },
    moderate: { c: "#f59e0b", bg: "#fef3c7", label: "MOD" },
    high: { c: "#ef4444", bg: "#fee2e2", label: "HIGH" },
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, overflowY: "auto", maxHeight: 720 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
        <div style={{ width: 42, height: 42, borderRadius: "50%", background: "var(--accent-grad)", color: "white", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 14 }}>
          {(result.patient?.name || "?").split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{result.patient?.name || "Unknown"}</div>
          <div className="mono" style={{ fontSize: 11, color: "var(--dim)", marginTop: 2 }}>
            {result.patient?.age || "—"} · {result.patient?.sex || "—"}
          </div>
        </div>
        <div className="mono" style={{ fontSize: 9, color: "#15803d", letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", border: "1px solid #86efac", background: "#dcfce7", borderRadius: 99, fontWeight: 600 }}>
          ✓ Synced
        </div>
      </div>

      {result.diagnosis?.length > 0 && (
        <div>
          <div className="mono" style={{ fontSize: 9, color: "var(--dim)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>Diagnosis</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {result.diagnosis.map((d, i) => (
              <span key={i} style={{ padding: "5px 10px", background: "var(--bg-tint)", border: "1px solid var(--accent-soft)", color: "var(--text)", borderRadius: 6, fontSize: 12, fontWeight: 500 }}>{d}</span>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="mono" style={{ fontSize: 9, color: "var(--dim)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>
          Medications · {result.medications?.length || 0}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {(result.medications || []).map((m, i) => (
            <div key={i} style={{ padding: "10px 12px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{m.name}</div>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--dim)", marginTop: 2 }}>{m.dose} · {m.frequency} · {m.duration}</div>
              </div>
              <div className="mono" style={{ fontSize: 9, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 7px", background: "var(--accent-soft)", borderRadius: 99, fontWeight: 700 }}>{m.route || "PO"}</div>
            </div>
          ))}
        </div>
      </div>

      {(result.safety?.interactions?.length > 0 || result.safety?.warnings?.length > 0) && (
        <div>
          <div className="mono" style={{ fontSize: 9, color: "var(--dim)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>Safety check</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {(result.safety.interactions || []).map((iv, i) => {
              const s = sev[iv.severity] || sev.low;
              return (
                <div key={i} style={{ padding: "10px 12px", background: s.bg, borderLeft: `3px solid ${s.c}`, borderRadius: 8, fontSize: 12.5, color: "var(--text)", lineHeight: 1.45 }}>
                  <span className="mono" style={{ color: s.c, fontSize: 9, letterSpacing: "0.1em", marginRight: 8, fontWeight: 700 }}>{s.label}</span>
                  {iv.note} <span style={{ color: "var(--dim)" }}>({(iv.drugs || []).join(" + ")})</span>
                </div>
              );
            })}
            {(result.safety.warnings || []).map((w, i) => (
              <div key={`w-${i}`} style={{ padding: "10px 12px", background: "#fef3c7", borderLeft: "3px solid #f59e0b", borderRadius: 8, fontSize: 12.5, color: "var(--text)", lineHeight: 1.45 }}>
                <span className="mono" style={{ color: "#b45309", fontSize: 9, letterSpacing: "0.1em", marginRight: 8, fontWeight: 700 }}>NOTE</span>
                {w}
              </div>
            ))}
          </div>
        </div>
      )}

      {result.follow_up && (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div className="mono" style={{ fontSize: 9, color: "var(--dim)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>Follow-up</div>
          <div style={{ fontSize: 13.5, color: "var(--text-2)" }}>{result.follow_up}</div>
        </div>
      )}

      {result.summary && (
        <div style={{ padding: "14px 16px", background: "var(--accent-grad-soft)", border: "1px solid var(--accent-soft)", borderRadius: 12 }}>
          <div className="mono" style={{ fontSize: 9, color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6, fontWeight: 700 }}>For the patient</div>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: "var(--text)" }}>{result.summary}</div>
        </div>
      )}
    </div>
  );
};

export const AIDemo = () => {
  const [activeSample, setActiveSample] = useState(0);
  const [text, setText] = useState(samplePrescriptions[0].text);
  const [editing, setEditing] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setText(samplePrescriptions[activeSample].text);
    setResult(null);
    setError(null);
  }, [activeSample]);

  const onScan = () => {
    setScanning(true);
    setResult(null);
    setError(null);
    // Parse entirely in the browser — no network, no API dependency.
    // A short delay lets the scan animation play.
    window.setTimeout(() => {
      try {
        setResult(parsePrescription(text));
      } catch {
        setError("Couldn't parse — please retry.");
      } finally {
        setScanning(false);
      }
    }, 650);
  };

  return (
    <section id="demo" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)", background: "var(--bg)", position: "relative" }}>
      <div className="container">
        <Reveal>
          <SectionEyebrow>Live Demo · instant parsing</SectionEyebrow>
        </Reveal>
        <Reveal delay={80}>
          <Headline align="center">
            Write something. <span className="italic grad-text">Watch it</span><br />
            become clinical data.
          </Headline>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ marginTop: 20, textAlign: "center", fontSize: 17, color: "var(--text-2)", maxWidth: 540, margin: "20px auto 0", lineHeight: 1.55 }}>
            This is the same engine that ships on the device. Edit a prescription, then scan.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
            {samplePrescriptions.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setActiveSample(i)}
                style={{
                  padding: "9px 16px",
                  border: `1px solid ${activeSample === i ? "var(--accent)" : "var(--border-2)"}`,
                  borderRadius: 99,
                  fontSize: 12,
                  color: activeSample === i ? "var(--accent)" : "var(--text-2)",
                  background: activeSample === i ? "var(--accent-soft)" : "var(--surface)",
                  transition: "all 0.2s",
                  fontFamily: "var(--font-display)",
                  fontWeight: activeSample === i ? 600 : 500,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div className="demo-grid" style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, minHeight: 540 }}>
            {/* PAPER */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 20, display: "flex", flexDirection: "column", minHeight: 540 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div className="eyebrow">Paper · input</div>
                <button
                  onClick={() => setEditing((e) => !e)}
                  className="mono"
                  style={{ fontSize: 10, color: "var(--dim)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 10px", border: "1px solid var(--border-2)", borderRadius: 99, fontWeight: 600 }}
                >
                  {editing ? "preview" : "edit"}
                </button>
              </div>

              <div
                style={{
                  flex: 1,
                  background: "linear-gradient(180deg, #ffffff 0%, #fff7f3 100%)",
                  color: "#1a1d24",
                  borderRadius: 14,
                  padding: 24,
                  fontFamily: "var(--font-italic)",
                  fontStyle: "italic",
                  fontSize: 18,
                  lineHeight: 1.75,
                  position: "relative",
                  boxShadow: "inset 0 0 60px rgba(0,0,0,0.03), 0 8px 24px rgba(15,17,23,0.05)",
                  border: "1px solid #f0e8e0",
                  whiteSpace: "pre-wrap",
                  overflowY: "auto",
                }}
              >
                <div style={{ position: "absolute", top: 14, left: 18, fontFamily: "serif", fontSize: 32, opacity: 0.15, fontWeight: 300 }}>℞</div>

                {editing ? (
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    aria-label="Edit prescription text"
                    style={{ width: "100%", minHeight: 320, background: "transparent", border: "none", outline: "none", color: "#1a1d24", fontFamily: "var(--font-italic)", fontStyle: "italic", fontSize: 18, lineHeight: 1.75, resize: "none", marginTop: 32 }}
                  />
                ) : (
                  <div style={{ marginTop: 32 }}>{text}</div>
                )}

                {scanning && (
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 0%, rgba(240,78,78,0.15) 50%, transparent 100%)", animation: "scanV 1.6s linear infinite", pointerEvents: "none", borderRadius: 14 }} />
                )}
              </div>

              <button
                onClick={onScan}
                disabled={scanning}
                style={{
                  marginTop: 14,
                  padding: "14px 22px",
                  background: scanning ? "var(--border-2)" : "var(--accent-grad)",
                  color: scanning ? "var(--text-2)" : "white",
                  borderRadius: 99,
                  fontSize: 14,
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  cursor: scanning ? "wait" : "pointer",
                  transition: "all 0.2s",
                  fontFamily: "var(--font-display)",
                  boxShadow: scanning ? "none" : "0 8px 24px rgba(240,78,78,0.25)",
                }}
              >
                {scanning ? (
                  <>
                    <span style={{ width: 12, height: 12, border: "1.5px solid var(--text-2)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                    Scanning…
                  </>
                ) : (
                  <>
                    Scan with Adicare AI
                    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 7h9m0 0L8 4m3 3L8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                  </>
                )}
              </button>
            </div>

            {/* OUTPUT */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 22, minHeight: 540, display: "flex", flexDirection: "column" }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Adicare · structured output</div>
              {error && (
                <div style={{ color: "#c0392b", fontSize: 13, padding: 14, background: "#fdecea", borderRadius: 10, border: "1px solid #f8c9c4" }}>{error}</div>
              )}
              {!result && !error && !scanning && <EmptyOutput />}
              {scanning && <ScanningSkeleton />}
              {result && <AIResult result={result} />}
            </div>
          </div>
        </Reveal>

        <div className="mono" style={{ marginTop: 24, fontSize: 10, color: "var(--dim)", textAlign: "center", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          runs entirely in your browser · not for actual clinical decisions
        </div>
      </div>
    </section>
  );
};
