import React, { useEffect, useRef, useState } from "react";

type WelcomeOverlayProps = {
  onFinish: () => void;
};

const INTRO_DURATION = 1800; // slightly faster entrance
const COLLAPSE_DURATION = 1200; // slower, smooth exit

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
      className={`fixed inset-0 z-[999] flex items-center justify-center overflow-hidden transition-all duration-1000 ${
        collapsing ? "pointer-events-none scale-[1.13] opacity-0 blur-[4px]" : "opacity-100 scale-100"
      }`}
      style={{
        background:
          "radial-gradient(ellipse at 50% 65%, #031424 0%, #06091c 62%, #000513 99%)",
        transition:
          "opacity 0.99s cubic-bezier(.61,0,1,1), transform 1.10s cubic-bezier(.46,2,.4,.98), filter .75s cubic-bezier(.45,1.6,.7,.92)",
      }}
      aria-label="Futuristic welcome intro"
    >
      {/* Only animated SVG FX: grid + neon particles + flicker effect, NO TEXT */}
      <BurstingFX spinning={!collapsing} />
    </div>
  );
}

// FX: More dynamic, darker, more moving elements
function BurstingFX({ spinning }: { spinning: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      if (svgRef.current) {
        const now = performance.now() * 0.0022;
        for (let i = 1; i <= 3; i++) {
          const el = svgRef.current.getElementById("burst-orbit-" + i);
          if (el)
            el.setAttribute(
              "transform",
              `rotate(${now * 220 * i},600,360)`
            );
        }
        // Animate streak lines
        for (let i = 0; i < 5; i++) {
          const el = svgRef.current.getElementById("streak-" + i);
          if (el)
            el.setAttribute(
              "x1",
              String(600 + Math.sin(now * (2 + i)) * (80 + (i % 2 ? -30 : 30)))
            );
        }
      }
      if (spinning) frame = requestAnimationFrame(animate);
    };
    if (spinning) animate();
    return () => cancelAnimationFrame(frame);
  }, [spinning]);

  // Helper for extra floating dots
  const floatingDots = Array.from({ length: 17 }, (_, i) => {
    // staggered for movement effect
    const angle = (i / 17) * Math.PI * 2;
    const radius = 220 + 90 * Math.sin(i * 4.2);
    return {
      id: `float-dot-${i}`,
      cx: 600 + Math.cos(angle) * radius + Math.sin(i + 1) * 18,
      cy: 360 + Math.sin(angle) * radius + Math.cos(i - 1.3) * 14,
      r: 4.2 + 2 * Math.abs(Math.cos(i)),
      fill: "#1ffac4",
      opacity: 0.065 + 0.09 * Math.abs(Math.cos(i * 3.2)),
    };
  });

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1200 720"
      width="100vw"
      height="100vh"
      className="w-screen h-screen absolute pointer-events-none select-none"
      style={{
        zIndex: 0,
        filter: "blur(0.15px)",
      }}
    >
      {/* Darker bg grid */}
      <defs>
        <linearGradient id="neon-fx-a" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop stopColor="#0a5a60" stopOpacity="0.25" offset="0%" />
          <stop stopColor="#001527" stopOpacity="0.08" offset="100%" />
        </linearGradient>
        <radialGradient id="fx-core" cx="50%" cy="65%" r="61%">
          <stop offset="0%" stopColor="#1dfed4" stopOpacity="0.78" />
          <stop offset="90%" stopColor="#0b111f" stopOpacity="0.11" />
        </radialGradient>
        <linearGradient id="streak-l" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#27fff6" stopOpacity="0.61" />
          <stop offset="90%" stopColor="#00fffb" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Futuristic horizon grid - darker */}
      {[...Array(32)].map((_, i) => (
        <rect key={i}
          x={0}
          y={28 + i * 19.8}
          width={1200}
          height={1.2}
          fill="url(#neon-fx-a)"
          opacity={i % 2 ? 0.16 : 0.09}
        />
      ))}

      {/* Neon "core" with new pulse color */}
      <ellipse
        cx="600"
        cy="360"
        rx="158"
        ry="107"
        fill="url(#fx-core)"
        opacity="0.44"
      >
        <animate attributeName="rx" values="158;164;158" dur="1.12s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.34;0.57;0.29" dur="0.89s" repeatCount="indefinite" />
      </ellipse>
      {/* Hologram glow - large */}
      <ellipse
        cx="600"
        cy="360"
        rx="260"
        ry="188"
        fill="#10e2ff"
        opacity="0.048"
      >
        <animate attributeName="opacity" values="0.048;0.104;0.048" dur="2.11s" repeatCount="indefinite" />
      </ellipse>
      {/* Neon motion pulse orbits */}
      <g id="burst-orbit-1">
        <ellipse cx="600" cy="360" rx="228" ry="88" fill="none" stroke="#25f7f3" strokeWidth="3.4" opacity="0.20" />
      </g>
      <g id="burst-orbit-2">
        <ellipse cx="600" cy="360" rx="158" ry="157" fill="none" stroke="#0bcffe" strokeWidth="1.6" opacity="0.13" />
      </g>
      <g id="burst-orbit-3">
        <ellipse cx="600" cy="360" rx="288" ry="41" fill="none" stroke="#a8fff3" strokeWidth="1.1" opacity="0.11" />
      </g>

      {/* Neon streaks */}
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          id={`streak-${i}`}
          key={`streak-${i}`}
          x1={600 + Math.sin(i) * 80}
          y1={360 - 42 + i * 28}
          x2={600 + Math.cos(i + 2) * 400}
          y2={360 - 42 + i * 28}
          stroke="url(#streak-l)"
          strokeWidth="3"
          opacity={0.15 + 0.04 * i}
        >
          <animate attributeName="opacity" values="0.08;0.24;0.09" dur={`${1.18 + i * 0.16}s`} repeatCount="indefinite" />
        </line>
      ))}

      {/* Fast flickers & motion lines */}
      <rect x="380" y="322" width="440" height="4.7" fill="#38eef7" opacity="0.13">
        <animate attributeName="opacity" values="0.08;0.29;0.08" dur="0.33s" repeatCount="indefinite" />
      </rect>
      <rect x="510" y="265" width="170" height="3.7" fill="#1cead9" opacity="0.11">
        <animate attributeName="opacity" values="0.08;0.22;0.08" dur="0.43s" repeatCount="indefinite" />
      </rect>
      <rect x="540" y="430" width="160" height="2.2" fill="#2bf6fe" opacity="0.07">
        <animate attributeName="opacity" values="0.06;0.17;0.06" dur="0.77s" repeatCount="indefinite" />
      </rect>

      {/* Neon "burst" particles */}
      {[...Array(38)].map((_, i) => (
        <circle
          key={i}
          cx={600 + Math.sin((i / 38) * Math.PI * 2) * (103 + 110 * Math.sin(i))}
          cy={360 + Math.cos((i / 38) * Math.PI * 2) * (54 + 90 * Math.cos(i))}
          r={7 + 6 * Math.sin(i)}
          fill="#20f7ff"
          opacity={0.25 + 0.55 * Math.abs(Math.sin(i * 2.6))}
        >
          <animate
            attributeName="r"
            values={`${7 + 6 * Math.sin(i)};${7 + 9 * Math.abs(Math.cos(i / 2.6))};${7 + 6 * Math.sin(i)}`}
            dur={`${(0.7 + (i % 6) * 0.14).toFixed(2)}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Floating neon dots (extra movement) */}
      {floatingDots.map(d => (
        <circle key={d.id} cx={d.cx} cy={d.cy} r={d.r} fill={d.fill} opacity={d.opacity} />
      ))}

      {/* No text content! */}
    </svg>
  );
}
