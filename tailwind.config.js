import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,hbs,js}',
  ],
  daisyui: {
    themes: [
      "sunset",
      "light",
    ],
  },
  plugins: [daisyui],
}

