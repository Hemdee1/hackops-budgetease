import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/icons/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Manrope: '"Manrope", sans-serif',
      },
      colors: {
        primary: "#0257EF",
        gray1: "#353B41",
        gray2: "#42484F",
        gray3: "#CCCCCC",
        gray4: "#E9E7E7",
        green: "#008000",
        red: "#B60915",
      },
      width: {
        fullscreen: "1440px",
      },
    },
  },
  plugins: [],
};
export default config;
