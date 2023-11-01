import { fontFamily } from "tailwindcss/defaultTheme";

/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/app/**/*.{ts,tsx}", "./src/modules/**/*.{ts,tsx}", "./src/ui/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
      },
      screens: {
        "3xl": "1920px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      fontSize: {
        xxs: "0.625rem",
      },
      minWidth: {
        screen: "100vw",
      },
    },
  },
  plugins: [],
};
