/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "error-red": "#d32f2f",
      },
      spacing: {
        "87/100": "87%",
      },
    },
  },
  plugins: [],
};
