
import { Home, FileText, Mail } from "lucide-react";
import { useState, useEffect } from "react";
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

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        collapsed
          ? "top-0 bg-black/70 backdrop-blur-lg border-b border-zinc-800"
          : "left-0 top-0 h-[170px] bg-gradient-to-br from-deep-black/90 to-black/75"
      )}
      style={{
        boxShadow: collapsed ? "0 2px 20px #0004" : "none",
        minHeight: collapsed ? 0 : "170px",
      }}
    >
      {/* Expanded section: Branding */}
      {!collapsed && (
        <div className="max-w-7xl mx-auto flex flex-col items-start justify-center px-8 pt-6">
          <div className="mb-1 text-portfolio-gradient-from font-bold text-lg tracking-wide select-none">
            PORTFOLIO PAGE
          </div>
          <div className="font-extrabold text-5xl sm:text-6xl text-white tracking-tight leading-tight select-none" style={{letterSpacing:'0.02em'}}>
            <span className="gradient-text block text-[2.75rem] sm:text-[3rem] leading-tight">ADWAITH</span>
          </div>
        </div>
      )}

      {/* Collapsed section: only when collapsed */}
      {collapsed && (
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <span className="text-2xl font-extrabold gradient-text tracking-wide select-none">
            ADWAITH
            <span className="text-lg font-semibold align-super ml-2 uppercase text-portfolio-gradient-from">
              Portfolio
            </span>
          </span>
        </div>
      )}

      {/* Nav menu in bottom right for both states */}
      <ul
        className={cn(
          "fixed bottom-7 right-8 flex gap-2 transition-all duration-300",
          collapsed
            ? "bg-black/60 rounded-xl px-4 py-2 shadow border border-zinc-700"
            : "bg-transparent"
        )}
      >
        {sections.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <button
              className={cn(
                "nav-link group hover-scale transition relative font-medium text-base",
                active === id && "active"
              )}
              onClick={() => onNav(id)}
              aria-label={label}
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

