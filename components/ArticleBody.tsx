import React from "react";
import type { Block } from "./resources";

// Renders an article body (a list of content blocks) with readable prose
// styling that matches the site's design tokens. Server component — pure.
export const ArticleBody = ({ body }: { body: Block[] }) => (
  <div style={{ maxWidth: 680, margin: "0 auto" }}>
    {body.map((b, i) => {
      switch (b.type) {
        case "h2":
          return (
            <h2
              key={i}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 3vw, 28px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "var(--text)",
                marginTop: 40,
                marginBottom: 14,
              }}
            >
              {b.text}
            </h2>
          );
        case "quote":
          return (
            <blockquote
              key={i}
              style={{
                margin: "32px 0",
                paddingLeft: 22,
                borderLeft: "3px solid var(--accent)",
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(19px, 2.6vw, 23px)",
                fontWeight: 400,
                lineHeight: 1.45,
                letterSpacing: "-0.01em",
                color: "var(--text)",
              }}
            >
              {b.text}
            </blockquote>
          );
        case "list":
          return (
            <ul key={i} style={{ listStyle: "none", margin: "20px 0", display: "flex", flexDirection: "column", gap: 12 }}>
              {b.items.map((item, j) => (
                <li key={j} style={{ display: "flex", gap: 12, fontSize: 16.5, color: "var(--text-2)", lineHeight: 1.6 }}>
                  <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true" style={{ marginTop: 5, flexShrink: 0 }}>
                    <circle cx="8" cy="8" r="7" fill="var(--accent-soft)" />
                    <path d="M5 8l2 2 4-5" stroke="var(--accent)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        default:
          return (
            <p key={i} style={{ fontSize: 17, color: "var(--text-2)", lineHeight: 1.7, marginTop: 18 }}>
              {b.text}
            </p>
          );
      }
    })}
  </div>
);
