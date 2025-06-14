
import { Home, FileText, Mail } from "lucide-react";
import { useState } from "react";
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

  const onNav = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-70 backdrop-blur-lg border-b border-zinc-800"
      style={{ boxShadow: "0 2px 20px #0004" }}
    >
      <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        <span className="text-2xl font-extrabold gradient-text tracking-wide select-none">
          Jane Doe <span className="text-lg font-semibold align-super ml-2">Portfolio</span>
        </span>
        <ul className="flex gap-2">
          {sections.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                className={cn(
                  "nav-link group hover-scale transition relative font-medium",
                  active === id && "active"
                )}
                onClick={() => onNav(id)}
                aria-label={label}
              >
                <Icon size={20} className="inline -mt-1 mr-1 text-portfolio-gradient-from" />
                <span className={active === id ? "gradient-text" : ""}>
                  {label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
