import { Home, FileText, Mail } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: FileText },
  { id: "works", label: "Works", icon: FileText },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "contact", label: "Contact", icon: Mail },
];

type NavBarProps = {
  burstAnim?: boolean;
};

const NavBar = ({ burstAnim = false }: NavBarProps) => {
  const [active, setActive] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const navBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setCollapsed(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onNav = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const NAV_EXPANDED_HEIGHT = 170;
  const NAV_COLLAPSED_HEIGHT = 70;

  return (
    <nav
      ref={navBarRef}
      className={cn(
        "fixed w-full z-50 transition-all duration-300 left-0 shadow",
        collapsed
          ? "top-0 bg-black/70 backdrop-blur-lg border-b border-zinc-800"
          : "top-0 h-[170px] bg-gradient-to-br from-deep-black/90 to-black/75"
      )}
      style={{
        boxShadow: collapsed ? "0 2px 20px #0004" : "none",
        minHeight: collapsed ? NAV_COLLAPSED_HEIGHT : NAV_EXPANDED_HEIGHT,
        height: collapsed ? NAV_COLLAPSED_HEIGHT : NAV_EXPANDED_HEIGHT,
      }}
    >
      {/* Branding */}
      {!collapsed && (
        <div className="max-w-7xl mx-auto flex flex-col items-start justify-center px-8 pt-2 pb-1 h-full">
          <div
            className={cn(
              "transition-transform duration-[520ms] scale-100 opacity-100 select-none"
            )}
            style={{
              transition: "all 0.52s cubic-bezier(0.29,1.44,0.53,1.02)",
            }}
          >
            <div
              className="navbar-brand-adwaith text-2xl sm:text-3xl gradient-text-strong uppercase leading-none mb-0.5 font-caveat font-bold"
              style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}
            >
              PORTFOLIO
            </div>
            <div
              className="navbar-brand-adwaith font-caveat font-bold tracking-tight text-5xl sm:text-6xl text-white mt-0 uppercase leading-none"
              style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}
            >
              ADWAITH
            </div>
          </div>
        </div>
      )}

      {collapsed && (
        <div className="flex items-center justify-between px-8 py-2 max-w-7xl mx-auto h-[70px]">
          <span
            className="navbar-brand-adwaith font-caveat font-bold tracking-tight text-3xl sm:text-4xl text-white select-none uppercase transition-transform duration-[400ms] scale-100 opacity-100"
            style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, transition: "all 0.41s cubic-bezier(0.27,1.41,0.7,1.05)" }}
          >
            ADWAITH
          </span>
        </div>
      )}

      {/* Nav menu: always */}
      <ul
        className={cn(
          "absolute flex gap-2 transition-all duration-300",
          collapsed
            ? "right-8 bottom-2 bg-black/60 rounded-xl px-4 py-1 shadow border border-zinc-700"
            : "right-8 bottom-4 bg-black/40 rounded-xl px-4 py-2 border border-zinc-700"
        )}
        style={{
          position: "absolute",
          zIndex: 30,
        }}
      >
        {sections.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <button
              className={cn(
                "nav-link group hover-scale transition relative font-semibold text-base font-caveat",
                active === id && "active"
              )}
              onClick={() => onNav(id)}
              aria-label={label}
              style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}
            >
              <Icon size={collapsed ? 22 : 24} className="inline -mt-1 mr-1 text-portfolio-gradient-from" />
              <span className={active === id ? "gradient-text" : ""}>
                {label}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {/* Animation keyframes */}
      <style>{`
        .gradient-text-strong {
          background: linear-gradient(92deg, #ff3796 12%, #ff90e8 48%, #1e3a8a 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          font-weight: 900;
          letter-spacing: 0.03em;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
