
import React from "react";

// SVG icon paths for various technologies
// Replace the paths with your brand or upload real SVGs if you want
const logos = [
  {
    label: "AWS",
    svg: (
      <svg width="38" height="38" viewBox="0 0 38 38">
        <circle cx="19" cy="19" r="18" fill="#252F3E" />
        <text x="19" y="25" fontSize="14" textAnchor="middle" fill="#FF9900">AWS</text>
      </svg>
    ),
  },
  {
    label: "Python",
    svg: (
      <svg width="38" height="38" viewBox="0 0 38 38">
        <circle cx="19" cy="19" r="18" fill="#366A96" />
        <text x="19" y="25" fontSize="14" textAnchor="middle" fill="#FFD43B">Py</text>
      </svg>
    ),
  },
  {
    label: "C++",
    svg: (
      <svg width="38" height="38" viewBox="0 0 38 38">
        <circle cx="19" cy="19" r="18" fill="#00599C" />
        <text x="19" y="25" fontSize="14" textAnchor="middle" fill="#fff">C++</text>
      </svg>
    ),
  },
  {
    label: "Google API",
    svg: (
      <svg width="38" height="38" viewBox="0 0 38 38">
        <circle cx="19" cy="19" r="18" fill="#4285F4" />
        <text x="19" y="26" fontSize="10" textAnchor="middle" fill="#fff">Google</text>
      </svg>
    ),
  },
  {
    label: "Lovable",
    svg: (
      <svg width="38" height="38" viewBox="0 0 38 38">
        <circle cx="19" cy="19" r="18" fill="#EA4C89" />
        <text x="19" y="25" fontSize="11" textAnchor="middle" fill="#fff">Lovable</text>
      </svg>
    ),
  },
  {
    label: "React",
    svg: (
      <svg width="38" height="38" viewBox="0 0 38 38">
        <circle cx="19" cy="19" r="18" fill="#222" />
        <ellipse cx="19" cy="19" rx="12" ry="6.5" fill="none" stroke="#61dafb" strokeWidth="2"/>
        <ellipse cx="19" cy="19" rx="6.5" ry="12" fill="none" stroke="#61dafb" strokeWidth="2" transform="rotate(60 19 19)"/>
        <ellipse cx="19" cy="19" rx="6.5" ry="12" fill="none" stroke="#61dafb" strokeWidth="2" transform="rotate(120 19 19)"/>
        <circle cx="19" cy="19" r="2.7" fill="#61dafb"/>
      </svg>
    ),
  },
  {
    label: "Node.js",
    svg: (
      <svg width="38" height="38" viewBox="0 0 38 38">
        <circle cx="19" cy="19" r="18" fill="#026e00" />
        <text x="19" y="24" fontSize="13" textAnchor="middle" fill="#fff">Node</text>
      </svg>
    ),
  },
  {
    label: "C",
    svg: (
      <svg width="38" height="38" viewBox="0 0 38 38">
        <circle cx="19" cy="19" r="18" fill="#03599C" />
        <text x="19" y="25" fontSize="14" textAnchor="middle" fill="#fff">C</text>
      </svg>
    ),
  },
];

interface TechLogosRingProps {
  spinning?: boolean;
}

const RADIUS = 170;

const TechLogosRing: React.FC<TechLogosRingProps> = ({ spinning = true }) => {
  // We'll animate the whole ring's rotation with CSS
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        zIndex: 2,
        pointerEvents: "none",
        filter: "drop-shadow(0 0 40px #0af0ff33)",
      }}
    >
      <div
        className="relative w-[400px] h-[400px] logo-ring-animation"
        style={{
          maxWidth: "80vw",
          maxHeight: "80vh",
        }}
      >
        {/* Position the logos around a virtual circle */}
        {logos.map((logo, i) => {
          const angle = (i / logos.length) * 2 * Math.PI;
          const x = 200 + Math.cos(angle) * RADIUS - 19;
          const y = 200 + Math.sin(angle) * RADIUS - 19;
          return (
            <div
              key={logo.label}
              style={{
                position: "absolute",
                left: x,
                top: y,
                transition: "transform 0.4s",
                transform: spinning ? "scale(1.17)" : "scale(1.0)",
                opacity: 0.93,
                filter: "brightness(1.03)",
              }}
            >
              {logo.svg}
            </div>
          );
        })}
      </div>
      <style>{`
        .logo-ring-animation {
          animation: spin-ring 2s linear infinite;
        }
        @keyframes spin-ring {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
};

export default TechLogosRing;
