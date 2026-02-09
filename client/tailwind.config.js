/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nordic: {
          bg: "#1a1b26",
          card: "#24283b",
          text: "#c0caf5",
          accent: "#7aa2f7",
          muted: "#565f89",
          success: "#9ece6a",
          warning: "#e0af68",
          error: "#f7768e",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
