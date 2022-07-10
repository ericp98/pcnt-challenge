/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F1F1F1',
        'delete': '#5E5E5E'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
