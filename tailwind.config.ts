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
        bg:           "#000000",
        fg:           "#F5F0E8",
        "fg-dim":     "#666666",
        accent:       "#C8102E",
        "accent-h":   "#E8005A",
        border:       "#1A1A1A",
      },
      fontFamily: {
        serif:  ["var(--font-cormorant)", "Georgia", "serif"],
        mono:   ["var(--font-space-mono)", "'Courier New'", "monospace"],
      },
      fontSize: {
        "13": "13px",
        "12": "12px",
        "11": "11px",
      },
    },
  },
  plugins: [],
};
export default config;
