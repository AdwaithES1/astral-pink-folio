import React from "react";
import { Github } from "lucide-react";

type Work = {
  image: string;
  name: string;
  desc: string;
};

type WorksCarouselProps = {
  works: Work[];
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

// The following function maps an index to a transform for 3D coverflow-style effect.
const get3DTransforms = (idx: number, selected: number, total: number) => {
  const offset = idx - selected;
  // wrapping/looping: adjust for edges
  let adjOffset = offset;
  if (offset > total / 2) adjOffset = offset - total;
  if (offset < -total / 2) adjOffset = offset + total;

  // Main card is in front; sides rotate outward, shift back slightly, and are dimmed
  if (adjOffset === 0) {
    return {
      style: {
        transform:
          "perspective(1000px) rotateY(0deg) translateZ(24px) scale(1.08)",
        zIndex: 20,
        opacity: 1,
        filter: "brightness(1)",
      },
      active: true,
    };
  }
  const abs = Math.abs(adjOffset);
  if (abs === 1) {
    return {
      style: {
        transform: `perspective(1000px) rotateY(${adjOffset *  -28}deg) translateX(${adjOffset * 70}px) translateZ(-40px) scale(0.95)`,
        zIndex: 10,
        opacity: 0.48,
        filter: "brightness(0.7) blur(1.5px)",
      },
      active: false,
    };
  }
  // More distant, hidden on mobile but visible ("in background") on large screens
  return {
    style: {
      transform: `perspective(1000px) rotateY(${adjOffset * -55}deg) translateX(${adjOffset * 170}px) translateZ(-180px) scale(0.82)`,
      zIndex: 0,
      opacity: 0.16,
      filter: "brightness(0.35) blur(3.5px)",
      display: "none",
    },
    active: false,
  };
};

const WorksCarousel: React.FC<WorksCarouselProps> = ({ works }) => {
  const [selected, setSelected] = React.useState(0);
  const total = works.length;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);

  // Keyboard arrow navigation (same as before)
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setSelected(prev => (prev - 1 + total) % total);
      if (e.key === "ArrowRight") setSelected(prev => (prev + 1) % total);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [total]);

  // Only enable scroll navigation when pointer is over carousel
  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!innerRef.current) return;
      if (!innerRef.current.contains(e.target as Node)) return;
      e.preventDefault();
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const threshold = 28;
        if (e.deltaY > threshold)
          setSelected(prev => (prev + 1) % total);
        if (e.deltaY < -threshold)
          setSelected(prev => (prev - 1 + total) % total);
      } else if (Math.abs(e.deltaX) > 12) {
        if (e.deltaX > 0)
          setSelected(prev => (prev + 1) % total);
        if (e.deltaX < 0)
          setSelected(prev => (prev - 1 + total) % total);
      }
    };
    const target = innerRef.current;
    if (target) {
      target.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (target) target.removeEventListener("wheel", handleWheel);
    };
  }, [total]);

  // Touch swipe navigation for mobile (same as before)
  React.useEffect(() => {
    let startX = 0;
    let dragging = false;
    const handleTouchStart = (e: TouchEvent) => {
      dragging = true;
      startX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!dragging) return;
      const endX = e.changedTouches[0].clientX;
      const dx = endX - startX;
      const threshold = 42;
      if (dx > threshold) setSelected((prev) => (prev - 1 + total) % total);
      if (dx < -threshold) setSelected((prev) => (prev + 1) % total);
      dragging = false;
    };
    const target = innerRef.current;
    if (target) {
      target.addEventListener("touchstart", handleTouchStart);
      target.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      if (target) {
        target.removeEventListener("touchstart", handleTouchStart);
        target.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [total]);

  const handlePrev = () => setSelected((prev) => (prev - 1 + total) % total);
  const handleNext = () => setSelected((prev) => (prev + 1) % total);

  return (
    <div className="relative w-full max-w-3xl mx-auto" style={{ minHeight: 370 }}>
      {/* NAVIGATION ARROWS - Even further into the side margin (outside cards/column) */}
      <button
        className="absolute z-40 top-1/2 -translate-y-1/2 left-[-110px] md:left-[-160px] bg-black/60 hover:bg-zinc-900 border border-zinc-700 text-pink-400 hover:text-pink-500 rounded-full p-2 shadow-md transition pointer-events-auto"
        style={{
          boxShadow: "0 2px 15px #000a"
        }}
        aria-label="Previous"
        onClick={handlePrev}
        tabIndex={0}
      >
        <svg width={28} height={28}>
          <g>
            <path d="M17 8l-5 6 5 6" stroke="#ff3796" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      </button>
      <button
        className="absolute z-40 top-1/2 -translate-y-1/2 right-[-110px] md:right-[-160px] bg-black/60 hover:bg-zinc-900 border border-zinc-700 text-pink-400 hover:text-pink-500 rounded-full p-2 shadow-md transition pointer-events-auto"
        style={{
          boxShadow: "0 2px 15px #000a"
        }}
        aria-label="Next"
        onClick={handleNext}
        tabIndex={0}
      >
        <svg width={28} height={28}>
          <g>
            <path d="M11 8l5 6-5 6" stroke="#ff3796" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      </button>
      {/* Carousel Slides */}
      <div
        ref={innerRef}
        className="relative mx-0 sm:mx-12 h-[320px] flex items-center justify-center overflow-visible py-4"
        tabIndex={0}
        style={{ outline: "none" }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ perspective: 1200 }}>
          {works.map((work, idx) => {
            const { style, active } = get3DTransforms(idx, selected, total);
            return (
              <div
                key={work.name}
                className={`absolute transition-all duration-500 ease-expo mx-auto pointer-events-none select-none ${
                  active
                    ? "scale-105 shadow-2xl opacity-100 pointer-events-auto"
                    : ""
                }`}
                style={{
                  ...style,
                  top: 0,
                  left: "50%",
                  width: 260,
                  minHeight: 230,
                  marginLeft: -130,
                  display: style.display === "none" ? "none" : undefined,
                  transition: "all 0.5s cubic-bezier(.86,0,.07,1.0)",
                }}
                aria-current={selected === idx ? "true" : "false"}
                tabIndex={active ? 0 : -1}
              >
                <div
                  className={
                    "bg-black/70 border border-zinc-700 rounded-2xl flex flex-col items-center shadow-xl ring-inset ring-0 " +
                    (active
                      ? "scale-105 ring-2 ring-pink-500/60"
                      : "scale-95 opacity-70")
                  }
                  style={{
                    width: 260,
                    minHeight: 230,
                    boxShadow: active
                      ? "0 6px 28px #ff379633, 0 2px 15px #000d"
                      : "0 1px 7px #2228",
                  }}
                >
                  <div className="w-full h-32 rounded-t-xl overflow-hidden flex items-center justify-center">
                    <img
                      src={work.image}
                      alt={work.name}
                      className="w-full h-full object-cover object-center"
                      style={{ aspectRatio: "1.6/1" }}
                    />
                  </div>
                  <div className="flex flex-col px-5 py-3 text-center items-center">
                    <h3 className="font-bold text-lg text-white mb-1 font-sans min-h-[1.7em]">
                      {work.name}
                    </h3>
                    <p className="text-zinc-300 text-sm font-sans">
                      {work.desc.substring(0, 160)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Carousel indicators as dots below */}
      <div className="flex flex-row gap-1 mt-2 mb-0 justify-center z-10">
        {works.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setSelected(idx)}
            className={`h-2 w-2 rounded-full mx-0.5 transition-all cursor-pointer ${
              idx === selected
                ? "bg-electric-pink scale-125 shadow"
                : "bg-zinc-700 scale-90 opacity-65"
            }`}
          />
        ))}
      </div>
      {/* No GitHub link here anymore */}
    </div>
  );
};

// Export the bare carousel, without the footer/link
export default WorksCarousel;

// This file is reaching a large size (>320 lines).
// Consider asking to refactor this file into smaller components for maintainability!
