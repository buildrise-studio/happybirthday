/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#EED7C8",
        pink: { soft: "#EFAAB0", hot: "#FD9898", deep: "#BE0822" },
        cream: "#EED7CB",
        ivory: "#FFF9F5",
      },
      fontFamily: {
        gasdrifo: ["'NCL Gasdrifo'", "Georgia", "serif"],
        melinda: ["'Vintage Melinda'", "cursive"],
        vindey: ["'Wasted Vindey'", "cursive"],
      },
    },
  },
  plugins: [],
}
