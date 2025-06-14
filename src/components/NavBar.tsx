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
      {/* Branding: never hidden until collapsed */}
      {!collapsed && (
        <div className="max-w-7xl mx-auto flex flex-col items-start justify-center px-8 pt-2 pb-1 h-full">
          <div
            className={cn(
              "font-bebas text-4xl sm:text-5xl tracking-wider text-white leading-none select-none uppercase",
              "transition-transform duration-[520ms]",
              // DO NOT apply burstAnim since we now want to keep the branding smoothly present
              "scale-100 opacity-100"
            )}
            style={{
              letterSpacing: "0.14em",
              lineHeight: "1.08",
              transition: "all 0.52s cubic-bezier(0.29,1.44,0.53,1.02)",
            }}
          >
            Portfolio
          </div>
        </div>
      )}

      {/* Collapsed: Portfolio stays in navbar */}
      {collapsed && (
        <div className="flex items-center justify-between px-8 py-2 max-w-7xl mx-auto h-[70px]">
          <span
            className={cn(
              "text-2xl font-bebas gradient-text tracking-[0.09em] select-none uppercase transition-transform duration-[400ms] ",
              "scale-100 opacity-100"
            )}
            style={{ transition: "all 0.41s cubic-bezier(0.27,1.41,0.7,1.05)" }}
          >
            Portfolio
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
                "nav-link group hover-scale transition relative font-semibold text-base",
                active === id && "active"
              )}
              onClick={() => onNav(id)}
              aria-label={label}
              style={{ fontFamily: "Inter,sans-serif" }}
            >
              <Icon size={collapsed ? 22 : 24} className="inline -mt-1 mr-1 text-portfolio-gradient-from" />
              <span className={active === id ? "gradient-text" : ""}>
                {label}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {/* Animation keyframes (all in one place!) */}
      <style>{`
        @keyframes burst {
          0% { opacity:1; transform: scale(3.2) translateY(-40px);}
          88% { opacity:1; }
          100% { opacity:0; transform: scale(7.4) translateY(-140px);}
        }
        .animate-burst { animation: burst 530ms cubic-bezier(.21,1.59,.42,1.01) 1; }
        .animate-burst-fast { animation: burst 430ms cubic-bezier(.21,1.6,.4,1.02) 1; }
      `}</style>
    </nav>
  );
};

export default NavBar;
