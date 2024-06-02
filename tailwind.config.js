const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    fontFamily: {
      display: ["'Bebas Neue'", "sans-serif"],
    },
    extend: {
      colors: {
        dark: "#333333",
        light: "#404040",
        primary: "#a3e635"
      },
    },
  },
  plugins: [flowbite.plugin()],
};
