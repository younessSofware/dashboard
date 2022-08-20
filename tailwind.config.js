module.exports = {
  mode: 'jit',
  purge: ["./src/app/**/*.{ts,html}"],
  darkMode: false, // or 'media' or 'class'
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#001653",
        secondary: {
          'DEFAULT': "#ffb119",
          '50': '#e69900'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
