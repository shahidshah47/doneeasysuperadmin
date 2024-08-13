/** @type {import('tailwindcss').Config} */
export default {
  // purge: [],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'averta': ['Averta', 'sans-serif'], // Fallback to sans-serif if Averta isn't available
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

