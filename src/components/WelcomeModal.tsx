
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Path to robot photo
const ROBOT_PHOTO = "/photo-1485827404703-89b55fcc595e.jpg";

// Cute fallback SVG robot component
function FallbackRobot() {
  return (
    <svg width="160" height="180" viewBox="0 0 160 180" fill="none" className="mx-auto">
      {/* Body */}
      <rect x="45" y="80" width="70" height="60" rx="14" fill="#D1D5DB" stroke="#444" strokeWidth="3"/>
      {/* Head */}
      <rect x="50" y="40" width="60" height="40" rx="16" fill="#FFF" stroke="#444" strokeWidth="3"/>
      {/* Eyes */}
      <ellipse cx="65" cy="62" rx="5" ry="7" fill="#222"/>
      <ellipse cx="95" cy="62" rx="5" ry="7" fill="#222"/>
      {/* Smile */}
      <path d="M70 76 Q80 86 90 76" stroke="#444" strokeWidth="3" fill="none"/>
      {/* Antenna */}
      <rect x="77" y="24" width="6" height="18" rx="3" fill="#44C7FF"/>
      <circle cx="80" cy="22" r="5" fill="#44C7FF" stroke="#222" strokeWidth="2"/>
      {/* Left Arm */}
      <rect x="26" y="95" width="28" height="7" rx="3.5" fill="#D1D5DB" stroke="#444" strokeWidth="2"/>
      {/* Right Arm (waving) */}
      <g style={{ transformOrigin: "128px 98px" }} className="robot-wave-fallback">
        <rect x="106" y="95" width="28" height="7" rx="3.5" fill="#D1D5DB" stroke="#444" strokeWidth="2"/>
        {/* Hand */}
        <circle cx="137" cy="98" r="8" fill="#F9E9C8" stroke="#E3C594" strokeWidth="2"/>
        {/* Fingers */}
        <rect x="128" y="91" width="5" height="11" rx="2" fill="#F9E9C8" transform="rotate(20 128 96)" />
        <rect x="133.5" y="86" width="5" height="11" rx="2" fill="#F6DBB5" transform="rotate(-12 133.5 91.5)" />
      </g>
      {/* Legs */}
      <rect x="61" y="140" width="8" height="28" rx="4" fill="#9CA3AF" stroke="#444" strokeWidth="2"/>
      <rect x="91" y="140" width="8" height="28" rx="4" fill="#9CA3AF" stroke="#444" strokeWidth="2"/>
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
            {/* Robot Image or Fallback */}
            {imgLoaded ? (
              <>
                <img
                  src={ROBOT_PHOTO}
                  alt="Waving Robot"
                  className="object-cover max-w-[190px] max-h-[220px] rounded-2xl shadow-lg"
                  style={{ background: "#191824" }}
                  onError={() => setImgLoaded(false)}
                  draggable={false}
                />
                {/* Waving hand overlay */}
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 42 42"
                  className="absolute"
                  style={{
                    left: 116,
                    top: 32,
                    pointerEvents: "none",
                    zIndex: 20,
                    transformOrigin: "80% 80%",
                    animation: "robot-wave 1.3s cubic-bezier(.57,1.5,.61,1.01) 0.25s 3 alternate"
                  }}
                >
                  <circle cx="28" cy="28" r="12" fill="#f6dbb5" stroke="#e1b98a" strokeWidth="2"/>
                  <rect x="34" y="20" width="5" height="11" rx="2" fill="#f9e9c8" transform="rotate(20 34 25)" />
                  <rect x="28" y="13" width="5" height="12" rx="2" fill="#f6dbb5" transform="rotate(-15 28 19)" />
                </svg>
              </>
            ) : (
              // Fallback waving robot SVG
              <div className="relative min-h-[180px] flex items-center">
                <FallbackRobot />
                {/* Waving animation for the fallback's right arm */}
                <style>{`
                  .robot-wave-fallback {
                    animation: robot-wave 1.3s cubic-bezier(.57,1.5,.61,1.01) 0.25s 3 alternate;
                  }
                `}</style>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
      <style>{`
      @keyframes robot-wave {
        0%,100% { transform: rotate(-15deg); }
        40% { transform: rotate(18deg);}
        75% { transform: rotate(-20deg);}
      }
      `}</style>
    </Dialog>
  );
};

export default WelcomeModal;

