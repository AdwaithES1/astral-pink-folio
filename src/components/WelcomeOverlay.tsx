import React, { useEffect, useRef, useState } from "react";

type WelcomeOverlayProps = {
  onFinish: () => void;
};

const INTRO_DURATION = 2100; // ms before collapse
const COLLAPSE_DURATION = 850; // slightly longer

// Bursting "grid" background and neon "particle field" + fast hologram, NO text
export default function WelcomeOverlay({ onFinish }: WelcomeOverlayProps) {
  const [collapsing, setCollapsing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setCollapsing(true), INTRO_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Remove completely after animation
  useEffect(() => {
    if (collapsing) {
      timerRef.current = setTimeout(() => onFinish(), COLLAPSE_DURATION);
    }
    // eslint-disable-next-line
  }, [collapsing]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center overflow-hidden transition-all duration-700 ${
        collapsing ? "pointer-events-none scale-[1.12] opacity-5 blur-md" : "opacity-100 scale-100"
      }`}
      style={{
        background: "radial-gradient(ellipse at 50% 60%, #13e6f880 0%, #02091a 78%, #000c23 100%)",
        transition:
          "opacity 0.65s cubic-bezier(0.75,0,1,1), transform 0.82s cubic-bezier(0.4,2,0.4,0.98), filter .66s cubic-bezier(0.45,1.6,0.7,0.92)",
      }}
      aria-label="Futuristic welcome intro"
    >
      {/* Only animated SVG FX: grid + neon particles + flicker effect, NO TEXT */}
      <BurstingFX spinning={!collapsing} />
    </div>
  );
}

// Animated SVG FX: grid + neon particles + flicker effect
function BurstingFX({ spinning }: { spinning: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);
  // Animate "pulse orbits"
  useEffect(() => {
    let frame: number;
    const animate = () => {
      if (svgRef.current) {
        const now = performance.now() * 0.002;
        for (let i = 1; i <= 3; i++) {
          const el = svgRef.current.getElementById("burst-orbit-" + i);
          if (el)
            el.setAttribute(
              "transform",
              `rotate(${now * 220 * i},600,360)`
            );
        }
      }
      if (spinning) frame = requestAnimationFrame(animate);
    };
    if (spinning) animate();
    return () => cancelAnimationFrame(frame);
  }, [spinning]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1200 720"
      width="100vw"
      height="100vh"
      className="w-screen h-screen absolute pointer-events-none select-none"
      style={{
        zIndex: 0,
        filter: "blur(0.1px)",
      }}
    >
      {/* Futuristic grid */}
      <defs>
        <linearGradient id="neon-fx-a" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop stopColor="#05f5e5" stopOpacity="0.60" offset="0%" />
          <stop stopColor="#001027" stopOpacity="0.04" offset="100%" />
        </linearGradient>
        <radialGradient id="fx-core" cx="50%" cy="60%" r="68%">
          <stop offset="0%" stopColor="#2dfefb" stopOpacity="1" />
          <stop offset="70%" stopColor="#2dfefb" stopOpacity="0.04" />
        </radialGradient>
      </defs>

      {/* Fast lines */}
      {[...Array(32)].map((_, i) => (
        <rect key={i}
          x={0}
          y={22 + i * 21}
          width={1200}
          height={1.5}
          fill="url(#neon-fx-a)"
          opacity={i % 2 ? 0.25 : 0.16}
        />
      ))}
      {/* Neon core pulse */}
      <ellipse
        cx="600"
        cy="360"
        rx="184"
        ry="130"
        fill="url(#fx-core)"
        opacity="0.39"
      >
        <animate attributeName="rx" values="184;226;184" dur="1.18s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.24;0.44;0.24" dur="0.87s" repeatCount="indefinite" />
      </ellipse>

      {/* Moving pulse orbits */}
      <g id="burst-orbit-1">
        <ellipse cx="600" cy="360" rx="290" ry="108" fill="none" stroke="#38f7f3" strokeWidth="2.9" opacity="0.23" />
      </g>
      <g id="burst-orbit-2">
        <ellipse cx="600" cy="360" rx="214" ry="212" fill="none" stroke="#0ccffe" strokeWidth="1.8" opacity="0.12" />
      </g>
      <g id="burst-orbit-3">
        <ellipse cx="600" cy="360" rx="330" ry="54" fill="none" stroke="#a1fff3" strokeWidth="1.2" opacity="0.10" />
      </g>

      {/* Neon particles "burst" */}
      {[...Array(38)].map((_, i) => (
        <circle
          key={i}
          cx={600 + Math.sin((i / 38) * Math.PI * 2) * (130 + 120 * Math.random())}
          cy={360 + Math.cos((i / 38) * Math.PI * 2) * (90 + 110 * Math.random())}
          r={8 + 7 * Math.sin(i)}
          fill="#22fff7"
          opacity={0.36 + 0.52 * Math.abs(Math.sin(i * 3))}
        >
          <animate
            attributeName="r"
            values={`${8 + 7 * Math.sin(i)};${8 + 8 * Math.abs(Math.cos(i / 3))};${8 + 7 * Math.sin(i)}`}
            dur={`${(0.5 + (i % 5) * 0.18).toFixed(2)}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Fast flickers */}
      <rect x="380" y="332" width="440" height="4.7" fill="#b3f6ff" opacity="0.18">
        <animate attributeName="opacity" values="0.16;0.45;0.16" dur="0.22s" repeatCount="indefinite" />
      </rect>
      <rect x="510" y="270" width="170" height="3.7" fill="#37fad9" opacity="0.15">
        <animate attributeName="opacity" values="0.11;0.55;0.11" dur="0.31s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}
