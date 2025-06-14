
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Path to robot photo
const ROBOT_PHOTO = "/photo-1485827404703-89b55fcc595e.jpg";

// Futuristic SVG robot fallback
function FallbackRobot() {
  return (
    <svg width="170" height="180" viewBox="0 0 170 180" fill="none" className="mx-auto">
      {/* Futuristic head: glossy sphere with neon glow */}
      <defs>
        <radialGradient id="neonHead" cx="50%" cy="40%" r="70%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#78fafa" />
          <stop offset="80%" stopColor="#0ff" />
          <stop offset="100%" stopColor="#181b29" />
        </radialGradient>
        <radialGradient id="visorGrad" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#44eefd" stopOpacity="0.9" />
        </radialGradient>
        <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Head */}
      <ellipse cx="85" cy="62" rx="42" ry="38" fill="url(#neonHead)" filter="url(#neon-glow)" />
      {/* Visor */}
      <ellipse cx="85" cy="67" rx="27" ry="17" fill="url(#visorGrad)" opacity="0.73" />
      {/* Eyes: glowing */}
      <ellipse cx="71" cy="67" rx="5" ry="7" fill="#34fff9" filter="url(#neon-glow)" />
      <ellipse cx="100" cy="67" rx="5" ry="7" fill="#34fff9" filter="url(#neon-glow)" />
      {/* Mouth: minimal bar */}
      <rect x="80" y="89" width="12" height="3" rx="1.5" fill="#29dbff" filter="url(#neon-glow)" />
      {/* Antenna Base */}
      <rect x="80" y="27" width="8" height="23" rx="4" fill="#14e2ff" filter="url(#neon-glow)" />
      {/* Antenna tip */}
      <circle cx="84" cy="24" r="7" fill="#fff" stroke="#0ff" strokeWidth="2" filter="url(#neon-glow)" />
      {/* Body: rounded capsule with neon edge */}
      <rect x="56" y="100" width="60" height="52" rx="22" fill="#181b29" stroke="#3afff2" strokeWidth="3" filter="url(#neon-glow)" />
      {/* Left Arm: simple neon rod */}
      <rect x="36" y="123" width="28" height="8" rx="3.5" fill="#0ff" filter="url(#neon-glow)" />
      {/* Right Arm: waving, with animation */}
      <g style={{ transformOrigin: "142px 126px" }} className="robot-future-wave">
        <rect x="106" y="123" width="28" height="8" rx="3.5" fill="#0ff" filter="url(#neon-glow)" />
        {/* Hand */}
        <circle cx="137" cy="127" r="8" fill="#49e7f7" stroke="#fff" strokeWidth="2" filter="url(#neon-glow)" />
      </g>
      {/* Legs */}
      <rect x="74" y="152" width="7" height="22" rx="3" fill="#0ff" filter="url(#neon-glow)" />
      <rect x="92" y="152" width="7" height="22" rx="3" fill="#0ff" filter="url(#neon-glow)" />
      {/* Neon ground shadow */}
      <ellipse cx="86" cy="178" rx="36" ry="7" fill="#49e7f7" opacity=".18"/>
      <style>{`
        .robot-future-wave {
          animation: robot-futuristic-wave 1.2s cubic-bezier(.57,1.5,.61,1.01) 0.3s 3 alternate;
        }
      `}</style>
    </svg>
  );
}

const WelcomeModal = () => {
  const [open, setOpen] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(true);

  // Auto close after 3.5 seconds if not clicked
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setOpen(false), 3500);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-fit bg-black/90 border-none shadow-2xl px-0 py-0 flex flex-col items-center gap-0"
        style={{ background: "radial-gradient(circle at 60% 25%,#fff2 20%,#000 100%)" }}
      >
        <div className="relative w-full flex flex-col items-center pt-8 pb-6 min-w-[220px]">
          <div className="relative">
            {/* Robot Image or Futuristic Fallback */}
            {imgLoaded ? (
              <>
                <img
                  src={ROBOT_PHOTO}
                  alt=""
                  className="object-cover max-w-[190px] max-h-[220px] rounded-2xl shadow-lg"
                  style={{ background: "#191824" }}
                  onError={() => setImgLoaded(false)}
                  draggable={false}
                />
                {/* Futuristic Waving hand overlay */}
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 44 44"
                  className="absolute"
                  style={{
                    left: 120,
                    top: 34,
                    pointerEvents: "none",
                    zIndex: 20,
                    transformOrigin: "80% 80%",
                    animation: "robot-futuristic-wave 1.25s cubic-bezier(.57,1.5,.61,1.01) 0.22s 3 alternate"
                  }}
                >
                  <defs>
                    <radialGradient id="handNeon" cx="50%" cy="40%" r="80%">
                      <stop offset="0%" stopColor="#fff" />
                      <stop offset="80%" stopColor="#44fff9" />
                    </radialGradient>
                  </defs>
                  <circle cx="29" cy="29" r="12" fill="url(#handNeon)" stroke="#42f4ee" strokeWidth="2" filter="url(#neon-glow)" />
                  <rect x="34" y="18" width="5" height="14" rx="2" fill="#5cfff9" transform="rotate(20 34 25)" />
                  <rect x="28" y="10" width="5" height="14" rx="2" fill="#81eefb" transform="rotate(-11 28 19)" />
                </svg>
              </>
            ) : (
              // Futuristic SVG robot as fallback
              <div className="relative min-h-[180px] flex items-center">
                <FallbackRobot />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
      <style>{`
      @keyframes robot-futuristic-wave {
        0%,100% { transform: rotate(-12deg);}
        35% { transform: rotate(22deg);}
        70% { transform: rotate(-18deg);}
      }
      `}</style>
    </Dialog>
  );
};

export default WelcomeModal;
