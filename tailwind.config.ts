import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        spy: {
          orange: "#ef4923",
          "orange-hover": "#d63d1a",
          charcoal: "#2d2d2d",
          dark: "#1a1a1a",
          muted: "#6b7280",
          border: "#e5e7eb",
          surface: "#f9fafb",
        },
      },
      borderRadius: {
        spy: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
