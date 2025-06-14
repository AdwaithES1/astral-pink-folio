
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "deep-black": "#10101a",
        "navy-blue": "#1e3a8a",
        "electric-pink": "#ff3796",
        "lite-pink": "#ff90e8",
        "portfolio-gradient-from": "#ff3796",
        "portfolio-gradient-to": "#1e3a8a",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at 60% 20%, #ff379640, #1e3a8a40 70%, transparent 100%)",
        "nav-gradient":
          "linear-gradient(90deg, #ff3796, #ff90e8 50%, #1e3a8a 100%)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      animation: {
        "icon-float": "icon-float 4s ease-in-out infinite",
      },
      keyframes: {
        "icon-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
