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
        <div className="max-w-7xl mx-auto flex flex-col items-start justify-center px-8 pt-2 pb-1 h-full relative">
          {/* Contact icons & info, top right */}
          <div className="absolute top-[10px] right-0 pr-4 flex flex-col items-end gap-1 z-20">
            <div className="flex items-center gap-1 text-sm font-normal">
              {/* Gmail icon and email */}
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                className="mr-1"
                aria-label="Gmail"
              >
                <g>
                  <rect width="24" height="24" rx="4" fill="#fff" />
                  <path
                    d="M3.4 7.07L12 13.37l8.6-6.3a1 1 0 0 0-1.2-1.6L12 10.63 4.6 5.47a1 1 0 1 0-1.2 1.6z"
                    fill="url(#gmail-pink)"
                  />
                  <path
                    d="M21 6.88l-8.6 6.27a1 1 0 0 1-1.2 0L3 6.88V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.88z"
                    fill="url(#gmail-blue)"
                  />
                  <path
                    d="M3 6.88v11.02A2 2 0 0 0 5 20h14a2 2 0 0 0 2-2V6.88l-8.6 6.31a1.5 1.5 0 0 1-1.8 0L3 6.88z"
                    fill="url(#gmail-green)"
                    fillOpacity=".55"
                  />
                  <defs>
                    <linearGradient id="gmail-pink" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ff3796" />
                      <stop offset="0.7" stopColor="#ff90e8" />
                    </linearGradient>
                    <linearGradient id="gmail-blue" x1="3" y1="6" x2="21" y2="17" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#a7c7ff" />
                      <stop offset="1" stopColor="#1e3a8a"/>
                    </linearGradient>
                    <linearGradient id="gmail-green" x1="3" y1="13" x2="21" y2="23" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ff90e8" />
                      <stop offset="1" stopColor="#fff4fa" />
                    </linearGradient>
                  </defs>
                </g>
              </svg>
              <span
                className="font-sans select-text text-xs sm:text-sm"
                style={{
                  background: "linear-gradient(90deg,#fff 50%,#ff90e8 95%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  fontWeight: 700,
                  letterSpacing: "0.01em"
                }}
              >
                adwaithe6@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm font-normal mt-0.5">
              {/* WhatsApp icon and number */}
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                className="mr-1"
                aria-label="WhatsApp"
              >
                <g>
                  <rect width="24" height="24" rx="4" fill="#fff" />
                  <path
                    fill="url(#wa-blue)"
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.789-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.199-.298.299-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.207-.242-.58-.487-.502-.669-.512l-.569-.01c-.198 0-.521.074-.793.372s-1.04 1.017-1.04 2.479 1.065 2.876 1.214 3.074c.148.198 2.097 3.213 5.077 4.377.71.306 1.262.488 1.694.623.712.226 1.36.194 1.87.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.569-.347z"
                  />
                  <defs>
                    <linearGradient id="wa-blue" x1="9" y1="10" x2="21" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1e3a8a" />
                      <stop offset="1" stopColor="#80eaff" />
                    </linearGradient>
                  </defs>
                </g>
              </svg>
              <span
                className="font-sans select-text text-xs sm:text-sm"
                style={{
                  background: "linear-gradient(90deg,#fff 62%,#ff90e8 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  fontWeight: 700,
                  letterSpacing: "0.01em"
                }}
              >
                999999999
              </span>
            </div>
          </div>
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
        <div className="flex items-center justify-between px-8 py-2 max-w-7xl mx-auto h-[70px]">
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
                "nav-link group hover-scale transition relative font-semibold text-base font-caveat font-bold",
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
