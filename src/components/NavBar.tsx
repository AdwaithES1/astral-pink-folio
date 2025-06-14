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

  // Close dropdown on outside click for mobile menu
  useEffect(() => {
    if (!showMobileMenu) return;
    function handleClick(e: MouseEvent) {
      if (
        navBarRef.current &&
        !navBarRef.current.contains(e.target as Node)
      ) {
        setShowMobileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
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

  const PINK = "#ff3796";

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

      {/* Hamburger menu for mobile screens: show ONLY when not collapsed and on small screens */}
      <button
        className={cn(
          "sm:hidden absolute z-[60] transition-all duration-200 rounded-xl p-2 flex items-center justify-center",
          !collapsed
            ? "bottom-3 right-3"
            : "hidden"
        )}
        style={{
          background: "linear-gradient(120deg,#171717cc 80%,#ff379640 100%)",
          border: `2px solid #ff3796`,
          boxShadow: "0 2px 14px #0006",
        }}
        aria-label={showMobileMenu ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setShowMobileMenu((v) => !v)}
        id="navbar-mobile-hamburger"
      >
        <svg width="30" height="30" fill="none" viewBox="0 0 30 30">
          <rect y="6" width="30" height="3.2" rx="1.5" fill="#ff3796"/>
          <rect y="13.4" width="30" height="3.2" rx="1.5" fill="#ff3796"/>
          <rect y="20.8" width="30" height="3.2" rx="1.5" fill="#ff3796"/>
        </svg>
      </button>

      {/* Mobile: Dropdown nav panel - show BELOW the hamburger icon */}
      {showMobileMenu && !collapsed && (
        <ul
          className={cn(
            "sm:hidden flex flex-col items-stretch absolute z-[70]",
            "rounded-xl shadow-2xl border border-pink-600",
            "bg-black/95",
            "left-auto", // align right
            "top-auto", // let us set top instead of bottom
            "min-w-[160px] overflow-hidden animate-fade-in"
          )}
          style={{
            right: 12,
            top: 62, /* Make this value a bit larger than the hamburger's bottom position so it's just underneath */
            // The hamburger is at bottom-3 (0.75rem = 12px) in a 70px-high bar, so top: 62px ≈ just below it
          }}
        >
          {sections.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                className={cn(
                  "nav-link w-full text-left flex items-center gap-2 px-4 py-3 border-b border-zinc-800 last:border-b-0 font-caveat font-bold tracking-tight text-base",
                  active === id && "active"
                )}
                style={{
                  color: active === id ? "#ff3796" : "#fff",
                  fontFamily: "'Caveat', cursive",
                  fontWeight: 700,
                  background: active === id ? "linear-gradient(92deg, #ff3796 15%, #ff90e8 55%, #1e3a8a 95%)" : "none",
                  WebkitBackgroundClip: active === id ? "text" : undefined,
                  WebkitTextFillColor: active === id ? "transparent" : undefined,
                  transition: "background 0.3s"
                }}
                onClick={() => onNav(id)}
                aria-label={label}
              >
                <Icon size={22} color="#ff3796" className="inline -mt-1" />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Nav menu (panel) */}
      {/* Mobile: hide expanded nav menu, show only on desktop/collapsed */}
      <ul
        className={cn(
          "absolute flex gap-2 transition-all duration-300",
          collapsed
            ? "right-8 bottom-2 bg-black/60 rounded-xl px-4 py-1 shadow border border-zinc-700"
            : "right-2 sm:right-8 bottom-[37px] bg-black/40 rounded-xl px-2 py-1 border border-zinc-700",
          !collapsed ? "sm:flex hidden" : "sm:flex", // only show expanded on desktop/collapsed states
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
              <Icon size={collapsed ? 22 : 20} className="inline -mt-1 mr-1 text-portfolio-gradient-from" color={PINK} />
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
        .nav-link.active .gradient-text {
          background: linear-gradient(92deg, #ff3796 20%, #ff90e8 55%, #1e3a8a 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
        @media (max-width: 640px) {
          .nav-link {
            font-size: 1.11rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
