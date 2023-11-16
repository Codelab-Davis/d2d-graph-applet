/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '1rem',
      base: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'primary': {
        100: '#cfe7e9',
        200: '#a0cace',
        300: '#72b2b8',
        400: '#5ea8ae',
        500: '#36929a',
        600: '#20858e',
        700: '#117078',
        800: '#04575e',
        900: '#003337',
      },
      'secondary': {
        300: '#ffd0ab',
        400: '#fbab6b',
        500: '#f68932',
        600: '#e26d10',
      },
      'grays': {
        200: '#f0f2f4',
        300: '#e4e4e4',
        400: '#d8d8d8',
        500: '#8e8e8e',
        600: '#575757',
        700: '#494949',
      },
      'red': {
        1: '#ed6555',
        2: '#fda7a7',
      }
    },
    extend: {
      backgroundImage: {
        'landing-page': "linear-gradient(to top, rgba(148, 209, 215, 0.82), rgba(255, 255, 255, 0.82)), url('./src/assets/backgroundLandingPage.svg')",
        'background-shape': "url('./src/assets/darkGradientBackground.svg')"
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif']
      }
    },
  },
  plugins: [],
}

