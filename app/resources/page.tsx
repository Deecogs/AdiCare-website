import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ARTICLES } from "../../components/resources";

export const metadata: Metadata = {
  title: "Resources — Adicare",
  description:
    "Reads from the Adicare team on building an AI-native prescription pad, EMR, and clinical AI for the Indian OPD — product thinking, research notes, and field notes.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources — Adicare",
    description: "Product thinking, research notes, and field notes from the Adicare team.",
    url: "/resources",
    type: "website",
  },
};

export default function ResourcesIndex() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "var(--halo)", pointerEvents: "none" }} />

      <Nav />

      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: 56, paddingBottom: 96 }}>
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Resources</div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              color: "var(--text)",
            }}
          >
            What we&apos;re learning,<br />
            <span className="grad-text">writing, and shipping.</span>
          </h1>
          <p style={{ marginTop: 20, fontSize: 18, color: "var(--text-2)", lineHeight: 1.6 }}>
            Reads from the team building Adicare — product thinking, research notes, and field notes
            from designing for the Indian OPD.
          </p>
        </div>

        <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {ARTICLES.map((p) => (
            <Link
              key={p.slug}
              href={`/resources/${p.slug}`}
              style={{ display: "block", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}
            >
              <div style={{ height: 180, background: p.color, position: "relative", display: "grid", placeItems: "center" }}>
                <div style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", fontSize: 56, color: "rgba(0,0,0,0.18)", fontWeight: 300 }}>℞</div>
              </div>
              <div style={{ padding: 24 }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>{p.tag} · {p.time}</div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.25, marginBottom: 10 }}>{p.title}</h2>
                <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.55 }}>{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
