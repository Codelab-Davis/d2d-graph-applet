/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'landing-page': "linear-gradient(to top, rgba(199, 242, 246, 0.59), rgba(255, 255, 255, 0.59)), url('./src/assets/backgroundLandingPage.png')"
      }
    },
  },
  plugins: [],
}

