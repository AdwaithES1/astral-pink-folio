
import { Home, FileText, Mail, Menu } from "lucide-react";
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setCollapsed(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on window resize if above sm breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && showMobileMenu) {
        setShowMobileMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showMobileMenu]);

  const onNav = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowMobileMenu(false); // close menu on mobile after navigate
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
        <div className="flex flex-col items-start justify-center h-full pl-4 sm:pl-8 pt-2 pb-1 relative">
          {/* Removed contact icons & info from top right */}
          <div
            className={cn(
              "transition-transform duration-[520ms] scale-100 opacity-100 select-none"
            )}
            style={{
              transition: "all 0.52s cubic-bezier(0.29,1.44,0.53,1.02)",
            }}
          >
            {/* "PORTFOLIO" branding in Bebas Neue */}
            <div
              className="navbar-brand-adwaith text-2xl sm:text-3xl gradient-text-strong uppercase leading-none mb-0.5 font-bebas font-bold"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 700 }}
            >
              PORTFOLIO
            </div>
            {/* "ADWAITH" in Caveat, bold */}
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
        <div className="flex items-center justify-start pl-4 sm:pl-8 py-2 h-[70px]">
          {/* "ADWAITH" in Caveat, bold */}
          <span
            className="navbar-brand-adwaith font-caveat font-bold tracking-tight text-3xl sm:text-4xl text-white select-none uppercase transition-transform duration-[400ms] scale-100 opacity-100"
            style={{
              fontFamily: "'Caveat', cursive",
              fontWeight: 700,
              transition: "all 0.41s cubic-bezier(0.27,1.41,0.7,1.05)"
            }}
          >
            ADWAITH
          </span>
        </div>
      )}

      {/* Hamburger menu for mobile screens: show ONLY when not collapsed and for small screens */}
      <button
        className={cn(
          "sm:hidden absolute z-[60] transition-all duration-200 rounded-xl p-2 flex items-center justify-center",
          !collapsed
            ? "bottom-3 right-3 bg-black/70 shadow-lg border border-zinc-700"
            : "hidden"
        )}
        style={{
          // Soft gradient border for the icon on mobile
          background: "linear-gradient(120deg,#171717cc 80%,#ff379640 100%)",
        }}
        aria-label={showMobileMenu ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setShowMobileMenu((v) => !v)}
      >
        <Menu
          size={30}
          style={{
            color: "url(#nav-gradient)", // fallback in case of svg, but tailwind doesn't do gradients directly
            strokeWidth: 3,
            background: "none"
          }}
          className="text-transparent bg-clip-text"
        />
        {/* SVG gradient for menu icon */}
        <svg width="0" height="0">
          <defs>
            <linearGradient id="nav-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#ff3796" offset="0%" />
              <stop stopColor="#ff90e8" offset="50%" />
              <stop stopColor="#1e3a8a" offset="100%" />
            </linearGradient>
          </defs>
        </svg>
      </button>

      {/* Nav menu (panel) */}
      {/* Mobile: show as panel only when menu is open, otherwise hidden! */}
      {/* Desktop: always show */}
      <ul
        className={cn(
          // Panel styles
          "flex gap-2 transition-all duration-300",
          // Desktop
          "absolute",
          collapsed
            ? "right-8 bottom-2 bg-black/60 rounded-xl px-4 py-1 shadow border border-zinc-700"
            // On desktop expanded: move panel all the way right and up (far from adwaith text)
            : "right-2 sm:right-6 bottom-[37px] bg-black/40 rounded-xl px-2 py-1 border border-zinc-700",
          // Mobile show/hide
          !collapsed
            ? "sm:flex"
            : "sm:flex",
          // Mobile menu logic
          (!collapsed && !showMobileMenu) ? "sm:flex hidden" : "" // hide when not collapsed unless menu is open
        )}
        style={{
          position: "absolute",
          zIndex: 30,
          ...(collapsed
            ? {}
            : {
                minHeight: 46,
                maxHeight: 48,
                overflow: "hidden"
              }),
          // On mobile, show the nav menu only if showMobileMenu is true or if collapsed
          display:
            !collapsed && !showMobileMenu
              ? "none"
              : undefined
        }}
      >
        {sections.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <button
              className={cn(
                "nav-link group hover-scale transition relative font-semibold text-base font-caveat font-bold",
                active === id && "active"
              )}
              onClick={() => onNav(id)}
              aria-label={label}
              style={{
                fontFamily: "'Caveat', cursive",
                fontWeight: 700,
                padding: collapsed ? "6px 8px" : "4px 6px"
              }}
            >
              <Icon size={collapsed ? 22 : 20} className="inline -mt-1 mr-1 text-portfolio-gradient-from" />
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
        /* Gradient text for Menu icon, only applied if .text-transparent + .bg-clip-text applied */
        .nav-link.active .gradient-text {
          background: linear-gradient(92deg, #ff3796 20%, #ff90e8 55%, #1e3a8a 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;

