import NavBar from "@/components/NavBar";
import Main3DLaptop from "@/components/3DLaptop";
import Section from "@/components/Section";
import WelcomeModal from "@/components/WelcomeModal";

const Index = () => {
  return (
    <div className="relative min-h-screen w-full bg-deep-black overflow-x-hidden">
      <WelcomeModal />
      {/* Hero Section */}
      <div
        id="home"
        className="pt-[170px] relative flex flex-col items-center gap-3"
      >
        <Main3DLaptop />
        <h1 className="text-5xl font-extrabold mb-2 mt-8 gradient-text">
          Jane Doe
        </h1>
        <h2 className="text-xl text-zinc-300 max-w-2xl mx-auto text-center mb-4 font-sans">
          Futuristic full-stack web developer with a flair for 3D visuals and modern, professional UIs.
        </h2>
      </div>

      <main className="w-full max-w-5xl mx-auto">
        <Section id="about" title="About">
          <div>
            <p>
              Hello! I'm Jane Doe, a passionate developer crafting immersive web
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
              Email: <a href="mailto:jane@example.com" className="text-electric-pink underline">jane@example.com</a>
            </p>
            <p>
              LinkedIn: <a href="#" className="text-lite-pink underline">/in/janedoe</a>
            </p>
          </div>
        </Section>
      </main>

      {/* Credits/footnote */}
      <footer className="w-full text-center mt-12 mb-5 text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} Jane Doe. Designed &amp; built with ❤️
      </footer>
    </div>
  );
};

export default Index;
