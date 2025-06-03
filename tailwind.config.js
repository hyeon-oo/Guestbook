/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  extend: {
      fontFamily: {
        Paperlog: ['Paperlogy-8ExtraBold', 'sans-serif'],
        ClimateCrisis: ['ClimateCrisisKR-1979', 'sans-serif'],  // 여기에 추가
      },
    },
  plugins: [],
}

