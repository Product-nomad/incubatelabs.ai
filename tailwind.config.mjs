/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ['"Source Serif 4"', "Georgia", "serif"],
      },
      colors: {
        ink: "#16181a",
        paper: "#fbfaf7",
        line: "#e4e1da",
        muted: "#5d6166",
        accent: "#1f5c45",
        "accent-soft": "#e8efe9",
        "accent-line": "#cfe0d4",
        band: "#f4f2ed",
      },
      maxWidth: {
        prose: "65ch",
        page: "72rem",
      },
    },
  },
  plugins: [],
};
