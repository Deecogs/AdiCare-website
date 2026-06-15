"use client";

import React, {
  useState,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import Image from "next/image";

// ----------------------------------------------------------------
// useInView — IntersectionObserver hook
// ----------------------------------------------------------------
export const useInView = (opts: IntersectionObserverInit = {}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, ...opts }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);
  return [ref, seen] as const;
};

// ----------------------------------------------------------------
// <Reveal> — fade + lift in
// ----------------------------------------------------------------
export const Reveal = ({
  children,
  delay = 0,
  as: As = "div",
  className,
  style,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  as?: React.ElementType;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}) => {
  const [ref, seen] = useInView();
  return (
    <As
      ref={ref}
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.9s ${delay}ms cubic-bezier(.2,.7,.2,1), transform 0.9s ${delay}ms cubic-bezier(.2,.7,.2,1)`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </As>
  );
};

// ----------------------------------------------------------------
// useCounter — animate a number when it enters view
// ----------------------------------------------------------------
export const useCounter = (target: number, duration = 1400) => {
  const [val, setVal] = useState(0);
  const [ref, seen] = useInView({ threshold: 0.4 });
  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, target, duration]);
  return [ref, val] as const;
};

// ----------------------------------------------------------------
// <Logo> — Adicare brand wordmark (public/adicare-logo.png).
// `size` = rendered height in px. On dark surfaces the navy wordmark is
// invisible, so we render it white via a filter.
// ----------------------------------------------------------------
const LOGO_RATIO = 1688 / 932; // intrinsic aspect ratio of the source PNG

export const Logo = ({
  size = 30,
  dark = false,
  priority = false,
}: {
  size?: number;
  dark?: boolean;
  priority?: boolean;
}) => (
  <Image
    src="/adicare-logo.png"
    alt="Adicare"
    width={Math.round(size * LOGO_RATIO)}
    height={size}
    priority={priority}
    style={{
      height: size,
      width: "auto",
      display: "block",
      filter: dark ? "brightness(0) invert(1)" : "none",
    }}
  />
);

// ----------------------------------------------------------------
// <SectionEyebrow>
// ----------------------------------------------------------------
export const SectionEyebrow = ({
  children,
  align = "center",
}: {
  children: ReactNode;
  align?: "center" | "left" | "right";
}) => (
  <div className="eyebrow" style={{ display: "block", textAlign: align, marginBottom: 12 }}>
    {children}
  </div>
);

// ----------------------------------------------------------------
// <Headline> — section main headline; supports a gradient word
// ----------------------------------------------------------------
export const Headline = ({
  children,
  gradWord,
  align = "center",
  size = "xl",
  as: As = "h2",
  style,
}: {
  children: ReactNode;
  gradWord?: string;
  align?: "center" | "left" | "right";
  size?: "xxl" | "xl" | "lg";
  as?: React.ElementType;
  style?: CSSProperties;
}) => {
  const sizes: Record<string, string> = {
    xxl: "clamp(48px, 6.4vw, 88px)",
    xl: "clamp(36px, 4.4vw, 64px)",
    lg: "clamp(28px, 3vw, 44px)",
  };
  return (
    <As
      style={{
        fontFamily: "var(--font-display)",
        fontSize: sizes[size],
        fontWeight: 600,
        lineHeight: 1.02,
        letterSpacing: "-0.035em",
        textAlign: align,
        maxWidth: align === "center" ? 1000 : "none",
        margin: align === "center" ? "0 auto" : "0",
        ...style,
      }}
    >
      {children}
      {gradWord && (
        <>
          {" "}
          <span className="grad-text">{gradWord}</span>
        </>
      )}
    </As>
  );
};

// ----------------------------------------------------------------
// <CTAButton> — primary / ghost / dark
// ----------------------------------------------------------------
export const CTAButton = ({
  children,
  variant = "primary",
  href,
  onClick,
  icon = true,
  style,
  dark = false,
  ...rest
}: {
  children: ReactNode;
  variant?: "primary" | "ghost" | "dark";
  href?: string;
  onClick?: () => void;
  icon?: boolean;
  style?: CSSProperties;
  dark?: boolean;
  [key: string]: unknown;
}) => {
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "13px 22px",
    borderRadius: 99,
    fontSize: 14,
    fontWeight: 600,
    transition: "all 0.2s",
    cursor: "pointer",
    fontFamily: "var(--font-display)",
    letterSpacing: "-0.005em",
  };
  const variants: Record<string, CSSProperties> = {
    primary: {
      background: "var(--accent-grad)",
      color: "white",
      boxShadow: "0 8px 24px rgba(240,78,78,0.25)",
    },
    ghost: {
      background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
      border: dark ? "1px solid rgba(255,255,255,0.14)" : "1px solid var(--border-2)",
      color: dark ? "var(--dark-text)" : "var(--text)",
    },
    dark: { background: "var(--text)", color: "white" },
  };
  const Tag: React.ElementType = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick} style={{ ...base, ...variants[variant], ...style }} {...rest}>
      {children}
      {icon && (
        <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden="true">
          <path
            d="M2 6.5h8m0 0L7 3.5m3 3L7 9.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      )}
    </Tag>
  );
};

// ----------------------------------------------------------------
// <Card> — soft white card on light bg
// ----------------------------------------------------------------
export const Card = ({
  children,
  padding = 28,
  hover = true,
  style,
  ...rest
}: {
  children: ReactNode;
  padding?: number;
  hover?: boolean;
  style?: CSSProperties;
  [key: string]: unknown;
}) => (
  <div
    style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      padding,
      transition: "all 0.3s cubic-bezier(.2,.7,.2,1)",
      ...style,
    }}
    onMouseEnter={(e) => {
      if (!hover) return;
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.style.boxShadow = "0 18px 50px rgba(15,17,23,0.08)";
    }}
    onMouseLeave={(e) => {
      if (!hover) return;
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "";
    }}
    {...rest}
  >
    {children}
  </div>
);
