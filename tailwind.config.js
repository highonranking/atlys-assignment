/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A96FF',
        secondary: '#7F8084',
        background: '#131319',
        surface: '#191920',
        border: '#35373B',
        'text-primary': '#FFFFFF',
        'text-secondary': '#7F8084',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
