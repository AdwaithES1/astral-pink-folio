
import React from "react";
import { Github } from "lucide-react";

type WorksCarouselFooterProps = {
  githubUrl?: string;
};

const WorksCarouselFooter: React.FC<WorksCarouselFooterProps> = ({
  githubUrl = "#",
}) => (
  <div
    className="w-full flex flex-row justify-end items-end gap-2 z-50"
    style={{
      paddingBottom: "2px", // Sits just above the border
      pointerEvents: "auto",
    }}
  >
    <div className="flex flex-row items-center gap-2 pr-2 pb-0">
      <span
        className="font-caveat text-xl sm:text-2xl text-white opacity-80 select-none"
        style={{
          fontFamily: "'Caveat', cursive",
          letterSpacing: "0.01em",
        }}
      >
        more at
      </span>
      <a
        href={githubUrl}
        aria-label="GitHub"
        target="_blank"
        rel="noopener"
        className="flex flex-row items-center text-zinc-400 hover:text-electric-pink transition"
      >
        <Github size={30} />
      </a>
    </div>
  </div>
);

export default WorksCarouselFooter;
