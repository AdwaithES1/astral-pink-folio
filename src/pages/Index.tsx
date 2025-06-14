import NavBar from "@/components/NavBar";
import Main3DLaptop from "@/components/3DLaptop";
import Section from "@/components/Section";
import { useEffect, useState } from "react";
import PopInOnView from "@/components/PopInOnView";

const Index = () => {
  // Used to trigger pop-in animations on mount
  const [animateHero, setAnimateHero] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateHero(true), 20); // trigger after mount
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-deep-black overflow-x-hidden">
      {/* Navbar always shown */}
      <NavBar burstAnim={false} />

      {/* Hero Section */}
      <div
        id="home"
        className={`pt-[170px] relative flex flex-col items-center gap-3 z-[1]`}
      >
        <Main3DLaptop />
        {/* New heading: Bebas Neue, white-pink gradient, with inside shine */}
        <PopInOnView
          as="h1"
          className="bebas-gradient-heading text-5xl sm:text-7xl font-bold mb-2 mt-8"
        >
          Curious about me?
        </PopInOnView>
        <PopInOnView
          as="h2"
          className="text-xl text-zinc-300 max-w-2xl mx-auto text-center mb-4 font-sans"
        >
          Am an AI/ML geek who enjoys teaching machines to do my chores—one real-world solution at a time!
        </PopInOnView>
      </div>
      <main className={`w-full max-w-5xl mx-auto`}>
        {/* About section removed */}
        <Section id="works" title="Works">
          <PopInOnView thresholdClass="animate-soft-pop-in">
            <p>Some featured projects coming soon!</p>
          </PopInOnView>
        </Section>
        <Section id="resume" title="Resume">
          <PopInOnView thresholdClass="animate-soft-pop-in">
            <a
              href="#"
              className="underline transition hover:text-electric-pink"
              target="_blank" rel="noopener"
            >
              Download my resume
            </a>
          </PopInOnView>
        </Section>
        <Section id="contact" title="Contact">
          <PopInOnView thresholdClass="animate-soft-pop-in">
            <p>
              Email: <a href="mailto:adwaith@example.com" className="text-electric-pink underline">adwaith@example.com</a>
            </p>
            <p>
              LinkedIn: <a href="#" className="text-lite-pink underline">/in/adwaith</a>
            </p>
          </PopInOnView>
        </Section>
      </main>
      <footer className="w-full text-center mt-12 mb-5 text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} Adwaith. Designed &amp; built with ❤️
      </footer>
    </div>
  );
};

export default Index;
