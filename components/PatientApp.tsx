"use client";

import React from "react";
import Image from "next/image";
import { Reveal, SectionEyebrow, Headline, CTAButton } from "./primitives";

const POINTS = [
  "Prescriptions, reports, and visit history — in their pocket",
  "One account for the whole family's health records",
  "Refill reminders and appointment nudges over WhatsApp",
  "Scan and store any old paper document, organised automatically",
];

// Phone screenshot in a simple device frame.
const Phone = ({
  src,
  alt,
  w,
  h,
  style,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      borderRadius: 28,
      overflow: "hidden",
      border: "6px solid var(--text)",
      background: "var(--text)",
      boxShadow: "0 30px 70px rgba(15,17,23,0.22)",
      ...style,
    }}
  >
    <Image src={src} alt={alt} width={w} height={h} sizes="240px" style={{ width: 240, height: "auto", display: "block" }} />
  </div>
);

export const PatientApp = () => (
  <section id="patient-app" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)", background: "var(--bg)" }}>
    <div className="container">
      <Reveal>
        <div
          className="integ-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
            background: "var(--accent-grad-soft)",
            border: "1px solid var(--accent-soft)",
            borderRadius: "var(--radius-lg)",
            padding: "clamp(28px, 4vw, 56px)",
            overflow: "hidden",
          }}
        >
          {/* Copy */}
          <div>
            <SectionEyebrow align="left">Adicare DHR · for patients</SectionEyebrow>
            <Headline align="left" size="lg">
              Your patients get their<br />
              <span className="italic grad-text">records, too.</span>
            </Headline>
            <p style={{ marginTop: 20, fontSize: 16, color: "var(--text-2)", lineHeight: 1.55, maxWidth: 460 }}>
              After every visit, the Digital Health Record app puts each patient&apos;s prescription,
              reports, and full history in one place — for the whole family.
            </p>
            <ul style={{ listStyle: "none", marginTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
              {POINTS.map((p) => (
                <li key={p} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "var(--text-2)", lineHeight: 1.5 }}>
                  <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true" style={{ marginTop: 2, flexShrink: 0 }}>
                    <circle cx="8" cy="8" r="7" fill="#fff" />
                    <path d="M5 8l2 2 4-5" stroke="var(--accent)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 28 }}>
              <CTAButton href="/early-access" variant="primary">Explore the patient app</CTAButton>
            </div>
          </div>

          {/* Phones */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 18 }}>
            <Phone src="/images/patient-app/home.png" alt="Adicare DHR — family health records" w={393} h={852} style={{ transform: "translateY(16px)" }} />
            <Phone src="/images/patient-app/records.png" alt="Adicare DHR — patient records" w={375} h={812} />
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
