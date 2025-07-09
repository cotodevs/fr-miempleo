import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cotoneb: "#2DAF52",
        cotoneb2: "#1E5B92",
        cotoneb3: "#00315c",
      },
    },
  },
  plugins: [],
};
export default config;
