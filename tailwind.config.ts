import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          50: "#eef2ff",
          100: "#dce4ff",
          200: "#b9c9ff",
          300: "#8aa3ff",
          400: "#5a78f0",
          500: "#3558d4",
          600: "#1a3fb8",
          700: "#142f8f",
          800: "#0f2369",
          900: "#0a1847",
        },
        bordeaux: {
          50: "#fdf2f5",
          100: "#fce7ed",
          200: "#f9ced9",
          300: "#f3a5b8",
          400: "#e97393",
          500: "#d94a6f",
          600: "#b82d52",
          700: "#922040",
          800: "#721833",
          900: "#5c1228",
        },
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        marquee: "marquee 28s linear infinite",
        "pulse-line": "pulseLine 2s ease-in-out infinite",
        "slide-in": "slideIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseLine: {
          "0%, 100%": { transform: "scaleX(1)", opacity: "1" },
          "50%": { transform: "scaleX(0.85)", opacity: "0.6" },
        },
        slideIn: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
