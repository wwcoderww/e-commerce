/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // This overrides Tailwind's default 'font-sans' class with Inter
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
