import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#00BFA6",
        a: "#009EAF",
        b: "#00A67D",
        c: "#53D4C7",
        d: "#009C88",
        e: "#333333",
        f: "#808080",
      },
      backgroundColor: {
        primary: "#00BFA6",
        a: "#009EAF",
        b: "#00A67D",
        c: "#53D4C7",
        d: "#009C88",
        e: "#333333",
        f: "#808080",
      },

      screens: {
        sm: "480px",
        md: "800px",
        lg: "1000px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1536px",
      },
      flex: {
        "3": "3 3 0%",
        "5.5": "5.5 5.5 0%",
      },
    },
  },
  plugins: [],
};
export default config;
