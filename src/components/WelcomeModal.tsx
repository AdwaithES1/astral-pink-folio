
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// SVG Minion component: No background, peeking up, waving with animation, big smile
function MinionWaving() {
  return (
    <svg
      width="140"
      height="164"
      viewBox="0 0 140 164"
      className="mx-auto"
      style={{
        display: "block",
        zIndex: 2,
        overflow: "visible"
      }}
    >
      <defs>
        <radialGradient id="yellowBody" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#fff933" />
          <stop offset="65%" stopColor="#ffe66a" />
          <stop offset="100%" stopColor="#e5c200" />
        </radialGradient>
        {/* Eye shine */}
        <radialGradient id="eyeShine" cx="40%" cy="35%" r="85%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="80%" stopColor="#9ea6aa"/>
          <stop offset="100%" stopColor="#747474"/>
        </radialGradient>
        {/* Denim */}
        <linearGradient id="denim" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#5ea0ee" />
          <stop offset="100%" stopColor="#2c486e" />
        </linearGradient>
        {/* Black band */}
        <linearGradient id="band" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#444" />
          <stop offset="100%" stopColor="#222" />
        </linearGradient>
      </defs>
      {/* Body (peeking up, bottom cropped off) */}
      <ellipse cx="70" cy="93" rx="41" ry="61" fill="url(#yellowBody)" stroke="#e4be04" strokeWidth="2"/>
      {/* Overalls lower part (peeking just above bottom) */}
      <ellipse cx="70" cy="128" rx="31" ry="15" fill="url(#denim)" />
      <rect x="39" y="110" width="62" height="22" rx="11" fill="url(#denim)" />
      {/* Overall straps */}
      <rect x="44" y="98" width="9" height="25" rx="3.5" fill="url(#denim)" />
      <rect x="87" y="98" width="9" height="25" rx="3.5" fill="url(#denim)" />
      {/* Minion arms (left steady, right waving) */}
      {/* Left arm */}
      <g>
        <rect
          x="18"
          y="80"
          width="32"
          height="11"
          rx="6"
          fill="#ffe46c"
          stroke="#e1a802"
          strokeWidth="2"
        />
        {/* Left hand */}
        <ellipse cx="16" cy="86" rx="7" ry="7.5" fill="#333" />
      </g>
      {/* Right arm - waving */}
      <g
        className="minion-wave"
        style={{
          transformOrigin: "122px 80px",
        }}
      >
        <rect
          x="90"
          y="75"
          width="32"
          height="11"
          rx="6"
          fill="#ffe46c"
          stroke="#e1a802"
          strokeWidth="2"
        />
        {/* Right hand */}
        <ellipse cx="124" cy="80" rx="7" ry="7.5" fill="#333" />
        {/* Fanned fingers (3 small ellipses, slightly fanned) */}
        <ellipse cx="129" cy="69" rx="3" ry="6" fill="#333" transform="rotate(-17 129 69)" />
        <ellipse cx="132.5" cy="77" rx="3" ry="6" fill="#333" transform="rotate(13 132.5 77)" />
        <ellipse cx="129" cy="88" rx="3" ry="6" fill="#333" transform="rotate(25 129 88)" />
      </g>
      {/* Band (goggle strap) */}
      <rect x="25" y="63" width="90" height="12" rx="5.5" fill="url(#band)" />
      {/* Goggle (single eye) */}
      <circle cx="70" cy="70" r="22" fill="#ececec" stroke="#aaa" strokeWidth="5"/>
      <circle cx="70" cy="70" r="13.5" fill="url(#eyeShine)" stroke="#555" strokeWidth="2"/>
      <ellipse cx="70" cy="70" rx="6" ry="6.5" fill="#382d19" />
      {/* Eye shine glint */}
      <ellipse cx="74" cy="64.5" rx="2" ry="1" fill="#fff" opacity="0.8" />
      {/* Proud eyebrow */}
      <rect x="60" y="56" width="20" height="4" rx="2" fill="#442100" transform="rotate(-7 70 56)"/>
      {/* Big smile (wide open mouth) */}
      <path
        d="M58 90 q12 16 24 0"
        stroke="#2d1402"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Teeth in smile */}
      <path
        d="M61 91 q9 7 18 0"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Animated peek-up (entire body group animates up slightly on appear) */}
      <style>{`
        .minion-wave {
          animation: minion-hi-wave 1.1s cubic-bezier(.57,1.3,.61,1.01) 0.29s 3 alternate;
        }
        svg .peek {
          animation: minion-peek-up 0.7s cubic-bezier(.57,1.3,.61,1.01) 0.1s both;
        }
        @keyframes minion-hi-wave {
          0%,100% { transform: rotate(-16deg);}
          35% { transform: rotate(26deg);}
          70% { transform: rotate(-18deg);}
        }
        @keyframes minion-peek-up {
          0% { transform: translateY(40px);}
          100% { transform: translateY(0);}
        }
      `}</style>
    </svg>
  );
}

const WelcomeModal = () => {
  const [open, setOpen] = useState(true);

  // Auto close after 3.5 seconds if not clicked
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setOpen(false), 3500);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-fit border-none shadow-none px-0 py-0 flex flex-col items-center gap-0 bg-transparent"
        style={{ background: "transparent", boxShadow: "none", border: "none" }}
      >
        <div className="relative w-full flex flex-col items-center pt-8 pb-6 min-w-[140px] min-h-[140px]">
          {/* Peeking minion, animated, absolutely no background or popup chrome */}
          <MinionWaving />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;

