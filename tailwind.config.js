/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rammetto': ['Rammetto One', 'cursive'],
        'staatliches': ['Staatliches', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

