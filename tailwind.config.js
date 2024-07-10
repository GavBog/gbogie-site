import topography from '@tailwindcss/typography';
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,hbs,js}',
  ],
  safelist: [
    'min-h-screen',
    'prose',
  ],
  daisyui: {
    themes: [
      "sunset",
      "light",
    ],
  },
  plugins: [topography, daisyui],
}

