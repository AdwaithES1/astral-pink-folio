
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Import the photo (ensure it's present in the assets/public directory)
const ROBOT_PHOTO = "/photo-1485827404703-89b55fcc595e.jpg";

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
        className="max-w-md bg-black/90 border-none shadow-2xl px-0 py-0 flex flex-col items-center gap-0"
        style={{ background: "radial-gradient(circle at 60% 25%,#fff2 20%,#000 100%)" }}
      >
        <div className="relative w-full flex flex-col items-center pt-6 pb-3">
          <div className="relative">
            {/* Robot Image */}
            <img
              src={ROBOT_PHOTO}
              alt="Waving Robot Welcome"
              className="object-cover max-w-[270px] max-h-[300px] rounded-2xl shadow-lg"
              style={{ background: "#191824" }}
            />
            {/* Waving hand overlay, using CSS for simplicity */}
            <svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              className="absolute"
              style={{
                left: 176, // approximately hand position for this photo robot
                top: 52,
                pointerEvents: "none",
                zIndex: 20,
                transformOrigin: "80% 80%",
                animation: "robot-wave 1.3s cubic-bezier(.57,1.5,.61,1.01) 0.25s 3 alternate"
              }}
            >
              <circle cx="28" cy="28" r="12" fill="#f6dbb5" stroke="#e1b98a" strokeWidth="2"/>
              {/* Simple little finger shapes */}
              <rect x="34" y="20" width="5" height="11" rx="2" fill="#f9e9c8" transform="rotate(20 34 25)" />
              <rect x="28" y="13" width="5" height="12" rx="2" fill="#f6dbb5" transform="rotate(-15 28 19)" />
            </svg>
          </div>
          <div className="pt-4 pb-1">
            <div className="font-bebas text-3xl gradient-text drop-shadow mb-1 text-center">
              Welcome!
            </div>
            <div className="text-zinc-300 font-semibold text-lg text-center">
              The robot waves hello.<br />Enjoy exploring Adwaith's sci-fi portfolio.
            </div>
            <button
              className="mt-4 px-6 py-2 rounded-full bg-portfolio-gradient-from text-white text-lg font-bold shadow hover:scale-105 transition"
              aria-label="Enter Site"
              onClick={() => setOpen(false)}
            >
              Enter
            </button>
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

