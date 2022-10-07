/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        agrandir: ["Agrandir Regular", "sans-serif"],
        apoc: ["Apoc Normal", "serif"],
    },
    fontSize: {
        'xxs': ['0.7rem', '1.35'], 
    },
    screens: {
        '3xl': '2200px'
    },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
