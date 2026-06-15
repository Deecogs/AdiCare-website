import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "var(--bg)",
        padding: "var(--gutter)",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 16 }}>
          Error 404
        </div>
        <h1
          className="grad-text"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 10vw, 96px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}
        >
          Page not found
        </h1>
        <p style={{ marginTop: 20, fontSize: 17, color: "var(--text-2)", lineHeight: 1.55 }}>
          The page you&apos;re looking for has moved, or never existed. Let&apos;s get you back to Adicare.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 32,
            padding: "13px 24px",
            borderRadius: 99,
            background: "var(--accent-grad)",
            color: "white",
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "var(--font-display)",
            boxShadow: "0 8px 24px rgba(240,78,78,0.25)",
          }}
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
