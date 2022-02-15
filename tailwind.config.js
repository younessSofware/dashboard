module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#001653",
        secondary: "#ffb119"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
