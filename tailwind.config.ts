import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          violet: "#8E2DE2",
          rose: "#F0006E",
        },
        secondary: {
          white: "#FFFFFF",
          dark: "#2D3436",
          light: "#F4F7F6",
        },
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Inter", "Open Sans", "sans-serif"],
      },
      borderRadius: {
        button: "30px",
        card: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
