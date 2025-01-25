/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       primary: "#133E87",
        secondary: "#608BC1",
        tertiary: "#CBDCEB",
        interact: "#ecf0f1",
        },
    },
  },
  plugins: [],
}