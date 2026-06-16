"use client";

import React, { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { CTAButton } from "./primitives";

// All demo / pre-order leads are routed here.
export const LEAD_EMAIL = "business@deecogs.com";
// Create a free key at https://web3forms.com using business@deecogs.com, then
// set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY. Without it, the form falls back to mailto.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type LeadType = "demo" | "preorder";

const COPY: Record<LeadType, { title: string; subtitle: string; cta: string; subject: string }> = {
  demo: {
    title: "Book a demo",
    subtitle: "Tell us about your practice and we'll set up a 15-minute walkthrough.",
    cta: "Request demo",
    subject: "New Adicare demo request",
  },
  preorder: {
    title: "Pre-order Adicare Rx-01",
    subtitle: "Reserve your smart prescription pad. We'll reach out with next steps.",
    cta: "Reserve my unit",
    subject: "New Adicare Rx-01 pre-order",
  },
};

// Open the lead modal from anywhere (client components).
export const openLead = (type: LeadType = "demo") => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("adicare:lead", { detail: { type } }));
};

// A primary CTA button (client island) that opens the lead modal.
export const LeadCTA = ({
  type = "demo",
  children,
  variant = "primary",
  dark = false,
  style,
}: {
  type?: LeadType;
  children: ReactNode;
  variant?: "primary" | "ghost" | "dark";
  dark?: boolean;
  style?: CSSProperties;
}) => (
  <CTAButton variant={variant} dark={dark} style={style} onClick={() => openLead(type)}>
    {children}
  </CTAButton>
);

const fieldStyle: CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 12,
  border: "1px solid var(--border-2)",
  background: "var(--bg)",
  fontSize: 14,
  fontFamily: "var(--font-body)",
  color: "var(--text)",
  outline: "none",
};

export const LeadModal = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<LeadType>("demo");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail as { type?: LeadType } | undefined;
      setType(detail?.type === "preorder" ? "preorder" : "demo");
      setStatus("idle");
      setErrorMsg("");
      setOpen(true);
    };
    window.addEventListener("adicare:lead", onOpen);
    return () => window.removeEventListener("adicare:lead", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const copy = COPY[type];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if ((fd.get("botcheck") as string)?.length) return; // honeypot

    const data = {
      name: (fd.get("name") as string) || "",
      email: (fd.get("email") as string) || "",
      phone: (fd.get("phone") as string) || "",
      clinic: (fd.get("clinic") as string) || "",
      role: (fd.get("role") as string) || "",
      message: (fd.get("message") as string) || "",
    };

    // No key configured → fall back to the visitor's email client.
    if (!WEB3FORMS_KEY) {
      const body = encodeURIComponent(
        `Request type: ${type}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nClinic/Hospital: ${data.clinic}\nRole/Specialty: ${data.role}\n\n${data.message}`
      );
      window.location.href = `mailto:${LEAD_EMAIL}?subject=${encodeURIComponent(copy.subject)}&body=${body}`;
      setStatus("done");
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: copy.subject,
          from_name: "Adicare website",
          request_type: type,
          ...data,
          botcheck: "",
        }),
      });
      const json = await res.json();
      if (json?.success) {
        setStatus("done");
        form.reset();
      } else {
        throw new Error(json?.message || "Submission failed");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (!open) return null;

  return (
    <div
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(10,11,20,0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "grid",
        placeItems: "center",
        padding: 20,
        overflowY: "auto",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-title"
        style={{
          width: "100%",
          maxWidth: 460,
          background: "var(--surface)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
          boxShadow: "0 40px 100px rgba(15,17,23,0.30)",
          padding: 28,
          position: "relative",
          animation: "leadIn 0.3s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%", background: "var(--bg-tint)", display: "grid", placeItems: "center", color: "var(--text-2)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>

        {status === "done" ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--accent-grad)", display: "grid", placeItems: "center", margin: "0 auto 16px" }}>
              <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><path d="M6 13l5 5 9-11" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Thank you!</h3>
            <p style={{ marginTop: 10, fontSize: 14.5, color: "var(--text-2)", lineHeight: 1.55 }}>
              We&apos;ve received your details and will reach out shortly at the email you provided.
            </p>
            <div style={{ marginTop: 22 }}>
              <CTAButton variant="ghost" icon={false} onClick={() => setOpen(false)}>Close</CTAButton>
            </div>
          </div>
        ) : (
          <>
            <div className="eyebrow" style={{ marginBottom: 10 }}>{type === "preorder" ? "Pre-order" : "Request a demo"}</div>
            <h3 id="lead-title" style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1 }}>{copy.title}</h3>
            <p style={{ marginTop: 8, fontSize: 14, color: "var(--text-2)", lineHeight: 1.5 }}>{copy.subtitle}</p>

            <form onSubmit={onSubmit} style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
              <input ref={firstFieldRef} name="name" required placeholder="Full name *" style={fieldStyle} />
              <input name="email" type="email" required placeholder="Email *" style={fieldStyle} />
              <input name="phone" type="tel" required placeholder="Phone / WhatsApp *" style={fieldStyle} />
              <input name="clinic" placeholder="Clinic / Hospital" style={fieldStyle} />
              <input name="role" placeholder="Role / Specialty (e.g. Endocrinologist)" style={fieldStyle} />
              <textarea name="message" rows={3} placeholder="Anything we should know? (optional)" style={{ ...fieldStyle, resize: "vertical" }} />
              {/* honeypot */}
              <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />

              {status === "error" && (
                <div style={{ fontSize: 13, color: "#c0392b", background: "#fdecea", border: "1px solid #f8c9c4", borderRadius: 10, padding: "10px 12px" }}>
                  Couldn&apos;t send — {errorMsg}. Please email us at {LEAD_EMAIL}.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  marginTop: 4,
                  padding: "14px 22px",
                  borderRadius: 99,
                  background: status === "sending" ? "var(--border-2)" : "var(--accent-grad)",
                  color: status === "sending" ? "var(--text-2)" : "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: "var(--font-display)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  cursor: status === "sending" ? "wait" : "pointer",
                  boxShadow: status === "sending" ? "none" : "0 8px 24px rgba(240,78,78,0.25)",
                }}
              >
                {status === "sending" ? (
                  <>
                    <span style={{ width: 14, height: 14, border: "1.6px solid var(--text-2)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                    Sending…
                  </>
                ) : (
                  copy.cta
                )}
              </button>
              <p className="mono" style={{ fontSize: 10, color: "var(--dim)", textAlign: "center", letterSpacing: "0.04em" }}>
                We&apos;ll only use your details to contact you about Adicare.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
