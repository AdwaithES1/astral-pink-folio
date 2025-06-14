
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// A super futuristic, fast-paced hologram animation for welcome intro
function FuturisticHoloIntro() {
  // We'll animate the orbits/lines using JS to sync their speeds
  useEffect(() => {
    const orbit1 = document.getElementById("holo-orbit-1");
    const orbit2 = document.getElementById("holo-orbit-2");
    const orbit3 = document.getElementById("holo-orbit-3");
    let running = true;

    function animate() {
      if (!running) return;
      const t = performance.now() * 0.0025;
      // Quick orbit spins
      if (orbit1) orbit1.setAttribute("transform", `rotate(${t*210},128,128)`);
      if (orbit2) orbit2.setAttribute("transform", `rotate(${t*320},128,128)`);
      if (orbit3) orbit3.setAttribute("transform", `rotate(${t*90},128,128)`);
      requestAnimationFrame(animate);
    }
    animate();
    return () => { running = false; };
  }, []);

  return (
    <div className="flex items-center justify-center" style={{ width: 256, height: 256 }}>
      <svg
        viewBox="0 0 256 256"
        width={230}
        height={230}
        className="drop-shadow-[0_0_24px_#00fff7cc]"
        style={{overflow: "visible"}}
      >
        <defs>
          {/* Neon gradient */}
          <radialGradient id="holo-glow" cx="50%" cy="53%" r="60%">
            <stop offset="0%" stopColor="#52fff8" stopOpacity="1" />
            <stop offset="48%" stopColor="#33fff3" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#09c1c8" stopOpacity="0.01" />
          </radialGradient>
          {/* Center sphere inner gradient */}
          <radialGradient id="holo-core" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor="#75f0ff" stopOpacity="1" />
            <stop offset="50%" stopColor="#25fff0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0062c1" stopOpacity="0.02" />
          </radialGradient>
        </defs>
        {/* Big pulse/flare */}
        <circle cx="128" cy="128" r="88"
          fill="url(#holo-glow)"
          opacity="0.38"
        >
          <animate attributeName="r" values="82;104;82" dur="1.3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.30;0.50;0.30" dur="1s" repeatCount="indefinite"/>
        </circle>
        {/* Main neon core */}
        <circle cx="128" cy="128" r="45"
          fill="url(#holo-core)"
          style={{ filter: "blur(1.2px)", mixBlendMode: "lighten" }}
        />
        {/* Core wireframe sphere */}
        <ellipse
          cx="128" cy="128"
          rx="41" ry="41"
          fill="none"
          stroke="#20f0fc"
          strokeWidth="2.3"
          opacity="0.72"
        />
        {/* Futuristic scanning line */}
        <rect
          x="118.5" y="79"
          width="19" height="82"
          rx="6"
          fill="#afefef"
          opacity="0.19"
        >
          <animate attributeName="y" values="74;135;74" dur="1.27s" repeatCount="indefinite"/>
        </rect>
        {/* Electronic data "spark" highlights (animate in/out) */}
        <circle cx="128" cy="74" r="7" fill="#72fff1" opacity="0.5">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="0.58s" repeatCount="indefinite" />
        </circle>
        <circle cx="158" cy="108" r="4" fill="#5afeff" opacity="0.5">
          <animate attributeName="opacity" values="0.15;0.85;0.15" dur="0.38s" repeatCount="indefinite" />
        </circle>
        <circle cx="108" cy="152" r="3.7" fill="#c9f5fa" opacity="0.36">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="0.41s" repeatCount="indefinite" />
        </circle>
        {/* Spinning tech orbits */}
        <g id="holo-orbit-1">
          <ellipse
            cx="128" cy="128"
            rx="61" ry="31"
            fill="none"
            stroke="#00fff7"
            strokeWidth="1.8"
            strokeDasharray="10 11"
            opacity="0.36"
            style={{ filter: "drop-shadow(0 0 4px #26fff5a0)" }}
          />
        </g>
        <g id="holo-orbit-2">
          <ellipse
            cx="128" cy="128"
            rx="59" ry="70"
            fill="none"
            stroke="#6c98ff"
            strokeWidth="1.2"
            strokeDasharray="11 15"
            opacity="0.19"
            style={{ filter: "drop-shadow(0 0 6px #39e1ff80)" }}
          />
        </g>
        <g id="holo-orbit-3">
          <ellipse
            cx="128" cy="128"
            rx="38" ry="78"
            fill="none"
            stroke="#a2ffdd"
            strokeWidth="1"
            strokeDasharray="9 14"
            opacity="0.19"
            style={{ filter: "drop-shadow(0 0 8px #aaffffb8)" }}
          />
        </g>
        {/* Flickering "data beam" lines */}
        <rect x="91" y="128" width="75" height="2" fill="#b3f6ff" opacity="0.22">
          <animate attributeName="opacity" values="0.17;0.46;0.17" dur="0.23s" repeatCount="indefinite"/>
        </rect>
        <rect x="113" y="104" width="23" height="2.7" fill="#37fad9" opacity="0.12">
          <animate attributeName="opacity" values="0.12;0.65;0.12" dur="0.34s" repeatCount="indefinite"/>
        </rect>
        {/* Fast strobing outer edge */}
        <circle cx="128" cy="128" r="104"
          stroke="#61fff8" strokeWidth="1"
          fill="none" opacity="0.14">
          <animate attributeName="stroke-width" values="1;5;1" dur="0.18s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.09;0.16;0.09" dur="0.1s" repeatCount="indefinite"/>
        </circle>
      </svg>
      <style>{`
        /* Flickers for even more future */
        @keyframes holo-flicker {
          0%,100% { filter: brightness(1) blur(1px);}
          35% { filter: brightness(1.32) blur(0.84px);}
          75% { filter: brightness(2.2) blur(2px);}
        }
        .holo-flicker {
          animation: holo-flicker 0.44s infinite alternate linear;
        }
      `}</style>
    </div>
  );
}

const WelcomeModal = () => {
  const [open, setOpen] = useState(true);

  // Auto close after 3 seconds if not clicked
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setOpen(false), 3000);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-fit border-none shadow-none px-0 py-0 flex flex-col items-center gap-0 bg-transparent"
        style={{ background: "transparent", boxShadow: "none", border: "none" }}
      >
        <div className="relative w-full flex flex-col items-center pt-8 pb-6 min-w-[140px] min-h-[140px]">
          <FuturisticHoloIntro />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
