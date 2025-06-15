
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Github } from "lucide-react";

type Work = {
  image: string;
  name: string;
  desc: string;
};

type WorksCarouselProps = {
  works: Work[];
};

const WorksCarousel: React.FC<WorksCarouselProps> = ({ works }) => {
  const [selected, setSelected] = React.useState(0);

  // Show three slides: prev, active, next (looping)
  const getItemProps = (idx: number) => {
    const total = works.length;
    const prevIdx = (selected - 1 + total) % total;
    const nextIdx = (selected + 1) % total;
    if (idx === selected) {
      return "z-20 scale-105 shadow-2xl opacity-100";
    }
    if (idx === prevIdx || idx === nextIdx) {
      return "z-10 scale-95 opacity-60 blur-[1.5px] -mx-2";
    }
    return "hidden sm:block z-0 scale-90 opacity-30";
  };

  // For accessibility and swipe, use the carousel's API
  const [api, setApi] = React.useState<any>(null);

  React.useEffect(() => {
    if (!api) return;
    api.on("select", () => setSelected(api.selectedScrollSnap()));
    // Sync initially
    setSelected(api.selectedScrollSnap());
  }, [api]);

  const handlePrev = () => {
    if (!api) return;
    api.scrollPrev();
  };
  const handleNext = () => {
    if (!api) return;
    api.scrollNext();
  };

  return (
    <div className="relative flex flex-col items-center w-full">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, containScroll: "trimSnaps", startIndex: 0 }}
        className="w-full max-w-3xl px-0 sm:px-4"
      >
        <CarouselContent className="flex w-full items-center justify-center">
          {works.map((work, idx) => (
            <CarouselItem
              key={work.name}
              className={`flex flex-col items-center transition-all duration-400 ease-in-out ${getItemProps(idx)}`}
              aria-current={selected === idx ? "true" : "false"}
            >
              <div
                className={
                  "bg-black/70 border border-zinc-700 rounded-2xl flex flex-col items-center shadow-xl " +
                  (selected === idx
                    ? "scale-105 ring-2 ring-pink-500/60"
                    : "scale-95 opacity-70")
                }
                style={{
                  width: 260,
                  minHeight: 230,
                  transition: "all 0.4s cubic-bezier(.4,2,.22,1)",
                  boxShadow: selected === idx
                    ? "0 6px 28px #ff379633, 0 2px 15px #000d"
                    : "0 1px 7px #2228"
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
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Nav arrows (desktop/ mobile always bottom center) */}
        <button
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-zinc-900 border border-zinc-700 text-pink-400 hover:text-pink-500 rounded-full p-2 shadow-md transition"
          style={{ boxShadow: "0 2px 15px #000a" }}
          aria-label="Previous"
          onClick={handlePrev}
        >
          <svg width={28} height={28}>
            <g>
              <path d="M17 8l-5 6 5 6" stroke="#ff3796" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
          </svg>
        </button>
        <button
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-zinc-900 border border-zinc-700 text-pink-400 hover:text-pink-500 rounded-full p-2 shadow-md transition"
          style={{ boxShadow: "0 2px 15px #000a" }}
          aria-label="Next"
          onClick={handleNext}
        >
          <svg width={28} height={28}>
            <g>
              <path d="M11 8l5 6-5 6" stroke="#ff3796" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
          </svg>
        </button>
      </Carousel>
      {/* Carousel indicators as dots below */}
      <div className="flex flex-row gap-1 mt-4 mb-0">
        {works.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full mx-0.5 transition-all ${
              idx === selected
                ? "bg-electric-pink scale-110 shadow"
                : "bg-zinc-700 scale-90 opacity-65"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default WorksCarousel;
