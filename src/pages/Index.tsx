import NavBar from "@/components/NavBar";
import Main3DLaptop from "@/components/3DLaptop";
import Section from "@/components/Section";
import { useEffect, useState } from "react";
import PopInOnView from "@/components/PopInOnView";
import { Instagram, Linkedin, Mail, Github } from "lucide-react";

// Placeholder image URLs
const worksImages = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80"
];

const works = [
  {
    image: worksImages[0],
    name: "Project Alpha",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales, nisi at laoreet ultricies, dolor. Morbi pretium, metus sit amet luctus."
  },
  {
    image: worksImages[1],
    name: "Beta Platform",
    desc: "Quisque ut ex ac arcu eleifend malesuada. Fusce pretium arcu ut est sodales, at facilisis mi dictum. Pellentesque ut consequat turpis, nec luctus."
  },
  {
    image: worksImages[2],
    name: "Gamma Engine",
    desc: "Aliquam erat volutpat. Etiam nec arcu ut orci euismod dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae."
  }
];

const Index = () => {
  const [animateHero, setAnimateHero] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateHero(true), 20);
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
      <main className="w-full max-w-5xl mx-auto">
        <Section id="works" title="Works">
          <PopInOnView thresholdClass="animate-soft-pop-in">
            <div className="flex flex-col w-full relative">
              {/* Sub-columns for projects */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center mt-4 mx-auto w-full">
                {works.map((work, idx) => (
                  <div
                    key={idx}
                    className="bg-black/60 rounded-xl border border-zinc-700 shadow-lg px-3 py-5 flex flex-row items-center max-w-xs w-full mx-auto min-h-[140px]"
                  >
                    <div className="w-16 h-16 bg-zinc-900 rounded-lg overflow-hidden flex items-center justify-center mr-4 shrink-0">
                      <img
                        src={work.image}
                        alt={work.name}
                        className="w-full h-full object-cover"
                        style={{ aspectRatio: "1/1" }}
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-bold text-xl text-white mb-1 font-sans">
                        {work.name}
                      </h3>
                      <p className="text-zinc-300 text-sm max-w-[180px] font-sans">
                        {work.desc.substring(0, 200)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Github link bottom right */}
              <a
                href="https://github.com/yourgithub"
                target="_blank"
                rel="noopener"
                className="absolute right-0 -bottom-8 flex flex-row items-center gap-1 text-zinc-400 hover:text-electric-pink font-medium group border border-zinc-800 bg-black/70 px-4 py-2 rounded-xl shadow-md transition-all"
                style={{ boxShadow: "0 3px 12px #0007" }}
              >
                <Github size={20} className="mr-2 group-hover:scale-110 transition" />
                My Github
              </a>
            </div>
            {/* On mobile, show Github link as a block below */}
            <div className="flex sm:hidden justify-end mt-5 w-full">
              <a
                href="https://github.com/yourgithub"
                target="_blank"
                rel="noopener"
                className="flex flex-row items-center gap-2 text-zinc-400 hover:text-electric-pink font-medium border border-zinc-800 bg-black/70 px-4 py-2 rounded-xl shadow transition-all"
                style={{ boxShadow: "0 3px 12px #0007" }}
              >
                <Github size={20} className="mr-1" />
                My Github
              </a>
            </div>
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
            <div className="flex flex-row gap-6 justify-center items-center mt-4">
              <a href="mailto:adwaith@example.com" aria-label="Gmail" target="_blank" rel="noopener">
                <Mail size={36} className="text-electric-pink hover:scale-110 transition" />
              </a>
              <a href="https://instagram.com/exampleprofile" aria-label="Instagram" target="_blank" rel="noopener">
                <Instagram size={36} className="text-lite-pink hover:scale-110 transition" />
              </a>
              <a href="https://linkedin.com/in/adwaith" aria-label="LinkedIn" target="_blank" rel="noopener">
                <Linkedin size={36} className="text-navy-blue hover:scale-110 transition" />
              </a>
            </div>
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
