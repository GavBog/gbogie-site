import type { Config } from 'tailwindcss'
import topography from '@tailwindcss/typography'
import daisyui from 'daisyui'

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  daisyui: {
    themes: ['sunset', 'light'],
  },
  plugins: [topography, daisyui],
}

export default config
