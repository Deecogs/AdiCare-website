import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadCTA } from "../../../components/lead";
import { Nav } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { ArticleBody } from "../../../components/ArticleBody";
import { ARTICLES, getArticle } from "../../../components/resources";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Resource not found — Adicare" };
  return {
    title: `${article.title} — Adicare`,
    description: article.desc,
    alternates: { canonical: `/resources/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.desc,
      url: `/resources/${article.slug}`,
      type: "article",
      publishedTime: article.date,
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.desc },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const more = ARTICLES.filter((a) => a.slug !== article.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.desc,
    datePublished: article.date,
    articleSection: article.tag,
    author: { "@type": "Organization", name: "Adicare" },
    publisher: { "@type": "Organization", name: "Adicare" },
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", position: "relative", overflow: "hidden" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Nav />

      {/* gradient header */}
      <header style={{ background: article.color, borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <Link href="/resources" className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 22 }}>
              <span aria-hidden="true">←</span> All resources
            </Link>
            <div className="mono" style={{ fontSize: 10, color: "rgba(0,0,0,0.5)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>
              {article.tag} · {article.time} · {article.dateLabel}
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(30px, 4.6vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "var(--text)",
              }}
            >
              {article.title}
            </h1>
            <p style={{ marginTop: 18, fontSize: 18, color: "var(--text-2)", lineHeight: 1.55 }}>{article.desc}</p>
          </div>
        </div>
      </header>

      {/* body */}
      <article className="container" style={{ position: "relative", zIndex: 2, paddingTop: 48, paddingBottom: 24 }}>
        <ArticleBody body={article.body} />

        {/* inline CTA */}
        <div style={{ maxWidth: 680, margin: "48px auto 0" }}>
          <div
            style={{
              background: "var(--accent-grad-soft)",
              border: "1px solid var(--accent-soft)",
              borderRadius: "var(--radius-lg)",
              padding: "clamp(24px, 4vw, 40px)",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              See Adicare in your own clinic.
            </h2>
            <p style={{ marginTop: 12, fontSize: 15.5, color: "var(--text-2)", lineHeight: 1.55, maxWidth: 460, margin: "12px auto 0" }}>
              Book a 15-minute walkthrough and we&apos;ll show you how the prescription pad, records, and AI fit your practice.
            </p>
            <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
              <LeadCTA type="demo" variant="primary">Book a demo</LeadCTA>
            </div>
          </div>
        </div>
      </article>

      {/* more reads */}
      <section className="container" style={{ position: "relative", zIndex: 2, paddingTop: 32, paddingBottom: 88 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--dim)", textTransform: "uppercase", marginBottom: 20 }}>
            More reads
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {more.map((p) => (
              <Link
                key={p.slug}
                href={`/resources/${p.slug}`}
                style={{ display: "flex", alignItems: "center", gap: 16, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 16 }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 12, background: p.color, flexShrink: 0, display: "grid", placeItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", fontSize: 26, color: "rgba(0,0,0,0.22)" }}>℞</span>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 9.5, color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 5 }}>{p.tag} · {p.time}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.25 }}>{p.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
