
import React, { useEffect, useRef, useState } from "react";
import TechLogosRing from "./TechLogosRing";

type WelcomeOverlayProps = {
  onFinish: () => void;
};

const INTRO_DURATION = 1880; // slightly longer to show more logos
const COLLAPSE_DURATION = 1000;

// A much darker, more dynamic intro: neon grid + technical spinning logos
export default function WelcomeOverlay({ onFinish }: WelcomeOverlayProps) {
  const [collapsing, setCollapsing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setCollapsing(true), INTRO_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (collapsing) {
      timerRef.current = setTimeout(() => onFinish(), COLLAPSE_DURATION);
    }
    // eslint-disable-next-line
  }, [collapsing]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center overflow-hidden transition-all duration-1000 ${
        collapsing ? "pointer-events-none scale-[1.09] opacity-0 blur-[4px]" : "opacity-100 scale-100"
      }`}
      style={{
        background:
          "radial-gradient(ellipse at 50% 62%, #010408 0%, #0b0b18 70%, #000109 100%)",
        transition:
          "opacity 0.99s cubic-bezier(.61,0,1,1), transform 1.08s cubic-bezier(.44,1.58,.41,.99), filter .75s cubic-bezier(.45,1.6,.7,.92)",
      }}
      aria-label="Futuristic technical welcome intro"
    >
      {/* Grid/particles background */}
      <BurstingTechFX spinning={!collapsing} />
      {/* Tech logos ring, overlayed */}
      <TechLogosRing spinning={!collapsing} />
    </div>
  );
}

// Darker, more energetic FX - no text!
function BurstingTechFX({ spinning }: { spinning: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      if (svgRef.current) {
        const now = performance.now() * 0.0024;
        for (let i = 1; i <= 3; i++) {
          const el = svgRef.current.getElementById("burst-orbit-" + i);
          if (el)
            el.setAttribute(
              "transform",
              `rotate(${now * 275 * i},600,360)`
            );
        }
        // Animate streak lines
        for (let i = 0; i < 8; i++) {
          const el = svgRef.current.getElementById("streak-" + i);
          if (el)
            el.setAttribute(
              "x1",
              String(600 + Math.sin(now * (2.9 + i)) * (110 + (i % 2 ? -36 : 27)))
            );
        }
      }
      if (spinning) frame = requestAnimationFrame(animate);
    };
    if (spinning) animate();
    return () => cancelAnimationFrame(frame);
  }, [spinning]);

  // Helper for more energetic dots
  const floatingDots = Array.from({ length: 22 }, (_, i) => {
    const angle = (i / 22) * Math.PI * 2;
    const radius = 246 + 99 * Math.sin(i * 3.7);
    return {
      id: `float-dot-${i}`,
      cx: 600 + Math.cos(angle) * radius + Math.sin(i + 2) * 26,
      cy: 360 + Math.sin(angle) * radius + Math.cos(i - 1.9) * 22,
      r: 6 + 1.35 * Math.abs(Math.cos(i)),
      fill: "#22f7ff",
      opacity: 0.09 + 0.15 * Math.abs(Math.cos(i * 2.9)),
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
        filter: "blur(0.40px) brightness(1.1)",
      }}
    >
      {/* Denser, more dynamic horizon grid */}
      {[...Array(40)].map((_, i) => (
        <rect key={i}
          x={0}
          y={22 + i * 17.5}
          width={1200}
          height={1.1}
          fill="url(#neon-fx-a)"
          opacity={i % 3 ? 0.14 : 0.09}
        />
      ))}

      {/* Neon "core" with stronger pulse color */}
      <ellipse
        cx="600"
        cy="362"
        rx="170"
        ry="122"
        fill="url(#fx-core)"
        opacity="0.52"
      >
        <animate attributeName="rx" values="170;180;170" dur="1.03s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.29;0.51;0.33" dur="0.91s" repeatCount="indefinite" />
      </ellipse>
      {/* Brighter hologram glow */}
      <ellipse
        cx="600"
        cy="362"
        rx="285"
        ry="201"
        fill="#0dc4ff"
        opacity="0.056"
      >
        <animate attributeName="opacity" values="0.04;0.11;0.04" dur="1.91s" repeatCount="indefinite" />
      </ellipse>
      {/* Faster neon orbit rings */}
      <g id="burst-orbit-1">
        <ellipse cx="600" cy="362" rx="247" ry="102" fill="none" stroke="#11d2f8" strokeWidth="3.9" opacity="0.14" />
      </g>
      <g id="burst-orbit-2">
        <ellipse cx="600" cy="362" rx="174" ry="155" fill="none" stroke="#03b8e5" strokeWidth="1.4" opacity="0.19" />
      </g>
      <g id="burst-orbit-3">
        <ellipse cx="600" cy="362" rx="310" ry="36" fill="none" stroke="#99fbfa" strokeWidth="1.2" opacity="0.11" />
      </g>

      {/* More, faster neon streaks */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          id={`streak-${i}`}
          key={`streak-${i}`}
          x1={600 + Math.sin(i) * 120}
          y1={362 - 55 + i * 13.7}
          x2={600 + Math.cos(i + 2.9) * 496}
          y2={362 - 55 + i * 13.7}
          stroke="url(#streak-l)"
          strokeWidth="2"
          opacity={0.10 + 0.09 * i}
        >
          <animate
            attributeName="opacity"
            values="0.10;0.39;0.11"
            dur={`${1.02 + i * 0.14}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}

      {/* Bright fast flickers */}
      <rect x="350" y="322" width="500" height="5.1" fill="#18e7f7" opacity="0.16">
        <animate attributeName="opacity" values="0.08;0.38;0.08" dur="0.23s" repeatCount="indefinite" />
      </rect>
      <rect x="498" y="235" width="170" height="3.6" fill="#0fead9" opacity="0.18">
        <animate attributeName="opacity" values="0.1;0.25;0.1" dur="0.36s" repeatCount="indefinite" />
      </rect>
      <rect x="565" y="413" width="115" height="2.8" fill="#1bf5fe" opacity="0.12">
        <animate attributeName="opacity" values="0.10;0.29;0.07" dur="0.45s" repeatCount="indefinite" />
      </rect>

      {/* More burst particles */}
      {[...Array(45)].map((_, i) => (
        <circle
          key={i}
          cx={600 + Math.sin((i / 45) * Math.PI * 2) * (128 + 110 * Math.sin(i))}
          cy={362 + Math.cos((i / 45) * Math.PI * 2) * (78 + 103 * Math.cos(i))}
          r={9 + 7 * Math.sin(i + 2)}
          fill="#14faff"
          opacity={0.30 + 0.61 * Math.abs(Math.sin(i * 3.1))}
        >
          <animate
            attributeName="r"
            values={`${9 + 7 * Math.sin(i + 2)};${10 + 12 * Math.abs(Math.cos(i / 3.2))};${9 + 7 * Math.sin(i + 2)}`}
            dur={`${(0.51 + (i % 8) * 0.155).toFixed(2)}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Tech-y floating dots */}
      {floatingDots.map(d => (
        <circle key={d.id} cx={d.cx} cy={d.cy} r={d.r} fill={d.fill} opacity={d.opacity} />
      ))}
      <defs>
        <linearGradient id="neon-fx-a" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop stopColor="#22badd" stopOpacity="0.23" offset="0%" />
          <stop stopColor="#003348" stopOpacity="0.09" offset="100%" />
        </linearGradient>
        <radialGradient id="fx-core" cx="50%" cy="65%" r="61%">
          <stop offset="0%" stopColor="#33fed4" stopOpacity="0.87" />
          <stop offset="90%" stopColor="#0b111f" stopOpacity="0.19" />
        </radialGradient>
        <linearGradient id="streak-l" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#23faff" stopOpacity="0.71" />
          <stop offset="90%" stopColor="#00fffb" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      {/* No text content! */}
    </svg>
  );
}
