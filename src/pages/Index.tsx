import NavBar from "@/components/NavBar";
import Main3DLaptop from "@/components/3DLaptop";
import Section from "@/components/Section";
import WelcomeModal from "@/components/WelcomeModal";
import WelcomeOverlay from "@/components/WelcomeOverlay";
import { useRef, useState } from "react";

const Index = () => {
  const [introShown, setIntroShown] = useState(false);
  // To force content 'burst' out once intro completes
  const [burstAnim, setBurstAnim] = useState(false);

  const handleIntroFinish = () => {
    setIntroShown(true);
    setBurstAnim(true);
    setTimeout(() => setBurstAnim(false), 650); // Remove the burst fx after animation
  };

  return (
    <div className="relative min-h-screen w-full bg-deep-black overflow-x-hidden">
      {!introShown && <WelcomeOverlay onFinish={handleIntroFinish} />}
      {/* Navbar always shown, receives 'burst' prop */}
      <NavBar burstAnim={burstAnim} />
      {/* Hero Section */}
      <div
        id="home"
        className={`pt-[170px] relative flex flex-col items-center gap-3 z-[1] ${
          burstAnim ? "pointer-events-none" : ""
        }`}
      >
        <Main3DLaptop />
        <h1
          className={`text-5xl font-extrabold mb-2 mt-8 gradient-text transition-all duration-[570ms] ease-[cubic-bezier(0.25,1.7,0.49,1.0)] 
          ${burstAnim ? "origin-center scale-[3.4] -translate-y-24 opacity-0 animate-burst shrink-0" : "scale-100 opacity-100"}
          `}
          style={{
            transition: "all 0.57s cubic-bezier(0.25,1.7,0.49,1.0)",
            zIndex: 3,
          }}
        >
          Adwaith
        </h1>
        <h2
          className={`text-xl text-zinc-300 max-w-2xl mx-auto text-center mb-4 font-sans
            transition-all duration-[430ms] ease-[cubic-bezier(0.29,1.46,0.6,0.97)] ${burstAnim ? "origin-center scale-150 translate-y-12 opacity-0" : ""}
          `}
        >
          An AI/ML geek who enjoys teaching machines to do my chores—one real-world solution at a time!
        </h2>
      </div>

      <main className="w-full max-w-5xl mx-auto">
        <Section id="about" title="About">
          <div>
            <p>
              Hello! I'm Adwaith, a passionate developer crafting immersive web
              experiences with React, Three.js, and modern UI/UX. 
            </p>
            <p>
              I blend bold, futuristic visuals with professional-grade technical skill.
            </p>
          </div>
        </Section>
        <Section id="works" title="Works">
          <div>
            <p>Some featured projects coming soon!</p>
          </div>
        </Section>
        <Section id="resume" title="Resume">
          <div>
            <a
              href="#"
              className="underline transition hover:text-electric-pink"
              target="_blank" rel="noopener"
            >
              Download my resume
            </a>
          </div>
        </Section>
        <Section id="contact" title="Contact">
          <div>
            <p>
              Email: <a href="mailto:adwaith@example.com" className="text-electric-pink underline">adwaith@example.com</a>
            </p>
            <p>
              LinkedIn: <a href="#" className="text-lite-pink underline">/in/adwaith</a>
            </p>
          </div>
        </Section>
      </main>

      {/* Credits/footnote */}
      <footer className="w-full text-center mt-12 mb-5 text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} Adwaith. Designed &amp; built with ❤️
      </footer>
    </div>
  );
};

export default Index;
