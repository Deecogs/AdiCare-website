import type { CSSProperties } from "react";

// A stylized hardware device: smart prescription pad + pen.
export const DeviceSVG = ({
  progress = 1,
  strokesVisible = true,
  className,
  style,
}: {
  progress?: number;
  strokesVisible?: boolean;
  className?: string;
  style?: CSSProperties;
}) => {
  const offset = Math.max(0, Math.min(1, 1 - progress));
  return (
    <svg
      viewBox="0 0 720 540"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="Adicare Rx-01 device"
      role="img"
    >
      <defs>
        <linearGradient id="devBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d1f2c" />
          <stop offset="50%" stopColor="#11121b" />
          <stop offset="100%" stopColor="#080912" />
        </linearGradient>
        <linearGradient id="devSheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="paperFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fff5f3" />
        </linearGradient>
        <linearGradient id="penFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3c4d" />
          <stop offset="50%" stopColor="#1a1c28" />
          <stop offset="100%" stopColor="#0a0b14" />
        </linearGradient>
        <radialGradient id="ledGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--accent, #f04e4e)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="var(--accent, #f04e4e)" stopOpacity="0" />
        </radialGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="paperGrain">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" />
          <feColorMatrix values="0 0 0 0 0.95   0 0 0 0 0.92   0 0 0 0 0.88   0 0 0 0.04 0" />
        </filter>
      </defs>

      <ellipse cx="360" cy="500" rx="300" ry="18" fill="rgba(0,0,0,0.2)" filter="url(#softShadow)" />

      <g transform="translate(80, 60)">
        <rect x="0" y="0" width="560" height="420" rx="22" fill="url(#devBody)" />
        <rect x="0" y="0" width="560" height="420" rx="22" fill="url(#devSheen)" />
        <rect x="0" y="0" width="560" height="1.5" rx="1" fill="rgba(255,255,255,0.18)" />
        <rect x="14" y="14" width="532" height="392" rx="14" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1.4" />
        <rect x="15" y="15" width="530" height="390" rx="13" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

        <text
          x="32"
          y="380"
          fontFamily="var(--font-mono, JetBrains Mono)"
          fontSize="9"
          fill="rgba(255,255,255,0.32)"
          letterSpacing="3"
          transform="rotate(-90, 32, 380)"
        >
          ADICARE · RX
        </text>

        <g>
          <rect x="50" y="34" width="380" height="356" rx="3" fill="rgba(0,0,0,0.5)" filter="url(#softShadow)" />
          <rect x="50" y="30" width="380" height="356" rx="3" fill="url(#paperFill)" />
          <rect x="50" y="30" width="380" height="356" rx="3" fill="white" filter="url(#paperGrain)" opacity="0.5" />

          <text x="70" y="56" fontFamily="var(--font-mono)" fontSize="8" fill="#9a917f" letterSpacing="1.8">
            ADICARE · Rx
          </text>
          <line x1="70" y1="64" x2="180" y2="64" stroke="#cdc7b8" strokeWidth="0.5" />
          <text x="340" y="56" fontFamily="var(--font-mono)" fontSize="7" fill="#9a917f">DATE</text>
          <line x1="362" y1="56" x2="420" y2="56" stroke="#cdc7b8" strokeWidth="0.5" />
          <text x="340" y="70" fontFamily="var(--font-mono)" fontSize="7" fill="#9a917f">PT.ID</text>
          <line x1="362" y1="70" x2="420" y2="70" stroke="#cdc7b8" strokeWidth="0.5" />

          <text x="70" y="130" fontFamily="serif" fontSize="40" fill="#dfd6c2" fontStyle="italic" fontWeight="300">℞</text>

          {strokesVisible && (
            <g stroke="#1a1d24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path
                d="M120 115 q4 -14 12 -12 q8 2 4 14 q-3 10 8 8 q11 -2 16 -16 q3 -8 12 -6 q7 2 4 14 q-3 10 8 10 q9 0 14 -12 q5 -8 14 -6 q7 2 4 14 q-3 10 8 10 q11 -2 18 -12 q8 -8 18 -4 q9 4 4 12 q-3 10 10 12 q12 2 22 -8"
                pathLength="1"
                style={{ strokeDasharray: 1, strokeDashoffset: offset }}
              />
              <path
                d="M120 160 q3 -10 12 -10 q9 0 9 10 q0 8 -9 8 q-9 0 -3 -10 m16 8 q4 -12 12 -8 q6 4 4 12 m10 0 q4 -12 12 -8 q6 4 4 12 m12 -2 l25 0 m12 -4 q6 -10 14 -8 q6 2 4 12 m18 -8 q-4 4 -8 12 q-4 8 6 6 q8 -2 10 -14"
                pathLength="1"
                style={{ strokeDasharray: 1, strokeDashoffset: offset }}
              />
              <path
                d="M120 210 q4 -14 12 -12 q8 2 4 14 q-3 10 8 8 m14 -6 q4 -12 12 -8 q6 4 2 12 q-3 6 6 6 m16 -6 q5 -10 14 -8 q6 2 4 12 m16 -4 q-4 6 -6 14 q-2 6 6 4 q8 -2 10 -14 m18 12 q6 -10 14 -8 q6 2 4 12 m10 0 l32 0"
                pathLength="1"
                style={{ strokeDasharray: 1, strokeDashoffset: offset }}
              />
              <path
                d="M120 256 q4 -12 12 -10 q8 2 4 14 m16 0 q4 -12 12 -8 q6 4 4 12 m10 -2 q4 -12 12 -8 q6 4 4 12"
                pathLength="1"
                style={{ strokeDasharray: 1, strokeDashoffset: offset }}
              />
              <path
                d="M260 330 q10 -20 24 -14 q14 6 -4 24 q-18 18 4 18 q22 0 36 -22 q12 -16 24 -8 q14 8 -4 22"
                pathLength="1"
                strokeWidth="2"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: Math.max(0, 1 - Math.max(0, (progress - 0.55) / 0.45)),
                }}
              />
            </g>
          )}

          <path d="M 50 340 Q 50 386 96 386 Q 124 386 142 366 L 88 342 Z" fill="#c9c0a8" />
          <path d="M 50 340 Q 50 386 96 386 Q 124 386 142 366 L 92 358 Q 72 358 60 342 Z" fill="url(#paperFill)" />
        </g>

        <g>
          <rect x="450" y="42" width="100" height="336" rx="10" fill="rgba(0,0,0,0.35)" />
          <rect x="470" y="60" width="36" height="20" rx="6" fill="#2a2d34" />
          <rect x="470" y="60" width="36" height="20" rx="6" fill="url(#devSheen)" opacity="0.5" />
          <rect x="470" y="86" width="36" height="20" rx="6" fill="#2a2d34" />

          <circle cx="528" cy="70" r="14" fill="url(#ledGlow)" />
          <circle cx="528" cy="70" r="3" fill="var(--accent, #f04e4e)" />
          <circle cx="528" cy="70" r="3" fill="white" opacity="0.4" />

          <g>
            <rect x="515" y="120" width="18" height="230" rx="9" fill="url(#penFill)" />
            <rect x="517" y="120" width="2" height="230" rx="1" fill="rgba(255,255,255,0.1)" />
            <ellipse cx="524" cy="120" rx="9" ry="2.5" fill="#3a3c4d" />
            <ellipse cx="524" cy="119" rx="9" ry="1.2" fill="rgba(255,255,255,0.15)" />
            <path d="M 533 130 L 552 124 L 552 168 L 533 168 Z" fill="#5a5d65" />
            <path d="M 533 130 L 552 124 L 552 126 L 533 132 Z" fill="#8a8d95" />
            <path d="M 515 350 L 533 350 L 528 364 L 520 364 Z" fill="#1a1c20" />
            <circle cx="524" cy="365" r="2" fill="var(--accent, #f04e4e)" opacity="0.8" />
          </g>
        </g>
      </g>
    </svg>
  );
};
