import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,hbs,js}',
  ],
  daisyui: {
    themes: [
      {
        black: {
          ...require("daisyui/src/theming/themes")["black"],
          "--rounded-btn": "0.5rem",
        },
      },
      "light",
    ],
  },
  plugins: [daisyui],
}

