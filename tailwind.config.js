module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        spotify: {
          100: "#d1f7df",
          200: "#a3efbf",
          300: "#74e8a0",
          400: "#46e080",
          500: "#18d860",
          600: "#13ad4d",
          700: "#0e823a",
          800: "#0a5626",
          900: "#052b13"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar-hide")
  ],
}
