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

const NavBar = () => {
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

  // Nav height (expanded/collapsed) for positioning icon row
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
      {/* Expanded section: Branding */}
      {!collapsed && (
        <div className="max-w-7xl mx-auto flex flex-col items-start justify-center px-8 pt-6 pb-4 h-full">
          <div
            className="text-portfolio-gradient-from font-bebas text-[1.6rem] tracking-[0.11em] select-none leading-none"
            style={{ letterSpacing: "0.11em" }}
          >
            PORTFOLIO PAGE
          </div>
          <div
            className="font-bebas text-5xl sm:text-6xl tracking-wider text-white leading-tight select-none uppercase mt-2"
            style={{ letterSpacing: "0.15em" }}
          >
            ADWAITH
          </div>
        </div>
      )}

      {/* Collapsed section: only when collapsed */}
      {collapsed && (
        <div className="flex items-center justify-between px-8 py-2 max-w-7xl mx-auto h-[70px]">
          <span className="text-2xl font-bebas gradient-text tracking-[0.09em] select-none uppercase">
            ADWAITH
            <span className="text-lg font-bebas align-super ml-2 uppercase text-portfolio-gradient-from tracking-normal">
              Portfolio
            </span>
          </span>
        </div>
      )}

      {/* Nav menu: always inside nav bar, bottom edge */}
      <ul
        className={cn(
          "absolute flex gap-2 transition-all duration-300",
          collapsed
            ? "right-8 bottom-2 bg-black/60 rounded-xl px-4 py-1 shadow border border-zinc-700"
            : "right-8 bottom-4 bg-black/40 rounded-xl px-4 py-2 border border-zinc-700"
        )}
        style={{
          // Ensure it's always pinned to the bottom edge of nav bar, not screen
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
              style={{ fontFamily: "Inter,sans-serif" }} // fallback to Inter for icons
            >
              <Icon size={collapsed ? 22 : 24} className="inline -mt-1 mr-1 text-portfolio-gradient-from" />
              <span className={active === id ? "gradient-text" : ""}>
                {label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
