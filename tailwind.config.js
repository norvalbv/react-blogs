/* eslint-disable global-require */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cocoa-brown': {
          50: '#f9f4f3',
          100: '#f0e6e4',
          200: '#e0ccc8',
          300: '#cda9a4',
          400: '#b78480',
          500: '#a96866',
          600: '#9b5b5e',
          700: '#824c51',
          800: '#6a4248',
          900: '#56383d',
          950: '#3c2529',
        },
      },
    },
  },
  plugins: [],
};
