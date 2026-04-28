/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        ink: "#0a0a0a",
        paper: "#fdfdfc",
        accent: "#0066ff",
      },
      maxWidth: {
        prose: "65ch",
        page: "72rem",
      },
    },
  },
  plugins: [],
};
