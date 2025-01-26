/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       primary: "#F2EFE7",
        secondary: "#48A6A7",
        tertiary: "#9ACBD0",
        interact: "#2973B2",
        },
    },
  },
  plugins: [],
}