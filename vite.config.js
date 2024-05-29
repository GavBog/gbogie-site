import { defineConfig } from 'vite'
import { resolve } from 'path'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        blog: resolve(__dirname, 'src/blog.html'),
      },
    },
  },
  plugins: [
    handlebars({
      context: {
        title: 'Gavin Bogie',
      },
      partialDirectory: resolve(__dirname, 'src/components'),
      helpers: {
        toJSON: (data, options) => options.fn(JSON.parse(data)),
      },
    }),
  ],
})
