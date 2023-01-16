/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      grid: {
        template: {
          columns: {
            3: 1fr 1fr 1fr
          }
        }
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
};
