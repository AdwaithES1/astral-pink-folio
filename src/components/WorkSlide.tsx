
import React from "react";

type Work = {
  image: string;
  name: string;
  desc: string;
};

type WorkSlideProps = {
  work: Work;
  style: React.CSSProperties;
  active: boolean;
  selected: boolean;
  onClick?: () => void;
  idx: number;
};

const WorkSlide: React.FC<WorkSlideProps> = ({
  work,
  style,
  active,
  selected,
  onClick,
  idx,
}) => (
  <div
    key={work.name}
    className={`absolute transition-all duration-500 ease-expo mx-auto pointer-events-none select-none ${
      active ? "scale-105 shadow-2xl opacity-100 pointer-events-auto" : ""
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
    aria-current={selected ? "true" : "false"}
    tabIndex={active ? 0 : -1}
    onClick={onClick}
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

export default WorkSlide;
