/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Roboto"', "sans-serif"],
        mono: ['"Roboto Mono"', "serif"],
        script: ['"Dancing Script"', "serif"],
      },
      colors: {
        bg: "#0F0F0F",
        accent: "#AE9B84",
        secondary: "#1F1F1F",
      },
    },
  },
  plugins: [],
};
